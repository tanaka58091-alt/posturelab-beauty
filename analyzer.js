// ===================================================================
// POSTURE ANALYZER
// MediaPipe Pose Landmarker の33ランドマークから臨床アングル/逸脱を計算
// ===================================================================

// MediaPipe Pose のランドマーク index (33点)
const LM = {
  NOSE:0, LEFT_EYE_INNER:1, LEFT_EYE:2, LEFT_EYE_OUTER:3,
  RIGHT_EYE_INNER:4, RIGHT_EYE:5, RIGHT_EYE_OUTER:6,
  LEFT_EAR:7, RIGHT_EAR:8,
  MOUTH_LEFT:9, MOUTH_RIGHT:10,
  LEFT_SHOULDER:11, RIGHT_SHOULDER:12,
  LEFT_ELBOW:13, RIGHT_ELBOW:14,
  LEFT_WRIST:15, RIGHT_WRIST:16,
  LEFT_PINKY:17, RIGHT_PINKY:18,
  LEFT_INDEX:19, RIGHT_INDEX:20,
  LEFT_THUMB:21, RIGHT_THUMB:22,
  LEFT_HIP:23, RIGHT_HIP:24,
  LEFT_KNEE:25, RIGHT_KNEE:26,
  LEFT_ANKLE:27, RIGHT_ANKLE:28,
  LEFT_HEEL:29, RIGHT_HEEL:30,
  LEFT_FOOT_INDEX:31, RIGHT_FOOT_INDEX:32,
};

// ========== UTILS ==========
function dist(a,b){ return Math.hypot(a.x-b.x, a.y-b.y); }
function mid(a,b){ return { x:(a.x+b.x)/2, y:(a.y+b.y)/2, visibility:Math.min(a.visibility||1,b.visibility||1) }; }
// 2点間ベクトルの傾き(度) - 真上=0°, 真右=90°
function tilt(a,b){
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.atan2(dx, -dy) * 180 / Math.PI; // 真上方向を0度に
}
// 3点角度 (b is vertex)
function angle3(a,b,c){
  const ab = { x:a.x-b.x, y:a.y-b.y };
  const cb = { x:c.x-b.x, y:c.y-b.y };
  const dot = ab.x*cb.x + ab.y*cb.y;
  const mag = Math.hypot(ab.x,ab.y) * Math.hypot(cb.x,cb.y);
  return Math.acos(Math.min(1,Math.max(-1, dot/mag))) * 180 / Math.PI;
}
function horizAngleDeg(a,b){
  // 水平からの傾き(度), positive=右が上
  return Math.atan2(b.y-a.y, b.x-a.x) * 180 / Math.PI;
}

// ========== SIDE VIEW (横向き写真) ==========
// 横向き写真の自動向き判定: 顔(耳と肩)で左右どちらを向いているか
function detectSideFacing(lms){
  // visibility 高い方の耳を採用
  const lEar = lms[LM.LEFT_EAR], rEar = lms[LM.RIGHT_EAR];
  if ((lEar?.visibility||0) > (rEar?.visibility||0)) return 'left'; // 体の左側がカメラに向いている
  return 'right';
}

