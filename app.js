// ===================================================================
// MAIN APP CONTROLLER
// ===================================================================
import {
  analyzeSide, analyzeFront,
  detectProblems, determinePostureType,
  calcScore, calcRegionScores, gradeFromScore, buildMetricsList, LM
} from './analyzer.js';
import { pickTodayMenu, build30DayProgram, ALL_EXERCISES } from './program.js';
import { getKnowledgeFor } from './knowledge.js';
import { COURSES, COURSE_ORDER, recommendCourse } from './courses.js';
import { getPoolStats, setPainAvoidance, setFocusParts } from './prescription-matrix.js';
import * as Store from './storage.js';

// ===== DOM refs =====
const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

const els = {
  fileSide: $('#file-side'),
  fileFront: $('#file-front'),
  canvasSide: $('#canvas-side'),
  canvasFront: $('#canvas-front'),
  previewSide: $('#preview-side'),
  previewFront: $('#preview-front'),
  btnAnalyze: $('#btn-analyze'),
  btnSimple: $('#btn-simple'),
  loader: $('#loader'),
  loaderText: $('#loader-text'),
  results: $('#results'),

  scoreArc: $('#score-arc'),
  scoreValue: $('#score-value'),
  scoreGrade: $('#score-grade'),
  scoreDesc: $('#score-desc'),
  postureType: $('#posture-type'),
  postureTypeDesc: $('#posture-type-desc'),
  postureTypeTags: $('#posture-type-tags'),
  metricsList: $('#metrics-list'),
  overlaySide: $('#overlay-side'),
  overlayFront: $('#overlay-front'),
  frontPane: $('#front-pane'),

  problemsList: $('#problems-list'),
  knowledgeGrid: $('#knowledge-grid'),
  todayGrid: $('#today-grid'),
  programGrid: $('#program-grid'),
  phaseTabs: $('#phase-tabs'),

  modal: $('#modal'),
  modalBody: $('#modal-body'),
  btnPrint: $('#btn-print'),
  btnRestart: $('#btn-restart'),

  symptomChips: $('#symptom-chips'),
  symptomFree: $('#symptom-free'),
  symptomSummary: $('#symptom-summary'),

  courseGrid: $('#course-grid'),
  courseSection: $('#course-section'),
  courseRecommend: $('#course-recommend'),

  btnMyData: $('#btn-mydata'),
  mydata: $('#mydata'),
  mydataBody: $('#mydata-body'),
};

// ===== State =====
const state = {
  imgSide: null,
  imgFront: null,
  landmarker: null,
  resultSide: null,
  resultFront: null,
  problems: [],
  program: null,
  currentPhase: 1,
  symptoms: [],
  symptomFree: '',
  selectedCourse: 'mixed',
  recommendation: null,
};

// ===== Symptom → Problem mapping =====
// 各症状を、対応する姿勢問題キーへマッピング。複数キーを持つ症状もある。
// keys: 姿勢問題キー / focus: その悩み特有の重点(同じキーでも狙いを変える)
//   bodyPart = 優先して当てたい部位(exercise.bodyPartと照合) / note = 診断文に足す一文
const SYMPTOM_MAP = {
  shoulderStiff:  { label:'肩こり',           keys:['forwardHead','roundedShoulders'],
    focus:{ bodyPart:['neck','shoulder'], note:'肩まわりのこりをほぐす動きを多めに組みました。' } },
  neckStiff:      { label:'首こり・頭痛',     keys:['forwardHead','thoracicKyphosis'],
    focus:{ bodyPart:['neck'], note:'首まわりをゆるめる動きを最優先にしています。' } },
  lowBackPain:    { label:'腰痛',             keys:['anteriorPelvicTilt','swayBack'],
    focus:{ bodyPart:['hip','back','spine'], note:'腰の負担を減らすため、腰まわり・股関節をゆるめる動きを中心にしています。' } },
  aptAware:       { label:'反り腰の自覚',     keys:['anteriorPelvicTilt'],
    focus:{ bodyPart:['hip','core'], note:'骨盤の傾きを整える動きを中心にしています。' } },
  rsAware:        { label:'巻き肩の自覚',     keys:['roundedShoulders'],
    focus:{ bodyPart:['shoulder','chest'], note:'胸の前を開く動きを中心にしています。' } },
  kyphosisAware:  { label:'猫背の自覚',       keys:['thoracicKyphosis','roundedShoulders'],
    focus:{ bodyPart:['back','chest'], note:'背中を伸ばす動きと胸を開く動きを組み合わせています。' } },
  kneePain:       { label:'膝の痛み',         keys:['kneeValgus','ankleStiffness'],
    focus:{ bodyPart:['hip','foot','legs'], note:'ひざへの負担を避け、まわりの股関節・足首から整えます。' } },
  oxLeg:          { label:'O脚・X脚',         keys:['kneeValgus','kneeVarus'],
    focus:{ bodyPart:['hip','leg','glutes'], note:'脚のラインに関わる股関節まわりを中心にしています。' } },
  oLeg:           { label:'O脚',               keys:['kneeVarus'],
    focus:{ bodyPart:['hip','leg','glutes'], note:'内ももとお尻の横を使う動きを中心にしています。' } },
  xLeg:           { label:'X脚',               keys:['kneeValgus'],
    focus:{ bodyPart:['hip','leg','glutes'], note:'お尻の横を使う動きを中心にしています。' } },
  scoliosisAware: { label:'側弯の自覚',         keys:['scoliosis','lateralAsymmetry'],
    focus:{ bodyPart:['back','core'], note:'左右差に配慮し、体側と背中を整える動きを入れています。' } },
  shallowBreath:  { label:'呼吸が浅い',       keys:['roundedShoulders','thoracicKyphosis'],
    focus:{ bodyPart:['chest','breath','spine'], note:'呼吸がしやすいよう、胸郭を広げる動きと呼吸法を多めにしています。' } },
  swelling:       { label:'浮腫み・むくみ',   keys:['ankleStiffness','posteriorPelvicTilt'],
    focus:{ bodyPart:['foot','leg','legs'], note:'脚の巡りを促す足首・ふくらはぎの動きを中心にしています。' } },
  coldness:       { label:'冷え性',           keys:['posteriorPelvicTilt','swayBack'],
    focus:{ bodyPart:['leg','legs','glutes'], note:'体を温めるよう、大きな筋肉を動かす種目と呼吸を組み合わせています。' } },
  fatigue:        { label:'疲れやすい',       keys:['thoracicKyphosis','swayBack'],
    focus:{ bodyPart:['back','core','breath'], note:'疲れにくい姿勢づくりのため、背中の支えと呼吸を整えます。' } },
  hipImbalance:   { label:'左右の歪み',       keys:['lateralAsymmetry'],
    focus:{ bodyPart:['hip','core'], note:'左右差に配慮し、片側ずつ整える動きを入れています。' } },
  bellyOut:       { label:'下腹ぽっこり',     keys:['anteriorPelvicTilt','swayBack'],
    focus:{ bodyPart:['core','glutes'], note:'下腹の支えをつくるため、お腹まわりを使う動きを中心にしています。' } },
};

// 自由記入欄のキーワード → 姿勢問題キー（②お悩みをプログラムに反映）
const FREE_TEXT_RULES = [
  { re:/(肩こり|肩が|肩の|肩凝)/, keys:['roundedShoulders','forwardHead'] },
  { re:/(首|頭痛|ストレートネック|うなじ)/, keys:['forwardHead'] },
  { re:/(反り腰|反って|腰が反)/, keys:['anteriorPelvicTilt'] },
  { re:/(腰痛|腰が|ぎっくり|腰の痛)/, keys:['anteriorPelvicTilt','swayBack'] },
  { re:/(猫背|背中が丸|まるまっ|円背)/, keys:['thoracicKyphosis','roundedShoulders'] },
  { re:/(巻き肩|まきがた|巻肩)/, keys:['roundedShoulders'] },
  { re:/(o脚|オーきゃく|がに股|ガニ股)/i, keys:['kneeVarus'] },
  { re:/(x脚|エックス脚|内股|うちまた)/i, keys:['kneeValgus'] },
  { re:/(側弯|そくわん|背骨.{0,3}曲|背骨.{0,3}カーブ)/, keys:['scoliosis','lateralAsymmetry'] },
  { re:/(むくみ|浮腫|ふくらはぎ|足首)/, keys:['ankleStiffness','posteriorPelvicTilt'] },
  { re:/(冷え|ひえ性|冷え性)/, keys:['posteriorPelvicTilt','swayBack'] },
  { re:/(下腹|ぽっこり|ポッコリ|お腹.{0,3}出)/, keys:['anteriorPelvicTilt','swayBack'] },
  { re:/(歪み|ゆがみ|左右差|傾き|肩の高さ|骨盤.{0,3}傾)/, keys:['lateralAsymmetry'] },
  { re:/(膝|ひざ|ヒザ)/, keys:['kneeValgus','ankleStiffness'] },
  { re:/(呼吸|息が|息苦)/, keys:['roundedShoulders','thoracicKyphosis'] },
  { re:/(疲れ|だるい|肩甲骨|疲労)/, keys:['thoracicKyphosis','swayBack'] },
  { re:/(お尻|ヒップ|垂れ尻|尻が下)/, keys:['posteriorPelvicTilt'] },
];
function parseFreeTextKeys(text){
  if (!text) return [];
  const out = new Set();
  FREE_TEXT_RULES.forEach(rule => { if (rule.re.test(text)) rule.keys.forEach(k => out.add(k)); });
  return [...out];
}

// 症状(チェック)＋自由記入 から追加問題キーを作る
// 複数の悩みが同じ問題を指すほど「票」が集まり、優先順位が上がる
function buildSymptomProblems(){
  const votes = new Map();   // key → 票数
  const order = [];          // 初出順
  const push = k => {
    if (!votes.has(k)){ votes.set(k, 0); order.push(k); }
    votes.set(k, votes.get(k) + 1);
  };
  state.symptoms.forEach(sym => {
    const def = SYMPTOM_MAP[sym]; if (def) def.keys.forEach(push);
  });
  parseFreeTextKeys(state.symptomFree).forEach(push);
  order.sort((a, b) => votes.get(b) - votes.get(a));  // 票数降順(同数は初出順)
  return order.map(k => ({ key: k, votes: votes.get(k) }));
}

// 症状起源の問題エントリ(姿勢解析が反応しなかったが本人の自覚あり)
const SYMPTOM_PROBLEM_META = {
  forwardHead:        { title:'頭部前方位（前方頭位）', desc:'お悩みから推定。首・肩のこりや頭痛は頭部前方位が原因の可能性が高いです。', tissues:{tight:['上部僧帽筋','肩甲挙筋','胸鎖乳突筋','後頭下筋群'], weak:['深部頸屈筋','下部僧帽筋']} },
  roundedShoulders:   { title:'巻き肩', desc:'お悩みから推定。胸の前面が縮こまり、肩甲骨が外に開いている状態です。', tissues:{tight:['大胸筋','小胸筋','広背筋上部'], weak:['菱形筋','下部僧帽筋','前鋸筋']} },
  thoracicKyphosis:   { title:'胸椎後弯（猫背）', desc:'お悩みから推定。背中の丸まりが、疲労感や呼吸の浅さに繋がります。', tissues:{tight:['脊柱起立筋下部','大胸筋','腹直筋上部'], weak:['脊柱起立筋上部','下部僧帽筋','菱形筋']} },
  anteriorPelvicTilt: { title:'骨盤前傾（反り腰）', desc:'お悩みから推定。腰の反りが強く、腰痛・下腹ぽっこりの原因に。', tissues:{tight:['腸腰筋','大腿直筋','脊柱起立筋腰部'], weak:['大臀筋','腹横筋','ハムストリングス']} },
  posteriorPelvicTilt:{ title:'骨盤後傾', desc:'お悩みから推定。骨盤が後ろに倒れ、ヒップが下がりやすい状態。', tissues:{tight:['ハムストリングス','腹直筋'], weak:['腸腰筋','脊柱起立筋','大臀筋']} },
  swayBack:           { title:'スウェイバック姿勢', desc:'お悩みから推定。骨盤が前に押し出され、上体が後ろに倒れる楽な立ち姿。', tissues:{tight:['ハムストリングス','腹斜筋'], weak:['大臀筋','腸腰筋','腹横筋']} },
  lateralAsymmetry:   { title:'左右非対称', desc:'お悩みから推定。骨盤や肩の高さに左右差を感じている状態。', tissues:{tight:['腰方形筋(片側)','中臀筋(片側)'], weak:['中臀筋(反対側)','腹斜筋']} },
  kneeValgus:         { title:'膝の内向き（Knee-in）', desc:'お悩みから推定。膝が内に入りやすく、痛みやO脚・X脚の一因に。', tissues:{tight:['内転筋','大腿筋膜張筋'], weak:['中臀筋','大臀筋','後脛骨筋']} },
  ankleStiffness:     { title:'足首背屈制限', desc:'お悩みから推定。足首が固いと、ふくらはぎの浮腫みや膝痛の原因に。', tissues:{tight:['腓腹筋','ヒラメ筋','足底筋膜'], weak:['前脛骨筋','長腓骨筋']} },
  kneeVarus:          { title:'O脚（Knee-out）', desc:'お悩みから推定。膝が外側に開き、内ももの筋力低下と外側組織の硬さが原因。', tissues:{tight:['大腿筋膜張筋','腸脛靱帯','外側ハムストリングス','梨状筋'], weak:['内転筋群','内側広筋','中臀筋後部繊維']} },
  scoliosis:          { title:'側弯傾向（Cカーブ）', desc:'お悩みから推定。背骨が左右にカーブする傾向。左右の筋バランス崩れが原因です。', tissues:{tight:['凸側 腰方形筋','凸側 広背筋','凸側 腹斜筋'], weak:['凹側 腰方形筋','凹側 腹斜筋','凹側 中臀筋']} },
};

