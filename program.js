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
} from './prescription-matrix.js';

// ----- 内部: 最少使用の1件を返す（除外・アンカー優先） -----
function pickOne(exList, usage, anchors, excludeIds){
  const score = (ex) => {
    const raw = usage[ex.id] || 0;
    return anchors && anchors.has(ex.id) ? raw * 0.5 : raw;
  };
  const cand = exList
    .filter(ex => !excludeIds.includes(ex.id))
    .sort((a, b) => {
      const sa = score(a), sb = score(b);
      if (sa !== sb) return sa - sb;
      const aa = anchors && anchors.has(a.id) ? 0 : 1;
      const ab = anchors && anchors.has(b.id) ? 0 : 1;
      return aa - ab;
    });
  return cand[0] || exList.filter(ex => !excludeIds.includes(ex.id))[0] || null;
}

// ----- オーダーメイド＋変化の両立ピック -----
// count件のうち、可能な限り「問題直結(targeted)」を最低 wantTargeted 件含め、
// 残りは「変化用(variety)」から最少使用で選ぶ。どちらも足りなければ他方で埋める。
function pickBalanced(exList, targeted, usage, count, anchors, excludeIds, wantTargeted){
  const picked = [];
  const exclude = [...excludeIds];
  const tList = exList.filter(ex => targeted.has(ex.id));
  const vList = exList.filter(ex => !targeted.has(ex.id));

  // ① 問題直結を wantTargeted 件
  for (let i = 0; i < wantTargeted && picked.length < count; i++){
    const ex = pickOne(tList, usage, anchors, exclude);
    if (!ex) break;
    picked.push(ex); exclude.push(ex.id);
  }
  // ② 残りは変化用から
  while (picked.length < count){
    const ex = pickOne(vList, usage, anchors, exclude);
    if (!ex) break;
    picked.push(ex); exclude.push(ex.id);
  }
  // ③ まだ足りなければ全体(targeted含む)から
  while (picked.length < count){
    const ex = pickOne(exList, usage, anchors, exclude);
    if (!ex) break;
    picked.push(ex); exclude.push(ex.id);
  }
  return picked;
}

// ===== 今日のメニュー: セルフケア2 + トレーニング2（各1件は問題直結）=====
function pickTodayMenu(problemKeys, course='mixed'){
  const prog = build30DayProgram(problemKeys, course);
  const d1 = prog.find(d => !d.isRest) || prog[0];
  return { selfcare: d1.selfcare, training: d1.training };
}

// ===== 30日プログラム生成 =====
function build30DayProgram(problemKeys, course='mixed'){
  const pool = buildPrescriptionPool(problemKeys, course);
  const anchors = buildAnchors(problemKeys, course);
  const targeted = pool.targeted || new Set();
  const sList = pool.selfcare;
  const tList = pool.training;

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

    let selfcare, training;
    if (isRest) {
      selfcare = pickBalanced(sList, targeted, sUsage, 2, anchors, prevIds, sHasTargeted ? 1 : 0);
      training = [];
    } else {
      selfcare = pickBalanced(sList, targeted, sUsage, 2, anchors, prevIds, sHasTargeted ? 1 : 0);
      const sameDayIds = selfcare.map(e => e.id);
      training = pickBalanced(tList, targeted, tUsage, 2, anchors, [...prevIds, ...sameDayIds], tHasTargeted ? 1 : 0);
    }

    selfcare.forEach(ex => { sUsage[ex.id] = (sUsage[ex.id]||0) + 1; });
    training.forEach(ex => { tUsage[ex.id] = (tUsage[ex.id]||0) + 1; });

    const theme = themeFor(phase, dayInPhase, isRest, course);

    days.push({ day, phase, isRest, theme, selfcare, training, course });
  }

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
