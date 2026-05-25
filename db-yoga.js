// ===================================================================
// ヨガ (YOGA) — アサナ・呼吸法・瞑想
// ===================================================================

import { SVG2 } from './svg-library.js';

const DB_YOGA = [
  // ============== STANDING ASANAS (14種) ==============
  {
    id:'yg_mountain', name:'タダーサナ(山のポーズ)', courses:['yoga'],
    targetProblems:['general','swayBack'],
    category:'asana', technique:'standing', bodyPart:'fullbody', intensity:1,
    equipment:'マット', position:'standing', duration:'1分',
    illustration: SVG2.treePose,
    purpose:'全ヨガの基礎。立ち姿の整列を作る。',
    how:['足を揃え両足裏4点(かかと2点・指の付け根2点)に均等に。','尾骨を下げ頭頂を天井へ。','両手は体側で1分。'],
    cues:{do:'呼吸を深く。',dont:'反り腰にならない。'},
    why:'すべての立位アサナの土台。'
  },
  {
    id:'yg_warrior1', name:'ウォリアーI', courses:['yoga'],
    targetProblems:['anteriorPelvicTilt','swayBack','roundedShoulders'],
    category:'asana', technique:'standing', bodyPart:'fullbody', intensity:2,
    equipment:'マット', position:'standing', duration:'各45秒',
    illustration: SVG2.warrior,
    purpose:'力強さと安定感の代表アサナ。',
    how:['足を前後に大きく開き前膝90度。','後ろ脚を伸ばしつま先を斜めに。','両腕を頭上に伸ばし45秒。反対も。'],
    cues:{do:'骨盤は正面。',dont:'前膝が内に入らない。'},
    why:'股関節屈筋を伸ばしながら全身を活性化。'
  },
  {
    id:'yg_warrior2', name:'ウォリアーII', courses:['yoga'],
    targetProblems:['kneeValgus','lateralAsymmetry'],
    category:'asana', technique:'standing', bodyPart:'fullbody', intensity:2,
    equipment:'マット', position:'standing', duration:'各45秒',
    illustration: SVG2.warrior,
    purpose:'下半身強化＋胸郭オープン。',
    how:['足を大きく開き前膝90度。','骨盤を横向きに開き両腕を水平に。','視線は前手の先。45秒。反対も。'],
    cues:{do:'肩はリラックス。',dont:'前膝がつま先より前に出ない。'},
    why:'内転筋・臀筋を強化しKnee-in改善。'
  },
  {
    id:'yg_warrior3', name:'ウォリアーIII', courses:['yoga'],
    targetProblems:['lateralAsymmetry','posteriorPelvicTilt'],
    category:'asana', technique:'standing', bodyPart:'fullbody', intensity:3,
    equipment:'マット', position:'standing', duration:'各30秒',
    illustration: SVG2.forwardFold,
    purpose:'片脚立ちで全身バランス強化。',
    how:['片脚立ちから反対脚を後ろに伸ばす。','上体を前に倒し床と平行に。','両腕を前に伸ばす。30秒。反対も。'],
    cues:{do:'軸足は安定。',dont:'お尻が傾かない。'},
    why:'バランス感覚＋臀筋＋ハム強化。'
  },
  {
    id:'yg_triangle', name:'トリコナーサナ(三角)', courses:['yoga'],
    targetProblems:['lateralAsymmetry','thoracicKyphosis'],
    category:'asana', technique:'standing', bodyPart:'fullbody', intensity:2,
    equipment:'マット', position:'standing', duration:'各45秒',
    illustration: SVG2.triangle,
    purpose:'体側を伸ばし胸郭を開く。',
    how:['足を大きく開き前足は90度・後ろ足45度。','骨盤から前足側に倒し下の手を脛に。','上の手は天井へ。45秒。反対も。'],
    cues:{do:'体は一枚の板に。',dont:'前に倒れ込まない。'},
    why:'内臓マッサージ・腰側面ストレッチ。'
  },
  {
    id:'yg_revolved_triangle', name:'リバースド三角', courses:['yoga'],
    targetProblems:['lateralAsymmetry','thoracicKyphosis'],
    category:'asana', technique:'standing', bodyPart:'fullbody', intensity:3,
    equipment:'マット', position:'standing', duration:'各30秒',
    illustration: SVG2.spineTwist,
    purpose:'三角ポーズに回旋を加える。',
    how:['足を開き反対の手を前足の外側へ。','上の手を天井へ伸ばし胸を捻る。','30秒。反対も。'],
    cues:{do:'まず脚を安定。',dont:'背中を丸めない。'},
    why:'胸椎回旋＋ハムストリング。'
  },
  {
    id:'yg_chair', name:'ウトカターサナ(椅子)', courses:['yoga'],
    targetProblems:['posteriorPelvicTilt','roundedShoulders'],
    category:'asana', technique:'standing', bodyPart:'leg', intensity:2,
    equipment:'マット', position:'standing', duration:'45秒',
    illustration: SVG2.squat,
    purpose:'下半身強化＋背中の引き上げ。',
    how:['両足を揃え膝を曲げる(架空の椅子に座る)。','両腕を頭上に伸ばす。','45秒。'],
    cues:{do:'膝はつま先より前に出ない。',dont:'背中を丸めない。'},
    why:'脚と背中の同時強化。'
  },
  {
    id:'yg_tree', name:'ヴルクシャーサナ(木)', courses:['yoga'],
    targetProblems:['lateralAsymmetry','general'],
    category:'asana', technique:'standing', bodyPart:'leg', intensity:2,
    equipment:'マット', position:'standing', duration:'各45秒',
    illustration: SVG2.treePose,
    purpose:'片脚バランス＋集中力。',
    how:['片脚立ちで反対脚の足裏を内ももに。','両手を胸前で合わせる(または頭上)。','45秒。反対も。'],
    cues:{do:'目線は一点。',dont:'膝に足を置かない(内もも or 脛)。'},
    why:'バランス感覚と精神集中。'
  },
  {
    id:'yg_eagle', name:'ガルダーサナ(鷲)', courses:['yoga'],
    targetProblems:['roundedShoulders','lateralAsymmetry'],
    category:'asana', technique:'standing', bodyPart:'fullbody', intensity:3,
    equipment:'マット', position:'standing', duration:'各30秒',
    illustration: SVG2.treePose,
    purpose:'肩甲骨・股関節を同時に絞る。',
    how:['軽く膝を曲げ片脚を反対脚に絡める。','腕も逆の手で絡め胸前で合わせる。','30秒。反対も。'],
    cues:{do:'背筋を伸ばす。',dont:'肩がすくまない。'},
    why:'肩甲骨間の凝りを解放。'
  },
  {
    id:'yg_dancer', name:'ナタラージャ(踊り子)', courses:['yoga'],
    targetProblems:['anteriorPelvicTilt','roundedShoulders'],
    category:'asana', technique:'standing', bodyPart:'fullbody', intensity:3,
    equipment:'マット', position:'standing', duration:'各30秒',
    illustration: SVG2.treePose,
    purpose:'胸を開きながらバランス。',
    how:['片脚立ちから後ろの足首を同側の手で掴む。','反対の手を前へ伸ばし後ろ脚を高く。','30秒。反対も。'],
    cues:{do:'胸を前へ。',dont:'反り腰になりすぎない。'},
    why:'股関節屈筋ストレッチ＋胸オープン。'
  },
  {
    id:'yg_half_moon', name:'アルダチャンドラ(半月)', courses:['yoga'],
    targetProblems:['lateralAsymmetry'],
    category:'asana', technique:'standing', bodyPart:'fullbody', intensity:3,
    equipment:'マット', position:'standing', duration:'各30秒',
    illustration: SVG2.warrior,
    purpose:'体側ストレッチ＋片脚バランス。',
    how:['三角ポーズから前手を床へ。','後ろ脚を床と平行に持ち上げる。','上の手は天井へ。30秒。'],
    cues:{do:'体は1枚の板。',dont:'お尻が下がらない。'},
    why:'バランス・柔軟性・筋力の融合。'
  },
  {
    id:'yg_side_angle', name:'パールシュヴァコナ(横の伸び)', courses:['yoga'],
    targetProblems:['thoracicKyphosis','lateralAsymmetry'],
    category:'asana', technique:'standing', bodyPart:'fullbody', intensity:2,
    equipment:'マット', position:'standing', duration:'各45秒',
    illustration: SVG2.triangle,
    purpose:'体側を伸ばし下半身を強化。',
    how:['足を大きく開き前膝90度。','前肘を前膝に乗せ上の手を耳の横へ。','体側の伸びを感じる。45秒。'],
    cues:{do:'天井から床へ斜め直線。',dont:'前に倒れない。'},
    why:'体側＋脚＋胸郭の総合。'
  },
  {
    id:'yg_wide_squat', name:'マラーサナ(花輪)', courses:['yoga'],
    targetProblems:['kneeValgus','ankleStiffness'],
    category:'asana', technique:'standing', bodyPart:'hip', intensity:2,
    equipment:'マット', position:'squat', duration:'1分',
    illustration: SVG2.squatHold,
    purpose:'深い股関節屈曲。',
    how:['足を肩幅より広く・つま先外。','深くしゃがみ両手を胸前で合わせる。','肘で内ももを押す。1分。'],
    cues:{do:'背筋を伸ばす。',dont:'かかとが浮かないように。'},
    why:'股関節と足首の全モビリティ。'
  },
  {
    id:'yg_forward_fold_std', name:'立位前屈', courses:['yoga'],
    targetProblems:['posteriorPelvicTilt'],
    category:'asana', technique:'standing', bodyPart:'leg', intensity:2,
    equipment:'マット', position:'standing', duration:'1分',
    illustration: SVG2.forwardFold,
    purpose:'背中・ハム全体をリセット。',
    how:['足を揃え骨盤から前傾。','膝は少し緩めてOK。','頭を脱力させ1分。'],
    cues:{do:'息を吐きながら深く。',dont:'反動を使わない。'},
    why:'血流逆転で頭スッキリ。'
  },

  // ============== SEATED ASANAS (12種) ==============
  {
    id:'yg_easy_pose', name:'スカ(あぐら)', courses:['yoga'],
    targetProblems:['general'],
    category:'asana', technique:'seated', bodyPart:'hip', intensity:1,
    equipment:'マット', position:'sitting', duration:'2分',
    illustration: SVG2.meditation,
    purpose:'瞑想・呼吸法の基本姿勢。',
    how:['あぐらをかき背筋を伸ばす。','両手を膝の上に。','2分。'],
    cues:{do:'坐骨で座る。',dont:'背中を丸めない。'},
    why:'すべての座位アサナの土台。'
  },
  {
    id:'yg_butterfly_yoga', name:'バッダコナーサナ(蝶)', courses:['yoga'],
    targetProblems:['kneeValgus','posteriorPelvicTilt'],
    category:'asana', technique:'seated', bodyPart:'hip', intensity:1,
    equipment:'マット', position:'sitting', duration:'2分',
    illustration: SVG2.butterflyHip,
    purpose:'股関節を開く基本ポーズ。',
    how:['足裏を合わせて座る。','膝を床に近づける。','背筋を伸ばし前傾。2分。'],
    cues:{do:'呼吸を深く。',dont:'反動で押さない。'},
    why:'股関節内側の柔軟性。'
  },
  {
    id:'yg_seated_fold_y', name:'パスチモッターナ(前屈)', courses:['yoga'],
    targetProblems:['posteriorPelvicTilt'],
    category:'asana', technique:'seated', bodyPart:'leg', intensity:2,
    equipment:'マット', position:'sitting', duration:'1分',
    illustration: SVG2.forwardFold,
    purpose:'背中とハムを深く伸ばす。',
    how:['長座。背筋を伸ばす。','骨盤から前傾し手を脚の方へ。','1分。'],
    cues:{do:'息を吐きながら。',dont:'膝を曲げて先に倒れない。'},
    why:'柔軟性の代表指標。'
  },
  {
    id:'yg_seated_twist_y', name:'マリーチアーサナ(座位ツイスト)', courses:['yoga'],
    targetProblems:['thoracicKyphosis','lateralAsymmetry'],
    category:'asana', technique:'seated', bodyPart:'back', intensity:2,
    equipment:'マット', position:'sitting', duration:'各45秒',
    illustration: SVG2.seatedTwist,
    purpose:'脊柱の回旋を深める。',
    how:['長座から片膝を立てる。','反対側の肘を立膝の外に。','背筋を伸ばし捻る。45秒。反対も。'],
    cues:{do:'背筋を伸ばしてから捻る。',dont:'肩で捻らない。'},
    why:'内臓マッサージ＋胸椎回旋。'
  },
  {
    id:'yg_cow_face', name:'ゴームカ(牛面)', courses:['yoga'],
    targetProblems:['roundedShoulders','lateralAsymmetry'],
    category:'asana', technique:'seated', bodyPart:'shoulder', intensity:2,
    equipment:'マット', position:'sitting', duration:'各45秒',
    illustration: SVG2.shoulderOpen,
    purpose:'肩関節の左右差を解消。',
    how:['膝を重ねて座る。','右手を上から左手を下から背中で握り合う。','45秒。反対も。'],
    cues:{do:'届かなければタオルで補助。',dont:'前傾しない。'},
    why:'肩関節の柔軟性を片側ずつ。'
  },
  {
    id:'yg_hero', name:'ヴィラ(英雄)', courses:['yoga'],
    targetProblems:['anteriorPelvicTilt'],
    category:'asana', technique:'seated', bodyPart:'leg', intensity:2,
    equipment:'マット', position:'kneeling', duration:'1分',
    illustration: SVG2.meditation,
    purpose:'大腿四頭筋ストレッチ。',
    how:['膝立ちから足を外側に開きお尻を床へ。','背筋を伸ばす。','1分。'],
    cues:{do:'膝に違和感あれば中止。',dont:'お尻が浮かないように。'},
    why:'大腿前面の柔軟性回復。'
  },
  {
    id:'yg_one_leg_fold', name:'片脚前屈', courses:['yoga'],
    targetProblems:['posteriorPelvicTilt','lateralAsymmetry'],
    category:'asana', technique:'seated', bodyPart:'leg', intensity:2,
    equipment:'マット', position:'sitting', duration:'各1分',
    illustration: SVG2.forwardFold,
    purpose:'片脚ずつハムを伸ばす。',
    how:['長座から片膝を曲げ足裏を反対の内ももへ。','背筋を伸ばし前傾。','1分。反対も。'],
    cues:{do:'骨盤から前傾。',dont:'背中を丸めない。'},
    why:'左右差を整える。'
  },
  {
    id:'yg_half_pigeon', name:'ハーフピジョン', courses:['yoga'],
    targetProblems:['lateralAsymmetry','kneeValgus'],
    category:'asana', technique:'seated', bodyPart:'hip', intensity:2,
    equipment:'マット', position:'prone', duration:'各1分',
    illustration: SVG2.pigeonRest,
    purpose:'お尻・外旋筋を伸ばす。',
    how:['四つん這いから片膝を体の前に。','後ろ脚をまっすぐ後ろへ。','前傾して1分。反対も。'],
    cues:{do:'骨盤は正面。',dont:'膝に痛みあれば角度調整。'},
    why:'梨状筋・坐骨神経痛予防。'
  },
  {
    id:'yg_ankle_to_knee', name:'アンクル・トゥ・ニー', courses:['yoga'],
    targetProblems:['lateralAsymmetry','kneeValgus'],
    category:'asana', technique:'seated', bodyPart:'hip', intensity:3,
    equipment:'マット', position:'sitting', duration:'各1分',
    illustration: SVG2.hipOpener,
    purpose:'股関節外側を深く伸ばす。',
    how:['長座から右脛を床に水平に。','左脛をその上に重ねる(両膝が縦に並ぶ)。','前傾して1分。反対も。'],
    cues:{do:'坐骨で座る。',dont:'痛みあれば膝の上に脚を置く。'},
    why:'股関節外側の最終形。'
  },
  {
    id:'yg_seated_side', name:'座位サイドベンド', courses:['yoga'],
    targetProblems:['lateralAsymmetry'],
    category:'asana', technique:'seated', bodyPart:'back', intensity:1,
    equipment:'マット', position:'sitting', duration:'各30秒',
    illustration: SVG2.sideStretch,
    purpose:'体側を座って伸ばす。',
    how:['あぐらで座り片手を頭上に。','反対側に倒す。','30秒。反対も。'],
    cues:{do:'お尻は床。',dont:'前傾しない。'},
    why:'QL・体側のリセット。'
  },
  {
    id:'yg_compass', name:'コンパスポーズ', courses:['yoga'],
    targetProblems:['kneeValgus'],
    category:'asana', technique:'seated', bodyPart:'hip', intensity:3,
    equipment:'マット', position:'sitting', duration:'各45秒',
    illustration: SVG2.hipOpener,
    purpose:'高度な股関節オープナー。',
    how:['長座から片脚を肩の上に。','同側の手でつま先を持つ。','45秒。反対も。'],
    cues:{do:'背筋を伸ばす。',dont:'無理しない。'},
    why:'高度な柔軟性を求める人へ。'
  },
  {
    id:'yg_lotus_prep', name:'蓮ポーズ準備', courses:['yoga'],
    targetProblems:['kneeValgus'],
    category:'asana', technique:'seated', bodyPart:'hip', intensity:2,
    equipment:'マット', position:'sitting', duration:'各1分',
    illustration: SVG2.butterflyHip,
    purpose:'蓮ポーズへの準備。',
    how:['長座から片足を反対の太もも付け根に。','膝はマットに近づける。','1分。反対も。'],
    cues:{do:'股関節を開く。',dont:'膝を捻らない。'},
    why:'瞑想姿勢の準備。'
  },

  // ============== PRONE / BACKBEND (10種) ==============
  {
    id:'yg_cobra', name:'コブラ(ブジャンガーサナ)', courses:['yoga'],
    targetProblems:['thoracicKyphosis','roundedShoulders','swayBack'],
    category:'asana', technique:'backbend', bodyPart:'back', intensity:2,
    equipment:'マット', position:'prone', duration:'30秒 × 2セット',
    illustration: SVG2.cobra,
    purpose:'胸椎を伸展。猫背改善の定番。',
    how:['うつ伏せ。手のひらを胸の横に。','息を吸いながら胸を持ち上げる。','30秒。'],
    cues:{do:'お尻を緩める。',dont:'肘をロックしない。'},
    why:'胸椎伸展の最重要ポーズ。'
  },
  {
    id:'yg_sphinx', name:'スフィンクス', courses:['yoga'],
    targetProblems:['thoracicKyphosis','swayBack'],
    category:'asana', technique:'backbend', bodyPart:'back', intensity:1,
    equipment:'マット', position:'prone', duration:'1分',
    illustration: SVG2.spineExt,
    purpose:'コブラより優しい胸郭オープン。',
    how:['うつ伏せ。前腕を肩の下に。','胸を持ち上げて1分キープ。','深呼吸。'],
    cues:{do:'お尻リラックス。',dont:'首を強く反らない。'},
    why:'胸郭オープンの初心者版。'
  },
  {
    id:'yg_upward_dog', name:'アップワードドッグ', courses:['yoga'],
    targetProblems:['thoracicKyphosis','roundedShoulders'],
    category:'asana', technique:'backbend', bodyPart:'back', intensity:3,
    equipment:'マット', position:'prone', duration:'30秒',
    illustration: SVG2.cobra,
    purpose:'コブラの上位互換。',
    how:['うつ伏せから腕で押し胸を持ち上げる。','膝と腿を浮かす。','30秒。'],
    cues:{do:'肩を下げる。',dont:'肩がすくまない。'},
    why:'力強い胸郭オープン。'
  },
  {
    id:'yg_locust', name:'ローカスト(バッタ)', courses:['yoga'],
    targetProblems:['thoracicKyphosis','swayBack'],
    category:'asana', technique:'backbend', bodyPart:'back', intensity:2,
    equipment:'マット', position:'prone', duration:'30秒 × 2セット',
    illustration: SVG2.spineExt,
    purpose:'背中側の筋を総動員。',
    how:['うつ伏せで両腕両脚を伸ばす。','胸・腕・脚を同時に持ち上げる。','30秒。'],
    cues:{do:'お尻と背中で持ち上げる。',dont:'首を強く反らない。'},
    why:'背中の総合強化。'
  },
  {
    id:'yg_bow', name:'弓のポーズ(ダヌラ)', courses:['yoga'],
    targetProblems:['thoracicKyphosis','anteriorPelvicTilt'],
    category:'asana', technique:'backbend', bodyPart:'fullbody', intensity:3,
    equipment:'マット', position:'prone', duration:'30秒',
    illustration: SVG2.spineExt,
    purpose:'胸・腹・大腿前面を深く伸ばす。',
    how:['うつ伏せで両足首を後ろ手で掴む。','足で手を蹴り上げ胸を持ち上げる。','30秒。'],
    cues:{do:'呼吸を続ける。',dont:'反り腰になりすぎない。'},
    why:'胸郭オープンの最終形。'
  },
  {
    id:'yg_camel', name:'ラクダのポーズ', courses:['yoga'],
    targetProblems:['thoracicKyphosis','anteriorPelvicTilt'],
    category:'asana', technique:'backbend', bodyPart:'fullbody', intensity:3,
    equipment:'マット', position:'kneeling', duration:'30秒',
    illustration: SVG2.spineExt,
    purpose:'前面を全部開く強烈な後屈。',
    how:['膝立ちで両手を腰の後ろに。','胸を上に押し上げかかとを掴む。','30秒。'],
    cues:{do:'胸を天井へ。',dont:'首を強く反らない。'},
    why:'閉じた姿勢を一気に開く。'
  },
  {
    id:'yg_bridge_y', name:'セツバンダ(橋)', courses:['yoga'],
    targetProblems:['anteriorPelvicTilt','thoracicKyphosis'],
    category:'asana', technique:'backbend', bodyPart:'fullbody', intensity:2,
    equipment:'マット', position:'supine', duration:'1分',
    illustration: SVG2.bridgeBase,
    purpose:'仰向けでお尻と胸郭を持ち上げる。',
    how:['仰向けで膝を立てる。','お尻を持ち上げる。両手を背中の下で組む。','1分。'],
    cues:{do:'胸を顎へ。',dont:'頭を動かさない。'},
    why:'前面ストレッチ＋臀筋強化。'
  },
  {
    id:'yg_wheel', name:'ウルドゥヴァ(車輪)', courses:['yoga'],
    targetProblems:['thoracicKyphosis'],
    category:'asana', technique:'backbend', bodyPart:'fullbody', intensity:3,
    equipment:'マット', position:'supine', duration:'30秒',
    illustration: SVG2.spineExt,
    purpose:'全身後屈の最高峰。',
    how:['仰向けから両手を耳の横に。','腕で押し上げ胸を持ち上げる。','30秒。'],
    cues:{do:'腕と脚を均等に。',dont:'肩に違和感あれば中止。'},
    why:'柔軟性と筋力の融合。'
  },
  {
    id:'yg_supported_fish', name:'魚のポーズ(支持あり)', courses:['yoga'],
    targetProblems:['thoracicKyphosis','roundedShoulders'],
    category:'asana', technique:'backbend', bodyPart:'chest', intensity:1,
    equipment:'タオル/ブロック', position:'supine', duration:'3分',
    illustration: SVG2.spineExt,
    purpose:'タオルやブロックで胸を受動的に開く。',
    how:['タオルを縦に巻き胸椎中部の下に。','両腕を頭の上に伸ばす。','3分リラックス。'],
    cues:{do:'目を閉じる。',dont:'痛みあれば中止。'},
    why:'寝ながらできる胸郭オープン。'
  },
  {
    id:'yg_spinal_twist', name:'仰向け脊柱ねじり', courses:['yoga'],
    targetProblems:['lateralAsymmetry','thoracicKyphosis'],
    category:'asana', technique:'twist', bodyPart:'back', intensity:1,
    equipment:'マット', position:'supine', duration:'各1分',
    illustration: SVG2.spineTwist,
    purpose:'寝ながら脊柱を捻ってリラックス。',
    how:['仰向けで右膝を立て左に倒す。','視線は右。','1分。反対も。'],
    cues:{do:'両肩マット。',dont:'勢いつけない。'},
    why:'就寝前の最強ルーティン。'
  },

  // ============== RESTORATIVE & BREATH (14種) ==============
  {
    id:'yg_child_pose', name:'チャイルドポーズ', courses:['yoga'],
    targetProblems:['general','swayBack'],
    category:'asana', technique:'restorative', bodyPart:'back', intensity:1,
    equipment:'マット', position:'prone', duration:'2分',
    illustration: SVG2.childPose,
    purpose:'背中・お尻のリラックス。',
    how:['正座から両手を前に伸ばす。','額をマットに置く。','2分深呼吸。'],
    cues:{do:'呼吸で背中を膨らます。',dont:'力を入れない。'},
    why:'いつでも戻れる安全地帯。'
  },
  {
    id:'yg_downdog_y', name:'ダウンドッグ', courses:['yoga'],
    targetProblems:['posteriorPelvicTilt','roundedShoulders','ankleStiffness'],
    category:'asana', technique:'inversion', bodyPart:'fullbody', intensity:2,
    equipment:'マット', position:'quadruped', duration:'1分',
    illustration: SVG2.downDog,
    purpose:'全身のリセットポーズ。',
    how:['四つん這いからお尻を高く持ち上げ逆V字。','かかとを床へ。','1分。'],
    cues:{do:'背中を長く。',dont:'膝が曲がってもいい。'},
    why:'血流逆転＋全身ストレッチ。'
  },
  {
    id:'yg_legs_wall_y', name:'壁に脚アップ', courses:['yoga'],
    targetProblems:['swelling','general'],
    category:'asana', technique:'restorative', bodyPart:'leg', intensity:1,
    equipment:'壁', position:'supine', duration:'5分',
    illustration: SVG2.spineExt,
    purpose:'リンパ・血流の完全リセット。',
    how:['お尻を壁に近づけ仰向け。','両脚を壁に沿って上げる。','5分。'],
    cues:{do:'目を閉じる。',dont:'腰に違和感あれば中止。'},
    why:'夕方のむくみリセット。'
  },
  {
    id:'yg_corpse', name:'シャバアサナ(屍)', courses:['yoga'],
    targetProblems:['general'],
    category:'asana', technique:'restorative', bodyPart:'fullbody', intensity:1,
    equipment:'マット', position:'supine', duration:'10分',
    illustration: SVG2.meditation,
    purpose:'全身完全脱力のリラックス。',
    how:['仰向けで手のひら上、足は開く。','頭の先から脚先まで脱力。','10分。'],
    cues:{do:'眠ってもOK。',dont:'動かない。'},
    why:'ヨガの最重要ポーズ。'
  },
  {
    id:'yg_ujjayi', name:'ウジャイ呼吸', courses:['yoga'],
    targetProblems:['general'],
    category:'pranayama', technique:'breathing', bodyPart:'core', intensity:1,
    equipment:'なし', position:'sitting', duration:'3分',
    illustration: SVG2.breathing,
    purpose:'喉を絞った勝利の呼吸。',
    how:['あぐらで座り喉を軽く絞る。','「フゥー」と海の音のような呼吸。','3分。'],
    cues:{do:'吸う吐く均等に。',dont:'力を入れすぎない。'},
    why:'集中力と熱の生成。'
  },
  {
    id:'yg_nadi_shodhana', name:'ナディーショーダナ(片鼻呼吸)', courses:['yoga'],
    targetProblems:['general'],
    category:'pranayama', technique:'breathing', bodyPart:'core', intensity:1,
    equipment:'なし', position:'sitting', duration:'3分',
    illustration: SVG2.breathing,
    purpose:'左右の鼻を交互に使う調和呼吸。',
    how:['右手親指で右鼻を閉じ左鼻で吸う。','薬指で左鼻を閉じ右鼻で吐く。','逆も行い1サイクル。3分。'],
    cues:{do:'ゆっくり等しく。',dont:'急がない。'},
    why:'自律神経のバランス調整。'
  },
  {
    id:'yg_kapalbhati', name:'カパラバティ(火の呼吸)', courses:['yoga'],
    targetProblems:['general'],
    category:'pranayama', technique:'breathing', bodyPart:'core', intensity:2,
    equipment:'なし', position:'sitting', duration:'1分',
    illustration: SVG2.breathing,
    purpose:'お腹を凹ませる強い吐き出し。',
    how:['あぐらで座る。','短く強く鼻から吐く(お腹をへこます)。','吸うのは自然に。1分。'],
    cues:{do:'吐くに集中。',dont:'妊娠中・高血圧は避ける。'},
    why:'お腹引き締め＋脳活性化。'
  },
  {
    id:'yg_bhramari', name:'ブラマリ(蜂の呼吸)', courses:['yoga'],
    targetProblems:['general'],
    category:'pranayama', technique:'breathing', bodyPart:'core', intensity:1,
    equipment:'なし', position:'sitting', duration:'3分',
    illustration: SVG2.meditation,
    purpose:'蜂の羽音のような響きで瞑想。',
    how:['あぐらで座り目を閉じる。','鼻から吸い吐く時に「mmm」と低く響かす。','3分。'],
    cues:{do:'振動を頭蓋骨で感じる。',dont:'音を大きくしすぎない。'},
    why:'即効のストレス緩和。'
  },
  {
    id:'yg_lion_breath', name:'シンハ(獅子の呼吸)', courses:['yoga'],
    targetProblems:['general'],
    category:'pranayama', technique:'breathing', bodyPart:'core', intensity:1,
    equipment:'なし', position:'sitting', duration:'1分',
    illustration: SVG2.breathing,
    purpose:'顔の緊張と感情を解放。',
    how:['あぐらで吸い口を大きく開け舌を出す。','「ハー」と大きく吐く。','10回。'],
    cues:{do:'目も大きく開く。',dont:'恥ずかしがらずに。'},
    why:'顔のリラックス＋感情リリース。'
  },
  {
    id:'yg_body_scan', name:'ボディスキャン瞑想', courses:['yoga'],
    targetProblems:['general'],
    category:'meditation', technique:'meditation', bodyPart:'fullbody', intensity:1,
    equipment:'マット', position:'supine', duration:'10分',
    illustration: SVG2.meditation,
    purpose:'体の各部位に意識を向ける瞑想。',
    how:['仰向けで目を閉じる。','頭頂から足先へ順に意識を移す。','各部位で2-3呼吸。10分。'],
    cues:{do:'判断せずに観察。',dont:'眠気と戦わない。'},
    why:'マインドフルネスの王道。'
  },
  {
    id:'yg_breath_count', name:'呼吸カウント瞑想', courses:['yoga'],
    targetProblems:['general'],
    category:'meditation', technique:'meditation', bodyPart:'core', intensity:1,
    equipment:'なし', position:'sitting', duration:'5分',
    illustration: SVG2.meditation,
    purpose:'呼吸を数える基本瞑想。',
    how:['あぐらで座る。','1〜10まで吐く息を数える。','10になったら1に戻る。5分。'],
    cues:{do:'数を忘れたら1から。',dont:'自分を責めない。'},
    why:'瞑想初心者の最初の処方。'
  },
  {
    id:'yg_walking_meditation', name:'歩く瞑想', courses:['yoga'],
    targetProblems:['general'],
    category:'meditation', technique:'meditation', bodyPart:'fullbody', intensity:1,
    equipment:'なし', position:'standing', duration:'5分',
    illustration: SVG2.treePose,
    purpose:'動きの中で意識を保つ。',
    how:['ゆっくり歩く。','足裏の感覚に集中。','5分。'],
    cues:{do:'各歩を丁寧に。',dont:'急がない。'},
    why:'動きながらの瞑想入門。'
  },
  {
    id:'yg_supine_butterfly', name:'仰向けバタフライ', courses:['yoga'],
    targetProblems:['kneeValgus','general'],
    category:'asana', technique:'restorative', bodyPart:'hip', intensity:1,
    equipment:'マット', position:'supine', duration:'3分',
    illustration: SVG2.butterflyHip,
    purpose:'寝ながら股関節を開く。',
    how:['仰向けで両足裏を合わせる。','膝は自然に開く。','3分。'],
    cues:{do:'呼吸を深く。',dont:'力を入れない。'},
    why:'最も楽な股関節ストレッチ。'
  },
  {
    id:'yg_savasana_with_count', name:'カウントシャバアサナ', courses:['yoga'],
    targetProblems:['general'],
    category:'asana', technique:'restorative', bodyPart:'fullbody', intensity:1,
    equipment:'マット', position:'supine', duration:'7分',
    illustration: SVG2.meditation,
    purpose:'入眠スピード化されたシャバアサナ。',
    how:['仰向けで全身脱力。','4-7-8呼吸を組み合わせる。','7分。'],
    cues:{do:'眠ってもOK。',dont:'時計を見ない。'},
    why:'昼寝・夜の入眠に。'
  },
];

export { DB_YOGA };