function makeSymptomProblem(key, votes = 1){
  const meta = SYMPTOM_PROBLEM_META[key] || SYMPTOM_PROBLEM_META.forwardHead;
  return {
    key,
    // 複数の悩みが同じ問題を指すほど優先度を上げる（3票以上=重）
    severity: votes >= 3 ? 'high' : 'mid',
    title: meta.title,
    description: meta.desc,
    tissues: meta.tissues,
    metric: 'お悩みベース',
    fromSymptom: true,
  };
}

// 問題を重症度順（重→中→軽）に並べ替える。処方の優先順位の源泉。
const SEVERITY_RANK = { high: 0, mid: 1, low: 2 };
function sortProblemsBySeverity(problems){
  return problems
    .map((p, i) => ({ p, i }))
    .sort((a, b) => (SEVERITY_RANK[a.p.severity] ?? 1) - (SEVERITY_RANK[b.p.severity] ?? 1) || a.i - b.i)
    .map(x => x.p);
}

// ===================================================================
// FILE INPUT
// ===================================================================
function setupFileInput(input, canvas, preview, key){
  const dropLabel = document.querySelector(`label[data-target="${input.id}"]`);

  ['dragover','dragleave','drop'].forEach(ev => {
    dropLabel.addEventListener(ev, e => {
      e.preventDefault();
      if (ev==='dragover') dropLabel.classList.add('is-drag');
      else dropLabel.classList.remove('is-drag');
      if (ev==='drop' && e.dataTransfer.files.length){
        input.files = e.dataTransfer.files;
        input.dispatchEvent(new Event('change'));
      }
    });
  });

  input.addEventListener('change', async () => {
    const f = input.files[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    const img = new Image();
    img.onload = () => {
      // Canvasにフィット
      const maxW = 600;
      const ratio = Math.min(1, maxW / img.width);
      canvas.width  = img.width  * ratio;
      canvas.height = img.height * ratio;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      preview.hidden = false;
      // 元画像も保持(解析用)
      state[key] = img;
      updateAnalyzeBtn();
    };
    img.src = url;
  });
}
setupFileInput(els.fileSide,  els.canvasSide,  els.previewSide,  'imgSide');
setupFileInput(els.fileFront, els.canvasFront, els.previewFront, 'imgFront');

function updateAnalyzeBtn(){
  // 写真が無くても、症状が選択されていれば解析を許可するか判断
  // 横向き写真は基本必須(姿勢解析の核)なので、写真ベース
  els.btnAnalyze.disabled = !state.imgSide;
}

// ===== Symptom inputs =====
function collectSymptoms(){
  state.symptoms = Array.from(
    els.symptomChips.querySelectorAll('input[type="checkbox"]:checked')
  ).map(el => el.value);
  state.symptomFree = (els.symptomFree.value || '').trim();
}

// ===== 初回プロフィール4問（時間/運動経験/目的/年代）=====
// 1タップで答えられる範囲だけを聞き、メニューの量と強さに直結させる
const PROFILE_DEFAULT = { time: '10', exp: 'none', goal: 'relief', age: '50' };
function collectProfile(){
  const box = document.getElementById('profile-qs');
  const prof = { ...PROFILE_DEFAULT };
  if (box){
    box.querySelectorAll('.pq-opts').forEach(g => {
      const on = g.querySelector('button.on');
      if (on) prof[g.dataset.q] = on.dataset.v;
    });
  }
  state.profile = prof;
  Store.setPrefs(prof);
  return prof;
}
// 30日プログラム生成に渡すオプション（量と強度の進み方）
// pain/focus も必ず同梱する。痛み配慮はモジュール共有の状態に頼らず、
// 生成のたびに処方側で設定し直させる（設定漏れ＝禁忌フィルタ無効化を防ぐ安全策）
function programOpts(){
  const a = currentAdapt();
  return {
    menuSize: adjustMenuSize(menuSizeFromProfile(), a.sizeDelta),
    exp: adjustExp((state.profile || PROFILE_DEFAULT).exp, a.level),
    tune: a.level,                       // 回数・秒数にも即日で反映させる
    pain: state.painFlags || {},
    focus: state.focusParts || [],
  };
}
// 途中評価による調整（Day7/14/21のチェックポイントで決まる）
function currentAdapt(){
  const a = Store.getProgress(progressKey()).adapt;
  return { level: a?.level || 0, sizeDelta: a?.sizeDelta || 0, at: a?.at || 0, reason: a?.reason || '' };
}
const EXP_STEPS = ['none', 'some', 'regular'];
function adjustExp(exp, level){
  const i = EXP_STEPS.indexOf(exp);
  if (i < 0 || !level) return exp;
  return EXP_STEPS[Math.max(0, Math.min(EXP_STEPS.length - 1, i + level))];
}
const SIZE_STEPS = [2, 4, 5, 6];
function adjustMenuSize(size, delta){
  const i = SIZE_STEPS.indexOf(size);
  if (i < 0 || !delta) return size;
  return SIZE_STEPS[Math.max(0, Math.min(SIZE_STEPS.length - 1, i + delta))];
}
// 1日の種目数：とれる時間から決める
function menuSizeFromProfile(){
  const t = (state.profile || PROFILE_DEFAULT).time;
  return t === '5' ? 2 : t === '10' ? 4 : t === '15' ? 5 : 6;
}
// 目的→重点部位の傾き（見た目重視ならお腹・お尻・背中を優先）
function goalFocusParts(){
  const g = (state.profile || PROFILE_DEFAULT).goal;
  return g === 'look' ? ['core', 'glutes', 'back'] : [];
}
(function initProfileUI(){
  const box = document.getElementById('profile-qs');
  if (!box) return;
  const saved = Store.getPrefs();
  box.querySelectorAll('.pq-opts').forEach(g => {
    const q = g.dataset.q;
    if (saved && saved[q]){
      g.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.v === saved[q]));
    }
    g.querySelectorAll('button').forEach(b => {
      b.onclick = () => {
        g.querySelectorAll('button').forEach(x => x.classList.remove('on'));
        b.classList.add('on');
        collectProfile();
      };
    });
  });
  state.profile = saved ? { ...PROFILE_DEFAULT, ...saved } : { ...PROFILE_DEFAULT };
})();

// 申告された痛み部位を検出（チェック＋自由記述）。処方の禁忌フィルタに使う。
function computePainFlags(){
  const t = state.symptomFree || '';
  const flags = {
    knee:    state.symptoms.includes('kneePain')    || /(ひざ|膝|ヒザ).{0,8}(痛|いた)/.test(t),
    lowBack: state.symptoms.includes('lowBackPain') || /(腰|こし).{0,8}(痛|いた)/.test(t) || /ぎっくり/.test(t),
    // 自由記述から追加の配慮を検出（該当がなければ従来どおり何も変わらない）
    neck:     /(首|くび|頸).{0,8}(痛|いた|ヘルニア)/.test(t) || /むち打ち|ムチ打ち/.test(t),
    shoulder: /(肩|かた).{0,8}(痛|いた)/.test(t) || /四十肩|五十肩|腱板/.test(t),
    pregnant: /妊娠|妊婦|マタニティ|産後すぐ/.test(t),
    bloodPressure: /高血圧|血圧が高/.test(t),
  };
  state.painFlags = flags;
  setPainAvoidance(flags);
  return flags;
}
// 選んだ悩みから「重点部位」と「診断に添える一文」を集約する
// 同じ姿勢問題キーでも、腰痛の人と下腹ぽっこりの人で狙いを変えるための情報
function computeFocus(){
  const parts = [], notes = [], labels = [];
  state.symptoms.forEach(sym => {
    const def = SYMPTOM_MAP[sym];
    if (!def || !def.focus) return;
    labels.push(def.label);
    (def.focus.bodyPart || []).forEach(b => { if (!parts.includes(b)) parts.push(b); });
    if (def.focus.note && !notes.includes(def.focus.note)) notes.push(def.focus.note);
  });
  goalFocusParts().forEach(b => { if (!parts.includes(b)) parts.push(b); });
  state.focusParts = parts;
  state.focusNotes = notes;
  state.focusLabels = labels;
  setFocusParts(parts);
  return { parts, notes, labels };
}

const PAIN_LABELS = { knee:'ひざ', lowBack:'腰', neck:'首', shoulder:'肩', pregnant:'妊娠中', bloodPressure:'血圧' };
function painLabelList(){
  const f = state.painFlags || {};
  return Object.keys(PAIN_LABELS).filter(k => f[k]).map(k => PAIN_LABELS[k]);
}

