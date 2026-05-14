// ===================================================================
// MAIN APP CONTROLLER
// ===================================================================
import {
  analyzeSide, analyzeFront,
  detectProblems, determinePostureType,
  calcScore, gradeFromScore, buildMetricsList, LM
} from './analyzer.js';
import { EXERCISES } from './exercises.js';
import { pickTodayMenu, build30DayProgram } from './program.js';
import { getKnowledgeFor } from './knowledge.js';

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
};

// ===== Symptom → Problem mapping =====
// 各症状を、対応する姿勢問題キーへマッピング。複数キーを持つ症状もある。
const SYMPTOM_MAP = {
  shoulderStiff:  { label:'肩こり',           keys:['forwardHead','roundedShoulders'] },
  neckStiff:      { label:'首こり・頭痛',     keys:['forwardHead','thoracicKyphosis'] },
  lowBackPain:    { label:'腰痛',             keys:['anteriorPelvicTilt','swayBack'] },
  aptAware:       { label:'反り腰の自覚',     keys:['anteriorPelvicTilt'] },
  rsAware:        { label:'巻き肩の自覚',     keys:['roundedShoulders'] },
  kyphosisAware:  { label:'猫背の自覚',       keys:['thoracicKyphosis','roundedShoulders'] },
  kneePain:       { label:'膝の痛み',         keys:['kneeValgus','ankleStiffness'] },
  oxLeg:          { label:'O脚・X脚',         keys:['kneeValgus','lateralAsymmetry'] },
  shallowBreath:  { label:'呼吸が浅い',       keys:['roundedShoulders','thoracicKyphosis'] },
  swelling:       { label:'浮腫み・むくみ',   keys:['ankleStiffness','posteriorPelvicTilt'] },
  coldness:       { label:'冷え性',           keys:['posteriorPelvicTilt','swayBack'] },
  fatigue:        { label:'疲れやすい',       keys:['thoracicKyphosis','swayBack'] },
  hipImbalance:   { label:'左右の歪み',       keys:['lateralAsymmetry'] },
  bellyOut:       { label:'下腹ぽっこり',     keys:['anteriorPelvicTilt','swayBack'] },
};

// 症状から追加問題を作る(姿勢解析で検出されなかった場合に補完)
function buildSymptomProblems(){
  const added = new Set();
  const out = [];
  state.symptoms.forEach(sym => {
    const def = SYMPTOM_MAP[sym]; if (!def) return;
    def.keys.forEach(k => {
      if (added.has(k)) return;
      added.add(k);
      out.push(k);
    });
  });
  return out; // problem key array
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
};

