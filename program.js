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

// ===== 動きの「系統」（同じ動きの別バージョンを見分ける）=====
// 例: お尻上げキープ／片脚お尻上げ／ペルビックカール は全部「お尻上げ」。
// 同じ日・連日で同じ系統が並ぶと「似た内容ばかり」に見えるので、選定で避ける。
const FAMILY_RULES = [
  [/ブリッジ|お尻上げ|お尻を持ち上げ|ペルビックカール|ヒップリフト/, 'お尻上げ'],
  [/スクワット|しゃがむ|空気イス|立ち座り/, 'スクワット'],
  [/ランジ|踏み出|踏み込/, 'ランジ'],
  [/サイドプランク|横向き.*キープ/, 'サイドプランク'],
  [/プランク|板のポーズ|ひじつき/, 'プランク'],
  [/かかと上げ|カーフ/, 'かかと上げ'],
  [/クラム|貝|ひざ開き|膝を開く|膝ひらき/, 'クラム'],
  [/バードドッグ|手足のばし|アームリフト|対角/, 'バードドッグ'],
  [/デッドバグ|ひざ上げマーチ|マーチ/, 'デッドバグ'],
  [/キャット|カウ|ネコ|猫の/, 'キャット&カウ'],
  [/あご引き|チンタック|うなずき|あご前後/, 'あご引き'],
  [/Wの形|Ｗ|W字|Y字|T字|肩甲骨(寄せ|を寄せ)|スクイーズ|腕を(後ろ|うしろ)に引く/, '肩甲骨寄せ'],
  [/チェストリフト|上体起こし|腹筋|クランチ|カール/, '腹筋'],
  [/呼吸|ブレス|吐き切る|息を/, '呼吸'],
  [/首(の横|横|回|ぐるぐる|ゆらし|のばし|ねじり|を長く|の後ろ)|耳〜肩|うなじ/, '首'],
  [/胸(開き|を開く|オープン)|チェストオープン|ドア枠|胸の前/, '胸開き'],
  [/もも裏|ハムストリング|長座前屈/, 'もも裏'],
  [/前もも|大腿四頭/, '前もも'],
  [/ふくらはぎ|すね/, 'ふくらはぎ'],
  [/お尻(の外側|のばし|ストレッチ|の横)|梨状筋|4の字|フィギュア|ピジョン/, 'お尻のばし'],
  [/脚の付け根|腸腰筋|股関節(前|の前)/, '脚の付け根'],
  [/体側|わき腹|側屈|サイドベンド|体の横/, 'わき腹'],
  [/ねじ|ツイスト|回旋|ワイパー|ひざ倒し/, 'ねじり'],
  [/片脚バランス|片足立ち|片脚立ち|木のポーズ|バランス/, '片脚バランス'],
  [/歩き|ウォーク|足踏み|ステップ/, '歩く'],
  [/山のポーズ|まっすぐ立つ|壁立ち/, 'まっすぐ立つ'],
  [/肩(回し|ぐるぐる|まわし)|腕(回し|まわし|ぶらぶら)/, '肩回し'],
  [/腕立て|プッシュアップ/, '腕立て'],
  [/背筋|うつ伏せ.*(上げ|浮かせ)|コブラ|スイミング|スーパーマン|バッタ/, 'うつ伏せ背中'],
];
function familyOf(ex){
  const n = `${ex.displayName || ''} ${ex.name || ''}`;
  for (const [re, f] of FAMILY_RULES) if (re.test(n)) return f;
  return null;
}
// 「引き締め」= お腹・お尻・脚・背中を実際に鍛える種目（静止して立つ・呼吸・バランスは含めない）
const TONING_TECH = new Set(['strength', 'core', 'pilates', 'endurance']);
const TONING_PARTS = new Set(['core', 'glutes', 'hip', 'leg', 'legs', 'back', 'fullbody', 'fullBody', 'whole', 'hamstring']);
function isToning(ex){
  return TONING_TECH.has(ex.technique) && TONING_PARTS.has(ex.bodyPart) && (ex.intensity || 1) >= 1
    && !/山のポーズ|まっすぐ立つ|合掌|呼吸|バランス|ストレッチ|のばし|ほぐし|リラックス|ゆらし/.test(`${ex.displayName || ''}${ex.name || ''}`);
}

