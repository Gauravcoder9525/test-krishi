/**
 * Authentic & Official Government of India Agricultural Schemes Registry
 * Verified against Ministry of Agriculture & Farmers Welfare (MoA&FW), MNRE, and myScheme.gov.in
 */

export const SCHEME_CATEGORIES = [
  { id: 'all', nameEn: 'All Schemes', nameHi: 'सभी सरकारी योजनाएं', icon: '🏛️' },
  { id: 'direct_grant', nameEn: 'Direct Grants & DBT', nameHi: 'सीधी आर्थिक मदद (DBT)', icon: '💰' },
  { id: 'solar_energy', nameEn: 'Solar Pump & Energy', nameHi: 'सोलर पंप व हरित ऊर्जा', icon: '⚡' },
  { id: 'insurance', nameEn: 'Crop Insurance & Relief', nameHi: 'फसल बीमा व सुरक्षा', icon: '🛡️' },
  { id: 'machinery', nameEn: 'Machinery & Drones', nameHi: 'कृषि यंत्र व ड्रोन अनुदान', icon: '🚜' },
  { id: 'credit', nameEn: 'Concessional Loans (KCC)', nameHi: 'सस्ता ऋण व KCC', icon: '💳' },
  { id: 'irrigation', nameEn: 'Micro-Irrigation (Drip)', nameHi: 'ड्रिप व स्प्रिंकलर सब्सिडी', icon: '💧' },
  { id: 'soil_organic', nameEn: 'Soil Health & Organic', nameHi: 'मृदा स्वास्थ्य व जैविक खेती', icon: '🧪' }
];

