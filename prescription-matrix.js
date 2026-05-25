// ===================================================================
// PRESCRIPTION MATRIX
// 全データベースを統合し、(問題キー × コース) で処方を返す
// ===================================================================

import { DB_SEITAI } from './db-seitai.js';
import { DB_PERSONAL } from './db-personal.js';
import { DB_YOGA } from './db-yoga.js';
import { DB_PILATES } from './db-pilates.js';
import { DB_SENIOR } from './db-senior.js';

// ===== 全エクササイズを1つに統合 =====
const ALL_EXERCISES_LIST = [
  ...DB_SEITAI,
  ...DB_PERSONAL,
  ...DB_YOGA,
  ...DB_PILATES,
  ...DB_SENIOR,
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

// ===== 40〜70代女性・道具なし安全フィルタ =====
// 道具を使わない、かつ年齢層に無理のないものだけ通す
const SAFE_EQUIPMENT = new Set(['なし','マット','マットなし','']);
function equipmentOk(eq){
  if (!eq) return true;
  // 「マット/椅子」「タオル/ベルト」など複合も道具扱いで除外
  if (eq.includes('/')) return false;
  return SAFE_EQUIPMENT.has(eq);
}

// 高難度・高衝撃・逆位など、40〜70代女性に不適切な種目を除外
const UNSAFE_TECHNIQUES = new Set(['plyometric']); // ジャンプ系は全除外
const UNSAFE_IDS = new Set([
  // ヨガ: 逆転・高難度
  'yg_shoulder_stand','yg_plow_pose','yg_wheel_pose','yg_crow_pose',
  'yg_dancer_pose','yg_reclining_hero','yg_half_moon','yg_revolved_triangle',
  // ピラティス: 高難度コア
  'pl_jackknife_basic','pl_corkscrew_advanced','pl_teaser_variation_3',
  'pl_rocking','pl_swan_advanced','pl_double_leg_kick',
  // パーソナル: 高難度自重
  'pt_pseudo_planche','pt_dive_bomber','pt_dragon_flag_prep','pt_l_sit_progression',
  'pt_archer_pushup','pt_diamond_pushup','pt_decline_pushup','pt_pike_pushup',
  'pt_pike_holds','pt_shrimp_squat','pt_skater_squat','pt_pistol_progression',
  'pt_reverse_nordic','pt_jump_squat','pt_skater_jump','pt_squat_thrust',
  'pt_high_knees','pt_butt_kicks','pt_burpee','pt_mountain_climber',
  'pt_jumping_jack','pt_v_up','pt_hollow_rock','pt_hanging_knee_raise',
  'pt_dead_hang','pt_inverted_row','pt_scapular_pullup',
  'pt_plank_to_pushup','pt_bear_crawl','pt_crab_walk',
  'pt_side_plank_dip','pt_side_plank_reach',
]);

function isSeniorSafe(ex){
  if (UNSAFE_IDS.has(ex.id)) return false;
  if (UNSAFE_TECHNIQUES.has(ex.technique)) return false;
  if (!equipmentOk(ex.equipment)) return false;
  // sn_* は40〜70代女性向けに手動キュレーション済 → intensity 不問で通す
  if (ex.id && ex.id.startsWith('sn_')) return true;
  // 40〜70代女性: intensity 3 はすべて除外（呼吸・瞑想のみ例外）
  if (ex.intensity >= 3) {
    if (ex.technique === 'pranayama' || ex.technique === 'meditation') return true;
    return false;
  }
  return true;
}

// ===== 問題 × コース のフィルタリング =====
// course: 'seitai' | 'personal' | 'yoga' | 'pilates' | 'mixed'
// 'mixed' は全コース許可
function filterByCourse(exList, course){
  if (course === 'mixed' || !course) return exList;
  return exList.filter(ex => ex.courses && ex.courses.includes(course));
}

// 問題キーに対するエクササイズプール作成（40〜70代女性・道具なし対応）
function buildPoolForProblem(problemKey, course){
  const matches = ALL_EXERCISES_LIST.filter(ex =>
    ex.targetProblems && ex.targetProblems.includes(problemKey)
  );
  const filtered = filterByCourse(matches, course).filter(isSeniorSafe);
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
      .filter(ex => isSelfcare(ex) && ex.intensity <= 2 && isSeniorSafe(ex));
    fallback.forEach(ex => { if (!selfSet.has(ex.id)) selfSet.set(ex.id, ex); });
  }
  if (trainSet.size < 4) {
    const fallback = filterByCourse(ALL_EXERCISES_LIST, course)
      .filter(ex => isTraining(ex) && isSeniorSafe(ex));
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