// ===================================================================
// MEDIAPIPE POSE LANDMARKER
// ===================================================================
function loadLandmarker(silent = false){
  if (state.landmarker) return Promise.resolve(state.landmarker);
  if (state._lmPromise) return state._lmPromise;   // 先読み中ならその読み込みを共有

  state._lmPromise = (async () => {
    if (!silent) setLoader('AIの準備をしています…（初回は20〜30秒ほどかかることがあります）');
    const vision = await import('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.9/vision_bundle.mjs');
    const fileset = await vision.FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.9/wasm'
    );
    if (!silent) setLoader('姿勢を読み取るAIを起動中… もうすぐです');
    const create = (delegate) => vision.PoseLandmarker.createFromOptions(fileset, {
      baseOptions: {
        modelAssetPath:'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_full/float16/1/pose_landmarker_full.task',
        delegate,
      },
      runningMode:'IMAGE',
      numPoses:1,
      minPoseDetectionConfidence: 0.5,
      minPosePresenceConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
    let lm;
    try {
      lm = await create('GPU');
    } catch (e) {
      // 古い端末等でGPU初期化に失敗したらCPUで自動再試行
      console.warn('GPU delegate failed, falling back to CPU', e);
      lm = await create('CPU');
    }
    state.landmarker = lm;
    return lm;
  })().catch(e => {
    state._lmPromise = null;  // 失敗したら次のクリックで再試行できるように
    throw e;
  });
  return state._lmPromise;
}

// ページ表示後にバックグラウンドで先読み（解析クリック時の待ちをなくす）
// ただしAIモデルは約10MB。写真を使わない人（簡易診断だけの人／今日のメニューを見に来ただけの
// 再訪者）にまで無条件でダウンロードさせないよう、「これから撮る／選ぶ」気配があるときだけ動かす。
let _preloadStarted = false;
function preloadLandmarker(){
  if (_preloadStarted) return;
  _preloadStarted = true;
  loadLandmarker(true).catch(e => console.warn('model preload failed (クリック時に再試行します)', e));
}
// 写真を選ぶ動作に触れた時点で先読みを開始する（タップの前に間に合わせる）
function armPreloadTriggers(){
  const zone = document.getElementById('upload-section');
  if (!zone) return;
  const on = () => preloadLandmarker();
  ['pointerenter', 'pointerdown', 'focusin', 'touchstart'].forEach(ev =>
    zone.addEventListener(ev, on, { once: true, passive: true }));
  document.querySelectorAll('#file-side, #file-front').forEach(i =>
    i.addEventListener('change', on, { once: true }));
}
window.addEventListener('load', () => {
  armPreloadTriggers();
  // 初回訪問（保存プランなし）は写真診断に進む可能性が高いので、これまでどおり先読みする
  const firstTime = (() => { try { return Store.getSessions().length === 0; } catch { return true; } })();
  if (firstTime) setTimeout(preloadLandmarker, 1500);
});

async function detectPose(image){
  const lm = await loadLandmarker();
  const result = lm.detect(image);
  if (!result.landmarks || result.landmarks.length === 0) return null;
  state._lastPoseCount = result.landmarks.length;
  return result.landmarks[0]; // 33 landmarks
}

// ===================================================================
// 写真品質チェック（分析に適さない写真をなるべく弾く）
// 追加ライブラリなし: MediaPipeのvisibility + canvasの輝度 + 座標の収まりだけで判定
// ===================================================================
function imageBrightness(img){
  try {
    const c = document.createElement('canvas');
    const w = 64, h = Math.max(1, Math.round(64 * (img.height / img.width)));
    c.width = w; c.height = h;
    const ctx = c.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(img, 0, 0, w, h);
    const d = ctx.getImageData(0, 0, w, h).data;
    let sum = 0;
    for (let i = 0; i < d.length; i += 4) sum += (d[i] * 0.299 + d[i+1] * 0.587 + d[i+2] * 0.114);
    return sum / (d.length / 4);   // 0(暗) 〜 255(明)
  } catch { return null; }
}

// 主要ランドマーク（頭・肩・腰・膝・足首）の信頼度と収まりを見る
const QC_KEY_POINTS = [LM.NOSE, LM.LEFT_SHOULDER, LM.RIGHT_SHOULDER, LM.LEFT_HIP, LM.RIGHT_HIP,
                       LM.LEFT_KNEE, LM.RIGHT_KNEE, LM.LEFT_ANKLE, LM.RIGHT_ANKLE];

function checkPhotoQuality(lms, img){
  const issues = [];
  const pts = QC_KEY_POINTS.map(i => lms[i]).filter(Boolean);
  if (!pts.length) return issues;

  // ① 信頼度: 主要点の平均visibilityが低い＝人物がはっきり写っていない
  const vis = pts.map(p => (p.visibility ?? 1));
  const avgVis = vis.reduce((a, b) => a + b, 0) / vis.length;
  if (avgVis < 0.55) issues.push('人物がはっきり写っていないようです。もう少し明るい場所で、体が大きく写るように撮ってみてください。');

  // ② 全身が入っているか: 足首/頭が枠外、または縦の占有が小さい
  const ys = pts.map(p => p.y), xs = pts.map(p => p.x);
  const top = Math.min(...ys), bottom = Math.max(...ys);
  const ankles = [lms[LM.LEFT_ANKLE], lms[LM.RIGHT_ANKLE]].filter(Boolean);
  const ankleVis = ankles.length ? Math.max(...ankles.map(a => a.visibility ?? 1)) : 0;
  if (ankleVis < 0.4 || bottom > 1.02) issues.push('足元が写っていないようです。頭のてっぺんから足首まで入るように撮ってください。');
  if (top < -0.02) issues.push('頭が切れているようです。全身が入るように少し引いて撮ってください。');
  if ((bottom - top) < 0.45) issues.push('体が小さく写りすぎています。もう少し近づくか、縦向きで撮ってみてください。');
  if (Math.min(...xs) < -0.02 || Math.max(...xs) > 1.02) issues.push('体の一部が左右にはみ出しています。全身が枠に収まるように撮ってください。');

  // ③ 明るさ
  const bright = imageBrightness(img);
  if (bright != null && bright < 55) issues.push('写真が暗いようです。明るい場所や照明のある場所で撮り直すと精度が上がります。');
  if (bright != null && bright > 235) issues.push('写真が明るすぎるようです。逆光を避けて撮り直してみてください。');

  // ④ 複数人
  if (state._lastPoseCount > 1) issues.push('複数の人が写っているようです。ひとりで写った写真をお使いください。');

  return issues;
}

// ===================================================================
// LOADER
// ===================================================================
function setLoader(text){
  els.loader.hidden = false;
  els.loaderText.textContent = text;
  els.btnAnalyze.disabled = true;
}
function hideLoader(){
  els.loader.hidden = true;
  els.btnAnalyze.disabled = false;
}

// ===================================================================
// ANALYZE FLOW
// ===================================================================
// ===== 解析失敗時のやさしいエラーカード（alertの代わり） =====
function showAnalyzeError(kind){
  hideLoader();
  const box = document.getElementById('analyze-error');
  if (!box) return;
  const t = document.getElementById('ae-title');
  const d = document.getElementById('ae-desc');
  if (kind === 'nopose'){
    t.textContent = '写真から人物を見つけられませんでした';
    d.textContent = '頭から足まで全身が写っているか、明るい場所で撮った写真かをご確認ください。体が大きめに写る縦向きの写真だと見つけやすくなります。';
  } else {
    t.textContent = '解析の準備がうまくいきませんでした';
    d.textContent = '通信環境の良い場所で「もう一度試す」を押してみてください。お急ぎの場合は、写真なしの簡易プランもご利用いただけます。';
  }
  box.hidden = false;
  box.scrollIntoView({ behavior:'smooth', block:'center' });
}
function hideAnalyzeError(){
  const b = document.getElementById('analyze-error');
  if (b) b.hidden = true;
}

els.btnAnalyze.addEventListener('click', async () => {
  try {
    hideAnalyzeError();
    setLoader('姿勢を解析中… 側面写真の特徴点を検出しています');
    const lmsSide = await detectPose(state.imgSide);
    if (!lmsSide){
      showAnalyzeError('nopose');
      return;
    }
    // 写真品質チェック（不合格なら結果の信頼度を下げる警告を出す）
    state.photoIssues = checkPhotoQuality(lmsSide, state.imgSide);

    state.resultSide = analyzeSide(lmsSide);
    state.resultSide.imageData = state.imgSide;
    state.resultSide.landmarksRaw = lmsSide;

    if (state.imgFront){
      setLoader('正面写真を解析中…');
      const lmsFront = await detectPose(state.imgFront);
      if (lmsFront){
        state.resultFront = analyzeFront(lmsFront);
        state.resultFront.imageData = state.imgFront;
        state.resultFront.landmarksRaw = lmsFront;
      }
    } else {
      state.resultFront = null;
    }

    setLoader('問題点を抽出 → セルフケア・プログラムを構築中…');
    collectSymptoms();
    collectProfile();     // 時間・運動経験・目的・年代を取得
  computePainFlags();   // 痛み配慮(禁忌)を処方に反映
  computeFocus();       // 主訴の重点部位を処方に反映
    computeFocus();       // 主訴の重点部位を処方に反映
    state.problems = detectProblems(state.resultSide, state.resultFront);
    // 症状から導かれた追加キーを問題リストにマージ(姿勢解析で未検出のものを補完)
    const symptomEntries = buildSymptomProblems();
    const existingKeys = new Set(state.problems.map(p => p.key));
    symptomEntries.forEach(e => {
      if (existingKeys.has(e.key)) return;
      // 症状起源の問題を票数つきで追加(3票以上=重)
      state.problems.push(makeSymptomProblem(e.key, e.votes));
    });
    // 「general」のみだったケースでは general を取り除く(症状ベースの処方を優先)
    if (state.problems.length > 1) {
      state.problems = state.problems.filter(p => p.key !== 'general');
    }
    // 重症度順(重→中→軽)に並べ替え = 処方・表示とも重い問題を最優先に
    state.problems = sortProblemsBySeverity(state.problems);
    // コース推奨を計算
    const probKeys = state.problems.map(p=>p.key);
    state.recommendation = recommendCourse(probKeys);
    // 初回はトップ推奨コースを選択
    state.selectedCourse = state.recommendation.top;
    state.program = build30DayProgram(probKeys, state.selectedCourse, programOpts());

    state.savedMetrics = null; state.savedThumbs = null; // 新規診断なので保存モード解除
    hideSavedBanner();
    renderAll();
    saveCurrentSession();   // ① 履歴に保存（端末内）
    hideLoader();
    els.results.hidden = false;
    els.results.classList.add('fade-in');
    setTimeout(() => {
      jumpTo('#results');
    }, 100);

  } catch (e){
    console.error(e);
    showAnalyzeError('load');
  }
});

// エラーカードのボタン: もう一度試す / 写真なしで簡易プラン
(function bindAnalyzeError(){
  const retry = document.getElementById('ae-retry');
  const simple = document.getElementById('ae-simple');
  if (retry) retry.onclick = () => { hideAnalyzeError(); els.btnAnalyze.click(); };
  if (simple) simple.onclick = () => {
    hideAnalyzeError();
    document.getElementById('btn-simple')?.scrollIntoView({ behavior:'smooth', block:'center' });
    runSimpleDiagnosis();
  };
})();

// ===================================================================
// RENDER
// ===================================================================
function renderAll(){
  renderPhotoQuality();
  renderScoreAndType();
  renderRegionScores();
  renderNextAction();
  renderMetrics();
  renderOverlays();
  renderSymptomSummary();
  renderProblems();
  renderKnowledge();
  renderCourses();
  renderToday();
  renderProgram(state.currentPhase);
}

// --- COURSE SELECTION ---
function renderCourses(){
  if (!els.courseGrid) return;
  const probKeys = state.problems.map(p=>p.key);
  const rec = state.recommendation;
  const rankMap = Object.fromEntries(rec.ranking.map(r => [r.course, r.score]));

  els.courseGrid.innerHTML = COURSE_ORDER.map(cid => {
    const c = COURSES[cid];
    const isSelected = state.selectedCourse === cid;
    const isTop = rec.top === cid;
    const stats = getPoolStats(probKeys, cid);
    const score = rankMap[cid] || 0;
    const maxScore = rec.ranking[0].score || 1;
    const starCount = cid === 'mixed' ? 3 : Math.max(1, Math.round((score / maxScore) * 3));
    const stars = '⭐'.repeat(starCount) + '☆'.repeat(3 - starCount);

    return `
      <div class="course-card ${isSelected?'selected':''} ${isTop?'top-pick':''}"
           data-course="${cid}"
           style="--c-main:${c.color}; --c-soft:${c.colorSoft}">
        ${isTop ? '<div class="course-badge">あなたへのおすすめ</div>' : ''}
        <div class="course-head">
          <div class="course-icon">${c.icon}</div>
          <div>
            <div class="course-name">${c.name}</div>
            <div class="course-eng">${c.nameEn}</div>
          </div>
        </div>
        <div class="course-supervisor">${c.supervisor}</div>
        <div class="course-desc">${c.desc}</div>
        <div class="course-match">
          <span class="match-stars">${stars}</span>
          <span class="match-label">あなたとの相性</span>
        </div>
        <div class="course-stats">
          <span>📚 <strong>${stats.total}</strong>種</span>
          <span>🧘 <strong>${stats.selfcare}</strong></span>
          <span>💪 <strong>${stats.training}</strong></span>
        </div>
        <div class="course-tags">
          ${c.bestFor.slice(0,3).map(t=>`<span>${t}</span>`).join('')}
        </div>
        <button class="course-select-btn">${isSelected ? '✓ 選択中' : 'このコースを選ぶ'}</button>
      </div>
    `;
  }).join('');

  // 推奨カードのキャプション
  if (els.courseRecommend) {
    const top = COURSES[rec.top];
    els.courseRecommend.innerHTML = `
      <strong>${top.icon} ${top.name}</strong>があなたの姿勢に最適と診断されました。
      もちろん、いつでも他のコースに切り替え可能です。
    `;
  }

  // クリックハンドラ
  els.courseGrid.querySelectorAll('.course-card').forEach(card => {
    card.addEventListener('click', () => {
      const cid = card.dataset.course;
      if (cid === state.selectedCourse) return;
      state.selectedCourse = cid;
      state.program = build30DayProgram(state.problems.map(p=>p.key), cid, programOpts());
      state.currentPhase = 1;
      renderCourses();
      renderToday();
      renderProgram(1);
    });
  });
}

function renderSymptomSummary(){
  const hasSymptoms = state.symptoms.length > 0 || state.symptomFree;
  if (!hasSymptoms){ els.symptomSummary.hidden = true; return; }
  const tags = state.symptoms
    .map(s => SYMPTOM_MAP[s]?.label).filter(Boolean)
    .map(l => `<span>${l}</span>`).join('');
  els.symptomSummary.innerHTML = `
    <strong>🌷 あなたのお悩み</strong>
    <span class="ss-tags">${tags || '<span>未選択</span>'}</span>
    ${state.symptomFree ? `<span class="ss-free">📝 ${escapeHtml(state.symptomFree)}</span>` : ''}
  `;
  els.symptomSummary.hidden = false;
}

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

// --- 写真品質の注意（結果の信頼度をユーザーに伝える）---
function renderPhotoQuality(){
  let box = document.getElementById('photo-quality');
  const issues = state.resultSide ? (state.photoIssues || []) : [];
  if (!issues.length){ if (box) box.hidden = true; return; }
  if (!box){
    box = document.createElement('div');
    box.id = 'photo-quality'; box.className = 'photo-quality';
    const disc = document.querySelector('.result-disclaimer');
    if (disc && disc.parentNode) disc.parentNode.insertBefore(box, disc.nextSibling);
    else els.results.prepend(box);
  }
  box.innerHTML = `
    <strong>📷 この写真では、結果が少しずれる可能性があります</strong>
    <ul>${issues.map(i => `<li>${escapeHtml(i)}</li>`).join('')}</ul>
    <button class="btn-ghost sm" id="pq-retake" type="button">写真を撮り直す</button>`;
  box.hidden = false;
  const rt = document.getElementById('pq-retake');
  if (rt) rt.onclick = () => {
    els.results.hidden = true;
    jumpTo('#upload-section');
  };
}

// --- SCORE & TYPE ---
function renderScoreAndType(){
  const type = determinePostureType(state.problems);
  let score, grade, desc;
  if (state.resultSide){
    score = calcScore(state.resultSide, state.resultFront, state.problems);
    ({ grade, desc } = gradeFromScore(score));
    // セッション保存用に控える
    state.lastScore = score;
    state.lastGrade = grade;
    state.lastType = type.name;
  } else if (state.lastScore != null){
    // 保存プラン閲覧モード（写真診断あり）: 保存済みスコアを使う
    score = state.lastScore;
    const g = gradeFromScore(score);
    grade = state.lastGrade || g.grade;
    desc  = g.desc;
  } else {
    // 簡易診断モード（写真なし・お悩みベース）: スコアは偽らず「簡易」表示
    score = '—';
    grade = '簡易診断';
    desc  = '写真で診断すると数値スコアが表示されます';
  }

  els.scoreValue.textContent = score;
  els.scoreGrade.textContent = grade;
  els.scoreDesc.textContent = desc;

  const circ = 2 * Math.PI * 52;
  const num = typeof score === 'number' ? score : 0;
  const offset = circ - (num/100) * circ;
  els.scoreArc.setAttribute('stroke-dashoffset', offset);

  els.postureType.textContent = state.lastType && !state.resultSide ? state.lastType : type.name;
  els.postureTypeDesc.textContent = type.desc;
  els.postureTypeTags.innerHTML = type.tags.map(t => `<span>${t}</span>`).join('');
}

// --- 部位別サブスコア ---
// 総合点だけだと「で、どこを直すの？」が分からない。5部位に分けて
// 見たもの／なぜその点／上げ方 を1枚に収める（タップで詳細を開く）
function renderRegionScores(){
  const box = document.getElementById('region-scores');
  if (!box) return;
  const regions = calcRegionScores(state.resultSide, state.resultFront, state.problems);
  if (!regions.length){ box.style.display = 'none'; return; }
  box.style.display = '';
  box.innerHTML = `
    <h3 class="rs-title">部位ごとの状態</h3>
    <p class="rs-lead">気になる部位をタップすると、「何を見てその点になったか」が開きます。</p>
    ${regions.map(r => `
      <details class="rs-item ${r.status}">
        <summary>
          <span class="rs-icon">${r.icon}</span>
          <span class="rs-label">${r.label}</span>
          <span class="rs-bar"><i style="width:${r.score == null ? 0 : r.score}%"></i></span>
          <span class="rs-score">${r.score == null ? '—' : r.score}</span>
        </summary>
        <div class="rs-body">
          ${r.seen.length
            ? `<div class="rs-block"><b>📷 見たところ</b><ul>${r.seen.map(s => `<li>${escapeHtml(s)}</li>`).join('')}</ul></div>`
            : `<div class="rs-block"><b>📷 見たところ</b><p>${escapeHtml(r.seenNote)}</p></div>`}
          <div class="rs-block"><b>📉 この点になった理由</b><p>${escapeHtml(r.why)}</p></div>
          <div class="rs-block"><b>📈 上げるには</b><p>${escapeHtml(r.lift)}</p></div>
        </div>
      </details>
    `).join('')}
  `;
}

// --- 次にやること（結果ページは長いので、下まで読まなくても行動に移れるように） ---
function renderNextAction(){
  const box = document.getElementById('next-action');
  if (!box) return;
  const prog = state.program;
  if (!prog || !prog.length){ box.hidden = true; box.innerHTML = ''; return; }
  const cur = currentDayNumber();
  const d = cur == null ? null : prog.find(x => x.day === cur);
  box.hidden = false;
  if (!d){
    box.innerHTML = `
      <div class="na-text"><b>30日プログラム、完走しています</b><span>再撮影して比べる／次の30日を始める、が選べます</span></div>
      <button class="btn-primary" id="na-go" type="button">▶ 次の一歩を選ぶ</button>`;
  } else {
    const n = (d.selfcare || []).length + (d.training || []).length;
    box.innerHTML = `
      <div class="na-text">
        <b>ここまでが診断結果です</b>
        <span>この下に「なぜそうなるか」「コース選び」が続きます。先に今日の分をやってもOKです。</span>
      </div>
      <button class="btn-primary" id="na-go" type="button">▶ 今日のメニューへ（DAY ${cur}・${n}種・${d.isRest ? 'ゆったり' : estMinutes(n)}）</button>`;
  }
  document.getElementById('na-go').onclick = () => jumpTo('.today-card');
}

// --- METRICS ---
function renderMetrics(){
  const items = state.resultSide
    ? buildMetricsList(state.resultSide, state.resultFront)
    : (state.savedMetrics || []).map(m => ({ ...m, detail: m.detail || '' }));
  if (!items.length){ els.metricsList.style.display = 'none'; els.metricsList.innerHTML = ''; return; }
  els.metricsList.style.display = '';
  els.metricsList.innerHTML = items.map(it => `
    <div class="metric ${it.sev}">
      <div class="metric-name">${it.name}</div>
      <div class="metric-value">${it.value}</div>
      <div class="metric-bar"><i style="width:${it.pct}%"></i></div>
      ${it.detail ? `<div class="metric-detail">${it.detail}</div>` : ''}
    </div>
  `).join('');
}

// --- OVERLAYS ---
function renderOverlays(){
  const grid = document.querySelector('.overlay-grid');
  if (!state.resultSide){
    // 保存プラン閲覧モード: 元画像が無いため解析オーバーレイは非表示にする
    if (grid) grid.style.display = 'none';
    return;
  }
  if (grid) grid.style.display = '';
  drawSideOverlay();
  if (state.resultFront){
    els.frontPane.style.display = '';
    drawFrontOverlay();
  } else {
    els.frontPane.style.display = 'none';
  }
}

function drawSideOverlay(){
  const cv = els.overlaySide;
  const img = state.imgSide;
  const ctx = cv.getContext('2d');
  const maxW = 500;
  const ratio = Math.min(1, maxW / img.width);
  cv.width  = img.width * ratio;
  cv.height = img.height * ratio;

  ctx.drawImage(img, 0, 0, cv.width, cv.height);

  const res = state.resultSide;
  const lms = res.landmarksRaw;
  const pts = {
    ear: scaleLM(lms[res.facing==='left' ? LM.LEFT_EAR : LM.RIGHT_EAR], cv),
    sh : scaleLM(lms[res.facing==='left' ? LM.LEFT_SHOULDER : LM.RIGHT_SHOULDER], cv),
    hip: scaleLM(lms[res.facing==='left' ? LM.LEFT_HIP : LM.RIGHT_HIP], cv),
    knee: scaleLM(lms[res.facing==='left' ? LM.LEFT_KNEE : LM.RIGHT_KNEE], cv),
    ank: scaleLM(lms[res.facing==='left' ? LM.LEFT_ANKLE : LM.RIGHT_ANKLE], cv),
  };

  // 理想垂直線 (足首から上)
  ctx.strokeStyle = 'rgba(31,78,216,0.6)';
  ctx.setLineDash([6,6]);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(pts.ank.x, pts.ank.y);
  ctx.lineTo(pts.ank.x, 0);
  ctx.stroke();
  ctx.setLineDash([]);

  // 実際の線(耳→肩→骨盤→膝→足首)
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 3;
  drawLine(ctx, pts.ear, pts.sh);
  drawLine(ctx, pts.sh, pts.hip);
  drawLine(ctx, pts.hip, pts.knee);
  drawLine(ctx, pts.knee, pts.ank);

  // 逸脱マーカー: 各点が垂直線からどれだけ逸脱しているか
  const trunkPx = Math.hypot(pts.sh.x-pts.hip.x, pts.sh.y-pts.hip.y);
  Object.entries(pts).forEach(([k,p]) => {
    const dev = Math.abs(p.x - pts.ank.x) / trunkPx;
    let color = '#10b981';
    if (dev > 0.08) color = '#f59e0b';
    if (dev > 0.2)  color = '#ef4444';
    drawCircle(ctx, p, 7, color);
  });

  // ラベル
  drawLabel(ctx, pts.ear, '耳');
  drawLabel(ctx, pts.sh, '肩');
  drawLabel(ctx, pts.hip, '骨盤');
  drawLabel(ctx, pts.knee, '膝');
  drawLabel(ctx, pts.ank, '足首');
}

function drawFrontOverlay(){
  const cv = els.overlayFront;
  const img = state.imgFront;
  const ctx = cv.getContext('2d');
  const maxW = 500;
  const ratio = Math.min(1, maxW / img.width);
  cv.width  = img.width * ratio;
  cv.height = img.height * ratio;
  ctx.drawImage(img, 0, 0, cv.width, cv.height);

  const lms = state.resultFront.landmarksRaw;
  const lSh = scaleLM(lms[LM.LEFT_SHOULDER], cv);
  const rSh = scaleLM(lms[LM.RIGHT_SHOULDER], cv);
  const lHip = scaleLM(lms[LM.LEFT_HIP], cv);
  const rHip = scaleLM(lms[LM.RIGHT_HIP], cv);
  const lKnee = scaleLM(lms[LM.LEFT_KNEE], cv);
  const rKnee = scaleLM(lms[LM.RIGHT_KNEE], cv);
  const lAnk = scaleLM(lms[LM.LEFT_ANKLE], cv);
  const rAnk = scaleLM(lms[LM.RIGHT_ANKLE], cv);

  // 中心垂直線
  const cx = (lAnk.x + rAnk.x)/2;
  ctx.strokeStyle = 'rgba(31,78,216,0.6)';
  ctx.setLineDash([6,6]); ctx.lineWidth=2;
  ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, cv.height); ctx.stroke();
  ctx.setLineDash([]);

  // 肩ライン
  ctx.strokeStyle = Math.abs(state.resultFront.metrics.shoulderTilt) > 2 ? '#f59e0b' : '#10b981';
  ctx.lineWidth = 3;
  drawLine(ctx, lSh, rSh);

  // 骨盤ライン
  ctx.strokeStyle = Math.abs(state.resultFront.metrics.pelvicTilt) > 2 ? '#f59e0b' : '#10b981';
  drawLine(ctx, lHip, rHip);

  // 膝ライン
  ctx.strokeStyle = '#06b6d4';
  drawLine(ctx, lKnee, rKnee);

  // 接続線
  ctx.strokeStyle = 'rgba(11,21,48,0.6)';
  ctx.lineWidth = 2;
  drawLine(ctx, lSh, lHip);
  drawLine(ctx, rSh, rHip);
  drawLine(ctx, lHip, lKnee);
  drawLine(ctx, rHip, rKnee);
  drawLine(ctx, lKnee, lAnk);
  drawLine(ctx, rKnee, rAnk);

  // 点
  [lSh,rSh,lHip,rHip,lKnee,rKnee,lAnk,rAnk].forEach(p => drawCircle(ctx, p, 6, '#1f4ed8'));
}