export const governmentSchemes = [
  // ==========================================
  // 1. DIRECT BENEFIT TRANSFER & INCOME
  // ==========================================
  {
    id: "pm-kisan",
    category: "direct_grant",
    categoryNameEn: "Direct Grants & DBT",
    categoryNameHi: "सीधी आर्थिक मदद (DBT)",
    titleEn: "PM Kisan Samman Nidhi (PM-KISAN)",
    titleHi: "प्रधानमंत्री किसान सम्मान निधि (PM-KISAN)",
    departmentEn: "Ministry of Agriculture & Farmers Welfare (MoA&FW)",
    departmentHi: "कृषि एवं किसान कल्याण मंत्रालय, भारत सरकार",
    benefitEn: "₹6,000 / year direct cash transfer into bank account in 3 equal 4-monthly installments of ₹2,000",
    benefitHi: "₹6,000 प्रति वर्ष 3 समान किस्तों (₹2,000) में सीधे आधार लिंक बैंक खाते में (DBT)",
    eligibilityEn: "All landholding farmer families with cultivable land in their name (Excluding institutional & high tax payers)",
    eligibilityHi: "सभी भूमिधारक किसान परिवार जिनके नाम पर कृषि भूमि है (संस्थागत व आयकर दाताओं को छोड़कर)",
    badge: "Direct Benefit Transfer",
    badgeHi: "100% केंद्रीय DBT अनुदान",
    subsidy: "100% Central Government Funded",
    subsidyHi: "100% केंद्र सरकार द्वारा वित्तपोषित",
    status: "Active & 19th Installment Released",
    statusHi: "सक्रिय • 19वीं किस्त जारी",
    verifiedPortal: "pmkisan.gov.in",
    actionLink: "https://pmkisan.gov.in/",
    helpline: "155261 / 1800-115-526",
    documentsRequiredEn: "Aadhaar Card, Land Khasra/Khatauni, Bank Passbook, e-KYC",
    documentsRequiredHi: "आधार कार्ड, खसरा/खतौनी नकल, बैंक पासबुक, ई-केवाईसी (e-KYC)"
  },

  // ==========================================
  // 2. SOLAR ENERGY & IRRIGATION PUMPS
  // ==========================================
  {
    id: "pm-kusum",
    category: "solar_energy",
    categoryNameEn: "Solar Pump & Energy",
    categoryNameHi: "सोलर पंप व हरित ऊर्जा",
    titleEn: "PM KUSUM — Solar Agricultural Pump Scheme",
    titleHi: "प्रधानमंत्री कुसुम योजना (सोलर कृषि पंप व ग्रिड फीडर)",
    departmentEn: "Ministry of New and Renewable Energy (MNRE)",
    departmentHi: "नवीन एवं नवीकरणीय ऊर्जा मंत्रालय (MNRE)",
    benefitEn: "Up to 60% subsidy on Standalone Solar Pumps (3HP, 5HP, 7.5HP) + 30% bank loan (Farmer pays only 10%)",
    benefitHi: "3HP, 5HP, 7.5HP स्टैंडअलोन सोलर पंप पर 60% तक भारी सरकारी सब्सिडी (30% केंद्र + 30% राज्य, 10% किसान अंश)",
    eligibilityEn: "Individual farmers, Farmer Producer Organizations (FPOs), Water User Associations, Panchayats",
    eligibilityHi: "व्यक्तिगत किसान, एफपीओ, जल उपयोगकर्ता समितियां एवं ग्राम पंचायतें",
    badge: "Green Energy & Free Power",
    badgeHi: "60% सोलर सब्सिडी",
    subsidy: "60% Direct Subsidy (30% Central + 30% State)",
    subsidyHi: "60% सीधी सब्सिडी (30% केंद्र + 30% राज्य)",
    status: "Online State Portals Open",
    statusHi: "राज्यवार ऑनलाइन आवेदन जारी",
    verifiedPortal: "pmkusum.mnre.gov.in",
    actionLink: "https://pmkusum.mnre.gov.in/",
    helpline: "1800-180-3333",
    documentsRequiredEn: "Aadhaar, Land Registry Document, Water Source Proof, Bank Account",
    documentsRequiredHi: "आधार कार्ड, भूमि दस्तावेज/खतौनी, जल स्रोत प्रमाण (बोरवेल), बैंक विवरण"
  },

  // ==========================================
  // 3. CROP INSURANCE & RISK MITIGATION
  // ==========================================
  {
    id: "pmfby",
    category: "insurance",
    categoryNameEn: "Crop Insurance & Relief",
    categoryNameHi: "फसल बीमा व सुरक्षा",
    titleEn: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    titleHi: "प्रधानमंत्री फसल बीमा योजना (PMFBY)",
    departmentEn: "Department of Agriculture and Cooperation, MoA&FW",
    departmentHi: "कृषि एवं सहकारिता विभाग, भारत सरकार",
    benefitEn: "Comprehensive insurance coverage against drought, flood, pests, hailstorm, unseasonal rain, and post-harvest loss",
    benefitHi: "बाढ़, सूखा, ओलावृष्टि, बेमौसम बारिश व कीट प्रकोप से फसल नष्ट होने पर शत-प्रतिशत आर्थिक क्षतिपूर्ति",
    eligibilityEn: "All farmers (loanee & non-loanee, tenant/sharecroppers) growing notified crops in notified areas",
    eligibilityHi: "अधिसूचित क्षेत्रों में अधिसूचित फसलें उगाने वाले सभी ऋणी व गैर-ऋणी, काश्तकार व बटाईदार किसान",
    badge: "Comprehensive Risk Shield",
    badgeHi: "नाममात्र प्रीमियम (1.5% - 2%)",
    subsidy: "Farmer pays only 1.5% (Rabi), 2% (Kharif), 5% (Horticulture), rest 90%+ paid by Govt",
    subsidyHi: "किसान को केवल 1.5% (रबी) व 2% (खरीफ) प्रीमियम देना होता है, 90%+ सरकार देती है",
    status: "Kharif & Rabi Cut-off Active",
    statusHi: "मौसमी कट-ऑफ अनुसार खुला",
    verifiedPortal: "pmfby.gov.in",
    actionLink: "https://pmfby.gov.in/",
    helpline: "14447 (Kisan Bima Toll-Free)",
    documentsRequiredEn: "Land Sowing Certificate, Khasra, Aadhaar, Bank Details, Cancelled Cheque",
    documentsRequiredHi: "बुवाई प्रमाण पत्र / पटवारी पर्चा, खसरा खतौनी, आधार कार्ड, बैंक पासबुक"
  },

  // ==========================================
  // 4. FARM MACHINERY & DRONES
  // ==========================================
  {
    id: "smam-machinery",
    category: "machinery",
    categoryNameEn: "Machinery & Drones",
    categoryNameHi: "कृषि यंत्र व ड्रोन अनुदान",
    titleEn: "SMAM — Sub-Mission on Agricultural Mechanization & Kisan Drone",
    titleHi: "कृषि यंत्रीकरण उप-मिशन (SMAM) एवं किसान ड्रोन योजना",
    departmentEn: "Mechanization & Technology Division, MoA&FW",
    departmentHi: "कृषि यंत्रीकरण प्रभाग, कृषि मंत्रालय भारत सरकार",
    benefitEn: "40% to 50% subsidy on Tractors, Rotavators, Happy Seeders, Power Tillers; Up to 75%-100% on Kisan Drones for FPOs/CHCs",
    benefitHi: "ट्रैक्टर, रोटावेटर, रीपर, हैप्पी सीडर पर 40% से 50% सब्सिडी; FPO/कस्टम हायरिंग केंद्रों को किसान ड्रोन पर 75%-100% तक अनुदान",
    eligibilityEn: "Small, marginal, SC/ST, women farmers, Farmer Producer Organizations (FPOs), and Custom Hiring Centers (CHCs)",
    eligibilityHi: "लघु, सीमांत, महिला, एससी/एसटी किसान, एफपीओ एवं कस्टम हायरिंग केंद्र",
    badge: "Mechanization Grant",
    badgeHi: "50% तक कृषि यंत्र सब्सिडी",
    subsidy: "40% - 50% on Implements; Up to ₹10 Lakhs for CHC Centers",
    subsidyHi: "यंत्रों पर 40%-50% छूट, कस्टम हायरिंग केंद्र पर ₹10 लाख तक अनुदान",
    status: "DBT Portal Direct Registration",
    statusHi: "डीबीटी पोर्टल पर रजिस्ट्रेशन खुला",
    verifiedPortal: "agrimachinery.nic.in",
    actionLink: "https://agrimachinery.nic.in/",
    helpline: "1800-180-1551",
    documentsRequiredEn: "Aadhaar, Land Records, Caste Certificate (for SC/ST), Bank Passbook, Tractor RC (for PTO driven implements)",
    documentsRequiredHi: "आधार, खतौनी, जाति प्रमाण पत्र, बैंक पासबुक, ट्रैक्टर आरसी (चालित यंत्रों हेतु)"
  },

  // ==========================================
  // 5. CONCESSIONAL CREDIT (KISAN CREDIT CARD)
  // ==========================================
  {
    id: "kcc",
    category: "credit",
    categoryNameEn: "Concessional Loans (KCC)",
    categoryNameHi: "सस्ता ऋण व KCC",
    titleEn: "Kisan Credit Card (KCC) & Interest Subvention Scheme (ISS)",
    titleHi: "किसान क्रेडिट कार्ड (KCC) एवं ब्याज अनुदान योजना",
    departmentEn: "Department of Financial Services & NABARD",
    departmentHi: "वित्तीय सेवाएं विभाग, वित्त मंत्रालय एवं नाबार्ड",
    benefitEn: "Collateral-free crop loan up to ₹1.60 Lakh (up to ₹3 Lakh at effective 4% annual interest rate upon prompt repayment)",
    benefitHi: "बिना किसी बंधक के ₹1.60 लाख तक ऋण; समय पर चुकाने पर 3% अतिरिक्त छूट के साथ मात्र 4% वार्षिक ब्याज",
    eligibilityEn: "All owner cultivators, tenant farmers, sharecroppers, self-help groups (SHGs), including Animal Husbandry & Fisheries",
    eligibilityHi: "सभी काश्तकार, पट्टेदार, बटाईदार किसान, पशुपालक एवं मत्स्य पालक",
    badge: "Low Interest Credit",
    badgeHi: "मात्र 4% रियायती ब्याज",
    subsidy: "3% Prompt Repayment Interest Subvention",
    subsidyHi: "समय पर चुकता करने पर 3% का ब्याज अनुदान",
    status: "Available 24x7 at all Banks",
    statusHi: "सभी राष्ट्रीयकृत व ग्रामीण बैंकों में चालू",
    verifiedPortal: "myscheme.gov.in",
    actionLink: "https://www.myscheme.gov.in/schemes/kcc",
    helpline: "1800-115-526",
    documentsRequiredEn: "Application Form, Land Record (Khatauni/7/12), Aadhaar Card, PAN Card, Passport Photos",
    documentsRequiredHi: "आवेदन फॉर्म, जमीन के कागजात (खतौनी), आधार कार्ड, पैन कार्ड, फोटो"
  },

  // ==========================================
  // 6. MICRO-IRRIGATION & WATER
  // ==========================================
  {
    id: "micro-irrigation",
    category: "irrigation",
    categoryNameEn: "Micro-Irrigation (Drip)",
    categoryNameHi: "ड्रिप व स्प्रिंकलर सब्सिडी",
    titleEn: "Per Drop More Crop (PDMC) — PM Krishi Sinchayee Yojana",
    titleHi: "प्रधानमंत्री कृषि सिंचाई योजना — प्रति बूंद अधिक फसल (PDMC)",
    departmentEn: "Department of Agriculture & Farmers Welfare",
    departmentHi: "कृषि एवं किसान कल्याण विभाग",
    benefitEn: "55% (General Farmers) to 80% (Small/Marginal/Women/SC/ST) subsidy for Drip & Micro-Sprinkler systems",
    benefitHi: "ड्रिप एवं स्प्रिंकलर सिंचाई सिस्टम लगाने पर 55% (सामान्य किसान) से लेकर 80% (लघु/सीमांत/महिला/एससी-एसटी) तक अनुदान",
    eligibilityEn: "All farmers with an assured water source (Borewell, Tube well, Canal, Farm Pond) on cultivable land",
    eligibilityHi: "वे सभी किसान जिनके पास खेत में सुरक्षित जल स्रोत (बोरवेल/नलकूप/तालाब) है",
    badge: "Water & Power Saver",
    badgeHi: "80% तक ड्रिप सब्सिडी",
    subsidy: "55% to 80% Financial Assistance",
    subsidyHi: "55% से 80% तक सीधा वित्तीय अनुदान",
    status: "State Horticulture Portals Active",
    statusHi: "उद्यान विभाग पोर्टल पर सक्रिय",
    verifiedPortal: "pmksy.gov.in",
    actionLink: "https://pmksy.gov.in/",
    helpline: "1800-180-1551",
    documentsRequiredEn: "Aadhaar, Khatauni, Electricity Bill/Borewell declaration, Drip quotation from registered vendor",
    documentsRequiredHi: "आधार, खतौनी, बिजली बिल/बोरवेल शपथ पत्र, अधिकृत कंपनी का कोटेशन"
  },

  // ==========================================
  // 7. SOIL HEALTH & ORGANIC FARMING
  // ==========================================
  {
    id: "soil-health-card",
    category: "soil_organic",
    categoryNameEn: "Soil Health & Organic",
    categoryNameHi: "मृदा स्वास्थ्य व जैविक खेती",
    titleEn: "Soil Health Card (SHC) & Soil Nutrition Advisory",
    titleHi: "मृदा स्वास्थ्य कार्ड योजना (Soil Health Card)",
    departmentEn: "Integrated Nutrient Management Division, MoA&FW",
    departmentHi: "एकीकृत पोषक तत्व प्रबंधन प्रभाग, कृषि मंत्रालय",
    benefitEn: "100% Free laboratory testing of 12 soil parameters (N, P, K, S, Zn, Fe, Cu, Mn, Bo, pH, EC, OC) with crop-wise fertilizer dosage advisory",
    benefitHi: "खेत की मिट्टी के 12 पोषक तत्वों (NPK, जिंक, लोहा, बोरॉन, पीएच आदि) की 100% मुफ्त सरकारी लैब जांच व संतुलित खाद की सिफारिश",
    eligibilityEn: "All Indian farmers across all states and union territories every 2 years",
    eligibilityHi: "देश के सभी किसान भाई हर 2 साल में अपने खेत की जांच करा सकते हैं",
    badge: "Free Diagnostic Support",
    badgeHi: "100% निःशुल्क मिट्टी जांच",
    subsidy: "100% Free Testing & Advisory",
    subsidyHi: "100% फ्री जांच एवं वैज्ञानिक सलाह",
    status: "Active across all KVKs & Labs",
    statusHi: "सभी कृषि विज्ञान केंद्रों (KVK) में चालू",
    verifiedPortal: "soilhealth.dac.gov.in",
    actionLink: "https://soilhealth.dac.gov.in/",
    helpline: "1800-180-1551",
    documentsRequiredEn: "Soil sample collection from field, Aadhaar Card, Khasra Number",
    documentsRequiredHi: "खेत से मिट्टी का नमूना, आधार कार्ड, खसरा नंबर"
  },
  {
    id: "pkvy-organic",
    category: "soil_organic",
    categoryNameEn: "Soil Health & Organic",
    categoryNameHi: "मृदा स्वास्थ्य व जैविक खेती",
    titleEn: "Paramparagat Krishi Vikas Yojana (PKVY) — Organic Farming",
    titleHi: "परंपरागत कृषि विकास योजना (PKVY) — जैविक एवं प्राकृतिक खेती",
    departmentEn: "Natural Resource Management Division, MoA&FW",
    departmentHi: "प्राकृतिक संसाधन प्रबंधन प्रभाग, भारत सरकार",
    benefitEn: "₹50,000 / hectare financial assistance over 3 years (₹31,000 for organic inputs/bio-fertilizers + ₹8,800 for certification & packaging)",
    benefitHi: "3 वर्षों में ₹50,000 प्रति हेक्टेयर अनुदान (जैविक खाद, जीवामृत, वर्मीकम्पोस्ट, प्रमाणीकरण एवं ब्रांडिंग हेतु)",
    eligibilityEn: "Farmers forming clusters of 50 or more farmers with 50 acres land, Individual organic practitioners",
    eligibilityHi: "50 या अधिक किसानों का क्लस्टर (50 एकड़ समूह) अथवा व्यक्तिगत जैविक किसान",
    badge: "Zero Chemical Subsidy",
    badgeHi: "₹50,000/हेक्टेयर अनुदान",
    subsidy: "₹50,000 / Hectare Cluster Assistance",
    subsidyHi: "₹50,000 प्रति हेक्टेयर क्लस्टर सहायता",
    status: "Cluster Enrollment Open",
    statusHi: "क्लस्टर नामांकन जारी",
    verifiedPortal: "pgsindia-ncof.gov.in",
    actionLink: "https://pgsindia-ncof.gov.in/",
    helpline: "1800-180-1551",
    documentsRequiredEn: "Cluster Group Details, Aadhaar, Land Records, Bank Account",
    documentsRequiredHi: "किसान समूह सूची, आधार कार्ड, खसरा खतौनी, बैंक पासबुक"
  },

  // ==========================================
  // 8. INFRASTRUCTURE & COLD STORAGE
  // ==========================================
  {
    id: "agri-infra-fund",
    category: "machinery",
    categoryNameEn: "Machinery & Drones",
    categoryNameHi: "कृषि यंत्र व ड्रोन अनुदान",
    titleEn: "Agriculture Infrastructure Fund (AIF)",
    titleHi: "कृषि अवसंरचना कोष (Agri Infrastructure Fund)",
    departmentEn: "Department of Agriculture, Cooperation & Farmers Welfare",
    departmentHi: "कृषि, सहकारिता एवं किसान कल्याण विभाग",
    benefitEn: "₹2 Crore loan with 3% per annum interest subvention and CGTMSE credit guarantee for setting up Cold Storage, Sorting/Grading units, Warehouses, Processing units",
    benefitHi: "कोल्ड स्टोरेज, गोदाम, छंटाई-ग्रेडिंग यूनिट व प्रोसेसिंग प्लांट लगाने हेतु ₹2 करोड़ तक के लोन पर 3% ब्याज छूट व सरकारी गारंटी",
    eligibilityEn: "Primary Agricultural Credit Societies (PACS), FPOs, Agri-entrepreneurs, Startups, Individual Farmers",
    eligibilityHi: "प्राथमिक कृषि समितियां (PACS), एफपीओ, कृषि उद्यमी, स्टार्टअप एवं किसान",
    badge: "Post-Harvest Infrastructure",
    badgeHi: "₹2 करोड़ तक 3% ब्याज छूट",
    subsidy: "3% Interest Subvention for 7 Years",
    subsidyHi: "7 साल तक 3% ब्याज में छूट व सरकारी गारंटी",
    status: "National Portal Open",
    statusHi: "राष्ट्रीय पोर्टल पर आवेदन जारी",
    verifiedPortal: "agriinfra.dac.gov.in",
    actionLink: "https://agriinfra.dac.gov.in/",
    helpline: "1800-180-1551",
    documentsRequiredEn: "Detailed Project Report (DPR), Land Ownership / Lease agreement, KYC Documents, Bank Loan Sanction",
    documentsRequiredHi: "प्रोजेक्ट रिपोर्ट (DPR), भूमि स्वामित्व / लीज पेपर, केवाईसी, बैंक सैंक्शन"
  }
];
