"""
AgriVision AI — Comprehensive Agronomic & Prognostic Intelligence Engine
Full database of 42 classes with clinical symptoms, future predictions if untreated,
7-day recovery roadmap, organic and chemical controls, and nutritional management.
"""

AGRONOMIC_DB = {
    "American Bollworm on Cotton": {
        "crop": "Cotton",
        "category": "Pest Infestation",
        "pathogen": "Helicoverpa armigera",
        "severity": "Critical",
        "display_name": "American Bollworm (Cotton)",
        "symptoms": "Circular bored holes in flower buds (squares) and developing bolls with caterpillar frass at entrance; flared squares shedding prematurely; chewed foliage.",
        "environmental_factors": "Warm temperatures (25\u201332\u00b0C), intermittent monsoon showers with high humidity (>75%), excessive nitrogen fertilization.",
        "immediate_action": "Scout 20 plants across diagonals; if flared square rate exceeds 5% or >1 larva/plant, initiate immediate targeted intervention.",
        "future_prediction": {
            "loss_percentage": 85,
            "yield_loss_risk": "Catastrophic yield reduction of 70%\u201390% if untreated; bolls fail to open or rot completely, resulting in near-total lint harvest collapse.",
            "economic_impact": "Severe lint staining and fiber degradation causing 80% market price discount, with rejection from standard ginning mills.",
            "contagion_radius": "Extremely High. Adult moths fly up to 10 km overnight; a single female deposits 500\u20131,500 eggs across surrounding fields.",
            "neighbor_plot_risk": "Very High. Adjacent cotton, pigeon pea, chickpea, and tomato crops will encounter severe synchronous oviposition within 48 hours.",
            "progression_timeline": [
                {
                    "phase": "Days 1\u20133 (Egg & First Instar)",
                    "symptoms": "Spherical yellowish eggs laid singly on young leaves; minute larvae scrape tender foliage.",
                    "risk_level": "Moderate",
                    "loss_trajectory": "5%\u201310% square damage"
                },
                {
                    "phase": "Days 4\u20138 (Boll Boring & Flaring)",
                    "symptoms": "Larvae bore deeply into squares and young bolls; bracts flare open and drop; heavy frass visible.",
                    "risk_level": "High",
                    "loss_trajectory": "30%\u201345% developing boll destruction"
                },
                {
                    "phase": "Days 9\u201318 (Voracious Internal Feeding)",
                    "symptoms": "Fully grown larvae (35\u201345 mm) destroy mature bolls; entry wounds facilitate secondary bacterial/fungal rot.",
                    "risk_level": "Critical",
                    "loss_trajectory": "65%\u201385% total yield loss"
                },
                {
                    "phase": "Post Day 18 (Soil Pupation & Second Wave)",
                    "symptoms": "Larvae descend to soil to pupate; emerging adult swarm triggers an exponential second-generation infestation.",
                    "risk_level": "Catastrophic",
                    "loss_trajectory": "Total economic failure of cotton stand"
                }
            ]
        },
        "cure_roadmap": [
            {
                "day": "Day 1 (Sanitation & Trapping)",
                "action": "Handpick flared squares and dropped bolls; bury or burn them. Mount Helilure pheromone traps @ 12 traps/ha."
            },
            {
                "day": "Day 2\u20133 (Biological Knockdown)",
                "action": "Spray Bacillus thuringiensis (Bt) kurstaki @ 1.5\u20132.0 kg/ha or Azadirachtin 10000 ppm @ 2 ml/L during evening."
            },
            {
                "day": "Day 5 (Targeted Ovicidal/Larvicidal Spray)",
                "action": "If population exceeds ETL, spray Chlorantraniliprole 18.5% SC @ 0.3 ml/L (60 ml/acre) or Emamectin Benzoate 5% SG @ 0.4 g/L in 200 L water."
            },
            {
                "day": "Day 7\u201310 (Parasitoid Release & Perimeter Guard)",
                "action": "Release Trichogramma chilonis egg parasitoids @ 150,000/ha. Establish border rows of marigold or cowpea as trap crops."
            }
        ],
        "organic_control": [
            "Install Helilure pheromone traps @ 12\u201315 traps/hectare.",
            "Spray Neem Seed Kernel Extract (NSKE) 5% or Azadirachtin 10000 ppm @ 2 ml/L.",
            "Apply Bacillus thuringiensis (Bt) formulation @ 1.5\u20132.0 kg/ha.",
            "Release egg parasitoid Trichogramma chilonis @ 150,000/ha weekly."
        ],
        "chemical_control": [
            "Chlorantraniliprole 18.5% SC @ 0.3 ml/L (60 ml/acre) in 200 L water.",
            "Emamectin Benzoate 5% SG @ 0.4 g/L (80\u2013100 g/acre).",
            "Spinetoram 11.7% SC @ 1 ml/L for immediate knockdown."
        ],
        "nutritional_recovery": "Temporarily pause vegetative nitrogen. Foliar spray Potassium Nitrate (13:0:45) @ 10 g/L + Boron 20% @ 1 g/L to stimulate boll retention.",
        "preventive_measures": "Deep summer plowing to expose pupae; maintain optimum 90x60 cm plant spacing; avoid dense monoculture."
    },
    "Anthracnose on Cotton": {
        "crop": "Cotton",
        "category": "Fungal Disease",
        "pathogen": "Colletotrichum gossypii",
        "severity": "High",
        "display_name": "Cotton Anthracnose",
        "symptoms": "Reddish-brown sunken circular spots on seedlings, stems, and bolls; pinkish slimy spore masses under humid weather; premature boll mummification.",
        "environmental_factors": "Prolonged rainfall, relative humidity >85%, temperatures 25\u201330\u00b0C, poorly drained waterlogged soils.",
        "immediate_action": "Prune severely infected bolls and lower diseased foliage; improve cross-ventilation in the canopy.",
        "future_prediction": {
            "loss_percentage": 65,
            "yield_loss_risk": "50%\u201370% crop loss through seedling damping-off and internal boll rot; infected lint becomes brittle, dark brown, and unpickable.",
            "economic_impact": "Discolored lint stained with melanin pigments; fiber tensile strength drops by >40%, rendering lint unsaleable.",
            "contagion_radius": "Moderate to High. Spores splash-dispersed by rain up to 15\u201320 meters per storm, rapidly contaminating contiguous rows.",
            "neighbor_plot_risk": "Moderate. High danger during heavy rainstorms or sprinkler irrigation with runoff.",
            "progression_timeline": [
                {
                    "phase": "Days 1\u20133 (Inception & Spotting)",
                    "symptoms": "Small, watersoaked reddish-brown spots appear on bracts and seedling stems.",
                    "risk_level": "Moderate",
                    "loss_trajectory": "10% foliage spotting"
                },
                {
                    "phase": "Days 4\u20138 (Boll Lesion Depressions)",
                    "symptoms": "Lesions enlarge, sink into carpel tissue, and produce gelatinous pink spore masses during morning dew.",
                    "risk_level": "High",
                    "loss_trajectory": "25%\u201340% boll integrity compromised"
                },
                {
                    "phase": "Days 9\u201315 (Internal Rot & Lint Staining)",
                    "symptoms": "Mycelium invades internal locules; lint rots into a blackish-yellow slimy mass; bolls mummify without opening.",
                    "risk_level": "Critical",
                    "loss_trajectory": "50%\u201365% yield destruction"
                },
                {
                    "phase": "Post Day 15 (Systemic Seed Contamination)",
                    "symptoms": "Spores colonize seed coats, creating infected seed banks that will cause severe damping-off in subsequent sowings.",
                    "risk_level": "Critical",
                    "loss_trajectory": "Total loss of seed viability"
                }
            ]
        },
        "cure_roadmap": [
            {
                "day": "Day 1 (Sanitation & Airflow)",
                "action": "Remove mummified and rotting bolls; clear weed undergrowth to drop canopy humidity."
            },
            {
                "day": "Day 2\u20133 (Systemic Fungicide Application)",
                "action": "Foliar spray Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1 ml/L or Carbendazim 50% WP @ 1 g/L."
            },
            {
                "day": "Day 5 (Copper Protective Shield)",
                "action": "Apply Copper Oxychloride 50% WP @ 2.5 g/L to create a contact barrier against secondary conidial germination."
            },
            {
                "day": "Day 7\u201310 (Bio-Protective Inoculation)",
                "action": "Spray Trichoderma viride or Pseudomonas fluorescens @ 5 g/L to outcompete residual Colletotrichum pathogen."
            }
        ],
        "organic_control": [
            "Foliar spray Trichoderma viride or Pseudomonas fluorescens @ 5 g/L.",
            "Neem oil spray (3000 ppm) @ 4 ml/L with liquid soap emulsifier.",
            "Copper hydroxide organic formulations as protective shields."
        ],
        "chemical_control": [
            "Carbendazim 50% WP @ 1 g/L or Mancozeb 75% WP @ 2 g/L.",
            "Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1 ml/L.",
            "Copper oxychloride 50% WP @ 2.5 g/L."
        ],
        "nutritional_recovery": "Apply soluble Potassium Silicate @ 2 g/L to reinforce epidermal cell walls and curb fungal haustorium penetration.",
        "preventive_measures": "Treat seeds with Thiram @ 3 g/kg before sowing; rotate cotton with non-malvaceous cereals for 2 seasons."
    },
    "Cotton Aphid": {
        "crop": "Cotton",
        "category": "Pest Infestation",
        "pathogen": "Aphis gossypii",
        "severity": "Moderate",
        "display_name": "Cotton Aphid Infestation",
        "symptoms": "Downward curling and cupping of tender leaves; sticky honeydew secretions on foliage causing black sooty mold; stunted terminal shoots.",
        "environmental_factors": "Cool dry weather, drought stress, excessive synthetic pyrethroid usage killing natural predators.",
        "immediate_action": "Spray strong water jet or neem emulsion; inspect undersides of top leaves for natural predator activity.",
        "future_prediction": {
            "loss_percentage": 50,
            "yield_loss_risk": "35%\u201350% yield drop through vigorous sap loss, honeydew-stained lint (sticky cotton), and viral transmission.",
            "economic_impact": "Honeydew sugar contamination clogs spinning machinery in textile mills; severe dockage or rejection of cotton bales.",
            "contagion_radius": "High. Winged aphids (alatae) disperse widely with prevailing winds over whole farm zones.",
            "neighbor_plot_risk": "High. Aphids multiply exponentially (parthenogenesis) and disperse to all neighboring cotton and vegetable crops.",
            "progression_timeline": [
                {
                    "phase": "Days 1\u20133 (Colony Formation)",
                    "symptoms": "Dense clusters of wingless aphids form on terminal shoots and leaf undersides.",
                    "risk_level": "Mild",
                    "loss_trajectory": "5% sap depletion"
                },
                {
                    "phase": "Days 4\u20137 (Downward Leaf Curling)",
                    "symptoms": "Leaves curl downwards into cups; extensive honeydew coats foliage like glossy varnish.",
                    "risk_level": "Moderate",
                    "loss_trajectory": "15%\u201325% photosynthetic drop"
                },
                {
                    "phase": "Days 8\u201314 (Black Sooty Mold Overgrowth)",
                    "symptoms": "Capnodium black mold blankets leaves; foliage suffocates and drops; square formation halts.",
                    "risk_level": "High",
                    "loss_trajectory": "30%\u201345% vegetative stunting"
                },
                {
                    "phase": "Post Day 14 (Sticky Lint Contamination)",
                    "symptoms": "Honeydew drips onto bursting bolls, permanently cementing sugar residues into cotton fibers.",
                    "risk_level": "Critical",
                    "loss_trajectory": "50% lint market value wiped out"
                }
            ]
        },
        "cure_roadmap": [
            {
                "day": "Day 1 (Biological & Mechanical Flush)",
                "action": "Wash undersides of foliage with overhead water spray or 1% soap solution; install yellow sticky traps @ 20/acre."
            },
            {
                "day": "Day 2 (Botanical Knockdown)",
                "action": "Apply Azadirachtin 10000 ppm @ 2 ml/L or Fish Oil Rosin Soap (FORS) @ 25 g/L."
            },
            {
                "day": "Day 4 (Systemic Insecticide if Above ETL)",
                "action": "Spray Flonicamid 50% WG @ 0.3 g/L or Acetamiprid 20% SP @ 0.2 g/L."
            },
            {
                "day": "Day 8 (Predator Conservation)",
                "action": "Encourage Ladybird beetles (Coccinella septempunctata) and Green Lacewings (Chrysoperla carnea)."
            }
        ],
        "organic_control": [
            "Install yellow sticky traps @ 20\u201325 traps/acre.",
            "Spray Neem oil (10000 ppm) @ 2 ml/L or Verticillium lecanii @ 5 g/L.",
            "Release Chrysoperla carnea predators @ 10,000/ha."
        ],
        "chemical_control": [
            "Flonicamid 50% WG @ 0.3 g/L (60\u201380 g/acre).",
            "Acetamiprid 20% SP @ 0.2 g/L (40 g/acre).",
            "Diafenthiuron 50% WP @ 1 g/L."
        ],
        "nutritional_recovery": "Foliar spray Micronutrient mixture @ 2 g/L to reverse chlorosis; avoid excess nitrogen applications.",
        "preventive_measures": "Seed treatment with Imidacloprid 70% WS @ 5 g/kg seed; intercrop with cowpea or sorghum as refuge for predatory insects."
    },
    "Leaf Curl": {
        "crop": "Cotton",
        "category": "Viral Disease",
        "pathogen": "Cotton Leaf Curl Virus (CLCuV) / Begomovirus",
        "severity": "Critical",
        "display_name": "Cotton Leaf Curl Disease (CLCuD)",
        "symptoms": "Upward or downward leaf curling; thickening of primary/secondary veins; leafy cup-like enations on lower leaf surfaces; severe plant stunting.",
        "environmental_factors": "High whitefly (Bemisia tabaci) populations, warm temperatures (30\u201338\u00b0C), dry windy weather facilitating vector flight.",
        "immediate_action": "Target the whitefly vector immediately with systemic insecticides; rogue out early infected plants (<45 days old).",
        "future_prediction": {
            "loss_percentage": 80,
            "yield_loss_risk": "Up to 80% yield reduction if infection occurs prior to squaring; infected plants become stunted bushes producing zero harvestable bolls.",
            "economic_impact": "Devastating regional yield collapse; ginning outturn and fiber elongation severely stunted.",
            "contagion_radius": "Extremely High. Whiteflies transmit virus persistently; wind currents carry viruliferous whiteflies across 5\u201315 km.",
            "neighbor_plot_risk": "Severe. All susceptible cotton varieties downwind face 90% infection risk within 10 days.",
            "progression_timeline": [
                {
                    "phase": "Days 1\u20135 (Vein Clearing & Micro-Curling)",
                    "symptoms": "Small vein clearing on tender top leaves; margins curl slightly upward or downward.",
                    "risk_level": "Moderate",
                    "loss_trajectory": "10% vigor loss"
                },
                {
                    "phase": "Days 6\u201312 (Vein Thickening & Enations)",
                    "symptoms": "Veins swell and turn dark green; small leaf-like cups (enations) develop on underside of veins.",
                    "risk_level": "High",
                    "loss_trajectory": "35%\u201350% internode shortening"
                },
                {
                    "phase": "Days 13\u201321 (Stunting & Flower Abortion)",
                    "symptoms": "Severe internode compression; plants become dwarf with bunched canopy; flower buds abort completely.",
                    "risk_level": "Critical",
                    "loss_trajectory": "65%\u201380% boll count reduction"
                },
                {
                    "phase": "Post Day 21 (Complete Reproductive Failure)",
                    "symptoms": "No sympodial fruiting branches form; stand turns into sterile vegetative shrubs.",
                    "risk_level": "Catastrophic",
                    "loss_trajectory": "Irreversible economic loss"
                }
            ]
        },
        "cure_roadmap": [
            {
                "day": "Day 1 (Vector Interception & Rogueing)",
                "action": "Uproot and burn early infected plants if under 45 days. Install yellow sticky traps @ 25/acre to catch whiteflies."
            },
            {
                "day": "Day 2 (Systemic Vector Knockdown)",
                "action": "Spray Pyriproxyfen 10% + Diafenthiuron 46.5% WG @ 1.25 g/L or Spiromesifen 22.9% SC @ 1 ml/L to kill whitefly nymphs and adults."
            },
            {
                "day": "Day 5 (Botanical Vector Repellent)",
                "action": "Apply Azadirachtin 10000 ppm @ 2 ml/L combined with fish oil soap to prevent whitefly landing."
            },
            {
                "day": "Day 8 (Anti-Viral Tonic & Micronutrients)",
                "action": "Foliar spray Zinc Sulphate (0.5%) + Boron (0.1%) + Urea (1%) to sustain metabolic functions in unaffected tissues."
            }
        ],
        "organic_control": [
            "Install yellow sticky traps @ 30 traps/acre.",
            "Foliar spray with Neem oil 10000 ppm @ 2.5 ml/L.",
            "Release Chrysoperla carnea predators @ 10,000/ha to feed on whitefly nymphs."
        ],
        "chemical_control": [
            "Pyriproxyfen 10% EC @ 2 ml/L (targets whitefly eggs and nymphs).",
            "Diafenthiuron 50% WP @ 1.2 g/L.",
            "Afidopyropen 50 g/L DC @ 2 ml/L."
        ],
        "nutritional_recovery": "Foliar spray Zinc Chelate @ 1.5 g/L + Magnesium Sulphate @ 5 g/L + 13:0:45 @ 5 g/L to overcome viral chlorosis.",
        "preventive_measures": "Grow CLCuD-resistant Bt cotton hybrids; treat seeds with Thiamethoxam 30% FS @ 7 ml/kg; eradicate weed reservoirs (Abutilon, Xanthium)."
    },
    "bacterial_blight in Cotton": {
        "crop": "Cotton",
        "category": "Bacterial Disease",
        "pathogen": "Xanthomonas citri pv. malvacearum",
        "severity": "Critical",
        "display_name": "Bacterial Blight of Cotton (Black Arm)",
        "symptoms": "Angular watersoaked leaf spots restricted by veins (Angular Leaf Spot); black elongated lesions on stems/petioles (Black Arm); circular sunken black spots on bolls.",
        "environmental_factors": "High humidity (>85%), temperatures 30\u201335\u00b0C, wind-driven torrential rains splashing bacteria onto plant surfaces.",
        "immediate_action": "Spray Streptocycline + Copper Oxychloride immediately; avoid flood irrigation or working in wet fields.",
        "future_prediction": {
            "loss_percentage": 70,
            "yield_loss_risk": "50%\u201370% crop loss through seedling blight, stem breakage at black arm lesions, and rotten bolls.",
            "economic_impact": "Boll carpel rot stains lint dull brown; bacterial slime causes weak, brittle fibers unusable for spinning.",
            "contagion_radius": "High. Rain splashes bacteria across multiple rows; windstorms spread aerosol droplets across 1 km.",
            "neighbor_plot_risk": "High. Shared drainage and wind gusts during rain rapidly transfer inoculum to neighboring fields.",
            "progression_timeline": [
                {
                    "phase": "Days 1\u20133 (Angular Leaf Spot)",
                    "symptoms": "Tiny water-soaked angular spots appear between veinlets on lower leaf surfaces.",
                    "risk_level": "Moderate",
                    "loss_trajectory": "10% leaf spotting"
                },
                {
                    "phase": "Days 4\u20137 (Vein Blight & Petiole Lesions)",
                    "symptoms": "Bacteria advance along main veins; petioles develop purplish-black lesions and drop prematurely.",
                    "risk_level": "High",
                    "loss_trajectory": "25%\u201340% defoliation"
                },
                {
                    "phase": "Days 8\u201315 (Black Arm Girdling)",
                    "symptoms": "Stem lesions expand into shiny black cankers (Black Arm); main stems and fruiting branches snap under wind.",
                    "risk_level": "Critical",
                    "loss_trajectory": "50%\u201365% vegetative structure lost"
                },
                {
                    "phase": "Post Day 15 (Boll Rot & Locule Destruction)",
                    "symptoms": "Sunken black lesions rot young bolls; seeds become infected; entire carpels turn into dry brown mush.",
                    "risk_level": "Catastrophic",
                    "loss_trajectory": "70% harvestable boll loss"
                }
            ]
        },
        "cure_roadmap": [
            {
                "day": "Day 1 (Sanitation & Moisture Control)",
                "action": "Avoid moving through wet fields to prevent spreading bacterial slime; drain standing water."
            },
            {
                "day": "Day 2 (Bactericidal Knockdown)",
                "action": "Spray Streptocycline @ 6 g / 50 L water combined with Copper Oxychloride 50% WP @ 50 g / 50 L."
            },
            {
                "day": "Day 5 (Potash Cell-Wall Hardening)",
                "action": "Apply Potassium Nitrate (13:0:45) @ 10 g/L foliar spray to fortify pectin layers in parenchyma."
            },
            {
                "day": "Day 8 (Secondary Barrier Spray)",
                "action": "Spray Copper Hydroxide 53.8% DF @ 1.5 g/L to protect new flush and developing bolls."
            }
        ],
        "organic_control": [
            "Foliar spray with Pseudomonas fluorescens @ 10 g/L.",
            "Spray 10% fresh cow dung extract supernatant.",
            "Seed treatment with bio-control Bacillus subtilis."
        ],
        "chemical_control": [
            "Streptocycline @ 6 g / 50 L + Copper Oxychloride @ 50 g / 50 L water.",
            "Copper Hydroxide 53.8% DF @ 1.5 g/L.",
            "Kasugamycin 3% SL @ 2 ml/L."
        ],
        "nutritional_recovery": "Withhold excess urea; top-dress MOP @ 20 kg/acre to improve disease resistance.",
        "preventive_measures": "Acid delinting of cotton seeds with concentrated sulfuric acid (100 ml/kg seed); cultivate resistant cultivars."
    },
    "bollrot on Cotton": {
        "crop": "Cotton",
        "category": "Fungal/Bacterial Complex",
        "pathogen": "Fusarium, Aspergillus niger, Colletotrichum & Rhizopus spp.",
        "severity": "Critical",
        "display_name": "Cotton Boll Rot Complex",
        "symptoms": "Discolored brown or black soft rotting bolls; fungal molds (black, pink, or grayish) coating boll surface; bolls fail to open or open partially with tight rotten locules.",
        "environmental_factors": "Dense canopy trapping humidity (>90%), continuous rain during boll opening, insect puncture wounds.",
        "immediate_action": "Prune lower vegetative branches to permit sunlight and air into lower canopy; spray broad-spectrum fungicide.",
        "future_prediction": {
            "loss_percentage": 75,
            "yield_loss_risk": "60%\u201375% lint yield loss; affected bolls cannot be picked or produce damaged 'tight lock' fiber.",
            "economic_impact": "Severely moldy, aflatoxin-contaminated lint and seeds; total rejection by commercial ginning and oil extraction units.",
            "contagion_radius": "Moderate. Airborne conidia and saprophytic spores spread easily within humid microclimates.",
            "neighbor_plot_risk": "Moderate. Dense, over-irrigated neighboring cotton fields are highly susceptible.",
            "progression_timeline": [
                {
                    "phase": "Days 1\u20133 (Puncture & Spot Infection)",
                    "symptoms": "Water-soaked brown spots appear on boll carpels, often around insect bore holes or suture lines.",
                    "risk_level": "Moderate",
                    "loss_trajectory": "10% boll integrity drop"
                },
                {
                    "phase": "Days 4\u20137 (Internal Fungal Proliferation)",
                    "symptoms": "Fungal hyphae penetrate carpel wall into seed locules; internal lint transforms into a wet, rotting pulp.",
                    "risk_level": "High",
                    "loss_trajectory": "30%\u201350% boll loss"
                },
                {
                    "phase": "Days 8\u201314 (External Mold Bloom)",
                    "symptoms": "Profuse black/gray/pink mold mats cover entire boll exterior; bolls fail to dehisce; sutures cement shut.",
                    "risk_level": "Critical",
                    "loss_trajectory": "60%\u201375% harvest loss"
                },
                {
                    "phase": "Post Day 14 (Mummification & Aflatoxin)",
                    "symptoms": "Bolls dry into blackened, shriveled mummies firmly attached to dead branches; seed embryos killed.",
                    "risk_level": "Catastrophic",
                    "loss_trajectory": "Unpickable crop and seed contamination"
                }
            ]
        },
        "cure_roadmap": [
            {
                "day": "Day 1 (Canopy Aeration)",
                "action": "De-top dense terminal shoots and prune bottom vegetative branches to let sunlight reach lower bolls."
            },
            {
                "day": "Day 2 (Fungicide Knockdown)",
                "action": "Foliar spray Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1 ml/L or Carbendazim 12% + Mancozeb 63% WP @ 2 g/L."
            },
            {
                "day": "Day 4 (Insect Vector Control)",
                "action": "Spray Chlorantraniliprole @ 0.3 ml/L or Emamectin @ 0.4 g/L to eliminate caterpillar punctures that invite rot."
            },
            {
                "day": "Day 7 (Copper Shield)",
                "action": "Spray Copper Oxychloride 50% WP @ 2.5 g/L to dry external fungal mats."
            }
        ],
        "organic_control": [
            "Foliar spray Trichoderma harzianum @ 5 g/L.",
            "Apply copper soap formulations.",
            "Pruning lower canopy leaves (bottom defoliation) to decrease moisture."
        ],
        "chemical_control": [
            "Carbendazim 12% + Mancozeb 63% WP @ 2 g/L.",
            "Azoxystrobin + Difenoconazole SC @ 1 ml/L.",
            "Copper Oxychloride 50% WP @ 2.5 g/L."
        ],
        "nutritional_recovery": "Apply Calcium Nitrate @ 5 g/L + Boron @ 1 g/L foliar spray to reinforce carpel suture strength.",
        "preventive_measures": "Control boll-puncturing pests (bollworms, bugs); avoid high plant density (maintain 90 cm row spacing); avoid late heavy nitrogen."
    },
    "bollworm on Cotton": {
        "crop": "Cotton",
        "category": "Pest Infestation",
        "pathogen": "Earias vittella / Earias insulana (Spotted Bollworm)",
        "severity": "Critical",
        "display_name": "Spotted Bollworm on Cotton",
        "symptoms": "Terminal shoot withering and drooping (top shoot boring); flared squares shedding; bolls bored with entry holes plugged with excrement/frass.",
        "environmental_factors": "Moderate to warm temperatures (24\u201330\u00b0C), cloudy days, presence of alternative malvaceous weed hosts.",
        "immediate_action": "Cut and destroy drooping withered terminal shoots to kill larvae inside; install light traps.",
        "future_prediction": {
            "loss_percentage": 70,
            "yield_loss_risk": "50%\u201370% reduction in boll count; main stem stunting and multiple vegetative side branching.",
            "economic_impact": "Locules eaten away; damaged lint stained brown-yellow, losing staple length and marketability.",
            "contagion_radius": "High. Adult moths are active fliers capable of covering multiple hectares in a few nights.",
            "neighbor_plot_risk": "High. Bhendi (okra) and cotton plots nearby act as major amplification hosts.",
            "progression_timeline": [
                {
                    "phase": "Days 1\u20133 (Shoot Boring Phase)",
                    "symptoms": "Larvae bore into tender terminal shoots; growing tips wilt, droop, and dry up.",
                    "risk_level": "Moderate",
                    "loss_trajectory": "10% apical shoot loss"
                },
                {
                    "phase": "Days 4\u20138 (Square & Flower Feeding)",
                    "symptoms": "Larvae shift to flower buds; bracteoles flare outward and drop prematurely.",
                    "risk_level": "High",
                    "loss_trajectory": "30%\u201345% square shedding"
                },
                {
                    "phase": "Days 9\u201316 (Boll Boring & Premature Opening)",
                    "symptoms": "Larvae bore into green bolls, plugging entrance with muddy frass; bolls open prematurely with decayed lint.",
                    "risk_level": "Critical",
                    "loss_trajectory": "55%\u201370% harvestable boll loss"
                },
                {
                    "phase": "Post Day 16 (Boll Shedding & Pupation)",
                    "symptoms": "Infected bolls drop to ground; larvae pupate in boat-shaped cocoons on plant or soil debris.",
                    "risk_level": "Catastrophic",
                    "loss_trajectory": "Second generation resurgence"
                }
            ]
        },
        "cure_roadmap": [
            {
                "day": "Day 1 (Shoot Pruning & Trap Setup)",
                "action": "Clip and incinerate drooping shoots containing larvae. Install light traps and Earias pheromone traps @ 12/ha."
            },
            {
                "day": "Day 2 (Bio-Pesticide Application)",
                "action": "Foliar spray Bacillus thuringiensis @ 2 kg/ha or NSKE 5% @ 50 ml/L in evening hours."
            },
            {
                "day": "Day 5 (Targeted Insecticide Intervention)",
                "action": "Spray Chlorantraniliprole 18.5% SC @ 0.3 ml/L or Flubendiamide 39.35% SC @ 0.2 ml/L."
            },
            {
                "day": "Day 8 (Egg Parasitoid Release)",
                "action": "Release Trichogramma chilonis @ 150,000/ha."
            }
        ],
        "organic_control": [
            "Release Trichogramma chilonis @ 150,000/ha weekly 3 times.",
            "Spray Neem Seed Kernel Extract (NSKE) 5% @ 50 ml/L.",
            "Apply Bacillus thuringiensis formulation @ 1.5\u20132 kg/ha."
        ],
        "chemical_control": [
            "Chlorantraniliprole 18.5% SC @ 0.3 ml/L (60 ml/acre).",
            "Flubendiamide 39.35% SC @ 0.2 ml/L.",
            "Emamectin Benzoate 5% SG @ 0.4 g/L."
        ],
        "nutritional_recovery": "Foliar spray 19:19:19 soluble NPK @ 5 g/L to stimulate compensatory sympodial branch development.",
        "preventive_measures": "Destroy alternative hosts like Abutilon indicum and Hibiscus; avoid planting okra in vicinity of cotton fields."
    },
    "cotton mealy bug": {
        "crop": "Cotton",
        "category": "Pest Infestation",
        "pathogen": "Phenacoccus solenopsis",
        "severity": "Critical",
        "display_name": "Cotton Mealybug Infestation",
        "symptoms": "Heavy white waxy powdery cotton-like colonies clustering on terminal shoots, stems, and boll stalks; leaf crinkling; severe stunting and terminal death.",
        "environmental_factors": "Warm and dry conditions (30\u201335\u00b0C), drought stress, absence of early natural parasitoids, ant mutualism protecting mealybugs.",
        "immediate_action": "Spray strong jet of soap water + neem oil to dissolve protective waxy layer; destroy surrounding Parthenium hysterophorus weeds.",
        "future_prediction": {
            "loss_percentage": 85,
            "yield_loss_risk": "60%\u201385% loss; infested plants become completely encased in white wax, drop all squares/bolls, and desiccate.",
            "economic_impact": "Total loss of harvestable cotton on affected plants; bolls remain undersized, deformed, and covered in unpickable wax.",
            "contagion_radius": "High. Crawlers transported by wind, ants, workers' clothing, and grazing cattle across fields.",
            "neighbor_plot_risk": "Severe. Mealybugs attack over 150 host species including weeds, vegetables, and ornamentals.",
            "progression_timeline": [
                {
                    "phase": "Days 1\u20134 (Stem Clustering & Crawlers)",
                    "symptoms": "Minute pink crawlers settle on terminal nodes; early white powdery wax begins secreting.",
                    "risk_level": "Moderate",
                    "loss_trajectory": "10% shoot growth deceleration"
                },
                {
                    "phase": "Days 5\u201310 (Colony Swelling & Honeydew)",
                    "symptoms": "Dense white waxy crusts encase stems and petioles; copious honeydew draws black ants and sooty mold.",
                    "risk_level": "High",
                    "loss_trajectory": "30%\u201350% square abortion"
                },
                {
                    "phase": "Days 11\u201320 (Complete Plant Smothering)",
                    "symptoms": "Bolls become engulfed in white wax; bolls fail to open; leaves dry up and hang like parchment.",
                    "risk_level": "Critical",
                    "loss_trajectory": "65%\u201380% plant yield wiped out"
                },
                {
                    "phase": "Post Day 20 (Stem Desiccation & Death)",
                    "symptoms": "Terminal shoots die back; plant completely withers; crawlers disperse to adjacent rows.",
                    "risk_level": "Catastrophic",
                    "loss_trajectory": "Total plant mortality"
                }
            ]
        },
        "cure_roadmap": [
            {
                "day": "Day 1 (Weed Clearance & Ant Barrier)",
                "action": "Eradicate Parthenium and Congress grass on bunds. Apply Chlorpyrifos dust 1.5% around plant base to stop ants."
            },
            {
                "day": "Day 2 (Wax-Stripping Botanical Spray)",
                "action": "Foliar spray Fish Oil Rosin Soap (FORS) @ 25 g/L + Neem oil 10000 ppm @ 3 ml/L to strip protective wax."
            },
            {
                "day": "Day 4 (Systemic Insecticide Intervention)",
                "action": "Spray Spirotetramat 15.31% w/w OD @ 1 ml/L or Profenofos 50% EC @ 2 ml/L with penetrant sticker."
            },
            {
                "day": "Day 8 (Parasitoid Inoculation)",
                "action": "Conserve or introduce encyrtid parasitoid wasp Aenasius arizonensis (Aenasius bambawalei)."
            }
        ],
        "organic_control": [
            "Conserve and release parasitic wasp Aenasius arizonensis.",
            "Foliar spray Fish Oil Rosin Soap (FORS) @ 25 g/L.",
            "Spray entomopathogenic fungus Verticillium lecanii @ 5 g/L with soap."
        ],
        "chemical_control": [
            "Spirotetramat 15.31% w/w OD @ 1 ml/L (two-way systemic).",
            "Profenofos 50% EC @ 2 ml/L.",
            "Buprofezin 25% SC @ 2 ml/L (insect growth regulator)."
        ],
        "nutritional_recovery": "Apply humic acid @ 3 ml/L drench to rejuvenate damaged root zones and alleviate toxic stress.",
        "preventive_measures": "Create a 5-meter weed-free barrier around fields; destroy post-harvest cotton stalks; avoid using infested equipment."
    },
    "cotton whitefly": {
        "crop": "Cotton",
        "category": "Pest Infestation & Virus Vector",
        "pathogen": "Bemisia tabaci",
        "severity": "Critical",
        "display_name": "Cotton Whitefly Infestation",
        "symptoms": "Clouds of tiny white moth-like insects fluttering when shaken; yellow chlorotic speckling on upper leaf surfaces; shiny sticky honeydew and black sooty mold; transmission of leaf curl virus.",
        "environmental_factors": "Hot and humid weather (32\u201338\u00b0C), drought spells, excessive nitrogen fertilizer, indiscriminate pyrethroid usage.",
        "immediate_action": "Install yellow sticky traps @ 30/acre; spray systemic lipid-synthesis inhibitor targeting nymph stages.",
        "future_prediction": {
            "loss_percentage": 75,
            "yield_loss_risk": "50%\u201375% yield loss through combined sap loss, sooty mold photosynthesis blockage, and Cotton Leaf Curl Virus (CLCuD) spread.",
            "economic_impact": "Honeydew-contaminated lint downgraded or rejected; CLCuD transmission causes permanent sterility.",
            "contagion_radius": "Extremely High. Adult whiteflies are carried by wind currents for 5\u201310 km across entire farming taluks.",
            "neighbor_plot_risk": "Severe. Neighboring cotton, brinjal, tomato, and chilli crops will face sudden vector colonization.",
            "progression_timeline": [
                {
                    "phase": "Days 1\u20133 (Egg Laying on Under-Surface)",
                    "symptoms": "Minute yellowish eggs laid in circles on lower leaves; tiny greenish translucent crawlers emerge.",
                    "risk_level": "Moderate",
                    "loss_trajectory": "5% sap loss"
                },
                {
                    "phase": "Days 4\u20138 (Nymphal Feeding & Honeydew)",
                    "symptoms": "Scale-like sessile nymphs suck phloem sap voraciously; copius honeydew secretion starts.",
                    "risk_level": "High",
                    "loss_trajectory": "20%\u201335% foliar vitality drop"
                },
                {
                    "phase": "Days 9\u201315 (Sooty Mold Blanket)",
                    "symptoms": "Leaves turn pitch black with Capnodium fungus; photosynthetic rate drops by 80%; squares shed.",
                    "risk_level": "Critical",
                    "loss_trajectory": "45%\u201365% square & boll loss"
                },
                {
                    "phase": "Post Day 15 (Viral Outbreak & Defoliation)",
                    "symptoms": "Leaf Curl Virus symptoms manifest; leaves drop prematurely; bolls fail to mature or produce weak lint.",
                    "risk_level": "Catastrophic",
                    "loss_trajectory": "75% harvestable yield lost"
                }
            ]
        },
        "cure_roadmap": [
            {
                "day": "Day 1 (Mass Trapping)",
                "action": "Erect bright yellow sticky sheets (coated with castor oil/glue) at canopy height @ 30 sheets/acre."
            },
            {
                "day": "Day 2 (Nymph & Adult Chemical Spray)",
                "action": "Foliar spray Pyriproxyfen 10% + Diafenthiuron 46.5% WG @ 1.25 g/L or Afidopyropen 50 g/L DC @ 2 ml/L."
            },
            {
                "day": "Day 5 (Botanical Deterrent)",
                "action": "Spray Azadirachtin 10000 ppm @ 2 ml/L to deter adult feeding and egg laying."
            },
            {
                "day": "Day 8 (Bio-Agent Application)",
                "action": "Spray entomopathogenic fungus Beauveria bassiana or Lecanicillium lecanii @ 5 g/L in high humidity."
            }
        ],
        "organic_control": [
            "Yellow sticky traps @ 30 traps/acre.",
            "Lecanicillium lecanii or Beauveria bassiana @ 5 g/L.",
            "Azadirachtin 10000 ppm @ 2 ml/L."
        ],
        "chemical_control": [
            "Pyriproxyfen 10% EC @ 2 ml/L (IGR targeting eggs and nymphs).",
            "Diafenthiuron 50% WP @ 1.2 g/L.",
            "Afidopyropen 50 g/L DC @ 2 ml/L.",
            "Spiromesifen 22.9% SC @ 1 ml/L."
        ],
        "nutritional_recovery": "Avoid urea; foliar spray Potassium Nitrate (13:0:45) @ 10 g/L + Magnesium Sulphate @ 5 g/L to clear chlorosis.",
        "preventive_measures": "Avoid synthetic pyrethroids which cause whitefly resurgence; grow hairy-leaved tolerant cultivars; weed out host plants."
    },
    "pink bollworm in cotton": {
        "crop": "Cotton",
        "category": "Pest Infestation",
        "pathogen": "Pectinophora gossypiella",
        "severity": "Critical",
        "display_name": "Pink Bollworm in Cotton",
        "symptoms": "Rosetted flowers with twisted petals that fail to open fully; pinhead bore holes in young bolls that heal externally; larvae burrowing internally into seeds and locules; premature boll opening with stained, rotten lint.",
        "environmental_factors": "Late-season crop extension, warm humid conditions (25\u201330\u00b0C), continuous mono-cropping of cotton.",
        "immediate_action": "Install Pectinolure pheromone traps @ 8\u201310/acre; destructively sample 20 green bolls to assess internal larval entry.",
        "future_prediction": {
            "loss_percentage": 85,
            "yield_loss_risk": "Catastrophic 60%\u201385% reduction in commercial lint yield; late season bolls open into decayed 'hard locks'.",
            "economic_impact": "Seeds hollowed out resulting in zero oil content and zero seed germination; fiber yellowed, weak, and unsaleable.",
            "contagion_radius": "High. Adult nocturnal moths disperse over 3\u20135 km; diapause larvae survive in cotton gin trash and seed stores.",
            "neighbor_plot_risk": "Severe. All cotton fields in ginning shed proximity face persistent seasonal re-infestation.",
            "progression_timeline": [
                {
                    "phase": "Days 1\u20133 (Rosetted Flower Phase)",
                    "symptoms": "Larvae web flower petals together, creating twisted 'rosetted flowers'; anthers eaten.",
                    "risk_level": "Moderate",
                    "loss_trajectory": "15% flower fertilization loss"
                },
                {
                    "phase": "Days 4\u201310 (Invisible Boll Infiltration)",
                    "symptoms": "Neonates bore into green bolls; bore holes heal into minute brown warts, masking internal feeding.",
                    "risk_level": "High",
                    "loss_trajectory": "35%\u201350% internal seed damage"
                },
                {
                    "phase": "Days 11\u201320 (Double Seed Lodging & Rot)",
                    "symptoms": "Larvae hollow out two adjacent seeds, webbing them together ('double seeds'); lint decays into hard locks.",
                    "risk_level": "Critical",
                    "loss_trajectory": "65%\u201380% lint destruction"
                },
                {
                    "phase": "Post Day 20 (Diapause in Seed & Trash)",
                    "symptoms": "Larvae enter prolonged diapause inside seed cavities, ensuring survival until the next cotton season.",
                    "risk_level": "Catastrophic",
                    "loss_trajectory": "Complete crop cycle failure"
                }
            ]
        },
        "cure_roadmap": [
            {
                "day": "Day 1 (Pheromone Trapping & Flower Rogueing)",
                "action": "Install Pectinolure pheromone traps @ 10 traps/acre. Hand-pick and destroy rosetted flowers."
            },
            {
                "day": "Day 2 (Mating Disruption / Biological Knockdown)",
                "action": "Deploy PB-Rope L pheromone mating disruption ties @ 100 dispensers/acre or spray Bt kurstaki @ 2 kg/ha."
            },
            {
                "day": "Day 4 (Targeted Chemical Interception)",
                "action": "Foliar spray Chlorantraniliprole 18.5% SC @ 0.3 ml/L or Emamectin Benzoate 5% SG @ 0.4 g/L during late evening."
            },
            {
                "day": "Day 8 (Trichogramma Parasitoid Release)",
                "action": "Release Trichogrammatoidea bactrae @ 150,000/ha to parasitize pink bollworm eggs."
            }
        ],
        "organic_control": [
            "Pectinolure pheromone traps @ 10\u201312 traps/acre.",
            "Release Trichogrammatoidea bactrae egg parasitoid @ 150,000/ha weekly.",
            "Spray Neem oil (10000 ppm) @ 2.5 ml/L during squaring."
        ],
        "chemical_control": [
            "Chlorantraniliprole 18.5% SC @ 0.3 ml/L (60 ml/acre).",
            "Emamectin Benzoate 5% SG @ 0.4 g/L.",
            "Profenofos 50% EC @ 2 ml/L for ovicidal and larvicidal knockdown."
        ],
        "nutritional_recovery": "Foliar spray Boron 20% @ 1 g/L + Potassium Nitrate @ 10 g/L to facilitate opening of undamaged bolls.",
        "preventive_measures": "Terminate cotton crop by December\u2013January (strictly avoid ratoon cotton); solarize seed storage bags; destroy cotton stalks immediately post-harvest."
    },
    "red cotton bug": {
        "crop": "Cotton",
        "category": "Pest Infestation",
        "pathogen": "Dysdercus cingulatus (Cotton Stainer)",
        "severity": "High",
        "display_name": "Red Cotton Bug (Cotton Stainer)",
        "symptoms": "Bright red bugs with black markings and white ventral bands clustering on open bolls; bolls pierced by stylets; seeds shriveled and oily; lint stained indelible yellowish-brown by introduced Nematospora coryli fungus.",
        "environmental_factors": "Warm weather (26\u201332\u00b0C), open boll stage, presence of wild malvaceous weed hosts (Abutilon, Sida).",
        "immediate_action": "Shake clusters into buckets of kerosenized water; spray contact insecticide on aggregating nymph colonies.",
        "future_prediction": {
            "loss_percentage": 60,
            "yield_loss_risk": "40%\u201360% economic loss; while bolls open, the harvested lint is severely stained and stained fiber cannot be bleached.",
            "economic_impact": "Lint downgraded from Grade 1 to rejection; seed oil content drops by 30% and seed germination rate drops below 50%.",
            "contagion_radius": "Moderate. Bugs crawl rapidly between plants and fly moderate distances between contiguous fields.",
            "neighbor_plot_risk": "Moderate to High. Migrates directly to neighboring maturing cotton and okra plots.",
            "progression_timeline": [
                {
                    "phase": "Days 1\u20133 (Colony Aggregation)",
                    "symptoms": "Adults and red wingless nymphs congregate on newly bursting bolls and tender leaves.",
                    "risk_level": "Moderate",
                    "loss_trajectory": "5% seed piercing"
                },
                {
                    "phase": "Days 4\u20138 (Stylet Piercing & Fungal Inoculation)",
                    "symptoms": "Bugs pierce developing seeds to extract oil; transmit Nematospora fungus that stains lint brown.",
                    "risk_level": "High",
                    "loss_trajectory": "25%\u201340% fiber staining"
                },
                {
                    "phase": "Days 9\u201316 (Seed Shriveling & Oil Depletion)",
                    "symptoms": "Seeds lose viability and become shrunken shells; lint turns sticky and stained yellowish-red.",
                    "risk_level": "Critical",
                    "loss_trajectory": "45%\u201360% commercial value lost"
                },
                {
                    "phase": "Post Day 16 (Soil Oviposition)",
                    "symptoms": "Females lay batches of 100 yellow eggs in moist soil debris, establishing continuous population.",
                    "risk_level": "High",
                    "loss_trajectory": "Perpetual field infestation"
                }
            ]
        },
        "cure_roadmap": [
            {
                "day": "Day 1 (Mechanical Collection)",
                "action": "Shake bug clusters into pans of water with 1% kerosene. Handpick resting aggregations on plant trunks."
            },
            {
                "day": "Day 2 (Contact Insecticide Spray)",
                "action": "Foliar spray Thiamethoxam 25% WG @ 0.3 g/L or Chlorpyrifos 20% EC @ 2 ml/L directly on bug clusters."
            },
            {
                "day": "Day 5 (Trap Cropping / Baiting)",
                "action": "Place moist cotton seed meal baits poisoned with 0.1% trichlorfon on field borders to attract and kill bugs."
            },
            {
                "day": "Day 8 (Residue Sanitation)",
                "action": "Remove open bolls immediately; clear fallen leaf trash to deprive bugs of shelter."
            }
        ],
        "organic_control": [
            "Dusting wood ash mixed with tobacco waste or neem cake.",
            "Spray Neem seed kernel extract (NSKE) 5%.",
            "Hand-collection in kerosenized water basins."
        ],
        "chemical_control": [
            "Thiamethoxam 25% WG @ 0.3 g/L (40 g/acre).",
            "Chlorpyrifos 20% EC @ 2 ml/L.",
            "Acephate 75% SP @ 1.5 g/L."
        ],
        "nutritional_recovery": "Not directly applicable; focus on prompt harvest of mature bolls before staining worsens.",
        "preventive_measures": "Early and prompt picking of cotton; avoid keeping harvested seed cotton heaped on damp field floors."
    },
    "thirps on  cotton": {
        "crop": "Cotton",
        "category": "Pest Infestation",
        "pathogen": "Thrips tabaci / Frankliniella schultzei",
        "severity": "Moderate",
        "display_name": "Cotton Thrips Infestation",
        "symptoms": "Silvery or bronze sheen on leaf undersides; upward leaf curling ('boat-shaped leaves'); shredded, ragged margins; terminal bud necrosis in seedlings.",
        "environmental_factors": "Dry, hot weather (30\u201335\u00b0C), prolonged dry spells, low humidity.",
        "immediate_action": "Install blue sticky traps; sprinkler irrigation to physically knock thrips off foliage.",
        "future_prediction": {
            "loss_percentage": 45,
            "yield_loss_risk": "30%\u201345% yield drop in seedling stage; plant vigor is stunted, delaying squaring by 2\u20133 weeks.",
            "economic_impact": "Delayed maturity increases exposure to late-season bollworms and cold weather.",
            "contagion_radius": "Moderate. Thrips are carried aloft by convective air currents for several kilometers.",
            "neighbor_plot_risk": "Moderate. Neighboring onion, chilli, and cotton crops will experience simultaneous infestation.",
            "progression_timeline": [
                {
                    "phase": "Days 1\u20133 (Silvery Flecking)",
                    "symptoms": "Minute, slender insects scrape leaf tissue; silvery bleached patches appear under leaves.",
                    "risk_level": "Mild",
                    "loss_trajectory": "5% photosynthetic loss"
                },
                {
                    "phase": "Days 4\u20137 (Upward Leaf Cupping)",
                    "symptoms": "Leaves curl upwards like canoes; veins become brownish; leaf margins become brittle and torn.",
                    "risk_level": "Moderate",
                    "loss_trajectory": "15%\u201325% seedling stunting"
                },
                {
                    "phase": "Days 8\u201314 (Terminal Bud Necrosis)",
                    "symptoms": "Terminal growing points blackened and killed; seedling produces abnormal branching ('cabbage head').",
                    "risk_level": "High",
                    "loss_trajectory": "30%\u201345% delay in squaring"
                },
                {
                    "phase": "Post Day 14 (Pupation in Soil)",
                    "symptoms": "Prepupae drop to topsoil to complete pupation; second generation emerges within 10 days.",
                    "risk_level": "Moderate",
                    "loss_trajectory": "Protracted vegetative stunting"
                }
            ]
        },
        "cure_roadmap": [
            {
                "day": "Day 1 (Overhead Irrigation & Trapping)",
                "action": "Provide light sprinkler irrigation to dislodge thrips. Mount blue sticky traps @ 25/acre."
            },
            {
                "day": "Day 2 (Botanical Knockdown)",
                "action": "Foliar spray Azadirachtin 10000 ppm @ 2 ml/L or Pongamia oil @ 3 ml/L."
            },
            {
                "day": "Day 4 (Targeted Systemic Spray)",
                "action": "Spray Fipronil 5% SC @ 1.5 ml/L or Spinetoram 11.7% SC @ 0.8 ml/L."
            },
            {
                "day": "Day 8 (Seedling Vigor Restoration)",
                "action": "Foliar spray 19:19:19 @ 5 g/L to stimulate fresh terminal leaf growth."
            }
        ],
        "organic_control": [
            "Blue sticky traps @ 25\u201330 traps/acre.",
            "Spray Lecanicillium lecanii @ 5 g/L.",
            "Neem oil 10000 ppm @ 2 ml/L."
        ],
        "chemical_control": [
            "Fipronil 5% SC @ 1.5 ml/L (300 ml/acre).",
            "Spinetoram 11.7% SC @ 0.8 ml/L.",
            "Imidacloprid 17.8% SL @ 0.5 ml/L."
        ],
        "nutritional_recovery": "Foliar spray Micronutrient mixture (Zn, Fe, Mn) @ 2 g/L to restore photosynthesis in crinkled leaves.",
        "preventive_measures": "Seed treatment with Imidacloprid 70% WS @ 5 g/kg seed; intercrop with cowpea or maize barrier rows."
    },
    "Wilt": {
        "crop": "Cotton / Sugarcane",
        "category": "Fungal Vascular Disease",
        "pathogen": "Fusarium oxysporum f. sp. vasinfectum",
        "severity": "Critical",
        "display_name": "Fusarium Vascular Wilt",
        "symptoms": "Yellowing and browning of leaf margins progressing inward between veins; sudden drooping and wilting of foliage from bottom upward; dark brown vascular ring discoloration in xylem when stem is split open.",
        "environmental_factors": "Acidic or sandy soils, soil temperatures 25\u201332\u00b0C, root-knot nematode (Meloidogyne incognita) presence wounding roots.",
        "immediate_action": "Drench root zones of border healthy plants with systemic fungicide + bio-agent; rogue and burn wilted dead plants.",
        "future_prediction": {
            "loss_percentage": 85,
            "yield_loss_risk": "Catastrophic 70%\u201390% mortality in affected field patches; wilted plants dry out completely and die before setting bolls.",
            "economic_impact": "Total loss of plants in infected foci; chlamydospores survive in soil for over 10\u201315 years, degrading land value.",
            "contagion_radius": "Moderate to High (Soil-borne). Spreads through irrigation water, tillage implements, and infected seedling root zones.",
            "neighbor_plot_risk": "High if shared surface irrigation water flows from infected fields into adjacent plots.",
            "progression_timeline": [
                {
                    "phase": "Days 1\u20133 (Interveinal Chlorosis)",
                    "symptoms": "Lower leaves show yellowing between veins, often starting on one side of the plant.",
                    "risk_level": "Moderate",
                    "loss_trajectory": "10% vascular impairment"
                },
                {
                    "phase": "Days 4\u20137 (Unilateral Wilting)",
                    "symptoms": "Leaves turn brown, curl, and drop; branches on one side of plant wilt while other side looks normal.",
                    "risk_level": "High",
                    "loss_trajectory": "35%\u201355% sap transport blocked"
                },
                {
                    "phase": "Days 8\u201314 (Complete Vascular Occlusion)",
                    "symptoms": "Fungal tyloses choke entire xylem stream; plant wilts completely; stem vascular ring turns dark brown.",
                    "risk_level": "Critical",
                    "loss_trajectory": "70%\u201385% plant death"
                },
                {
                    "phase": "Post Day 14 (Desiccation & Chlamydospore Seeding)",
                    "symptoms": "Plant turns into a dry brown stick; chlamydospores form inside roots and enter soil profile.",
                    "risk_level": "Catastrophic",
                    "loss_trajectory": "Permanent soil contamination for 10+ years"
                }
            ]
        },
        "cure_roadmap": [
            {
                "day": "Day 1 (Sanitation & Isolation)",
                "action": "Uproot and burn fully wilted plants. Cut off irrigation furrows leading into diseased patches."
            },
            {
                "day": "Day 2 (Root Zone Drenching)",
                "action": "Drench soil around neighboring healthy plants with Carbendazim 50% WP @ 2 g/L or Thiophanate Methyl 70% WP @ 1.5 g/L."
            },
            {
                "day": "Day 5 (Bio-Agent Soil Inoculation)",
                "action": "Apply Trichoderma viride enriched farmyard manure (2 kg Trichoderma + 100 kg FYM/acre) around base."
            },
            {
                "day": "Day 10 (Potash & Nematicide Boost)",
                "action": "Apply MOP @ 20 kg/acre + Neem cake @ 100 kg/acre to suppress nematodes and reinforce roots."
            }
        ],
        "organic_control": [
            "Soil application of Trichoderma viride or T. harzianum @ 2.5 kg/ha mixed in 500 kg compost.",
            "Soil amendment with Neem cake @ 250 kg/ha.",
            "Crop rotation with sorghum, maize, or paddy for 3 years."
        ],
        "chemical_control": [
            "Soil drenching with Carbendazim 50% WP @ 2 g/L.",
            "Thiophanate Methyl 70% WP @ 1.5 g/L root drench.",
            "Seed treatment with Carboxin 37.5% + Thiram 37.5% @ 2.5 g/kg seed."
        ],
        "nutritional_recovery": "Apply extra Potassium (MOP @ 25 kg/acre) and Zinc; avoid ammonium nitrogen which lowers soil pH and favors Fusarium.",
        "preventive_measures": "Cultivate wilt-resistant varieties; practice green manuring with Sunn hemp; strictly control root-knot nematodes."
    },
    "Becterial Blight in Rice": {
        "crop": "Rice",
        "category": "Bacterial Disease",
        "pathogen": "Xanthomonas oryzae pv. oryzae",
        "severity": "Critical",
        "display_name": "Bacterial Blight of Rice (Kresek)",
        "symptoms": "Water-soaked stripes on leaf margins turning wavy yellow-orange then grayish-white blighted lesions; milky bacterial ooze beads on morning dew; seedling wilt (Kresek).",
        "environmental_factors": "Warm temperatures (25\u201334\u00b0C), typhoons, torrential monsoon rains, high nitrogen fertilization, stagnant irrigation water.",
        "immediate_action": "Drain standing water immediately for 3\u20134 days to arrest bacterial flow; halt nitrogen top-dressing.",
        "future_prediction": {
            "loss_percentage": 75,
            "yield_loss_risk": "Severe yield drop of 60%\u201380%; panicles fail to emerge or produce empty, chaffy grains (sterile spikelets).",
            "economic_impact": "Complete mill rejection due to brittle chalky kernels and discolored grain hulls.",
            "contagion_radius": "Very High. Bacterial cells travel instantaneously through irrigation runoff and wind-driven rain gusts over whole valleys.",
            "neighbor_plot_risk": "High. Shared irrigation canals will spread inoculum to downstream paddy fields within 24 hours.",
            "progression_timeline": [
                {
                    "phase": "Days 1\u20133 (Marginal Water-Soaking)",
                    "symptoms": "Tiny water-soaked stripes start at leaf tips and margins; bacterial ooze beads appear at dawn.",
                    "risk_level": "Moderate",
                    "loss_trajectory": "10% photosynthetic area impaired"
                },
                {
                    "phase": "Days 4\u20137 (Wavy Yellow Blight)",
                    "symptoms": "Lesions expand with wavy margins down the leaf; foliage turns bleached straw-colored and rolls inward.",
                    "risk_level": "High",
                    "loss_trajectory": "30%\u201345% canopy necrosis"
                },
                {
                    "phase": "Days 8\u201315 (Systemic Kresek Wilt)",
                    "symptoms": "Bacterial colonies block xylem vessels; tillers wilt completely; flag leaves wither during boot stage.",
                    "risk_level": "Critical",
                    "loss_trajectory": "55%\u201375% yield potential lost"
                },
                {
                    "phase": "Post Day 15 (Spikelet Sterility & Lodging)",
                    "symptoms": "Panicles remain unfilled and erect (whiteheads); stems rot at waterline causing extensive field lodging.",
                    "risk_level": "Catastrophic",
                    "loss_trajectory": "Near-total grain loss and infected seed bank"
                }
            ]
        },
        "cure_roadmap": [
            {
                "day": "Day 1 (Drainage & Nitrogen Stop)",
                "action": "Completely drain irrigation water from the field; cease all nitrogenous fertilizer applications immediately."
            },
            {
                "day": "Day 2 (Bactericidal Foliar Spray)",
                "action": "Spray Streptocycline (Streptomycin 90% + Tetracycline 10%) @ 6 g / 50 L water combined with Copper Oxychloride 50% WP @ 50 g / 50 L."
            },
            {
                "day": "Day 4 (Potash Vigor Boost)",
                "action": "Top-dress Muriate of Potash (MOP) @ 15 kg/acre to strengthen cell walls against bacterial motility."
            },
            {
                "day": "Day 7 (Bio-Bactericide Protection)",
                "action": "Apply Pseudomonas fluorescens @ 10 g/L or fresh cow dung water extract (20%) foliar spray."
            }
        ],
        "organic_control": [
            "Foliar spray fresh cow dung water extract (20%) supernatant.",
            "Pseudomonas fluorescens @ 10 g/L foliar application.",
            "Panchagavya (3%) foliar spray at tillering and boot stage."
        ],
        "chemical_control": [
            "Streptocycline @ 6 g / 50 L + Copper Oxychloride @ 50 g / 50 L water.",
            "Copper Hydroxide 53.8% DF @ 1.5 g/L.",
            "Bismerthiazol 20% WP @ 2 g/L."
        ],
        "nutritional_recovery": "Apply split dose of Potassium (MOP) @ 15\u201320 kg/acre and foliar Silicon @ 2 ml/L to reinforce silicated epidermal cell barriers.",
        "preventive_measures": "Soak seed in Streptocycline solution (0.01%) for 8 hrs before sowing; cultivate resistant varieties (e.g., Samba Mahsuri, IR64)."
    },
    "Brownspot": {
        "crop": "Rice",
        "category": "Fungal Disease",
        "pathogen": "Bipolaris oryzae (Cochliobolus miyabeanus)",
        "severity": "High",
        "display_name": "Brown Spot of Rice",
        "symptoms": "Oval, circular sesame-seed-like brown spots with grayish or whitish centers and yellow halo on leaves, glumes, and coleoptiles; seed discoloration.",
        "environmental_factors": "Nutrient-depleted, zinc-deficient soils, water stress/drought, temperature 25\u201330\u00b0C, relative humidity >85%.",
        "immediate_action": "Apply potassium (MOP) top-dressing and micronutrients (Zinc sulphate 25 kg/ha) to revitalize plant vigor.",
        "future_prediction": {
            "loss_percentage": 60,
            "yield_loss_risk": "45%\u201360% yield loss in severe cases; grain discoloration (pecky rice) and seedling blight in nurseries.",
            "economic_impact": "Discolored, dark-stained grain reduces mill recovery rate and market grading by 40%\u201350%.",
            "contagion_radius": "Moderate. Airborne conidia spread across adjacent paddies, especially when soil nutrition is low.",
            "neighbor_plot_risk": "Moderate. Neighboring fields with poor water or nutrient management are highly vulnerable.",
            "progression_timeline": [
                {
                    "phase": "Days 1\u20133 (Sesame Spot Inception)",
                    "symptoms": "Small brown pinpoint flecks develop on leaf blades.",
                    "risk_level": "Mild",
                    "loss_trajectory": "5% leaf surface spotted"
                },
                {
                    "phase": "Days 4\u20138 (Halo Development & Blighting)",
                    "symptoms": "Spots enlarge to oval sesame-seed shape with gray centers and bright yellow halos; leaves yellow and dry.",
                    "risk_level": "Moderate",
                    "loss_trajectory": "20%\u201330% photosynthetic impairment"
                },
                {
                    "phase": "Days 9\u201316 (Glume Blight & Pecky Grain)",
                    "symptoms": "Fungus attacks emerging panicles and glumes, causing dark brown blotches and seed abortion.",
                    "risk_level": "High",
                    "loss_trajectory": "40%\u201355% grain filling reduction"
                },
                {
                    "phase": "Post Day 16 (Seed Viability Destruction)",
                    "symptoms": "Harvested grain carries dormant mycelium, causing high damping-off when planted next season.",
                    "risk_level": "Critical",
                    "loss_trajectory": "Severe seed degradation and poor seed quality"
                }
            ]
        },
        "cure_roadmap": [
            {
                "day": "Day 1 (Nutrient & Moisture Check)",
                "action": "Ensure field is irrigated to 2\u20133 cm standing water; apply Zinc Sulphate 21% @ 10 kg/acre if deficient."
            },
            {
                "day": "Day 2\u20133 (Foliar Fungicide Intervention)",
                "action": "Foliar spray Propiconazole 25% EC @ 1 ml/L or Tricyclazole 75% WP @ 0.6 g/L."
            },
            {
                "day": "Day 5 (Potash Top-Dressing)",
                "action": "Apply Muriate of Potash @ 15 kg/acre to boost natural resistance against Bipolaris."
            },
            {
                "day": "Day 8 (Secondary Shield)",
                "action": "Spray Mancozeb 75% WP @ 2 g/L to protect emerging flag leaf and panicles."
            }
        ],
        "organic_control": [
            "Foliar spray Pseudomonas fluorescens @ 10 g/L.",
            "Seed treatment with Trichoderma harzianum @ 10 g/kg seed.",
            "Neem oil spray (3000 ppm) @ 3 ml/L."
        ],
        "chemical_control": [
            "Propiconazole 25% EC @ 1 ml/L (200 ml/acre).",
            "Mancozeb 75% WP @ 2 g/L.",
            "Hexaconazole 5% SC @ 2 ml/L."
        ],
        "nutritional_recovery": "Supplement with Zinc Sulphate 21% @ 10 kg/acre and Silicon foliar fertilizer @ 2 ml/L to enhance tissue resistance.",
        "preventive_measures": "Hot water seed treatment (52\u201354\u00b0C for 10 min); balanced NPK fertilization with sufficient organic compost."
    },
    "Leaf smut": {
        "crop": "Rice",
        "category": "Fungal Disease",
        "pathogen": "Entyloma oryzae",
        "severity": "Moderate",
        "display_name": "Leaf Smut of Rice",
        "symptoms": "Small, slightly raised, angular or rectangular black spots (sori) scattered across leaf blades; spots remain covered by epidermis; leaves turn yellow at tips and dry up.",
        "environmental_factors": "High humidity, warm temperatures (28\u201332\u00b0C), heavily fertilized lush crops in shaded lowlands.",
        "immediate_action": "Avoid excessive nitrogen top-dressing; spray triazole-based protective fungicide.",
        "future_prediction": {
            "loss_percentage": 40,
            "yield_loss_risk": "25%\u201340% loss under severe late-season canopy drying; prematurely dried leaves fail to fill grains in lower panicle branchlets.",
            "economic_impact": "Reduced 1000-grain weight and increased grain breakage during milling.",
            "contagion_radius": "Moderate. Airborne teliospores carried over short to medium distances by wind currents.",
            "neighbor_plot_risk": "Moderate. Over-fertilized plots downwind can experience moderate secondary spread.",
            "progression_timeline": [
                {
                    "phase": "Days 1\u20134 (Lead-Black Sori Inception)",
                    "symptoms": "Minute lead-black linear spots appear beneath upper leaf epidermis.",
                    "risk_level": "Mild",
                    "loss_trajectory": "5% leaf area affected"
                },
                {
                    "phase": "Days 5\u201310 (Angular Spot Density)",
                    "symptoms": "Black spots multiply across mature leaves; leaf tips turn yellow and show marginal scorching.",
                    "risk_level": "Moderate",
                    "loss_trajectory": "15%\u201325% leaf drying"
                },
                {
                    "phase": "Days 11\u201318 (Canopy Desiccation)",
                    "symptoms": "Severely infected leaves turn golden-brown and desiccate completely, resembling premature senescence.",
                    "risk_level": "Moderate",
                    "loss_trajectory": "25%\u201340% functional canopy loss"
                },
                {
                    "phase": "Post Day 18 (Residue Overwintering)",
                    "symptoms": "Teliospores inside dead leaf tissue drop into paddy soil and stubble, surviving until next season.",
                    "risk_level": "Moderate",
                    "loss_trajectory": "Inoculum carry-over in straw"
                }
            ]
        },
        "cure_roadmap": [
            {
                "day": "Day 1 (Canopy Aeration)",
                "action": "Ensure optimal water level (2\u20133 cm); discontinue urea top-dressing."
            },
            {
                "day": "Day 2 (Fungicide Application)",
                "action": "Foliar spray Propiconazole 25% EC @ 1 ml/L or Hexaconazole 5% SC @ 2 ml/L."
            },
            {
                "day": "Day 5 (Potash Application)",
                "action": "Top-dress MOP @ 12\u201315 kg/acre to boost silicon-potassium tissue rigidity."
            },
            {
                "day": "Day 8 (Follow-up Check)",
                "action": "Inspect flag leaves; if new black spots appear on top leaves, repeat spray with Mancozeb @ 2 g/L."
            }
        ],
        "organic_control": [
            "Foliar spray Pseudomonas fluorescens @ 10 g/L.",
            "Apply fermented cow urine solution (10%).",
            "Burn or deeply plow rice stubble after harvest."
        ],
        "chemical_control": [
            "Propiconazole 25% EC @ 1 ml/L.",
            "Hexaconazole 5% SC @ 2 ml/L.",
            "Mancozeb 75% WP @ 2 g/L."
        ],
        "nutritional_recovery": "Top-dress Potassium @ 15 kg/acre and apply foliar Silicon fertilizer to thicken leaf cuticle.",
        "preventive_measures": "Avoid over-application of nitrogen; space hills adequately (20x15 cm); plow down crop residue after harvest."
    },
    "Rice Blast": {
        "crop": "Rice",
        "category": "Fungal Disease",
        "pathogen": "Magnaporthe oryzae (Pyricularia oryzae)",
        "severity": "Critical",
        "display_name": "Rice Blast (Leaf / Neck Blast)",
        "symptoms": "Spindle-shaped or eye-shaped lesions with gray/whitish centers and dark reddish-brown borders (Leaf Blast); black-rotted neck node causing entire panicle to drop and snap (Neck Blast); empty whitehead panicles.",
        "environmental_factors": "High relative humidity (>90%), long dew periods (8\u201310 hrs), cool night temperatures (17\u201323\u00b0C), cloudy rainy weather, heavy nitrogen fertilizer.",
        "immediate_action": "Spray Tricyclazole 75% WP immediately; immediately stop all nitrogen applications; maintain water level in field.",
        "future_prediction": {
            "loss_percentage": 90,
            "yield_loss_risk": "Catastrophic 70%\u201390% total crop loss if neck blast occurs; infected panicles produce 100% sterile, chaffy grains that break off.",
            "economic_impact": "Total harvest write-off in neck blast epidemics; fields produce zero sellable grain.",
            "contagion_radius": "Extremely High. Microscopic airborne conidia release millions of spores nightly, traveling over 10\u201320 km.",
            "neighbor_plot_risk": "Severe. All neighboring paddy fields sharing the river basin or valley face immediate contagion.",
            "progression_timeline": [
                {
                    "phase": "Days 1\u20133 (Diamond Eye Lesions)",
                    "symptoms": "Water-soaked bluish flecks turn into eye-shaped spindle lesions with yellow margins on leaves.",
                    "risk_level": "Moderate",
                    "loss_trajectory": "10%\u201320% leaf blight"
                },
                {
                    "phase": "Days 4\u20137 (Canopy Blasting & Burn)",
                    "symptoms": "Lesions coalesce rapidly; leaves scorch and wither completely, giving field a 'fire-burnt' appearance.",
                    "risk_level": "High",
                    "loss_trajectory": "40%\u201360% photosynthetic destruction"
                },
                {
                    "phase": "Days 8\u201314 (Neck Node Infection)",
                    "symptoms": "Fungus attacks the neck node supporting the panicle; neck turns black and rots; sap flow cut off.",
                    "risk_level": "Critical",
                    "loss_trajectory": "70%\u201385% grain sterility"
                },
                {
                    "phase": "Post Day 14 (Panicle Breakage & Whiteheads)",
                    "symptoms": "Panicles snap at the neck and hang dangling; grain hulls remain completely empty (whiteheads).",
                    "risk_level": "Catastrophic",
                    "loss_trajectory": "90% complete crop failure"
                }
            ]
        },
        "cure_roadmap": [
            {
                "day": "Day 1 (Immediate Blast Interception)",
                "action": "Immediately suspend nitrogen application. Keep 3 cm standing water in field. Spray Tricyclazole 75% WP @ 0.6 g/L."
            },
            {
                "day": "Day 2\u20133 (Systemic Fungicide Coverage)",
                "action": "Ensure complete canopy coverage; for neck blast prevention at boot stage, spray Isoprothiolane 40% EC @ 1.5 ml/L."
            },
            {
                "day": "Day 5 (Nutritional Resistance Boost)",
                "action": "Apply soluble Potassium Silicate @ 2.5 g/L to accelerate silica cell wall deposition."
            },
            {
                "day": "Day 8\u201310 (Heading Protection Spray)",
                "action": "Spray Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1 ml/L at 5% panicle emergence."
            }
        ],
        "organic_control": [
            "Foliar spray Pseudomonas fluorescens @ 10 g/L.",
            "Apply cow dung supernatant extract 20%.",
            "Neem oil spray @ 4 ml/L."
        ],
        "chemical_control": [
            "Tricyclazole 75% WP @ 0.6 g/L (120 g/acre).",
            "Isoprothiolane 40% EC @ 1.5 ml/L (300 ml/acre).",
            "Kasugamycin 3% SL @ 2 ml/L or Picoxystrobin 22.52% SC @ 1 ml/L."
        ],
        "nutritional_recovery": "Cease urea; top-dress MOP @ 20 kg/acre and apply foliar Silicon fertilizer @ 3 g/L.",
        "preventive_measures": "Seed treatment with Tricyclazole @ 2 g/kg seed; plant blast-resistant cultivars (e.g., MTU 1010, IR64); avoid late sowing."
    },
    "Tungro": {
        "crop": "Rice",
        "category": "Viral Disease (Vector-Borne)",
        "pathogen": "Rice Tungro Bacilliform (RTBV) & Spherical (RTSV) Viruses",
        "severity": "Critical",
        "display_name": "Rice Tungro Disease (RTD)",
        "symptoms": "Distinct yellow to orange-yellow discoloration of leaves starting from tips; severe plant stunting; reduced tillering count; delayed flowering and empty, sterile panicles.",
        "environmental_factors": "Presence of Green Leafhopper (Nephotettix virescens) vector, continuous year-round staggered rice cropping, warm humid conditions.",
        "immediate_action": "Spray vector-control insecticide immediately to kill Green Leafhoppers; rogue out infected yellow clumps.",
        "future_prediction": {
            "loss_percentage": 85,
            "yield_loss_risk": "Catastrophic 70%\u201390% yield loss when infection occurs at tillering stage; stunted clumps produce zero productive tillers.",
            "economic_impact": "Panicles remain partially exerted with brown mottled sterile grains; total economic loss of paddy crop.",
            "contagion_radius": "Extremely High. Green leafhoppers acquire virus in 30 minutes and transmit it across fields during migratory flights.",
            "neighbor_plot_risk": "Severe. Leafhoppers migrate in swarms to neighboring fields at sunset, spreading virus throughout the region.",
            "progression_timeline": [
                {
                    "phase": "Days 1\u20133 (Leafhopper Feeding & Inoculation)",
                    "symptoms": "Leafhoppers feed on leaf phloem; virions multiply internally; subtle interveinal yellowing at tips.",
                    "risk_level": "Moderate",
                    "loss_trajectory": "10% vigor drop"
                },
                {
                    "phase": "Days 4\u20138 (Orange-Yellow Leaf Blight)",
                    "symptoms": "Leaves turn vibrant yellow-orange from tip downward; leaf margins roll slightly; root growth stalls.",
                    "risk_level": "High",
                    "loss_trajectory": "35%\u201350% vegetative stunting"
                },
                {
                    "phase": "Days 9\u201316 (Severe Tiller Suppression)",
                    "symptoms": "Plant becomes dwarf and compact; secondary tillers fail to emerge; leaves develop rusty brown spots.",
                    "risk_level": "Critical",
                    "loss_trajectory": "65%\u201380% productive tiller loss"
                },
                {
                    "phase": "Post Day 16 (Complete Sterility & Death)",
                    "symptoms": "Flowering delayed or absent; emerging panicles remain short, erect, and chaffy with mottled grains.",
                    "risk_level": "Catastrophic",
                    "loss_trajectory": "85%\u201390% complete crop write-off"
                }
            ]
        },
        "cure_roadmap": [
            {
                "day": "Day 1 (Vector Interception & Light Traps)",
                "action": "Install light traps @ 1 trap/acre to monitor and trap adult Green Leafhoppers. Rogue out infected orange clumps."
            },
            {
                "day": "Day 2 (Immediate Vector Knockdown)",
                "action": "Foliar spray Thiamethoxam 25% WG @ 0.3 g/L or Dinotefuran 20% SG @ 0.4 g/L across entire paddy and bunds."
            },
            {
                "day": "Day 5 (Secondary Systemic Shield)",
                "action": "Spray Pymetrozine 50% WG @ 0.6 g/L or Buprofezin 25% SC @ 1.5 ml/L to halt nymphal molting."
            },
            {
                "day": "Day 8 (Anti-Viral Recovery Foliar Spray)",
                "action": "Spray Zinc Sulphate (0.5%) + Ferrous Sulphate (0.5%) + Urea (1%) to stimulate chlorotic tillers."
            }
        ],
        "organic_control": [
            "Install light traps to catch Green Leafhoppers.",
            "Neem oil spray (10000 ppm) @ 3 ml/L.",
            "Conserve mirid bugs (Cyrtorhinus lividipennis) which feed on leafhopper eggs."
        ],
        "chemical_control": [
            "Thiamethoxam 25% WG @ 0.3 g/L (40 g/acre).",
            "Dinotefuran 20% SG @ 0.4 g/L (80 g/acre).",
            "Pymetrozine 50% WG @ 0.6 g/L (120 g/acre)."
        ],
        "nutritional_recovery": "Foliar spray Zinc Chelate @ 1.5 g/L + Urea @ 10 g/L to assist unaffected tillers in recovering chlorophyll.",
        "preventive_measures": "Observe rice-free fallow period (synchronous planting); cultivate resistant varieties (e.g., IR36, IR64, Vikramarya); destroy weed hosts."
    },
    "Wheat Brown leaf Rust": {
        "crop": "Wheat",
        "category": "Fungal Disease",
        "pathogen": "Puccinia triticina (Puccinia recondita)",
        "severity": "High",
        "display_name": "Wheat Brown Rust (Leaf Rust)",
        "symptoms": "Small, round to oval, orange-brown pustules (uredinia) scattered randomly across upper leaf surfaces; pustules shed dusty orange spores on contact; yellowing around pustules.",
        "environmental_factors": "Temperatures 15\u201325\u00b0C, high humidity, dew formation for 6\u20138 hrs; common during mid-to-late wheat season.",
        "immediate_action": "Spray Propiconazole 25% EC at first appearance of orange pustules on lower leaves.",
        "future_prediction": {
            "loss_percentage": 50,
            "yield_loss_risk": "35%\u201350% yield reduction if flag leaf is infected prior to flowering; premature leaf death impairs grain filling.",
            "economic_impact": "Shriveled grains with low test weight and reduced starch content; severe price deduction at procurement centers.",
            "contagion_radius": "Extremely High. Urediniospores are carried on continental wind currents over hundreds of kilometers.",
            "neighbor_plot_risk": "High. All wheat fields in the agro-climatic corridor are exposed within 3\u20135 days.",
            "progression_timeline": [
                {
                    "phase": "Days 1\u20133 (Chlorotic Flecks)",
                    "symptoms": "Minute yellow flecks appear on blade surfaces.",
                    "risk_level": "Mild",
                    "loss_trajectory": "5% leaf area affected"
                },
                {
                    "phase": "Days 4\u20137 (Orange Pustule Eruption)",
                    "symptoms": "Round, orange-brown pustules burst through epidermis, releasing clouds of rust spores.",
                    "risk_level": "Moderate",
                    "loss_trajectory": "15%\u201325% photosynthetic decline"
                },
                {
                    "phase": "Days 8\u201315 (Flag Leaf Blight)",
                    "symptoms": "Pustules cover the flag leaf; leaf turns yellow, desiccates, and dies early.",
                    "risk_level": "High",
                    "loss_trajectory": "30%\u201345% grain filling reduction"
                },
                {
                    "phase": "Post Day 15 (Telia Formation & Shriveling)",
                    "symptoms": "Pustules turn dark brown/black (teliospores); grains develop small, shrunken, and light.",
                    "risk_level": "Critical",
                    "loss_trajectory": "50% grain weight lost"
                }
            ]
        },
        "cure_roadmap": [
            {
                "day": "Day 1 (Canopy Scouting)",
                "action": "Examine top two leaves for rust pustules. Calculate percentage of leaves with active sporulation."
            },
            {
                "day": "Day 2 (Triazole Fungicide Application)",
                "action": "Spray Propiconazole 25% EC @ 1 ml/L (200 ml/acre in 200 L water) or Tebuconazole 25.9% EC @ 1 ml/L."
            },
            {
                "day": "Day 5 (Nutritional Foliar Spray)",
                "action": "Foliar spray Potassium Nitrate (13:0:45) @ 10 g/L to sustain grain filling despite rust stress."
            },
            {
                "day": "Day 10 (Follow-up Evaluation)",
                "action": "Check if pustules have dried to dark crusts; re-spray with Mancozeb @ 2 g/L if wet conditions persist."
            }
        ],
        "organic_control": [
            "Foliar spray with Bacillus subtilis @ 5 g/L.",
            "Neem oil (10000 ppm) @ 3 ml/L.",
            "Spray sulfur 80% WDG @ 2.5 g/L."
        ],
        "chemical_control": [
            "Propiconazole 25% EC @ 1 ml/L (200 ml/acre).",
            "Tebuconazole 25.9% EC @ 1 ml/L.",
            "Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1 ml/L."
        ],
        "nutritional_recovery": "Apply foliar Potash @ 5 g/L to bolster osmotic regulation and grain dry-matter accumulation.",
        "preventive_measures": "Sow rust-resistant varieties (e.g., HD 2967, HD 3086, DBW 187); avoid late sowing; practice balanced fertilization."
    },
    "Wheat Stem fly": {
        "crop": "Wheat",
        "category": "Pest Infestation",
        "pathogen": "Atherigona naqvii / Atherigona soccata",
        "severity": "High",
        "display_name": "Wheat Shoot Fly / Stem Fly",
        "symptoms": "Drying and withering of central growing shoot ('dead heart') in young seedlings (1\u20134 weeks old); dead heart pulls out easily with foul rotting smell at base; excessive abnormal tillering.",
        "environmental_factors": "Late sown wheat (late November\u2013December), temperatures >25\u00b0C at germination, dry seedbed.",
        "immediate_action": "Spray systemic insecticide if dead heart percentage exceeds 10%; apply light irrigation to stimulate healthy tillers.",
        "future_prediction": {
            "loss_percentage": 50,
            "yield_loss_risk": "35%\u201350% plant population loss in early seedling stage; late-emerging compensatory tillers mature unevenly and produce small heads.",
            "economic_impact": "Thin stands allow heavy weed competition, cutting total grain output by half.",
            "contagion_radius": "Moderate. Adult flies fly low over fields and deposit eggs on tender seedling stems.",
            "neighbor_plot_risk": "Moderate. Late sown neighboring fields face high egg-laying pressure.",
            "progression_timeline": [
                {
                    "phase": "Days 1\u20133 (Egg Laying on Foliage)",
                    "symptoms": "White cigar-shaped eggs laid singly on undersides of seedling leaves.",
                    "risk_level": "Mild",
                    "loss_trajectory": "5% egg presence"
                },
                {
                    "phase": "Days 4\u20137 (Maggot Burrowing)",
                    "symptoms": "Maggots hatch, crawl down leaf sheath, and bore into growing point, severing vascular bundle.",
                    "risk_level": "Moderate",
                    "loss_trajectory": "15% shoot severing"
                },
                {
                    "phase": "Days 8\u201314 (Dead Heart Manifestation)",
                    "symptoms": "Central leaf turns brown, withers, and dies ('dead heart'); foul odor at pulled stem base.",
                    "risk_level": "High",
                    "loss_trajectory": "30%\u201345% main tiller loss"
                },
                {
                    "phase": "Post Day 14 (Abnormal Tillering & Stunting)",
                    "symptoms": "Plant produces weak, unproductive side tillers that bear poorly filled spikes.",
                    "risk_level": "Critical",
                    "loss_trajectory": "50% yield reduction"
                }
            ]
        },
        "cure_roadmap": [
            {
                "day": "Day 1 (Dead Heart Census & Rogueing)",
                "action": "Count dead hearts per square meter; pull out and destroy drying central shoots containing maggots."
            },
            {
                "day": "Day 2 (Foliar Systemic Spray)",
                "action": "Spray Chlorpyrifos 20% EC @ 2 ml/L or Thiamethoxam 25% WG @ 0.3 g/L."
            },
            {
                "day": "Day 4 (Light Irrigation & Nitrogen Boost)",
                "action": "Irrigate field lightly and top-dress Urea @ 20 kg/acre to stimulate vigorous secondary tillering."
            },
            {
                "day": "Day 8 (Follow-up Check)",
                "action": "Inspect newly formed tillers to confirm cessation of shoot boring."
            }
        ],
        "organic_control": [
            "Erect fish meal traps @ 10 traps/acre to attract and drown shoot flies.",
            "Spray Neem seed kernel extract (NSKE) 5% @ 50 ml/L.",
            "Conserve ground predatory staphylinid beetles."
        ],
        "chemical_control": [
            "Chlorpyrifos 20% EC @ 2 ml/L (400 ml/acre).",
            "Thiamethoxam 25% WG @ 0.3 g/L.",
            "Quinalphos 25% EC @ 1.5 ml/L."
        ],
        "nutritional_recovery": "Top-dress split dose of Nitrogen (Urea) + Zinc Sulphate @ 5 kg/acre to promote rapid replacement tillers.",
        "preventive_measures": "Timely sowing within first fortnight of November; seed treatment with Imidacloprid 70% WS @ 5 g/kg seed; increase seed rate by 10% for late sowing."
    },
    "Wheat aphid": {
        "crop": "Wheat",
        "category": "Pest Infestation",
        "pathogen": "Rhopalosiphum padi / Sitobion avenae",
        "severity": "Moderate",
        "display_name": "Wheat Aphid Infestation",
        "symptoms": "Dense colonies of small green/yellow/black aphids clustering on ears, flag leaves, and stems during heading and grain filling; sticky honeydew causing black sooty mold; shriveled grains.",
        "environmental_factors": "Cool, cloudy, overcast weather (15\u201322\u00b0C), high humidity, late sown wheat stands.",
        "immediate_action": "Spray systemic insecticide if aphid count exceeds Economic Threshold Level (ETL: 10\u201315 aphids per earhead).",
        "future_prediction": {
            "loss_percentage": 45,
            "yield_loss_risk": "25%\u201345% grain yield reduction; sucking of sap from developing ears causes severe grain shriveling and abortion.",
            "economic_impact": "Low grain test weight, reduced flour yield, and high dockage percentage at grain mandis.",
            "contagion_radius": "High. Winged aphids (alatae) disperse widely with gentle breezes across whole agricultural districts.",
            "neighbor_plot_risk": "High. Neighboring barley and wheat fields will face synchronized colonization.",
            "progression_timeline": [
                {
                    "phase": "Days 1\u20133 (Colony Establishment)",
                    "symptoms": "Aphids colonize lower stem leaves and boot leaf sheaths.",
                    "risk_level": "Mild",
                    "loss_trajectory": "5% sap loss"
                },
                {
                    "phase": "Days 4\u20137 (Earhead Colonization)",
                    "symptoms": "Aphids move up to emerging ears, colonizing awns, glumes, and spikelets in hundreds.",
                    "risk_level": "Moderate",
                    "loss_trajectory": "15%\u201325% milk stage sap extraction"
                },
                {
                    "phase": "Days 8\u201314 (Honeydew & Sooty Mold)",
                    "symptoms": "Sticky honeydew blankets earheads; black mold covers awns; grain filling ceases prematurely.",
                    "risk_level": "High",
                    "loss_trajectory": "30%\u201340% grain weight loss"
                },
                {
                    "phase": "Post Day 14 (Premature Senescence)",
                    "symptoms": "Ears turn dry and bleached prematurely; kernels remain paper-thin and shriveled.",
                    "risk_level": "Critical",
                    "loss_trajectory": "45% harvestable yield lost"
                }
            ]
        },
        "cure_roadmap": [
            {
                "day": "Day 1 (Threshold Assessment)",
                "action": "Sample 20 earheads across field diagonals. If average exceeds 10 aphids/earhead, trigger spray protocol."
            },
            {
                "day": "Day 2 (Targeted Systemic Insecticide)",
                "action": "Foliar spray Thiamethoxam 25% WG @ 0.3 g/L (50 g/acre in 150\u2013200 L water) or Dimethoate 30% EC @ 1.5 ml/L."
            },
            {
                "day": "Day 5 (Predator Conservation Check)",
                "action": "Inspect for Ladybird beetles (Coccinella) and Syrphid fly larvae consuming residual aphids."
            },
            {
                "day": "Day 8 (Foliar Grain Boost)",
                "action": "Foliar spray Potassium Nitrate (13:0:45) @ 10 g/L to accelerate grain plumpness."
            }
        ],
        "organic_control": [
            "Install yellow sticky traps @ 20 traps/acre.",
            "Spray Neem oil 10000 ppm @ 2 ml/L or NSKE 5%.",
            "Conserve Coccinella septempunctata predators (one beetle eats >50 aphids/day)."
        ],
        "chemical_control": [
            "Thiamethoxam 25% WG @ 0.3 g/L (50 g/acre).",
            "Dimethoate 30% EC @ 1.5 ml/L.",
            "Clothianidin 50% WDG @ 0.15 g/L."
        ],
        "nutritional_recovery": "Foliar spray 0:0:50 (Potassium Sulphate) @ 5 g/L to replenish nutrients sucked from developing grain.",
        "preventive_measures": "Avoid late sowing; balanced use of nitrogenous fertilizers; encourage border strips of mustard to attract predatory ladybirds."
    },
    "Wheat black rust": {
        "crop": "Wheat",
        "category": "Fungal Disease",
        "pathogen": "Puccinia graminis f. sp. tritici (Stem Rust)",
        "severity": "Critical",
        "display_name": "Wheat Black Rust (Stem Rust)",
        "symptoms": "Large, elongated, reddish-brown to dark black pustules (uredinia) bursting violently on stems, leaf sheaths, glumes, and awns; epidermis peels back in jagged ragged collars; severe stem lodging.",
        "environmental_factors": "Warm temperatures (20\u201330\u00b0C), humid weather, dew periods of 6\u20138 hrs; typically occurs late in wheat season.",
        "immediate_action": "Spray Propiconazole or Tebuconazole immediately; stem rust can destroy a crop in 2\u20133 weeks if unmanaged.",
        "future_prediction": {
            "loss_percentage": 90,
            "yield_loss_risk": "Devastating 70%\u201390% yield loss; infected stems snap and lodge; spikes fail to fill, producing empty chaff.",
            "economic_impact": "Total harvest failure in severe rust strikes; wheat straw becomes brittle, black, and unsuitable for livestock fodder.",
            "contagion_radius": "Extremely High. Windborne urediniospores travel over thousands of kilometers across regional borders.",
            "neighbor_plot_risk": "Severe. All wheat acreage downwind faces rapid epidemic infection.",
            "progression_timeline": [
                {
                    "phase": "Days 1\u20133 (Epidermal Cracking)",
                    "symptoms": "Elongated blister-like swellings develop on stems and leaf sheaths.",
                    "risk_level": "Moderate",
                    "loss_trajectory": "10% stem integrity compromised"
                },
                {
                    "phase": "Days 4\u20137 (Pustule Eruption & Spore Bloom)",
                    "symptoms": "Pustules rupture violently; ragged epidermal flaps peel back, exposing reddish-brown powdery masses.",
                    "risk_level": "High",
                    "loss_trajectory": "30%\u201350% vascular flow disruption"
                },
                {
                    "phase": "Days 8\u201315 (Black Telia & Stem Girdling)",
                    "symptoms": "Pustules turn jet-black (teliospores); stem tissue becomes hollowed, brittle, and necrotic.",
                    "risk_level": "Critical",
                    "loss_trajectory": "65%\u201385% lodging and grain loss"
                },
                {
                    "phase": "Post Day 15 (Catastrophic Stem Lodging)",
                    "symptoms": "Wheat stalks snap under light wind; fields lodge flat; grain remains unfilled and shriveled.",
                    "risk_level": "Catastrophic",
                    "loss_trajectory": "90% total crop loss"
                }
            ]
        },
        "cure_roadmap": [
            {
                "day": "Day 1 (Canopy Alert & Fungicide Mobilization)",
                "action": "Immediately inspect culms and sheaths. Trigger emergency fungicide protocol."
            },
            {
                "day": "Day 2 (Triazole Fungicide Application)",
                "action": "Spray Propiconazole 25% EC @ 1 ml/L or Tebuconazole 25.9% EC @ 1 ml/L in 200 L water per acre."
            },
            {
                "day": "Day 5 (Nutritional Lodging Protection)",
                "action": "Foliar spray Potash (0:0:50) @ 5 g/L to strengthen stem vascular bundles."
            },
            {
                "day": "Day 10 (Secondary Barrier Spray)",
                "action": "Apply Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1 ml/L if warm humid weather persists."
            }
        ],
        "organic_control": [
            "Foliar spray Bacillus subtilis bio-agent @ 5 g/L.",
            "Wettable sulfur 80% WDG @ 2.5 g/L.",
            "Eradicate alternate barberry (Berberis) bushes near fields."
        ],
        "chemical_control": [
            "Propiconazole 25% EC @ 1 ml/L (200 ml/acre).",
            "Tebuconazole 25.9% EC @ 1 ml/L.",
            "Pyraclostrobin 20% WG @ 1 g/L."
        ],
        "nutritional_recovery": "Avoid excess nitrogen fertilizer which delays maturity and softens stem walls; apply extra potassium.",
        "preventive_measures": "Cultivate Sr-gene resistant wheat cultivars (e.g., PBW 343 resistant lines, HD 2967); avoid late sowing."
    },
    "Wheat leaf blight": {
        "crop": "Wheat",
        "category": "Fungal Disease",
        "pathogen": "Bipolaris sorokiniana (Helminthosporium sativum)",
        "severity": "High",
        "display_name": "Wheat Spot Blight / Leaf Blight",
        "symptoms": "Small, oval, dark brown spots on leaves enlarging into irregular dark brown blotches with yellow halos; black point infection on grain tips; premature drying of lower leaves.",
        "environmental_factors": "Warm and humid conditions (22\u201328\u00b0C), high humidity, warm winter spells, soil fertility stress.",
        "immediate_action": "Spray Propiconazole 25% EC or Mancozeb 75% WP; provide adequate irrigation to alleviate heat stress.",
        "future_prediction": {
            "loss_percentage": 55,
            "yield_loss_risk": "35%\u201355% grain yield reduction; early defoliation impairs grain filling, resulting in black-point stained seed.",
            "economic_impact": "Black-point infected grains are rejected for bread and pasta processing due to dark speckling in flour.",
            "contagion_radius": "High. Conidia are splash-dispersed and windborne across adjoining wheat and barley fields.",
            "neighbor_plot_risk": "High during unseasonably warm February\u2013March weather.",
            "progression_timeline": [
                {
                    "phase": "Days 1\u20133 (Spot Inception)",
                    "symptoms": "Tiny, brown, water-soaked specks appear on lower leaves.",
                    "risk_level": "Mild",
                    "loss_trajectory": "5% leaf area affected"
                },
                {
                    "phase": "Days 4\u20138 (Blotching & Halos)",
                    "symptoms": "Spots coalesce into large brown patches with chlorotic yellow borders; leaf margins desiccate.",
                    "risk_level": "Moderate",
                    "loss_trajectory": "20%\u201335% canopy necrosis"
                },
                {
                    "phase": "Days 9\u201316 (Flag Leaf Blight & Black Point)",
                    "symptoms": "Infection spreads to flag leaf and spikelets; embryo end of grains turns dark brown/black.",
                    "risk_level": "High",
                    "loss_trajectory": "40%\u201350% grain fill drop"
                },
                {
                    "phase": "Post Day 16 (Seed Viability Loss)",
                    "symptoms": "Harvested grain carries dormant mycelium, causing high seedling blight in subsequent crops.",
                    "risk_level": "Critical",
                    "loss_trajectory": "Severe seed quality degradation"
                }
            ]
        },
        "cure_roadmap": [
            {
                "day": "Day 1 (Canopy Inspection)",
                "action": "Assess presence of spot blight on bottom two leaves. Check soil moisture status."
            },
            {
                "day": "Day 2 (Fungicide Spray)",
                "action": "Foliar spray Propiconazole 25% EC @ 1 ml/L or Azoxystrobin + Difenoconazole SC @ 1 ml/L."
            },
            {
                "day": "Day 5 (Nutritional Spray)",
                "action": "Foliar spray Zinc Sulphate 0.5% + Urea 1% to stimulate photosynthetic recovery."
            },
            {
                "day": "Day 8 (Protective Follow-up)",
                "action": "Spray Mancozeb 75% WP @ 2 g/L to shield developing ears from black point infection."
            }
        ],
        "organic_control": [
            "Seed treatment with Trichoderma viride @ 8 g/kg seed.",
            "Foliar spray with Pseudomonas fluorescens @ 10 g/L.",
            "Apply neem cake soil amendment."
        ],
        "chemical_control": [
            "Propiconazole 25% EC @ 1 ml/L (200 ml/acre).",
            "Mancozeb 75% WP @ 2 g/L.",
            "Carbendazim 12% + Mancozeb 63% WP @ 2 g/L."
        ],
        "nutritional_recovery": "Top-dress balanced Potash and apply foliar Micronutrient mixture (Zn, B, Mn) @ 2 g/L.",
        "preventive_measures": "Seed treatment with Carboxin 37.5% + Thiram 37.5% @ 2.5 g/kg seed; timely sowing in November; cultivate tolerant varieties."
    },
    "Wheat mite": {
        "crop": "Wheat",
        "category": "Pest Infestation",
        "pathogen": "Petrobia latens (Brown Wheat Mite)",
        "severity": "Moderate",
        "display_name": "Brown Wheat Mite Infestation",
        "symptoms": "Silvery or yellow-white stippling on leaf blades; leaves look bronzed, scorched, and dry; fine webbing on soil surface; plants stunted in dry patches.",
        "environmental_factors": "Prolonged dry spells, absence of winter rains, sandy drought-prone soils, temperatures 18\u201325\u00b0C.",
        "immediate_action": "Apply field irrigation immediately (mites drown and wash off); spray acaricide or wettable sulfur.",
        "future_prediction": {
            "loss_percentage": 40,
            "yield_loss_risk": "25%\u201340% yield drop under rainfed conditions; leaves desiccate, reducing photosynthetic green area.",
            "economic_impact": "Premature leaf drying leads to fewer spikelets per ear and pinched kernels.",
            "contagion_radius": "Moderate. Mites crawl over soil surface and are dispersed by gusty winds.",
            "neighbor_plot_risk": "Moderate. Unirrigated neighboring plots face high invasion pressure.",
            "progression_timeline": [
                {
                    "phase": "Days 1\u20133 (Stippling & Bleaching)",
                    "symptoms": "Tiny white speckles appear along leaf margins; leaves lose glossy green color.",
                    "risk_level": "Mild",
                    "loss_trajectory": "5% sap loss"
                },
                {
                    "phase": "Days 4\u20137 (Bronzing & Scorch)",
                    "symptoms": "Stippling coalesces into yellow-bronze scorching; leaf tips curl and dry up.",
                    "risk_level": "Moderate",
                    "loss_trajectory": "15%\u201325% leaf drying"
                },
                {
                    "phase": "Days 8\u201314 (Canopy Desiccation)",
                    "symptoms": "Entire lower canopy takes on a burnt straw appearance; mites lay red diapausing eggs in soil.",
                    "risk_level": "High",
                    "loss_trajectory": "30%\u201340% grain fill reduction"
                },
                {
                    "phase": "Post Day 14 (Summer Diapause in Soil)",
                    "symptoms": "Adults deposit heat-resistant diapausing eggs in soil cracks to survive through summer.",
                    "risk_level": "Moderate",
                    "loss_trajectory": "Overwintering soil egg reservoir"
                }
            ]
        },
        "cure_roadmap": [
            {
                "day": "Day 1 (Emergency Irrigation)",
                "action": "Flood irrigate the field; brown wheat mites are extremely susceptible to free water and drown."
            },
            {
                "day": "Day 2 (Acaricide / Sulfur Application)",
                "action": "Spray Wettable Sulfur 80% WDG @ 3 g/L or Propargite 57% EC @ 2 ml/L."
            },
            {
                "day": "Day 5 (Nutritional Spray)",
                "action": "Foliar spray Urea 1% + Zinc Sulphate 0.5% to trigger rapid green vegetative revival."
            },
            {
                "day": "Day 8 (Check Soil Clods)",
                "action": "Inspect soil surface under clods to confirm mortality of crawling mites."
            }
        ],
        "organic_control": [
            "Light overhead sprinkler irrigation to wash mites off leaves.",
            "Dusting sulfur @ 10 kg/acre.",
            "Spray Neem oil (3000 ppm) @ 4 ml/L."
        ],
        "chemical_control": [
            "Wettable Sulfur 80% WDG @ 3 g/L.",
            "Propargite 57% EC @ 2 ml/L.",
            "Fenazaquin 10% EC @ 1.5 ml/L."
        ],
        "nutritional_recovery": "Ensure adequate soil moisture; foliar spray soluble Nitrogen (1%) to accelerate vegetative recovery.",
        "preventive_measures": "Timely irrigation; deep summer plowing to destroy soil-harbored diapausing eggs; intercrop with non-host legumes."
    },
    "Wheat powdery mildew": {
        "crop": "Wheat",
        "category": "Fungal Disease",
        "pathogen": "Blumeria graminis f. sp. tritici",
        "severity": "Moderate",
        "display_name": "Wheat Powdery Mildew",
        "symptoms": "Fluffy, white to light gray powdery patches of fungal mycelium and conidia on upper surface of leaves, leaf sheaths, and spikes; patches turn gray-brown with tiny black dots (cleistothecia); leaves turn chlorotic.",
        "environmental_factors": "Cool, humid, overcast weather (15\u201320\u00b0C), dense leafy crop canopy, shaded conditions, high nitrogen fertilization.",
        "immediate_action": "Spray triazole fungicide or wettable sulfur; avoid excessive nitrogen top-dressing.",
        "future_prediction": {
            "loss_percentage": 40,
            "yield_loss_risk": "20%\u201340% grain loss if mildew colonizes flag leaf and ear glumes prior to anthesis.",
            "economic_impact": "Reduced photosynthate accumulation causes poor kernel fill and lower hectoliter weight.",
            "contagion_radius": "High. Powdery airborne conidia disperse in white dust clouds across adjacent plots.",
            "neighbor_plot_risk": "High in shaded, dense wheat stands.",
            "progression_timeline": [
                {
                    "phase": "Days 1\u20133 (White Powder Spots)",
                    "symptoms": "Small, discrete white cottony tufts appear on lower leaf blades.",
                    "risk_level": "Mild",
                    "loss_trajectory": "5% leaf surface covered"
                },
                {
                    "phase": "Days 4\u20137 (Foliar Velvet Expansion)",
                    "symptoms": "Powdery mats coalesce, coating upper leaf surface; underlying leaf tissue yellows.",
                    "risk_level": "Moderate",
                    "loss_trajectory": "15%\u201325% photosynthetic decline"
                },
                {
                    "phase": "Days 8\u201315 (Flag Leaf & Glume Encroachment)",
                    "symptoms": "Fungus climbs to flag leaf and head; patches turn dirty gray with black pinhead cleistothecia.",
                    "risk_level": "High",
                    "loss_trajectory": "25%\u201340% grain filling drop"
                },
                {
                    "phase": "Post Day 15 (Early Senescence)",
                    "symptoms": "Heavily infected leaves brown and die prematurely; grains remain small and thin.",
                    "risk_level": "Moderate",
                    "loss_trajectory": "Reduced kernel size"
                }
            ]
        },
        "cure_roadmap": [
            {
                "day": "Day 1 (Canopy Aeration)",
                "action": "Assess mildew spread on middle and upper canopy. Ensure field is not over-irrigated."
            },
            {
                "day": "Day 2 (Fungicide Intervention)",
                "action": "Foliar spray Tebuconazole 25.9% EC @ 1 ml/L or Propiconazole 25% EC @ 1 ml/L or Wettable Sulfur @ 2.5 g/L."
            },
            {
                "day": "Day 5 (Nutritional Balance)",
                "action": "Apply Potash (0:0:50) @ 5 g/L foliar spray; discontinue nitrogen."
            },
            {
                "day": "Day 8 (Follow-up Check)",
                "action": "Inspect flag leaves for dried, grayish inactive mildew crusts."
            }
        ],
        "organic_control": [
            "Foliar spray Wettable Sulfur 80% WDG @ 2.5 g/L.",
            "Spray cow milk solution (10% in water).",
            "Neem oil (10000 ppm) @ 3 ml/L."
        ],
        "chemical_control": [
            "Tebuconazole 25.9% EC @ 1 ml/L.",
            "Propiconazole 25% EC @ 1 ml/L.",
            "Kresoxim-methyl 44.3% SC @ 0.7 ml/L."
        ],
        "nutritional_recovery": "Apply Silicon foliar spray @ 2 ml/L to reinforce epidermal papillae against fungal penetration.",
        "preventive_measures": "Avoid excessive seed rates; maintain balanced NPK (avoid high nitrogen); cultivate resistant wheat varieties."
    },
    "Wheat scab": {
        "crop": "Wheat",
        "category": "Fungal Disease",
        "pathogen": "Fusarium graminearum / Fusarium culmorum (Fusarium Head Blight)",
        "severity": "Critical",
        "display_name": "Wheat Scab (Fusarium Head Blight)",
        "symptoms": "Premature bleaching of individual spikelets or entire heads while remainder of head is green; pinkish/salmon-orange fungal spore mass at base of glumes; shriveled, chalky white 'tombstone' grains.",
        "environmental_factors": "Warm, wet, humid weather (22\u201328\u00b0C) during wheat flowering (anthesis), frequent rains, overhead sprinkler irrigation.",
        "immediate_action": "Spray triazole fungicide (Tebuconazole/Metconazole) immediately at early flowering (anthesis); never delay spray once flowering begins.",
        "future_prediction": {
            "loss_percentage": 75,
            "yield_loss_risk": "50%\u201375% yield loss; severe deoxynivalenol (DON / vomitoxin) mycotoxin contamination.",
            "economic_impact": "Total commercial rejection; mycotoxin-contaminated grain is poisonous to humans and livestock and cannot be sold.",
            "contagion_radius": "High. Ascospores released from corn stubble travel on wind currents across several kilometers.",
            "neighbor_plot_risk": "High. All flowering wheat downwind during rainstorms faces high infection risk.",
            "progression_timeline": [
                {
                    "phase": "Days 1\u20133 (Anther Infection at Anthesis)",
                    "symptoms": "Spores germinate on extruding yellow anthers; hyphae enter floret vascular system.",
                    "risk_level": "Moderate",
                    "loss_trajectory": "10% spikelet infection"
                },
                {
                    "phase": "Days 4\u20137 (Bleached Spikelets & Salmon Spores)",
                    "symptoms": "Infected spikelets turn bleached straw-colored; salmon-orange spore crusts form on glume sutures.",
                    "risk_level": "High",
                    "loss_trajectory": "30%\u201350% head bleaching"
                },
                {
                    "phase": "Days 8\u201315 (Rachis Girdling & Tombstone Kernels)",
                    "symptoms": "Fungus girdles the central rachis; all spikelets above point of infection die; grains turn into chalky 'tombstones'.",
                    "risk_level": "Critical",
                    "loss_trajectory": "60%\u201375% grain destruction"
                },
                {
                    "phase": "Post Day 15 (Mycotoxin Saturation)",
                    "symptoms": "Deoxynivalenol (DON) toxin accumulates in grain tissue, making grain toxic for consumption.",
                    "risk_level": "Catastrophic",
                    "loss_trajectory": "Complete economic write-off"
                }
            ]
        },
        "cure_roadmap": [
            {
                "day": "Day 1 (Flowering Timing Verification)",
                "action": "Determine if crop is at Feekes 10.5.1 (beginning of flowering). Target fungicide application precisely at this stage."
            },
            {
                "day": "Day 2 (Fungicide Spray)",
                "action": "Spray Tebuconazole 25.9% EC @ 1 ml/L or Prothioconazole + Tebuconazole SC @ 1 ml/L using forward/backward angled nozzles."
            },
            {
                "day": "Day 5 (Rachis Protection)",
                "action": "Avoid overhead sprinkler irrigation during flowering period."
            },
            {
                "day": "Day 10 (Grain Sampling for Scab)",
                "action": "Inspect heads for bleached spikelets; plan mechanical cleaning at harvest to blow away light tombstone kernels."
            }
        ],
        "organic_control": [
            "Foliar spray with Bacillus amyloliquefaciens @ 5 g/L during anthesis.",
            "Bury previous corn stalks through deep plowing.",
            "Crop rotation with non-host broadleaf crops (soybean/canola)."
        ],
        "chemical_control": [
            "Tebuconazole 25.9% EC @ 1 ml/L (200 ml/acre).",
            "Prothioconazole 250 g/L EC @ 0.8 ml/L.",
            "Metconazole 50 g/L SL @ 1.5 ml/L (avoid strobilurin fungicides which can increase DON toxin levels)."
        ],
        "nutritional_recovery": "Not applicable to infected spikelets; adjust combine harvester fan speed at harvest to blow out lightweight diseased kernels.",
        "preventive_measures": "Avoid planting wheat directly after corn/maize; cultivate moderately resistant wheat cultivars; plow down crop stubble."
    },
    "Wheat___Yellow_Rust": {
        "crop": "Wheat",
        "category": "Fungal Disease",
        "pathogen": "Puccinia striiformis f. sp. tritici (Stripe Rust)",
        "severity": "Critical",
        "display_name": "Wheat Yellow Rust (Stripe Rust)",
        "symptoms": "Bright yellow to lemon-yellow powdery pustules arranged in narrow, parallel stripes or lines along leaf veins; stripes resemble sewing machine stitches; yellow powder rubs off on fingers.",
        "environmental_factors": "Cool temperatures (10\u201318\u00b0C), high humidity, intermittent drizzling rain or heavy morning dew, foggy winter conditions.",
        "immediate_action": "Spray Propiconazole 25% EC or Tebuconazole immediately; stripe rust spreads with explosive speed in cool weather.",
        "future_prediction": {
            "loss_percentage": 85,
            "yield_loss_risk": "Catastrophic 70%\u201385% yield reduction; early infection destroys photosynthetic machinery and causes 100% grain shriveling.",
            "economic_impact": "Complete crop failure in susceptible cultivars; grain becomes light, chaffy, and unmarketable.",
            "contagion_radius": "Extremely High. Windborne urediniospores travel thousands of miles on jet streams across continents.",
            "neighbor_plot_risk": "Severe. All wheat fields in the sub-Himalayan plains / northern wheat belt face simultaneous epidemic risk.",
            "progression_timeline": [
                {
                    "phase": "Days 1\u20133 (Yellow Stripe Inception)",
                    "symptoms": "Narrow yellow chlorotic lines appear parallel to leaf veins.",
                    "risk_level": "Moderate",
                    "loss_trajectory": "10% leaf area affected"
                },
                {
                    "phase": "Days 4\u20137 (Pustule Bursting & Powdery Lines)",
                    "symptoms": "Lemon-yellow pustules burst along veins in continuous beaded stripes; yellow spore dust sheds profusely.",
                    "risk_level": "High",
                    "loss_trajectory": "30%\u201350% canopy blighted"
                },
                {
                    "phase": "Days 8\u201315 (Flag Leaf Destruction)",
                    "symptoms": "Stripes engulf flag leaf and head glumes; entire canopy turns yellow and dries like burnt straw.",
                    "risk_level": "Critical",
                    "loss_trajectory": "65%\u201380% grain filling loss"
                },
                {
                    "phase": "Post Day 15 (Catastrophic Shriveling)",
                    "symptoms": "Kernels fail to fill; heads remain erect with hollow, papery, paper-thin grains.",
                    "risk_level": "Catastrophic",
                    "loss_trajectory": "85% harvestable yield lost"
                }
            ]
        },
        "cure_roadmap": [
            {
                "day": "Day 1 (Canopy Alert & Mapping)",
                "action": "Walk diagonally across field; look for yellow patches/foci. Immediately alert neighboring farmers."
            },
            {
                "day": "Day 2 (Emergency Triazole Spray)",
                "action": "Foliar spray Propiconazole 25% EC @ 1 ml/L (200 ml/acre in 200 L water) or Tebuconazole 25.9% EC @ 1 ml/L."
            },
            {
                "day": "Day 5 (Nutritional Rescue)",
                "action": "Apply Potassium Nitrate (13:0:45) @ 10 g/L foliar spray to provide osmotic resilience."
            },
            {
                "day": "Day 10 (Follow-up Spray if Weather Remains Cool)",
                "action": "If temperatures remain below 18\u00b0C and active yellow pustules persist, repeat spray with Azoxystrobin + Difenoconazole @ 1 ml/L."
            }
        ],
        "organic_control": [
            "Foliar spray Bacillus subtilis @ 5 g/L at early onset.",
            "Wettable sulfur @ 2.5 g/L.",
            "Neem oil (10000 ppm) @ 3 ml/L."
        ],
        "chemical_control": [
            "Propiconazole 25% EC @ 1 ml/L (200 ml/acre).",
            "Tebuconazole 25.9% EC @ 1 ml/L.",
            "Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1 ml/L."
        ],
        "nutritional_recovery": "Foliar spray Potash @ 5 g/L and Zinc Chelate @ 1.5 g/L to accelerate grain development in surviving green leaf areas.",
        "preventive_measures": "Sow resistant varieties (e.g., HD 3086, PBW 550, DBW 187); avoid late sowing; monitor foothill plains in December."
    },
    "Army worm": {
        "crop": "Multi-Crop (Maize / Rice / Wheat)",
        "category": "Pest Infestation",
        "pathogen": "Mythimna separata / Spodoptera spp.",
        "severity": "Critical",
        "display_name": "Armyworm Outbreak",
        "symptoms": "Aggressive skeletonization and complete leaf defoliation from margin to midrib; ragged leaves; caterpillar droppings in leaf whorls; larvae marching in swarms.",
        "environmental_factors": "Prolonged dry spells followed by sudden heavy rainfall; lush, over-fertilized crop canopies.",
        "immediate_action": "Trench fields (30 cm wide and deep) around boundaries with kerosene-treated water to block migrating armies.",
        "future_prediction": {
            "loss_percentage": 90,
            "yield_loss_risk": "Catastrophic 80%\u2013100% total crop defoliation in 4\u20136 days; entire fields stripped to bare stalks overnight.",
            "economic_impact": "Total vegetative and grain loss; complete replanting costs required if caught during whorl stage.",
            "contagion_radius": "Massive. Larvae march across 200\u2013500 meters per day on foot; adult moths migrate hundreds of kilometers on wind fronts.",
            "neighbor_plot_risk": "Severe. Swarms will invade adjacent maize, sorghum, rice, and wheat acreage consecutively.",
            "progression_timeline": [
                {
                    "phase": "Days 1\u20132 (Windowpane Feeding)",
                    "symptoms": "Early instar larvae scrape upper leaf epidermis, leaving translucent windowpane patches.",
                    "risk_level": "Moderate",
                    "loss_trajectory": "10% photosynthetic surface lost"
                },
                {
                    "phase": "Days 3\u20135 (Whorl Infiltration & Chewing)",
                    "symptoms": "Larvae burrow into whorls; large ragged holes chewed into emerging leaves; sawdust-like frass heaps.",
                    "risk_level": "High",
                    "loss_trajectory": "35%\u201355% canopy loss"
                },
                {
                    "phase": "Days 6\u20139 (Army March & Stripping)",
                    "symptoms": "Gregarious swarming phase; caterpillars consume all leaf blades, leaving only bare midribs; tassels and ears destroyed.",
                    "risk_level": "Critical",
                    "loss_trajectory": "75%\u201390% yield destruction"
                },
                {
                    "phase": "Post Day 9 (Complete Plant Mortality)",
                    "symptoms": "Growing points severed; plants collapse and dry out; army moves synchronously to neighboring farm plots.",
                    "risk_level": "Catastrophic",
                    "loss_trajectory": "100% total field destruction"
                }
            ]
        },
        "cure_roadmap": [
            {
                "day": "Day 1 (Perimeter Trenching & Trapping)",
                "action": "Excavate 30 cm perimeter barrier trenches; place poison bait or water+kerosene. Install solar light traps."
            },
            {
                "day": "Day 2 (Immediate Whorl Spray)",
                "action": "Spray Chlorantraniliprole 18.5% SC @ 0.4 ml/L directly into plant whorls during late afternoon/evening."
            },
            {
                "day": "Day 3\u20134 (Poison Baiting)",
                "action": "Distribute poisoned rice bran bait (10 kg bran + 1 kg jaggery + 100 g Thiodicarb 75% WP per acre) into whorls."
            },
            {
                "day": "Day 7 (Bio-Control Follow-up)",
                "action": "Spray Beauveria bassiana or Metarhizium anisopliae @ 5 g/L to eliminate surviving instars."
            }
        ],
        "organic_control": [
            "Apply Beauveria bassiana or Metarhizium anisopliae @ 5 g/L in evening hours.",
            "Spray Neem oil @ 5 ml/L + soap emulsion.",
            "Install bird perches (T-shaped) @ 20 per acre to promote avian predation."
        ],
        "chemical_control": [
            "Emamectin Benzoate 5% SG @ 0.4 g/L.",
            "Chlorantraniliprole 18.5% SC @ 0.4 ml/L directed into whorls.",
            "Thiodicarb 75% WP @ 1.5 g/L or Novaluron 10% EC @ 1.5 ml/L."
        ],
        "nutritional_recovery": "After pest knockdown, apply light urea top dressing (15 kg/acre) + Zinc Sulphate @ 5 kg/acre to trigger rapid vegetative regrowth.",
        "preventive_measures": "Deep summer plowing; avoid late planting; intercrop maize with desmodium or cowpea."
    },
    "Common_Rust": {
        "crop": "Maize (Corn)",
        "category": "Fungal Disease",
        "pathogen": "Puccinia sorghi",
        "severity": "Moderate",
        "display_name": "Common Rust of Maize",
        "symptoms": "Golden-brown to cinnamon-brown powdery pustules (uredinia) on both upper and lower leaf surfaces; pustules rupture epidermis releasing powdery rusty spores.",
        "environmental_factors": "Cool to moderate temperatures (16\u201325\u00b0C), high relative humidity (>95%), dew periods of 6\u20138 hours.",
        "immediate_action": "Scout lower canopy; apply protective fungicide if pustules appear prior to tasseling.",
        "future_prediction": {
            "loss_percentage": 45,
            "yield_loss_risk": "30%\u201345% grain yield reduction if rust establishes on the ear leaf and leaves above it before tasseling.",
            "economic_impact": "Small, poorly filled cobs with loose kernels; severe test weight reduction.",
            "contagion_radius": "Very High. Urediniospores are lightweight, windborne, and travel hundreds of miles across regional weather fronts.",
            "neighbor_plot_risk": "High. All nearby sweet corn and field maize plots will be exposed within 48\u201372 hours.",
            "progression_timeline": [
                {
                    "phase": "Days 1\u20133 (Flecking Stage)",
                    "symptoms": "Tiny, chlorotic flecks appear scattered across upper leaf surfaces.",
                    "risk_level": "Mild",
                    "loss_trajectory": "5% leaf area affected"
                },
                {
                    "phase": "Days 4\u20137 (Pustule Eruption)",
                    "symptoms": "Flecks erupt into raised, cinnamon-brown pustules that shed powdery spores on contact.",
                    "risk_level": "Moderate",
                    "loss_trajectory": "15%\u201325% photosynthetic capacity decline"
                },
                {
                    "phase": "Days 8\u201315 (Coalescence & Chlorosis)",
                    "symptoms": "Pustules merge into large necrotic stripes; leaves turn brown and die prematurely.",
                    "risk_level": "High",
                    "loss_trajectory": "30%\u201345% canopy senescence"
                },
                {
                    "phase": "Post Day 15 (Ear Stunting & Teliospore Shift)",
                    "symptoms": "Pustules turn blackish (telia stage); kernel filling stalls, resulting in partially filled, stunted ears.",
                    "risk_level": "Critical",
                    "loss_trajectory": "Permanent yield suppression"
                }
            ]
        },
        "cure_roadmap": [
            {
                "day": "Day 1 (Canopy Scouting)",
                "action": "Inspect ear leaf and top 3 leaves. Calculate rust coverage percentage."
            },
            {
                "day": "Day 2 (Foliar Fungicide Application)",
                "action": "Spray Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1 ml/L or Pyraclostrobin 20% WG @ 1 g/L."
            },
            {
                "day": "Day 5 (Nutritional Resistance)",
                "action": "Foliar spray Potassium Dihydrogen Phosphate (0:52:34) @ 5 g/L to supply systemic energy and cell wall vigor."
            },
            {
                "day": "Day 8\u201310 (Evaluation)",
                "action": "Check for sporulation cessation; apply second spray of Mancozeb @ 2 g/L if wet cool weather persists."
            }
        ],
        "organic_control": [
            "Foliar spray with Bacillus subtilis @ 5 g/L.",
            "Neem oil spray (10000 ppm) @ 3 ml/L.",
            "Apply wettable sulfur @ 2 g/L as preventive dust/spray."
        ],
        "chemical_control": [
            "Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1 ml/L.",
            "Propiconazole 25% EC @ 1 ml/L.",
            "Pyraclostrobin 20% WG @ 1 g/L."
        ],
        "nutritional_recovery": "Avoid excess nitrogen; foliar spray soluble Potash (0:0:50) @ 5 g/L to enhance leaf membrane toughness.",
        "preventive_measures": "Plant rust-resistant corn hybrids; practice early planting to escape late-season spore peaks."
    },
    "Gray_Leaf_Spot": {
        "crop": "Maize (Corn)",
        "category": "Fungal Disease",
        "pathogen": "Cercospora zeae-maydis",
        "severity": "High",
        "display_name": "Gray Leaf Spot (GLS) of Maize",
        "symptoms": "Rectangular, brown to gray lesions strictly delimited by leaf veins; lesions expand parallel to veins into long blocky blights; premature leaf drying and stalk lodging.",
        "environmental_factors": "Warm temperatures (25\u201332\u00b0C), persistent high humidity (>90%), morning fog, minimum tillage leaving crop residue on soil.",
        "immediate_action": "Apply systemic strobilurin + triazole fungicide if lesions reach ear leaf before or at silking.",
        "future_prediction": {
            "loss_percentage": 65,
            "yield_loss_risk": "40%\u201365% grain yield reduction; early blighting causes poor grain filling, loose kernels, and severe stalk lodging prior to mechanical harvesting.",
            "economic_impact": "Severe grain shriveling and lodging losses; lodged corn cannot be efficiently combined, doubling field harvest costs.",
            "contagion_radius": "High. Windborne and rain-splashed conidia travel across adjacent fields continuously during humid overcast weather.",
            "neighbor_plot_risk": "High. Downwind maize stands under continuous cropping will encounter heavy infection pressure.",
            "progression_timeline": [
                {
                    "phase": "Days 1\u20134 (Pinpoint Halo Spots)",
                    "symptoms": "Tiny, tan spots with yellow halos appear on lower leaves nearest soil debris.",
                    "risk_level": "Mild",
                    "loss_trajectory": "5% lower foliage affected"
                },
                {
                    "phase": "Days 5\u201310 (Rectangular Vein Block Lesions)",
                    "symptoms": "Lesions elongate into characteristic rectangular blocks (1\u20136 cm long) restricted by parallel leaf veins.",
                    "risk_level": "Moderate",
                    "loss_trajectory": "20%\u201335% functional leaf loss"
                },
                {
                    "phase": "Days 11\u201318 (Blinding Canopy Blight)",
                    "symptoms": "Lesions coalesce across leaf veins; entire leaves turn gray-tan and die; ear leaves desiccate during grain fill.",
                    "risk_level": "High",
                    "loss_trajectory": "45%\u201360% grain filling drop"
                },
                {
                    "phase": "Post Day 18 (Stalk Cannibalization & Lodging)",
                    "symptoms": "Plant mobilizes stalk carbohydrates to fill kernels; stalks weaken and break over in wind storms.",
                    "risk_level": "Critical",
                    "loss_trajectory": "Severe lodging and 65% harvest loss"
                }
            ]
        },
        "cure_roadmap": [
            {
                "day": "Day 1 (Scouting & Threshold Evaluation)",
                "action": "Assess presence of rectangular lesions on the 3rd leaf below ear level during pre-tasseling."
            },
            {
                "day": "Day 2 (Dual-Action Fungicide Spray)",
                "action": "Foliar spray Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1 ml/L or Pyraclostrobin 13.3% + Epoxiconazole 5% SE @ 1.5 ml/L."
            },
            {
                "day": "Day 5 (Foliar Potash & Zinc)",
                "action": "Apply Potassium Dihydrogen Phosphate (0:52:34) @ 5 g/L to stiffen stalk vascular bundles."
            },
            {
                "day": "Day 10 (Follow-up Check)",
                "action": "Monitor ear leaf greenness; prepare for prompt harvest once grain reaches physiological maturity to avoid lodging."
            }
        ],
        "organic_control": [
            "Foliar spray with Bacillus subtilis or Trichoderma harzianum @ 5 g/L.",
            "Neem-based botanical formulations @ 4 ml/L.",
            "Complete residue plowing post-harvest to bury overwintering mycelium."
        ],
        "chemical_control": [
            "Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1 ml/L.",
            "Pyraclostrobin + Fluxapyroxad SC @ 0.8 ml/L.",
            "Propiconazole 25% EC @ 1 ml/L."
        ],
        "nutritional_recovery": "Foliar spray Potassium and Zinc Chelate; maintain balanced nitrogen:potassium ratio (1:1) to support stalk strength.",
        "preventive_measures": "2-year crop rotation with soybeans or cotton; deep fall plowing to bury infested maize residues; select GLS-tolerant corn hybrids."
    },
    "Healthy Maize": {
        "crop": "Maize (Corn)",
        "category": "Healthy Crop",
        "pathogen": "None (Optimum Crop Health)",
        "severity": "Healthy",
        "display_name": "Healthy Maize (Corn)",
        "symptoms": "Vigorous deep green leaves with erect architecture, spotless foliage, strong thick stalks, and healthy emerging silk/tassels.",
        "environmental_factors": "Balanced sunlight (6\u20138 hrs/day), fertile well-drained loamy soil, optimal temperature (20\u201330\u00b0C), adequate soil moisture.",
        "immediate_action": "Maintain scheduled split nitrogen applications, scheduled irrigations, and routine IPM scouting.",
        "future_prediction": {
            "loss_percentage": 0,
            "yield_loss_risk": "Optimal harvest yield expected (95%\u2013100% potential); cobs will develop full tip-fill with heavy test weights.",
            "economic_impact": "Maximum commercial market value; premium grain grade suitable for food, starch, and export markets.",
            "contagion_radius": "None. Crop is robust with active systemic resistance.",
            "neighbor_plot_risk": "None. Serves as a healthy buffer stand.",
            "progression_timeline": [
                {
                    "phase": "Knee-High to V8 Stage",
                    "symptoms": "Rapid vegetative growth; leaf area index expands rapidly with deep chlorophyll pigmentation.",
                    "risk_level": "None",
                    "loss_trajectory": "0% (Full yield potential)"
                },
                {
                    "phase": "Tasseling & Silking Stage",
                    "symptoms": "Pollen shed synchronizes perfectly with silk emergence; successful ovule fertilization across cob length.",
                    "risk_level": "None",
                    "loss_trajectory": "0% (Optimal kernel set)"
                },
                {
                    "phase": "Blister to Dent Stage",
                    "symptoms": "Starch accumulates rapidly in kernel endosperm; milk line transitions downward uniformly.",
                    "risk_level": "None",
                    "loss_trajectory": "0% (Max grain density)"
                },
                {
                    "phase": "Black Layer & Harvest Maturity",
                    "symptoms": "Black layer forms at kernel base indicating physiological maturity; stalks remain erect for smooth harvest.",
                    "risk_level": "None",
                    "loss_trajectory": "0% (Peak harvest realization)"
                }
            ]
        },
        "cure_roadmap": [
            {
                "day": "Day 1 (Nutrient Audit)",
                "action": "Verify soil moisture at 15 cm depth; apply second split of Urea (30 kg/acre) along with Potassium if at V6\u2013V8 stage."
            },
            {
                "day": "Day 3 (Preventive Bio-Scouting)",
                "action": "Scout whorls for early Fall Armyworm egg masses; maintain pheromone monitor traps."
            },
            {
                "day": "Day 7 (Micronutrient Maintenance)",
                "action": "Foliar spray Zinc Sulphate 0.5% + Boron 0.2% during pre-tasseling to maximize tassel pollen viability."
            },
            {
                "day": "Day 14 (Irrigation Alignment)",
                "action": "Ensure uninterrupted moisture during silking and milk stages; drought stress at this point is most damaging."
            }
        ],
        "organic_control": [
            "Maintain compost application (5 tons/acre) annually.",
            "Apply Jeevamrutha or Panchagavya (3%) foliar spray every 15 days.",
            "Conserve beneficial ground beetles, spiders, and ladybird beetles."
        ],
        "chemical_control": [
            "No chemical fungicides or insecticides required.",
            "Prophylactic seed treatment was successfully protective."
        ],
        "nutritional_recovery": "Maintain balanced N:P:K (120:60:40 kg/ha) schedule with Zinc supplement (25 kg ZnSO4/ha basal).",
        "preventive_measures": "Continue timely weeding, maintain optimum plant density (60x20 cm), and adhere to rotational cropping."
    },
    "maize ear rot": {
        "crop": "Maize (Corn)",
        "category": "Fungal Disease",
        "pathogen": "Fusarium verticillioides / Gibberella zeae (Stenocarpella maydis)",
        "severity": "Critical",
        "display_name": "Maize Ear Rot Complex (Fusarium / Gibberella)",
        "symptoms": "White, pinkish, or reddish-brown mold spreading across kernels starting from ear tip or injury points; 'starburst' white streaks radiating from kernel caps; rotten cobs with lightweight chaffy grains.",
        "environmental_factors": "Warm humid weather (24\u201330\u00b0C) after silking, drought stress during grain filling followed by late rains, insect damage by ear borers.",
        "immediate_action": "Harvest ears promptly when mature to prevent further mold growth; dry harvested grain down to <14% moisture immediately.",
        "future_prediction": {
            "loss_percentage": 70,
            "yield_loss_risk": "45%\u201370% harvestable yield loss; infected ears develop dense fungal mats and mycotoxins (Fumonisins and Zearalenone).",
            "economic_impact": "Total commercial rejection; mycotoxin-contaminated corn causes severe livestock toxicity (leukoencephalomalacia in horses, pulmonary edema in swine).",
            "contagion_radius": "Moderate. Airborne conidia enter silks and wounds caused by ear borers.",
            "neighbor_plot_risk": "Moderate. Downwind maize acreage during silking under wet spells faces high silk infection.",
            "progression_timeline": [
                {
                    "phase": "Days 1\u20134 (Silk Colonization)",
                    "symptoms": "Spores germinate on senescing silks; hyphae grow down silk channels toward ovules.",
                    "risk_level": "Moderate",
                    "loss_trajectory": "10% kernel invasion"
                },
                {
                    "phase": "Days 5\u201310 (Starburst Cap Streaking)",
                    "symptoms": "Individual kernels exhibit white radiating starburst streaks on pericarp caps; pinkish mold develops between kernel rows.",
                    "risk_level": "High",
                    "loss_trajectory": "25%\u201340% kernel rot"
                },
                {
                    "phase": "Days 11\u201320 (Cob Infiltration & Rot)",
                    "symptoms": "Mycelium invades the central cob core; husk leaves cement to kernels with thick white/salmon mold mats.",
                    "risk_level": "Critical",
                    "loss_trajectory": "50%\u201370% cob destruction"
                },
                {
                    "phase": "Post Day 20 (Fumonisin Mycotoxin Saturation)",
                    "symptoms": "Kernels crumble into chalky infected dust; dangerous fumonisin toxins reach toxic concentrations.",
                    "risk_level": "Catastrophic",
                    "loss_trajectory": "Complete grain condemnation"
                }
            ]
        },
        "cure_roadmap": [
            {
                "day": "Day 1 (Husk Opening Inspection)",
                "action": "Peel back husks of 20 ears across field. Check for ear borer entries and pinkish mold."
            },
            {
                "day": "Day 2 (Fungicide Silk Protection if at Silking)",
                "action": "If still in silking window, spray Prothioconazole + Tebuconazole SC @ 1 ml/L or Pyraclostrobin @ 1 g/L targeting ear zone."
            },
            {
                "day": "Day 4 (Ear Borer Interception)",
                "action": "Spray Chlorantraniliprole 18.5% SC @ 0.3 ml/L to prevent caterpillars from chewing bore holes into husks."
            },
            {
                "day": "Day 10 (Harvest & Forced Drying Protocol)",
                "action": "Harvest at 20\u201322% moisture; dry mechanically to 13.5% within 48 hours to stop fungal growth."
            }
        ],
        "organic_control": [
            "Foliar spray with Bacillus amyloliquefaciens on emerging silks.",
            "Prompt mechanical drying of harvested corn below 14% moisture.",
            "Destroy corn stubble by deep plowing."
        ],
        "chemical_control": [
            "Prothioconazole 250 g/L EC @ 0.8 ml/L.",
            "Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1 ml/L.",
            "Chlorantraniliprole 18.5% SC @ 0.3 ml/L (to prevent insect ear wounding)."
        ],
        "nutritional_recovery": "Avoid late nitrogen application; ensure adequate potassium fertilization to prevent stalk and cob weakness.",
        "preventive_measures": "Plant corn hybrids with tight, drooping husk coverage; control corn earworms; store grain with antifungal propionic acid if needed."
    },
    "maize fall armyworm": {
        "crop": "Maize (Corn)",
        "category": "Pest Infestation",
        "pathogen": "Spodoptera frugiperda",
        "severity": "Critical",
        "display_name": "Maize Fall Armyworm (FAW)",
        "symptoms": "Extensive skeletonized leaves with windowpane feeding; deep ragged holes chewed through whorl leaves; large piles of sawdust-like caterpillar frass packed in whorl; inverted 'Y' mark on larval head.",
        "environmental_factors": "Warm temperatures (25\u201335\u00b0C), intermittent dry and wet weather, staggered overlapping corn planting dates.",
        "immediate_action": "Apply direct whorl treatment with recommended insecticide; handpick egg masses; install FAW pheromone traps.",
        "future_prediction": {
            "loss_percentage": 85,
            "yield_loss_risk": "Catastrophic 60%\u201385% yield reduction if unmanaged; whorl destruction severs growing point ('dead heart'), and larvae bore into ears.",
            "economic_impact": "Total destruction of cobs; secondary fungal infections ruin whatever grain remains.",
            "contagion_radius": "Extremely High. Adult moths can fly up to 100 km per night on prevailing wind currents.",
            "neighbor_plot_risk": "Severe. All corn, sorghum, and sugarcane in the regional zone will experience heavy infestation.",
            "progression_timeline": [
                {
                    "phase": "Days 1\u20133 (Egg Hashing & Windowpane Scrapes)",
                    "symptoms": "Felt-like buff-colored egg masses hatch in whorls; 1st\u20132nd instar larvae scrape green tissue, leaving clear parchment windows.",
                    "risk_level": "Moderate",
                    "loss_trajectory": "10% foliar damage"
                },
                {
                    "phase": "Days 4\u20137 (Whorl Infiltration & Deep Ragged Holes)",
                    "symptoms": "3rd\u20134th instar larvae bore deep into whorl cone; emerging leaves display massive ragged holes; heavy frass accumulates.",
                    "risk_level": "High",
                    "loss_trajectory": "30%\u201350% canopy defoliation"
                },
                {
                    "phase": "Days 8\u201315 (Growing Point Destruction / Ear Boring)",
                    "symptoms": "Large larvae sever the apical meristem causing dead hearts; late instars bore through husk into ear kernels.",
                    "risk_level": "Critical",
                    "loss_trajectory": "65%\u201380% cob damage"
                },
                {
                    "phase": "Post Day 15 (Soil Pupation & Second Generation)",
                    "symptoms": "Larvae pupate 2\u20138 cm below soil in earthen cocoons, re-emerging in 7\u201310 days as adults for a massive second wave.",
                    "risk_level": "Catastrophic",
                    "loss_trajectory": "85% complete crop failure"
                }
            ]
        },
        "cure_roadmap": [
            {
                "day": "Day 1 (Egg Mass Crushing & Pheromone Traps)",
                "action": "Handpick and crush woolly egg masses on leaf undersides. Install Spodo-lure traps @ 10 traps/acre."
            },
            {
                "day": "Day 2 (Immediate Whorl Spray / Drenching)",
                "action": "Spray Chlorantraniliprole 18.5% SC @ 0.4 ml/L (80 ml/acre in 200 L water) or Spinetoram 11.7% SC @ 0.5 ml/L directly into whorls."
            },
            {
                "day": "Day 4 (Bio-Pesticidal Sand/Ash Application)",
                "action": "Drop fine sand mixed with neem cake (9:1 ratio) or Metarhizium rileyi @ 5 g/kg into whorls to kill hidden larvae."
            },
            {
                "day": "Day 8 (Egg Parasitoid Release)",
                "action": "Release Trichogramma pretiosum or Telenomus remus @ 100,000/ha to parasitize newly laid egg masses."
            }
        ],
        "organic_control": [
            "Apply Beauveria bassiana or Metarhizium rileyi @ 5 g/L.",
            "Release egg parasitoid Telenomus remus or Trichogramma pretiosum @ 100,000/ha.",
            "Drop neem cake powder + dry sand (1:9) directly into leaf whorls.",
            "Install Spodoptera frugiperda pheromone traps @ 10/acre."
        ],
        "chemical_control": [
            "Chlorantraniliprole 18.5% SC @ 0.4 ml/L (directed into whorls).",
            "Spinetoram 11.7% SC @ 0.5 ml/L.",
            "Emamectin Benzoate 5% SG @ 0.4 g/L."
        ],
        "nutritional_recovery": "Top-dress Urea @ 25 kg/acre + Zinc Sulphate @ 5 kg/acre to boost compensatory leaf growth.",
        "preventive_measures": "Synchronous community planting; avoid late staggered planting; intercrop with desmodium (push-pull strategy)."
    },
    "maize stem borer": {
        "crop": "Maize (Corn)",
        "category": "Pest Infestation",
        "pathogen": "Chilo partellus (Spotted Stem Borer)",
        "severity": "High",
        "display_name": "Maize Spotted Stem Borer",
        "symptoms": "Parallel rows of pinholes across newly expanded leaves; 'dead heart' in seedlings; stem bored with external frass holes; lodging of hollowed mature stalks.",
        "environmental_factors": "Warm and moderately humid conditions (25\u201330\u00b0C), continuous corn and sorghum cultivation, dry seasons.",
        "immediate_action": "Apply whorl granules (Carbofuran or Fipronil) or spray systemic diamide insecticide; pull out dead hearts.",
        "future_prediction": {
            "loss_percentage": 65,
            "yield_loss_risk": "40%\u201365% yield reduction; early dead heart destroys main stalk; internal stem tunneling weakens stalk causing severe wind lodging.",
            "economic_impact": "Hollowed-out stalks produce small, chaffy cobs; lodged corn cannot be mechanically harvested.",
            "contagion_radius": "High. Adult moths fly up to 2\u20135 km; females lay fish-scale-like overlapping egg masses on leaf undersides.",
            "neighbor_plot_risk": "High. Sorghum, pearl millet, and maize plots nearby act as mutual pest reservoirs.",
            "progression_timeline": [
                {
                    "phase": "Days 1\u20133 (Pin Hole Leaf Scrapes)",
                    "symptoms": "Larvae hatch from flat scale-like egg masses and feed inside whorl, creating shot-hole punctures.",
                    "risk_level": "Moderate",
                    "loss_trajectory": "5% foliar injury"
                },
                {
                    "phase": "Days 4\u20138 (Stem Boring & Dead Heart)",
                    "symptoms": "Larvae bore into stem base; growing tip severed, causing central shoot to dry up into a dead heart.",
                    "risk_level": "High",
                    "loss_trajectory": "25%\u201340% seedling death"
                },
                {
                    "phase": "Days 9\u201318 (Extensive Internal Stem Tunneling)",
                    "symptoms": "Larvae tunnel up and down inside the stalk; stem becomes hollow with exit holes plugged with frass.",
                    "risk_level": "Critical",
                    "loss_trajectory": "45%\u201360% translocation blocked"
                },
                {
                    "phase": "Post Day 18 (Stem Snapping & Stunting)",
                    "symptoms": "Stalks break over in light winds; cobs remain stunted and poorly filled.",
                    "risk_level": "Critical",
                    "loss_trajectory": "65% harvestable yield lost"
                }
            ]
        },
        "cure_roadmap": [
            {
                "day": "Day 1 (Dead Heart Removal & Trapping)",
                "action": "Pull out dead heart seedlings and destroy larvae inside. Install light traps and Chilo pheromone traps @ 10/acre."
            },
            {
                "day": "Day 2 (Granular / Liquid Whorl Treatment)",
                "action": "Apply Fipronil 0.3% GR @ 7.5 kg/acre into whorls or spray Chlorantraniliprole 18.5% SC @ 0.3 ml/L."
            },
            {
                "day": "Day 5 (Trichogramma Parasitoid Release)",
                "action": "Release Trichogramma chilonis egg parasitoid @ 100,000/ha weekly."
            },
            {
                "day": "Day 10 (Stalk Lodging Monitoring)",
                "action": "Scout lower stem nodes for bore holes; ensure proper earthing up to support tunneled stalks."
            }
        ],
        "organic_control": [
            "Release Trichogramma chilonis @ 100,000/ha at 10-day intervals (3 times).",
            "Whorl application of neem cake powder mixed with sand (1:5).",
            "Spray Bacillus thuringiensis @ 2 kg/ha."
        ],
        "chemical_control": [
            "Fipronil 0.3% GR @ 7.5 kg/acre whorl application.",
            "Chlorantraniliprole 18.5% SC @ 0.3 ml/L (60 ml/acre).",
            "Indoxacarb 14.5% SC @ 0.5 ml/L."
        ],
        "nutritional_recovery": "Earthing up soil around stalk base accompanied by Potassium application (15 kg/acre) to brace tunneled stems against lodging.",
        "preventive_measures": "Deep summer plowing to destroy hibernating larvae in maize stubble; intercrop with cowpea or lablab; remove dead hearts early."
    },
    "Flag Smut": {
        "crop": "Wheat",
        "category": "Fungal Disease",
        "pathogen": "Urocystis agropyri (Urocystis tritici)",
        "severity": "High",
        "display_name": "Flag Smut of Wheat",
        "symptoms": "Long, narrow lead-gray to black stripes on leaf blades, sheaths, and culms; stripes rupture exposing black sooty teliospore powder; twisted, distorted leaves; sterile spikes.",
        "environmental_factors": "Dry, warm soil conditions (15\u201320\u00b0C) during germination and early seedling growth.",
        "immediate_action": "Rogue out infected stunted plants carefully in plastic bags and incinerate to prevent soil spore contamination.",
        "future_prediction": {
            "loss_percentage": 55,
            "yield_loss_risk": "40%\u201360% crop loss in affected patches; infected tillers rarely produce viable heads, causing sterile chaff.",
            "economic_impact": "Wheat seed lots become contaminated with persistent teliospores, rendering grain unusable for certified seed multiplication.",
            "contagion_radius": "Moderate. Teliospores are soil-borne and seed-borne; they survive in soil for 3\u20135 years without host.",
            "neighbor_plot_risk": "Moderate. Farm machinery transferring contaminated soil can infect adjacent plots.",
            "progression_timeline": [
                {
                    "phase": "Days 1\u20137 (Subterranean Infection)",
                    "symptoms": "Teliospores germinate in soil and penetrate wheat coleoptile before seedling emergence.",
                    "risk_level": "Mild",
                    "loss_trajectory": "Invisible internal systemic growth"
                },
                {
                    "phase": "Days 8\u201320 (Leaf Striping & Twisting)",
                    "symptoms": "Silver-gray longitudinal stripes develop between leaf veins; leaves twist and curl abnormally.",
                    "risk_level": "Moderate",
                    "loss_trajectory": "20% vegetative stunting"
                },
                {
                    "phase": "Days 21\u201335 (Sooty Rupture)",
                    "symptoms": "Stripes rupture into black sooty powdery masses; flag leaves shred longitudinally into ribbons.",
                    "risk_level": "High",
                    "loss_trajectory": "40%\u201350% ear loss"
                },
                {
                    "phase": "Post Day 35 (Spike Sterility & Soil Seeding)",
                    "symptoms": "Heads fail to emerge or are distorted without grain; black teliospores shed into topsoil.",
                    "risk_level": "Critical",
                    "loss_trajectory": "Permanent soil contamination for 4 years"
                }
            ]
        },
        "cure_roadmap": [
            {
                "day": "Day 1 (Sanitation Rogueing)",
                "action": "Carefully uproot all striped plants and seal in bags; burn outside field perimeter."
            },
            {
                "day": "Day 2 (Foliar Fungicide Barrier)",
                "action": "Spray Tebuconazole 25.9% EC @ 1 ml/L or Propiconazole 25% EC @ 1 ml/L to protect healthy tillers."
            },
            {
                "day": "Day 5 (Nutritional Reinforcement)",
                "action": "Apply balanced micronutrient foliar spray (Zinc + Manganese + Iron chelate) @ 2 g/L."
            },
            {
                "day": "Day 10 (Future Planning Protocol)",
                "action": "Flag field for strict 3-year non-host crop rotation (chickpea/mustard); prohibit seed retention for sowing."
            }
        ],
        "organic_control": [
            "Seed treatment with Trichoderma viride @ 8 g/kg seed.",
            "Foliar spray with cow urine extract (10%) + neem cake soil amendment.",
            "Crop rotation with legumes (gram/pea) for 3 years."
        ],
        "chemical_control": [
            "Seed dressing with Carboxin 37.5% + Thiram 37.5% DS @ 2.5 g/kg seed.",
            "Tebuconazole 25.9% EC @ 1 ml/L foliar spray.",
            "Propiconazole 25% EC @ 1 ml/L."
        ],
        "nutritional_recovery": "Deep soil irrigation; avoid dry sowing. Apply Zinc Sulphate 21% @ 10 kg/acre to encourage tillering.",
        "preventive_measures": "Mandatory seed treatment with Carboxin or Tebuconazole; shallow sowing in moist soil; avoid sowing during warm October dry periods."
    },
    "Healthy Wheat": {
        "crop": "Wheat",
        "category": "Healthy Crop",
        "pathogen": "None (Optimum Crop Health)",
        "severity": "Healthy",
        "display_name": "Healthy Wheat",
        "symptoms": "Lush, upright uniform green canopy, spotless broad flag leaves, strong tillering count (4\u20136 tillers/plant), sturdy hollow stems.",
        "environmental_factors": "Cool sunny weather (15\u201322\u00b0C), adequate soil moisture at critical growth stages (CRI, boot, flowering).",
        "immediate_action": "Maintain scheduled irrigation (especially at Crown Root Initiation and Flowering stages) and monitor for aphid influx.",
        "future_prediction": {
            "loss_percentage": 0,
            "yield_loss_risk": "Optimal harvest potential (95%\u2013100%); expected yield of 4.5\u20135.5 tons/hectare under standard agronomic practices.",
            "economic_impact": "High test weight grain (hectoliter weight >78 kg/hl); maximum MSP / commercial procurement price.",
            "contagion_radius": "None. Robust health status.",
            "neighbor_plot_risk": "None.",
            "progression_timeline": [
                {
                    "phase": "Crown Root & Tillering Stage",
                    "symptoms": "Vigorous secondary root system anchors plant; productive tillers develop symmetrically.",
                    "risk_level": "None",
                    "loss_trajectory": "0% (Optimum tiller density)"
                },
                {
                    "phase": "Jointing to Booting Stage",
                    "symptoms": "Stems elongate with sturdy nodes; flag leaf emerges spotless and wide, capturing maximum sunlight.",
                    "risk_level": "None",
                    "loss_trajectory": "0% (Full spike length formed)"
                },
                {
                    "phase": "Anthesis & Milk Stage",
                    "symptoms": "Spikelets flower uniformly; grain endosperm fills with starch without thermal or drought shock.",
                    "risk_level": "None",
                    "loss_trajectory": "0% (Max kernel count per spike)"
                },
                {
                    "phase": "Dough & Golden Harvest",
                    "symptoms": "Uniform golden senescence; awns dry naturally; heads bend gently under heavy grain weight.",
                    "risk_level": "None",
                    "loss_trajectory": "0% (Peak harvest output)"
                }
            ]
        },
        "cure_roadmap": [
            {
                "day": "Day 1 (Irrigation Scheduling)",
                "action": "Schedule critical irrigation aligned with phenological milestones (CRI at 21 days, Boot stage at 75 days)."
            },
            {
                "day": "Day 3 (Top Dressing Audit)",
                "action": "Apply split dose of Nitrogen (Urea @ 25 kg/acre) before second irrigation; avoid late nitrogen after heading."
            },
            {
                "day": "Day 7 (Prophylactic Leaf Guard)",
                "action": "Inspect flag leaves for rust spores blown in by westerly winds; maintain clean border bunds."
            },
            {
                "day": "Day 14 (Grain Filling Support)",
                "action": "Foliar spray 13:0:45 (Potassium Nitrate) @ 10 g/L at early grain fill to guard against terminal heat stress."
            }
        ],
        "organic_control": [
            "Foliar spray seaweed extract bio-stimulant @ 2 ml/L.",
            "Apply vermicompost @ 2 tons/acre during land preparation.",
            "Release Chrysoperla predators if stray aphids are observed."
        ],
        "chemical_control": [
            "No chemical intervention required.",
            "Prophylactic seed treatment with Carboxin was effective."
        ],
        "nutritional_recovery": "Apply balanced N:P:K:S (120:60:40:20 kg/ha); ensure Sulphur application for high grain protein content.",
        "preventive_measures": "Timely sowing between Nov 5\u201325; maintain certified seed purity; ensure laser land leveling for uniform irrigation."
    },
    "Healthy cotton": {
        "crop": "Cotton",
        "category": "Healthy Crop",
        "pathogen": "None (Optimum Crop Health)",
        "severity": "Healthy",
        "display_name": "Healthy Cotton",
        "symptoms": "Lush dark green palmate leaves, vigorous sympodial fruiting branch development, intact flower squares, no boll shedding, clean bolls.",
        "environmental_factors": "Warm temperatures (24\u201332\u00b0C), full sun exposure, well-drained deep black cotton soil (Vertisol), balanced soil moisture.",
        "immediate_action": "Maintain balanced nutrition, timely boll scouting, and nipping of terminal shoots at 75\u201380 days to direct energy into bolls.",
        "future_prediction": {
            "loss_percentage": 0,
            "yield_loss_risk": "Full commercial yield potential (95%\u2013100%); expected harvest of 2.0\u20132.5 tons seed cotton per hectare.",
            "economic_impact": "High micronaire value, premium staple length (>29 mm), and high ginning outturn (GOT >36%).",
            "contagion_radius": "None. Excellent crop vigor.",
            "neighbor_plot_risk": "None.",
            "progression_timeline": [
                {
                    "phase": "Squaring Stage (45\u201360 Days)",
                    "symptoms": "Pyramidal floral buds (squares) develop densely on sympodial nodes with zero flaring or shedding.",
                    "risk_level": "None",
                    "loss_trajectory": "0% (Max square retention)"
                },
                {
                    "phase": "Peak Flowering & Boll Set (60\u201390 Days)",
                    "symptoms": "Creamy white flowers bloom and turn pink post-pollination; young green bolls swell vigorously.",
                    "risk_level": "None",
                    "loss_trajectory": "0% (High boll setting ratio)"
                },
                {
                    "phase": "Boll Maturation (90\u2013120 Days)",
                    "symptoms": "Bolls reach full size (4\u20135 locules per boll); carpel walls firm and intact with thick wax cuticle.",
                    "risk_level": "None",
                    "loss_trajectory": "0% (Full fiber elongation)"
                },
                {
                    "phase": "Boll Bursting & Fluffing (120\u2013150 Days)",
                    "symptoms": "Bolls burst cleanly into snowy white, fluffy locules; clean lint ready for picking without trash.",
                    "risk_level": "None",
                    "loss_trajectory": "0% (Maximum lint harvest)"
                }
            ]
        },
        "cure_roadmap": [
            {
                "day": "Day 1 (Canopy Architecture)",
                "action": "Nip terminal main stem buds at 80\u201390 days (topping) to curb vegetative apical dominance and direct nutrients to bolls."
            },
            {
                "day": "Day 3 (Boll Retention Spray)",
                "action": "Foliar spray Planofix (Alpha Naphthyl Acetic Acid) @ 0.25 ml/L to prevent square shedding."
            },
            {
                "day": "Day 7 (Boll Fill Nutrition)",
                "action": "Foliar spray Potassium Nitrate (13:0:45) @ 10 g/L + Magnesium Sulphate @ 5 g/L to prevent reddening of leaves."
            },
            {
                "day": "Day 14 (IPM Pheromone Monitoring)",
                "action": "Maintain Helilure and Pectinolure pheromone traps to ensure early detection of any incoming bollworm flights."
            }
        ],
        "organic_control": [
            "Foliar spray Panchagavya 3% or Vermiwash 10% during peak flowering.",
            "Conserve spiders, chrysoperla, and mirid bugs in the field.",
            "Install yellow and blue sticky traps for sucking pest monitoring."
        ],
        "chemical_control": [
            "No chemical pesticides needed.",
            "Foliar micronutrient spray (Mg, Zn, B) as per agronomic recommendation."
        ],
        "nutritional_recovery": "Apply split Potassium @ 20 kg/acre and Magnesium Sulphate @ 10 kg/acre to prevent late-season leaf reddening.",
        "preventive_measures": "Maintain drip fertigation; keep fields clean of malvaceous weeds (Abutilon indicum); pick cotton dry in morning."
    },
    "Mosaic sugarcane": {
        "crop": "Sugarcane",
        "category": "Viral Disease",
        "pathogen": "Sugarcane Mosaic Virus (SCMV) / Potyvirus",
        "severity": "High",
        "display_name": "Sugarcane Mosaic Disease",
        "symptoms": "Contrasting light green or yellowish chlorotic patches, blotches, or streaks scattered across dark green leaf blades (mosaic pattern); shortened internodes; stunted cane clumps with reduced girth.",
        "environmental_factors": "Aphid vector (Rhopalosiphum maidis / Melanaphis sacchari) presence, warm weather (26\u201332\u00b0C), planting infected seed cane setts.",
        "immediate_action": "Rogue out infected cane stools immediately; spray systemic insecticide to suppress aphid vectors.",
        "future_prediction": {
            "loss_percentage": 50,
            "yield_loss_risk": "30%\u201350% cane tonnage loss; infected stalks remain thin with short internodes and low cane weight.",
            "economic_impact": "Commercial cane sugar (CCS%) drops by 1.5\u20132.5 units; severe juice purity reduction leading to sugar mill docking.",
            "contagion_radius": "High. Winged aphids transmit virus non-persistently within minutes, spreading across contiguous cane fields.",
            "neighbor_plot_risk": "High. Surrounding ratoon and plant cane fields will catch infection via aphid dispersal.",
            "progression_timeline": [
                {
                    "phase": "Days 1\u20135 (Mosaic Pattern Inception)",
                    "symptoms": "Irregular alternating dark and pale green islands appear on young expanding leaves.",
                    "risk_level": "Moderate",
                    "loss_trajectory": "10% chlorophyll efficiency loss"
                },
                {
                    "phase": "Days 6\u201315 (Foliar Mottling & Stunting)",
                    "symptoms": "Mosaic spreads across all leaves; chlorotic stripes coalesce; leaf sheath becomes blotchy.",
                    "risk_level": "High",
                    "loss_trajectory": "25%\u201335% internode elongation reduction"
                },
                {
                    "phase": "Days 16\u201330 (Spindle Necrosis & Thinning)",
                    "symptoms": "Internodes become stunted, narrow, and thin; vascular bundles show red discoloration; sucrose synthesis stalls.",
                    "risk_level": "Critical",
                    "loss_trajectory": "40%\u201350% cane biomass drop"
                },
                {
                    "phase": "Post Day 30 (Ratoon Decline)",
                    "symptoms": "Ratoon crops emerge stunted with thin grassy tillers, leading to complete ratoon failure.",
                    "risk_level": "Critical",
                    "loss_trajectory": "Severe multi-year ratoon loss"
                }
            ]
        },
        "cure_roadmap": [
            {
                "day": "Day 1 (Sanitation Rogueing)",
                "action": "Uproot infected clumps including root system; burn outside the field. Avoid using setts from diseased fields."
            },
            {
                "day": "Day 2 (Aphid Vector Control)",
                "action": "Foliar spray Thiamethoxam 25% WG @ 0.3 g/L or Imidacloprid 17.8% SL @ 0.5 ml/L to kill aphid carriers."
            },
            {
                "day": "Day 5 (Nutritional Resistance Boost)",
                "action": "Foliar spray Zinc Sulphate 0.5% + Ferrous Sulphate 0.5% + Urea 1% to stimulate chlorophyll synthesis."
            },
            {
                "day": "Day 10 (Seed Nursery Sanitation)",
                "action": "Establish hot water treated (50\u00b0C for 2 hours) disease-free seed nursery for next season's planting."
            }
        ],
        "organic_control": [
            "Rogueing and burning diseased stools.",
            "Foliar spray Neem oil (10000 ppm) @ 3 ml/L against aphid vectors.",
            "Conserve ladybird beetles and syrphid flies."
        ],
        "chemical_control": [
            "Thiamethoxam 25% WG @ 0.3 g/L (50 g/acre).",
            "Imidacloprid 17.8% SL @ 0.5 ml/L.",
            "Dimethoate 30% EC @ 1.5 ml/L."
        ],
        "nutritional_recovery": "Foliar spray Micronutrient mixture (Fe, Zn, Mn) @ 2.5 g/L to alleviate viral chlorosis.",
        "preventive_measures": "Moist Hot Air Treatment (MHAT) of seed cane setts at 54\u00b0C for 2.5 hours; cultivate mosaic-resistant varieties (e.g., Co 0238, Co 86032); avoid intercropping with maize or sorghum."
    },
    "RedRot sugarcane": {
        "crop": "Sugarcane",
        "category": "Fungal Disease",
        "pathogen": "Colletotrichum falcatum (Glomerella tucumanensis)",
        "severity": "Critical",
        "display_name": "Sugarcane Red Rot ('Cancer of Sugarcane')",
        "symptoms": "Yellowing and withering of third and fourth leaves from top, drying downward; internal stalk tissue turns blood-red with distinct transverse white patches/bands when split open; sour alcoholic fermentation smell.",
        "environmental_factors": "Waterlogged fields, ill-drained alkaline soils, temperatures 28\u201332\u00b0C, relative humidity >90%, continuous monoculture.",
        "immediate_action": "Immediately rogue out diseased clumps with roots; stop water movement from infected fields; drench base with systemic fungicide.",
        "future_prediction": {
            "loss_percentage": 90,
            "yield_loss_risk": "Catastrophic 80%\u2013100% loss in affected stools; cane stalks dry out, become hollow, light, and snap easily.",
            "economic_impact": "Total collapse of sucrose; cane juice ferments into alcohol and acid with zero sugar recovery; sugar mills reject entire truckloads.",
            "contagion_radius": "Extremely High (Water-borne & Sett-borne). Conidia wash down furrows and enter through root eyes, nodes, and borer wounds.",
            "neighbor_plot_risk": "Severe. Irrigation drainage overflowing into adjacent cane plots will infect entire command areas.",
            "progression_timeline": [
                {
                    "phase": "Days 1\u20134 (Midrib Spores & Foliar Withering)",
                    "symptoms": "Blood-red linear lesions on midrib with dark borders; 3rd/4th leaf tips begin to yellow and wither.",
                    "risk_level": "Moderate",
                    "loss_trajectory": "10% internal vascular colonisation"
                },
                {
                    "phase": "Days 5\u201312 (Pith Reddening & Transverse White Patches)",
                    "symptoms": "Internal pith turns bright blood-red; diagnostic transverse white chalky bands form across pith; alcoholic odor.",
                    "risk_level": "Critical",
                    "loss_trajectory": "40%\u201365% sucrose conversion to glucose"
                },
                {
                    "phase": "Days 13\u201325 (Canopy Collapse & Shriveling)",
                    "symptoms": "Entire crown of leaves dries to pale straw; stalks shrink longitudinally, rind wrinkles, and cane becomes hollow.",
                    "risk_level": "Catastrophic",
                    "loss_trajectory": "80%\u201390% cane tonnage lost"
                },
                {
                    "phase": "Post Day 25 (Hollow Cane & Inoculum Seeding)",
                    "symptoms": "Stalk cavity fills with dirty gray fungal mycelium and acervuli; soil and ratoon stools permanently contaminated.",
                    "risk_level": "Catastrophic",
                    "loss_trajectory": "Total plot destruction & no ratoon viability"
                }
            ]
        },
        "cure_roadmap": [
            {
                "day": "Day 1 (Sanitation & Deep Rogueing)",
                "action": "Uproot diseased clumps including underground root mass; burn outside the field. Cut off furrow water flowing through infected patch."
            },
            {
                "day": "Day 2 (Root Zone Fungicide Drench)",
                "action": "Drench base of surrounding healthy stools with Carbendazim 50% WP @ 2 g/L or Thiophanate Methyl 70% WP @ 1.5 g/L."
            },
            {
                "day": "Day 5 (Bio-Agent Furrow Inoculation)",
                "action": "Incorporate Trichoderma harzianum (2.5 kg/acre in 100 kg compost) into soil to suppress soil-borne inoculum."
            },
            {
                "day": "Day 10 (Drainage & Drainage Sump)",
                "action": "Excavate drainage channels to prevent water stagnation in field."
            }
        ],
        "organic_control": [
            "Soil application of Trichoderma viride / T. harzianum @ 2.5 kg/acre with enriched FYM.",
            "Sett treatment with bio-control Pseudomonas fluorescens @ 10 g/L.",
            "Crop rotation with green manure crops (Sunn hemp / Dhaincha)."
        ],
        "chemical_control": [
            "Carbendazim 50% WP @ 2 g/L soil drench.",
            "Thiophanate Methyl 70% WP @ 1.5 g/L.",
            "Sett dip treatment in Carbendazim 0.1% solution at 50\u00b0C for 15 minutes."
        ],
        "nutritional_recovery": "Apply extra Potassium (MOP @ 25 kg/acre) and Silicon to thicken rind and vascular walls.",
        "preventive_measures": "Strictly avoid using setts from red-rot infected zones; Moist Hot Air Treatment (MHAT) at 54\u00b0C for 2.5 hrs; cultivate red-rot resistant varieties (e.g., Co 86032, Co 0238 where resistant); do not take ratoon of infected crop."
    },
    "RedRust sugarcane": {
        "crop": "Sugarcane",
        "category": "Fungal Disease",
        "pathogen": "Puccinia kuehnii (Orange Rust) / Puccinia melanocephala (Brown Rust)",
        "severity": "Moderate",
        "display_name": "Sugarcane Rust (Orange / Brown Rust)",
        "symptoms": "Elongated, narrow chlorotic flecks on both surfaces of leaves turning into orange-brown or reddish-brown powdery pustules (uredinia); pustules rupture epidermis; leaves dry and scorch prematurely.",
        "environmental_factors": "Cool, humid weather (18\u201325\u00b0C), high relative humidity (>90%), long dew periods, dense leafy canopy.",
        "immediate_action": "Spray systemic triazole fungicide (Propiconazole/Tebuconazole); avoid overhead sprinkler irrigation.",
        "future_prediction": {
            "loss_percentage": 45,
            "yield_loss_risk": "25%\u201345% cane weight loss; premature death of photosynthetically active green leaves stunts stalk elongation.",
            "economic_impact": "Lower cane girth and reduced juice sucrose percentage (1.0\u20131.5% loss in CCS).",
            "contagion_radius": "Extremely High. Windborne urediniospores travel over dozens of kilometers on breeze currents.",
            "neighbor_plot_risk": "High. Adjacent susceptible cane varieties downwind will experience rapid rust pustule eruption.",
            "progression_timeline": [
                {
                    "phase": "Days 1\u20133 (Flecking Stage)",
                    "symptoms": "Minute yellowish flecks appear on leaf blades, visible when held to light.",
                    "risk_level": "Mild",
                    "loss_trajectory": "5% leaf area affected"
                },
                {
                    "phase": "Days 4\u20137 (Pustule Eruption)",
                    "symptoms": "Orange-brown elongated pustules burst along veins, shedding powdery rust spores on contact.",
                    "risk_level": "Moderate",
                    "loss_trajectory": "15%\u201325% photosynthetic decline"
                },
                {
                    "phase": "Days 8\u201316 (Leaf Blighting & Scorch)",
                    "symptoms": "Pustules coalesce into large reddish-brown necrotic stripes; entire leaves dry up and take on a burnt appearance.",
                    "risk_level": "High",
                    "loss_trajectory": "30%\u201345% functional leaf loss"
                },
                {
                    "phase": "Post Day 16 (Internode Growth Retardation)",
                    "symptoms": "Stalk elongation slows dramatically; internodes remain short, reducing total cane biomass.",
                    "risk_level": "Moderate",
                    "loss_trajectory": "Permanent cane tonnage drop"
                }
            ]
        },
        "cure_roadmap": [
            {
                "day": "Day 1 (Canopy Scouting)",
                "action": "Inspect 4th to 6th leaves from top across field. Calculate percentage of leaves bearing active orange/brown pustules."
            },
            {
                "day": "Day 2 (Fungicide Intervention)",
                "action": "Foliar spray Propiconazole 25% EC @ 1 ml/L (200 ml/acre in 200 L water) or Azoxystrobin + Difenoconazole @ 1 ml/L."
            },
            {
                "day": "Day 5 (Nutritional Osmoprotectant)",
                "action": "Foliar spray Potash (0:0:50) @ 5 g/L to stimulate leaf recovery and boost stomatal conductance."
            },
            {
                "day": "Day 10 (Follow-up Check)",
                "action": "Inspect new emerging leaves to confirm freedom from pustules; repeat spray with Mancozeb @ 2 g/L if weather stays cool and misty."
            }
        ],
        "organic_control": [
            "Foliar spray with Bacillus subtilis @ 5 g/L.",
            "Wettable sulfur 80% WDG @ 2.5 g/L.",
            "Apply neem oil (10000 ppm) @ 3 ml/L."
        ],
        "chemical_control": [
            "Propiconazole 25% EC @ 1 ml/L (200 ml/acre).",
            "Tebuconazole 25.9% EC @ 1 ml/L.",
            "Mancozeb 75% WP @ 2 g/L (protective barrier)."
        ],
        "nutritional_recovery": "Apply split Potassium @ 20 kg/acre and spray Silicon foliar fertilizer @ 2 ml/L.",
        "preventive_measures": "Cultivate rust-resistant sugarcane varieties; maintain wider row spacing (120\u2013150 cm) for air drainage; avoid excessive late nitrogen."
    },
    "Sugarcane Healthy": {
        "crop": "Sugarcane",
        "category": "Healthy Crop",
        "pathogen": "None (Optimum Crop Health)",
        "severity": "Healthy",
        "display_name": "Healthy Sugarcane",
        "symptoms": "Broad, vibrant dark-green spotless leaves with upright arching architecture, thick solid stalks with uniform internode length, robust root stool anchors, and zero rotting or wilting.",
        "environmental_factors": "Ample sunlight (8\u201310 hrs/day), tropical temperatures (28\u201334\u00b0C), fertile well-drained loamy soil, regular scheduled irrigation.",
        "immediate_action": "Maintain scheduled irrigation, balanced earthing-up, and prophylactic borer monitoring.",
        "future_prediction": {
            "loss_percentage": 0,
            "yield_loss_risk": "Optimal harvest potential (95%\u2013100%); expected cane tonnage of 100\u2013120 tons/hectare with high commercial sugar recovery (>11.5% CCS).",
            "economic_impact": "Maximum mill recovery price with quality incentives for high sucrose purity.",
            "contagion_radius": "None. Crop possesses robust physical and physiological defense barriers.",
            "neighbor_plot_risk": "None.",
            "progression_timeline": [
                {
                    "phase": "Germination & Tillering (0\u2013120 Days)",
                    "symptoms": "Uniform sett germination; dense tillering producing 8\u201310 vigorous shoots per stool.",
                    "risk_level": "None",
                    "loss_trajectory": "0% (Optimum shoot density)"
                },
                {
                    "phase": "Grand Growth Stage (120\u2013270 Days)",
                    "symptoms": "Rapid stalk elongation; thick, sturdy internodes form with rich chlorophyll in canopy.",
                    "risk_level": "None",
                    "loss_trajectory": "0% (Max biomass accumulation)"
                },
                {
                    "phase": "Ripening & Maturation (270\u2013360 Days)",
                    "symptoms": "Vegetative growth slows naturally; sucrose translocates and concentrates in bottom and middle internodes.",
                    "risk_level": "None",
                    "loss_trajectory": "0% (Peak brix >20%)"
                },
                {
                    "phase": "Harvest Readiness (360+ Days)",
                    "symptoms": "Mature sound canes with tight wax rind; juice purity exceeding 85% ready for crushing.",
                    "risk_level": "None",
                    "loss_trajectory": "0% (Peak sugar recovery)"
                }
            ]
        },
        "cure_roadmap": [
            {
                "day": "Day 1 (Canopy Management & Earthing-Up)",
                "action": "Perform second earthing-up at 120 days to support stalks against lodging and bury root zone."
            },
            {
                "day": "Day 3 (Trash Mulching)",
                "action": "Mulch alternate furrows with dry sugarcane trash (3 tons/acre) to conserve soil moisture and suppress weeds."
            },
            {
                "day": "Day 7 (Nutrition & Potash Application)",
                "action": "Apply final split of Nitrogen and Potassium (50 kg Urea + 30 kg MOP per acre) prior to grand growth."
            },
            {
                "day": "Day 14 (Pest Scouting)",
                "action": "Install pheromone traps for top borer and early shoot borer; check stalk base for scale or mealybug."
            }
        ],
        "organic_control": [
            "Incorporate green manure (Sunn hemp) between rows at 45 days.",
            "Apply Gluconacetobacter diazotrophicus (nitrogen fixer) and PSB biofertilizer.",
            "Release Trichogramma chilonis @ 50,000/ha for borer prevention."
        ],
        "chemical_control": [
            "No chemical intervention required.",
            "Prophylactic sett treatment was successfully protective."
        ],
        "nutritional_recovery": "Maintain balanced N:P:K (250:100:125 kg/ha) schedule with micronutrient supplements (Zinc, Iron).",
        "preventive_measures": "Wide row planting (120\u2013150 cm); trash mulching; propping of canes in August\u2013September to prevent lodging in monsoon."
    },
    "Yellow Rust Sugarcane": {
        "crop": "Sugarcane",
        "category": "Fungal Disease",
        "pathogen": "Puccinia striiformis var. sacchari / Puccinia kuehnii",
        "severity": "Moderate",
        "display_name": "Yellow Rust of Sugarcane",
        "symptoms": "Bright yellow to golden-orange powdery pustules forming linear stripes or streaks along leaf veins; leaves dry prematurely from tips; premature drying of lower canopy.",
        "environmental_factors": "Cool sub-tropical winters (14\u201320\u00b0C), heavy morning fog and dew, relative humidity >85%, cloudy overcast skies.",
        "immediate_action": "Spray triazole fungicide (Propiconazole/Tebuconazole); remove severely rusted lower dry leaves (detrashing).",
        "future_prediction": {
            "loss_percentage": 40,
            "yield_loss_risk": "20%\u201340% loss in stalk tonnage; reduced green leaf area index slows sucrose synthesis during winter months.",
            "economic_impact": "Lower cane weight and reduced juice purity; sugar crystallization efficiency impaired.",
            "contagion_radius": "High. Windborne urediniospores travel across long distances during cool windy winter fronts.",
            "neighbor_plot_risk": "High in cool, humid riverbed agricultural zones.",
            "progression_timeline": [
                {
                    "phase": "Days 1\u20133 (Yellow Stripe Inception)",
                    "symptoms": "Yellowish, chlorotic micro-stripes develop along parallel leaf veins on middle leaves.",
                    "risk_level": "Mild",
                    "loss_trajectory": "5% leaf area affected"
                },
                {
                    "phase": "Days 4\u20137 (Pustule Bursting & Powdery Lines)",
                    "symptoms": "Golden-yellow pustules burst open along veins, shedding yellow dust on clothing and hands.",
                    "risk_level": "Moderate",
                    "loss_trajectory": "15%\u201325% photosynthetic decline"
                },
                {
                    "phase": "Days 8\u201315 (Foliar Necrosis & Leaf Tip Drying)",
                    "symptoms": "Stripes coalesce into wide brown necrotic bands; leaf tips curl, desiccate, and die prematurely.",
                    "risk_level": "High",
                    "loss_trajectory": "25%\u201340% green canopy reduction"
                },
                {
                    "phase": "Post Day 15 (Internode Stunting)",
                    "symptoms": "Cane internode elongation stalls during winter; stalks develop thinner diameter.",
                    "risk_level": "Moderate",
                    "loss_trajectory": "Reduced total harvest weight"
                }
            ]
        },
        "cure_roadmap": [
            {
                "day": "Day 1 (Canopy De-trashing)",
                "action": "Remove and compost severely rusted lower dry leaves (de-trashing) to improve air movement through canopy."
            },
            {
                "day": "Day 2 (Fungicide Intervention)",
                "action": "Foliar spray Propiconazole 25% EC @ 1 ml/L (200 ml/acre) or Tebuconazole 25.9% EC @ 1 ml/L."
            },
            {
                "day": "Day 5 (Foliar Potash Resilience)",
                "action": "Apply Potassium Nitrate (13:0:45) @ 10 g/L foliar spray to provide osmotic resilience during winter."
            },
            {
                "day": "Day 10 (Follow-up Check)",
                "action": "Inspect newly emerged spindle leaves to verify rust-free emergence."
            }
        ],
        "organic_control": [
            "Foliar spray with Bacillus subtilis @ 5 g/L.",
            "Wettable sulfur @ 2.5 g/L.",
            "Spray fermented cow urine extract (10%)."
        ],
        "chemical_control": [
            "Propiconazole 25% EC @ 1 ml/L (200 ml/acre).",
            "Tebuconazole 25.9% EC @ 1 ml/L.",
            "Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1 ml/L."
        ],
        "nutritional_recovery": "Foliar spray Potash @ 5 g/L and Zinc Chelate @ 1.5 g/L to accelerate winter photosynthetic recovery.",
        "preventive_measures": "Cultivate rust-tolerant sugarcane clones; practice wide-row planting; avoid excessive late nitrogen application."
    }
}


