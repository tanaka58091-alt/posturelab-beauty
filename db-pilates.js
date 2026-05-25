// ===================================================================
// ピラティス (PILATES) — マットピラティス専用
// 機械(リフォーマー等)は使用しない / 自重 + マットのみ
// クラシカルなJoseph Pilates由来のマットワーク中心
// ===================================================================

import { SVG2 } from './svg-library.js';

const DB_PILATES = [
  // ============== 基本/ウォームアップ (8種) ==============
  {
    id:'pl_hundred', name:'ハンドレッド', courses:['pilates'],
    targetProblems:['anteriorPelvicTilt','swayBack','thoracicKyphosis'],
    category:'core', technique:'pilates', bodyPart:'core', intensity:2,
    equipment:'マット', position:'supine', duration:'100カウント',
    illustration: SVG2.deadBug,
    purpose:'クラシカルピラティスの代表種目。コア・呼吸・循環を起動。',
    how:['仰向けで両膝をテーブルトップ。','頭・肩・腕を持ち上げ、腕を体側で小さく上下に振る。','5回吸って5回吐く×10セット=100。'],
    cues:{do:'腰をマットに押し付ける。',dont:'首に力が入らない。'},
    why:'呼吸を伴うコアアクティベーションで全身が温まる。'
  },
  {
    id:'pl_rollup', name:'ロールアップ', courses:['pilates'],
    targetProblems:['thoracicKyphosis','anteriorPelvicTilt'],
    category:'core', technique:'pilates', bodyPart:'core', intensity:2,
    equipment:'マット', position:'supine', duration:'8回',
    illustration: SVG2.crunch,
    purpose:'背骨を1椎ずつ動かすセグメンタル・コントロール。',
    how:['仰向けで腕を頭上。','息を吐きながら腕→頭→胸→腰の順にゆっくり起き上がる。','つま先タッチ後、逆順に1椎ずつ下ろす。'],
    cues:{do:'1椎ずつマットに着ける意識。',dont:'反動で起きない。'},
    why:'脊柱の分節的可動を取り戻す王道種目。'
  },
  {
    id:'pl_rolldown', name:'ロールダウン', courses:['pilates','yoga'],
    targetProblems:['thoracicKyphosis','swayBack'],
    category:'mobility', technique:'pilates', bodyPart:'spine', intensity:1,
    equipment:'マット', position:'standing', duration:'5回',
    illustration: SVG2.forwardFold,
    purpose:'立位から脊柱を1椎ずつ下ろし、背骨の流動性を養う。',
    how:['立位、足は腰幅。','あご→首→胸→腰の順にゆっくり前へ転がる。','手を床に向けて垂らし、逆順で戻る。'],
    cues:{do:'頭の重みで下ろす。',dont:'膝をロックしない。'},
    why:'起床時のリセット種目としても最適。'
  },
  {
    id:'pl_pelvic_curl', name:'ペルビックカール', courses:['pilates','seitai'],
    targetProblems:['anteriorPelvicTilt','swayBack'],
    category:'core', technique:'pilates', bodyPart:'hip', intensity:1,
    equipment:'マット', position:'supine', duration:'10回',
    illustration: SVG2.bridge,
    purpose:'骨盤後傾→腰椎→胸椎の順に持ち上げ、コアと臀筋を起動。',
    how:['仰向けで膝を立てる。','骨盤を後傾→尾骨から1椎ずつ持ち上げる。','胸椎まで上げて、逆順に下ろす。'],
    cues:{do:'お腹を凹ませながら。',dont:'腰を反り上げない。'},
    why:'ニュートラル骨盤の感覚を養う基礎中の基礎。'
  },
  {
    id:'pl_spine_twist_supine', name:'スパインツイスト(仰向け)', courses:['pilates','seitai'],
    targetProblems:['lateralAsymmetry','thoracicKyphosis'],
    category:'mobility', technique:'pilates', bodyPart:'spine', intensity:1,
    equipment:'マット', position:'supine', duration:'各5回',
    illustration: SVG2.twist,
    purpose:'胸椎の回旋可動域を再構築。',
    how:['仰向けで膝立て、両腕は左右に開く。','膝を揃えて左右に倒す。','肩はマットに着けたまま。'],
    cues:{do:'吐きながら倒す。',dont:'肩が浮かない。'},
    why:'腰痛予防・内臓マッサージ効果。'
  },
  {
    id:'pl_chest_lift', name:'チェストリフト', courses:['pilates','personal'],
    targetProblems:['anteriorPelvicTilt','thoracicKyphosis'],
    category:'core', technique:'pilates', bodyPart:'core', intensity:1,
    equipment:'マット', position:'supine', duration:'10回 × 2セット',
    illustration: SVG2.crunch,
    purpose:'上部腹筋を分離的に使うピラティス版クランチ。',
    how:['仰向けで膝立て、手は頭の後ろ。','息を吐きながら胸郭を持ち上げる。','腰はマットに残したまま。'],
    cues:{do:'胸骨を骨盤に近づける。',dont:'首だけで起き上がらない。'},
    why:'腹直筋上部を効果的に刺激。'
  },
  {
    id:'pl_breathing', name:'ピラティス呼吸', courses:['pilates','yoga','seitai'],
    targetProblems:['general'],
    category:'breath', technique:'pilates', bodyPart:'breath', intensity:1,
    equipment:'なし', position:'supine', duration:'10呼吸',
    illustration: SVG2.breathing,
    purpose:'胸郭側方拡張(ラテラルブリージング)を学ぶ。',
    how:['仰向け、両手を肋骨の側面に。','鼻から吸って肋骨を横へ広げる。','口から「ハー」と長く吐いて肋骨を寄せる。'],
    cues:{do:'肩は上がらない。',dont:'お腹は膨らませない。'},
    why:'ピラティス全種目の土台となる呼吸法。'
  },
  {
    id:'pl_imprint', name:'インプリント&リリース', courses:['pilates'],
    targetProblems:['anteriorPelvicTilt'],
    category:'mobility', technique:'pilates', bodyPart:'core', intensity:1,
    equipment:'マット', position:'supine', duration:'10回',
    illustration: SVG2.deadBug,
    purpose:'骨盤前傾⇔後傾を意識的に切り替える神経再教育。',
    how:['仰向けで膝立て。','骨盤を後傾(腰マットに押し付け)。','ニュートラルに戻す。'],
    cues:{do:'お腹で動かす。',dont:'お尻に力を入れない。'},
    why:'すべてのピラティス種目の前段として重要。'
  },

  // ============== 腹筋シリーズ (10種) ==============
  {
    id:'pl_single_leg_stretch', name:'シングルレッグストレッチ', courses:['pilates'],
    targetProblems:['anteriorPelvicTilt','thoracicKyphosis'],
    category:'core', technique:'pilates', bodyPart:'core', intensity:2,
    equipment:'マット', position:'supine', duration:'各10回',
    illustration: SVG2.deadBug,
    purpose:'四肢を動かしながらコアを安定させる協調性訓練。',
    how:['仰向けで頭・肩を持ち上げ、両膝テーブルトップ。','右膝を胸へ、左脚は45度に伸ばす。','左右交互に。'],
    cues:{do:'腰はマットに固定。',dont:'首に力を入れない。'},
    why:'コア持久力と協調性を同時に鍛える。'
  },
  {
    id:'pl_double_leg_stretch', name:'ダブルレッグストレッチ', courses:['pilates'],
    targetProblems:['anteriorPelvicTilt'],
    category:'core', technique:'pilates', bodyPart:'core', intensity:2,
    equipment:'マット', position:'supine', duration:'10回',
    illustration: SVG2.deadBug,
    purpose:'四肢を同時に伸展させる全身協調エクササイズ。',
    how:['仰向けで頭・肩リフト、膝を胸に。','両腕と両脚を同時に伸ばす。','弧を描いて戻す。'],
    cues:{do:'背中は常にマットに。',dont:'腰が浮かない範囲で。'},
    why:'コアの全方位安定性を養う。'
  },
  {
    id:'pl_scissors', name:'シザーズ', courses:['pilates'],
    targetProblems:['anteriorPelvicTilt','swayBack'],
    category:'core', technique:'pilates', bodyPart:'core', intensity:2,
    equipment:'マット', position:'supine', duration:'各10回',
    illustration: SVG2.legRaise,
    purpose:'コアを保ちつつハムストリングス・大腿四頭筋を伸ばす。',
    how:['仰向けで頭・肩リフト。','右脚を垂直に上げ、両手で軽く支える。','脚を入れ替える。'],
    cues:{do:'パルス2回で軽く引き寄せる。',dont:'腰は反らせない。'},
    why:'コアと柔軟性を同時に養う。'
  },
  {
    id:'pl_lower_lift', name:'ローワーリフト', courses:['pilates'],
    targetProblems:['anteriorPelvicTilt'],
    category:'core', technique:'pilates', bodyPart:'core', intensity:2,
    equipment:'マット', position:'supine', duration:'10回',
    illustration: SVG2.legRaise,
    purpose:'両脚を揃えて上下し、下部腹筋を集中攻略。',
    how:['仰向けで頭・肩リフト、両脚を垂直に。','コントロールしながら下ろす。','腰が浮く手前で戻す。'],
    cues:{do:'お腹を凹ませて。',dont:'反動を使わない。'},
    why:'下部腹筋を効果的に鍛える。'
  },
  {
    id:'pl_criss_cross', name:'クリスクロス', courses:['pilates'],
    targetProblems:['lateralAsymmetry','thoracicKyphosis'],
    category:'core', technique:'pilates', bodyPart:'core', intensity:2,
    equipment:'マット', position:'supine', duration:'各10回',
    illustration: SVG2.bicycle,
    purpose:'回旋系の代表種目。腹斜筋を集中刺激。',
    how:['仰向けで頭・肩リフト、両手は頭の後ろ。','右肘と左膝を近づける。','胸郭から回旋させる。'],
    cues:{do:'肘ではなく胸郭から回す。',dont:'首を引っ張らない。'},
    why:'くびれづくりと胸椎回旋に効く。'
  },
  {
    id:'pl_teaser_prep', name:'ティーザー(準備)', courses:['pilates'],
    targetProblems:['anteriorPelvicTilt'],
    category:'core', technique:'pilates', bodyPart:'core', intensity:2,
    equipment:'マット', position:'supine', duration:'5回',
    illustration: SVG2.vsit,
    purpose:'V字姿勢への準備として腹筋総動員。',
    how:['仰向け、膝立て、腕は前。','息を吐きながら背骨を巻いて起き上がる。','V字で2秒キープしてゆっくり戻る。'],
    cues:{do:'背中を丸めて。',dont:'反らない。'},
    why:'ピラティスの最終目標種目への準備。'
  },
  {
    id:'pl_teaser', name:'ティーザー', courses:['pilates'],
    targetProblems:['anteriorPelvicTilt','swayBack'],
    category:'core', technique:'pilates', bodyPart:'core', intensity:3,
    equipment:'マット', position:'supine', duration:'3回',
    illustration: SVG2.vsit,
    purpose:'ピラティス最難関の一つ。完璧なV字姿勢。',
    how:['仰向けで両脚を斜め上に伸ばす。','息を吐きながら背骨を巻いて起き上がる。','V字で腕と脚が平行に。'],
    cues:{do:'コアで持ち上げる。',dont:'勢いを使わない。'},
    why:'コア・柔軟性・コントロールの集大成。'
  },
  {
    id:'pl_rolling_ball', name:'ローリングライクアボール', courses:['pilates'],
    targetProblems:['thoracicKyphosis'],
    category:'mobility', technique:'pilates', bodyPart:'spine', intensity:2,
    equipment:'マット', position:'sitting', duration:'10回',
    illustration: SVG2.crunch,
    purpose:'背骨を丸めてマッサージしながらコアを使う。',
    how:['座位で膝を抱える。','背中を丸めて後方へ転がり、戻る。','足は床に着けない。'],
    cues:{do:'丸い背中を保つ。',dont:'反動で起きない。'},
    why:'背骨のマッサージとコア再教育を同時に。'
  },
  {
    id:'pl_open_leg_rocker', name:'オープンレッグロッカー', courses:['pilates'],
    targetProblems:['thoracicKyphosis','anteriorPelvicTilt'],
    category:'core', technique:'pilates', bodyPart:'core', intensity:3,
    equipment:'マット', position:'sitting', duration:'8回',
    illustration: SVG2.vsit,
    purpose:'V字バランス&転がりの組み合わせで上級コア。',
    how:['座位で両脚を斜め上に開き、足首を握る。','後方へ転がり、戻ってV字バランス。','繰り返す。'],
    cues:{do:'丸い背中で。',dont:'肩で起きない。'},
    why:'バランスとコアの統合。'
  },
  {
    id:'pl_neck_pull', name:'ネックプル', courses:['pilates'],
    targetProblems:['thoracicKyphosis','anteriorPelvicTilt'],
    category:'core', technique:'pilates', bodyPart:'core', intensity:3,
    equipment:'マット', position:'supine', duration:'5回',
    illustration: SVG2.crunch,
    purpose:'ロールアップの上級版。手は頭の後ろで負荷UP。',
    how:['仰向けで両脚は床にロック、手は頭の後ろ。','背骨を巻いて起き上がる。','つま先タッチ後、逆順に下ろす。'],
    cues:{do:'コアで起きる。',dont:'肘で引っ張らない。'},
    why:'腹筋の集大成種目。'
  },

  // ============== 背面・伸展系 (10種) ==============
  {
    id:'pl_swan', name:'スワン', courses:['pilates','yoga'],
    targetProblems:['thoracicKyphosis','swayBack'],
    category:'mobility', technique:'pilates', bodyPart:'back', intensity:2,
    equipment:'マット', position:'prone', duration:'8回',
    illustration: SVG2.cobra,
    purpose:'胸椎伸展可動域を取り戻し背中を強化。',
    how:['うつ伏せで両手を肩の下に。','胸を持ち上げ、腰は反らない範囲で。','コントロールして戻る。'],
    cues:{do:'胸を前に押し出す。',dont:'肩がすくまない。'},
    why:'デスクワーカーに必須の胸椎伸展。'
  },
  {
    id:'pl_swan_dive', name:'スワンダイブ', courses:['pilates'],
    targetProblems:['thoracicKyphosis'],
    category:'core', technique:'pilates', bodyPart:'back', intensity:3,
    equipment:'マット', position:'prone', duration:'6回',
    illustration: SVG2.cobra,
    purpose:'背面全体を強化する上級スワン。',
    how:['うつ伏せで両手・両脚を伸ばす。','胸と脚を同時に持ち上げ、シーソーのように揺れる。','コントロールして繰り返す。'],
    cues:{do:'背面全体を使う。',dont:'痛みが出たら中止。'},
    why:'背筋・臀筋を統合的に鍛える。'
  },
  {
    id:'pl_single_leg_kick', name:'シングルレッグキック', courses:['pilates'],
    targetProblems:['thoracicKyphosis','anteriorPelvicTilt'],
    category:'core', technique:'pilates', bodyPart:'back', intensity:2,
    equipment:'マット', position:'prone', duration:'各8回',
    illustration: SVG2.superman,
    purpose:'前ももの柔軟性とハムストリングス強化を両立。',
    how:['うつ伏せで前腕で支え、胸を上げる。','右かかとをお尻に向けて2回パルス。','左も同様に。'],
    cues:{do:'お腹を引き上げて。',dont:'腰を反らない。'},
    why:'前もも柔軟性とお腹引き上げを学ぶ。'
  },
  {
    id:'pl_double_leg_kick', name:'ダブルレッグキック', courses:['pilates'],
    targetProblems:['thoracicKyphosis','roundedShoulders'],
    category:'core', technique:'pilates', bodyPart:'back', intensity:2,
    equipment:'マット', position:'prone', duration:'6回',
    illustration: SVG2.cobra,
    purpose:'胸を開きながら背面を統合的に強化。',
    how:['うつ伏せ、両手を背中で組む。','両かかとをお尻に3回パルス。','胸を持ち上げ手を伸ばす。'],
    cues:{do:'リズミカルに。',dont:'首を反らせない。'},
    why:'胸郭を開き、姿勢改善に効く。'
  },
  {
    id:'pl_swimming', name:'スイミング', courses:['pilates','personal'],
    targetProblems:['thoracicKyphosis','swayBack'],
    category:'core', technique:'pilates', bodyPart:'back', intensity:2,
    equipment:'マット', position:'prone', duration:'30秒',
    illustration: SVG2.superman,
    purpose:'背面全体の協調性とコア持久力を養う。',
    how:['うつ伏せで四肢を伸ばす。','右手と左脚、左手と右脚を交互に小さく速く動かす。','呼吸を続ける。'],
    cues:{do:'お腹を引き上げて。',dont:'腰を反らない。'},
    why:'背中の引き締めと姿勢改善に。'
  },
  {
    id:'pl_breaststroke', name:'ブレストストローク', courses:['pilates'],
    targetProblems:['thoracicKyphosis','roundedShoulders'],
    category:'core', technique:'pilates', bodyPart:'back', intensity:2,
    equipment:'マット', position:'prone', duration:'8回',
    illustration: SVG2.YTW,
    purpose:'胸椎伸展と肩甲骨後退を同時に。',
    how:['うつ伏せで両手を額の前に。','腕を前→外→体側へと弧を描きながら胸を持ち上げる。','逆順で戻る。'],
    cues:{do:'肩甲骨を引き寄せる。',dont:'首を反らせない。'},
    why:'肩甲骨周りを丁寧に動かす。'
  },
  {
    id:'pl_leg_pull_front', name:'レッグプルフロント', courses:['pilates','personal'],
    targetProblems:['anteriorPelvicTilt','swayBack'],
    category:'core', technique:'pilates', bodyPart:'core', intensity:3,
    equipment:'マット', position:'plank', duration:'各5回',
    illustration: SVG2.plank,
    purpose:'プランクから片脚リフトでコア統合。',
    how:['プランク姿勢で背中を一直線に。','片脚を上げて3秒キープ。','下ろして反対側も。'],
    cues:{do:'お腹は固める。',dont:'お尻が上がらない。'},
    why:'機能的なコア統合。'
  },
  {
    id:'pl_leg_pull_back', name:'レッグプルバック', courses:['pilates'],
    targetProblems:['thoracicKyphosis','posteriorPelvicTilt'],
    category:'core', technique:'pilates', bodyPart:'core', intensity:3,
    equipment:'マット', position:'reverse_plank', duration:'各5回',
    illustration: SVG2.reversePlank,
    purpose:'背面のリバースプランクから片脚を持ち上げる上級種目。',
    how:['座位から両手・両足で体を持ち上げる(リバースプランク)。','片脚を天井へ。','下ろして反対も。'],
    cues:{do:'お尻を高く保つ。',dont:'首を後ろに落とさない。'},
    why:'背面チェーンを統合強化。'
  },
  {
    id:'pl_rocking', name:'ロッキング', courses:['pilates','yoga'],
    targetProblems:['thoracicKyphosis'],
    category:'mobility', technique:'pilates', bodyPart:'back', intensity:3,
    equipment:'マット', position:'prone', duration:'8回',
    illustration: SVG2.bow,
    purpose:'弓のポーズで前後に揺れて背面を活性化。',
    how:['うつ伏せで足首を後ろから両手で掴む。','胸と脚を持ち上げ前後にロッキング。'],
    cues:{do:'呼吸を続ける。',dont:'腰に痛みが出たら中止。'},
    why:'背面チェーンの統合と胸郭拡張。'
  },
  {
    id:'pl_swan_arms', name:'スワンアーム', courses:['pilates'],
    targetProblems:['roundedShoulders','thoracicKyphosis'],
    category:'mobility', technique:'pilates', bodyPart:'shoulder', intensity:1,
    equipment:'マット', position:'prone', duration:'10回',
    illustration: SVG2.YTW,
    purpose:'腕を空中で動かし肩甲骨を再教育。',
    how:['うつ伏せで両腕を頭上に伸ばす。','胸を少し持ち上げ、両腕を耳横→体側へ。','戻して繰り返す。'],
    cues:{do:'肩甲骨を寄せる。',dont:'首を反らさない。'},
    why:'肩甲骨後退筋の活性化。'
  },

  // ============== 側面/ローテーション (8種) ==============
  {
    id:'pl_side_kick_front_back', name:'サイドキック(前後)', courses:['pilates'],
    targetProblems:['anteriorPelvicTilt','swayBack'],
    category:'core', technique:'pilates', bodyPart:'hip', intensity:2,
    equipment:'マット', position:'sidelying', duration:'各10回',
    illustration: SVG2.sideLeg,
    purpose:'股関節屈伸とコア安定を同時に。',
    how:['横向き、下肘で頭支え。','上の脚を前後に大きく振る。','骨盤は動かさない。'],
    cues:{do:'体幹を固める。',dont:'腰が動かない。'},
    why:'股関節と体幹の分離。'
  },
  {
    id:'pl_side_kick_up_down', name:'サイドキック(上下)', courses:['pilates'],
    targetProblems:['kneeValgus','anteriorPelvicTilt'],
    category:'strength', technique:'pilates', bodyPart:'hip', intensity:2,
    equipment:'マット', position:'sidelying', duration:'各10回',
    illustration: SVG2.sideLeg,
    purpose:'中臀筋を集中刺激。',
    how:['横向きで上の脚を真上に上げる。','コントロールして下ろす。','骨盤は固定。'],
    cues:{do:'ゆっくり下ろす。',dont:'反動を使わない。'},
    why:'お尻のサイド引き締めに有効。'
  },
  {
    id:'pl_side_kick_circle', name:'サイドキックサークル', courses:['pilates'],
    targetProblems:['kneeValgus','anteriorPelvicTilt'],
    category:'core', technique:'pilates', bodyPart:'hip', intensity:2,
    equipment:'マット', position:'sidelying', duration:'各方向5回',
    illustration: SVG2.sideLeg,
    purpose:'股関節を全方向に動かす。',
    how:['横向きで上の脚を持ち上げ、小さく円を描く。','逆回転も。'],
    cues:{do:'円は小さく丁寧に。',dont:'骨盤を動かさない。'},
    why:'股関節モビリティとコア安定を同時に。'
  },
  {
    id:'pl_side_bend', name:'サイドベンド', courses:['pilates','yoga'],
    targetProblems:['lateralAsymmetry','thoracicKyphosis'],
    category:'core', technique:'pilates', bodyPart:'core', intensity:2,
    equipment:'マット', position:'sidelying', duration:'各5回',
    illustration: SVG2.sidePlank,
    purpose:'体側を集中強化。',
    how:['横向きで片手と外側の足で体を支える(サイドプランク)。','腰を下ろしてまた持ち上げる。'],
    cues:{do:'肩から足まで一直線。',dont:'腰が落ちない。'},
    why:'体幹側面の強化。'
  },
  {
    id:'pl_mermaid', name:'マーメイド', courses:['pilates','yoga'],
    targetProblems:['lateralAsymmetry','thoracicKyphosis'],
    category:'mobility', technique:'pilates', bodyPart:'spine', intensity:1,
    equipment:'マット', position:'sitting', duration:'各5回',
    illustration: SVG2.sideStretch,
    purpose:'体側のストレッチ。',
    how:['座位で片膝を曲げる。','反対側の手を頭上に伸ばし、体を倒す。','息を吐きながら深める。'],
    cues:{do:'坐骨は浮かない。',dont:'前に倒れない。'},
    why:'肋間筋・広背筋・腰方形筋の伸長。'
  },
  {
    id:'pl_saw', name:'ソー', courses:['pilates','yoga'],
    targetProblems:['lateralAsymmetry','thoracicKyphosis'],
    category:'mobility', technique:'pilates', bodyPart:'spine', intensity:2,
    equipment:'マット', position:'sitting', duration:'各5回',
    illustration: SVG2.twist,
    purpose:'胸椎回旋+前屈の複合動作。',
    how:['座位で両脚を腰幅以上に開き、両腕を横に。','胸郭から右に回旋。','左手で右足小指へ、ノコギリのように3回。'],
    cues:{do:'回旋を維持して前屈。',dont:'お尻が浮かない。'},
    why:'胸椎モビリティとハム柔軟性。'
  },
  {
    id:'pl_spine_twist', name:'スパインツイスト', courses:['pilates','yoga'],
    targetProblems:['thoracicKyphosis','lateralAsymmetry'],
    category:'mobility', technique:'pilates', bodyPart:'spine', intensity:2,
    equipment:'マット', position:'sitting', duration:'各5回',
    illustration: SVG2.twist,
    purpose:'純粋な胸椎回旋エクササイズ。',
    how:['座位で両脚前に伸ばし、両腕を横に開く。','上半身を回旋させる(3回パルス)。'],
    cues:{do:'背骨を上に伸ばす。',dont:'骨盤は前向きキープ。'},
    why:'胸椎回旋の純粋な訓練。'
  },
  {
    id:'pl_corkscrew', name:'コークスクリュー', courses:['pilates'],
    targetProblems:['anteriorPelvicTilt','lateralAsymmetry'],
    category:'core', technique:'pilates', bodyPart:'core', intensity:3,
    equipment:'マット', position:'supine', duration:'各方向5回',
    illustration: SVG2.legRaise,
    purpose:'両脚で円を描き、コアを全方位刺激。',
    how:['仰向けで両脚を垂直に。','両脚で円を描く(右→下→左→上)。','骨盤は安定。'],
    cues:{do:'円は小さく。',dont:'腰が浮かない。'},
    why:'下部腹筋と腹斜筋の統合。'
  },

  // ============== 柔軟性・モビリティ (8種) ==============
  {
    id:'pl_spine_stretch', name:'スパインストレッチ', courses:['pilates','yoga'],
    targetProblems:['thoracicKyphosis'],
    category:'mobility', technique:'pilates', bodyPart:'spine', intensity:1,
    equipment:'マット', position:'sitting', duration:'8回',
    illustration: SVG2.forwardFold,
    purpose:'座位での背骨分節屈曲。',
    how:['長座、両腕前。','背骨を1椎ずつ前に丸める。','逆順で戻る。'],
    cues:{do:'お腹を凹ませて。',dont:'股関節から倒れない。'},
    why:'脊柱の分節制御。'
  },
  {
    id:'pl_seated_forward', name:'シーテッドフォワード', courses:['pilates','yoga'],
    targetProblems:['anteriorPelvicTilt'],
    category:'mobility', technique:'pilates', bodyPart:'hamstring', intensity:1,
    equipment:'マット', position:'sitting', duration:'30秒',
    illustration: SVG2.forwardFold,
    purpose:'ハム&背中のストレッチ。',
    how:['長座、両手を前方へ。','息を吐きながら倒れる。','30秒キープ。'],
    cues:{do:'背中は伸ばす。',dont:'膝を曲げない。'},
    why:'ハム短縮を改善。'
  },
  {
    id:'pl_jackknife', name:'ジャックナイフ', courses:['pilates'],
    targetProblems:['thoracicKyphosis'],
    category:'core', technique:'pilates', bodyPart:'core', intensity:3,
    equipment:'マット', position:'supine', duration:'5回',
    illustration: SVG2.legRaise,
    purpose:'肩立ち+脚伸展の上級コア種目。',
    how:['仰向けで両脚を頭上へ。','背中を持ち上げ天井へ脚を伸ばす。','コントロールして下ろす。'],
    cues:{do:'コアで持ち上げる。',dont:'首に負荷をかけない。'},
    why:'コアの最高峰種目の一つ。'
  },
  {
    id:'pl_shoulder_bridge', name:'ショルダーブリッジ', courses:['pilates','personal'],
    targetProblems:['anteriorPelvicTilt','posteriorPelvicTilt'],
    category:'strength', technique:'pilates', bodyPart:'hip', intensity:2,
    equipment:'マット', position:'supine', duration:'5回',
    illustration: SVG2.bridge,
    purpose:'ブリッジから片脚を上下する複合種目。',
    how:['ブリッジ姿勢で片脚を真上に。','下ろして上げるを5回。','反対も。'],
    cues:{do:'骨盤は水平。',dont:'片側に傾かない。'},
    why:'臀筋とコアの統合。'
  },
  {
    id:'pl_seal', name:'シール', courses:['pilates'],
    targetProblems:['thoracicKyphosis'],
    category:'mobility', technique:'pilates', bodyPart:'spine', intensity:1,
    equipment:'マット', position:'sitting', duration:'10回',
    illustration: SVG2.crunch,
    purpose:'楽しく背骨をマッサージするローリング。',
    how:['座位で両手を内側から足首を握る。','足を3回叩く。','後ろに転がり、戻ってまた3回叩く。'],
    cues:{do:'丸い背中で。',dont:'首で起きない。'},
    why:'クールダウンの楽しい種目。'
  },
  {
    id:'pl_boomerang', name:'ブーメラン', courses:['pilates'],
    targetProblems:['thoracicKyphosis','anteriorPelvicTilt'],
    category:'core', technique:'pilates', bodyPart:'core', intensity:3,
    equipment:'マット', position:'sitting', duration:'5回',
    illustration: SVG2.vsit,
    purpose:'ロールオーバー+ティーザー+前屈の複合種目。',
    how:['長座で脚を組む。','後方へ転がりロールオーバー。','戻ってV字、前屈。'],
    cues:{do:'流れるように。',dont:'各動作を分けすぎない。'},
    why:'統合的なフロー種目。'
  },
  {
    id:'pl_control_balance', name:'コントロールバランス', courses:['pilates'],
    targetProblems:['anteriorPelvicTilt'],
    category:'core', technique:'pilates', bodyPart:'core', intensity:3,
    equipment:'マット', position:'supine', duration:'各3回',
    illustration: SVG2.legRaise,
    purpose:'肩立ちから片脚を交互に。',
    how:['ジャックナイフから両手で足を支える。','片脚を頭側へ、もう片方を天井へ。','入れ替える。'],
    cues:{do:'首は床に。',dont:'首で支えない。'},
    why:'最上級バランス種目。'
  },
  {
    id:'pl_pushup_plank', name:'ピラティスプッシュアップ', courses:['pilates','personal'],
    targetProblems:['roundedShoulders','thoracicKyphosis'],
    category:'strength', technique:'pilates', bodyPart:'chest', intensity:3,
    equipment:'マット', position:'standing', duration:'5回',
    illustration: SVG2.pushup,
    purpose:'ロールダウン→プランク→プッシュアップ→戻すフロー。',
    how:['立位ロールダウン。','歩いてプランク。','プッシュアップ3回。','歩いて戻り、ロールアップ。'],
    cues:{do:'流れるように。',dont:'腰を反らせない。'},
    why:'全身統合フロー。'
  },

  // ============== 立位/フィニッシュ (6種) ==============
  {
    id:'pl_standing_balance', name:'スタンディングバランス', courses:['pilates'],
    targetProblems:['kneeValgus','anteriorPelvicTilt'],
    category:'balance', technique:'pilates', bodyPart:'leg', intensity:2,
    equipment:'マット', position:'standing', duration:'各20秒',
    illustration: SVG2.stand,
    purpose:'片脚立ちでコアと足部の統合。',
    how:['片脚立ち、反対脚は前に上げる。','両腕を頭上に。','20秒キープ。'],
    cues:{do:'軸足の母指球を踏む。',dont:'外側に逃げない。'},
    why:'実生活での姿勢制御。'
  },
  {
    id:'pl_standing_rollup', name:'スタンディングロールアップ', courses:['pilates','seitai'],
    targetProblems:['thoracicKyphosis'],
    category:'mobility', technique:'pilates', bodyPart:'spine', intensity:1,
    equipment:'なし', position:'standing', duration:'5回',
    illustration: SVG2.forwardFold,
    purpose:'立位での背骨分節屈曲。',
    how:['立位、両腕は脱力。','あごから順に転がるように下へ。','逆順で起き上がる。'],
    cues:{do:'1椎ずつ意識。',dont:'急がない。'},
    why:'デスクワーク後のリセット。'
  },
  {
    id:'pl_squat_pilates', name:'ピラティススクワット', courses:['pilates','personal'],
    targetProblems:['anteriorPelvicTilt','kneeValgus'],
    category:'strength', technique:'pilates', bodyPart:'leg', intensity:2,
    equipment:'マット', position:'standing', duration:'12回',
    illustration: SVG2.squat,
    purpose:'コアを意識したスクワット。',
    how:['足は腰幅、両腕前。','背中を伸ばしたまま膝を曲げる。','坐骨を後ろに引く。'],
    cues:{do:'お腹を引き上げる。',dont:'腰を反らせない。'},
    why:'機能的下半身強化。'
  },
  {
    id:'pl_lunge_pilates', name:'ピラティスランジ', courses:['pilates','personal'],
    targetProblems:['anteriorPelvicTilt','kneeValgus'],
    category:'strength', technique:'pilates', bodyPart:'leg', intensity:2,
    equipment:'マット', position:'standing', duration:'各8回',
    illustration: SVG2.lunge,
    purpose:'前後開脚での体幹安定。',
    how:['片脚を前に出し、両膝を90度に。','コアで支える。','戻して反対も。'],
    cues:{do:'胴体は垂直。',dont:'前膝が内に入らない。'},
    why:'コアと脚の協調。'
  },
  {
    id:'pl_calf_raise', name:'ピラティスカーフレイズ', courses:['pilates','seitai'],
    targetProblems:['ankleStiffness'],
    category:'strength', technique:'pilates', bodyPart:'leg', intensity:1,
    equipment:'マット', position:'standing', duration:'15回',
    illustration: SVG2.calfRaise,
    purpose:'足首と足底アーチを再教育。',
    how:['立位、両脚揃える。','かかとを上げ、つま先立ち。','コントロールして下ろす。'],
    cues:{do:'母指球で押す。',dont:'外側に重心が逃げない。'},
    why:'下肢アライメント改善。'
  },
  {
    id:'pl_pilates_walk', name:'ピラティスウォーク', courses:['pilates','seitai'],
    targetProblems:['general','swayBack'],
    category:'integration', technique:'pilates', bodyPart:'whole', intensity:1,
    equipment:'なし', position:'standing', duration:'1分',
    illustration: SVG2.stand,
    purpose:'学んだ姿勢を歩行に統合。',
    how:['頭頂を引き上げ、お腹を引き入れる。','肩はリラックス。','母指球で蹴り出して歩く。'],
    cues:{do:'呼吸を続ける。',dont:'肩に力が入らない。'},
    why:'日常動作への落とし込み。'
  },
];

export { DB_PILATES };
