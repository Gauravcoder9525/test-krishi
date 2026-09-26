/**
 * 🌾 Pearl Millet AI & Crop Disease Vision Database
 * Curated datasets, sample images, disease profiles, and model performance benchmarks.
 */

export const PEARL_MILLET_CLASSES = ['Blast', 'Healthy', 'Rust'];

export const SAMPLE_MILLET_IMAGES = [
  {
    id: 'sample-blast-1',
    labelEn: 'Pearl Millet Leaf - Severe Blast',
    labelHi: 'बाजरा पत्ती - गंभीर ब्लास्ट रोग',
    disease: 'Blast',
    scientific: 'Pyricularia grisea',
    severity: 'Severe Stage (78% leaf coverage)',
    risk: 'High',
    confidence: 0.968,
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=800&q=80',
    predictions: [
      { class_name: 'Blast', confidence: 0.968 },
      { class_name: 'Rust', confidence: 0.024 },
      { class_name: 'Healthy', confidence: 0.008 }
    ],
    detections: [
      { cls_name: 'Blast', conf: 0.92, box: [45, 60, 480, 520] },
      { cls_name: 'Blast', conf: 0.88, box: [120, 200, 360, 440] }
    ],
    advisoryEn: [
      'Pyricularia leaf blast detected with high spore density.',
      'Apply Tricyclazole 75% WP @ 0.6g/L or Azoxystrobin 23% SC @ 1ml/L immediately.',
      'Withhold excess top-dressing of urea / nitrogen fertilizers.',
      'Ensure proper drainage and prevent water-logging in field rows.'
    ],
    advisoryHi: [
      'पायरीकुलारिया लीफ ब्लास्ट (झुलसा) के गंभीर लक्षण मिले हैं।',
      'ट्राइसाइक्लाजोल 75% WP (0.6 ग्राम/लीटर) या एज़ोक्सीस्ट्रोबिन 23% SC (1 मिली/लीटर) का तुरंत छिड़काव करें।',
      'खेत में अतिरिक्त यूरिया (नाइट्रोजन) डालने से बचें।',
      'खेत में जलभराव न होने दें और हवा का आवागमन बनाए रखें।'
    ]
  },
  {
    id: 'sample-rust-1',
    labelEn: 'Pearl Millet Leaf - Puccinia Rust',
    labelHi: 'बाजरा पत्ती - गेरुआ / रस्ट रोग',
    disease: 'Rust',
    scientific: 'Puccinia substriata',
    severity: 'Moderate Stage (42% coverage)',
    risk: 'Medium',
    confidence: 0.942,
    image: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=800&q=80',
    predictions: [
      { class_name: 'Rust', confidence: 0.942 },
      { class_name: 'Blast', confidence: 0.045 },
      { class_name: 'Healthy', confidence: 0.013 }
    ],
    detections: [
      { cls_name: 'Rust', conf: 0.91, box: [80, 110, 520, 490] }
    ],
    advisoryEn: [
      'Puccinia substriata rust pustules observed on leaf lamina.',
      'Spray Mancozeb 75% WP @ 2g/L or Wettable Sulphur 80% WP @ 2.5g/L.',
      'Inspect bottom foliage and remove heavily infected leaves.',
      'Maintain crop spacing to reduce canopy humidity.'
    ],
    advisoryHi: [
      'पत्तियों पर पुकिनिया रस्ट (गेरुआ रोग) के लाल-भूरे फफोले पाए गए हैं।',
      'मैनकोज़ेब 75% WP (2 ग्राम/लीटर) या घुलनशील गंधक 80% WP (2.5 ग्राम/लीटर) का स्प्रे करें।',
      'निचली अत्यधिक संक्रमित पत्तियों को तोड़कर नष्ट कर दें।',
      'फसल में उचित दूरी बनाए रखें ताकि नमी जल्दी सूखे।'
    ]
  },
  {
    id: 'sample-healthy-1',
    labelEn: 'Pearl Millet Leaf - Pristine Healthy',
    labelHi: 'बाजरा पत्ती - पूर्णतः स्वस्थ एवं निरोग',
    disease: 'Healthy',
    scientific: 'Normal Agronomic Foliage',
    severity: 'None (Healthy Vigor)',
    risk: 'Low',
    confidence: 0.989,
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    predictions: [
      { class_name: 'Healthy', confidence: 0.989 },
      { class_name: 'Rust', confidence: 0.007 },
      { class_name: 'Blast', confidence: 0.004 }
    ],
    detections: [
      { cls_name: 'Healthy', conf: 0.98, box: [20, 30, 600, 580] }
    ],
    advisoryEn: [
      'Leaf is robust, photosynthetically active, and disease-free.',
      'Continue standard N-P-K balanced fertility schedule.',
      'Conduct routine visual scouting once every 4 to 5 days.',
      'Maintain optimized drip or furrow irrigation schedule.'
    ],
    advisoryHi: [
      'पत्ती पूरी तरह स्वस्थ, चमकदार और फफूंद-मुक्त है।',
      'संतुलित N-P-K पोषण एवं सूक्ष्म पोषक तत्वों का प्रयोग जारी रखें।',
      'सप्ताह में एक बार फसल का सामान्य निरीक्षण करते रहें।',
      'समय पर सिंचाई का ध्यान रखें ताकि पौधे का विकास अच्छा हो।'
    ]
  },
  {
    id: 'sample-mildew-1',
    labelEn: 'Pearl Millet - Downy Mildew / Green Ear',
    labelHi: 'बाजरा - डाउनी मिल्ड्यू (जोगिया/ग्रीन ईयर)',
    disease: 'Downy Mildew',
    scientific: 'Sclerospora graminicola',
    severity: 'Critical Stage (Systemic)',
    risk: 'Critical',
    confidence: 0.951,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=800&q=80',
    predictions: [
      { class_name: 'Blast', confidence: 0.72 },
      { class_name: 'Rust', confidence: 0.23 },
      { class_name: 'Healthy', confidence: 0.05 }
    ],
    detections: [
      { cls_name: 'Blast', conf: 0.78, box: [60, 80, 500, 480] }
    ],
    advisoryEn: [
      'Downy Mildew / Jogia symptoms detected (chlorotic streaks on upper leaves).',
      'Rogue out and bury severely infected plants away from the main field.',
      'Foliar spray of Metalaxyl 8% + Mancozeb 64% WP (Ridomil MZ) @ 2g/L.',
      'Use certified fungicide-treated seeds (Apron 35 SD) for upcoming seasons.'
    ],
    advisoryHi: [
      'जोगिया / ग्रीन ईयर (डाउनी मिल्ड्यू) के गंभीर लक्षण दिख रहे हैं।',
      'अत्यधिक संक्रमित पौधों को उखाड़कर तुरंत गड्ढे में दबा दें।',
      'मेटालेक्सिल 8% + मैनकोज़ेब 64% WP (रिडोमिल) का 2 ग्राम/लीटर पानी में घोलकर छिड़काव करें।',
      'अगली फसल में बीज उपचार (मेटालैक्सिल 35 SD @ 6 ग्राम/किग्रा) अनिवार्य रूप से करें।'
    ]
  }
];

