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
// ===== 分類（網羅版・死蔵ゼロ化）=====
// training = 筋力/持久力/バランス/有酸素を高める系
// selfcare = ストレッチ/モビリティ/呼吸/弛緩系
// どちらにも該当しないものは selfcare にフォールバック（＝プール未収載＝死蔵を防ぐ）
const TRAINING_CATEGORIES = new Set([
  'training','strength','core','balance','integration','cardio',
]);
const TRAINING_TECHNIQUES = new Set([
  'strength','core','balance','plyometric','isometric','integration','cardio','endurance',
]);
// アクティブに保持する系のasana（強度2以上はトレーニング寄り）
const ACTIVE_ASANA_TECH = new Set([
  'standing','backbend','inversion','balance','arm_balance','isometric',
]);
const SELFCARE_CATEGORIES = new Set([
  'selfcare','breath','meditation','pranayama','mobility','asana',
]);
const SELFCARE_TECHNIQUES = new Set([
  'stretch','release','mobility','breath','breathing','pranayama','meditation',
  'restorative','seated','twist','massage','forward_bend','supine',
]);

function isTraining(ex){
  const c = ex.category, t = ex.technique, i = ex.intensity || 1;
  if (TRAINING_CATEGORIES.has(c)) return true;
  if (TRAINING_TECHNIQUES.has(t)) return true;
  // アクティブなasana(立位・後屈・逆転・バランス)で強度2以上はトレーニング扱い
  if (c === 'asana' && ACTIVE_ASANA_TECH.has(t) && i >= 2) return true;
  return false;
}

function isSelfcare(ex){
  if (isTraining(ex)) return false;         // trainingを優先
  const c = ex.category, t = ex.technique;
  if (SELFCARE_CATEGORIES.has(c)) return true;
  if (SELFCARE_TECHNIQUES.has(t)) return true;
  // フォールバック: trainingでない残り(軽いasana・mobility等)は全てselfcareへ
  return true;
}

// ===== 40〜70代女性・道具なし安全フィルタ =====
// 道具を使わない、かつ年齢層に無理のないものだけ通す
// 家庭内で確実に用意できるものは許可（壁・椅子・タオル・クッション等）。
// 専用器具（フォームローラー・ボール・バー・ベルト等）は除外。
const SAFE_EQUIPMENT = new Set([
  'なし','マット','マットなし','',
  '壁','椅子','イス','ドア枠','タオル','クッション','座布団','机','階段','台','ソファ',
]);
function equipmentOk(eq){
  if (!eq) return true;
  // 複合（「マット/椅子」等）は全要素が家庭内アイテムならOK
  if (eq.includes('/')) return eq.split('/').every(x => SAFE_EQUIPMENT.has(x.trim()));
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
  // ★DB由来の初心者安全フラグを最優先ゲートに。
  // 敵対的監査(52歳・運動未経験・図なし主婦)で「体力的に無理／危険」と判定された種目は
  // beginnerSafe:false が付与済み。コース・強度・sn_*キュレーションに関係なく必ず除外する。
  // （UNSAFE_IDS/intensity ヒューリスティックを DB駆動で上書きする権威的フィルタ）
  if (ex.beginnerSafe === false) return false;
  if (UNSAFE_IDS.has(ex.id)) return false;
  if (UNSAFE_TECHNIQUES.has(ex.technique)) return false;
  if (!equipmentOk(ex.equipment)) return false;
  // sn_* は40〜70代女性向けに手動キュレーション済 → intensity 不問で通す
  // （ただし上の beginnerSafe:false で監査除外済みの sn_* は既に弾かれている）
  if (ex.id && ex.id.startsWith('sn_')) return true;
  // 40〜70代女性: intensity 3 はすべて除外（呼吸・瞑想のみ例外）
  if (ex.intensity >= 3) {
    if (ex.technique === 'pranayama' || ex.technique === 'meditation') return true;
    return false;
  }
  return true;
}

