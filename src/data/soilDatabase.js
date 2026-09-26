/**
 * 🌱 Soil AI Studio - Agronomic Knowledge Database
 * Extracted and enhanced from Soil_classification_project/src/model.py
 * Author: Gogul Gupta (Team Shree Yantra Dynamics)
 */

export const SOIL_CLASSES = ["Alluvial", "Black", "Clay", "Red"];

export const SOIL_DATABASE = {
  "Alluvial": {
    id: "alluvial",
    title: "Alluvial Soil (जलोढ़ मिट्टी)",
    subtitle: "Khadar (New) & Bhangar (Old) River Plains",
    badgeClass: "from-amber-500 to-yellow-600",
    color: "#D4AF37",
    accentBg: "bg-amber-50 border-amber-200 text-amber-900",
    pillBg: "bg-amber-100 text-amber-900 border-amber-300",
    gradient: "linear-gradient(135deg, #c49a45 0%, #dfb15b 100%)",
    sampleImage: "/sample_images/alluvial_sample.jpg",
    descriptionEn: "Formed by deposition of silt brought down by rivers. Highly fertile, rich in potash, phosphoric acid, and lime, but naturally deficient in nitrogen.",
    descriptionHi: "नदियों द्वारा लाई गई उपजाऊ गाद और जलोढ़ से निर्मित। पोटाश, फास्फोरिक एसिड और चूने से भरपूर, लेकिन नाइट्रोजन की प्राकृतिक कमी होती है।",
    phRange: "6.5 - 8.4 (Neutral to Slightly Alkaline)",
    phNumeric: "7.4",
    textureEn: "Loamy to Sandy Loam (Fine silt & clay mixture)",
    textureHi: "दोमट से बलुई दोमट (महीन गाद व चिकनी मिट्टी का मिश्रण)",
    waterRetentionEn: "Moderate to High (Well-drained)",
    waterRetentionHi: "मध्यम से उच्च (उत्कृष्ट जल निकास)",
    waterRetentionScore: 78,
    suitableCrops: [
      { nameEn: "Wheat", nameHi: "गेहूं", icon: "🌾", yield: "4.5 - 5.5 t/ha" },
      { nameEn: "Paddy (Rice)", nameHi: "धान (चावल)", icon: "🍚", yield: "5.0 - 6.2 t/ha" },
      { nameEn: "Sugarcane", nameHi: "गन्ना", icon: "🎋", yield: "75 - 90 t/ha" },
      { nameEn: "Cotton", nameHi: "कपास", icon: "☁️", yield: "2.2 - 2.8 t/ha" },
      { nameEn: "Jute", nameHi: "जूट / पटसन", icon: "🌿", yield: "2.8 - 3.4 t/ha" },
      { nameEn: "Oilseeds", nameHi: "तिलहन (सरसों)", icon: "🌻", yield: "1.8 - 2.2 t/ha" },
      { nameEn: "Maize", nameHi: "मक्का", icon: "🌽", yield: "4.0 - 5.0 t/ha" },
      { nameEn: "Pulses", nameHi: "दलहन (चना/अरहर)", icon: "🫘", yield: "1.5 - 2.0 t/ha" },
      { nameEn: "Vegetables", nameHi: "सब्जियां", icon: "🥦", yield: "High" }
    ],
    fertilizersEn: [
      "Urea / Nitrogenous fertilizers in split doses (compensate nitrogen deficit)",
      "DAP (Di-ammonium Phosphate) @ 50kg/acre during sowing",
      "Organic compost & Biofertilizers (Azotobacter + PSB) to boost microbial health",
      "Zinc Sulfate (ZnSO4) 25 kg/ha basal dose for intensive cereal cropping"
    ],
    fertilizersHi: [
      "यूरिया / नाइट्रोजन खाद 2-3 किस्तों में दें (नाइट्रोजन की कमी पूरी करने हेतु)",
      "डीएपी (DAP) बुवाई के समय 50 किग्रा/एकड़ प्रयोग करें",
      "जैविक कम्पोस्ट व एजोटोबैक्टर/PSB कल्चर मिट्टी की उर्वरता बढ़ाने हेतु",
      "गहन अनाज फसल चक्र में जिंक सल्फेट 25 किग्रा/हेक्टेयर बेसल ड्रेसिंग"
    ],
    farmingTipsEn: "Ensure proper crop rotation with leguminous plants (moong, urad) to restore soil nitrogen naturally. Level fields using laser levelers to prevent surface water runoff and nutrient leaching.",
    farmingTipsHi: "नाइट्रोजन संतुलन बनाए रखने के लिए दलहनी फसलों (मूंग, उड़द) के साथ फसल चक्र अपनाएं। पोषक तत्वों के बहाव को रोकने के लिए खेत का लेजर समतलीकरण करें।"
  },
  "Black": {
    id: "black",
    title: "Black Soil (काली मिट्टी / रेगुड़)",
    subtitle: "Regur / Lava Soil of Deccan Plateau",
    badgeClass: "from-slate-700 to-slate-900",
    color: "#2C2C2C",
    accentBg: "bg-slate-100 border-slate-300 text-slate-900",
    pillBg: "bg-slate-200 text-slate-900 border-slate-400",
    gradient: "linear-gradient(135deg, #2b2d42 0%, #4a4e69 100%)",
    sampleImage: "/sample_images/black_soil_sample.jpg",
    descriptionEn: "Derived from weathered basaltic volcanic rock. Exceptionally rich in calcium carbonate, magnesium, potash, and lime. High moisture retention with self-ploughing deep cracks when dry.",
    descriptionHi: "ज्वालामुखीय बेसाल्ट चट्टानों के अपक्षय से निर्मित। कैल्शियम कार्बोनेट, मैग्नीशियम और पोटाश से भरपूर। अत्यधिक नमी धारण क्षमता और सूखने पर गहरी दरारें (स्वयं-जुताई)।",
    phRange: "7.2 - 8.5 (Moderately Alkaline)",
    phNumeric: "7.8",
    textureEn: "Clayey, fine-grained, highly plastic and sticky when wet",
    textureHi: "चिकनी, महीन कणों वाली, गीली होने पर अत्यधिक चिपचिपी",
    waterRetentionEn: "Very High (Holds moisture through long dry spells)",
    waterRetentionHi: "अत्यधिक उच्च (लंबे सूखे में भी नमी बरकरार रखती है)",
    waterRetentionScore: 94,
    suitableCrops: [
      { nameEn: "Cotton (Best)", nameHi: "कपास (सर्वोत्तम)", icon: "☁️", yield: "2.8 - 3.5 t/ha" },
      { nameEn: "Soybean", nameHi: "सोयाबीन", icon: "🌱", yield: "2.5 - 3.0 t/ha" },
      { nameEn: "Sorghum (Jowar)", nameHi: "ज्वार", icon: "🌾", yield: "3.2 - 4.0 t/ha" },
      { nameEn: "Wheat", nameHi: "गेहूं", icon: "🌾", yield: "4.0 - 4.8 t/ha" },
      { nameEn: "Millet (Bajra)", nameHi: "बाजरा", icon: "🥣", yield: "3.0 - 3.6 t/ha" },
      { nameEn: "Groundnut", nameHi: "मूंगफली", icon: "🥜", yield: "2.2 - 2.8 t/ha" },
      { nameEn: "Tobacco", nameHi: "तंबाकू", icon: "🍂", yield: "2.0 - 2.5 t/ha" },
      { nameEn: "Sunflower", nameHi: "सूरजमुखी", icon: "🌻", yield: "1.8 - 2.4 t/ha" },
      { nameEn: "Citrus Fruits", nameHi: "नींबू वर्गीय फल", icon: "🍊", yield: "High" }
    ],
    fertilizersEn: [
      "Phosphatic fertilizers (SSP / Single Super Phosphate or TSP)",
      "Nitrogen fertilizers applied strictly in split doses to avoid volatilization",
      "Zinc sulfate & Micronutrient foliar spray",
      "Farmyard Manure (FYM) to improve aeration and prevent excessive clod formation"
    ],
    fertilizersHi: [
      "फास्फेटिक उर्वरक (सिंगल सुपर फास्फेट - SSP / TSP)",
      "नाइट्रोजन खाद को 2-3 किस्तों में डालें ताकि हवा में क्षरण न हो",
      "जिंक सल्फेट व सूक्ष्म पोषक तत्वों का पर्णीय (Foliar) स्प्रे",
      "मिट्टी में हवा का संचार सुधारने व ढेले बनने से रोकने के लिए गोबर की सड़ी खाद डालें"
    ],
    farmingTipsEn: "Never till or operate heavy machinery when soil is excessively wet to prevent dense soil compaction. Perform deep summer plowing to destroy weed seeds and promote deep moisture absorption.",
    farmingTipsHi: "अत्यधिक गीली अवस्था में ट्रैक्टर या भारी जुताई न करें वर्ना मिट्टी सख्त हो जाएगी। गर्मियों में गहरी जुताई करें ताकि खरपतवार नष्ट हों और बारिश का पानी गहराई तक समा सके।"
  },
  "Clay": {
    id: "clay",
    title: "Clay Soil (चिकनी / मटियारी मिट्टी)",
    subtitle: "Heavy Dense Soil with High Nutrient Capacity",
    badgeClass: "from-amber-800 to-amber-950",
    color: "#8D5B4C",
    accentBg: "bg-amber-100 border-amber-300 text-amber-950",
    pillBg: "bg-amber-200 text-amber-950 border-amber-400",
    gradient: "linear-gradient(135deg, #99582a 0%, #bc6c25 100%)",
    sampleImage: "/sample_images/clay_soil_sample.jpg",
    descriptionEn: "Composed of ultra-fine sub-micron mineral particles with minimal macro-pore space. High cation exchange capacity and nutrient holding, but prone to waterlogging and slow warming in spring.",
    descriptionHi: "अति-सूक्ष्म खनिज कणों से बनी सघन मिट्टी। पोषक तत्वों को बांधकर रखने की उच्च क्षमता, किंतु जलभराव और हवा के धीमे संचार की समस्या रहती है।",
    phRange: "6.0 - 7.5 (Slightly Acidic to Neutral)",
    phNumeric: "6.8",
    textureEn: "Dense, heavy, highly cohesive, sticky wet & rock-hard when dry",
    textureHi: "घनी, भारी, गीली होने पर चिपचिपी व सूखने पर पत्थर जैसी सख्त",
    waterRetentionEn: "Extremely High (Poor internal drainage)",
    waterRetentionHi: "अति-उच्च (आंतरिक जल निकास धीमा)",
    waterRetentionScore: 98,
    suitableCrops: [
      { nameEn: "Paddy (Rice)", nameHi: "धान (चावल - सर्वोत्तम)", icon: "🍚", yield: "5.5 - 6.5 t/ha" },
      { nameEn: "Broccoli", nameHi: "ब्रोकली", icon: "🥦", yield: "12 - 16 t/ha" },
      { nameEn: "Cabbage", nameHi: "पत्ता गोभी", icon: "🥬", yield: "25 - 35 t/ha" },
      { nameEn: "Cauliflower", nameHi: "फूल गोभी", icon: "🥦", yield: "20 - 30 t/ha" },
      { nameEn: "Kale / Leafy Greens", nameHi: "हरी पत्तेदार सब्जियां", icon: "🥗", yield: "High" },
      { nameEn: "Wheat", nameHi: "गेहूं (उचित निकास पर)", icon: "🌾", yield: "3.8 - 4.5 t/ha" },
      { nameEn: "Beans", nameHi: "फलियां / बीन्स", icon: "🫘", yield: "2.0 - 2.6 t/ha" },
      { nameEn: "Perennial Fruit Trees", nameHi: "फलदार पेड़", icon: "🌳", yield: "High" }
    ],
    fertilizersEn: [
      "Agricultural Gypsum (calcium sulfate) @ 1-2 tonnes/ha to break soil stickiness and improve structure",
      "Well-decomposed vermicompost and bulky organic manure",
      "Slow-release NPK formulations to prevent root burn during saturated periods",
      "Humic acid soil conditioning drench"
    ],
    fertilizersHi: [
      "जिप्सम (1-2 टन/हेक्टेयर) का प्रयोग करें ताकि चिपचिपापन कम हो और मिट्टी की संरचना सुधरे",
      "सड़ी हुई वर्मीकम्पोस्ट (केंचुआ खाद) व धान की भूसी का उपयोग करें",
      "धीमी गति से घुलने वाली NPK खाद ताकि जड़ों को नुकसान न पहुंचे",
      "ह्यूमिक एसिड का छिड़काव जो सूक्ष्म पोषक तत्वों की उपलब्धता बढ़ाता है"
    ],
    farmingTipsEn: "Construct raised planting beds or ridge-and-furrow systems to prevent root rot during heavy rainfall. Incorporate bulky organic matter (chopped straw, compost) annually to open soil pores.",
    farmingTipsHi: "भारी बारिश में जड़ गलन (Root rot) से बचाव के लिए मेड़ों (Raised beds) पर बुवाई करें। मिट्टी में छिद्र बढ़ाने के लिए हर साल धान की भूसी या कम्पोस्ट मिलाएं।"
  },
  "Red": {
    id: "red",
    title: "Red Soil (लाल मिट्टी / लेटराइट युक्त)",
    subtitle: "Iron-Rich Crystalline Weathered Soil",
    badgeClass: "from-rose-700 to-red-800",
    color: "#B22222",
    accentBg: "bg-rose-50 border-rose-200 text-rose-950",
    pillBg: "bg-rose-100 text-rose-950 border-rose-300",
    gradient: "linear-gradient(135deg, #ae2012 0%, #ca6702 100%)",
    sampleImage: "/sample_images/red_soil_sample.jpg",
    descriptionEn: "Formed through weathering of ancient crystalline and metamorphic rocks. Rich in iron oxides giving it vibrant reddish-orange hues; typically deficient in nitrogen, phosphorus, and organic humus.",
    descriptionHi: "प्राचीन आग्नेय व कायांतरित चट्टानों के अपक्षय से निर्मित। आयरन ऑक्साइड की प्रचुरता के कारण लाल रंग; नाइट्रोजन, फास्फोरस व ह्यूमस की कमी होती है।",
    phRange: "5.5 - 6.8 (Slightly Acidic)",
    phNumeric: "6.2",
    textureEn: "Porous, friable, light sandy to clayey-loam",
    textureHi: "छिद्रयुक्त, भुरभुरी, हल्की बलुई से दोमट",
    waterRetentionEn: "Low to Moderate (Requires frequent light irrigation)",
    waterRetentionHi: "कम से मध्यम (बार-बार हल्की सिंचाई की आवश्यकता)",
    waterRetentionScore: 45,
    suitableCrops: [
      { nameEn: "Groundnut", nameHi: "मूंगफली (उत्तम परिणाम)", icon: "🥜", yield: "2.8 - 3.4 t/ha" },
      { nameEn: "Millets (Ragi, Bajra)", nameHi: "रागी / बाजरा / मोटे अनाज", icon: "🥣", yield: "2.8 - 3.5 t/ha" },
      { nameEn: "Pulses (Pigeonpea)", nameHi: "अरहर / मूंग / चना", icon: "🫘", yield: "1.8 - 2.4 t/ha" },
      { nameEn: "Potatoes", nameHi: "आलू", icon: "🥔", yield: "22 - 28 t/ha" },
      { nameEn: "Tobacco", nameHi: "तंबाकू", icon: "🍂", yield: "2.0 - 2.6 t/ha" },
      { nameEn: "Oilseeds (Castor/Sesame)", nameHi: "तिल / अरंडी", icon: "🌻", yield: "1.6 - 2.2 t/ha" },
      { nameEn: "Cotton", nameHi: "कपास", icon: "☁️", yield: "1.8 - 2.4 t/ha" },
      { nameEn: "Tea / Coffee (Hill Tracts)", nameHi: "चाय / कॉफी / काजू", icon: "☕", yield: "High" }
    ],
    fertilizersEn: [
      "Single Super Phosphate (SSP) and Rock Phosphate for direct phosphorus replenishment",
      "Heavy doses of Farmyard Manure (FYM) & Green Manuring (Sunnhemp / Dhaincha) to build humus",
      "Agricultural Lime (CaCO3) or Dolomite if soil pH drops below 5.5",
      "Potash (MOP) to improve crop drought resistance"
    ],
    fertilizersHi: [
      "सिंगल सुपर फास्फेट (SSP) व रॉक फास्फेट फास्फोरस की कमी दूर करने हेतु",
      "गोबर की खाद (FYM) और हरी खाद (ढैंचा / सनई) का भरपूर प्रयोग कर ह्यूमस बढ़ाएं",
      "यदि मिट्टी ज्यादा अम्लीय (pH < 5.5) हो तो चूना (Agricultural Lime) मिलाएं",
      "सूखा सहने की क्षमता बढ़ाने के लिए पोटाश (MOP) का संतुलित उपयोग"
    ],
    farmingTipsEn: "Adopt drip or micro-sprinkler irrigation systems to deliver water efficiently without leaching nutrients. Apply organic mulching around root zones to cut evaporation loss and prevent surface crusting.",
    farmingTipsHi: "पोषक तत्वों के क्षरण से बचने के लिए ड्रिप या फव्वारा सिंचाई प्रणाली अपनाएं। वाष्पीकरण रोकने और मिट्टी की नमी बनाए रखने के लिए पुआल या प्लास्टिक मल्चिंग का प्रयोग करें।"
  }
};