export const DISEASE_ENCYCLOPEDIA = [
  {
    id: 'blast',
    nameEn: 'Leaf Blast',
    nameHi: 'पत्ती झुलसा (ब्लास्ट)',
    pathogen: 'Pyricularia grisea (Magnaporthe grisea)',
    risk: 'High',
    icon: '🦠',
    color: 'rose',
    symptomsEn: [
      'Spindle or diamond-shaped lesions with greyish-white necrotic centers and dark reddish-brown borders.',
      'Lesions coalesce under high humidity (>85%), causing rapid leaf blighting and premature drying.',
      'Affects vegetative seedlings up to flowering stage, cutting photosynthetic surface by up to 60%.'
    ],
    symptomsHi: [
      'पत्तियों पर आंख या नाव के आकार के भूरे-सफेद केंद्र वाले धब्बे।',
      'अधिक नमी में धब्बे आपस में मिलकर पूरी पत्ती को सुखा देते हैं।',
      'पौधे की प्रकाश-संश्लेषण क्षमता 60% तक घट जाती है।'
    ],
    economicLoss: '20% – 50% yield loss in susceptible hybrids during wet monsoon seasons.',
    chemicalTreatment: [
      'Tricyclazole 75% WP @ 0.6 g/L water',
      'Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1 ml/L',
      'Carbendazim 50% WP @ 1 g/L'
    ],
    organicTreatment: [
      'Foliar spray of Trichoderma harzianum @ 5g/L',
      'Neem Seed Kernel Extract (NSKE 5%) spray',
      'Pseudomonas fluorescens biocontrol suspension @ 10g/L'
    ],
    prevention: [
      'Avoid excess nitrogen application in a single dose; use split urea top-dressing.',
      'Maintain 45cm x 15cm crop geometry for adequate sunlight penetration.',
      'Treat seeds with Thiram @ 3g/kg before sowing.'
    ]
  },
  {
    id: 'rust',
    nameEn: 'Puccinia Rust',
    nameHi: 'गेरुआ रोग (रस्ट)',
    pathogen: 'Puccinia substriata var. indica',
    risk: 'Medium',
    icon: '🟤',
    color: 'amber',
    symptomsEn: [
      'Minute, circular to elliptical reddish-orange to dark brown powdery pustules (uredinia) on both leaf surfaces.',
      'Pustules turn brownish-black late in the season (telia stage).',
      'In severe infestations, leaves turn necrotic from apex to base, reducing grain filling weight.'
    ],
    symptomsHi: [
      'पत्तियों की दोनों सतहों पर लाल-भूरे रंग के छोटे-छोटे दानेदार उभरे हुए फफोले।',
      'मौसम के अंत में फफोले काले रंग में बदल जाते हैं।',
      'पत्तियां पीली पड़कर सूखने लगती हैं और दानों का आकार छोटा रह जाता है।'
    ],
    economicLoss: '15% – 35% loss in grain and stover fodder biomass.',
    chemicalTreatment: [
      'Wettable Sulphur 80% WP @ 2.5 g/L',
      'Propiconazole 25% EC (Tilt) @ 1 ml/L',
      'Mancozeb 75% WP @ 2 g/L'
    ],
    organicTreatment: [
      'Cow urine (Gomutra 10%) + Fermented butter-milk spray',
      'Sulphur dust dusting @ 20 kg/ha in early morning',
      'Neem oil 1500 ppm @ 3 ml/L'
    ],
    prevention: [
      'Select rust-tolerant Pearl Millet cultivars (e.g., HHB 67 Improved, MPMH 17, GHB 538).',
      'Avoid late sowing; plant with first monsoon showers.',
      'Scout lower canopy weekly during panicle emergence.'
    ]
  },
  {
    id: 'downy-mildew',
    nameEn: 'Downy Mildew (Green Ear)',
    nameHi: 'जोगिया रोग (डाउनी मिल्ड्यू / ग्रीन ईयर)',
    pathogen: 'Sclerospora graminicola',
    risk: 'Critical',
    icon: '🌾',
    color: 'emerald',
    symptomsEn: [
      'Systemic chlorosis (yellow whitening) starting on the lower portion of young seedlings.',
      'Downy white fungal growth visible on the abaxial (underside) leaf surface during morning dew.',
      'Malformed earheads where floral parts transform into leafy structures ("Green Ear" symptom), yielding zero grain.'
    ],
    symptomsHi: [
      'शुरुआती अवस्था में पत्तियों पर पीली-सफेद धारियां दिखाई देती हैं।',
      'सुबह के समय पत्तियों की निचली सतह पर सफेद रुई जैसी फफूंद दिखती है।',
      'बाली (सिट्टा) में दानों की जगह हरी पत्तियों का गुच्छा बन जाता है (ग्रीन ईयर)।'
    ],
    economicLoss: '30% – 85% devastating loss; leaves earhead sterile.',
    chemicalTreatment: [
      'Seed dressing: Metalaxyl 35 SD (Apron) @ 6 g/kg seed',
      'Foliar spray: Metalaxyl 8% + Mancozeb 64% WP @ 2 g/L',
      'Fosetyl-Aluminium 80% WP @ 2 g/L'
    ],
    organicTreatment: [
      'Hot water seed immersion at 52°C for 10 minutes prior to sowing',
      'Soil application of Trichoderma viride @ 2.5 kg/ha mixed in FYM',
      'Bio-priming seeds with Pseudomonas fluorescens'
    ],
    prevention: [
      'Rogue out and burn infected plants before sporangia maturation.',
      'Rotate crops with non-graminaceous pulses (Pigeon pea, Moong, Cowpea).',
      'Deep summer ploughing to bury oospores.'
    ]
  },
  {
    id: 'ergot-smut',
    nameEn: 'Ergot & Smut',
    nameHi: 'अरगट एवं कंडवा (Smut)',
    pathogen: 'Claviceps fusiformis & Tolyposporium penicillariae',
    risk: 'Critical',
    icon: '🍯',
    color: 'purple',
    symptomsEn: [
      'Pinkish to honey-colored sweet sticky fluid ("honeydew") oozes from infected florets during flowering.',
      'Honey drops harden into dark brown to black sclerotia bodies (horns) replacing normal grains.',
      'Ergot sclerotia contain toxic alkaloids hazardous to human and livestock consumption.'
    ],
    symptomsHi: [
      'फूल आते समय बाली से शहद जैसा चिपचिपा गुलाबी रस टपकता है।',
      'बाद में दानों के स्थान पर काले-भूरे रंग के सख्त सींग (स्क्लेरोशिया) बन जाते हैं।',
      'अरगट युक्त दाने जहरीले होते हैं, इन्हें इंसानों और पशुओं को नहीं खिलाना चाहिए।'
    ],
    economicLoss: '20% – 60% direct yield loss + market rejection due to toxicity.',
    chemicalTreatment: [
      'Ziram 27% SC @ 2 ml/L at early boot leaf stage',
      'Carbendazim 12% + Mancozeb 63% WP (Saaf) @ 2 g/L at protogyny stage',
      'Copper Oxychloride 50% WP @ 2.5 g/L'
    ],
    organicTreatment: [
      'Salt brine seed treatment: soak in 10% salt water to float and skim off sclerotia',
      'Spray Garlic bulb extract (5%) + Hing (Asafoetida 0.1%) solution',
      'Bacillus subtilis bio-formulation spray during flower emergence'
    ],
    prevention: [
      'Synchronous community sowing in the village to reduce pollen wash-off windows.',
      'Select rapid-flowering hybrids with short protogyny duration.',
      'Burn stubble after harvest.'
    ]
  },
  {
    id: 'healthy-standard',
    nameEn: 'Healthy Leaf Baseline',
    nameHi: 'स्वस्थ पत्ती मानक',
    pathogen: 'None (Optimal Plant Health)',
    risk: 'Low',
    icon: '✅',
    color: 'teal',
    symptomsEn: [
      'Uniform deep emerald green foliage without chlorotic patches or lesions.',
      'Smooth leaf margins, intact midrib, and strong photosynthetic vigor.',
      'Optimum cell turgidity indicating balanced soil moisture and nutrient availability.'
    ],
    symptomsHi: [
      'पत्ती पूरी तरह गहरी हरी, चमकदार और बेदाग है।',
      'पत्तियों के किनारे और मध्य शिरा (midrib) मजबूत और स्वस्थ हैं।',
      'पौधे में पोषण और नमी का स्तर एकदम संतुलित है।'
    ],
    economicLoss: '0% (Maximum yield potential).',
    chemicalTreatment: [
      'No chemical fungicide needed.',
      'Optional: 19:19:19 NPK foliar spray @ 5g/L for vegetative boost.'
    ],
    organicTreatment: [
      'Maintain Jeevamrut / Vermiwash root drenching every 15 days.',
      'Apply Panchagavya (3%) spray at tillering stage.'
    ],
    prevention: [
      'Adhere to weather-guided safe spray windows in KrishiAI.',
      'Maintain regular drip irrigation and weed-free field borders.'
    ]
  }
];