// ===== 痛み配慮（禁忌）フィルタ =====
// ユーザーが申告した痛み部位に強い負荷がかかる種目を処方から外す。
// フラグは診断のたびに app.js が setPainAvoidance() で設定する（既定は全てfalse=挙動不変）。
let PAIN_AVOID = { knee: false, lowBack: false, neck: false, shoulder: false, pregnant: false, bloodPressure: false };
function setPainAvoidance(flags){
  const f = flags || {};
  PAIN_AVOID = {
    knee: !!f.knee, lowBack: !!f.lowBack, neck: !!f.neck, shoulder: !!f.shoulder,
    pregnant: !!f.pregnant, bloodPressure: !!f.bloodPressure,
  };
}
// 部位・状態ごとの高負荷/不適切種目（表示名・正式名・手順文で判定）
const PAIN_EXCLUDE = {
  knee:    /スクワット|ランジ|踏み込|踏み出|空気イス|立ち座り|ステップ|踏み台|しゃがん|ひざ立ち|もも上げ/,
  lowBack: /上体起こし|起き上が|ロールアップ|レッグレイズ|両脚下ろし|下ろし上げ|Ｖ字|V字|ジャックナイフ|スーパーマン/,
  // 首: 頭の重さを支える/首を大きく動かす/頭を下げる系
  neck:    /首.*(回|まわ|ぐるぐる)|頭を持ち上げ|頭と肩を|クランチ|上体起こし|プランク|四つ這いで腕|うつ伏せ.*頭|ドルフィン|ダウンドッグ|前屈/,
  // 肩: 体重を腕で支える/頭上へ大きく上げる系
  shoulder:/腕立て|プランク|ディップ|ダウンドッグ|ドルフィン|四つ這いで腕|腕を頭の上|バンザイ|肩の高さより上/,
  // 妊娠中: うつ伏せ・強い腹圧・仰向け長時間・強いねじり
  pregnant:/うつ伏せ|腹ばい|クランチ|上体起こし|レッグレイズ|プランク|ねじ(り|る)|ツイスト|Ｖ字|V字|腹筋/,
  // 高血圧: 息こらえ・頭が心臓より下・逆位・強い等尺
  bloodPressure:/ダウンドッグ|ドルフィン|前屈|逆立|頭を下げ|息を止め|カパラバティ|火の呼吸|空気イス|プランク/,
};
// ===== 主訴フォーカス（同じ問題キーでも「何に困って来たか」で重点部位を変える）=====
// 例: 腰痛の人は腰まわり/体幹、下腹ぽっこりの人はお腹まわり を優先して当てる。
let FOCUS_PARTS = [];
function setFocusParts(parts){
  FOCUS_PARTS = Array.isArray(parts) ? parts.filter(Boolean) : [];
}
// 種目が主訴の重点部位に合致するか（0=最優先, 1=次点, 99=該当なし）
function focusRank(ex){
  if (!FOCUS_PARTS.length) return 99;
  const bp = String(ex.bodyPart || '').toLowerCase();
  const i = FOCUS_PARTS.findIndex(p => bp === String(p).toLowerCase());
  return i < 0 ? 99 : i;
}