function analyzeSide(lms){
  const facing = detectSideFacing(lms);
  // 横向きでカメラに見える側の耳・肩・骨盤・膝・足を採用
  const earKey = facing==='left' ? LM.LEFT_EAR : LM.RIGHT_EAR;
  const shKey  = facing==='left' ? LM.LEFT_SHOULDER : LM.RIGHT_SHOULDER;
  const hipKey = facing==='left' ? LM.LEFT_HIP : LM.RIGHT_HIP;
  const kneeKey= facing==='left' ? LM.LEFT_KNEE : LM.RIGHT_KNEE;
  const ankKey = facing==='left' ? LM.LEFT_ANKLE : LM.RIGHT_ANKLE;
  const elbowKey = facing==='left' ? LM.LEFT_ELBOW : LM.RIGHT_ELBOW;

  const ear   = lms[earKey];
  const sh    = lms[shKey];
  const hip   = lms[hipKey];
  const knee  = lms[kneeKey];
  const ankle = lms[ankKey];

  // === 1. Forward Head Posture (頭部前方位)
  // 耳が肩より前にどれだけ出ているか (画像座標で水平距離 / 肩-骨盤の体幹長 で正規化)
  const trunkLen = dist(sh, hip);
  // facing=left なら耳が画像左にいるほど "前". facing=right なら逆
  const earOffset = facing==='left' ? (sh.x - ear.x) : (ear.x - sh.x);
  // 正規化: 0=耳が肩の真上, 0.2=体幹の20%前
  const fhRatio = earOffset / trunkLen;
  // 角度換算 (CVA approx): tan(angle) = offset / height
  const earToShVert = Math.abs(ear.y - sh.y);
  const fhAngle = Math.atan2(Math.abs(earOffset), earToShVert) * 180 / Math.PI;

  // === 2. Rounded Shoulder (巻き肩)
  // 肩が骨盤より前にあるか
  const shOffset = facing==='left' ? (hip.x - sh.x) : (sh.x - hip.x);
  const rsRatio = shOffset / trunkLen;
  // ※ 横向き写真だけでは肩そのものの内旋は読みにくい→正面のelbow位置で補強
  const rsAngle = Math.atan2(Math.abs(shOffset), Math.abs(sh.y - hip.y)) * 180 / Math.PI;

  // === 3. Pelvic Tilt (骨盤傾斜)
  // 厳密には ASIS-PSIS だが、横向き写真からは推定困難。
  // 代用: 大転子(hip) と 大腿骨遠位(膝) のなす線と垂直線の角度、
  //       および腰椎(肩-骨盤線)の弯曲 (骨盤前方シフトの代用) を組み合わせる
  const thighTilt = horizAngleDeg(hip, knee); // 0=水平, 90=垂直下
  // 横向き写真で「骨盤が前傾」=大腿骨が後方に流れる傾向→thighTiltが90から外れる方向で判定
  const pelvicTilt = Math.abs(90 - Math.abs(thighTilt)); // 0=完全垂直
  // 骨盤前傾 vs 後傾の判定: 骨盤が膝より前にあるか後ろにあるか
  const pelvicHorizDiff = facing==='left' ? (hip.x - knee.x) : (knee.x - hip.x);
  const pelvicForward = pelvicHorizDiff > 0; // hip が前

  // === 4. Knee Position
  const kneeAngle = angle3(hip, knee, ankle); // 180=完全伸展
  const kneeFlex = 180 - kneeAngle;

  // === 5. Sway Back 判定
  // 骨盤が肩より前にシフト + 膝が伸展ロック
  const pelvisShiftFwd = facing==='left' ? (sh.x - hip.x) : (hip.x - sh.x);
  const swayBackScore = (-pelvisShiftFwd / trunkLen) + (kneeFlex < 5 ? 0.1 : 0);

  // === 6. Plumb Line (理想垂直線) からの逸脱
  // 理想: 耳-肩-大転子-膝-外果が一直線
  const refX = ankle.x;
  const plumbDev = {
    ear:   Math.abs(ear.x - refX) / trunkLen,
    shoulder: Math.abs(sh.x - refX) / trunkLen,
    hip:   Math.abs(hip.x - refX) / trunkLen,
    knee:  Math.abs(knee.x - refX) / trunkLen,
  };

  // === 7. Thoracic Kyphosis (推定)
  // 肩〜耳のラインがどれだけ前傾しているか (頭部前方位と重なる側面)
  const headForward = facing==='left' ? (sh.x - ear.x) : (ear.x - sh.x);
  const cervicalAngle = Math.atan2(headForward, Math.abs(ear.y - sh.y)) * 180/Math.PI;

  return {
    facing,
    landmarks: {
      ear, shoulder:sh, hip, knee, ankle, elbow: lms[elbowKey],
    },
    metrics: {
      forwardHeadRatio: fhRatio,
      forwardHeadAngle: fhAngle,
      roundedShoulderRatio: rsRatio,
      roundedShoulderAngle: rsAngle,
      pelvicTiltAngle: pelvicTilt,
      pelvicForward,
      kneeFlex,
      swayBackScore,
      plumbDev,
      cervicalAngle,
    }
  };
}

