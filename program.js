// ===================================================================
// 30-DAY PROGRAM GENERATOR (COURSE-AWARE)
// Phase 1 (Day 1-10):  解放 (Release)
// Phase 2 (Day 11-20): 活性化 (Activation)
// Phase 3 (Day 21-30): 統合 (Integration)
// Day 7, 14, 21, 28 はアクティブレスト
// 第2引数 course: 'seitai' | 'personal' | 'yoga' | 'pilates' | 'mixed'
// ===================================================================
import {
  ALL_EXERCISES,
  buildPrescriptionPool,
  buildAnchors,
  setPainAvoidance,
  setFocusParts,
} from './prescription-matrix.js';

// ----- 内部: 最少使用の1件を返す（除外・アンカー優先・主訴rank優先） -----
function pickOne(exList, usage, anchors, excludeIds, rank, focusRank){
  const score = (ex) => {
    const raw = usage[ex.id] || 0;
    return anchors && anchors.has(ex.id) ? raw * 0.5 : raw;
  };
  const rk = (ex) => (rank && rank.has(ex.id)) ? rank.get(ex.id) : 99;
  const cand = exList
    .filter(ex => !excludeIds.includes(ex.id))
    .sort((a, b) => {
      const sa = score(a), sb = score(b);
      if (sa !== sb) return sa - sb;
      // 使用回数が同じなら、主訴(順位の高い問題)の種目を優先
      const ra = rk(a), rb = rk(b);
      if (ra !== rb) return ra - rb;
      // さらに同条件なら「その悩み特有の重点部位」の種目を優先
      if (focusRank){
        const fa = focusRank(a), fb = focusRank(b);
        if (fa !== fb) return fa - fb;
      }
      const aa = anchors && anchors.has(a.id) ? 0 : 1;
      const ab = anchors && anchors.has(b.id) ? 0 : 1;
      return aa - ab;
    });
  return cand[0] || exList.filter(ex => !excludeIds.includes(ex.id))[0] || null;
}

// ----- オーダーメイド＋変化の両立ピック -----
// count件のうち、可能な限り「問題直結(targeted)」を最低 wantTargeted 件含め、
// 残りは「変化用(variety)」から最少使用で選ぶ。どちらも足りなければ他方で埋める。
function pickBalanced(exList, targeted, usage, count, anchors, excludeIds, wantTargeted, rank, focusRank){
  const picked = [];
  const exclude = [...excludeIds];
  const tList = exList.filter(ex => targeted.has(ex.id));
  const vList = exList.filter(ex => !targeted.has(ex.id));

  // ① 問題直結を wantTargeted 件
  for (let i = 0; i < wantTargeted && picked.length < count; i++){
    const ex = pickOne(tList, usage, anchors, exclude, rank, focusRank);
    if (!ex) break;
    picked.push(ex); exclude.push(ex.id);
  }
  // ② 残りは変化用から
  while (picked.length < count){
    const ex = pickOne(vList, usage, anchors, exclude, rank, focusRank);
    if (!ex) break;
    picked.push(ex); exclude.push(ex.id);
  }
  // ③ まだ足りなければ全体(targeted含む)から
  while (picked.length < count){
    const ex = pickOne(exList, usage, anchors, exclude, rank, focusRank);
    if (!ex) break;
    picked.push(ex); exclude.push(ex.id);
  }
  return picked;
}

// ===== 今日のメニュー: セルフケア2 + トレーニング2（各1件は問題直結）=====
function pickTodayMenu(problemKeys, course='mixed', opts){
  const prog = build30DayProgram(problemKeys, course, opts);
  const d1 = prog.find(d => !d.isRest) || prog[0];
  return { selfcare: d1.selfcare, training: d1.training };
}