// ----- 内部: 最少使用の1件を返す（除外・アンカー優先・主訴rank優先） -----
function pickOne(exList, usage, anchors, excludeIds, rank, focusRank, ctx){
  const famToday = ctx?.famToday || new Set();
  const famPrev  = ctx?.famPrev  || new Set();
  const famUsage = ctx?.famUsage || {};
  const score = (ex) => {
    const raw = usage[ex.id] || 0;
    let v = anchors && anchors.has(ex.id) ? raw * 0.5 : raw;
    const f = familyOf(ex);
    if (f){
      if (famPrev.has(f)) v += 1.5;                 // 前日と同じ系統は避ける
      v += (famUsage[f] || 0) * 0.15;               // 30日の中で系統が偏らないように
    }
    return v;
  };
  const rk = (ex) => (rank && rank.has(ex.id)) ? rank.get(ex.id) : 99;
  const base = exList.filter(ex => !excludeIds.includes(ex.id));
  // 同じ日に同じ系統は入れない（候補が尽きたときだけ許す）
  let pool = base.filter(ex => { const f = familyOf(ex); return !f || !famToday.has(f); });
  if (!pool.length) pool = base;
  const cand = pool.sort((a, b) => {
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
  return cand[0] || base[0] || null;
}

// ----- オーダーメイド＋変化の両立ピック -----
// count件のうち、可能な限り「問題直結(targeted)」を最低 wantTargeted 件含め、
// 残りは「変化用(variety)」から最少使用で選ぶ。どちらも足りなければ他方で埋める。
function pickBalanced(exList, targeted, usage, count, anchors, excludeIds, wantTargeted, rank, focusRank, primary, ctx){
  const picked = [];
  const exclude = [...excludeIds];
  const C = ctx || {};
  const note = (ex) => { const f = familyOf(ex); if (f && C.famToday) C.famToday.add(f); };
  const tList = exList.filter(ex => targeted.has(ex.id));
  const vList = exList.filter(ex => !targeted.has(ex.id));
  // 主訴（順位0の問題）に直結する種目。プールが小さい問題は使用回数の均しで負けて
  // 「主訴なのに二番目の問題より少ない」状態になっていたため、直結1枠目は主訴から選ぶ
  // 主訴の種目が少なすぎる（4未満）と同じ種目ばかりになるので、その場合は主訴優先を使わない
  const pAll = primary ? tList.filter(ex => primary.has(ex.id)) : [];
  const pList = pAll.length >= 4 ? pAll : [];
  // 直結種目が十分にある（10件以上）なら全枠を直結で埋める。
  // 従来は「半分は変化用」と決め打ちしており、直結が豊富でも30日の直結率が50%で止まっていた
  const want = tList.length >= 10 ? count : wantTargeted;

  // ① 問題直結を want 件（1件目は主訴を優先、無ければ他の直結から）
  for (let i = 0; i < want && picked.length < count; i++){
    let ex = null;
    if (i === 0 && pList.length){
      // 主訴優先も同じガード: 主訴の種目ばかり使い回していたら、他の直結種目に譲る
      const pr = pickOne(pList, usage, anchors, exclude, rank, focusRank, C);
      const t0 = pickOne(tList, usage, anchors, exclude, rank, focusRank, C);
      ex = (pr && t0 && (usage[pr.id] || 0) >= (usage[t0.id] || 0) + 2) ? t0 : pr;
    }
    if (!ex){
      const t = pickOne(tList, usage, anchors, exclude, rank, focusRank, C);
      // 2枠目以降: 直結種目の使い回しが変化用より2回以上多くなっていたら、変化用を挟んで単調さを防ぐ
      if (i > 0 && t && vList.length){
        const v = pickOne(vList, usage, anchors, exclude, rank, focusRank, C);
        ex = (v && (usage[t.id] || 0) >= (usage[v.id] || 0) + 2) ? v : t;
      } else ex = t;
    }
    if (!ex) break;
    picked.push(ex); exclude.push(ex.id); note(ex);
  }
  // ② 残りは変化用から
  while (picked.length < count){
    const ex = pickOne(vList, usage, anchors, exclude, rank, focusRank, C);
    if (!ex) break;
    picked.push(ex); exclude.push(ex.id); note(ex);
  }
  // ③ まだ足りなければ全体(targeted含む)から
  while (picked.length < count){
    const ex = pickOne(exList, usage, anchors, exclude, rank, focusRank, C);
    if (!ex) break;
    picked.push(ex); exclude.push(ex.id); note(ex);
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
  const goal = o.goal === 'look' ? 'look' : 'relief';   // 見た目を整えたい / 不調をやわらげたい
  // 痛み配慮・主訴フォーカスは、プールを作る直前にここで設定する。
  // （呼び出し側が別インスタンスの prescription-matrix を触っていても必ず効くようにするため）
  if (o.pain) setPainAvoidance(o.pain);
  if (o.focus) setFocusParts(o.focus);
  const pool = buildPrescriptionPool(problemKeys, course);
  const anchors = buildAnchors(problemKeys, course);
  const targeted = pool.targeted || new Set();
  const rank = pool.rank || new Map();
  const focusRank = pool.focusRank || null;
  const primary = new Set([...rank.entries()].filter(([, r]) => r === 0).map(([id]) => id));
  const sListAll = pool.selfcare;
  const tListAll = pool.training;
  const sList = sListAll;
  const tList = tListAll;

  const sUsage = Object.fromEntries(sList.map(ex => [ex.id, 0]));
  const tUsage = Object.fromEntries(tList.map(ex => [ex.id, 0]));
  const famUsage = {};

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
    // 帯の中に「その日の枠数×2＋2」以上ないと、前日除外で足りなくなるため段階的に緩める
    const banded = (list, need) => {
      const within = list.filter(ex => { const i = ex.intensity || 1; return i <= cap && i >= floor; });
      if (within.length >= need) return within;
      const capOnly = list.filter(ex => (ex.intensity || 1) <= cap);   // 帯が狭すぎたら上限だけ
      return capOnly.length >= need ? capOnly : list;
    };

    // 1日の種目数と配分: とれる時間 × 目的で決める（休息日はセルフケアのみ）
    //   不調をやわらげたい: 半々（4種なら 2:2）
    //   見た目を整えたい  : 鍛える側を厚く（4種なら 1:3、6種なら 2:4）
    let sCount, tCount;
    if (isRest){ sCount = Math.min(2, menuSize); tCount = 0; }
    else if (goal === 'look'){ sCount = Math.max(1, Math.floor(menuSize / 3)); tCount = menuSize - sCount; }
    else { sCount = Math.ceil(menuSize / 2); tCount = menuSize - sCount; }
    const sPool = banded(sList, Math.max(6, sCount * 2 + 2)), tPool = banded(tList, Math.max(6, tCount * 2 + 2));

    // 系統の追跡（同じ日・前日の被りを避ける）
    const famPrev = new Set(prev ? [...(prev.selfcare||[]), ...(prev.training||[])].map(familyOf).filter(Boolean) : []);
    const ctx = { famToday: new Set(), famPrev, famUsage };

    let selfcare, training = [];
    selfcare = pickBalanced(sPool, targeted, sUsage, sCount, anchors, prevIds, sHasTargeted ? 1 : 0, rank, focusRank, primary, ctx);
    if (!isRest) {
      const sameDayIds = selfcare.map(e => e.id);
      // 引き締め枠: 見た目目的は全期間、不調目的でも Phase2以降は毎日1枠、お腹・お尻・脚・背中を鍛える種目を入れる
      const wantToning = (goal === 'look' || phase >= 2) && tCount >= 1;
      let toning = null;
      if (wantToning){
        const tonePool = tPool.filter(isToning);
        if (tonePool.length >= 4){
          toning = pickOne(tonePool, tUsage, anchors, [...prevIds, ...sameDayIds], rank, focusRank, ctx);
          if (toning){ ctx.famToday.add(familyOf(toning) || ''); toning = Object.assign(Object.create(Object.getPrototypeOf(toning)), toning, { _slot: 'toning' }); }
        }
      }
      const rest = pickBalanced(tPool, targeted, tUsage, tCount - (toning ? 1 : 0), anchors, [...prevIds, ...sameDayIds, ...(toning ? [toning.id] : [])], tHasTargeted ? 1 : 0, rank, focusRank, primary, ctx);
      training = toning ? [...rest, toning] : rest;
    }

    selfcare.forEach(ex => { sUsage[ex.id] = (sUsage[ex.id]||0) + 1; const f = familyOf(ex); if (f) famUsage[f] = (famUsage[f]||0) + 1; });
    training.forEach(ex => { tUsage[ex.id] = (tUsage[ex.id]||0) + 1; const f = familyOf(ex); if (f) famUsage[f] = (famUsage[f]||0) + 1; });

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

export { pickTodayMenu, build30DayProgram, ALL_EXERCISES, familyOf, isToning };