// ========== FRONT VIEW ==========
function analyzeFront(lms){
  const lSh = lms[LM.LEFT_SHOULDER], rSh = lms[LM.RIGHT_SHOULDER];
  const lHip = lms[LM.LEFT_HIP], rHip = lms[LM.RIGHT_HIP];
  const lKnee = lms[LM.LEFT_KNEE], rKnee = lms[LM.RIGHT_KNEE];
  const lAnk = lms[LM.LEFT_ANKLE], rAnk = lms[LM.RIGHT_ANKLE];
  const lEar = lms[LM.LEFT_EAR], rEar = lms[LM.RIGHT_EAR];

  // 体格スケール
  const shoulderWidth = dist(lSh, rSh);
  const trunkH = dist(mid(lSh,rSh), mid(lHip,rHip));

  // === 肩の傾き(水平からの度数)
  const shoulderTilt = horizAngleDeg(lSh, rSh); // 0=水平
  // === 骨盤の傾き
  const pelvicTilt = horizAngleDeg(lHip, rHip);
  // === 頭部の傾き
  const headTilt = horizAngleDeg(lEar, rEar);

  // === 膝のアライメント(Q-angle approx)
  // 各側ごとに hip→knee と knee→ankle のなす角度
  const lKneeAxis = angle3(lHip, lKnee, lAnk);
  const rKneeAxis = angle3(rHip, rKnee, rAnk);
  // Knee-in 検出: 膝が両股関節中央に近づいているか
  const midHip = mid(lHip, rHip);
  const lKneeIn = (midHip.x - lKnee.x) / shoulderWidth; // 大きいほど内側に入っている
  const rKneeIn = (rKnee.x - midHip.x) / shoulderWidth;

  // === 全体の左右非対称スコア
  const lateralScore =
    Math.abs(shoulderTilt) * 0.4 +
    Math.abs(pelvicTilt) * 0.4 +
    Math.abs(headTilt) * 0.2;

  return {
    landmarks: { lSh, rSh, lHip, rHip, lKnee, rKnee, lAnk, rAnk, lEar, rEar },
    metrics: {
      shoulderTilt, pelvicTilt, headTilt,
      lKneeAxis, rKneeAxis,
      lKneeIn, rKneeIn,
      lateralScore,
      shoulderWidth, trunkH,
    }
  };
}