function scaleLM(lm, canvas){
  return { x: lm.x * canvas.width, y: lm.y * canvas.height };
}
function drawLine(ctx, a, b){ ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke(); }
function drawCircle(ctx, p, r, color){
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(p.x,p.y,r+2,0,Math.PI*2); ctx.fill();
  ctx.fillStyle = color; ctx.beginPath(); ctx.arc(p.x,p.y,r,0,Math.PI*2); ctx.fill();
}
function drawLabel(ctx, p, text){
  ctx.font = 'bold 11px "Noto Sans JP", sans-serif';
  const w = ctx.measureText(text).width + 10;
  ctx.fillStyle = 'rgba(11,21,48,0.85)';
  ctx.fillRect(p.x + 12, p.y - 12, w, 18);
  ctx.fillStyle = '#fff';
  ctx.fillText(text, p.x + 17, p.y + 1);
}

// --- PROBLEMS ---
function renderProblems(){
  els.problemsList.innerHTML = state.problems.map(p => {
    const sevText = p.severity === 'high' ? '重' : p.severity === 'mid' ? '中' : '軽';
    const sevPct  = p.severity === 'high' ? '85' : p.severity === 'mid' ? '55' : '30';
    return `
      <div class="problem sev-${p.severity==='high'?'high':p.severity==='mid'?'mid':'low'}">
        <div class="problem-sev">
          <strong>${sevPct}</strong>
          <span>${sevText}度</span>
        </div>
        <div class="problem-body">
          <h3>${p.title}</h3>
          <div class="problem-meta">
            <span>計測値: <strong>${p.metric}</strong></span>
            <span>重症度: <strong>${sevText}</strong></span>
          </div>
          <div class="problem-desc">${p.description}${p.fromSymptom && (state.focusNotes||[]).length ? ' <span class="focus-note">' + escapeHtml(state.focusNotes[0]) + '</span>' : ''}</div>
          ${evidenceBlocks(p)}
        </div>
        <div class="problem-side">${problemIllust(p.key)}</div>
      </div>
    `;
  }).join('');
}

// ===== 医療線引き：写真で確認できること／推測／分からないこと を分離して表示 =====
// 写真から分かるのは「見た目上の位置関係」だけ。筋の硬さ・筋力・関節の状態は判定できない。
function evidenceBlocks(p){
  const fromPhoto = !p.fromSymptom;
  const seen = fromPhoto
    ? `横向き・正面の写真から計測した位置関係（${escapeHtml(p.metric)}）をもとにしています。`
    : `写真ではなく、あなたが選んだお悩みをもとにした推定です。`;
  const parts = [...(p.tissues?.tight || []), ...(p.tissues?.weak || [])].slice(0, 6);
  const direction = parts.length
    ? `この見た目の傾向がある方は、一般的に <b>${parts.map(escapeHtml).join('・')}</b> のあたりが関わりやすいと言われています。プログラムはこの周辺を整える内容にしています。`
    : `今の姿勢を保つ土台づくりを中心にしたメニューにしています。`;
  return `
    <div class="evidence">
      <div class="ev-block ev-seen">
        <strong>📷 写真から確認できたこと</strong>
        <p>${seen}</p>
      </div>
      <div class="ev-block ev-dir">
        <strong>🎯 考えられる改善の方向</strong>
        <p>${direction}</p>
      </div>
      <div class="ev-block ev-unknown">
        <strong>❓ 写真だけでは分からないこと</strong>
        <p>筋肉の硬さ・筋力・関節の動く範囲・痛みの原因は、写真からは判断できません。気になる症状がある場合は医療機関や専門家にご相談ください。</p>
      </div>
    </div>`;
}

