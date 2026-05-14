// ===================================================================
// EXERCISES DATABASE
// 各エクササイズ: id, name, category (selfcare/training), targets[],
// equipment, sets, duration, illustration (SVG), how[], cues{do, dont}, why
// ===================================================================

// SVG ILLUSTRATIONS - 全てインラインSVGで描画
const SVG = {
  // 1. チンタック（深部頸屈筋活性化）
  chinTuck: `<svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg">
    <defs><style>.s{stroke:#0b1530;stroke-width:1.8;fill:none;stroke-linecap:round;stroke-linejoin:round}.a{stroke:#1f4ed8;stroke-width:1.5;fill:none;stroke-dasharray:3 3}.h{fill:#fde68a}.b{fill:#dbeafe}</style></defs>
    <circle class="s h" cx="60" cy="30" r="18"/>
    <path class="s" d="M52 32 Q56 38 60 35 Q64 38 68 32"/>
    <circle cx="55" cy="28" r="1.2" fill="#0b1530"/><circle cx="65" cy="28" r="1.2" fill="#0b1530"/>
    <path class="s b" d="M40 60 Q60 56 80 60 L82 110 L38 110 Z" fill="#dbeafe"/>
    <path class="s" d="M60 48 V58"/>
    <path class="a" d="M60 16 V52"/>
    <path d="M88 26 Q98 30 96 38" class="s" stroke="#ef4444"/>
    <text x="92" y="22" font-size="9" fill="#ef4444" font-weight="bold">→</text>
    <text x="48" y="128" font-size="8" fill="#6b7794">あごを引く</text>
  </svg>`,

  // 2. ドアフレームストレッチ（大胸筋・小胸筋）
  doorChest: `<svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg">
    <defs><style>.s{stroke:#0b1530;stroke-width:1.8;fill:none;stroke-linecap:round;stroke-linejoin:round}.f{fill:#fde68a}.b{fill:#dbeafe}</style></defs>
    <rect x="10" y="10" width="6" height="120" fill="#94a3b8"/>
    <rect x="104" y="10" width="6" height="120" fill="#94a3b8"/>
    <circle class="s f" cx="60" cy="36" r="12"/>
    <path class="s b" d="M48 50 Q60 46 72 50 L74 90 L46 90 Z"/>
    <path class="s" d="M48 52 L20 38 M72 52 L100 38"/>
    <path class="s" d="M20 38 L18 16 M100 38 L102 16"/>
    <path class="s" d="M48 90 L44 130 M72 90 L76 130"/>
    <text x="34" y="130" font-size="7" fill="#1f4ed8">胸を開く</text>
  </svg>`,

  // 3. 胸椎エクステンション（フォームローラー）
  thoracicExt: `<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">
    <defs><style>.s{stroke:#0b1530;stroke-width:1.8;fill:none;stroke-linecap:round;stroke-linejoin:round}.f{fill:#fde68a}.b{fill:#dbeafe}.r{fill:#06b6d4;opacity:.7}</style></defs>
    <rect x="20" y="105" width="120" height="6" fill="#cbd5e1"/>
    <circle class="r" cx="70" cy="80" r="14"/>
    <circle class="s f" cx="30" cy="55" r="11"/>
    <path class="s b" d="M40 58 Q60 50 90 70 Q105 85 120 90 L130 100 L40 100 Z"/>
    <path class="s" d="M40 58 L26 78 M40 60 L20 80"/>
    <path class="s" d="M120 92 L140 100 L150 110"/>
    <text x="20" y="22" font-size="8" fill="#1f4ed8">胸椎を反らす</text>
  </svg>`,

  // 4. 顎引き＋頸長後屈
  capitalNeckRetract: `<svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg">
    <defs><style>.s{stroke:#0b1530;stroke-width:1.8;fill:none;stroke-linecap:round;stroke-linejoin:round}.a{stroke:#06b6d4;stroke-width:1.4;fill:none}.h{fill:#fde68a}</style></defs>
    <line x1="60" y1="10" x2="60" y2="130" stroke="#94a3b8" stroke-dasharray="2 3"/>
    <circle class="s h" cx="60" cy="36" r="14"/>
    <path class="s" d="M54 38 Q60 44 66 38"/>
    <path class="s" d="M60 50 Q56 80 60 110"/>
    <path class="a" d="M50 30 Q70 30 75 36" stroke="#1f4ed8"/>
    <text x="78" y="32" font-size="8" fill="#1f4ed8">後ろへ</text>
  </svg>`,

  // 5. キャットカウ
  catCow: `<svg viewBox="0 0 160 110" xmlns="http://www.w3.org/2000/svg">
    <defs><style>.s{stroke:#0b1530;stroke-width:1.8;fill:none;stroke-linecap:round;stroke-linejoin:round}.b{fill:#dbeafe}.h{fill:#fde68a}</style></defs>
    <path class="s b" d="M30 80 Q50 50 90 50 Q120 50 130 70 L130 90 L20 90 Z"/>
    <circle class="s h" cx="30" cy="78" r="9"/>
    <line class="s" x1="50" y1="90" x2="48" y2="105"/>
    <line class="s" x1="70" y1="90" x2="70" y2="105"/>
    <line class="s" x1="100" y1="90" x2="102" y2="105"/>
    <line class="s" x1="120" y1="90" x2="122" y2="105"/>
    <path d="M70 38 Q80 36 90 40" stroke="#06b6d4" stroke-width="1.4" fill="none" stroke-dasharray="2 2"/>
    <text x="70" y="30" font-size="8" fill="#06b6d4">背骨を波打たせる</text>
  </svg>`,

  // 6. ヒップフレクサーストレッチ
  hipFlexorStretch: `<svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
    <defs><style>.s{stroke:#0b1530;stroke-width:1.8;fill:none;stroke-linecap:round;stroke-linejoin:round}.h{fill:#fde68a}.b{fill:#dbeafe}</style></defs>
    <circle class="s h" cx="60" cy="20" r="9"/>
    <path class="s b" d="M52 28 Q60 26 68 28 L70 56 L50 56 Z"/>
    <path class="s" d="M70 56 Q90 60 105 50"/>
    <path class="s" d="M50 56 Q40 80 25 100 L18 110"/>
    <path class="s" d="M25 100 Q35 105 50 100"/>
    <line x1="105" y1="50" x2="120" y2="40" class="s"/>
    <rect x="8" y="115" width="124" height="4" fill="#cbd5e1"/>
    <text x="58" y="135" font-size="8" fill="#1f4ed8">前足を曲げ、後脚を伸ばす</text>
  </svg>`,

  // 7. グルートブリッジ
  gluteBridge: `<svg viewBox="0 0 160 110" xmlns="http://www.w3.org/2000/svg">
    <defs><style>.s{stroke:#0b1530;stroke-width:1.8;fill:none;stroke-linecap:round;stroke-linejoin:round}.h{fill:#fde68a}.b{fill:#dbeafe}</style></defs>
    <rect x="10" y="92" width="140" height="6" fill="#cbd5e1"/>
    <circle class="s h" cx="20" cy="80" r="9"/>
    <path class="s b" d="M28 80 Q60 50 90 60 L92 70 L26 90 Z"/>
    <path class="s" d="M90 60 Q110 70 110 90"/>
    <path class="s" d="M110 90 L130 90"/>
    <path d="M75 58 L82 50 L78 56" stroke="#ef4444" stroke-width="1.4" fill="none"/>
    <text x="68" y="42" font-size="8" fill="#ef4444">お尻を持ち上げる</text>
  </svg>`,

  // 8. デッドバグ
  deadBug: `<svg viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
    <defs><style>.s{stroke:#0b1530;stroke-width:1.8;fill:none;stroke-linecap:round;stroke-linejoin:round}.h{fill:#fde68a}.b{fill:#dbeafe}</style></defs>
    <rect x="10" y="80" width="140" height="6" fill="#cbd5e1"/>
    <circle class="s h" cx="30" cy="70" r="9"/>
    <path class="s b" d="M40 72 Q70 70 100 72 L100 80 L40 80 Z"/>
    <path class="s" d="M55 72 Q50 50 60 35"/>
    <path class="s" d="M85 72 Q80 50 90 35"/>
    <path class="s" d="M100 76 Q120 70 130 55"/>
    <path class="s" d="M100 80 Q120 78 140 75"/>
    <text x="40" y="22" font-size="8" fill="#1f4ed8">対角の手脚を伸ばす</text>
  </svg>`,

  // 9. ウォールエンジェル
  wallAngel: `<svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg">
    <defs><style>.s{stroke:#0b1530;stroke-width:1.8;fill:none;stroke-linecap:round;stroke-linejoin:round}.h{fill:#fde68a}.b{fill:#dbeafe}.w{fill:#e2e8f0}</style></defs>
    <rect class="w" x="20" y="10" width="6" height="125"/>
    <circle class="s h" cx="58" cy="30" r="11"/>
    <path class="s b" d="M48 42 Q58 38 68 42 L70 100 L46 100 Z"/>
    <path class="s" d="M48 50 Q35 40 30 22"/>
    <path class="s" d="M68 50 Q80 40 88 22"/>
    <path class="s" d="M30 22 Q26 18 26 12"/>
    <path class="s" d="M88 22 Q92 18 92 12"/>
    <path class="s" d="M46 100 L42 130 M70 100 L74 130"/>
    <text x="58" y="135" font-size="7" fill="#1f4ed8">壁に背中をつける</text>
  </svg>`,

  // 10. 90/90ヒップストレッチ
  hip9090: `<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">
    <defs><style>.s{stroke:#0b1530;stroke-width:1.8;fill:none;stroke-linecap:round;stroke-linejoin:round}.h{fill:#fde68a}.b{fill:#dbeafe}</style></defs>
    <rect x="10" y="100" width="140" height="6" fill="#cbd5e1"/>
    <circle class="s h" cx="80" cy="35" r="10"/>
    <path class="s b" d="M70 45 Q80 42 90 45 L92 70 L68 70 Z"/>
    <path class="s" d="M68 70 Q40 70 30 90 L25 100"/>
    <path class="s" d="M30 90 Q55 100 70 95"/>
    <path class="s" d="M92 70 Q120 70 125 90 L130 100"/>
    <path class="s" d="M125 90 Q105 100 95 95"/>
    <text x="42" y="116" font-size="8" fill="#1f4ed8">前後の脚を90度に</text>
  </svg>`,

  // 11. プランク
  plank: `<svg viewBox="0 0 180 90" xmlns="http://www.w3.org/2000/svg">
    <defs><style>.s{stroke:#0b1530;stroke-width:1.8;fill:none;stroke-linecap:round;stroke-linejoin:round}.h{fill:#fde68a}.b{fill:#dbeafe}</style></defs>
    <rect x="10" y="75" width="160" height="6" fill="#cbd5e1"/>
    <circle class="s h" cx="22" cy="42" r="9"/>
    <path class="s b" d="M30 44 Q90 38 150 50 L155 60 L34 60 Z"/>
    <path class="s" d="M30 50 L25 75"/>
    <path class="s" d="M150 50 L165 75"/>
    <line class="s" x1="155" y1="60" x2="170" y2="75"/>
    <line x1="20" y1="55" x2="160" y2="55" stroke="#1f4ed8" stroke-width="1" stroke-dasharray="3 3"/>
    <text x="50" y="22" font-size="8" fill="#1f4ed8">体を一直線に</text>
  </svg>`,

  // 12. クラムシェル
  clamshell: `<svg viewBox="0 0 160 110" xmlns="http://www.w3.org/2000/svg">
    <defs><style>.s{stroke:#0b1530;stroke-width:1.8;fill:none;stroke-linecap:round;stroke-linejoin:round}.h{fill:#fde68a}.b{fill:#dbeafe}</style></defs>
    <rect x="10" y="90" width="140" height="6" fill="#cbd5e1"/>
    <circle class="s h" cx="30" cy="60" r="9"/>
    <path class="s b" d="M40 62 Q70 58 100 65 L105 80 L42 85 Z"/>
    <path class="s" d="M100 75 Q115 75 120 85"/>
    <path class="s" d="M100 70 Q120 60 115 45"/>
    <path d="M105 50 L115 35 L112 42" stroke="#ef4444" stroke-width="1.4" fill="none"/>
    <text x="78" y="22" font-size="8" fill="#ef4444">膝を開く</text>
  </svg>`,

  // 13. バードドッグ
  birdDog: `<svg viewBox="0 0 180 110" xmlns="http://www.w3.org/2000/svg">
    <defs><style>.s{stroke:#0b1530;stroke-width:1.8;fill:none;stroke-linecap:round;stroke-linejoin:round}.h{fill:#fde68a}.b{fill:#dbeafe}</style></defs>
    <rect x="10" y="95" width="160" height="6" fill="#cbd5e1"/>
    <circle class="s h" cx="40" cy="50" r="9"/>
    <path class="s b" d="M48 52 Q90 46 130 56 L130 70 L48 70 Z"/>
    <path class="s" d="M55 70 L52 95 M70 70 L73 95"/>
    <path class="s" d="M125 70 L150 95"/>
    <path class="s" d="M48 50 L18 28"/>
    <text x="20" y="22" font-size="8" fill="#1f4ed8">右手 + 左脚</text>
  </svg>`,

  // 14. フォームローラー胸郭
  foamRollerTSpine: `<svg viewBox="0 0 160 110" xmlns="http://www.w3.org/2000/svg">
    <defs><style>.s{stroke:#0b1530;stroke-width:1.8;fill:none;stroke-linecap:round;stroke-linejoin:round}.h{fill:#fde68a}.b{fill:#dbeafe}.r{fill:#06b6d4;opacity:.7}</style></defs>
    <rect x="10" y="98" width="140" height="6" fill="#cbd5e1"/>
    <circle class="r" cx="75" cy="80" r="14"/>
    <circle class="s h" cx="35" cy="55" r="10"/>
    <path class="s b" d="M45 60 Q75 52 105 65 L130 80 L42 90 Z"/>
    <path class="s" d="M105 75 Q120 75 130 85"/>
    <path class="s" d="M105 80 L130 95"/>
    <path class="s" d="M30 50 Q15 35 5 25 M40 48 Q25 30 18 18"/>
    <text x="50" y="22" font-size="8" fill="#1f4ed8">胸の真下にローラー</text>
  </svg>`,

  // 15. ピジョンポーズ
  pigeon: `<svg viewBox="0 0 180 110" xmlns="http://www.w3.org/2000/svg">
    <defs><style>.s{stroke:#0b1530;stroke-width:1.8;fill:none;stroke-linecap:round;stroke-linejoin:round}.h{fill:#fde68a}.b{fill:#dbeafe}</style></defs>
    <rect x="10" y="92" width="160" height="6" fill="#cbd5e1"/>
    <circle class="s h" cx="40" cy="40" r="9"/>
    <path class="s b" d="M48 44 Q70 42 90 50 L92 70 L48 70 Z"/>
    <path class="s" d="M50 70 Q35 78 30 90"/>
    <path class="s" d="M92 70 Q130 75 160 90"/>
    <path class="s" d="M48 50 L25 60 M58 50 L35 65"/>
    <text x="20" y="22" font-size="8" fill="#1f4ed8">前脚は外旋、後脚は伸展</text>
  </svg>`,

  // 16. ハムストリングストレッチ
  hamstringStretch: `<svg viewBox="0 0 160 110" xmlns="http://www.w3.org/2000/svg">
    <defs><style>.s{stroke:#0b1530;stroke-width:1.8;fill:none;stroke-linecap:round;stroke-linejoin:round}.h{fill:#fde68a}.b{fill:#dbeafe}</style></defs>
    <rect x="10" y="95" width="140" height="6" fill="#cbd5e1"/>
    <circle class="s h" cx="20" cy="80" r="9"/>
    <path class="s b" d="M28 80 Q60 78 90 80 L94 92 L26 92 Z"/>
    <path class="s" d="M90 80 Q120 60 140 30"/>
    <path class="s" d="M90 90 Q110 90 130 88"/>
    <path class="s" d="M28 76 Q40 60 50 40"/>
    <text x="80" y="22" font-size="8" fill="#1f4ed8">伸ばす脚は天井へ</text>
  </svg>`,

  // 17. テニスボール足底
  ballPlantar: `<svg viewBox="0 0 140 100" xmlns="http://www.w3.org/2000/svg">
    <defs><style>.s{stroke:#0b1530;stroke-width:1.8;fill:none;stroke-linecap:round;stroke-linejoin:round}</style></defs>
    <rect x="10" y="80" width="120" height="6" fill="#cbd5e1"/>
    <path class="s" d="M30 80 Q40 60 55 60 L70 60 Q80 60 80 75 L80 80" fill="#fde68a"/>
    <circle cx="65" cy="80" r="9" fill="#10b981"/>
    <line x1="40" y1="60" x2="40" y2="35" class="s"/>
    <text x="32" y="28" font-size="8" fill="#1f4ed8">足底筋膜をリリース</text>
  </svg>`,

  // 18. アゴ回し（後頭下筋）
  subOccipital: `<svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg">
    <defs><style>.s{stroke:#0b1530;stroke-width:1.8;fill:none;stroke-linecap:round;stroke-linejoin:round}.h{fill:#fde68a}</style></defs>
    <circle class="s h" cx="60" cy="50" r="22"/>
    <path class="s" d="M50 48 Q60 56 70 48"/>
    <circle cx="54" cy="44" r="1.5" fill="#0b1530"/>
    <circle cx="66" cy="44" r="1.5" fill="#0b1530"/>
    <path class="s" d="M60 72 L60 110"/>
    <path d="M40 25 Q60 18 80 25" stroke="#06b6d4" stroke-width="1.5" fill="none" stroke-dasharray="3 3"/>
    <text x="44" y="14" font-size="8" fill="#06b6d4">小さくうなずく</text>
  </svg>`,

  // 19. ローテーターカフ（チューブ外旋）
  rotatorCuff: `<svg viewBox="0 0 140 130" xmlns="http://www.w3.org/2000/svg">
    <defs><style>.s{stroke:#0b1530;stroke-width:1.8;fill:none;stroke-linecap:round;stroke-linejoin:round}.h{fill:#fde68a}.b{fill:#dbeafe}</style></defs>
    <circle class="s h" cx="50" cy="30" r="10"/>
    <path class="s b" d="M40 42 Q50 38 60 42 L62 80 L38 80 Z"/>
    <path class="s" d="M60 50 L80 50"/>
    <path class="s" d="M80 50 L100 38"/>
    <path d="M85 30 L105 25 Q120 28 115 45" stroke="#ef4444" stroke-width="1.5" fill="none"/>
    <text x="90" y="20" font-size="8" fill="#ef4444">外側へ回旋</text>
  </svg>`,

  // 20. シングルレッグスクワット
  singleLegSquat: `<svg viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg">
    <defs><style>.s{stroke:#0b1530;stroke-width:1.8;fill:none;stroke-linecap:round;stroke-linejoin:round}.h{fill:#fde68a}.b{fill:#dbeafe}</style></defs>
    <circle class="s h" cx="60" cy="25" r="10"/>
    <path class="s b" d="M50 36 Q60 34 70 36 L72 70 L48 70 Z"/>
    <path class="s" d="M60 70 Q65 95 60 120 L58 135"/>
    <path class="s" d="M60 75 Q80 80 90 100"/>
    <path class="s" d="M50 50 Q35 55 30 70"/>
    <path class="s" d="M70 50 Q90 55 95 70"/>
    <rect x="10" y="138" width="100" height="4" fill="#cbd5e1"/>
    <text x="20" y="148" font-size="8" fill="#1f4ed8">片脚立ちでお辞儀</text>
  </svg>`,

  // 21. リバースランジ
  reverseLunge: `<svg viewBox="0 0 160 150" xmlns="http://www.w3.org/2000/svg">
    <defs><style>.s{stroke:#0b1530;stroke-width:1.8;fill:none;stroke-linecap:round;stroke-linejoin:round}.h{fill:#fde68a}.b{fill:#dbeafe}</style></defs>
    <circle class="s h" cx="70" cy="25" r="10"/>
    <path class="s b" d="M60 36 Q70 34 80 36 L82 70 L58 70 Z"/>
    <path class="s" d="M68 70 Q70 90 70 110 L70 130"/>
    <path class="s" d="M75 70 Q100 85 130 130"/>
    <path class="s" d="M58 48 Q40 60 30 80"/>
    <rect x="5" y="135" width="150" height="4" fill="#cbd5e1"/>
    <text x="58" y="148" font-size="8" fill="#1f4ed8">後ろへ大きく踏み出す</text>
  </svg>`,

  // 22. 足首モビリティ
  ankleMobility: `<svg viewBox="0 0 140 120" xmlns="http://www.w3.org/2000/svg">
    <defs><style>.s{stroke:#0b1530;stroke-width:1.8;fill:none;stroke-linecap:round;stroke-linejoin:round}.b{fill:#dbeafe}</style></defs>
    <rect x="10" y="100" width="120" height="6" fill="#cbd5e1"/>
    <rect class="s" x="50" y="40" width="40" height="55" fill="#fde68a" rx="3"/>
    <path class="s" d="M50 95 Q40 100 30 100"/>
    <path class="s" d="M90 95 Q120 105 130 90"/>
    <path d="M60 30 Q70 20 80 30" stroke="#06b6d4" stroke-width="1.5" fill="none" stroke-dasharray="3 3"/>
    <text x="56" y="20" font-size="8" fill="#06b6d4">膝を前へ</text>
  </svg>`,

  // 23. スコットスクワット
  scapularSquat: `<svg viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg">
    <defs><style>.s{stroke:#0b1530;stroke-width:1.8;fill:none;stroke-linecap:round;stroke-linejoin:round}.h{fill:#fde68a}.b{fill:#dbeafe}.w{fill:#e2e8f0}</style></defs>
    <rect class="w" x="100" y="10" width="6" height="140"/>
    <circle class="s h" cx="60" cy="35" r="10"/>
    <path class="s b" d="M50 46 Q60 44 70 46 L72 80 L48 80 Z"/>
    <path class="s" d="M50 80 Q40 105 30 135"/>
    <path class="s" d="M70 80 Q80 105 90 135"/>
    <path class="s" d="M50 55 Q35 50 25 30"/>
    <path class="s" d="M70 55 Q85 50 95 30"/>
    <rect x="10" y="140" width="110" height="4" fill="#cbd5e1"/>
    <text x="30" y="20" font-size="8" fill="#1f4ed8">腕を上げてW→Y</text>
  </svg>`,

  // 24. シングルレッグデッドリフト
  singleLegDeadlift: `<svg viewBox="0 0 160 140" xmlns="http://www.w3.org/2000/svg">
    <defs><style>.s{stroke:#0b1530;stroke-width:1.8;fill:none;stroke-linecap:round;stroke-linejoin:round}.h{fill:#fde68a}.b{fill:#dbeafe}</style></defs>
    <rect x="10" y="125" width="140" height="4" fill="#cbd5e1"/>
    <circle class="s h" cx="40" cy="50" r="10"/>
    <path class="s b" d="M48 56 Q70 58 90 60 L90 75 L48 70 Z"/>
    <path class="s" d="M90 70 L130 80"/>
    <path class="s" d="M90 70 Q100 95 100 125"/>
    <path class="s" d="M88 65 Q120 50 145 30"/>
    <path class="s" d="M40 58 Q35 75 30 95"/>
    <text x="18" y="22" font-size="8" fill="#1f4ed8">骨盤を水平に保つ</text>
  </svg>`,
};