// ========== PROBLEM DETECTION ==========
// 閾値は臨床基準 + 写真ベース推定の補正値
function detectProblems(sideRes, frontRes){
  const problems = [];
  const m = sideRes?.metrics || {};
  const fm = frontRes?.metrics || null;

  // 1. Forward Head Posture
  if (m.forwardHeadAngle != null) {
    const a = m.forwardHeadAngle;
    if (a > 28) {
      problems.push(makeProblem('forwardHead', a, [10,20,28], '頭部前方位（前方頭位）', m));
    }
  }

  // 2. Rounded Shoulders
  if (m.roundedShoulderRatio != null) {
    const r = m.roundedShoulderRatio;
    if (r > 0.05) {
      problems.push(makeProblem('roundedShoulders', r, [0.02,0.08,0.15], '巻き肩（肩甲骨前方位）', m));
    }
  }

  // 3. Thoracic Kyphosis (頭部前方が強い場合は胸椎後弯も疑う)
  if (m.cervicalAngle != null && m.cervicalAngle > 22) {
    problems.push(makeProblem('thoracicKyphosis', m.cervicalAngle, [10,20,30], '胸椎後弯（猫背）', m));
  }

  // 4. Pelvic Tilt
  if (m.pelvicForward && m.pelvicTiltAngle > 5){
    // 前傾の可能性
    problems.push(makeProblem('anteriorPelvicTilt', m.pelvicTiltAngle, [3,8,15], '骨盤前傾（反り腰）', m));
  } else if (!m.pelvicForward && m.pelvicTiltAngle > 5){
    problems.push(makeProblem('posteriorPelvicTilt', m.pelvicTiltAngle, [3,8,15], '骨盤後傾', m));
  }

  // 5. Sway Back
  if (m.swayBackScore && m.swayBackScore > 0.05) {
    problems.push(makeProblem('swayBack', m.swayBackScore, [0.05, 0.1, 0.2], 'スウェイバック姿勢', m));
  }

  // 6. Front view based
  if (fm) {
    if (Math.abs(fm.shoulderTilt) > 2 || Math.abs(fm.pelvicTilt) > 2) {
      const v = Math.max(Math.abs(fm.shoulderTilt), Math.abs(fm.pelvicTilt));
      problems.push(makeProblem('lateralAsymmetry', v, [2,4,7], '左右非対称', fm));
    }
    if (fm.lKneeIn > 0.05 || fm.rKneeIn > 0.05) {
      const v = Math.max(fm.lKneeIn, fm.rKneeIn);
      problems.push(makeProblem('kneeValgus', v, [0.03,0.08,0.15], '膝の内向き（Knee-in）', fm));
    }
    // O脚（膝外向き = Knee Varus）: 両膝が外側に開く
    if (fm.lKneeIn < -0.03 && fm.rKneeIn < -0.03) {
      const v = Math.abs(Math.min(fm.lKneeIn, fm.rKneeIn));
      problems.push(makeProblem('kneeVarus', v, [0.03,0.06,0.12], 'O脚（Knee-out）', fm));
    }
    // 側弯傾向: 肩と骨盤の傾きが逆方向(Cカーブ代償)
    if (Math.abs(fm.shoulderTilt) > 1.5 && Math.abs(fm.pelvicTilt) > 1.5
        && Math.sign(fm.shoulderTilt) !== Math.sign(fm.pelvicTilt)) {
      const v = (Math.abs(fm.shoulderTilt) + Math.abs(fm.pelvicTilt)) / 2;
      problems.push(makeProblem('scoliosis', v, [2,4,7], '側弯傾向（Cカーブ）', fm));
    }
  }

  // 7. Ankle stiffness (推定: 立位で膝-足首が傾いている)
  // - 横画像から ankle と knee の水平差
  if (m && sideRes) {
    const facing = sideRes.facing;
    const ankle = sideRes.landmarks.ankle;
    const knee  = sideRes.landmarks.knee;
    const horizDiff = Math.abs(knee.x - ankle.x);
    const trunkLen = dist(sideRes.landmarks.shoulder, sideRes.landmarks.hip);
    if (trunkLen > 0 && horizDiff/trunkLen > 0.18) {
      problems.push(makeProblem('ankleStiffness', horizDiff/trunkLen, [0.1,0.18,0.3], '足首背屈制限', m));
    }
  }

  // 問題が1つもなければ general 1つ
  if (problems.length === 0) {
    problems.push({
      key:'general',
      severity:'low',
      title:'全体的に良好な姿勢',
      description:'明確な逸脱は検出されませんでした。さらに磨きをかける軽い維持メニューを提案します。',
      metric:'OK',
      tissues:{ tight:[], weak:[] },
    });
  }

  return problems;
}

function severityFrom(value, thresholds){
  const [low, mid, high] = thresholds;
  if (value < mid) return 'low';
  if (value < high) return 'mid';
  return 'high';
}