function problemIllust(key){
  // 各問題の象徴的なSVG
  const ill = {
    forwardHead: `<svg class="problem-svg" viewBox="0 0 80 120"><circle cx="36" cy="22" r="14" fill="#fde68a" stroke="#0b1530" stroke-width="1.5"/><path d="M40 36 Q45 50 50 60 L60 110" stroke="#0b1530" stroke-width="1.8" fill="none" stroke-linecap="round"/><line x1="50" y1="36" x2="50" y2="115" stroke="#1f4ed8" stroke-dasharray="3 3"/><text x="6" y="20" font-size="8" fill="#ef4444">FHP</text></svg>`,
    roundedShoulders:`<svg class="problem-svg" viewBox="0 0 80 120"><circle cx="40" cy="20" r="12" fill="#fde68a" stroke="#0b1530" stroke-width="1.5"/><path d="M28 36 Q40 32 52 36 L55 60" stroke="#0b1530" stroke-width="1.8" fill="none"/><path d="M28 36 Q22 40 20 50" stroke="#ef4444" stroke-width="1.8" fill="none"/><text x="4" y="18" font-size="8" fill="#ef4444">RS</text></svg>`,
    thoracicKyphosis:`<svg class="problem-svg" viewBox="0 0 80 120"><circle cx="30" cy="22" r="12" fill="#fde68a" stroke="#0b1530" stroke-width="1.5"/><path d="M34 36 Q60 50 55 80 L55 110" stroke="#0b1530" stroke-width="1.8" fill="none"/><text x="4" y="18" font-size="8" fill="#ef4444">KY</text></svg>`,
    anteriorPelvicTilt:`<svg class="problem-svg" viewBox="0 0 80 120"><circle cx="40" cy="20" r="12" fill="#fde68a" stroke="#0b1530" stroke-width="1.5"/><path d="M40 32 L40 60" stroke="#0b1530" stroke-width="1.8"/><ellipse cx="40" cy="68" rx="14" ry="6" fill="none" stroke="#ef4444" stroke-width="1.8" transform="rotate(15 40 68)"/><path d="M40 74 L40 105" stroke="#0b1530" stroke-width="1.8"/><text x="2" y="18" font-size="7" fill="#ef4444">APT</text></svg>`,
    posteriorPelvicTilt:`<svg class="problem-svg" viewBox="0 0 80 120"><circle cx="40" cy="20" r="12" fill="#fde68a" stroke="#0b1530" stroke-width="1.5"/><path d="M40 32 L40 60" stroke="#0b1530" stroke-width="1.8"/><ellipse cx="40" cy="68" rx="14" ry="6" fill="none" stroke="#ef4444" stroke-width="1.8" transform="rotate(-15 40 68)"/><path d="M40 74 L40 105" stroke="#0b1530" stroke-width="1.8"/><text x="2" y="18" font-size="7" fill="#ef4444">PPT</text></svg>`,
    swayBack:`<svg class="problem-svg" viewBox="0 0 80 120"><circle cx="32" cy="20" r="12" fill="#fde68a" stroke="#0b1530" stroke-width="1.5"/><path d="M36 32 Q50 50 45 70 Q35 90 50 110" stroke="#0b1530" stroke-width="1.8" fill="none"/><text x="2" y="18" font-size="8" fill="#ef4444">SB</text></svg>`,
    lateralAsymmetry:`<svg class="problem-svg" viewBox="0 0 80 120"><circle cx="40" cy="18" r="11" fill="#fde68a" stroke="#0b1530" stroke-width="1.5"/><line x1="25" y1="38" x2="55" y2="32" stroke="#f59e0b" stroke-width="2.5"/><line x1="28" y1="65" x2="52" y2="68" stroke="#f59e0b" stroke-width="2.5"/><path d="M40 38 L40 110" stroke="#0b1530" stroke-width="1.8"/><text x="2" y="18" font-size="8" fill="#f59e0b">ASY</text></svg>`,
    kneeValgus:`<svg class="problem-svg" viewBox="0 0 80 120"><circle cx="40" cy="20" r="10" fill="#fde68a" stroke="#0b1530" stroke-width="1.5"/><path d="M30 36 Q40 36 50 36 L52 60" stroke="#0b1530" stroke-width="1.8" fill="none"/><path d="M28 60 Q35 80 40 80 Q45 80 52 60" stroke="#ef4444" stroke-width="1.8" fill="none"/><path d="M40 80 L35 110 M40 80 L45 110" stroke="#0b1530" stroke-width="1.8"/><text x="2" y="18" font-size="7" fill="#ef4444">KV</text></svg>`,
    ankleStiffness:`<svg class="problem-svg" viewBox="0 0 80 120"><path d="M30 30 L30 80" stroke="#0b1530" stroke-width="1.8"/><path d="M30 80 Q30 90 35 90 L60 90" stroke="#ef4444" stroke-width="2" fill="none"/><text x="4" y="20" font-size="8" fill="#ef4444">ANK</text></svg>`,
    general:`<svg class="problem-svg" viewBox="0 0 80 120"><circle cx="40" cy="20" r="12" fill="#10b981" stroke="#0b1530" stroke-width="1.5"/><path d="M40 32 L40 110" stroke="#0b1530" stroke-width="1.8"/><text x="14" y="20" font-size="8" fill="#10b981">OK</text></svg>`,
  };
  return ill[key] || ill.general;
}

// --- KNOWLEDGE ---
function renderKnowledge(){
  const cards = getKnowledgeFor(state.problems.map(p=>p.key));
  els.knowledgeGrid.innerHTML = cards.map(c => `
    <div class="know-card">
      <span class="know-tag">${c.tag}</span>
      <div class="know-emoji">${c.emoji}</div>
      <h3>${c.title}</h3>
      <p>${c.body}</p>
    </div>
  `).join('');
}

// --- TODAY MENU ---
// ===== 進捗（30日プログラムの現在地） =====
const progressKey = () => state.currentSessionId || 'draft';

function currentDayNumber(){
  const done = new Set(Store.getProgress(progressKey()).done);
  for (let d = 1; d <= 30; d++) if (!done.has(d)) return d;
  return null; // 全30日完了
}

// 種目数から所要時間のめやすを出す（プロフィールで選んだ時間と食い違わないように）
function estMinutes(n){
  return n <= 2 ? '約5分' : n <= 4 ? '約10分' : n <= 5 ? '約15分' : '約20分';
}

function renderToday(){
  if (!state.program || !state.program.length) return;
  const head = document.querySelector('.today-card .card-head h2');
  const sub  = document.querySelector('.today-card .card-head .muted');
  const act  = document.getElementById('today-actions');
  const doneArr = Store.getProgress(progressKey()).done;
  const cur = currentDayNumber();

  // 全30日完走
  if (cur == null){ renderCompletion(head, sub, act, doneArr); return; }

  const d = state.program.find(x => x.day === cur);
  if (head) head.innerHTML = `今日のあなた専用メニュー — DAY ${String(cur).padStart(2,'0')} <span class="head-deco">🎀</span>`;
  if (sub){
    const ns = (d.selfcare || []).length, nt = (d.training || []).length;
    sub.textContent = d.isRest
      ? `${d.theme}｜今日は休息日。やさしいセルフケア${ns}種だけでOKです`
      : `${d.theme}｜セルフケア${ns}種＋トレーニング${nt}種（${estMinutes(ns + nt)}）`;
    const care = painLabelList();
    if (care.length) sub.textContent += `｜🛡 ${care.join('・')}に配慮した内容です`;
  }

  const all = [...(d.selfcare||[]), ...(d.training||[])];
  state.todayList = all;   // ガイド付き実行モードで使う
  els.todayGrid.innerHTML = all.map(ex => exerciseCard(ex)).join('');
  bindExerciseCards(els.todayGrid);

  if (act){
    const streak = Store.currentStreak(progressKey());
    const one = minimumOne(d);
    act.innerHTML = `
      <button class="btn-primary" id="btn-day-start" type="button">▶ 順番に始める（${all.length}種・${d.isRest?'ゆったり':estMinutes(all.length)}）</button>
      ${one ? `<button class="btn-ghost" id="btn-day-min" type="button">⏱ 時間がない日はこれ1つだけ（${escapeHtml(one.displayName || one.name)}）</button>` : ''}
      <button class="btn-ghost" id="btn-day-done" type="button">✓ できた</button>
      <button class="btn-ghost sm" id="btn-day-partial" type="button">△ 一部できた</button>
      <button class="btn-ghost sm" id="btn-day-none" type="button">× できなかった</button>
      <span class="today-progress">これまで ${doneArr.length}/30日 完了${streak >= 2 ? ` ・ 🔥 ${streak}日連続` : ''}</span>
      ${badgeStrip(doneArr.length, streak)}`;
    document.getElementById('btn-day-start').onclick = () => {
      if (state.todayList && state.todayList.length){
        openExerciseModal(state.todayList[0], { index: 0, list: state.todayList });
      }
    };
    const minBtn = document.getElementById('btn-day-min');
    if (minBtn) minBtn.onclick = () => openExerciseModal(one, { index: 0, list: [one] });
    document.getElementById('btn-day-done').onclick    = () => recordDay('full');
    document.getElementById('btn-day-partial').onclick = () => recordDay('partial');
    document.getElementById('btn-day-none').onclick    = () => recordDay('none');
  }
  renderCheckpoint();
}

// ===== 30日完走後 =====
// ここで終わらせず「①がんばりを見せる ②撮って比べる ③次の30日へ」の3本に繋ぐ
function renderCompletion(head, sub, act, doneArr){
  const p = Store.getProgress(progressKey());
  const round = p.round || 1;
  const logs = Object.values(p.logs || {});
  const full = logs.filter(l => l.status === 'full').length;
  const feel = (f) => logs.filter(l => l.feel === f).length;
  const sessions = Store.getSessions();
  const scored = sessions.filter(s => s.score != null);
  const canCompare = sessions.length >= 2;

  if (head) head.innerHTML = `${round > 1 ? `${round}周目の` : ''}30日プログラム完走！ <span class="head-deco">🎉</span>`;
  if (sub)  sub.textContent = 'ここまで続けられたことが何よりの結果です。次の一歩を選んでください。';

  els.todayGrid.innerHTML = `
    <div class="complete-card">
      <div class="cc-crown">👑</div>
      <div class="cc-title">全30日、やり切りました</div>
      <div class="cc-stats">
        <div><strong>${doneArr.length}</strong><span>日 実施</span></div>
        <div><strong>${full}</strong><span>日 最後まで</span></div>
        ${feel('easy') ? `<div><strong>${feel('easy')}</strong><span>日 楽に感じた</span></div>` : ''}
      </div>
      <p class="cc-lead">${feel('easy') > feel('hard')
        ? '「楽だった」日が「きつかった」日を上回りました。身体が動きに慣れてきています。'
        : '毎日つづけたこと自体が身体への一番の投資です。'}</p>
      ${badgeStrip(doneArr.length, Store.currentStreak(progressKey()))}
    </div>`;

  if (act){
    act.innerHTML = `
      <button class="btn-primary" id="cc-rephoto" type="button">📷 いまの姿勢を撮って、30日前と比べる</button>
      ${canCompare ? '<button class="btn-ghost" id="cc-compare" type="button">📊 これまでの記録を見る</button>' : ''}
      <button class="btn-ghost" id="cc-next" type="button">▶ 次の30日をはじめる</button>
      <span class="today-progress">${scored.length >= 2
        ? `前回 ${scored[scored.length-2].score}点 → 最新 ${scored[scored.length-1].score}点`
        : '写真で診断すると、点数の変化も残ります'}</span>`;
    document.getElementById('cc-rephoto').onclick = () => {
      jumpTo('#upload-section');
    };
    const cmp = document.getElementById('cc-compare');
    if (cmp) cmp.onclick = openMyData;
    document.getElementById('cc-next').onclick = startNextRound;
  }
}

// 次の30日: 前回の体感をもとに基準を決めて、新しい30日を組み直す
function startNextRound(){
  const p = Store.getProgress(progressKey());
  const logs = Object.values(p.logs || {});
  const hard = logs.filter(l => l.feel === 'hard').length;
  const easy = logs.filter(l => l.feel === 'easy').length;
  const level = easy > hard ? 1 : (hard > easy * 2 ? -1 : 0);
  const reason = level === 1 ? '前回は余裕がありそうだったので、少し歯ごたえのある基準で始めます'
              : level === -1 ? '前回きつい日が多かったので、やさしい基準で始めます'
              : '前回とおなじ基準で始めます';
  Store.startRound(progressKey(), { level, reason });
  const keys = state.problems.map(x => x.key);
  state.program = build30DayProgram(keys, state.selectedCourse, programOpts());
  state.currentPhase = 1;
  renderToday();
  renderProgram(1);
  showRecordToast(`🌱 ${(Store.getProgress(progressKey()).round)}周目スタート。${reason}`);
  jumpTo('.today-card');
}

// 忙しい日の「最低これだけ」= その日のいちばん問題直結な1種（ゼロの日を作らないための逃げ道）
function minimumOne(d){
  const all = [...(d.selfcare||[]), ...(d.training||[])];
  if (all.length <= 1) return null;
  const t = state.program?.targeted;
  return all.find(ex => t && t.has(ex.id)) || all[0];
}

// 達成バッジ: 節目を「もう戻れない実績」として見せる
const BADGES = [
  { n: 3,  icon: '🌱', label: '3日' },
  { n: 7,  icon: '🌸', label: '1週間' },
  { n: 14, icon: '🌿', label: '2週間' },
  { n: 21, icon: '🌼', label: '3週間' },
  { n: 30, icon: '👑', label: '30日完走' },
];
function badgeStrip(doneCount, streak){
  const items = BADGES.map(b => {
    const got = doneCount >= b.n;
    return `<span class="badge ${got ? 'got' : ''}" title="${b.label}">${got ? b.icon : '🔒'}<i>${b.label}</i></span>`;
  }).join('');
  const next = BADGES.find(b => doneCount < b.n);
  const hint = next ? `あと${next.n - doneCount}日で ${next.icon} ${next.label}` : '全バッジ達成！';
  return `<div class="badge-strip"><div class="badges">${items}</div><span class="badge-hint">${hint}${streak >= 3 ? ` ・ 🔥 ${streak}日続いています` : ''}</span></div>`;
}

// 今日の分を記録（できた／一部／できなかった）。記録後に体感を1タップで聞く。
function recordDay(status){
  const cur = currentDayNumber();
  if (cur == null) return;
  Store.logDay(progressKey(), cur, status, undefined);
  if (status === 'none'){
    showRecordToast('× 今日はできなかった、と記録しました。明日また DAY ' + cur + ' からで大丈夫です。');
    renderToday(); renderProgram(state.currentPhase);
    return;
  }
  askFeel(cur, status);
}

// 体感を1タップで（スキップ可）。ここが次の自動調整の材料になる。
function askFeel(day, status){
  let box = document.getElementById('feel-ask');
  if (!box){
    box = document.createElement('div');
    box.id = 'feel-ask';
    box.className = 'feel-ask';
    document.body.appendChild(box);
  }
  box.innerHTML = `
    <div class="feel-inner">
      <div class="feel-title">${status === 'full' ? '🎉' : '👍'} DAY ${day} を記録しました</div>
      <div class="feel-q">今日はどうでしたか？（あとの調整に使います）</div>
      <div class="feel-opts">
        <button type="button" data-feel="easy">🙂 楽だった</button>
        <button type="button" data-feel="ok">😌 ちょうどよかった</button>
        <button type="button" data-feel="hard">😣 きつかった</button>
      </div>
      <button type="button" class="feel-skip" data-feel="">答えずに閉じる</button>
    </div>`;
  box.classList.add('show');
  const close = () => { box.classList.remove('show'); renderToday(); renderProgram(state.currentPhase); };
  box.querySelectorAll('[data-feel]').forEach(b => {
    b.onclick = () => {
      const f = b.dataset.feel;
      if (f) Store.logDay(progressKey(), day, status, f);
      close();
      const next = currentDayNumber();
      showRecordToast(next ? `おつかれさまでした。次は DAY ${next} です` : '👑 全30日コンプリート！本当におつかれさまでした');
    };
  });
}

function showRecordToast(msg){
  let t = document.getElementById('save-toast');
  if (!t){
    t = document.createElement('div');
    t.id = 'save-toast'; t.className = 'save-toast';
    document.body.appendChild(t);
  }
  t.innerHTML = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 4000);
}

