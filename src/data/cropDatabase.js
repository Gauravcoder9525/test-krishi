/**
 * Comprehensive Crop Database and Agronomic Matching Engine for Indian Agriculture
 * Covering 28+ Major Crops across 6 Core Agricultural Categories
 */

export const CROP_CATEGORIES = [
  { id: 'all', nameEn: 'All Categories', nameHi: 'सभी श्रेणियां', icon: '🌾' },
  { id: 'vegetables', nameEn: 'Vegetables & Greens', nameHi: 'सब्जियां व साग', icon: '🥬' },
  { id: 'cereals', nameEn: 'Cereals & Millets (श्रीअन्न)', nameHi: 'अनाज व श्रीअन्न', icon: '🌾' },
  { id: 'pulses', nameEn: 'Pulses & Legumes', nameHi: 'दलहन (दालें)', icon: '🫘' },
  { id: 'oilseeds', nameEn: 'Oilseeds', nameHi: 'तिलहन (तेल फसलें)', icon: '🌻' },
  { id: 'cash', nameEn: 'Cash & Commercial', nameHi: 'व्यावसायिक व नकदी फसलें', icon: '💰' },
  { id: 'spices', nameEn: 'Spices & Medicinal', nameHi: 'मसाले व औषधीय फसलें', icon: '🌿' }
];