const PROBLEM_TEMPLATES = {
  forwardHead: {
    description:'頭が肩より前方に位置する状態。長時間のスマホ・PC使用が主原因で、首の負担は最大15kgに達します。眼精疲労・頭痛・肩こりの根本原因。',
    tissues:{
      tight:['上部僧帽筋','肩甲挙筋','胸鎖乳突筋','後頭下筋群','頸半棘筋'],
      weak:['深部頸屈筋(頸長筋/頭長筋)','下部僧帽筋','前鋸筋'],
    },
    unit:'°',
  },
  roundedShoulders: {
    description:'肩が前方に巻き込まれた状態。胸郭の動きを制限し呼吸を浅くします。胸郭出口症候群・肩関節インピンジメントの原因にも。',
    tissues:{
      tight:['大胸筋','小胸筋','烏口腕筋','広背筋上部','肩甲下筋'],
      weak:['菱形筋','下部僧帽筋','棘下筋','小円筋','前鋸筋'],
    },
    unit:'',
  },
  thoracicKyphosis: {
    description:'胸椎が過度に後弯した猫背。肺活量を制限し、慢性疲労や集中力低下に直結。30代以降は転倒リスクも上昇。',
    tissues:{
      tight:['脊柱起立筋(下部胸椎)','大胸筋','小胸筋','腹直筋上部'],
      weak:['脊柱起立筋(上部胸椎)','下部僧帽筋','菱形筋','多裂筋'],
    },
    unit:'°',
  },
  anteriorPelvicTilt: {
    description:'骨盤が前に傾き、腰椎が過度に反った状態(反り腰)。腸腰筋短縮と臀筋弱化のコンビネーション。腰痛・坐骨神経痛の主因。',
    tissues:{
      tight:['腸腰筋(腸骨筋/大腰筋)','大腿直筋','脊柱起立筋(腰部)','大腿筋膜張筋','腰方形筋'],
      weak:['大臀筋','腹直筋','腹横筋','ハムストリングス'],
    },
    unit:'°',
  },
  posteriorPelvicTilt: {
    description:'骨盤が後ろに傾き、腰椎の生理的湾曲が失われた状態。長時間座位で多発。椎間板への圧が増し、慢性的な腰のだるさに。',
    tissues:{
      tight:['ハムストリングス','腹直筋','大臀筋(上部繊維)'],
      weak:['腸腰筋','脊柱起立筋(腰部)','多裂筋'],
    },
    unit:'°',
  },
  swayBack: {
    description:'骨盤が前方にシフトし、上半身が後ろに倒れる代償姿勢。筋ではなく関節包と靱帯で立っているため、椎間板変性のリスクが極めて高い。',
    tissues:{
      tight:['ハムストリングス','腹直筋上部','広背筋'],
      weak:['腸腰筋','腹斜筋','下部脊柱起立筋','多裂筋'],
    },
    unit:'',
  },
  lateralAsymmetry: {
    description:'肩や骨盤の左右の高さに差がある状態。長期化すると側弯・椎間板の不均一摩耗を招きます。',
    tissues:{
      tight:['腰方形筋(高い側)','広背筋(高い側)','中臀筋(低い側)'],
      weak:['腰方形筋(低い側)','中臀筋(高い側)','腹斜筋(反対側)'],
    },
    unit:'°',
  },
  kneeValgus: {
    description:'膝が内側に入る(X脚傾向)。中臀筋・深層外旋六筋の機能不全が原因。膝痛・ACL損傷・偏平足への連鎖。',
    tissues:{
      tight:['内転筋群','大腿筋膜張筋','腓腹筋(内側頭)'],
      weak:['中臀筋','深層外旋六筋','大臀筋(下部繊維)','後脛骨筋'],
    },
    unit:'',
  },
  ankleStiffness: {
    description:'足首の背屈可動域制限。しゃがむ・階段下りで代償が出る。連鎖的に膝・腰の負担増。',
    tissues:{
      tight:['腓腹筋','ヒラメ筋','後脛骨筋','足底筋膜'],
      weak:['前脛骨筋','長腓骨筋'],
    },
    unit:'',
  },
  kneeVarus: {
    description:'O脚(膝が外側に開く)。中臀筋・内側広筋・内転筋下部の機能不全、外側組織の過緊張が原因。膝内側痛・変形性膝関節症のリスク増。',
    tissues:{
      tight:['大腿筋膜張筋','腸脛靱帯','外側ハムストリングス','腓骨筋','梨状筋'],
      weak:['内転筋群下部','内側広筋','中臀筋後部繊維','内側ハムストリングス','後脛骨筋'],
    },
    unit:'',
  },
  scoliosis: {
    description:'脊柱の左右への弯曲傾向(機能性側弯)。左右の筋バランス崩れが原因で、長期化すると肋骨変形・呼吸機能低下のリスク。',
    tissues:{
      tight:['凸側 腰方形筋','凸側 広背筋','凸側 腹斜筋','凸側 腸腰筋'],
      weak:['凹側 腰方形筋','凹側 腹斜筋','凹側 中臀筋','凹側 多裂筋'],
    },
    unit:'°',
  },
};