// 完了として記録（ガイド最終画面から呼ばれる。既存の呼び出し名は維持）
function completeCurrentDay(){
  recordDay('full');
}

// ===== 途中評価と自動適応（Day 7 / 14 / 21）=====
// 「計画どおり30日」ではなく「その人の実際に合わせて30日」にするための仕組み。
const CHECKPOINTS = [7, 14, 21];
// 直近ブロックの記録から、次の10日をどう変えるかを決める
function evaluateBlock(cp){
  const p = Store.getProgress(progressKey());
  const from = cp - 6, to = cp;                 // 直近7日分を見る
  const logs = [];
  for (let d = from; d <= to; d++) if (p.logs[d]) logs.push(p.logs[d]);
  const n = Math.max(1, to - from + 1);
  const cnt = (fn) => logs.filter(fn).length;
  const hard    = cnt(l => l.feel === 'hard') / n;
  const easy    = cnt(l => l.feel === 'easy') / n;
  const missed  = (n - cnt(l => l.status !== 'none')) / n;  // 未記録＋できなかった
  const partial = cnt(l => l.status === 'partial') / n;

  let level = 0, sizeDelta = 0;
  const reasons = [];
  if (hard >= 0.4){ level = -1; reasons.push('「きつかった」が多かったので、強度をひとつやさしくしました'); }
  else if (easy >= 0.6){ level = 1; reasons.push('「楽だった」が続いたので、少し歯ごたえのある内容にしました'); }
  if (missed >= 0.4){ sizeDelta = -1; reasons.push('できない日が続いたので、1日の種目数を減らしました'); }
  else if (partial >= 0.5){ sizeDelta = -1; reasons.push('途中までの日が多かったので、1日の種目数を減らしました'); }
  if (!reasons.length) reasons.push('よいペースです。このまま続けます');
  return { at: cp, level, sizeDelta, reason: reasons.join('。'), stats: { hard, easy, missed, partial } };
}

// 直近で越えたチェックポイントを返す（まだ評価していないもの）
function pendingCheckpoint(){
  const p = Store.getProgress(progressKey());
  const doneMax = p.done.length ? Math.max(...p.done) : 0;
  const already = p.adapt?.at || 0;
  for (let i = CHECKPOINTS.length - 1; i >= 0; i--){
    const cp = CHECKPOINTS[i];
    if (doneMax >= cp && already < cp) return cp;
  }
  return null;
}

function renderCheckpoint(){
  const box = document.getElementById('checkpoint-card');
  if (!box) return;
  const cp = pendingCheckpoint();
  if (!cp){ box.hidden = true; box.innerHTML = ''; return; }
  const ev = evaluateBlock(cp);
  const changed = ev.level !== 0 || ev.sizeDelta !== 0;
  box.hidden = false;
  box.innerHTML = `
    <div class="cp-head">🎯 ${cp}日間おつかれさまでした</div>
    <p class="cp-body">${escapeHtml(ev.reason)}。</p>
    ${changed ? `<p class="cp-note">残りの日程をこの内容に切り替えます。合わなければ元に戻せます。</p>` : ''}
    <div class="cp-actions">
      <button type="button" class="btn-primary" id="cp-apply">${changed ? 'この調整で続ける' : '続ける'}</button>
      ${changed ? '<button type="button" class="btn-ghost sm" id="cp-keep">今のままがいい</button>' : ''}
    </div>`;
  document.getElementById('cp-apply').onclick = () => applyAdapt(ev);
  const keep = document.getElementById('cp-keep');
  if (keep) keep.onclick = () => applyAdapt({ at: cp, level: 0, sizeDelta: 0, reason: '調整せずに続ける' });
}

function applyAdapt(ev){
  // 評価は「今回どちらへ動かすか」の差分。前回までの調整に積み上げる
  //（毎回上書きすると、2周目の引き継ぎ基準や前回の判断が黙って消える）
  const cur = currentAdapt();
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  Store.setAdapt(progressKey(), {
    at: ev.at,
    level: clamp(cur.level + ev.level, -1, 1),
    sizeDelta: clamp(cur.sizeDelta + ev.sizeDelta, -2, 1),
    reason: ev.reason,
  });
  const keys = state.problems.map(p => p.key);
  state.program = build30DayProgram(keys, state.selectedCourse, programOpts());
  renderToday();
  renderProgram(state.currentPhase);
  showRecordToast(ev.level || ev.sizeDelta ? '✅ 残りの日程を調整しました' : '✅ このまま続けます');
}

// 完了時の祝福トースト
function showDoneToast(day){
  let t = document.getElementById('save-toast');
  if (!t){
    t = document.createElement('div');
    t.id = 'save-toast'; t.className = 'save-toast';
    document.body.appendChild(t);
  }
  const next = currentDayNumber();
  t.innerHTML = next
    ? `🎉 DAY ${day} おつかれさまでした！ 次は DAY ${next} です`
    : `👑 全30日コンプリート！ 本当におつかれさまでした`;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 4000);
}

// カテゴリ表記マッピング (新DB対応)
function categoryLabel(ex){
  const cat = ex.category;
  if (cat === 'selfcare' || cat === 'mobility' || cat === 'breath' || cat === 'meditation') return 'セルフケア';
  if (cat === 'strength' || cat === 'core' || cat === 'balance' || cat === 'integration') return 'トレーニング';
  return cat;
}
function categoryClass(ex){
  const cat = ex.category;
  if (cat === 'selfcare' || cat === 'mobility' || cat === 'breath' || cat === 'meditation') return 'selfcare';
  return 'training';
}

// ⑤ このメニューが「あなたのどの問題」に効くかのバッジ
function exerciseProblemBadges(ex){
  const mine = new Set(state.problems.map(p => p.key));
  const tp = ex.targets || ex.targetProblems || [];
  const hit = tp.filter(k => mine.has(k));
  if (!hit.length) return '';
  return `<div class="ex-links">${hit.slice(0,3).map(k => `<span class="ex-link">${PROBLEM_LABELS[k] || k}</span>`).join('')}</div>`;
}

function exerciseCard(ex){
  const firstStep = (ex.how && ex.how[0]) ? ex.how[0] : '';
  return `
    <div class="exercise-card" data-ex="${ex.id}">
      <div class="ex-illust">${ex.illustration || ''}</div>
      <div class="ex-info">
        <span class="ex-cat ${categoryClass(ex)}">${categoryLabel(ex)}</span>
        <h4>${ex.displayName || ex.name}</h4>
        <div class="ex-meta">
          <span><strong>⏱</strong> ${ex.duration}</span>
          <span><strong>🛠</strong> ${ex.equipment}</span>
        </div>
        ${firstStep ? `<div class="ex-howhint"><span class="ex-howhint-badge">STEP 1</span>${firstStep}</div>` : ''}
        <div class="ex-purpose">${ex.purpose}</div>
        ${repeatNote(ex)}
        ${exerciseProblemBadges(ex)}
      </div>
    </div>
  `;
}

// 同じ種目が何度も出てくるのは手抜きではなく「基本種目だから」。
// 黙って繰り返すと使い回しに見えるので、回数と理由を明示する。
function repeatNote(ex){
  const prog = state.program;
  if (!prog || !prog.length) return '';
  let n = 0;
  prog.forEach(d => { [...(d.selfcare||[]), ...(d.training||[])].forEach(e => { if (e.id === ex.id) n++; }); });
  if (n < 3) return '';
  const why = (prog.targeted && prog.targeted.has(ex.id))
    ? 'あなたの姿勢に直接効く基本の種目'
    : '身体の土台になる基本の種目';
  return `<div class="ex-repeat">🔁 30日で${n}回入っています（${why}なので、くり返して身につけます）</div>`;
}

function bindExerciseCards(parent){
  parent.querySelectorAll('.exercise-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.ex;
      openExerciseModal(ALL_EXERCISES[id]);
    });
  });
}

// --- 30-DAY PROGRAM ---
function renderProgram(phase){
  state.currentPhase = phase;
  $$('.phase-tab').forEach(t => t.classList.toggle('active', +t.dataset.phase === phase));

  const doneArr = Store.getProgress(progressKey()).done;
  const doneSet = new Set(doneArr);
  const curDay = currentDayNumber();

  // 進捗バー
  const pp = document.getElementById('program-progress');
  if (pp){
    const pct = Math.round(doneArr.length / 30 * 100);
    pp.innerHTML = `
      <div class="pp-bar"><i style="width:${pct}%"></i></div>
      <span class="pp-label">${doneArr.length}/30日 完了${doneArr.length >= 30 ? '・完走🎉' : doneArr.length > 0 ? '・その調子です！' : ''}</span>`;
  }

  const days = state.program.filter(d => d.phase === phase);
  els.programGrid.innerHTML = days.map(d => dayCard(d, doneSet, curDay)).join('');

  // クリック→詳細モーダル
  els.programGrid.querySelectorAll('.day-card').forEach(card => {
    card.addEventListener('click', () => {
      const day = +card.dataset.day;
      openDayModal(state.program.find(d => d.day === day));
    });
  });
}

function dayCard(d, doneSet, curDay){
  const all = [...(d.selfcare||[]), ...(d.training||[])];
  const done = doneSet && doneSet.has(d.day);
  const isToday = curDay === d.day;
  return `
    <div class="day-card ${d.isRest?'rest':''} ${done?'done':''} ${isToday?'today':''}" data-day="${d.day}">
      <span class="day-badge">${done ? '✓ DONE' : (d.isRest?'REST':'WORK')}</span>
      ${isToday ? '<span class="day-today-tag">今日</span>' : ''}
      <div class="day-num">DAY ${String(d.day).padStart(2,'0')}</div>
      <div class="day-theme">${d.theme}</div>
      <ul class="day-list">
        ${all.slice(0,4).map(ex => `<li>${escapeHtml(ex.displayName || ex.name)}</li>`).join('')}
      </ul>
    </div>
  `;
}

els.phaseTabs.addEventListener('click', e => {
  const btn = e.target.closest('.phase-tab');
  if (!btn) return;
  renderProgram(+btn.dataset.phase);
});

// ===================================================================
// MODAL
// ===================================================================
const PROBLEM_LABELS = {
  forwardHead:'頭部前方位(FHP)',
  roundedShoulders:'巻き肩',
  thoracicKyphosis:'猫背(胸椎後弯)',
  anteriorPelvicTilt:'反り腰(骨盤前傾)',
  posteriorPelvicTilt:'骨盤後傾',
  swayBack:'スウェイバック',
  lateralAsymmetry:'左右非対称',
  kneeValgus:'Knee-in (内向き)',
  kneeVarus:'O脚 (Knee-out)',
  scoliosis:'側弯傾向',
  ankleStiffness:'足首背屈制限',
  general:'全身バランス',
};

// 痛み申告部位に触れる種目には、実行前に注意を出す
function painCautionHTML(ex){
  const f = state.painFlags || {};
  const txt = [ex.displayName, ex.name, ...(ex.how || [])].join(' ');
  const parts = [];
  if (f.knee && /ひざ|膝/.test(txt)) parts.push('ひざ');
  if (f.lowBack && /腰/.test(txt)) parts.push('腰');
  if (!parts.length) return '';
  return `<div class="pain-caution">⚠ <strong>${parts.join('・')}に痛みがある方へ</strong>：痛みを感じたら、その場で中止してください。無理は禁物です。${ex.easyOption ? 'つらい時は下の「きつい場合」の簡単版から始めましょう。' : ''}</div>`;
}

// 実施中に異常が出たときの導線（断定せず、中止と相談を案内する）
function showStopGuidance(ex){
  els.modalBody.innerHTML = `
    <div class="stop-guide">
      <h2>今日はここで中止してください</h2>
      <p class="sg-lead">痛み・しびれ・めまい・息苦しさが出たときは、がんばらずにやめるのが正解です。無理に続けると悪化することがあります。</p>
      <div class="sg-box">
        <strong>いますること</strong>
        <ol>
          <li>動きを止めて、らくな姿勢で座るか横になる</li>
          <li>呼吸が落ち着くまで休む</li>
          <li>今日はこの種目を再開しない</li>
        </ol>
      </div>
      <div class="sg-box sg-warn">
        <strong>次に当てはまる場合は、医療機関にご相談ください</strong>
        <ul>
          <li>痛み・しびれが休んでも続く、くり返す</li>
          <li>手足に力が入りにくい／感覚が鈍い</li>
          <li>強いめまい・吐き気・胸の苦しさがある</li>
          <li>転んだ・ひねったあとに痛みが出た</li>
        </ul>
        <p class="sg-note">このアプリは病気の診断はできません。判断に迷うときは専門家にご相談ください。</p>
      </div>
      <div class="sg-actions">
        <button class="btn-primary" data-close type="button">閉じる</button>
        <button class="btn-ghost" id="sg-skip-today" type="button">今日はお休みにする</button>
      </div>
    </div>`;
  const skip = document.getElementById('sg-skip-today');
  if (skip) skip.onclick = () => { closeModal(); showRestToast(); };
  showModal();
}

function showRestToast(){
  let t = document.getElementById('save-toast');
  if (!t){ t = document.createElement('div'); t.id='save-toast'; t.className='save-toast'; document.body.appendChild(t); }
  t.innerHTML = '🌿 今日はお休みにしました。休むことも大切です。明日また続けましょう。';
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 4500);
}

