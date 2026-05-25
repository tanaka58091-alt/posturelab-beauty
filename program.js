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

// ----- 内部: 使用回数を見て最少使用ピック -----
function pickLeastUsed(exList, usage, count, anchors, excludeIds){
  const score = (ex) => {
    const raw = usage[ex.id] || 0;
    return anchors.has(ex.id) ? raw * 0.5 : raw;
  };

  const primary = exList
    .filter(ex => !excludeIds.includes(ex.id))
    .sort((a, b) => {
      const sa = score(a), sb = score(b);
      if (sa !== sb) return sa - sb;
      const aa = anchors.has(a.id) ? 0 : 1;
      const ab = anchors.has(b.id) ? 0 : 1;
      return aa - ab;
    });

  const picked = primary.slice(0, count);

  if (picked.length < count) {
    const fallback = exList
      .filter(ex => !picked.includes(ex))
      .sort((a, b) => score(a) - score(b));
    while (picked.length < count && fallback.length) {
      picked.push(fallback.shift());
    }
  }
  return picked;
}

// ===== 今日のメニュー: セルフケア2 + トレーニング2 =====
function pickTodayMenu(problemKeys, course='mixed'){
  const pool = buildPrescriptionPool(problemKeys, course);
  const selfcare = pool.selfcare.slice(0, 2);
  const training = pool.training.slice(0, 2);
  return { selfcare, training };
}

// ===== 30日プログラム生成 =====
function build30DayProgram(problemKeys, course='mixed'){
  const pool = buildPrescriptionPool(problemKeys, course);
  const anchors = buildAnchors(problemKeys, course);
  const sList = pool.selfcare;
  const tList = pool.training;

  const sUsage = Object.fromEntries(sList.map(ex => [ex.id, 0]));
  const tUsage = Object.fromEntries(tList.map(ex => [ex.id, 0]));

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
      selfcare = pickLeastUsed(sList, sUsage, 2, anchors, prevIds);
      training = [];
    } else {
      selfcare = pickLeastUsed(sList, sUsage, 2, anchors, prevIds);
      const sameDayIds = selfcare.map(e => e.id);
      training = pickLeastUsed(tList, tUsage, 2, anchors, [...prevIds, ...sameDayIds]);
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