function makeProblem(key, value, thresholds, title, metrics){
  const tpl = PROBLEM_TEMPLATES[key];
  const severity = severityFrom(value, thresholds);
  return {
    key, severity, title,
    description: tpl.description,
    tissues: tpl.tissues,
    metric: typeof value==='number' ? value.toFixed(1) + tpl.unit : value,
    rawValue: value,
  };
}

// ========== POSTURE TYPE ==========
function determinePostureType(problems){
  const keys = problems.map(p=>p.key);
  const hasFH = keys.includes('forwardHead');
  const hasRS = keys.includes('roundedShoulders');
  const hasTK = keys.includes('thoracicKyphosis');
  const hasAPT = keys.includes('anteriorPelvicTilt');
  const hasSway = keys.includes('swayBack');
  const hasAsym = keys.includes('lateralAsymmetry');
  const hasKV = keys.includes('kneeValgus');

  // 1. 上部交差症候群
  if (hasFH && (hasRS || hasTK)) {
    if (hasAPT) {
      return {
        name:'上部交差＋下部交差症候群',
        desc:'頭部前方位・巻き肩と反り腰が併存。デスクワーカーに最も多い「複合タイプ」。胸椎モビリティと股関節屈筋の解放が鍵。',
        tags:['Upper Crossed Syndrome','Lower Crossed Syndrome','複合型'],
      };
    }
    return {
      name:'上部交差症候群（Upper Crossed Syndrome）',
      desc:'頭部前方位・胸椎後弯・肩甲骨前方位の典型パターン。Janda博士による分類。スマホ・PC作業で誰もが進行する現代病。',
      tags:['Upper Crossed Syndrome','頭部前方位','巻き肩'],
    };
  }

  // 2. 下部交差症候群
  if (hasAPT) {
    return {
      name:'下部交差症候群（Lower Crossed Syndrome）',
      desc:'腸腰筋・脊柱起立筋の短縮と、腹筋・臀筋の弱化が交差したパターン。反り腰・腰痛・坐骨神経痛の温床。',
      tags:['Lower Crossed Syndrome','反り腰','骨盤前傾'],
    };
  }

  // 3. スウェイバック
  if (hasSway) {
    return {
      name:'スウェイバック姿勢',
      desc:'骨盤を前に押し出し、上半身が後ろに倒れた「楽な立ち方」。靱帯と関節包に依存する危険な姿勢パターン。',
      tags:['Sway Back','骨盤前方シフト'],
    };
  }

  // 4. 左右非対称
  if (hasAsym || hasKV) {
    return {
      name:'機能的左右非対称型',
      desc:'肩・骨盤・膝のいずれかに左右差が顕著。生活習慣の偏り(片側荷重・足組み等)が定着したパターン。',
      tags:['Lateral Asymmetry','機能不全'],
    };
  }

  if (hasTK || hasRS){
    return {
      name:'軽度猫背・巻き肩タイプ',
      desc:'胸椎の柔軟性低下と肩甲骨周囲の弱化が見られます。早期介入で十分に改善可能。',
      tags:['軽症','胸椎モビリティ要'],
    };
  }

  return {
    name:'良好な姿勢',
    desc:'明確な逸脱は見つかりません。維持メニューで現状をキープしましょう。',
    tags:['Good','維持期'],
  };
}