function openExerciseModal(ex, nav){
  if (!ex) return;
  const rawTargets = ex.targets || ex.targetProblems || [];
  const targets = rawTargets.map(t => PROBLEM_LABELS[t] || t);
  const courseTags = (ex.courses || []).map(c => {
    const def = COURSES[c]; return def ? `<span class="ex-course-tag">${def.icon} ${def.name}</span>` : '';
  }).join('');
  els.modalBody.innerHTML = `
    <div class="modal-ex-head">
      <div class="modal-ex-illust">${ex.illustration || ''}<span class="illust-note">図はイメージ</span></div>
      <div class="modal-ex-info">
        <span class="ex-cat ${categoryClass(ex)}">${categoryLabel(ex)}</span>
        <h2>${ex.displayName || ex.name}</h2>
        ${ex.displayName && ex.displayName !== ex.name ? `<div class="ex-formal">正式名称：${ex.name}</div>` : ''}
        <div class="ex-meta">
          <span><strong>所要</strong> ${ex.duration}</span>
          <span><strong>道具</strong> ${ex.equipment}</span>
        </div>
        <p style="font-size:13px; color:var(--ink-2); margin:10px 0 0">${ex.purpose}</p>
        <div class="ex-course-tags">${courseTags}</div>
      </div>
    </div>
    ${painCautionHTML(ex)}
    <div class="modal-section how-section">
      <h4>📋 やり方 — この手順どおりに動かしてください</h4>
      <ol class="how-steps">${(ex.how||[]).map(s=>`<li>${s}</li>`).join('')}</ol>
      ${ex.easyOption ? `<div class="easy-opt"><span class="easy-badge">きつい場合</span>${ex.easyOption}</div>` : ''}
    </div>
    <div class="modal-section">
      <h4>✨ 効かせるコツ</h4>
      <div class="modal-cues">
        <div class="cue-box do"><strong>✅ こうする</strong>${ex.cues?.do || ''}</div>
        <div class="cue-box dont"><strong>❌ やりがちなミス</strong>${ex.cues?.dont || ''}</div>
      </div>
    </div>
    <div class="modal-section">
      <h4>🎯 対応する姿勢の問題</h4>
      <ul>${targets.map(t=>`<li>${t}</li>`).join('') || '<li>—</li>'}</ul>
    </div>
    <div class="modal-section">
      <h4>💡 なぜ効くのか</h4>
      <p>${ex.why || ''}</p>
    </div>
    <div class="stop-row">
      <button class="btn-stop" id="btn-stop-exercise" type="button">⚠ 痛み・しびれ・めまいが出た（中止する）</button>
    </div>
    ${nav ? `
    <div class="guided-nav">
      <button class="btn-ghost" id="gn-prev" type="button" ${nav.index === 0 ? 'disabled' : ''}>← 前へ</button>
      <span class="gn-pos">${nav.index + 1} / ${nav.list.length}</span>
      ${nav.index < nav.list.length - 1
        ? `<button class="btn-primary" id="gn-next" type="button">次のエクササイズ →</button>`
        : `<button class="btn-primary" id="gn-finish" type="button">✓ 今日の分を完了する</button>`}
    </div>` : ''}
  `;
  const stopBtn = document.getElementById('btn-stop-exercise');
  if (stopBtn) stopBtn.onclick = () => showStopGuidance(ex);

  if (nav){
    const prev = document.getElementById('gn-prev');
    const next = document.getElementById('gn-next');
    const fin  = document.getElementById('gn-finish');
    if (prev && nav.index > 0) prev.onclick = () => openExerciseModal(nav.list[nav.index - 1], { index: nav.index - 1, list: nav.list });
    if (next) next.onclick = () => openExerciseModal(nav.list[nav.index + 1], { index: nav.index + 1, list: nav.list });
    if (fin)  fin.onclick  = () => { closeModal(); completeCurrentDay(); };
  }
  showModal();
}

function openDayModal(d){
  const all = [...(d.selfcare||[]), ...(d.training||[])];
  els.modalBody.innerHTML = `
    <div style="margin-bottom:24px">
      <div style="font-family:'Inter',sans-serif; font-size:12px; color:var(--brand); letter-spacing:.1em; font-weight:700">PHASE ${d.phase} · DAY ${d.day} ${d.isRest?'· REST':''}</div>
      <h2 style="margin:6px 0 4px; font-size:26px">${d.theme}</h2>
      <p style="color:var(--muted); font-size:13px; margin:0">${d.isRest ? '今日は身体を労わる日。呼吸とゆっくりしたストレッチに集中しましょう。' : `この日のメニュー${all.length}種。各エクササイズをタップで詳細表示。`}</p>
    </div>
    <div style="display:grid; gap:14px">
      ${all.map(ex => exerciseCard(ex)).join('')}
    </div>
  `;
  bindExerciseCards(els.modalBody);
  showModal();
}

function showModal(){
  els.modal.hidden = false;
  document.body.style.overflow = 'hidden';
  // 「次へ」でエクササイズを切り替えた時も必ず先頭から読めるように
  els.modal.scrollTop = 0;
  const panel = els.modal.querySelector('.modal-panel');
  if (panel) panel.scrollTop = 0;
}
function closeModal(){
  els.modal.hidden = true;
  document.body.style.overflow = '';
}
els.modal.addEventListener('click', e => {
  if (e.target.matches('[data-close]')) closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !els.modal.hidden) closeModal();
});

// ===================================================================
// MY DATA — 講座生ごとのデータ蓄積・変化追跡（①③④）
// ===================================================================
function fmtDate(iso){
  const d = new Date(iso);
  return `${d.getMonth()+1}/${d.getDate()}`;
}
function fmtDateFull(iso){
  const d = new Date(iso);
  return `${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
}

// 解析完了時に呼ぶ：現在の結果を端末に保存
function saveCurrentSession(){
  try {
    const profile = Store.ensureProfile(Store.getProfile()?.nickname);
    const metrics = state.resultSide
      ? buildMetricsList(state.resultSide, state.resultFront)
          .map(m => ({ name:m.name, value:m.value, sev:m.sev, pct:m.pct }))
      : [];
    const session = {
      nickname: profile.nickname,
      score: state.lastScore ?? null,
      grade: state.lastGrade,
      typeName: state.lastType,
      course: state.selectedCourse,
      problems: state.problems.map(p => ({ key:p.key, title:p.title || PROBLEM_LABELS[p.key] || p.key, severity:p.severity })),
      metrics,
      // 部位別スコアも残す。次回の診断で「どこが良くなったか」を部位単位で言えるようにするため
      regions: calcRegionScores(state.resultSide, state.resultFront, state.problems)
        .map(r => ({ key:r.key, label:r.label, icon:r.icon, score:r.score })),
      symptoms: state.symptoms.slice(),
      symptomFree: state.symptomFree,
      painFlags: state.painFlags || {},
      profile: state.profile || PROFILE_DEFAULT,
      focusParts: state.focusParts || [],
      focusNotes: state.focusNotes || [],
      thumbSide: Store.makeThumb(state.imgSide),
      thumbFront: Store.makeThumb(state.imgFront),
    };
    const saved = Store.addSession(session);
    state.currentSessionId = saved.id;
    showSaveToast(Store.getSessions().length);
  } catch (e){ console.warn('session save failed', e); }
}

function showSaveToast(count){
  let t = document.getElementById('save-toast');
  if (!t){
    t = document.createElement('div');
    t.id = 'save-toast'; t.className = 'save-toast';
    document.body.appendChild(t);
  }
  t.innerHTML = `✓ マイデータに保存しました（通算 ${count} 回目）　<button id="toast-open">マイデータを見る</button>`;
  t.classList.add('show');
  document.getElementById('toast-open').onclick = () => { t.classList.remove('show'); openMyData(); };
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 6000);
}

// ---------- スコア推移グラフ（外部ライブラリ不使用のSVG折れ線）①----------
function scoreChartSVG(sessions){
  sessions = sessions.filter(s => s.score != null); // 簡易診断(スコアなし)は除外
  if (!sessions.length) return '<p class="muted">まだ診断データがありません。</p>';
  const W = 320, H = 150, pad = { l:30, r:14, t:14, b:24 };
  const xs = sessions.map((s,i) => sessions.length===1 ? (pad.l+(W-pad.l-pad.r)/2) : pad.l + (W-pad.l-pad.r) * i/(sessions.length-1));
  const y = v => pad.t + (H-pad.t-pad.b) * (1 - v/100);
  const pts = sessions.map((s,i) => [xs[i], y(s.score||0)]);
  const line = pts.map((p,i) => (i? 'L':'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const area = `M${pts[0][0].toFixed(1)} ${(H-pad.b).toFixed(1)} ` + pts.map(p=>`L${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ') + ` L${pts[pts.length-1][0].toFixed(1)} ${(H-pad.b).toFixed(1)} Z`;
  const grid = [0,25,50,75,100].map(v => `<line x1="${pad.l}" y1="${y(v)}" x2="${W-pad.r}" y2="${y(v)}" stroke="#f1d9e2" stroke-width="1"/><text x="${pad.l-6}" y="${y(v)+3}" text-anchor="end" font-size="9" fill="#b48">${v}</text>`).join('');
  const dots = pts.map((p,i) => `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="4" fill="#fff" stroke="#ec5a86" stroke-width="2.5"/>${i===pts.length-1?`<text x="${p[0].toFixed(1)}" y="${(p[1]-10).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="700" fill="#ec5a86">${sessions[i].score}</text>`:''}`).join('');
  const labels = sessions.map((s,i) => `<text x="${xs[i].toFixed(1)}" y="${H-8}" text-anchor="middle" font-size="9" fill="#b48">${fmtDate(s.date)}</text>`).join('');
  const first = sessions[0].score, last = sessions[sessions.length-1].score, diff = last-first;
  const diffTxt = sessions.length>1 ? `<div class="chart-delta ${diff>=0?'up':'down'}">初回比 ${diff>=0?'+':''}${diff} 点</div>` : '';
  return `${diffTxt}<svg viewBox="0 0 ${W} ${H}" class="score-chart" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fbbacb" stop-opacity="0.5"/><stop offset="100%" stop-color="#fbbacb" stop-opacity="0"/></linearGradient></defs>
    ${grid}<path d="${area}" fill="url(#cg)"/><path d="${line}" fill="none" stroke="#ec5a86" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>${dots}${labels}
  </svg>`;
}

// ---------- マイデータ パネル ----------
function openMyData(){
  renderMyData();
  els.mydata.hidden = false;
  document.body.style.overflow = 'hidden';
}
function closeMyData(){
  els.mydata.hidden = true;
  document.body.style.overflow = '';
}

// ===== 保存済みプランを写真なしで復元表示 =====
function openSavedSession(id){
  const s = Store.getSession(id);
  if (!s){ alert('この記録が見つかりませんでした。'); return; }

  // 問題オブジェクトをキーから復元（severityは保存があれば使う）
  state.problems = (s.problems || []).map(p => {
    const obj = makeSymptomProblem(p.key);
    if (p.title) obj.title = p.title;
    if (p.severity) obj.severity = p.severity;
    obj.fromSaved = true;
    return obj;
  });
  if (!state.problems.length) state.problems = [makeSymptomProblem('general')];

  state.symptoms    = s.symptoms || [];
  state.symptomFree = s.symptomFree || '';
  state.painFlags   = s.painFlags || {};
  setPainAvoidance(state.painFlags);   // 保存プランでも痛み配慮を維持
  state.profile    = s.profile || Store.getPrefs() || PROFILE_DEFAULT;
  state.focusParts = s.focusParts || [];
  state.focusNotes = s.focusNotes || [];
  setFocusParts(state.focusParts);     // 主訴の重点も維持
  const keys = state.problems.map(p => p.key);
  state.recommendation = recommendCourse(keys);
  state.selectedCourse = s.course || state.recommendation.top;
  state.currentPhase   = 1;
  state.program = build30DayProgram(keys, state.selectedCourse, programOpts());

  // 写真なしモード
  state.resultSide = null; state.resultFront = null;
  state.imgSide = null; state.imgFront = null;
  state.lastScore = s.score; state.lastGrade = s.grade; state.lastType = s.typeName;
  state.savedMetrics = s.metrics || null;
  state.savedThumbs  = { side: s.thumbSide, front: s.thumbFront };
  state.currentSessionId = s.id;

  closeMyData();
  renderAll();
  showSavedBanner(s);
  els.results.hidden = false;
  // 再訪者の目的は「今日のメニュー」。診断サマリーではなく今日の分へ直接着地する
  // ※長距離移動のためsmoothではなく即時ジャンプ（確実に届き、画面が流れて酔うのも防ぐ）
  jumpTo('.today-card');
}

// 長距離スクロールの共通処理。
// smooth は環境によって効かず「押しても動かない」ように見えるので即時ジャンプにし、
// フォント/画像の読込でレイアウトがずれても届くよう、着地を確認しながら補正する。
function jumpTo(selector, offset = 12){
  const get = () => document.querySelector(selector);
  const go = () => {
    const t = get();
    if (!t) return;
    const y = t.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo(0, Math.max(0, y));
  };
  go();
  let tries = 0;
  const settle = () => {
    const t = get();
    if (!t) return;
    if (Math.abs(t.getBoundingClientRect().top - offset) > 200 && tries < 5){
      tries++; go(); setTimeout(settle, 350);
    }
  };
  setTimeout(settle, 350);
}

// 保存プラン閲覧中である旨のバナー
function showSavedBanner(s){
  let b = document.getElementById('saved-banner');
  if (!b){
    b = document.createElement('div');
    b.id = 'saved-banner'; b.className = 'saved-banner';
    els.results.prepend(b);
  }
  b.innerHTML = `
    <span>📋 <strong>${fmtDateFull(s.date)}</strong> の保存プランを表示中（写真なしで見られます）</span>
    <button id="saved-new" class="btn-ghost sm">新しく診断する</button>`;
  b.hidden = false;
  document.getElementById('saved-new').onclick = () => {
    b.hidden = true;
    els.results.hidden = true;
    jumpTo('#upload-section');
  };
}
function hideSavedBanner(){
  const b = document.getElementById('saved-banner');
  if (b) b.hidden = true;
}

// ===== 簡易診断（写真なし・お悩みベース） =====
function runSimpleDiagnosis(){
  hideAnalyzeError();
  collectSymptoms();
  collectProfile();     // 時間・運動経験・目的・年代を取得
  computePainFlags();   // 痛み配慮(禁忌)を処方に反映
  computeFocus();       // 主訴の重点部位を処方に反映
  const entries = buildSymptomProblems();
  if (!entries.length){
    alert('お悩みを1つ以上選ぶか、自由記入欄にご記入ください。\n（簡易プランはお悩みをもとに作成します）');
    return;
  }
  state.problems = sortProblemsBySeverity(entries.map(e => makeSymptomProblem(e.key, e.votes)));
  state.resultSide = null; state.resultFront = null;
  state.imgSide = null; state.imgFront = null;
  state.savedMetrics = null; state.savedThumbs = null;
  state.lastScore = null; state.lastGrade = null;
  state.lastType = determinePostureType(state.problems).name;

  const probKeys = state.problems.map(p => p.key);
  state.recommendation = recommendCourse(probKeys);
  state.selectedCourse = state.recommendation.top;
  state.currentPhase = 1;
  state.program = build30DayProgram(probKeys, state.selectedCourse, programOpts());

  hideSavedBanner();
  renderAll();
  saveCurrentSession();
  showSimpleBanner();
  els.results.hidden = false;
  els.results.classList.add('fade-in');
  jumpTo('#results');
}

// 簡易プラン閲覧中である旨のバナー（写真診断への誘導つき）
function showSimpleBanner(){
  let b = document.getElementById('saved-banner');
  if (!b){
    b = document.createElement('div');
    b.id = 'saved-banner'; b.className = 'saved-banner';
    els.results.prepend(b);
  }
  b.innerHTML = `
    <span>📋 <strong>お悩みから作成した簡易プラン</strong>です。写真で診断すると、姿勢スコアつきのより正確なプランになります</span>
    <button id="saved-new" class="btn-ghost sm">写真で診断する</button>`;
  b.hidden = false;
  document.getElementById('saved-new').onclick = () => {
    b.hidden = true;
    els.results.hidden = true;
    jumpTo('#upload-section');
  };
}

function renderMyData(){
  const profile = Store.getProfile() || { nickname:'ゲスト' };
  const sessions = Store.getSessions();
  const latest = sessions[sessions.length-1];
  const best = sessions.reduce((b,s)=> (s.score>(b?.score??-1)?s:b), null);

  els.mydataBody.innerHTML = `
    <div class="md-head">
      <div>
        <div class="md-eyebrow">MY DATA</div>
        <h2>${escapeHtml(profile.nickname)} さんの記録</h2>
        <p class="muted">診断 ${sessions.length} 回　${best && best.score!=null ? `/ 最高 ${best.score}点` : ''}</p>
      </div>
      <div class="md-name-edit">
        <input id="md-nick" type="text" placeholder="ニックネーム" value="${escapeHtml(profile.nickname==='ゲスト'?'':profile.nickname)}" maxlength="16">
        <button class="btn-ghost sm" id="md-nick-save">保存</button>
      </div>
    </div>

    <section class="md-card">
      <h3>📈 姿勢スコアの推移</h3>
      <div id="md-chart">${scoreChartSVG(sessions)}</div>
    </section>

    <section class="md-card">
      <h3>🔄 ビフォー → アフター比較</h3>
      ${sessions.length>=2 ? `
        <div class="cmp-pick">
          <label>Before <select id="cmp-a">${sessions.map((s,i)=>`<option value="${s.id}" ${i===0?'selected':''}>${fmtDateFull(s.date)}（${s.score!=null?s.score+'点':'簡易'}）</option>`).join('')}</select></label>
          <label>After <select id="cmp-b">${sessions.map((s,i)=>`<option value="${s.id}" ${i===sessions.length-1?'selected':''}>${fmtDateFull(s.date)}（${s.score!=null?s.score+'点':'簡易'}）</option>`).join('')}</select></label>
        </div>
        <div id="cmp-result"></div>
      ` : `<p class="muted">2回以上診断すると、写真とスコアの変化を比較できます（残り ${Math.max(0,2-sessions.length)} 回）。</p>`}
    </section>

    <section class="md-card">
      <h3>🗂 診断の履歴</h3>
      <div class="md-history">
        ${sessions.slice().reverse().map(s => `
          <div class="md-hist-row" data-open="${s.id}" role="button" tabindex="0" title="このプランを見る">
            ${s.thumbSide ? `<img class="md-thumb" src="${s.thumbSide}" alt="">` : `<div class="md-thumb ph">📷</div>`}
            <div class="md-hist-info">
              <div class="md-hist-top"><strong>${s.score!=null ? s.score+'点' : '簡易'}</strong> <span class="md-grade">${s.grade||''}</span> <span class="md-type">${escapeHtml(s.typeName||'')}</span></div>
              <div class="md-hist-date">${fmtDateFull(s.date)}</div>
              <div class="md-hist-tags">${(s.problems||[]).slice(0,3).map(p=>`<span>${escapeHtml(p.title)}</span>`).join('')}</div>
            </div>
            <span class="md-hist-view">📋 プランを見る</span>
            <button class="md-del" data-del="${s.id}" title="削除">×</button>
          </div>`).join('') || '<p class="muted">まだ履歴がありません。</p>'}
      </div>
    </section>

    <section class="md-card md-backup">
      <h3>💾 バックアップ / 引き継ぎ</h3>
      <p class="muted">端末を変える時やデータを学長に共有する時に使えます。</p>
      <div class="md-backup-btns">
        <button class="btn-ghost" id="md-export">データを書き出す</button>
        <label class="btn-ghost" for="md-import-file">データを読み込む</label>
        <input id="md-import-file" type="file" accept="application/json" hidden>
      </div>
    </section>
  `;

  // バインド
  const nickSave = document.getElementById('md-nick-save');
  if (nickSave) nickSave.onclick = () => {
    const v = (document.getElementById('md-nick').value||'').trim();
    Store.ensureProfile(v || 'ゲスト');
    renderMyData();
  };
  const a = document.getElementById('cmp-a'), b = document.getElementById('cmp-b');
  if (a && b){
    const upd = () => renderComparison(a.value, b.value);
    a.onchange = upd; b.onchange = upd; upd();
  }
  els.mydataBody.querySelectorAll('[data-del]').forEach(btn => {
    btn.onclick = (e) => { e.stopPropagation(); if (confirm('この診断データを削除しますか？')){ Store.deleteSession(btn.dataset.del); renderMyData(); } };
  });
  // 履歴行クリックで、写真なしでプランを開く
  els.mydataBody.querySelectorAll('[data-open]').forEach(row => {
    const open = () => openSavedSession(row.dataset.open);
    row.onclick = open;
    row.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); open(); } };
  });
  const exp = document.getElementById('md-export');
  if (exp) exp.onclick = () => Store.downloadExport();
  const imp = document.getElementById('md-import-file');
  if (imp) imp.onchange = async () => {
    const f = imp.files[0]; if (!f) return;
    try { Store.importData(await f.text(), true); alert('データを読み込みました。'); renderMyData(); }
    catch(err){ alert('読み込みに失敗しました：' + err.message); }
  };
}