def get_agronomic_analysis(class_name: str) -> dict:
    """Retrieve detailed agronomic profile and future prognosis for a predicted class."""
    if class_name in AGRONOMIC_DB:
        return AGRONOMIC_DB[class_name]
    
    # Normalized search fallback
    norm_key = class_name.lower().replace("_", " ").strip()
    for key, val in AGRONOMIC_DB.items():
        if key.lower().replace("_", " ").strip() == norm_key:
            return val
            
    # Generic fallback if unknown
    is_healthy = "healthy" in class_name.lower()
    crop_guess = "General Crop"
    for crop in ["Cotton", "Wheat", "Rice", "Sugarcane", "Maize"]:
        if crop.lower() in class_name.lower():
            crop_guess = crop
            break
            
    return {
        "crop": crop_guess,
        "category": "Healthy Crop" if is_healthy else "Crop Disease/Pest",
        "pathogen": "N/A" if is_healthy else f"Pathogen/Pest affecting {class_name}",
        "severity": "Healthy" if is_healthy else "Moderate",
        "display_name": class_name,
        "symptoms": "Healthy vigorous growth." if is_healthy else f"Symptoms typical of {class_name} on {crop_guess}.",
        "environmental_factors": "Standard agricultural conditions.",
        "immediate_action": "Monitor crop health routinely." if is_healthy else "Isolate affected plants and scout nearby plots.",
        "future_prediction": {
            "loss_percentage": 0 if is_healthy else 50,
            "yield_loss_risk": "Optimal harvest expected." if is_healthy else "30%–50% yield loss if untreated.",
            "economic_impact": "Nominal." if is_healthy else "Moderate price deduction at harvest.",
            "contagion_radius": "None" if is_healthy else "Local plot spread",
            "neighbor_plot_risk": "Low",
            "progression_timeline": [
                {"phase": "Early Phase", "symptoms": "Initial symptoms appear", "risk_level": "Mild", "loss_trajectory": "5% loss"},
                {"phase": "Advanced Phase", "symptoms": "Symptoms spread", "risk_level": "Moderate", "loss_trajectory": "25% loss"},
                {"phase": "Late Phase", "symptoms": "Severe necrosis", "risk_level": "High", "loss_trajectory": "50% loss"}
            ]
        },
        "cure_roadmap": [
            {"day": "Day 1", "action": "Field sanitation and removal of affected debris."},
            {"day": "Day 3", "action": "Targeted organic or chemical treatment."},
            {"day": "Day 7", "action": "Evaluation and nutrient support."}
        ],
        "organic_control": ["Neem-based formulation.", "Maintain organic matter."] if not is_healthy else ["Compost maintenance."],
        "chemical_control": ["Apply recommended systemic crop protection chemical."] if not is_healthy else ["None required."],
        "nutritional_recovery": "Foliar micronutrient spray (Zn, B, K) to stimulate vitality.",
        "preventive_measures": "Follow standard integrated pest and crop management practices."
    }