// ===== 段階的負荷（フェーズごとに強度の上限を上げていく）=====
// Phase1 解放: やさしい動きで慣れる / Phase2 活性化: 標準 / Phase3 統合: 少し歯ごたえを
// 運動経験(exp)で全体の天井を前後させる（初心者は最後まで無理をさせない）
// 40〜70代女性向けの安全フィルタを通したあとの強度は実質 1〜2 の2段階しかない。
// そのため「上限だけ」だと軽い種目が終盤に流れ込んで逆行する。[下限, 上限]の帯で明示する。
// （帯に収まる種目が6件未満なら banded() が自動で緩めるので、枠不足にはならない）
const INTENSITY_BAND = {
  none:    { 1: [1, 1], 2: [1, 2], 3: [2, 2] },   // 未経験: ゆっくり上げる
  some:    { 1: [1, 1], 2: [2, 2], 3: [2, 2] },   // ときどき: 標準
  regular: { 1: [1, 2], 2: [2, 2], 3: [2, 3] },   // 習慣あり: 最初から少し歯ごたえを
};
function intensityBandFor(phase, exp){
  const t = INTENSITY_BAND[exp] || INTENSITY_BAND.none;
  return t[phase] || [1, 2];
}
// 反復回数・秒数を、進み具合に応じて少しずつ増やす（DBの文字列を書き換えて表示）
// 例) Phase1「10回」→ Phase3「13回」 / 「20秒」→「26秒」
// tune: 途中評価による調整（-1=やさしく / +1=歯ごたえを）。強度は実質2段階しかないため、
// 「やさしくした／歯ごたえを出した」を回数・秒数で確実に体感できるようにする。
function scaleDuration(duration, phase, exp, tune){
  if (!duration) return duration;
  let f = phase === 1 ? 1.0 : phase === 2 ? 1.15 : 1.3;
  if (exp === 'none') f = 1 + (f - 1) * 0.6;       // 初心者はゆるやかに
  if (exp === 'regular') f = 1 + (f - 1) * 1.3;    // 習慣がある人は少し速く
  if (tune === -1) f *= 0.85;
  if (tune === 1)  f *= 1.15;
  if (f === 1) return duration;
  return String(duration).replace(/(\d+)\s*(回|秒|分)/g, (m, n, unit) => {
    const v = Number(n);
    if (unit === '分') return m;                    // 「1分」等は据え置き（刻みが粗くなるため）
    const step = unit === '秒' ? 5 : 1;             // 秒は5秒刻み・回は1回刻み
    const scaled = Math.round(v * f / step) * step;
    // 通常は元の値を下回らせない。ただし「やさしく」調整時だけは6割まで下げてよい
    const lo = tune === -1 ? Math.max(step, Math.round(v * 0.6 / step) * step) : v;
    return `${Math.max(lo, scaled)}${unit}`;
  });
}
// その日の表示用に duration だけ差し替えたコピーを返す（DBは書き換えない）
function withProgression(ex, phase, exp, tune){
  const scaled = scaleDuration(ex.duration, phase, exp, tune);
  if (scaled === ex.duration) return ex;
  return Object.assign(Object.create(Object.getPrototypeOf(ex)), ex, { duration: scaled, _baseDuration: ex.duration });
}