export const cropDatabase = [
  // ==========================================
  // 1. VEGETABLES & GREENS (सब्जियां)
  // ==========================================
  {
    id: "chilli",
    category: "vegetables",
    categoryNameEn: "Vegetables & Greens",
    categoryNameHi: "सब्जियां व साग",
    nameEn: "Chilli (Mirchi)",
    nameHi: "हरी मिर्च (Chilli)",
    icon: "🌶️",
    soilTypes: ["Loamy", "Sandy Loam", "Clay Loam", "Black Soil", "Alluvial"],
    waterReq: "Medium",
    waterReqTextEn: "Medium (Drip Irrigation Recommended, 8-10 days interval)",
    waterReqTextHi: "मध्यम (ड्रिप सिंचाई सर्वोत्तम, 8-10 दिन अंतराल)",
    seasons: ["Kharif", "Rabi", "Summer"],
    minAcres: 0.5,
    avgProfit: "₹85,000 / acre",
    profitVal: 85000,
    grossRevenue: "₹1,45,000 / acre",
    inputCost: "₹60,000 / acre",
    expectedYield: "70 - 90 Quintals / acre (Green)",
    mspSupported: false,
    riskEn: "Medium",
    riskHi: "मध्यम",
    demandEn: "High ↑ (+14% in Regional Mandi)",
    demandHi: "उच्च ↑ (स्थानीय मंडी में +14%)",
    weatherSuitabilityEn: "Excellent (22°C - 32°C)",
    weatherSuitabilityHi: "उत्कृष्ट (22°C - 32°C)",
    growthCycleEn: "120 - 150 Days (Multiple Pickings)",
    growthCycleHi: "120 - 150 दिन (लगातार तुड़ाई)",
    sowingMonthsEn: "June-July (Kharif) / Oct-Nov (Rabi) / Feb-Mar (Summer)",
    sowingMonthsHi: "जून-जुलाई (खरीफ) / अक्टूबर-नवंबर (रबी) / फरवरी-मार्च (जायद)",
    idealStates: ["Uttar Pradesh", "Andhra Pradesh", "Karnataka", "Madhya Pradesh", "Maharashtra", "Gujarat", "Rajasthan", "Punjab", "Haryana", "Bihar", "All"],
    reasonsEn: [
      "Favorable local humidity and warm temperature profile",
      "Loamy soil provides optimal drainage preventing root rot (Phytophthora)",
      "High regional mandi demand with ₹7,500 - ₹8,200/q forecast",
      "Excellent return on micro-irrigation / drip setup (saves 40% water)"
    ],
    reasonsHi: [
      "अनुकूल आर्द्रता और 25°C से 32°C के बीच का तापमान",
      "दोमट मिट्टी में जल निकासी अच्छी होने से जड़ गलन का खतरा कम",
      "क्षेत्रीय मंडी में उच्च मांग और ₹7,500 - ₹8,200/क्विंटल का अनुमानित भाव",
      "ड्रिप सिंचाई के साथ 40% पानी की बचत और 25% अधिक उपज"
    ],
    summaryEn: "Chilli is an exceptionally high-margin commercial vegetable offering multiple harvesting cycles and strong consumer demand in urban markets.",
    summaryHi: "हरी मिर्च लगातार कई तुड़ाई और मजबूत मंडी मांग के साथ छोटे व मध्यम किसानों के लिए सर्वाधिक लाभकारी सब्जियों में से एक है।"
  },
  {
    id: "tomato",
    category: "vegetables",
    categoryNameEn: "Vegetables & Greens",
    categoryNameHi: "सब्जियां व साग",
    nameEn: "Tomato (Tamatar)",
    nameHi: "टमाटर (Tomato)",
    icon: "🍅",
    soilTypes: ["Loamy", "Sandy Loam", "Alluvial", "Red Soil"],
    waterReq: "Medium",
    waterReqTextEn: "Medium (Regular Drip Irrigation, sensitive to waterlogging)",
    waterReqTextHi: "मध्यम (नियमित ड्रिप सिंचाई, जलजमाव से बचाव आवश्यक)",
    seasons: ["Kharif", "Rabi", "Summer"],
    minAcres: 0.5,
    avgProfit: "₹95,000 / acre",
    profitVal: 95000,
    grossRevenue: "₹1,65,000 / acre",
    inputCost: "₹70,000 / acre",
    expectedYield: "150 - 220 Quintals / acre",
    mspSupported: false,
    riskEn: "Medium-High",
    riskHi: "मध्यम से उच्च",
    demandEn: "High Volatility (Peaks up to ₹45/kg)",
    demandHi: "उच्च मांग व भाव में तेजी (तेजी में ₹40-50/किग्रा)",
    weatherSuitabilityEn: "Good (20°C - 30°C)",
    weatherSuitabilityHi: "अनुकूल (20°C - 30°C)",
    growthCycleEn: "90 - 120 Days",
    growthCycleHi: "90 - 120 दिन",
    sowingMonthsEn: "July-Aug (Kharif) / Oct-Nov (Rabi)",
    sowingMonthsHi: "जुलाई-अगस्त (खरीफ) / अक्टूबर-नवंबर (रबी)",
    idealStates: ["Uttar Pradesh", "Maharashtra", "Karnataka", "Andhra Pradesh", "Madhya Pradesh", "Gujarat", "Haryana", "Punjab", "Bihar", "All"],
    reasonsEn: [
      "Top-tier profit margin per acre under managed fertigation and staking",
      "Multiple picking cycles spanning 8-10 weeks",
      "Huge off-season demand in neighboring metropolitan centers"
    ],
    reasonsHi: [
      "मल्चिंग व बांस-तार बंधाई से सब्जियों में सर्वाधिक मुनाफा",
      "8-10 हफ्तों तक लगातार नियमित तुड़ाई",
      "नजदीकी महानगरों और मंडियों में दैनिक भारी मांग"
    ],
    summaryEn: "Tomato delivers exceptional returns when timed right with off-season market windows and protected with drip fertigation.",
    summaryHi: "टमाटर संतुलित पोषण और ड्रिप तकनीक के साथ सही समय पर बाजार में उतारने पर रिकॉर्ड मुनाफा प्रदान करता है।"
  },
  {
    id: "potato",
    category: "vegetables",
    categoryNameEn: "Vegetables & Greens",
    categoryNameHi: "सब्जियां व साग",
    nameEn: "Potato (Aloo)",
    nameHi: "आलू (Potato)",
    icon: "🥔",
    soilTypes: ["Loamy", "Sandy Loam", "Sandy", "Alluvial"],
    waterReq: "High",
    waterReqTextEn: "High (5-6 timely furrow/sprinkler irrigations)",
    waterReqTextHi: "उच्च (5-6 बार समयानुसार सिंचाई)",
    seasons: ["Rabi"],
    minAcres: 1,
    avgProfit: "₹68,000 / acre",
    profitVal: 68000,
    grossRevenue: "₹1,20,000 / acre",
    inputCost: "₹52,000 / acre",
    expectedYield: "100 - 140 Quintals / acre",
    mspSupported: false,
    riskEn: "Low to Medium",
    riskHi: "कम से मध्यम",
    demandEn: "Stable (Cold storage & food processing demand)",
    demandHi: "स्थिर (कोल्ड स्टोरेज व चिप्स कंपनियों की मांग)",
    weatherSuitabilityEn: "Ideal (14°C - 22°C)",
    weatherSuitabilityHi: "आदर्श (14°C - 22°C)",
    growthCycleEn: "90 - 110 Days",
    growthCycleHi: "90 - 110 दिन",
    sowingMonthsEn: "October - November (Rabi)",
    sowingMonthsHi: "अक्टूबर से मध्य नवंबर (रबी)",
    idealStates: ["Uttar Pradesh", "West Bengal", "Bihar", "Punjab", "Gujarat", "Madhya Pradesh", "Haryana", "All"],
    reasonsEn: [
      "Rapid 90-day turnaround short duration cash crop",
      "Backed by robust regional cold chain infrastructure",
      "High bulk yield per acre with strong processing industry contracts"
    ],
    reasonsHi: [
      "मात्र 90 से 110 दिनों में पककर तैयार होने वाली नकदी फसल",
      "क्षेत्र में प्रचुर कोल्ड स्टोरेज और चिप्स कंपनियों के विकल्प",
      "सर्दियों में दोमट मिट्टी पर बंपर उत्पादन"
    ],
    summaryEn: "Potato offers quick capital turnaround and flexible storage options during the winter Rabi cycle.",
    summaryHi: "आलू रबी सीजन में कम समय में जमीन खाली करके अच्छी नकद आय और भंडारण की सुविधा देता है।"
  },
  {
    id: "onion",
    category: "vegetables",
    categoryNameEn: "Vegetables & Greens",
    categoryNameHi: "सब्जियां व साग",
    nameEn: "Onion (Pyaz)",
    nameHi: "प्याज (Onion)",
    icon: "🧅",
    soilTypes: ["Loamy", "Sandy Loam", "Clay Loam", "Black Soil"],
    waterReq: "Medium",
    waterReqTextEn: "Medium (Frequent light irrigations, avoid water stagnation)",
    waterReqTextHi: "मध्यम (हल्की और बार-बार सिंचाई, जलभराव से बचाव)",
    seasons: ["Kharif", "Rabi", "Summer"],
    minAcres: 1,
    avgProfit: "₹78,000 / acre",
    profitVal: 78000,
    grossRevenue: "₹1,38,000 / acre",
    inputCost: "₹60,000 / acre",
    expectedYield: "100 - 130 Quintals / acre",
    mspSupported: false,
    riskEn: "Medium",
    riskHi: "मध्यम",
    demandEn: "High & Year-Round Consumer Essential",
    demandHi: "साल भर भारी मांग व निर्यात अवसर",
    weatherSuitabilityEn: "Good (18°C - 30°C)",
    weatherSuitabilityHi: "अनुकूल (18°C - 30°C)",
    growthCycleEn: "120 - 140 Days",
    growthCycleHi: "120 - 140 दिन",
    sowingMonthsEn: "Nov-Dec (Rabi Nursery) / May-June (Kharif)",
    sowingMonthsHi: "नवंबर-दिसंबर (रबी) / मई-जून (खरीफ)",
    idealStates: ["Maharashtra", "Madhya Pradesh", "Karnataka", "Gujarat", "Rajasthan", "Uttar Pradesh", "Bihar", "All"],
    reasonsEn: [
      "Consistent year-round demand in domestic and export markets",
      "Excellent shelf life for Rabi harvest (stored up to 5-6 months)",
      "High market upside during festive and post-monsoon months"
    ],
    reasonsHi: [
      "घरेलू रसोई व निर्यात मंडियों में 12 महीने पक्की मांग",
      "रबी प्याज को 5-6 महीने तक आसानी से स्टोर करने की सुविधा",
      "बाजार में भाव चढ़ने पर अप्रत्याशित मुनाफा कमाने का मौका"
    ],
    summaryEn: "Onion provides steady commercial value with storability advantages that allow farmers to sell when prices peak.",
    summaryHi: "प्याज भंडारण क्षमता और उच्च बाजार भाव के कारण किसानों को बेहतरीन मुनाफा देने में सक्षम है।"
  },
  {
    id: "cauliflower",
    category: "vegetables",
    categoryNameEn: "Vegetables & Greens",
    categoryNameHi: "सब्जियां व साग",
    nameEn: "Cauliflower (Phool Gobhi)",
    nameHi: "फूलगोभी (Cauliflower)",
    icon: "🥦",
    soilTypes: ["Loamy", "Sandy Loam", "Clay Loam"],
    waterReq: "Medium",
    waterReqTextEn: "Medium (Regular moisture, 6-8 irrigations)",
    waterReqTextHi: "मध्यम (लगातार नमी, 6-8 सिंचाई)",
    seasons: ["Kharif", "Rabi"],
    minAcres: 0.5,
    avgProfit: "₹62,000 / acre",
    profitVal: 62000,
    grossRevenue: "₹1,05,000 / acre",
    inputCost: "₹43,000 / acre",
    expectedYield: "80 - 120 Quintals / acre",
    mspSupported: false,
    riskEn: "Low to Medium",
    riskHi: "कम से मध्यम",
    demandEn: "High Winter Demand in Urban Mandis",
    demandHi: "सर्दियों में शहरी मंडियों में जबरदस्त मांग",
    weatherSuitabilityEn: "Optimal (15°C - 22°C)",
    weatherSuitabilityHi: "सर्वोत्तम (15°C - 22°C)",
    growthCycleEn: "75 - 95 Days",
    growthCycleHi: "75 - 95 दिन (अति शीघ्र तैयार)",
    sowingMonthsEn: "Aug-Sep (Early) / Oct-Nov (Main Season)",
    sowingMonthsHi: "अगस्त-सितंबर (अगेती) / अक्टूबर-नवंबर (मुख्य रबी)",
    idealStates: ["Uttar Pradesh", "Bihar", "West Bengal", "Punjab", "Haryana", "Madhya Pradesh", "All"],
    reasonsEn: [
      "Extremely fast 75-85 day crop duration enables multi-cropping",
      "Early season sowing yields premium price in regional markets",
      "Low susceptibility to deep soil pests"
    ],
    reasonsHi: [
      "मात्र 75 से 90 दिनों में तैयार होकर खेत को तुरंत खाली करती है",
      "अगेती किस्मों में मंडियों में दोगुना भाव मिलता है",
      "सब्जी चक्र (Crop Rotation) के लिए अत्यंत मुफीद"
    ],
    summaryEn: "Cauliflower is a fast-turnaround vegetable ideal for intensive multi-cropping schedules.",
    summaryHi: "फूलगोभी कम समय में खेत खाली करके त्वरित नकद आमदनी देने वाली शानदार सब्जी है।"
  },
  {
    id: "okra",
    category: "vegetables",
    categoryNameEn: "Vegetables & Greens",
    categoryNameHi: "सब्जियां व साग",
    nameEn: "Okra / Ladyfinger (Bhindi)",
    nameHi: "भिंडी (Okra)",
    icon: "🌱",
    soilTypes: ["Loamy", "Sandy Loam", "Clay Loam"],
    waterReq: "Medium",
    waterReqTextEn: "Medium (Weekly irrigation in summer, drainage in rainy season)",
    waterReqTextHi: "मध्यम (गर्मियों में साप्ताहिक पानी, बरसात में जल निकासी)",
    seasons: ["Kharif", "Summer"],
    minAcres: 0.5,
    avgProfit: "₹58,000 / acre",
    profitVal: 58000,
    grossRevenue: "₹96,000 / acre",
    inputCost: "₹38,000 / acre",
    expectedYield: "45 - 65 Quintals / acre",
    mspSupported: false,
    riskEn: "Low",
    riskHi: "कम",
    demandEn: "High Daily Mandi Demand",
    demandHi: "दैनिक स्थानीय मंडी में लगातार मांग",
    weatherSuitabilityEn: "Warm (24°C - 35°C)",
    weatherSuitabilityHi: "गर्म (24°C - 35°C)",
    growthCycleEn: "90 - 110 Days (Daily Pickings)",
    growthCycleHi: "90 - 110 दिन (प्रतिदिन तुड़ाई)",
    sowingMonthsEn: "Feb-March (Summer) / June-July (Kharif)",
    sowingMonthsHi: "फरवरी-मार्च (जायद) / जून-जुलाई (खरीफ)",
    idealStates: ["Uttar Pradesh", "Gujarat", "Maharashtra", "Andhra Pradesh", "Bihar", "West Bengal", "All"],
    reasonsEn: [
      "Daily cash flow crop through continuous alternate-day harvests",
      "High heat tolerance suitable for Zaid summer and monsoon months",
      "Low initial capital requirement"
    ],
    reasonsHi: [
      "हर दूसरे दिन तुड़ाई से किसान को नियमित दैनिक नकद आमदनी",
      "गर्मी और उमस को आसानी से सहन करने वाली मजबूत फसल",
      "कम लागत में अच्छी आय की गारंटी"
    ],
    summaryEn: "Okra offers consistent daily liquid cash flow and high heat tolerance during summer and monsoon cycles.",
    summaryHi: "भिंडी नियमित नकद आमदनी और कम लागत के साथ गर्मियों व मानसून के लिए बेहतरीन फसल है।"
  },

  // ==========================================
  // 2. CEREALS & MILLETS (अनाज व श्रीअन्न)
  // ==========================================
  {
    id: "wheat",
    category: "cereals",
    categoryNameEn: "Cereals & Millets",
    categoryNameHi: "अनाज व श्रीअन्न",
    nameEn: "Wheat (Gehun)",
    nameHi: "गेहूं (Wheat)",
    icon: "🌾",
    soilTypes: ["Loamy", "Clay Loam", "Clay", "Alluvial", "Sandy Loam"],
    waterReq: "Medium",
    waterReqTextEn: "Medium (4-5 critical stage irrigations: CRI, Tillering, Booting, Milking)",
    waterReqTextHi: "मध्यम (4-5 बार मुख्य चरणों में सिंचाई: सीआरआई, कल्ले फूटते समय, दाना भरते समय)",
    seasons: ["Rabi"],
    minAcres: 1,
    avgProfit: "₹48,000 / acre",
    profitVal: 48000,
    grossRevenue: "₹72,000 / acre",
    inputCost: "₹24,000 / acre",
    expectedYield: "20 - 26 Quintals / acre",
    mspSupported: true,
    riskEn: "Very Low (Guaranteed MSP)",
    riskHi: "अति न्यून (100% सरकारी MSP सुरक्षा)",
    demandEn: "Guaranteed FCI & Mandi Procurement",
    demandHi: "निश्चित सरकारी खरीद (FCI) एवं बाजार मांग",
    weatherSuitabilityEn: "Optimal (12°C - 24°C)",
    weatherSuitabilityHi: "सर्वोत्तम (12°C - 24°C)",
    growthCycleEn: "130 - 150 Days",
    growthCycleHi: "130 - 150 दिन",
    sowingMonthsEn: "November (Rabi)",
    sowingMonthsHi: "नवंबर (रबी का मुख्य महीना)",
    idealStates: ["Uttar Pradesh", "Punjab", "Haryana", "Madhya Pradesh", "Rajasthan", "Bihar", "Gujarat", "All"],
    reasonsEn: [
      "100% assured price floor with central government MSP procurement",
      "Unmatched food grain security for family plus essential dry straw (Bhusa) for livestock",
      "Extremely low risk with standard pest/disease resilience"
    ],
    reasonsHi: [
      "सरकारी क्रय केंद्रों पर 100% तय मूल्य (MSP) पर खरीद की गारंटी",
      "परिवार के लिए साल भर का अन्न और पशुओं के लिए पौष्टिक सूखा भूसा",
      "मौसम के उतार-चढ़ाव को सहने वाली सबसे भरोसेमंद और कम जोखिम वाली फसल"
    ],
    summaryEn: "Wheat remains India's staple benchmark crop delivering guaranteed price safety, food security, and valuable straw byproduct.",
    summaryHi: "गेहूं न्यूनतम जोखिम, पक्की सरकारी एमएसपी खरीद और आवश्यक भूसे के लिए सबसे सुरक्षित विकल्प है।"
  },
  {
    id: "paddy",
    category: "cereals",
    categoryNameEn: "Cereals & Millets",
    categoryNameHi: "अनाज व श्रीअन्न",
    nameEn: "Paddy / Basmati Rice (Dhan)",
    nameHi: "धान / बासमती चावल (Dhan)",
    icon: "🌾",
    soilTypes: ["Clay", "Clay Loam", "Loamy", "Alluvial"],
    waterReq: "High",
    waterReqTextEn: "High (Requires submerged water or AWD alternate wetting & drying)",
    waterReqTextHi: "उच्च (खेत में पानी ठहराव या AWD सिंचाई आवश्यक)",
    seasons: ["Kharif"],
    minAcres: 1,
    avgProfit: "₹52,000 / acre",
    profitVal: 52000,
    grossRevenue: "₹82,000 / acre",
    inputCost: "₹30,000 / acre",
    expectedYield: "24 - 32 Quintals / acre",
    mspSupported: true,
    riskEn: "Low to Medium",
    riskHi: "कम से मध्यम",
    demandEn: "High (MSP Procurement + Basmati Export Premium)",
    demandHi: "उच्च (सरकारी MSP + बासमती निर्यात मांग)",
    weatherSuitabilityEn: "Monsoon Warm (25°C - 35°C)",
    weatherSuitabilityHi: "मानसून गर्म (25°C - 35°C)",
    growthCycleEn: "125 - 145 Days",
    growthCycleHi: "125 - 145 दिन",
    sowingMonthsEn: "June - July (Kharif)",
    sowingMonthsHi: "जून - जुलाई (खरीफ)",
    idealStates: ["Uttar Pradesh", "Punjab", "Haryana", "West Bengal", "Bihar", "Andhra Pradesh", "Telangana", "Odisha", "Chhattisgarh", "All"],
    reasonsEn: [
      "Assured government procurement with MSP support",
      "Basmati aromatic varieties fetch 40-70% higher price in private mandis",
      "Thrives in high monsoon rainfall regions with clay retention"
    ],
    reasonsHi: [
      "सरकारी क्रय केंद्रों पर MSP की पूर्ण सुरक्षा",
      "बासमती किस्मों में प्राइवेट मंडियों में 40-70% तक अधिक भाव",
      "चिकनी व दोमट मिट्टी में प्रचुर बारिश के साथ बंपर पैदावार"
    ],
    summaryEn: "Paddy is the anchor monsoon crop for water-abundant regions, offering both MSP safety and lucrative Basmati export premiums.",
    summaryHi: "प्रचुर पानी और मानसून वाले क्षेत्रों में धान एमएसपी सुरक्षा और बासमती निर्यात के लिए सबसे मुख्य फसल है।"
  },
  {
    id: "maize",
    category: "cereals",
    categoryNameEn: "Cereals & Millets",
    categoryNameHi: "अनाज व श्रीअन्न",
    nameEn: "Maize / Corn (Makka)",
    nameHi: "मक्का (Maize)",
    icon: "🌽",
    soilTypes: ["Loamy", "Sandy Loam", "Alluvial", "Red Soil"],
    waterReq: "Medium",
    waterReqTextEn: "Medium (3-4 irrigations, strictly sensitive to waterlogging)",
    waterReqTextHi: "मध्यम (3-4 सिंचाई, खेत में पानी नहीं भरना चाहिए)",
    seasons: ["Kharif", "Rabi", "Summer"],
    minAcres: 1,
    avgProfit: "₹50,000 / acre",
    profitVal: 50000,
    grossRevenue: "₹76,000 / acre",
    inputCost: "₹26,000 / acre",
    expectedYield: "28 - 38 Quintals / acre",
    mspSupported: true,
    riskEn: "Low",
    riskHi: "कम",
    demandEn: "High (Poultry feed, starch & Ethanol blending boost)",
    demandHi: "उच्च (मुर्गी दाना, स्टार्च व एथेनॉल कंपनियों की भारी मांग)",
    weatherSuitabilityEn: "Good (20°C - 32°C)",
    weatherSuitabilityHi: "अनुकूल (20°C - 32°C)",
    growthCycleEn: "95 - 115 Days",
    growthCycleHi: "95 - 115 दिन",
    sowingMonthsEn: "June-July (Kharif) / Oct-Nov (Rabi) / Feb-March (Spring)",
    sowingMonthsHi: "जून-जुलाई (खरीफ) / अक्टूबर-नवंबर (रबी) / फरवरी-मार्च (जायद)",
    idealStates: ["Bihar", "Madhya Pradesh", "Karnataka", "Maharashtra", "Rajasthan", "Uttar Pradesh", "Telangana", "Andhra Pradesh", "All"],
    reasonsEn: [
      "Massive industrial demand from poultry feed and government Ethanol blending policies",
      "Short 100-day duration allows 3 crop cycles per year",
      "Lower water requirement than paddy (saves 60% water)"
    ],
    reasonsHi: [
      "एथेनॉल और पोल्ट्री फीड उद्योग से लगातार बढ़ती औद्योगिक मांग",
      "मात्र 100 दिनों में पकने से 1 साल में 3 फसलें लेने की सुविधा",
      "धान के मुकाबले 60% कम पानी की जरूरत"
    ],
    summaryEn: "Maize is a versatile high-yield cereal benefitting from the booming ethanol and poultry feed sectors.",
    summaryHi: "मक्का एथेनॉल और पोल्ट्री उद्योग की बढ़ती मांग के साथ कम पानी में अधिक उत्पादन देने वाली आधुनिक फसल है।"
  },
  {
    id: "bajra",
    category: "cereals",
    categoryNameEn: "Cereals & Millets",
    categoryNameHi: "अनाज व श्रीअन्न",
    nameEn: "Pearl Millet (Bajra / श्रीअन्न)",
    nameHi: "बाजरा (Pearl Millet / श्रीअन्न)",
    icon: "🌾",
    soilTypes: ["Sandy", "Sandy Loam", "Loamy", "Red Soil"],
    waterReq: "Low",
    waterReqTextEn: "Low (Drought Hardy, 1-2 irrigations or purely rainfed)",
    waterReqTextHi: "अत्यल्प (सूखा सहनशील, 1-2 सिंचाई या केवल बारिश)",
    seasons: ["Kharif", "Summer"],
    minAcres: 1,
    avgProfit: "₹38,000 / acre",
    profitVal: 38000,
    grossRevenue: "₹54,000 / acre",
    inputCost: "₹16,000 / acre",
    expectedYield: "14 - 20 Quintals / acre",
    mspSupported: true,
    riskEn: "Extremely Low",
    riskHi: "न्यूनतम जोखिम",
    demandEn: "Surging (National Millet Mission & Health Superfood)",
    demandHi: "तेजी (श्रीअन्न मिलेट मिशन व हेल्थ सुपरफूड मांग)",
    weatherSuitabilityEn: "High Heat Resistant (28°C - 42°C)",
    weatherSuitabilityHi: "अत्यधिक गर्मी सहनशील (28°C - 42°C)",
    growthCycleEn: "75 - 90 Days",
    growthCycleHi: "75 - 90 दिन",
    sowingMonthsEn: "June - July (Monsoon)",
    sowingMonthsHi: "जून - जुलाई (मानसून शुरुआत)",
    idealStates: ["Rajasthan", "Uttar Pradesh", "Haryana", "Gujarat", "Madhya Pradesh", "Maharashtra", "All"],
    reasonsEn: [
      "Thrives in arid sandy soils with minimal water and extreme heat tolerance",
      "Promoted under Government Shree Anna (Millets) scheme with assured MSP",
      "Very low input cost with valuable dry fodder yield"
    ],
    reasonsHi: [
      "बलुई व कम उपजाऊ मिट्टी में भी भीषण गर्मी में शानदार पैदावार",
      "भारत सरकार के श्रीअन्न मिशन के तहत MSP पर मजबूत खरीद",
      "नाममात्र खाद-दवा का खर्च और पशुओं के लिए बेहतरीन कड़बी (चारा)"
    ],
    summaryEn: "Bajra is the supreme climate-resilient superfood millet that thrives in dry, sandy soils with low input investment.",
    summaryHi: "बाजरा कम बारिश और रेतीली मिट्टी में न्यूनतम लागत पर पक्का मुनाफा देने वाला पोषक श्रीअन्न है।"
  },
  {
    id: "jowar",
    category: "cereals",
    categoryNameEn: "Cereals & Millets",
    categoryNameHi: "अनाज व श्रीअन्न",
    nameEn: "Sorghum (Jowar / श्रीअन्न)",
    nameHi: "ज्वार (Sorghum / श्रीअन्न)",
    icon: "🌾",
    soilTypes: ["Clay Loam", "Black Soil", "Loamy", "Sandy Loam"],
    waterReq: "Low",
    waterReqTextEn: "Low to Moderate (Highly drought resistant)",
    waterReqTextHi: "कम से मध्यम (सूखा सहने में सक्षम)",
    seasons: ["Kharif", "Rabi"],
    minAcres: 1,
    avgProfit: "₹42,000 / acre",
    profitVal: 42000,
    grossRevenue: "₹60,000 / acre",
    inputCost: "₹18,000 / acre",
    expectedYield: "12 - 18 Quintals / acre",
    mspSupported: true,
    riskEn: "Low",
    riskHi: "कम",
    demandEn: "High (Millet Mission + Nutri-cereal awareness)",
    demandHi: "उच्च (मिलेट मिशन व न्यूट्री-सीरियल मांग)",
    weatherSuitabilityEn: "Resilient (25°C - 38°C)",
    weatherSuitabilityHi: "मजबूत (25°C - 38°C)",
    growthCycleEn: "100 - 120 Days",
    growthCycleHi: "100 - 120 दिन",
    sowingMonthsEn: "June-July (Kharif) / Sep-Oct (Rabi)",
    sowingMonthsHi: "जून-जुलाई (खरीफ) / सितंबर-अक्टूबर (रबी)",
    idealStates: ["Maharashtra", "Karnataka", "Madhya Pradesh", "Andhra Pradesh", "Rajasthan", "Uttar Pradesh", "Gujarat", "All"],
    reasonsEn: [
      "Deep rooting system extracts residual moisture from Black & Clay soils",
      "High grain value plus superior livestock green/dry fodder",
      "Government MSP protection and zero pesticide necessity"
    ],
    reasonsHi: [
      "गहरी जड़ों के कारण काली व दोमट मिट्टी में बिना ज्यादा पानी के उत्पादन",
      "अनाज के साथ-साथ दुधारू पशुओं के लिए सबसे पौष्टिक हरा व सूखा चारा",
      "एमएसपी समर्थन और कीटनाशकों की न के बराबर आवश्यकता"
    ],
    summaryEn: "Jowar is a dual-purpose nutri-cereal providing excellent grain returns and premium animal fodder in semi-arid tracts.",
    summaryHi: "ज्वार कम पानी में अनाज और दुधारू पशुओं के लिए उत्तम चारे का दोहरा लाभ देती है।"
  },

  // ==========================================
  // 3. PULSES & LEGUMES (दलहन / दालें)
  // ==========================================
  {
    id: "chana",
    category: "pulses",
    categoryNameEn: "Pulses & Legumes",
    categoryNameHi: "दलहन (दालें)",
    nameEn: "Chickpea / Bengal Gram (Chana)",
    nameHi: "चना (Chickpea / Chana)",
    icon: "🫘",
    soilTypes: ["Loamy", "Clay Loam", "Black Soil", "Sandy Loam", "Alluvial"],
    waterReq: "Low",
    waterReqTextEn: "Low (Requires only 1-2 irrigations: Pre-flowering & Pod development)",
    waterReqTextHi: "कम (केवल 1-2 सिंचाई: फूल आने से पहले व दाना बनते समय)",
    seasons: ["Rabi"],
    minAcres: 1,
    avgProfit: "₹52,000 / acre",
    profitVal: 52000,
    grossRevenue: "₹72,000 / acre",
    inputCost: "₹20,000 / acre",
    expectedYield: "8 - 12 Quintals / acre",
    mspSupported: true,
    riskEn: "Low",
    riskHi: "कम",
    demandEn: "High (National Pulse Mission & MSP Procurement)",
    demandHi: "उच्च (सरकारी दलहन खरीद व बेसन मिलों की मांग)",
    weatherSuitabilityEn: "Ideal (15°C - 25°C)",
    weatherSuitabilityHi: "आदर्श (15°C - 25°C)",
    growthCycleEn: "100 - 120 Days",
    growthCycleHi: "100 - 120 दिन",
    sowingMonthsEn: "October - November (Rabi)",
    sowingMonthsHi: "अक्टूबर से मध्य नवंबर (रबी)",
    idealStates: ["Madhya Pradesh", "Rajasthan", "Maharashtra", "Uttar Pradesh", "Karnataka", "Gujarat", "Andhra Pradesh", "All"],
    reasonsEn: [
      "Biological nitrogen fixation restores natural soil fertility for subsequent crops",
      "Low water and input costs with strong MSP safety floor",
      "High market rates for Desi and Kabuli commercial varieties"
    ],
    reasonsHi: [
      "जड़ों में नाइट्रोजन गांठों से जमीन की उर्वरता में स्वतः भारी वृद्धि",
      "कम पानी और कम खर्च में पक्का सरकारी समर्थन मूल्य (MSP)",
      "देसी व काबुली चने की साल भर मंडियों में स्थिर व तेज मांग"
    ],
    summaryEn: "Chickpea is India's leading winter pulse, fixing atmospheric nitrogen while delivering high profit on low irrigation.",
    summaryHi: "चना मिट्टी को प्राकृतिक नाइट्रोजन देकर उपजाऊ बनाता है और कम पानी में रबी सीजन में बेहतरीन आमदनी देता है।"
  },
  {
    id: "arhar",
    category: "pulses",
    categoryNameEn: "Pulses & Legumes",
    categoryNameHi: "दलहन (दालें)",
    nameEn: "Pigeon Pea / Tur (Arhar)",
    nameHi: "अरहर / तूर (Arhar / Tur)",
    icon: "🫘",
    soilTypes: ["Loamy", "Clay Loam", "Black Soil", "Sandy Loam"],
    waterReq: "Low",
    waterReqTextEn: "Low to Moderate (Deep taproot drought survival)",
    waterReqTextHi: "कम से मध्यम (गहरी मूसला जड़ से सूखा सहनशील)",
    seasons: ["Kharif"],
    minAcres: 1,
    avgProfit: "₹65,000 / acre",
    profitVal: 65000,
    grossRevenue: "₹92,000 / acre",
    inputCost: "₹27,000 / acre",
    expectedYield: "8 - 12 Quintals / acre",
    mspSupported: true,
    riskEn: "Low",
    riskHi: "कम",
    demandEn: "High (Severe domestic pulse deficit, record ₹10,000+/q)",
    demandHi: "अति उच्च (दालों की भारी कमी, रिकॉर्ड ₹9,500-₹11,000/क्विंटल भाव)",
    weatherSuitabilityEn: "Good (22°C - 35°C)",
    weatherSuitabilityHi: "अनुकूल (22°C - 35°C)",
    growthCycleEn: "150 - 180 Days (Early varieties: 120-140 days)",
    growthCycleHi: "150 - 180 दिन (अगेती संकर: 130-140 दिन)",
    sowingMonthsEn: "June - July (Onset of Monsoon)",
    sowingMonthsHi: "जून - जुलाई (मानसून शुरुआत)",
    idealStates: ["Maharashtra", "Madhya Pradesh", "Karnataka", "Uttar Pradesh", "Gujarat", "Telangana", "Jharkhand", "All"],
    reasonsEn: [
      "Exceptional market prices due to structural domestic supply shortage",
      "Deep taproots break hard soil pans and fix 40 kg atmospheric Nitrogen/acre",
      "Excellent intercropping partner with Soybean, Cotton, or Maize"
    ],
    reasonsHi: [
      "देश में अरहर दाल की भारी मांग के कारण मंडियों में रिकॉर्ड ऊंचे भाव",
      "गहरी जड़ें जमीन के सख्त स्तर को तोड़ती हैं और मिट्टी को समृद्ध करती हैं",
      "सोयाबीन, मक्का या कपास के साथ अंतर्वर्ती (Intercropping) के लिए आदर्श"
    ],
    summaryEn: "Pigeon Pea offers premium pulse returns and deep soil enrichment against a backdrop of historic national supply deficits.",
    summaryHi: "अरहर दालों में सबसे ज्यादा बिकने वाली और मिट्टी को प्राकृतिक खाद प्रदान करने वाली दीर्घकालिक नकदी दलहन फसल है।"
  },
  {
    id: "moong",
    category: "pulses",
    categoryNameEn: "Pulses & Legumes",
    categoryNameHi: "दलहन (दालें)",
    nameEn: "Green Gram (Moong)",
    nameHi: "मूंग (Green Gram / Moong)",
    icon: "🫘",
    soilTypes: ["Loamy", "Sandy Loam", "Alluvial", "Clay Loam"],
    waterReq: "Low",
    waterReqTextEn: "Low (2-3 light irrigations in summer, rainfed in Kharif)",
    waterReqTextHi: "कम (जायद में 2-3 हल्की सिंचाई, खरीफ में बारिश आधारित)",
    seasons: ["Kharif", "Summer"],
    minAcres: 0.5,
    avgProfit: "₹45,000 / acre",
    profitVal: 45000,
    grossRevenue: "₹62,000 / acre",
    inputCost: "₹17,000 / acre",
    expectedYield: "5 - 8 Quintals / acre",
    mspSupported: true,
    riskEn: "Low",
    riskHi: "कम",
    demandEn: "High (MSP + Health Conscious Urban Demand)",
    demandHi: "उच्च (MSP सुरक्षा + दैनिक घरेलू मांग)",
    weatherSuitabilityEn: "Warm (25°C - 35°C)",
    weatherSuitabilityHi: "गर्म (25°C - 35°C)",
    growthCycleEn: "60 - 70 Days (Ultra Short Duration)",
    growthCycleHi: "60 - 70 दिन (अति अल्पकालिक फसल)",
    sowingMonthsEn: "March - April (Summer Zaid) / July (Kharif)",
    sowingMonthsHi: "मार्च - अप्रैल (जायद) / जुलाई (खरीफ)",
    idealStates: ["Rajasthan", "Madhya Pradesh", "Maharashtra", "Uttar Pradesh", "Punjab", "Haryana", "Gujarat", "Bihar", "All"],
    reasonsEn: [
      "Ultra-short 60-day turnaround fits perfectly between Wheat and Paddy cycles",
      "Adds 30-35 kg nitrogen per acre, reducing chemical fertilizer cost for next crop",
      "Requires minimal irrigation during summer months"
    ],
    reasonsHi: [
      "मात्र 60 से 65 दिनों में तैयार होकर गेहूं कटाई के बाद खाली खेत में अतिरिक्त आय",
      "खेत में हरी खाद और नाइट्रोजन जोड़कर अगली फसल की यूरिया लागत घटाती है",
      "गर्मियों में कम पानी में तैयार होने वाला सर्वोत्तम विकल्प"
    ],
    summaryEn: "Moong is the ultimate 60-day catch crop that turns vacant summer land into high-value grain and natural soil fertility.",
    summaryHi: "मूंग गेहूं कटाई के बाद खाली पड़े खेत में 60 दिन में अतिरिक्त कमाई और हरी खाद देने वाली सबसे तेज फसल है।"
  },
  {
    id: "urad",
    category: "pulses",
    categoryNameEn: "Pulses & Legumes",
    categoryNameHi: "दलहन (दालें)",
    nameEn: "Black Gram (Urad)",
    nameHi: "उड़द (Black Gram / Urad)",
    icon: "🫘",
    soilTypes: ["Loamy", "Clay Loam", "Black Soil", "Sandy Loam"],
    waterReq: "Low",
    waterReqTextEn: "Low (Rainfed in Kharif, 2-3 irrigations in Summer)",
    waterReqTextHi: "कम (खरीफ में वर्षा आधारित, गर्मियों में 2-3 सिंचाई)",
    seasons: ["Kharif", "Summer"],
    minAcres: 1,
    avgProfit: "₹46,000 / acre",
    profitVal: 46000,
    grossRevenue: "₹65,000 / acre",
    inputCost: "₹19,000 / acre",
    expectedYield: "5 - 7 Quintals / acre",
    mspSupported: true,
    riskEn: "Low",
    riskHi: "कम",
    demandEn: "High (Dal Mills & Southern breakfast staples demand)",
    demandHi: "उच्च (दाल मिलों व दक्षिण भारतीय व्यंजनों के लिए भारी मांग)",
    weatherSuitabilityEn: "Warm (25°C - 35°C)",
    weatherSuitabilityHi: "गर्म (25°C - 35°C)",
    growthCycleEn: "70 - 85 Days",
    growthCycleHi: "70 - 85 दिन",
    sowingMonthsEn: "June - July (Kharif) / Feb - March (Summer)",
    sowingMonthsHi: "जून - जुलाई (खरीफ) / फरवरी - मार्च (जायद)",
    idealStates: ["Madhya Pradesh", "Uttar Pradesh", "Andhra Pradesh", "Maharashtra", "Tamil Nadu", "Rajasthan", "All"],
    reasonsEn: [
      "Short 75-day crop cycle suitable for rapid rotation",
      "Strong industrial and culinary demand across North and South India",
      "Soil revitalizing root nodules reduce fertilizer reliance"
    ],
    reasonsHi: [
      "75 दिनों की अल्प अवधि में तैयार होकर जमीन को उपजाऊ बनाती है",
      "दाल मिलों और खाद्य उद्योग में लगातार मजबूत बाजार भाव",
      "कम पानी और सीमित रासायनिक खाद में तैयार"
    ],
    summaryEn: "Black Gram provides high-protein grain with rapid turnaround and positive residual soil nitrogen.",
    summaryHi: "उड़द कम समय में तैयार होकर अच्छी कीमत और खेत की सेहत सुधारने का बेहतरीन साधन है।"
  },

  // ==========================================
  // 4. OILSEEDS (तिलहन / तेल फसलें)
  // ==========================================
  {
    id: "mustard",
    category: "oilseeds",
    categoryNameEn: "Oilseeds",
    categoryNameHi: "तिलहन (तेल फसलें)",
    nameEn: "Mustard (Sarson / Rai)",
    nameHi: "सरसों / राई (Mustard)",
    icon: "🌼",
    soilTypes: ["Loamy", "Sandy Loam", "Sandy", "Clay Loam", "Alluvial"],
    waterReq: "Low",
    waterReqTextEn: "Low (Needs only 2-3 irrigations: Flowering & Siliqua development)",
    waterReqTextHi: "कम (केवल 2-3 बार पानी: फूल आते समय व फलियां बनते समय)",
    seasons: ["Rabi"],
    minAcres: 1,
    avgProfit: "₹55,000 / acre",
    profitVal: 55000,
    grossRevenue: "₹76,000 / acre",
    inputCost: "₹21,000 / acre",
    expectedYield: "8 - 12 Quintals / acre",
    mspSupported: true,
    riskEn: "Very Low",
    riskHi: "बहुत कम (MSP सुरक्षा)",
    demandEn: "High (MSP + National Edible Oil Mission)",
    demandHi: "उच्च (सरकारी MSP + खाद्य तेल मिलों की मांग)",
    weatherSuitabilityEn: "Ideal (15°C - 25°C)",
    weatherSuitabilityHi: "आदर्श (15°C - 25°C)",
    growthCycleEn: "110 - 130 Days",
    growthCycleHi: "110 - 130 दिन",
    sowingMonthsEn: "October - November (Rabi)",
    sowingMonthsHi: "अक्टूबर से मध्य नवंबर (रबी)",
    idealStates: ["Rajasthan", "Uttar Pradesh", "Haryana", "Madhya Pradesh", "Gujarat", "Punjab", "Bihar", "West Bengal", "All"],
    reasonsEn: [
      "Extremely low water consumption, perfect for low water zones",
      "National Edible Oil Mission ensures strong government MSP procurement floor",
      "Low input and pesticide expenditure compared to vegetables"
    ],
    reasonsHi: [
      "बेहद कम पानी की खपत, कम नलकूप या वर्षा-आधारित क्षेत्रों के लिए वरदान",
      "राष्ट्रीय खाद्य तेल मिशन के तहत सरकारी न्यूनतम समर्थन मूल्य (MSP) की पक्की गारंटी",
      "कीटनाशक और खाद पर न के बराबर खर्च"
    ],
    summaryEn: "Mustard is the safest low-risk crop with guaranteed MSP floor, minimal water reliance, and strong oil mill demand.",
    summaryHi: "सरसों सबसे सुरक्षित, न्यूनतम लागत और कम पानी में निश्चित लाभ देने वाली प्रमुख तिलहन फसल है।"
  },
  {
    id: "soybean",
    category: "oilseeds",
    categoryNameEn: "Oilseeds",
    categoryNameHi: "तिलहन (तेल फसलें)",
    nameEn: "Soybean (Soyabean)",
    nameHi: "सोयाबीन (Soybean)",
    icon: "🌱",
    soilTypes: ["Black Soil", "Clay Loam", "Loamy", "Alluvial"],
    waterReq: "Medium",
    waterReqTextEn: "Medium (Monsoon rainfed, needs good furrow drainage)",
    waterReqTextHi: "मध्यम (मानसून आधारित, खेत में जलजमाव नहीं होना चाहिए)",
    seasons: ["Kharif"],
    minAcres: 1,
    avgProfit: "₹48,000 / acre",
    profitVal: 48000,
    grossRevenue: "₹70,000 / acre",
    inputCost: "₹22,000 / acre",
    expectedYield: "8 - 12 Quintals / acre",
    mspSupported: true,
    riskEn: "Low to Medium",
    riskHi: "कम से मध्यम",
    demandEn: "High (Soy oil extraction & Soymeal DOC export demand)",
    demandHi: "उच्च (तेल निष्कर्षण व सोयामील निर्यात मांग)",
    weatherSuitabilityEn: "Monsoon Warm (24°C - 32°C)",
    weatherSuitabilityHi: "मानसून गर्म (24°C - 32°C)",
    growthCycleEn: "95 - 110 Days",
    growthCycleHi: "95 - 110 दिन",
    sowingMonthsEn: "June - July (Onset of Monsoon)",
    sowingMonthsHi: "जून - जुलाई (मानसून की पहली बारिश)",
    idealStates: ["Madhya Pradesh", "Maharashtra", "Rajasthan", "Karnataka", "Telangana", "Gujarat", "Uttar Pradesh", "All"],
    reasonsEn: [
      "Top monsoon cash crop for Central India black soil belts",
      "High global and domestic demand for soymeal de-oiled cake (DOC)",
      "Leguminous root nodules enrich soil for following Rabi Wheat/Mustard"
    ],
    reasonsHi: [
      "काली व भारी दोमट मिट्टी में खरीफ सीजन की सबसे लोकप्रिय नकदी फसल",
      "खाद्य तेल और पशु आहार (सोया DOC) निर्यात के लिए मजबूत बाजार",
      "जमीन में नाइट्रोजन छोड़कर अगली रबी फसल (गेहूं/सरसों) की लागत घटाती है"
    ],
    summaryEn: "Soybean dominates Central Indian Kharif agriculture, combining oil value with protein export demand and soil nitrogen fixing.",
    summaryHi: "सोयाबीन मानसून में कम लागत में तैयार होकर तेल व प्रोटीन उद्योग से पक्की आय सुनिश्चित करती है।"
  },
  {
    id: "groundnut",
    category: "oilseeds",
    categoryNameEn: "Oilseeds",
    categoryNameHi: "तिलहन (तेल फसलें)",
    nameEn: "Groundnut / Peanut (Moongphali)",
    nameHi: "मूंगफली (Groundnut)",
    icon: "🥜",
    soilTypes: ["Sandy Loam", "Loamy", "Sandy", "Red Soil"],
    waterReq: "Low",
    waterReqTextEn: "Low to Medium (Requires friable loose soil for pegging)",
    waterReqTextHi: "कम से मध्यम (फलियां जमीन में धंसने के लिए भुरभुरी मिट्टी आवश्यक)",
    seasons: ["Kharif", "Summer"],
    minAcres: 1,
    avgProfit: "₹58,000 / acre",
    profitVal: 58000,
    grossRevenue: "₹84,000 / acre",
    inputCost: "₹26,000 / acre",
    expectedYield: "10 - 15 Quintals / acre",
    mspSupported: true,
    riskEn: "Low",
    riskHi: "कम",
    demandEn: "High (Edible Oil, Peanut Butter & Export Quality)",
    demandHi: "उच्च (खाद्य तेल, पीनट बटर व निर्यात मांग)",
    weatherSuitabilityEn: "Warm (22°C - 32°C)",
    weatherSuitabilityHi: "गर्म (22°C - 32°C)",
    growthCycleEn: "105 - 125 Days",
    growthCycleHi: "105 - 125 दिन",
    sowingMonthsEn: "June - July (Kharif) / Jan - Feb (Summer)",
    sowingMonthsHi: "जून - जुलाई (खरीफ) / जनवरी - फरवरी (जायद)",
    idealStates: ["Gujarat", "Rajasthan", "Andhra Pradesh", "Tamil Nadu", "Karnataka", "Maharashtra", "Madhya Pradesh", "Uttar Pradesh", "All"],
    reasonsEn: [
      "Thrives in light sandy loam soils where heavy crops struggle",
      "High oil and export premium in domestic markets",
      "Leaves valuable protein-rich green haulm fodder for dairy cattle"
    ],
    reasonsHi: [
      "बलुई दोमट व हल्की मिट्टी में जहां अन्य फसलें कम होती हैं, वहां शानदार पैदावार",
      "पीनट बटर और खाद्य तेल उद्योगों में लगातार बढ़ते भाव",
      "मूंगफली की पत्तियां और तना दुधारू पशुओं के लिए उत्तम पौष्टिक चारा"
    ],
    summaryEn: "Groundnut excels in light sandy soils, delivering dual profits from oil-rich pods and protein-dense green fodder.",
    summaryHi: "मूंगफली हल्की व बलुई मिट्टी में कम पानी में उच्च मूल्य और पशुओं के लिए बेहतरीन चारा प्रदान करती है।"
  },
  {
    id: "sunflower",
    category: "oilseeds",
    categoryNameEn: "Oilseeds",
    categoryNameHi: "तिलहन (तेल फसलें)",
    nameEn: "Sunflower (Surajmukhi)",
    nameHi: "सूरजमुखी (Sunflower)",
    icon: "🌻",
    soilTypes: ["Loamy", "Clay Loam", "Black Soil", "Sandy Loam"],
    waterReq: "Low",
    waterReqTextEn: "Low to Moderate (3-4 irrigations: Buttoning, Flowering, Seed filling)",
    waterReqTextHi: "कम से मध्यम (3-4 हल्की सिंचाई: कली बनते समय, फूल खिलते समय, दाना भरते समय)",
    seasons: ["Kharif", "Rabi", "Summer"],
    minAcres: 1,
    avgProfit: "₹50,000 / acre",
    profitVal: 50000,
    grossRevenue: "₹72,000 / acre",
    inputCost: "₹22,000 / acre",
    expectedYield: "8 - 12 Quintals / acre",
    mspSupported: true,
    riskEn: "Low",
    riskHi: "कम",
    demandEn: "High (Heart-healthy refined edible oil demand)",
    demandHi: "उच्च (हार्ट-हेल्दी रिफाइंड तेल उद्योग की भारी मांग)",
    weatherSuitabilityEn: "Adaptable (18°C - 32°C)",
    weatherSuitabilityHi: "अनुकूलनीय (18°C - 32°C)",
    growthCycleEn: "85 - 100 Days",
    growthCycleHi: "85 - 100 दिन",
    sowingMonthsEn: "Jan-Feb (Spring) / June-July (Kharif) / Oct (Rabi)",
    sowingMonthsHi: "जनवरी-फरवरी (जायद) / जून-जुलाई (खरीफ) / अक्टूबर (रबी)",
    idealStates: ["Karnataka", "Maharashtra", "Andhra Pradesh", "Punjab", "Haryana", "Uttar Pradesh", "Bihar", "All"],
    reasonsEn: [
      "Photo-insensitive crop grown successfully in all three agricultural seasons",
      "Short 90-day maturity fits into tight crop rotation gaps",
      "Deep roots extract moisture from lower soil layers"
    ],
    reasonsHi: [
      "साल के तीनों सीजन (खरीफ, रबी, जायद) में उगाई जा सकने वाली बहुउपयोगी फसल",
      "मात्र 90 दिनों में पककर तैयार",
      "हार्ट-फ्रेंडली तेल के लिए कंपनियों द्वारा अच्छे दामों पर खरीद"
    ],
    summaryEn: "Sunflower is a photo-insensitive, quick-maturing oilseed that fits flexibly into any seasonal window.",
    summaryHi: "सूरजमुखी किसी भी मौसम में 90 दिन में तैयार होकर उच्च मूल्य देने वाली लचीली तिलहन फसल है।"
  },

  // ==========================================
  // 5. CASH & COMMERCIAL CROPS (नकदी फसलें)
  // ==========================================
  {
    id: "sugarcane",
    category: "cash",
    categoryNameEn: "Cash & Commercial",
    categoryNameHi: "व्यावसायिक व नकदी फसलें",
    nameEn: "Sugarcane (Ganna)",
    nameHi: "गन्ना (Sugarcane)",
    icon: "🎋",
    soilTypes: ["Loamy", "Clay Loam", "Alluvial", "Black Soil"],
    waterReq: "High",
    waterReqTextEn: "High (Requires regular canal / borewell irrigation or drip setup)",
    waterReqTextHi: "उच्च (नियमित नहर/नलकूप सिंचाई या ड्रिप सिंचाई आवश्यक)",
    seasons: ["Kharif", "Rabi", "Summer"],
    minAcres: 1,
    avgProfit: "₹82,000 / acre",
    profitVal: 82000,
    grossRevenue: "₹1,40,000 / acre",
    inputCost: "₹58,000 / acre",
    expectedYield: "350 - 450 Quintals / acre",
    mspSupported: true,
    riskEn: "Low (State SAP / Fair Price Mill Assured)",
    riskHi: "कम (राज्य समर्थित मूल्य SAP व मिल खरीद की गारंटी)",
    demandEn: "High (Sugar Mills + Ethanol Biofuel Mandate)",
    demandHi: "उच्च (चीनी मिलें व एथेनॉल जैव ईंधन नीति)",
    weatherSuitabilityEn: "Tropical Warm (25°C - 38°C)",
    weatherSuitabilityHi: "उष्णकटिबंधीय गर्म (25°C - 38°C)",
    growthCycleEn: "10 - 12 Months (Perennial Ratoon benefit)",
    growthCycleHi: "10 - 12 महीने (पेड़ी/Ratoon से लगातार 2-3 साल उपज)",
    sowingMonthsEn: "Feb - March (Spring) / Oct - Nov (Autumn)",
    sowingMonthsHi: "फरवरी - मार्च (बसंतकालीन) / अक्टूबर - नवंबर (शरदकालीन)",
    idealStates: ["Uttar Pradesh", "Maharashtra", "Karnataka", "Tamil Nadu", "Gujarat", "Bihar", "Punjab", "Haryana", "All"],
    reasonsEn: [
      "State Advised Price (SAP) guarantees fixed statutory payments per quintal",
      "Single planting yields 2-3 consecutive ratoon crops, saving replanting costs",
      "Huge national ethanol procurement drives mill solvency and rapid payments"
    ],
    reasonsHi: [
      "राज्य सरकार द्वारा घोषित तय मूल्य (SAP) पर चीनी मिलों द्वारा पक्की खरीद",
      "एक बार बुवाई करने पर 2 से 3 साल तक पेड़ी फसल से बिना नई बुवाई के मुनाफा",
      "एथेनॉल सम्मिश्रण नीति के चलते चीनी मिलों से समय पर भुगतान"
    ],
    summaryEn: "Sugarcane is the undisputed commercial anchor crop in canal belts, offering multi-year ratoon yields and statutory pricing.",
    summaryHi: "गन्ना प्रचुर पानी वाले क्षेत्रों में पक्के सरकारी भाव और पेड़ी फसल के साथ सबसे सुरक्षित नकदी फसल है।"
  },
  {
    id: "cotton",
    category: "cash",
    categoryNameEn: "Cash & Commercial",
    categoryNameHi: "व्यावसायिक व नकदी फसलें",
    nameEn: "Cotton / White Gold (Kapas)",
    nameHi: "कपास / सफेद सोना (Cotton)",
    icon: "☁️",
    soilTypes: ["Black Soil", "Clay Loam", "Alluvial", "Loamy"],
    waterReq: "Medium",
    waterReqTextEn: "Medium (Drip or 4-5 timely irrigations, deep black soil moisture)",
    waterReqTextHi: "मध्यम (ड्रिप या 4-5 सिंचाई, काली मिट्टी की नमी पर निर्भर)",
    seasons: ["Kharif"],
    minAcres: 2,
    avgProfit: "₹72,000 / acre",
    profitVal: 72000,
    grossRevenue: "₹1,20,000 / acre",
    inputCost: "₹48,000 / acre",
    expectedYield: "8 - 14 Quintals / acre (Kapas)",
    mspSupported: true,
    riskEn: "Medium",
    riskHi: "मध्यम",
    demandEn: "High (Textile mills & Global Cotton Export demand)",
    demandHi: "उच्च (टेक्सटाइल मिलों व वैश्विक निर्यात की भारी मांग)",
    weatherSuitabilityEn: "Warm Sunny (22°C - 35°C)",
    weatherSuitabilityHi: "गर्म व धूपदार (22°C - 35°C)",
    growthCycleEn: "150 - 180 Days",
    growthCycleHi: "150 - 180 दिन",
    sowingMonthsEn: "April - May (North) / June - July (Central/South)",
    sowingMonthsHi: "अप्रैल - मई (उत्तर भारत) / जून - जुलाई (मध्य व दक्षिण भारत)",
    idealStates: ["Gujarat", "Maharashtra", "Telangana", "Andhra Pradesh", "Madhya Pradesh", "Rajasthan", "Haryana", "Punjab", "Karnataka", "All"],
    reasonsEn: [
      "Major global textile fiber with Cotton Corporation of India (CCI) MSP backup",
      "Deep taproots leverage moisture in Black Cotton soils",
      "High commercial liquidity in ginning mill clusters"
    ],
    reasonsHi: [
      "टेक्सटाइल उद्योग में भारी मांग और CCI द्वारा MSP खरीद की सुरक्षा",
      "काली मिट्टी में गहरी जड़ों के साथ भरपूर उत्पादन",
      "कपास मंडियों में तुरंत नकद भुगतान की सुविधा"
    ],
    summaryEn: "Cotton (White Gold) is the primary fiber cash crop for black soil zones with domestic textile and global export backing.",
    summaryHi: "कपास काली मिट्टी के क्षेत्रों में टेक्सटाइल मिलों और निर्यात मांग के साथ उच्च नकद मुनाफा देती है।"
  },
  {
    id: "mentha",
    category: "cash",
    categoryNameEn: "Cash & Commercial",
    categoryNameHi: "व्यावसायिक व नकदी फसलें",
    nameEn: "Mentha / Peppermint (मेंथा / पिपरमेंट)",
    nameHi: "मेंथा / पिपरमेंट (Mentha)",
    icon: "🌿",
    soilTypes: ["Loamy", "Sandy Loam", "Alluvial"],
    waterReq: "Medium",
    waterReqTextEn: "Medium to High (Requires light frequent irrigations in summer)",
    waterReqTextHi: "मध्यम से उच्च (गर्मियों में बार-बार हल्की सिंचाई)",
    seasons: ["Summer"],
    minAcres: 0.5,
    avgProfit: "₹65,000 / acre",
    profitVal: 65000,
    grossRevenue: "₹95,000 / acre",
    inputCost: "₹30,000 / acre",
    expectedYield: "50 - 65 kg Mentha Oil / acre",
    mspSupported: false,
    riskEn: "Low to Medium",
    riskHi: "कम से मध्यम",
    demandEn: "High (Pharmaceutical, FMCG & Menthol Export)",
    demandHi: "उच्च (दवा उद्योग, टूथपेस्ट, बाम व मेंथॉल निर्यात)",
    weatherSuitabilityEn: "Bright Sunny (25°C - 38°C)",
    weatherSuitabilityHi: "तेज धूप (25°C - 38°C)",
    growthCycleEn: "90 - 105 Days",
    growthCycleHi: "90 - 105 दिन",
    sowingMonthsEn: "February - March (Zaid)",
    sowingMonthsHi: "फरवरी - मार्च (जायद)",
    idealStates: ["Uttar Pradesh", "Bihar", "Punjab", "Haryana", "All"],
    reasonsEn: [
      "Short 90-day duration fits between Mustard/Potato and Paddy cycles",
      "Essential oil distillation yields compact, easily transportable product with high value (₹1,000-₹1,400/kg oil)",
      "India commands 80%+ of global menthol exports"
    ],
    reasonsHi: [
      "मात्र 90 दिनों में तैयार होकर गेहूं/आलू के बाद और धान से पहले खाली खेत का सदुपयोग",
      "खेत पर ही डिस्टिलेशन से तेल निकालकर आसान भंडारण व उच्च कीमत (₹1,000-₹1,400/किग्रा)",
      "वैश्विक मेंथॉल बाजार में भारत का 80% से अधिक दबदबा"
    ],
    summaryEn: "Mentha is a premier short-duration summer cash crop yielding high-value essential oil for pharmaceutical and cosmetic exports.",
    summaryHi: "मेंथा गर्मियों में 90 दिन में पिपरमेंट तेल निकालकर तुरंत भारी नकद मुनाफा देने वाली फसल है।"
  },

  // ==========================================
  // 6. SPICES & MEDICINAL CROPS (मसाले व औषधीय)
  // ==========================================
  {
    id: "garlic",
    category: "spices",
    categoryNameEn: "Spices & Medicinal",
    categoryNameHi: "मसाले व औषधीय फसलें",
    nameEn: "Garlic (Lahsun)",
    nameHi: "लहसुन (Garlic)",
    icon: "🧄",
    soilTypes: ["Loamy", "Clay Loam", "Sandy Loam", "Black Soil"],
    waterReq: "Medium",
    waterReqTextEn: "Medium (Regular light irrigations, stop 15 days before harvest)",
    waterReqTextHi: "मध्यम (नियमित हल्की सिंचाई, खुदाई से 15 दिन पहले बंद करें)",
    seasons: ["Rabi"],
    minAcres: 0.5,
    avgProfit: "₹1,20,000 / acre",
    profitVal: 120000,
    grossRevenue: "₹1,85,000 / acre",
    inputCost: "₹65,000 / acre",
    expectedYield: "40 - 60 Quintals / acre",
    mspSupported: false,
    riskEn: "Medium",
    riskHi: "मध्यम",
    demandEn: "High (Surging Mandi rates up to ₹15,000 - ₹25,000/q)",
    demandHi: "अति उच्च (मंडियों में ₹15,000 से ₹25,000/क्विंटल तक भाव)",
    weatherSuitabilityEn: "Ideal (14°C - 24°C)",
    weatherSuitabilityHi: "आदर्श (14°C - 24°C)",
    growthCycleEn: "130 - 150 Days",
    growthCycleHi: "130 - 150 दिन",
    sowingMonthsEn: "October - November (Rabi)",
    sowingMonthsHi: "अक्टूबर - नवंबर (रबी)",
    idealStates: ["Madhya Pradesh", "Rajasthan", "Gujarat", "Uttar Pradesh", "Maharashtra", "Punjab", "Haryana", "All"],
    reasonsEn: [
      "Highest profit spice crop with long post-harvest shelf life (up to 8 months)",
      "Surging consumer and export demand driving record multi-year prices",
      "Low susceptibility to grazing animals and field pilferage"
    ],
    reasonsHi: [
      "मसालों में सबसे अधिक प्रति एकड़ मुनाफा और 8 महीने तक सुरक्षित भंडारण क्षमता",
      "मंडियों और निर्यात में रिकॉर्ड तोड़ कीमतें और भारी मांग",
      "आवारा पशुओं व नीलगाय से पूरी तरह सुरक्षित फसल"
    ],
    summaryEn: "Garlic offers unmatched per-acre revenue in the Rabi season with superb storability and animal resistance.",
    summaryHi: "लहसुन रबी सीजन में सर्वाधिक मुनाफा, लंबी भंडारण क्षमता और नीलगाय से पूर्ण सुरक्षा देने वाली सुपर फसल है।"
  },
  {
    id: "ginger",
    category: "spices",
    categoryNameEn: "Spices & Medicinal",
    categoryNameHi: "मसाले व औषधीय फसलें",
    nameEn: "Ginger (Adrak)",
    nameHi: "अदरक (Ginger)",
    icon: "🫚",
    soilTypes: ["Sandy Loam", "Loamy", "Clay Loam", "Red Soil"],
    waterReq: "Medium",
    waterReqTextEn: "Medium (Needs moist soil with excellent drainage, sensitive to waterlogging)",
    waterReqTextHi: "मध्यम (नमीयुक्त भुरभुरी मिट्टी, जल निकासी अति आवश्यक)",
    seasons: ["Kharif"],
    minAcres: 0.5,
    avgProfit: "₹1,35,000 / acre",
    profitVal: 135000,
    grossRevenue: "₹2,10,000 / acre",
    inputCost: "₹75,000 / acre",
    expectedYield: "60 - 90 Quintals / acre (Fresh Rhizome)",
    mspSupported: false,
    riskEn: "Medium",
    riskHi: "मध्यम",
    demandEn: "High (Year-round domestic spice and pharmaceutical demand)",
    demandHi: "उच्च (घरेलू रसोई, चाय, दवा व सोंठ निर्माण में भारी मांग)",
    weatherSuitabilityEn: "Humid Warm (22°C - 32°C)",
    weatherSuitabilityHi: "उमस व गर्म (22°C - 32°C)",
    growthCycleEn: "210 - 240 Days (8 - 9 Months)",
    growthCycleHi: "210 - 240 दिन (8 - 9 महीने)",
    sowingMonthsEn: "April - June",
    sowingMonthsHi: "अप्रैल - जून (मानसून पूर्व)",
    idealStates: ["Kerala", "Karnataka", "Assam", "Meghalaya", "Odisha", "Madhya Pradesh", "Maharashtra", "Himachal Pradesh", "Uttar Pradesh", "All"],
    reasonsEn: [
      "Phenomenal commercial value for both green fresh ginger and dry ginger (Sonth)",
      "Thrives in shaded and agro-forestry intercropping systems",
      "High pharmaceutical and herbal export market demand"
    ],
    reasonsHi: [
      "ताजा हरी अदरक और सूखी सोंठ दोनों में रिकॉर्ड मुनाफा",
      "बागवानी और पेड़ों के बीच हल्की छाया में भी शानदार उत्पादन",
      "आयुर्वेदिक दवा और घरेलू उपभोग में निरंतर ऊंची कीमतें"
    ],
    summaryEn: "Ginger is an elite high-value rhizome spice providing exceptional gross income per unit of land.",
    summaryHi: "अदरक सीमित जमीन में भी सर्वाधिक नकद मुनाफा देने वाली प्रीमियम मसाला व औषधीय फसल है।"
  },
  {
    id: "turmeric",
    category: "spices",
    categoryNameEn: "Spices & Medicinal",
    categoryNameHi: "मसाले व औषधीय फसलें",
    nameEn: "Turmeric (Haldi)",
    nameHi: "हल्दी (Turmeric)",
    icon: "🫚",
    soilTypes: ["Loamy", "Sandy Loam", "Clay Loam", "Red Soil"],
    waterReq: "Medium",
    waterReqTextEn: "Medium (Regular light irrigations, responsive to organic mulching)",
    waterReqTextHi: "मध्यम (नियमित हल्की सिंचाई, जैविक मल्चिंग से दोगुनी उपज)",
    seasons: ["Kharif"],
    minAcres: 0.5,
    avgProfit: "₹95,000 / acre",
    profitVal: 95000,
    grossRevenue: "₹1,55,000 / acre",
    inputCost: "₹60,000 / acre",
    expectedYield: "80 - 110 Quintals / acre (Raw Rhizome)",
    mspSupported: false,
    riskEn: "Low to Medium",
    riskHi: "कम से मध्यम",
    demandEn: "High (Curcumin extracts, cosmetics & Global Export)",
    demandHi: "उच्च (करक्यूमिन अर्क, कॉस्मेटिक्स व वैश्विक निर्यात)",
    weatherSuitabilityEn: "Warm Humid (20°C - 35°C)",
    weatherSuitabilityHi: "गर्म व आर्द्र (20°C - 35°C)",
    growthCycleEn: "210 - 270 Days",
    growthCycleHi: "210 - 270 दिन",
    sowingMonthsEn: "May - July",
    sowingMonthsHi: "मई - जुलाई",
    idealStates: ["Telangana", "Maharashtra", "Tamil Nadu", "Andhra Pradesh", "Karnataka", "Odisha", "Madhya Pradesh", "Uttar Pradesh", "All"],
    reasonsEn: [
      "High curcumin content varieties fetch heavy premiums from pharmaceutical buyers",
      "Complete immunity to wild boars, blue bulls (Nilgai), and grazing pests",
      "Long shelf-life post-boiling and polishing allows flexible market sales"
    ],
    reasonsHi: [
      "उच्च करक्यूमिन वाली किस्मों को दवा कंपनियां सीधे ऊंचे दामों पर खरीदती हैं",
      "नीलगाय, जंगली सूअर और कीटों से 100% प्राकृतिक सुरक्षा",
      "सूखी हल्दी को 1-2 साल तक आसानी से स्टोर करके सही भाव पर बेचने की आजादी"
    ],
    summaryEn: "Turmeric is a robust, animal-proof commercial spice offering high curcumin export value and indefinite storability.",
    summaryHi: "हल्दी जंगली जानवरों से पूरी तरह सुरक्षित, लंबे समय तक स्टोर होने वाली और औषधीय मांग से भरपूर फसल है।"
  },
  {
    id: "ashwagandha",
    category: "spices",
    categoryNameEn: "Spices & Medicinal",
    categoryNameHi: "मसाले व औषधीय फसलें",
    nameEn: "Ashwagandha (Indian Ginseng)",
    nameHi: "अश्वगंधा (Ashwagandha)",
    icon: "🌿",
    soilTypes: ["Sandy", "Sandy Loam", "Loamy", "Red Soil"],
    waterReq: "Low",
    waterReqTextEn: "Low (Drought tolerant, only 1-2 light irrigations if winter is dry)",
    waterReqTextHi: "कम (सूखा सहनशील, सर्दियों में केवल 1-2 हल्की सिंचाई)",
    seasons: ["Kharif", "Rabi"],
    minAcres: 0.5,
    avgProfit: "₹75,000 / acre",
    profitVal: 75000,
    grossRevenue: "₹1,05,000 / acre",
    inputCost: "₹30,000 / acre",
    expectedYield: "3 - 5 Quintals Roots + 50 kg Seeds / acre",
    mspSupported: false,
    riskEn: "Low",
    riskHi: "कम",
    demandEn: "Skyrocketing (Global Ayurvedic & Wellness Export)",
    demandHi: "अत्यधिक मांग (वैश्विक आयुर्वेदिक व वेलनेस निर्यात)",
    weatherSuitabilityEn: "Dry Sub-tropical (20°C - 35°C)",
    weatherSuitabilityHi: "शुष्क उपोष्ण (20°C - 35°C)",
    growthCycleEn: "150 - 180 Days",
    growthCycleHi: "150 - 180 दिन",
    sowingMonthsEn: "August - September (Late Kharif)",
    sowingMonthsHi: "अगस्त - सितंबर (उत्तर-खरीफ)",
    idealStates: ["Madhya Pradesh", "Rajasthan", "Gujarat", "Andhra Pradesh", "Uttar Pradesh", "Haryana", "All"],
    reasonsEn: [
      "Thrives in marginal, degraded and rocky soils where ordinary crops fail",
      "Roots fetch ₹25,000 - ₹40,000/Quintal in Neemuch/Mandsaur mandis",
      "No insect pest attacks and completely unpalatable to stray cattle"
    ],
    reasonsHi: [
      "बंजर, पथरीली और कम उपजाऊ जमीन पर भी न्यूनतम पानी में शानदार पैदावार",
      "नीमच व मंदसौर मंडियों में जड़ों का भाव ₹25,000 से ₹40,000/क्विंटल तक",
      "नीलगाय या आवारा पशु इसे बिल्कुल नहीं छूते, कीटनाशक का शून्य खर्च"
    ],
    summaryEn: "Ashwagandha turns marginal, dry lands into a goldmine of medicinal root exports with zero cattle damage.",
    summaryHi: "अश्वगंधा कम उपजाऊ व सूखी जमीन पर बिना किसी जानवर के डर के रिकॉर्ड औषधीय मुनाफा देने वाली फसल है।"
  }
];