// ===================================================================
// EXERCISE LIBRARY
// ===================================================================
const EXERCISES = {
  // ---------- 頸部 / 上部交差症候群 ----------
  chinTuck: {
    id:'chinTuck', name:'チンタック（あご引き）', category:'training',
    targets:['深部頸屈筋(頸長筋・頭長筋)','頭部前方位'],
    illustration: SVG.chinTuck,
    duration:'10回 × 3セット', equipment:'なし',
    purpose:'弱化しやすい深部頸屈筋を活性化し、頭部前方位を矯正する。',
    how:[
      '壁に背中をつけて立つか、椅子に座って胸を張る。',
      '視線は正面のまま、後頭部を真後ろに引くようにあごを軽く引く。',
      '「二重あご」を作るイメージで、首の前面が伸びるのを感じる。',
      '5秒キープ → ゆっくり戻す。これを10回。'
    ],
    cues:{
      do:'後頭部を真後ろに平行移動。首の前面に軽い緊張を感じる。',
      dont:'うつむかない。頭を下げると胸鎖乳突筋が逆に働いてしまう。'
    },
    why:'長時間スマホやPCで前に出た頭を支える深部の筋(C0-C2)を再教育する。1時間に1セット入れるだけで頸の負担が30%減るとされる。'
  },

  doorChest: {
    id:'doorChest', name:'ドアフレーム胸ストレッチ', category:'selfcare',
    targets:['大胸筋','小胸筋','烏口腕筋'],
    illustration: SVG.doorChest,
    duration:'30秒 × 左右2セット', equipment:'ドア枠',
    purpose:'巻き肩の主原因である大胸筋・小胸筋の短縮をリリースする。',
    how:[
      'ドア枠に片腕の前腕全体を当てる(肘90度、肩90度外転)。',
      '体を前にゆっくり踏み出し、胸の前面が伸びる位置で30秒キープ。',
      '腕の高さを変える(45度・90度・120度)と小胸筋までカバーできる。',
      '反対側も同様に。'
    ],
    cues:{
      do:'肩甲骨を下に下げてから胸を開く。呼吸は止めない。',
      dont:'頭を前に突き出さない。痛みではなく「気持ちよい伸び」で止める。'
    },
    why:'デスクワーク姿勢で慢性的に短縮する小胸筋は、胸郭出口症候群や肩こりの主因の一つ。'
  },

  thoracicExt: {
    id:'thoracicExt', name:'胸椎エクステンション（フォームローラー）', category:'selfcare',
    targets:['胸椎','脊柱起立筋(胸部)','胸腰筋膜'],
    illustration: SVG.thoracicExt,
    duration:'10回 × 2セット', equipment:'フォームローラー',
    purpose:'硬くなった胸椎の伸展可動域を取り戻し、猫背を改善。',
    how:[
      'フォームローラーを胸の真下(胸椎中部)に横向きに置く。',
      '両手で頭を支え、お尻を床につけたまま胸を反らす。',
      '息を吐きながら胸椎を反らし、3秒キープ。',
      'ローラーを少しずつ位置をずらして胸椎全体に行う。'
    ],
    cues:{
      do:'反るのは胸椎。腰は反らさない(膝を立てると腰が固定される)。',
      dont:'首を強く反らさない。肩がすくまないように。'
    },
    why:'胸椎が動かないと、頚椎と腰椎が代償する。1日の胸椎モビリティが肩こり・腰痛両方の鍵。'
  },

  capitalNeckRetract: {
    id:'capitalNeckRetract', name:'頸長後屈ストレッチ', category:'selfcare',
    targets:['後頭下筋群','上部僧帽筋','頭半棘筋'],
    illustration: SVG.capitalNeckRetract,
    duration:'20秒 × 3セット', equipment:'なし',
    purpose:'頭痛・眼精疲労の原因となる後頭下筋群をリリース。',
    how:[
      '椅子に背筋を伸ばして座る。',
      'あごを軽く引いたまま、首の後ろを上に伸ばすように頭頂を引き上げる。',
      '両手で頭の後ろをそっと押さえ、首の後ろ(後頭下)に伸びを感じて20秒キープ。',
      'ゆっくり戻し、3セット繰り返す。'
    ],
    cues:{
      do:'頭頂を天井へ。首の後ろにジワッと伸びを感じる。',
      dont:'強く下を向かない。あくまで「上方向への牽引」がポイント。'
    },
    why:'後頭下筋群は眼球運動と連動するため、ここをリリースすると眼精疲労・緊張型頭痛が劇的に軽くなる。'
  },

  catCow: {
    id:'catCow', name:'キャット＆カウ', category:'selfcare',
    targets:['脊柱全体','胸腰筋膜','体幹深層筋'],
    illustration: SVG.catCow,
    duration:'10往復 × 2セット', equipment:'マット',
    purpose:'脊柱の分節的な動きを取り戻し、姿勢制御の感覚を再教育。',
    how:[
      '四つん這い。手は肩の真下、膝は股関節の真下。',
      '息を吸いながら背骨を反らし、胸を前へ・お尻を上へ(カウ)。',
      '息を吐きながら背骨を丸め、おへそを覗き込む(キャット)。',
      'ゆっくり10往復。頸椎・胸椎・腰椎を順番に動かす意識で。'
    ],
    cues:{
      do:'呼吸と動きを連動。骨1つずつ動かす意識。',
      dont:'肘を伸ばし切ってロックしない。腰だけで反らない。'
    },
    why:'脊柱全体の「動く感覚」を取り戻すことが、姿勢矯正の土台になる。'
  },

  hipFlexorStretch: {
    id:'hipFlexorStretch', name:'ヒップフレクサーストレッチ', category:'selfcare',
    targets:['腸腰筋(腸骨筋+大腰筋)','大腿直筋','大腿筋膜張筋'],
    illustration: SVG.hipFlexorStretch,
    duration:'45秒 × 左右2セット', equipment:'マット',
    purpose:'反り腰の主原因である腸腰筋の短縮をリリース。',
    how:[
      '片膝立ち。後ろ脚の膝はマットに、前脚は90度。',
      '骨盤を後傾させる(おへそを後ろへ引っ込める)。',
      'ゆっくり腰を前へ押し出し、後ろ脚の付け根が伸びるのを感じる。',
      '45秒キープ → 反対側へ。'
    ],
    cues:{
      do:'必ず骨盤を後傾させてから前に押し出す(これが効くポイント)。',
      dont:'腰を反らない。前脚の膝はつま先より前に出さない。'
    },
    why:'1日8時間座ると腸腰筋は屈曲90度のまま固まる。立位で骨盤を前傾させ反り腰・腰痛の主因に。'
  },

  gluteBridge: {
    id:'gluteBridge', name:'グルートブリッジ', category:'training',
    targets:['大臀筋','ハムストリングス','体幹後面'],
    illustration: SVG.gluteBridge,
    duration:'15回 × 3セット', equipment:'マット',
    purpose:'弱化した大臀筋を活性化し、骨盤の前傾を矯正。',
    how:[
      '仰向けで膝を立てる。足は腰幅。',
      'お尻に力を入れて、骨盤を後傾させてから持ち上げる。',
      '膝・股関節・肩が一直線になるまで上げ、3秒キープ。',
      'ゆっくり下ろす。15回 × 3セット。'
    ],
    cues:{
      do:'上げる前にお尻を「ギュッ」と締める。肋骨は閉じる。',
      dont:'腰で反って上げない。ハムや腰がつる場合は臀筋を意識し直す。'
    },
    why:'座る時間が長いと大臀筋は「健忘症」になる。ここを起こさないと、いくら腹筋しても姿勢は変わらない。'
  },

  deadBug: {
    id:'deadBug', name:'デッドバグ', category:'training',
    targets:['腹横筋','腹直筋(下部)','体幹安定性'],
    illustration: SVG.deadBug,
    duration:'各側10回 × 2セット', equipment:'マット',
    purpose:'反り腰を作らずに体幹を安定化させる、最も安全な腹筋エクササイズ。',
    how:[
      '仰向けで両膝を90度に上げ、両手を天井へ。',
      '腰を床に押しつけたまま(腰と床の隙間ゼロ)、',
      '右手と左脚をゆっくり伸ばし、床ギリギリで止める。',
      '元に戻し、反対側。腰が浮いたら可動範囲を狭くする。'
    ],
    cues:{
      do:'動作中ずっと腰と床の隙間ゼロを保つ。呼吸は止めない。',
      dont:'反動で動かさない。腰が浮くなら可動を狭める。'
    },
    why:'反り腰の人がクランチをすると逆効果。デッドバグは腰椎中立を保ったまま腹横筋を効かせられる唯一のエクササイズ。'
  },

  wallAngel: {
    id:'wallAngel', name:'ウォールエンジェル', category:'training',
    targets:['下部僧帽筋','菱形筋','前鋸筋','胸椎'],
    illustration: SVG.wallAngel,
    duration:'10回 × 2セット', equipment:'壁',
    purpose:'巻き肩・猫背を統合的に改善する複合エクササイズ。',
    how:[
      '壁に背中・お尻・後頭部をつけて立つ。腰の隙間は手のひら1枚。',
      '腕を「W」の形にして肘と手の甲を壁につける。',
      '手の甲・肘を壁から離さずに、ゆっくり腕を「Y」の形まで上げる。',
      'ゆっくり下ろす。10回。'
    ],
    cues:{
      do:'肩甲骨を下げてから動かす。手の甲が壁から離れる範囲だけ動かす。',
      dont:'反り腰にならない。肩がすくまない。'
    },
    why:'下部僧帽筋・菱形筋の活性化と胸椎伸展が同時に行える、最効率の姿勢エクササイズ。'
  },

  hip9090: {
    id:'hip9090', name:'90/90ヒップストレッチ', category:'selfcare',
    targets:['梨状筋','深層外旋六筋','中臀筋'],
    illustration: SVG.hip9090,
    duration:'45秒 × 左右2セット', equipment:'マット',
    purpose:'骨盤周りの深層筋をリリースし、股関節の可動域を広げる。',
    how:[
      '床に座り、前脚を90度・後ろ脚も90度に。',
      '背筋を伸ばし、前脚側のお尻に体重を乗せる。',
      'ゆっくり上体を前に倒し、お尻の深部が伸びる位置で45秒。',
      '反対側も同様。'
    ],
    cues:{
      do:'背中は丸めず、骨盤から前に倒す。',
      dont:'痛みが出るところまで倒さない。膝に違和感があれば中止。'
    },
    why:'梨状筋が硬いと坐骨神経痛・骨盤の左右差・歩行時の膝痛の引き金になる。'
  },

  plank: {
    id:'plank', name:'プランク', category:'training',
    targets:['腹横筋','腹直筋','脊柱起立筋','骨盤底筋'],
    illustration: SVG.plank,
    duration:'30〜60秒 × 3セット', equipment:'マット',
    purpose:'体幹全体の等尺性収縮で、姿勢保持力を強化。',
    how:[
      '前腕とつま先で体を支える。肘は肩の真下。',
      '頭・背中・お尻・かかとを一直線に。',
      'お尻を締め、おへそを背骨へ引き込む(腹横筋)。',
      '30〜60秒キープ。フォームが崩れたら中止。'
    ],
    cues:{
      do:'呼吸は止めない。お尻と腹を同時に締める。',
      dont:'腰を反らさない・お尻を上げすぎない。'
    },
    why:'姿勢は「動的バランス」。プランクで腹横筋が常に薄く働く感覚を覚えると、立位・歩行でも姿勢が崩れにくくなる。'
  },

  clamshell: {
    id:'clamshell', name:'クラムシェル', category:'training',
    targets:['中臀筋','深層外旋六筋'],
    illustration: SVG.clamshell,
    duration:'各側15回 × 2セット', equipment:'マット',
    purpose:'弱りやすい中臀筋を活性化し、骨盤の左右の安定性を高める。',
    how:[
      '横向きに寝て、膝を90度に曲げる。両足のかかとは合わせたまま。',
      '骨盤を動かさずに、上の膝をゆっくり開く。',
      '上げきったところで2秒キープ → ゆっくり閉じる。',
      '15回 × 反対側。'
    ],
    cues:{
      do:'骨盤は床に対して垂直。お尻の横にしっかり効かせる。',
      dont:'体が後ろに倒れない。反動を使わない。'
    },
    why:'中臀筋は片脚立ちの安定に必須。ここが弱いと歩行時に骨盤が左右に揺れ、腰痛・膝痛の原因になる。'
  },

  birdDog: {
    id:'birdDog', name:'バードドッグ', category:'training',
    targets:['多裂筋','腹横筋','大臀筋','体幹コーディネーション'],
    illustration: SVG.birdDog,
    duration:'各側10回 × 2セット', equipment:'マット',
    purpose:'体幹を安定させたまま四肢を動かす、機能的体幹トレーニング。',
    how:[
      '四つん這いの姿勢。手は肩の真下、膝は股関節の真下。',
      '対角の手と脚(右手＋左脚)をゆっくり水平まで伸ばす。',
      '3秒キープ → ゆっくり戻す。',
      '反対の対角も。各側10回。'
    ],
    cues:{
      do:'骨盤を水平に保つ。頭頂とかかとを引っ張り合うイメージ。',
      dont:'腰を反らない。体が左右に揺れない(コップを背中に乗せても落ちないつもりで)。'
    },
    why:'姿勢制御に最も重要な多裂筋を、安全に活性化できる唯一無二のエクササイズ。'
  },

  foamRollerTSpine: {
    id:'foamRollerTSpine', name:'胸椎フォームローリング', category:'selfcare',
    targets:['胸椎','胸腰筋膜','広背筋'],
    illustration: SVG.foamRollerTSpine,
    duration:'90秒', equipment:'フォームローラー',
    purpose:'硬化した胸椎周辺の筋膜を解放し、可動性を回復。',
    how:[
      'フォームローラーを胸椎の真下(肩甲骨下角あたり)に横置き。',
      '両手で頭を支え、お尻を床から少し浮かせる。',
      '足で押してローラーを背中の上下にゆっくり転がす(肩甲骨下角〜肩甲骨間)。',
      '硬いポイントで止まって深呼吸を3回。'
    ],
    cues:{
      do:'お尻を浮かせて転がす。呼吸はゆっくり深く。',
      dont:'腰までローリングしない(腰部は禁忌)。'
    },
    why:'胸椎の筋膜癒着を解放することで、胸椎伸展ROMが平均15度改善するという報告もある。'
  },

  pigeon: {
    id:'pigeon', name:'ピジョンポーズ', category:'selfcare',
    targets:['大臀筋','梨状筋','腸腰筋(後脚側)'],
    illustration: SVG.pigeon,
    duration:'60秒 × 左右', equipment:'マット',
    purpose:'臀部深層と股関節屈筋を同時にリリース。',
    how:[
      '四つん這いから、右膝を右手首の後ろへ。脛は前へ。',
      '左脚をまっすぐ後ろへ伸ばし、つま先を立てる。',
      '骨盤を真下に向け、上体を前に倒していく。',
      '60秒キープ → 反対側。'
    ],
    cues:{
      do:'骨盤を地面に対して水平に。痛気持ちいい範囲で止める。',
      dont:'膝に痛みが出たら脛の角度を浅くする。'
    },
    why:'坐骨神経を圧迫しやすい梨状筋を、最も効果的に伸ばせるポーズ。'
  },

  hamstringStretch: {
    id:'hamstringStretch', name:'ハムストリングストレッチ', category:'selfcare',
    targets:['ハムストリングス','腓腹筋','坐骨神経'],
    illustration: SVG.hamstringStretch,
    duration:'45秒 × 左右2セット', equipment:'タオルorストラップ',
    purpose:'硬いハムは骨盤後傾(スウェイバック)の原因。柔軟性を回復。',
    how:[
      '仰向け。タオルを片足の土踏まずに引っかける。',
      '伸ばす脚は天井へ。膝は軽く緩めてOK。',
      'タオルを手前に引いて、もも裏に伸びを感じる位置で45秒。',
      '反対側も。'
    ],
    cues:{
      do:'反対の脚は床につけたまま。骨盤は水平に。',
      dont:'膝を伸ばし切ろうとして腰を反らない。'
    },
    why:'ハム短縮は骨盤後傾→腰椎後弯→猫背と全身に影響。柔軟性回復は姿勢矯正の必須項目。'
  },

  ballPlantar: {
    id:'ballPlantar', name:'テニスボール足底リリース', category:'selfcare',
    targets:['足底筋膜','短腓骨筋','後脛骨筋'],
    illustration: SVG.ballPlantar,
    duration:'各側60秒', equipment:'テニスボール',
    purpose:'足底アーチを整え、姿勢の土台から立て直す。',
    how:[
      '椅子に座り、片足の裏にテニスボールを置く。',
      'かかと → 土踏まず → 指の付け根 をゆっくり転がす。',
      '硬いポイントで30秒止めて圧をかける。',
      '反対側も同様に。'
    ],
    cues:{
      do:'体重をかけすぎず、痛気持ちいい強さで。',
      dont:'糖尿病・末梢神経障害がある場合は強圧を避ける。'
    },
    why:'足底筋膜は全身の筋膜の出発点。ここが硬いとふくらはぎ→ハム→腰まで連鎖的に固まる。'
  },

  subOccipital: {
    id:'subOccipital', name:'後頭下筋リリース', category:'selfcare',
    targets:['後頭下筋群','頸半棘筋'],
    illustration: SVG.subOccipital,
    duration:'30秒 × 3回', equipment:'なし(またはテニスボール)',
    purpose:'目の疲れ・緊張型頭痛・首の付け根の重さを軽減。',
    how:[
      '仰向けで、後頭部と首の付け根の境目(うなじの上)に両手指を当てる。',
      '指でゆっくり押しながら、小さく「うなずく」「いやいや」を10回ずつ。',
      'テニスボールを後頭部の付け根に置いて、頭の重みで圧をかけてもOK。',
      '30秒 × 3回。'
    ],
    cues:{
      do:'圧は心地よい程度。呼吸を深く保つ。',
      dont:'強く押しすぎない。めまいが出たら中止。'
    },
    why:'後頭下筋群は眼球運動と神経的につながっているため、ここを緩めると視界がクリアになる人も多い。'
  },

  rotatorCuff: {
    id:'rotatorCuff', name:'ローテーターカフ外旋', category:'training',
    targets:['棘下筋','小円筋','後部三角筋'],
    illustration: SVG.rotatorCuff,
    duration:'15回 × 2セット', equipment:'チューブorダンベル',
    purpose:'肩甲骨を後ろに引き寄せる筋を強化し、巻き肩を根本改善。',
    how:[
      '肘を体の側面につけ、90度に曲げる。',
      'チューブ(またはダンベル)を持ち、肘を支点に前腕を外側へ回す。',
      '肩甲骨を背中に寄せながら、ゆっくり戻す。',
      '15回 × 反対側。'
    ],
    cues:{
      do:'肘は体から離さない。動かすのは前腕だけ。',
      dont:'肩がすくまない。スピードは出さない(3秒で開き、3秒で戻す)。'
    },
    why:'巻き肩の人は前面の筋ばかり強い。後ろの棘下筋・小円筋を起こさないと姿勢は戻らない。'
  },

  singleLegSquat: {
    id:'singleLegSquat', name:'シングルレッグスクワット', category:'training',
    targets:['大臀筋','中臀筋','大腿四頭筋','体幹安定性'],
    illustration: SVG.singleLegSquat,
    duration:'各側8回 × 2セット', equipment:'なし(必要ならイス)',
    purpose:'左右差・膝の内向き(Knee-in)を矯正する高度な統合トレーニング。',
    how:[
      '片脚で立ち、もう片方の脚は前方に浮かせる。',
      'お辞儀をするように股関節から折りたたみ、立ち脚の膝を90度近くまで曲げる。',
      '膝とつま先は同じ方向を向ける。',
      'ゆっくり立ち上がる。各側8回。'
    ],
    cues:{
      do:'膝が内に入らないように、お尻を後ろに引く意識。',
      dont:'勢いで戻らない。バランスが取れなければ椅子に手を添える。'
    },
    why:'歩行・階段昇降など日常動作はすべて片脚動作。ここを鍛えることが姿勢を「機能」に変える。'
  },

  reverseLunge: {
    id:'reverseLunge', name:'リバースランジ', category:'training',
    targets:['大臀筋','大腿四頭筋','体幹','腸腰筋(後脚側)'],
    illustration: SVG.reverseLunge,
    duration:'各側10回 × 2セット', equipment:'なし',
    purpose:'下半身の安定と股関節屈筋の動的ストレッチを同時に。',
    how:[
      '足を腰幅にして立つ。',
      '片足を大きく後ろへ踏み出し、両膝を90度になるまで沈む。',
      '前脚のかかとで床を押して、元の位置に戻る。',
      '左右交互に10回ずつ。'
    ],
    cues:{
      do:'体幹はまっすぐ。前膝はつま先より前に出ないように。',
      dont:'体が前に倒れすぎない。'
    },
    why:'前ランジより腰への負担が少なく、姿勢矯正期に最適な下半身トレ。'
  },

  ankleMobility: {
    id:'ankleMobility', name:'足首モビリティ(壁ニータッチ)', category:'selfcare',
    targets:['足関節背屈','下腿三頭筋','後脛骨筋'],
    illustration: SVG.ankleMobility,
    duration:'各側10回 × 2セット', equipment:'壁',
    purpose:'足首が硬いと連鎖的に膝・骨盤がねじれる。土台を整える。',
    how:[
      '壁の前に片足を置き(つま先と壁の間は10cm)、もう片足は後ろへ。',
      '前足のかかとを床につけたまま、膝を壁にタッチ。',
      'ゆっくり戻す。10回。',
      'できるようになったら、つま先と壁の距離を少しずつ広げる。'
    ],
    cues:{
      do:'膝はつま先と同じ方向に。かかとは絶対に浮かさない。',
      dont:'内側・外側にねじれないように。'
    },
    why:'足首背屈ROMが10度未満だと、しゃがむ時に骨盤後傾→腰椎屈曲が代償され腰痛の原因に。'
  },

  scapularSquat: {
    id:'scapularSquat', name:'ウォールY-Tスクワット', category:'training',
    targets:['下部僧帽筋','菱形筋','大臀筋','姿勢制御筋'],
    illustration: SVG.scapularSquat,
    duration:'10回 × 2セット', equipment:'壁',
    purpose:'下半身と上半身の姿勢筋を同時に統合する仕上げ種目。',
    how:[
      '壁に背中をつけて立ち、腕を「Y」の形に上げる。',
      'スクワットしながら、腕を「W」の形に下ろす(肘を脇腹へ)。',
      '立ち上がるときに、腕を再び「Y」に伸ばす。',
      '10回 × 2セット。'
    ],
    cues:{
      do:'肘・手の甲を壁から離さない。胸を張り続ける。',
      dont:'反り腰になない。膝はつま先と同方向。'
    },
    why:'1動作で5つの主要姿勢筋を同時に使える、Phase 3向け統合エクササイズ。'
  },

  singleLegDeadlift: {
    id:'singleLegDeadlift', name:'シングルレッグデッドリフト', category:'training',
    targets:['大臀筋','ハムストリングス','多裂筋','体幹安定性'],
    illustration: SVG.singleLegDeadlift,
    duration:'各側8回 × 2セット', equipment:'なし(慣れたらダンベル)',
    purpose:'後面連鎖を全身でつなげる、最終ステージの統合トレーニング。',
    how:[
      '片脚で立ち、もう片脚は軽く後ろへ。',
      '股関節からお辞儀をするように、体を前に倒す。',
      '同時に後ろ脚を水平まで上げる(体と脚が一直線)。',
      'お尻の力で戻す。8回 × 反対側。'
    ],
    cues:{
      do:'頭・背中・後ろ脚が常に一直線。骨盤は水平を保つ。',
      dont:'背中を丸めない。膝を伸ばし切らない(軽く緩める)。'
    },
    why:'立位・歩行・走行のすべての基本動作で必要な「片脚での股関節ヒンジ」を鍛える最高峰種目。'
  },
};