// ③ ビフォーアフター比較
function renderComparison(idA, idB){
  const box = document.getElementById('cmp-result'); if (!box) return;
  const A = Store.getSession(idA), B = Store.getSession(idB);
  if (!A || !B){ box.innerHTML = ''; return; }
  const diff = (B.score||0) - (A.score||0);
  // 指標の変化（名前一致で比較）
  const mapA = Object.fromEntries((A.metrics||[]).map(m=>[m.name,m]));
  const rows = (B.metrics||[]).filter(m=>mapA[m.name]).map(m => {
    const before = mapA[m.name];
    // pctが小さいほど良い（逸脱が少ない）想定。sevで良化/悪化を判定
    const order = { ok:0, mild:1, warn:2, bad:3 };
    const ba = order[before.sev] ?? 1, bb = order[m.sev] ?? 1;
    const trend = bb<ba ? 'up' : bb>ba ? 'down' : 'flat';
    return `<tr><td>${escapeHtml(m.name)}</td><td>${escapeHtml(before.value)}</td><td>→</td><td>${escapeHtml(m.value)}</td><td class="cmp-${trend}">${trend==='up'?'改善':trend==='down'?'要注意':'維持'}</td></tr>`;
  }).join('');
  box.innerHTML = `
    <div class="cmp-photos">
      <figure>${A.thumbSide?`<img src="${A.thumbSide}">`:'<div class="md-thumb ph big">📷</div>'}<figcaption>Before ${fmtDate(A.date)}<br><strong>${A.score!=null?A.score+'点':'簡易'}</strong></figcaption></figure>
      <div class="cmp-arrow">
        <div class="cmp-delta ${diff>=0?'up':'down'}">${diff>=0?'+':''}${diff}<small>点</small></div>
      </div>
      <figure>${B.thumbSide?`<img src="${B.thumbSide}">`:'<div class="md-thumb ph big">📷</div>'}<figcaption>After ${fmtDate(B.date)}<br><strong>${B.score!=null?B.score+'点':'簡易'}</strong></figcaption></figure>
    </div>
    ${regionCompare(A, B)}
    ${rows?`<details class="cmp-detail"><summary>くわしい数値で見る</summary><table class="cmp-table"><thead><tr><th>指標</th><th>Before</th><th></th><th>After</th><th>変化</th></tr></thead><tbody>${rows}</tbody></table></details>`:''}
  `;
}

// 部位ごとの前後比較。専門用語の指標表より先に、これを見せる
function regionCompare(A, B){
  const ra = A.regions, rb = B.regions;
  if (!Array.isArray(ra) || !Array.isArray(rb) || !ra.length || !rb.length){
    return `<p class="cmp-note">部位ごとの比較は、両方とも新しい形式で診断されたときに表示されます。もう一度写真で診断すると次回から出ます。</p>`;
  }
  const mapA = Object.fromEntries(ra.map(r => [r.key, r]));
  const rows = rb.filter(r => mapA[r.key]).map(r => {
    const before = mapA[r.key];
    if (before.score == null || r.score == null){
      return `<div class="rc-row"><span class="rc-label">${r.icon} ${escapeHtml(r.label)}</span><span class="rc-none">未評価</span></div>`;
    }
    const d = r.score - before.score;
    const cls = d > 0 ? 'up' : d < 0 ? 'down' : 'flat';
    return `
      <div class="rc-row">
        <span class="rc-label">${r.icon} ${escapeHtml(r.label)}</span>
        <span class="rc-scores"><b>${before.score}</b> → <b>${r.score}</b></span>
        <span class="rc-delta ${cls}">${d > 0 ? '+' : ''}${d}</span>
      </div>`;
  }).join('');
  if (!rows) return '';
  const gains = rb.filter(r => mapA[r.key] && r.score != null && mapA[r.key].score != null && r.score > mapA[r.key].score);
  const best = gains.sort((x, y) => (y.score - mapA[y.key].score) - (x.score - mapA[x.key].score))[0];
  const lead = best
    ? `いちばん変わったのは <b>${best.icon} ${escapeHtml(best.label)}</b>（+${best.score - mapA[best.key].score}点）でした。`
    : '大きな変化はまだ出ていません。姿勢は積み重ねで変わるので、続けることが効きます。';
  return `<div class="region-compare"><div class="rc-title">部位ごとの変化</div>${rows}<p class="rc-lead">${lead}</p></div>`;
}

// ===================================================================
// FOOTER ACTIONS
// ===================================================================
els.btnRestart.addEventListener('click', () => {
  els.results.hidden = true;
  jumpTo('#upload-section');
});
els.btnPrint.addEventListener('click', () => window.print());

// ===== MY DATA open/close =====
if (els.btnMyData) els.btnMyData.addEventListener('click', openMyData);
if (els.btnSimple) els.btnSimple.addEventListener('click', runSimpleDiagnosis);
if (els.mydata) els.mydata.addEventListener('click', e => {
  if (e.target.matches('[data-close-md]')) closeMyData();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && els.mydata && !els.mydata.hidden) closeMyData();
});
// ヘッダーのバッジに通算回数を反映
(function initMyDataBadge(){
  if (!els.btnMyData) return;
  const n = Store.getSessions().length;
  if (n > 0) els.btnMyData.dataset.count = n;
})();

// 前回のプランがあれば、写真なしで見られる導線をアップロード画面に表示
(function initResumePlan(){
  const box = document.getElementById('resume-plan');
  const btn = document.getElementById('resume-plan-btn');
  if (!box || !btn) return;
  const sessions = Store.getSessions();
  if (!sessions.length) return;
  const latest = sessions[sessions.length - 1];
  box.hidden = false;
  btn.textContent = `前回のプランを見る（${fmtDateFull(latest.date)}）`;
  btn.onclick = () => openSavedSession(latest.id);
})();

// 再訪者向け: ページ最上部の「おかえりなさい」カード（1タップで今日のメニューへ）
(function initWelcomeBack(){
  const box = document.getElementById('welcome-back');
  const btn = document.getElementById('wb-open');
  if (!box || !btn) return;
  const sessions = Store.getSessions();
  if (!sessions.length) return;   // 初見ユーザーには出さない
  const latest = sessions[sessions.length - 1];
  const done = Store.getProgress(latest.id).done || [];
  let nextDay = null;
  for (let d = 1; d <= 30; d++) if (!done.includes(d)) { nextDay = d; break; }

  const nick = Store.getProfile()?.nickname;
  const name = (nick && nick !== 'ゲスト') ? `${escapeHtml(nick)}さん、` : '';
  const title = document.getElementById('wb-title');
  const sub = document.getElementById('wb-sub');
  if (nextDay == null){
    title.textContent = `${name ? name.replace(/、$/, '') + '、' : ''}30日プログラム完走済みです 👑`;
    sub.textContent = '写真でもう一度診断して、姿勢の変化を確かめてみましょう。';
    btn.textContent = 'プランを見る';
  } else {
    title.innerHTML = `おかえりなさい、${name || ''}今日も続けましょう 🌸`;
    sub.textContent = `次は DAY ${nextDay}（これまで ${done.length}/30日 完了）`;
    btn.textContent = `今日のメニューを開く（DAY ${nextDay}）`;
  }
  box.hidden = false;
  btn.onclick = () => openSavedSession(latest.id);
})();
