// ===================================================================
// 30-DAY PROGRAM GENERATOR
// Phase 1 (Day 1-10):  解放 (Release)     - 主にセルフケア中心、軽い活性化
// Phase 2 (Day 11-20): 活性化 (Activation) - 弱化筋への明確な刺激
// Phase 3 (Day 21-30): 統合 (Integration)  - 機能的・複合動作で習慣化
// Day 7, 14, 21, 28 はアクティブレスト(軽めメニュー)
// ===================================================================
import { EXERCISES, PRESCRIPTION_MAP } from './exercises.js';

// 問題キー(優先度順)からセルフケア・トレーニングの候補プールを作る
function buildPools(problemKeys){
  const selfPool = new Set();
  const trainPool = new Set();

  problemKeys.forEach(k => {
    const map = PRESCRIPTION_MAP[k] || PRESCRIPTION_MAP.general;
    map.selfcare.forEach(id => selfPool.add(id));
    map.training.forEach(id => trainPool.add(id));
  });
  // 候補がスカスカなら general 追加
  PRESCRIPTION_MAP.general.selfcare.forEach(id => selfPool.add(id));
  PRESCRIPTION_MAP.general.training.forEach(id => trainPool.add(id));

  return {
    selfcare: Array.from(selfPool),
    training: Array.from(trainPool),
  };
}

// 問題キーから「アンカー」(各問題の最重要種目)を抽出。
// アンカーは姿勢改善に直結するので、被ってOK・繰り返し処方される。
function buildAnchors(problemKeys){
  const anchors = new Set();
  problemKeys.forEach(k => {
    const map = PRESCRIPTION_MAP[k] || PRESCRIPTION_MAP.general;
    if (map.selfcare[0]) anchors.add(map.selfcare[0]);
    if (map.training[0]) anchors.add(map.training[0]);
  });
  return anchors;
}

// 今日のメニュー: セルフケア2 + トレーニング2 を、問題キーから優先処方
function pickTodayMenu(problemKeys){
  const pools = buildPools(problemKeys);
  const selfcare = pools.selfcare.slice(0, 2).map(id => EXERCISES[id]);
  const training = pools.training.slice(0, 2).map(id => EXERCISES[id]);
  return { selfcare, training };
}

// 使用回数とアンカーを考慮した最少使用ピック
// - 同じ前日に出した種目は基本除外(連続回避)
// - アンカーは effectiveUsage = actual / 2 として優先的に再選択を許可
// - 同じ使用回数では、まだ前回出ていない種目を優先
function pickLeastUsed(idList, usage, count, anchors, excludeIds){
  const score = (id) => {
    const raw = usage[id] || 0;
    return anchors.has(id) ? raw * 0.5 : raw; // anchors penalize less for repetition
  };

  // 1st pass: 前日と被らない候補のみで使用回数順
  const primary = idList
    .filter(id => !excludeIds.includes(id))
    .sort((a, b) => {
      const sa = score(a), sb = score(b);
      if (sa !== sb) return sa - sb;
      // 同点ならアンカー優先(姿勢改善に直結)
      const aa = anchors.has(a) ? 0 : 1;
      const ab = anchors.has(b) ? 0 : 1;
      return aa - ab;
    });

  const picked = primary.slice(0, count);

  // 2nd pass: 候補不足の場合、前日メニューからも借りる
  if (picked.length < count) {
    const fallback = idList
      .filter(id => !picked.includes(id))
      .sort((a, b) => score(a) - score(b));
    while (picked.length < count && fallback.length) {
      picked.push(fallback.shift());
    }
  }

  return picked.map(id => EXERCISES[id]).filter(Boolean);
}

// 30日プログラム生成
// 各日: theme + 4 exercises (2 selfcare + 2 training, レスト日はセルフケア2のみ)
// 使用カウンタで偏りを抑え、アンカー種目だけ意図的に繰り返す
function build30DayProgram(problemKeys){
  const pools = buildPools(problemKeys);
  const anchors = buildAnchors(problemKeys);
  const sList = pools.selfcare;
  const tList = pools.training;

  const sUsage = Object.fromEntries(sList.map(id => [id, 0]));
  const tUsage = Object.fromEntries(tList.map(id => [id, 0]));

  const days = [];

  for (let day = 1; day <= 30; day++) {
    const phase = day <= 10 ? 1 : day <= 20 ? 2 : 3;
    const isRest = (day % 7 === 0); // 7,14,21,28
    const dayInPhase = day <= 10 ? day : day <= 20 ? day-10 : day-20;

    // 前日に出した種目IDを取得(連続回避用)
    const prev = days[days.length-1];
    const prevIds = prev
      ? [...(prev.selfcare||[]), ...(prev.training||[])].map(e => e.id)
      : [];

    let selfcare, training;
    if (isRest) {
      // アクティブレスト: 軽いセルフケア2のみ。前日と被らないものを優先。
      selfcare = pickLeastUsed(sList, sUsage, 2, anchors, prevIds);
      training = [];
    } else {
      selfcare = pickLeastUsed(sList, sUsage, 2, anchors, prevIds);
      // セルフケアで選んだIDは同日トレーニング側からも除外(まずないが念のため)
      const sameDayIds = selfcare.map(e => e.id);
      training = pickLeastUsed(tList, tUsage, 2, anchors, [...prevIds, ...sameDayIds]);
    }

    selfcare.forEach(ex => { sUsage[ex.id] = (sUsage[ex.id]||0) + 1; });
    training.forEach(ex => { tUsage[ex.id] = (tUsage[ex.id]||0) + 1; });

    const theme = themeFor(phase, dayInPhase, isRest);

    days.push({
      day, phase, isRest, theme,
      selfcare, training,
    });
  }

  return days;
}

function themeFor(phase, dayInPhase, isRest){
  if (isRest) return 'アクティブレスト・呼吸を整える';
  const themes = {
    1: [
      '導入・身体を知る',
      '筋膜リリースの導入',
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
  return themes[phase][dayInPhase-1];
}

export { pickTodayMenu, build30DayProgram };