/**
 * Intelligent Agronomic Scoring Engine
 * Analyzes soil, weather, season, water, goals, land size, and category preference
 * 
 * @param {Object} formData
 * @param {string} lang - 'en' | 'hi'
 * @returns {Object} Structured recommendation result
 */
export function getCropRecommendation(formData, lang = 'en') {
  const isHi = lang === 'hi';
  const state = formData.state || "Uttar Pradesh";
  const soil = formData.soil || "Loamy";
  const season = formData.season || "Kharif";
  const water = formData.water || "Moderate";
  const goal = formData.goal || "Highest Profit";
  const acres = parseFloat(formData.acres) || 5;
  const categoryFilter = formData.category || "all";

  // Score all crops with sharp agronomic weighting
  const scored = cropDatabase.map(crop => {
    let score = 25; // Clean calibrated base score

    // 1. Soil Compatibility (Up to 30 pts)
    const soilLower = soil.toLowerCase().trim();
    const exactMatch = crop.soilTypes.some(s => s.toLowerCase().trim() === soilLower);
    const partialMatch = crop.soilTypes.some(s => s.toLowerCase().includes(soilLower));

    if (soil === "Don't Know") {
      score += 15;
    } else if (exactMatch) {
      score += 30;
    } else if (partialMatch) {
      score += 15;
    } else {
      score -= 20; // Incompatible soil penalty
    }

    // 2. Cropping Season Compatibility (Up to 30 pts)
    if (crop.seasons.includes(season)) {
      score += 30;
    } else {
      // Massive penalty for wrong season
      score -= 50;
    }

    // 3. Water Availability & Irrigation Match (Up to 30 pts)
    if (water === "Low") {
      if (crop.waterReq === "Low") score += 30;
      else if (crop.waterReq === "Medium") score -= 12;
      else if (crop.waterReq === "High") score -= 45; // Impossible to grow high-water crop with low water
    } else if (water === "Moderate") {
      if (crop.waterReq === "Medium") score += 30;
      else if (crop.waterReq === "Low") score += 22;
      else if (crop.waterReq === "High") score += 8;
    } else if (water === "High") {
      if (crop.waterReq === "High") score += 30;
      else if (crop.waterReq === "Medium") score += 24;
      else if (crop.waterReq === "Low") score += 10;
    }

    // 4. Primary Farmer Goal Weighting (Up to 25 pts)
    if (goal === "Highest Profit") {
      if (crop.profitVal >= 100000) score += 25;
      else if (crop.profitVal >= 75000) score += 20;
      else if (crop.profitVal >= 50000) score += 12;
      else score += 5;
    } else if (goal.includes("Lowest Risk") || goal.includes("MSP Security")) {
      if (crop.mspSupported && (crop.riskEn.toLowerCase().includes("very low") || crop.riskEn.toLowerCase().includes("low"))) {
        score += 25;
      } else if (crop.mspSupported) {
        score += 20;
      } else if (crop.riskEn.toLowerCase().includes("low")) {
        score += 15;
      } else {
        score -= 10;
      }
    } else if (goal.includes("Low Water") || goal.includes("Water Conservation")) {
      if (crop.waterReq === "Low") score += 25;
      else if (crop.waterReq === "Medium") score -= 10;
      else score -= 30;
    }

    // 5. Regional State Adaptability (Up to 10 pts)
    if (crop.idealStates.includes(state) || crop.idealStates.includes("All")) {
      score += 10;
    }

    // 6. Land Size Feasibility (Up to 5 pts)
    if (acres <= 2 && (crop.category === 'vegetables' || crop.category === 'spices')) {
      score += 5;
    } else if (acres >= 5 && (crop.category === 'cash' || crop.category === 'cereals' || crop.category === 'oilseeds')) {
      score += 5;
    }

    // Calibrate match percentage between 35% and 98%
    const finalScore = Math.min(Math.max(Math.round(score), 35), 98);

    return {
      ...crop,
      matchScore: finalScore
    };
  });

  // Sort by match score descending
  scored.sort((a, b) => b.matchScore - a.matchScore);

  // Group top crops by category
  const categoryBests = {};
  CROP_CATEGORIES.forEach(cat => {
    if (cat.id !== 'all') {
      const match = scored.find(c => c.category === cat.id);
      if (match) {
        categoryBests[cat.id] = {
          ...match,
          displayName: isHi ? match.nameHi : match.nameEn,
          displayProfit: match.avgProfit,
          displayRisk: isHi ? match.riskHi : match.riskEn,
          displayCategory: isHi ? match.categoryNameHi : match.categoryNameEn
        };
      }
    }
  });

  // Filter based on active category if specified
  const filteredRanked = categoryFilter === 'all' 
    ? scored 
    : scored.filter(c => c.category === categoryFilter);

  const top = filteredRanked[0] || scored[0];
  
  // Alternatives (next 6 top ranked)
  const alternatives = filteredRanked.slice(1, 7).map(alt => ({
    id: alt.id,
    name: isHi ? alt.nameHi : alt.nameEn,
    category: alt.category,
    categoryName: isHi ? alt.categoryNameHi : alt.categoryNameEn,
    icon: alt.icon,
    matchScore: alt.matchScore,
    profit: alt.avgProfit,
    profitVal: alt.profitVal,
    risk: isHi ? alt.riskHi : alt.riskEn,
    riskEn: alt.riskEn,
    water: isHi ? (alt.waterReq === 'Low' ? 'कम' : alt.waterReq === 'High' ? 'उच्च' : 'मध्यम') : alt.waterReq,
    waterReq: alt.waterReq,
    growthCycle: isHi ? alt.growthCycleHi : alt.growthCycleEn,
    mspSupported: alt.mspSupported,
    barProfit: Math.min(Math.round((alt.profitVal / 135000) * 100), 100),
    barRisk: alt.riskEn.toLowerCase().includes("very low") ? 20 : alt.riskEn.toLowerCase().includes("low") ? 35 : alt.riskEn.toLowerCase().includes("medium-high") ? 75 : 55,
    barWater: alt.waterReq === "Low" ? 25 : alt.waterReq === "Medium" ? 60 : 95
  }));

  return {
    primaryCrop: {
      id: top.id,
      name: isHi ? top.nameHi : top.nameEn,
      category: top.category,
      categoryName: isHi ? top.categoryNameHi : top.categoryNameEn,
      match: top.matchScore,
      icon: top.icon,
      profit: top.avgProfit,
      profitVal: top.profitVal,
      grossRevenue: top.grossRevenue,
      inputCost: top.inputCost,
      expectedYield: top.expectedYield,
      mspSupported: top.mspSupported,
      risk: isHi ? top.riskHi : top.riskEn,
      riskEn: top.riskEn,
      waterReq: isHi ? top.waterReqTextHi : top.waterReqTextEn,
      marketDemand: isHi ? top.demandHi : top.demandEn,
      weatherSuitability: isHi ? top.weatherSuitabilityHi : top.weatherSuitabilityEn,
      growthCycle: isHi ? top.growthCycleHi : top.growthCycleEn,
      sowingMonths: isHi ? top.sowingMonthsHi : top.sowingMonthsEn,
      reasons: isHi ? top.reasonsHi : top.reasonsEn,
      reasoningSummary: isHi ? top.summaryHi : top.summaryEn,
    },
    categoryBests,
    alternatives,
    allRankedCount: scored.length,
    categoriesList: CROP_CATEGORIES
  };
}