function makeSymptomProblem(key){
  const meta = SYMPTOM_PROBLEM_META[key] || SYMPTOM_PROBLEM_META.forwardHead;
  return {
    key,
    severity:'mid',
    title: meta.title,
    description: meta.desc,
    tissues: meta.tissues,
    metric: 'お悩みベース',
    fromSymptom: true,
  };
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

// ===================================================================
// MEDIAPIPE POSE LANDMARKER
// ===================================================================
async function loadLandmarker(){
  if (state.landmarker) return state.landmarker;
  setLoader('MediaPipe Visionモデルを読み込んでいます…');
  const vision = await import('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.9/vision_bundle.mjs');
  const fileset = await vision.FilesetResolver.forVisionTasks(
    'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.9/wasm'
  );
  setLoader('姿勢推定モデル(Pose Landmarker)を初期化中…');
  state.landmarker = await vision.PoseLandmarker.createFromOptions(fileset, {
    baseOptions: {
      modelAssetPath:'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_full/float16/1/pose_landmarker_full.task',
      delegate:'GPU',
    },
    runningMode:'IMAGE',
    numPoses:1,
    minPoseDetectionConfidence: 0.5,
    minPosePresenceConfidence: 0.5,
    minTrackingConfidence: 0.5,
  });
  return state.landmarker;
}

async function detectPose(image){
  const lm = await loadLandmarker();
  const result = lm.detect(image);
  if (!result.landmarks || result.landmarks.length === 0) return null;
  return result.landmarks[0]; // 33 landmarks
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
els.btnAnalyze.addEventListener('click', async () => {
  try {
    setLoader('姿勢を解析中… 側面写真の特徴点を検出しています');
    const lmsSide = await detectPose(state.imgSide);
    if (!lmsSide){
      alert('側面写真から人物を検出できませんでした。全身が写った写真を試してください。');
      hideLoader();
      return;
    }
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
    state.problems = detectProblems(state.resultSide, state.resultFront);
    // 症状から導かれた追加キーを問題リストにマージ(姿勢解析で未検出のものを補完)
    const symptomKeys = buildSymptomProblems();
    const existingKeys = new Set(state.problems.map(p => p.key));
    symptomKeys.forEach(k => {
      if (existingKeys.has(k)) return;
      // 症状起源の問題は severity=mid として追加
      state.problems.push(makeSymptomProblem(k));
    });
    // 「general」のみだったケースでは general を取り除く(症状ベースの処方を優先)
    if (state.problems.length > 1) {
      state.problems = state.problems.filter(p => p.key !== 'general');
    }
    state.program = build30DayProgram(state.problems.map(p=>p.key));

    renderAll();
    hideLoader();
    els.results.hidden = false;
    els.results.classList.add('fade-in');
    setTimeout(() => {
      els.results.scrollIntoView({ behavior:'smooth', block:'start' });
    }, 100);

  } catch (e){
    console.error(e);
    alert('解析中にエラーが発生しました。コンソールで詳細を確認してください。\n\n' + e.message);
    hideLoader();
  }
});

// ===================================================================
// RENDER
// ===================================================================
function renderAll(){
  renderScoreAndType();
  renderMetrics();
  renderOverlays();
  renderSymptomSummary();
  renderProblems();
  renderKnowledge();
  renderToday();
  renderProgram(state.currentPhase);
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

// --- SCORE & TYPE ---
function renderScoreAndType(){
  const score = calcScore(state.resultSide, state.resultFront, state.problems);
  const { grade, desc } = gradeFromScore(score);

  els.scoreValue.textContent = score;
  els.scoreGrade.textContent = grade;
  els.scoreDesc.textContent = desc;

  const circ = 2 * Math.PI * 52;
  const offset = circ - (score/100) * circ;
  els.scoreArc.setAttribute('stroke-dashoffset', offset);

  const type = determinePostureType(state.problems);
  els.postureType.textContent = type.name;
  els.postureTypeDesc.textContent = type.desc;
  els.postureTypeTags.innerHTML = type.tags.map(t => `<span>${t}</span>`).join('');
}

// --- METRICS ---
function renderMetrics(){
  const items = buildMetricsList(state.resultSide, state.resultFront);
  els.metricsList.innerHTML = items.map(it => `
    <div class="metric ${it.sev}">
      <div class="metric-name">${it.name}</div>
      <div class="metric-value">${it.value}</div>
      <div class="metric-bar"><i style="width:${it.pct}%"></i></div>
      <div class="metric-detail">${it.detail}</div>
    </div>
  `).join('');
}

// --- OVERLAYS ---
function renderOverlays(){
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
          <div class="problem-desc">${p.description}</div>
          <div class="tissue-list">
            <div class="tissue tight">
              <strong>🔴 短縮 / 過緊張</strong>
              <ul>${p.tissues.tight.map(t=>`<li>${t}</li>`).join('')||'<li>—</li>'}</ul>
            </div>
            <div class="tissue weak">
              <strong>🟡 弱化 / 機能低下</strong>
              <ul>${p.tissues.weak.map(t=>`<li>${t}</li>`).join('')||'<li>—</li>'}</ul>
            </div>
          </div>
        </div>
        <div class="problem-side">${problemIllust(p.key)}</div>
      </div>
    `;
  }).join('');
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
function renderToday(){
  const menu = pickTodayMenu(state.problems.map(p=>p.key));
  const all = [...menu.selfcare, ...menu.training];
  els.todayGrid.innerHTML = all.map(ex => exerciseCard(ex)).join('');
  bindExerciseCards(els.todayGrid);
}

function exerciseCard(ex){
  return `
    <div class="exercise-card" data-ex="${ex.id}">
      <div class="ex-illust">${ex.illustration}</div>
      <div class="ex-info">
        <span class="ex-cat ${ex.category}">${ex.category==='selfcare'?'セルフケア':'トレーニング'}</span>
        <h4>${ex.name}</h4>
        <div class="ex-meta">
          <span><strong>⏱</strong> ${ex.duration}</span>
          <span><strong>🛠</strong> ${ex.equipment}</span>
        </div>
        <div class="ex-purpose">${ex.purpose}</div>
      </div>
    </div>
  `;
}

function bindExerciseCards(parent){
  parent.querySelectorAll('.exercise-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.ex;
      openExerciseModal(EXERCISES[id]);
    });
  });
}

// --- 30-DAY PROGRAM ---
function renderProgram(phase){
  state.currentPhase = phase;
  $$('.phase-tab').forEach(t => t.classList.toggle('active', +t.dataset.phase === phase));

  const days = state.program.filter(d => d.phase === phase);
  els.programGrid.innerHTML = days.map(d => dayCard(d)).join('');

  // クリック→詳細モーダル
  els.programGrid.querySelectorAll('.day-card').forEach(card => {
    card.addEventListener('click', () => {
      const day = +card.dataset.day;
      openDayModal(state.program.find(d => d.day === day));
    });
  });
}

function dayCard(d){
  const all = [...(d.selfcare||[]), ...(d.training||[])];
  return `
    <div class="day-card ${d.isRest?'rest':''}" data-day="${d.day}">
      <span class="day-badge">${d.isRest?'REST':'WORK'}</span>
      <div class="day-num">DAY ${String(d.day).padStart(2,'0')}</div>
      <div class="day-theme">${d.theme}</div>
      <ul class="day-list">
        ${all.slice(0,4).map(ex => `<li>${ex.name}</li>`).join('')}
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
function openExerciseModal(ex){
  els.modalBody.innerHTML = `
    <div class="modal-ex-head">
      <div class="modal-ex-illust">${ex.illustration}</div>
      <div class="modal-ex-info">
        <span class="ex-cat ${ex.category}">${ex.category==='selfcare'?'セルフケア':'トレーニング'}</span>
        <h2>${ex.name}</h2>
        <div class="ex-meta">
          <span><strong>所要</strong> ${ex.duration}</span>
          <span><strong>道具</strong> ${ex.equipment}</span>
        </div>
        <p style="font-size:13px; color:var(--ink-2); margin:10px 0 0">${ex.purpose}</p>
      </div>
    </div>
    <div class="modal-section">
      <h4>🎯 ターゲット</h4>
      <ul>${ex.targets.map(t=>`<li>${t}</li>`).join('')}</ul>
    </div>
    <div class="modal-section">
      <h4>📋 やり方</h4>
      <ol>${ex.how.map(s=>`<li>${s}</li>`).join('')}</ol>
    </div>
    <div class="modal-section">
      <h4>✨ コツ</h4>
      <div class="modal-cues">
        <div class="cue-box do"><strong>✅ DO</strong>${ex.cues.do}</div>
        <div class="cue-box dont"><strong>❌ DON'T</strong>${ex.cues.dont}</div>
      </div>
    </div>
    <div class="modal-section">
      <h4>💡 なぜ効くのか</h4>
      <p>${ex.why}</p>
    </div>
  `;
  showModal();
}

function openDayModal(d){
  const all = [...(d.selfcare||[]), ...(d.training||[])];
  els.modalBody.innerHTML = `
    <div style="margin-bottom:24px">
      <div style="font-family:'Inter',sans-serif; font-size:12px; color:var(--brand); letter-spacing:.1em; font-weight:700">PHASE ${d.phase} · DAY ${d.day} ${d.isRest?'· REST':''}</div>
      <h2 style="margin:6px 0 4px; font-size:26px">${d.theme}</h2>
      <p style="color:var(--muted); font-size:13px; margin:0">${d.isRest ? '今日は身体を労わる日。呼吸とゆっくりしたストレッチに集中しましょう。' : '今日のメニュー4種。各エクササイズをクリックで詳細表示。'}</p>
    </div>
    <div style="display:grid; gap:14px">
      ${all.map(ex => `
        <div class="exercise-card" data-ex="${ex.id}">
          <div class="ex-illust">${ex.illustration}</div>
          <div class="ex-info">
            <span class="ex-cat ${ex.category}">${ex.category==='selfcare'?'セルフケア':'トレーニング'}</span>
            <h4>${ex.name}</h4>
            <div class="ex-meta"><span><strong>⏱</strong> ${ex.duration}</span><span><strong>🛠</strong> ${ex.equipment}</span></div>
            <div class="ex-purpose">${ex.purpose}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  bindExerciseCards(els.modalBody);
  showModal();
}

function showModal(){
  els.modal.hidden = false;
  document.body.style.overflow = 'hidden';
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
// FOOTER ACTIONS
// ===================================================================
els.btnRestart.addEventListener('click', () => {
  els.results.hidden = true;
  document.getElementById('upload-section').scrollIntoView({behavior:'smooth'});
});
els.btnPrint.addEventListener('click', () => window.print());