// 各問題パターンに対応する処方リスト
// selfcare 優先2 / training 優先2 を後で抽出する
const PRESCRIPTION_MAP = {
  forwardHead: {
    selfcare: ['subOccipital','capitalNeckRetract','doorChest','foamRollerTSpine'],
    training: ['chinTuck','wallAngel','rotatorCuff','plank'],
  },
  roundedShoulders: {
    selfcare: ['doorChest','foamRollerTSpine','thoracicExt'],
    training: ['wallAngel','rotatorCuff','scapularSquat'],
  },
  thoracicKyphosis: {
    selfcare: ['thoracicExt','foamRollerTSpine','catCow'],
    training: ['wallAngel','birdDog','scapularSquat'],
  },
  anteriorPelvicTilt: {
    selfcare: ['hipFlexorStretch','catCow','foamRollerTSpine'],
    training: ['gluteBridge','deadBug','plank','singleLegDeadlift'],
  },
  posteriorPelvicTilt: {
    selfcare: ['hamstringStretch','hipFlexorStretch','catCow'],
    training: ['gluteBridge','birdDog','reverseLunge'],
  },
  swayBack: {
    selfcare: ['hamstringStretch','hipFlexorStretch','foamRollerTSpine'],
    training: ['deadBug','plank','birdDog','singleLegDeadlift'],
  },
  lateralAsymmetry: {
    selfcare: ['hip9090','pigeon','hamstringStretch'],
    training: ['clamshell','singleLegSquat','singleLegDeadlift'],
  },
  kneeValgus: {
    selfcare: ['hip9090','ankleMobility','pigeon'],
    training: ['clamshell','singleLegSquat','reverseLunge'],
  },
  ankleStiffness: {
    selfcare: ['ankleMobility','ballPlantar'],
    training: ['singleLegSquat','reverseLunge'],
  },
  general: {
    selfcare: ['catCow','thoracicExt','hipFlexorStretch','hamstringStretch'],
    training: ['gluteBridge','plank','birdDog','wallAngel'],
  },
};

export { EXERCISES, PRESCRIPTION_MAP, SVG };