// ========== SCORE ==========
function calcScore(sideRes, frontRes, problems){
  let score = 100;
  problems.forEach(p => {
    if (p.severity === 'low')  score -= 4;
    if (p.severity === 'mid')  score -= 9;
    if (p.severity === 'high') score -= 16;
  });
  return Math.max(35, Math.min(100, score));
}

function gradeFromScore(s){
  if (s >= 92) return { grade:'EXCELLENT', desc:'プロのアスリートレベル。維持を心がけましょう。' };
  if (s >= 82) return { grade:'GOOD',      desc:'良好な姿勢。微調整でさらに伸びしろあり。' };
  if (s >= 70) return { grade:'FAIR',      desc:'いくつか改善ポイントあり。30日プログラムで明確に改善できます。' };
  if (s >= 58) return { grade:'NEEDS WORK',desc:'複数の逸脱を検出。集中的なケアが必要です。' };
  return         { grade:'CRITICAL',       desc:'多面的な機能不全。専門家との併用を推奨します。' };
}

// ========== METRICS DISPLAY ==========
function buildMetricsList(sideRes, frontRes){
  const list = [];
  const m = sideRes?.metrics;
  const fm = frontRes?.metrics;

  if (m) {
    list.push({
      name:'頭部前方位角(CVA)',
      value: m.forwardHeadAngle.toFixed(1) + '°',
      detail:'臨床基準: 正常<22° / 軽度22-28° / 中等度28-35° / 重度>35°',
      pct: Math.min(100, m.forwardHeadAngle / 45 * 100),
      sev: m.forwardHeadAngle < 22 ? 'good' : m.forwardHeadAngle < 28 ? 'warn' : 'bad',
    });
    list.push({
      name:'肩-骨盤垂直線逸脱',
      value: (m.roundedShoulderRatio*100).toFixed(1) + '%',
      detail:'体幹長に対する肩の前方シフト率。正常<3%',
      pct: Math.min(100, m.roundedShoulderRatio * 400),
      sev: m.roundedShoulderRatio < 0.03 ? 'good' : m.roundedShoulderRatio < 0.08 ? 'warn' : 'bad',
    });
    list.push({
      name:'骨盤大腿角',
      value: m.pelvicTiltAngle.toFixed(1) + '°',
      detail:m.pelvicForward ? '前傾傾向' : '後傾傾向',
      pct: Math.min(100, m.pelvicTiltAngle / 20 * 100),
      sev: m.pelvicTiltAngle < 5 ? 'good' : m.pelvicTiltAngle < 10 ? 'warn' : 'bad',
    });
    list.push({
      name:'膝関節屈曲(立位)',
      value: m.kneeFlex.toFixed(1) + '°',
      detail:'正常範囲: 0-5° / 過伸展<0° / 屈曲位>5°',
      pct: Math.min(100, Math.abs(m.kneeFlex) / 20 * 100),
      sev: Math.abs(m.kneeFlex) < 5 ? 'good' : Math.abs(m.kneeFlex) < 10 ? 'warn' : 'bad',
    });
  }
  if (fm) {
    list.push({
      name:'肩の水平度',
      value: Math.abs(fm.shoulderTilt).toFixed(1) + '°',
      detail:'左右の肩の高さの差。正常<2°',
      pct: Math.min(100, Math.abs(fm.shoulderTilt) / 8 * 100),
      sev: Math.abs(fm.shoulderTilt) < 2 ? 'good' : Math.abs(fm.shoulderTilt) < 4 ? 'warn' : 'bad',
    });
    list.push({
      name:'骨盤の水平度',
      value: Math.abs(fm.pelvicTilt).toFixed(1) + '°',
      detail:'左右の骨盤の高さの差。正常<2°',
      pct: Math.min(100, Math.abs(fm.pelvicTilt) / 8 * 100),
      sev: Math.abs(fm.pelvicTilt) < 2 ? 'good' : Math.abs(fm.pelvicTilt) < 4 ? 'warn' : 'bad',
    });
  }

  return list;
}

export {
  LM,
  analyzeSide,
  analyzeFront,
  detectProblems,
  determinePostureType,
  calcScore,
  gradeFromScore,
  buildMetricsList,
};