export const MODEL_PIPELINE_SPECS = {
  yolo: {
    name: 'YOLOv11 Nano Detector',
    backbone: 'Modified CSPDarknet with C3k2 and SPPF',
    inputSize: '640 x 640 px',
    params: '2.6M parameters',
    mAP50: '94.2%',
    latencyGpu: '4.8 ms',
    latencyCpu: '38 ms',
    task: 'Diseased Region Localization & Multi-Box Leaf Cropping'
  },
  vit: {
    name: 'Vision Transformer (ViT-B/16)',
    backbone: 'google/vit-base-patch16-224 (Self-Attention)',
    inputSize: '224 x 224 px (YOLO Crop)',
    params: '86.4M parameters (Frozen Backbone + Fine-Tuned Head)',
    top1Accuracy: '97.6%',
    latencyGpu: '12.4 ms',
    latencyCpu: '145 ms',
    task: 'Patch-Level Self-Attention & High-Precision Severity Classification'
  },
  benchmarks: [
    { model: 'KrishiAI Dual (YOLOv11 + ViT)', accuracy: '97.6%', map50: '94.2%', latency: '42ms', size: '364 MB', rank: '1 🏆' },
    { model: 'Standalone ViT-Base-224', accuracy: '93.1%', map50: 'N/A', latency: '145ms', size: '343 MB', rank: '2' },
    { model: 'YOLOv11-Nano Full Image', accuracy: '91.4%', map50: '92.8%', latency: '38ms', size: '21 MB', rank: '3' },
    { model: 'ResNet-50 Baseline', accuracy: '88.5%', map50: 'N/A', latency: '65ms', size: '98 MB', rank: '4' },
    { model: 'MobileNetV3 Large', accuracy: '86.2%', map50: 'N/A', latency: '22ms', size: '18 MB', rank: '5' }
  ]
};
