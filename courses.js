// ===================================================================
// COURSES 定義
// 整体師セルフケア / パーソナル(自重) / ヨガ / ピラティス(マット) / おまかせ
// ===================================================================

const COURSES = {
  seitai: {
    id: 'seitai',
    name: '整体師セルフケア',
    nameEn: 'Body Therapy',
    icon: '🤲',
    color: '#FFB6C1',
    colorSoft: '#FFE5EC',
    supervisor: '整体師・柔道整復師監修',
    desc: '筋肉・筋膜をゆるめるマッサージとストレッチで、こり・重さをほどく',
    style: '気持ちよくゆるめる',
    intensity: '低〜中',
    bestFor: ['肩こり','腰痛','筋膜ほぐし','むくみ','リラックス'],
  },
  personal: {
    id: 'personal',
    name: 'パーソナルトレーニング',
    nameEn: 'Personal Training',
    icon: '💪',
    color: '#A8E6CF',
    colorSoft: '#E5F8EE',
    supervisor: 'NSCA-CPT等 資格者監修',
    desc: '引き締める・姿勢を変える自重トレーニング。毎日の積み重ねで体を変える',
    style: 'しっかり鍛える',
    intensity: '中〜高',
    bestFor: ['引き締め','ボディライン','姿勢改善','筋力UP','代謝UP'],
  },
  yoga: {
    id: 'yoga',
    name: 'ヨガ',
    nameEn: 'Yoga',
    icon: '🧘‍♀️',
    color: '#C9A8E6',
    colorSoft: '#F0E5F8',
    supervisor: '全米ヨガアライアンスRYT200監修',
    desc: 'ストレッチと呼吸でしなやかに。かたい体をゆるめて整える',
    style: '伸ばして呼吸する',
    intensity: '低〜中',
    bestFor: ['柔軟性UP','ストレッチ','呼吸','自律神経','リラックス'],
  },
  pilates: {
    id: 'pilates',
    name: 'ピラティス(マット)',
    nameEn: 'Mat Pilates',
    icon: '🌿',
    color: '#FFD3A8',
    colorSoft: '#FFF1E0',
    supervisor: 'PMA-CPT 監修',
    desc: 'ストレッチ×鍛えるを1日の中で。体幹から姿勢の土台を作り直す',
    style: '伸ばして鍛える',
    intensity: '中',
    bestFor: ['体幹強化','くびれ','姿勢改善','ストレッチ×筋トレ','美姿勢キープ'],
  },
  mixed: {
    id: 'mixed',
    name: 'AIおまかせ（複合）',
    nameEn: 'AI Mixed',
    icon: '✨',
    color: '#FFC9D6',
    colorSoft: '#FFE5EC',
    supervisor: 'PostureLab AI 最適化',
    desc: 'あなたの姿勢診断に基づき、4コースから最適な動きをAIが配合',
    style: 'あなた専用ブレンド',
    intensity: '個別最適',
    bestFor: ['迷ったらこれ','効率重視','バランス重視'],
  },
};

// AIおまかせ（mixed）は選択肢から外した（内部のフォールバック用に定義だけ残す）
const COURSE_ORDER = ['seitai','personal','yoga','pilates'];

// 姿勢問題ごとのコース推奨度 (3=最適, 2=有効, 1=可)
const COURSE_AFFINITY = {
  forwardHead:         { seitai:3, personal:2, yoga:3, pilates:2 },
  roundedShoulders:    { seitai:3, personal:2, yoga:3, pilates:2 },
  thoracicKyphosis:    { seitai:3, personal:2, yoga:3, pilates:3 },
  anteriorPelvicTilt:  { seitai:2, personal:3, yoga:2, pilates:3 },
  posteriorPelvicTilt: { seitai:2, personal:3, yoga:2, pilates:3 },
  swayBack:            { seitai:2, personal:3, yoga:2, pilates:3 },
  lateralAsymmetry:    { seitai:3, personal:2, yoga:2, pilates:3 },
  kneeValgus:          { seitai:2, personal:3, yoga:1, pilates:2 },
  ankleStiffness:      { seitai:3, personal:2, yoga:2, pilates:1 },
  general:             { seitai:2, personal:2, yoga:2, pilates:2 },
};

function recommendCourse(problemKeys){
  const score = { seitai:0, personal:0, yoga:0, pilates:0 };
  problemKeys.forEach(k => {
    const aff = COURSE_AFFINITY[k] || COURSE_AFFINITY.general;
    Object.keys(score).forEach(c => { score[c] += aff[c] || 0; });
  });
  const sorted = Object.entries(score).sort((a,b) => b[1] - a[1]);
  return {
    top: sorted[0][0],
    ranking: sorted.map(([c,s]) => ({course:c, score:s})),
  };
}

export { COURSES, COURSE_ORDER, COURSE_AFFINITY, recommendCourse };