// ===== 30日プログラム生成 =====
// opts: { menuSize: 2|4|5|6, exp: 'none'|'some'|'regular' }
function build30DayProgram(problemKeys, course='mixed', opts){
  const o = opts || {};
  const menuSize = [2,4,5,6].includes(o.menuSize) ? o.menuSize : 4;
  const exp = o.exp || 'none';
  const tune = o.tune === -1 || o.tune === 1 ? o.tune : 0;
  // 痛み配慮・主訴フォーカスは、プールを作る直前にここで設定する。
  // （呼び出し側が別インスタンスの prescription-matrix を触っていても必ず効くようにするため）
  if (o.pain) setPainAvoidance(o.pain);
  if (o.focus) setFocusParts(o.focus);
  const pool = buildPrescriptionPool(problemKeys, course);
  const anchors = buildAnchors(problemKeys, course);
  const targeted = pool.targeted || new Set();
  const rank = pool.rank || new Map();
  const focusRank = pool.focusRank || null;
  const sListAll = pool.selfcare;
  const tListAll = pool.training;
  const sList = sListAll;
  const tList = tListAll;

  const sUsage = Object.fromEntries(sList.map(ex => [ex.id, 0]));
  const tUsage = Object.fromEntries(tList.map(ex => [ex.id, 0]));

  // 各カテゴリに問題直結種目が存在すれば、毎日1件は必ず含める（オーダーメイド感）
  const sHasTargeted = sList.some(ex => targeted.has(ex.id));
  const tHasTargeted = tList.some(ex => targeted.has(ex.id));

  const days = [];

  for (let day = 1; day <= 30; day++) {
    const phase = day <= 10 ? 1 : day <= 20 ? 2 : 3;
    const isRest = (day % 7 === 0);
    const dayInPhase = day <= 10 ? day : day <= 20 ? day-10 : day-20;

    const prev = days[days.length-1];
    const prevIds = prev
      ? [...(prev.selfcare||[]), ...(prev.training||[])].map(e => e.id)
      : [];

    // フェーズが進むほど強度帯を上げる（上限＋下限の両方で帯を作る）
    const [floor, cap] = intensityBandFor(phase, exp);
    const banded = (list) => {
      const within = list.filter(ex => { const i = ex.intensity || 1; return i <= cap && i >= floor; });
      if (within.length >= 6) return within;
      const capOnly = list.filter(ex => (ex.intensity || 1) <= cap);   // 帯が狭すぎたら上限だけ
      return capOnly.length >= 6 ? capOnly : list;
    };
    const sPool = banded(sList), tPool = banded(tList);

    // 1日の種目数: とれる時間から決める（休息日はセルフケアのみ）
    const sCount = isRest ? Math.min(2, menuSize) : Math.ceil(menuSize / 2);
    const tCount = isRest ? 0 : menuSize - sCount;

    let selfcare, training;
    selfcare = pickBalanced(sPool, targeted, sUsage, sCount, anchors, prevIds, sHasTargeted ? 1 : 0, rank, focusRank);
    if (isRest) {
      training = [];
    } else {
      const sameDayIds = selfcare.map(e => e.id);
      training = pickBalanced(tPool, targeted, tUsage, tCount, anchors, [...prevIds, ...sameDayIds], tHasTargeted ? 1 : 0, rank, focusRank);
    }

    selfcare.forEach(ex => { sUsage[ex.id] = (sUsage[ex.id]||0) + 1; });
    training.forEach(ex => { tUsage[ex.id] = (tUsage[ex.id]||0) + 1; });

    // 回数・秒数をフェーズに応じて漸増（表示用のコピーに差し替え）
    selfcare = selfcare.map(ex => withProgression(ex, phase, exp, tune));
    training = training.map(ex => withProgression(ex, phase, exp, tune));

    const theme = themeFor(phase, dayInPhase, isRest, course);

    days.push({ day, phase, isRest, theme, selfcare, training, course });
  }

  // UI が「この種目はあなたの姿勢に直結」と説明できるように、問題直結idを添える
  days.targeted = targeted;
  return days;
}

function themeFor(phase, dayInPhase, isRest, course){
  if (isRest) return 'アクティブレスト・呼吸を整える';

  // コース別のテーマプレフィックス
  const coursePrefix = {
    seitai:   '',
    personal: '',
    yoga:     '',
    pilates:  '',
    mixed:    '',
  }[course] || '';

  const themes = {
    1: [
      '導入・身体を知る',
      'リリースの導入',
      '胸郭の解放',
      '股関節の解放',
      '首と肩のリセット',
      '骨盤の感覚を取り戻す',
      '休息日 (Rest)',
      '脊柱モビリティ',
      '深層筋への意識',
      'Phase 1総仕上げ',
    ],
    2: [
      '臀筋の覚醒',
      '体幹深層の活性化',
      '肩甲骨スタビライザー',
      '骨盤底〜横隔膜',
      '中臀筋の活性化',
      '後面連鎖の起動',
      '休息日 (Rest)',
      '片脚バランスの導入',
      '抗回旋トレーニング',
      'Phase 2総仕上げ',
    ],
    3: [
      '機能的動作の統合',
      '日常動作への応用',
      '左右差の最終調整',
      '呼吸と姿勢の統合',
      '片脚動作の完成',
      '回旋動作の制御',
      '休息日 (Rest)',
      '統合パターン',
      '動的バランス',
      '30日プログラム卒業',
    ],
  };
  return coursePrefix + themes[phase][dayInPhase-1];
}

export { pickTodayMenu, build30DayProgram, ALL_EXERCISES };
