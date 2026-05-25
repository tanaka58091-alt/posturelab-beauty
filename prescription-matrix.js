// ===================================================================
// PRESCRIPTION MATRIX
// 全データベースを統合し、(問題キー × コース) で処方を返す
// ===================================================================

import { DB_SEITAI } from './db-seitai.js';
import { DB_PERSONAL } from './db-personal.js';
import { DB_YOGA } from './db-yoga.js';
import { DB_PILATES } from './db-pilates.js';

// ===== 全エクササイズを1つに統合 =====
const ALL_EXERCISES_LIST = [
  ...DB_SEITAI,
  ...DB_PERSONAL,
  ...DB_YOGA,
  ...DB_PILATES,
];

// ID → エクササイズオブジェクト
const ALL_EXERCISES = Object.fromEntries(
  ALL_EXERCISES_LIST.map(ex => [ex.id, ex])
);

// ===== カテゴリ分類 =====
// selfcare = stretch/release/mobility/breath/yoga(柔らかい系)
// training = strength/core/balance/integration
const SELFCARE_TECHNIQUES = new Set([
  'stretch','release','mobility','breath','pranayama','meditation',
]);
const TRAINING_TECHNIQUES = new Set([
  'strength','core','balance','plyometric','isometric','integration',
]);

function isSelfcare(ex){
  if (ex.category === 'selfcare') return true;
  if (ex.category === 'breath' || ex.category === 'meditation') return true;
  if (ex.category === 'mobility' && ex.intensity <= 1) return true;
  if (SELFCARE_TECHNIQUES.has(ex.technique)) return true;
  return false;
}

function isTraining(ex){
  if (ex.category === 'strength') return true;
  if (ex.category === 'core' && ex.intensity >= 2) return true;
  if (ex.category === 'balance') return true;
  if (ex.category === 'integration') return true;
  if (TRAINING_TECHNIQUES.has(ex.technique) && ex.intensity >= 2) return true;
  return false;
}

// ===== 問題 × コース のフィルタリング =====
// course: 'seitai' | 'personal' | 'yoga' | 'pilates' | 'mixed'
// 'mixed' は全コース許可
function filterByCourse(exList, course){
  if (course === 'mixed' || !course) return exList;
  return exList.filter(ex => ex.courses && ex.courses.includes(course));
}

// 問題キーに対するエクササイズプール作成
function buildPoolForProblem(problemKey, course){
  const matches = ALL_EXERCISES_LIST.filter(ex =>
    ex.targetProblems && ex.targetProblems.includes(problemKey)
  );
  const filtered = filterByCourse(matches, course);
  return {
    selfcare: filtered.filter(isSelfcare),
    training: filtered.filter(isTraining),
  };
}

// 複数の問題キーをマージしたプールを返す(コース指定可)
function buildPrescriptionPool(problemKeys, course='mixed'){
  const selfSet = new Map(); // id → exercise (重複排除)
  const trainSet = new Map();

  // 優先順位: 最初の問題キーから順に追加(順序保持のため Map)
  problemKeys.forEach(k => {
    const p = buildPoolForProblem(k, course);
    p.selfcare.forEach(ex => { if (!selfSet.has(ex.id)) selfSet.set(ex.id, ex); });
    p.training.forEach(ex => { if (!trainSet.has(ex.id)) trainSet.set(ex.id, ex); });
  });

  // 空 or 少なすぎる場合、generalで補完
  if (selfSet.size < 4 || trainSet.size < 4) {
    const general = buildPoolForProblem('general', course);
    general.selfcare.forEach(ex => { if (!selfSet.has(ex.id)) selfSet.set(ex.id, ex); });
    general.training.forEach(ex => { if (!trainSet.has(ex.id)) trainSet.set(ex.id, ex); });
  }

  // それでも足りなければ、コース全体から軽強度のものを補完
  if (selfSet.size < 4) {
    const fallback = filterByCourse(ALL_EXERCISES_LIST, course)
      .filter(ex => isSelfcare(ex) && ex.intensity <= 2);
    fallback.forEach(ex => { if (!selfSet.has(ex.id)) selfSet.set(ex.id, ex); });
  }
  if (trainSet.size < 4) {
    const fallback = filterByCourse(ALL_EXERCISES_LIST, course)
      .filter(ex => isTraining(ex));
    fallback.forEach(ex => { if (!trainSet.has(ex.id)) trainSet.set(ex.id, ex); });
  }

  return {
    selfcare: Array.from(selfSet.values()),
    training: Array.from(trainSet.values()),
  };
}

// アンカー: 各問題の代表種目1〜2個(優先処方される)
function buildAnchors(problemKeys, course='mixed'){
  const anchors = new Set();
  problemKeys.forEach(k => {
    const p = buildPoolForProblem(k, course);
    // 各問題のセルフケア・トレーニング1位ずつをアンカーに
    if (p.selfcare[0]) anchors.add(p.selfcare[0].id);
    if (p.training[0]) anchors.add(p.training[0].id);
  });
  return anchors;
}

// プール統計(UI表示用)
function getPoolStats(problemKeys, course='mixed'){
  const pool = buildPrescriptionPool(problemKeys, course);
  return {
    total: pool.selfcare.length + pool.training.length,
    selfcare: pool.selfcare.length,
    training: pool.training.length,
  };
}

export {
  ALL_EXERCISES,
  ALL_EXERCISES_LIST,
  buildPrescriptionPool,
  buildAnchors,
  buildPoolForProblem,
  getPoolStats,
  isSelfcare,
  isTraining,
};