export const SAMPLE_IMAGES = [
  {
    id: "alluvial-sample",
    labelEn: "Alluvial Soil Sample",
    labelHi: "जलोढ़ मिट्टी नमूना",
    soilType: "Alluvial",
    image: "/sample_images/alluvial_sample.jpg",
    badge: "Indo-Gangetic Plain",
    color: "#D4AF37"
  },
  {
    id: "black-sample",
    labelEn: "Black Soil Sample",
    labelHi: "काली मिट्टी नमूना",
    soilType: "Black",
    image: "/sample_images/black_soil_sample.jpg",
    badge: "Deccan Plateau",
    color: "#2C2C2C"
  },
  {
    id: "clay-sample",
    labelEn: "Clay Soil Sample",
    labelHi: "चिकनी मिट्टी नमूना",
    soilType: "Clay",
    image: "/sample_images/clay_soil_sample.jpg",
    badge: "Heavy Delta Basins",
    color: "#8D5B4C"
  },
  {
    id: "red-sample",
    labelEn: "Red Soil Sample",
    labelHi: "लाल मिट्टी नमूना",
    soilType: "Red",
    image: "/sample_images/red_soil_sample.jpg",
    badge: "Southern & Eastern Tracts",
    color: "#B22222"
  }
];

export const MODEL_LEADERBOARD = {
  task1: {
    name: "Task 1: Multi-Class Soil Classification",
    metric: "Min F1 across 4 classes",
    publicScore: "1.000",
    privateRank: "40",
    status: "Top Tier",
    classes: "Alluvial, Black, Clay, Red"
  },
  task2: {
    name: "Task 2: Binary Soil / Outlier Detection",
    metric: "Macro F1-Score",
    publicScore: "0.8989",
    privateRank: "48",
    status: "Benchmark",
    classes: "Valid Agricultural Soil vs Non-Soil"
  },
  architecture: {
    backbone: "Deep Residual Network (ResNet-18)",
    pretrainedOn: "ImageNet-1k Standard Weights",
    inputSize: "224 × 224 RGB (3 Channels)",
    crossValidation: "5-Fold Stratified Cross-Validation (Zero Data Leak)",
    optimizer: "AdamW (lr=3e-4, weight_decay=1e-2)",
    lrScheduler: "Cosine Annealing with Warm Restarts",
    lossFunction: "Cross-Entropy with Label Smoothing (ε=0.1)",
    author: "Gogul Gupta (Team Shree Yantra Dynamics)",
    institution: "Dr. A.P.J. AKTU"
  }
};