function passesPainRules(ex){
  const name = `${ex.displayName || ''} ${ex.name || ''}`;
  // 首・肩・妊娠中・高血圧は動作の中身にも現れるため手順文まで見る
  const deep = `${name} ${Array.isArray(ex.how) ? ex.how.join(' ') : ''}`;
  for (const key of ['knee', 'lowBack']){
    if (PAIN_AVOID[key] && PAIN_EXCLUDE[key].test(name)) return false;
  }
  for (const key of ['neck', 'shoulder', 'pregnant', 'bloodPressure']){
    if (PAIN_AVOID[key] && PAIN_EXCLUDE[key].test(deep)) return false;
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

// ===== コースらしさ（4プランの性格づけ）=====
// 問題: sn_(高齢者向け安全種目175種)は全4コースにタグ付けされているため、
// どのコースを選んでも同じ顔ぶれになっていた（各プールの67〜73%が共通）。
// 対策: 「専用DB由来 → そのコースの中核」「sn_ → 動きの性格でコースへ振り分け」の2段階で優先度をつける。
const NATIVE_DB = { st:'seitai', pt:'personal', yg:'yoga', pl:'pilates' };
// sn_ をどのコースの性格として扱うか（technique基準）
const SN_CHARACTER = {
  seitai:   new Set(['release','stretch','mobility']),            // ゆるめる・動かす
  personal: new Set(['strength','isometric','cardio','balance']), // 鍛える・支える
  yoga:     new Set(['stretch','pranayama','meditation','balance']), // のばす・呼吸・静止
  pilates:  new Set(['core','breath','mobility']),                // 体幹・呼吸・背骨
};
// 0 = そのコースの中核 / 1 = 性格が合う / 2 = 合わない（他コース由来）
function courseAffinity(ex, course){
  if (!course || course === 'mixed') return 0;
  const p = String(ex.id || '').slice(0, 2);
  const native = NATIVE_DB[p];
  if (native) return native === course ? 0 : 2;
  if (p === 'sn') return (SN_CHARACTER[course] || new Set()).has(ex.technique) ? 1 : 2;
  return 2;
}
// コースの中核から順に、必要数(minN)まで採用する。中核だけで足りなければ性格の近いもので補う。
// 各段階の中では「問題直結(targeted)」を先に残し、オーダーメイド性を落とさない。
// MIN_TARGETED: 問題直結の種目がこれを下回ると、毎日同じ1種目ばかりになるため、
// コース外からでも問題直結種目を確保する（オーダーメイド性と変化の両立）
function applyCourseCharacter(list, course, minN, targeted, minTargeted = 8){
  if (!course || course === 'mixed') return list;
  const isT = (ex) => !!(targeted && targeted.has(ex.id));
  const tier = [[], [], []];
  list.forEach(ex => tier[courseAffinity(ex, course)].push(ex));
  tier.forEach(t => t.sort((a, b) => (isT(a) ? 0 : 1) - (isT(b) ? 0 : 1)));
  const out = tier[0].slice();
  const seen = new Set(out.map(ex => ex.id));
  const add = (ex) => { if (!seen.has(ex.id)){ seen.add(ex.id); out.push(ex); } };
  // ① 問題直結の最低数を確保（足りなければコース外からも引く）
  let tn = out.filter(isT).length;
  for (const t of [tier[1], tier[2]]){
    for (const ex of t){
      if (tn >= minTargeted) break;
      if (isT(ex)){ add(ex); tn++; }
    }
  }
  // ② 変化の幅を必要数まで確保
  for (const t of [tier[1], tier[2]]){
    for (const ex of t){
      if (out.length >= minN) break;
      add(ex);
    }
  }
  return out.length ? out : list;
}

// 問題キーに対するエクササイズプール作成（40〜70代女性・道具なし対応）
function buildPoolForProblem(problemKey, course){
  const matches = ALL_EXERCISES_LIST.filter(ex =>
    ex.targetProblems && ex.targetProblems.includes(problemKey)
  );
  const filtered = filterByCourse(matches, course).filter(isSeniorSafe).filter(passesPainRules);
  // コースの中核種目を先頭へ（アンカー＝各問題の代表種目が「そのコースらしい」ものになる）
  const byCourse = filtered.slice().sort((a, b) => courseAffinity(a, course) - courseAffinity(b, course));
  return {
    selfcare: byCourse.filter(isSelfcare),
    training: byCourse.filter(isTraining),
  };
}

// 複数の問題キーをマージしたプールを返す(コース指定可)
function buildPrescriptionPool(problemKeys, course='mixed'){
  const selfSet = new Map(); // id → exercise (重複排除)
  const trainSet = new Map();

  // 優先順位: 最初の問題キーから順に追加(順序保持のため Map)
  // ここで入る種目 = ユーザーの姿勢問題に直結する「targeted(オーダーメイド)」種目。
  // rank = その種目を最初に引き込んだ問題の順位(0=主訴)。処方の優先度に使う。
  const rank = new Map();
  problemKeys.forEach((k, idx) => {
    const p = buildPoolForProblem(k, course);
    p.selfcare.forEach(ex => { if (!selfSet.has(ex.id)){ selfSet.set(ex.id, ex); rank.set(ex.id, idx); } });
    p.training.forEach(ex => { if (!trainSet.has(ex.id)){ trainSet.set(ex.id, ex); rank.set(ex.id, idx); } });
  });
  // この時点のidが「問題直結(targeted)」。以降の補充は「変化用(variety)」として区別する。
  const targeted = new Set([...selfSet.keys(), ...trainSet.keys()]);

  // 30日プログラムが単調にならないよう、必ず十分な種類数まで補充する。
  // 問題に紐づく種目(=アンカー)は既に入っており優先処方される。ここでは
  // general＋コース全体の安全な種目を足して「変化の幅」を確保する。
  // 目標: セルフケア24種 / トレーニング20種（各日2種×30日でも同一種目の再登場を抑える）
  const MIN_SELF = 24, MIN_TRAIN = 20;

  // ① general の種目で補充
  if (selfSet.size < MIN_SELF || trainSet.size < MIN_TRAIN) {
    const general = buildPoolForProblem('general', course);
    general.selfcare.forEach(ex => { if (!selfSet.has(ex.id)) selfSet.set(ex.id, ex); });
    general.training.forEach(ex => { if (!trainSet.has(ex.id)) trainSet.set(ex.id, ex); });
  }

  // ② それでも足りなければ、コース全体の安全な種目で目標数まで補充
  if (selfSet.size < MIN_SELF) {
    const fallback = filterByCourse(ALL_EXERCISES_LIST, course)
      .filter(ex => isSelfcare(ex) && ex.intensity <= 2 && isSeniorSafe(ex) && passesPainRules(ex));
    for (const ex of fallback) {
      if (selfSet.size >= MIN_SELF) break;
      if (!selfSet.has(ex.id)) selfSet.set(ex.id, ex);
    }
  }
  if (trainSet.size < MIN_TRAIN) {
    const fallback = filterByCourse(ALL_EXERCISES_LIST, course)
      .filter(ex => isTraining(ex) && isSeniorSafe(ex) && passesPainRules(ex));
    for (const ex of fallback) {
      if (trainSet.size >= MIN_TRAIN) break;
      if (!trainSet.has(ex.id)) trainSet.set(ex.id, ex);
    }
  }

  // ③ コースの性格づけ: 中核種目を残しつつ、変化の幅(TARGET数)は確保する
  //    ここを通すことで「整体を選んだ人」と「ヨガを選んだ人」の顔ぶれが実際に変わる
  const TARGET_SELF = 32, TARGET_TRAIN = 28;
  const selfcare = applyCourseCharacter(Array.from(selfSet.values()), course, TARGET_SELF, targeted);
  const training = applyCourseCharacter(Array.from(trainSet.values()), course, TARGET_TRAIN, targeted);

  return {
    selfcare,
    training,
    targeted, // 問題直結種目のidセット(オーダーメイドの核)
    rank,     // id → 引き込んだ問題の順位(0=主訴)。補充分は未登録
    focusRank,// 関数: 種目→主訴フォーカス順位(0が最優先/99=該当なし)
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
  setPainAvoidance,
  setFocusParts,
  focusRank,
  ALL_EXERCISES_LIST,
  buildPrescriptionPool,
  buildAnchors,
  buildPoolForProblem,
  getPoolStats,
  isSelfcare,
  isTraining,
};
