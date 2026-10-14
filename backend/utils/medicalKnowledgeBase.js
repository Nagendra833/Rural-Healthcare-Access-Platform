/**
 * Comprehensive Medical Knowledge Base for Dr. Aarogya (Rural Health AI)
 * Covers over 35 common health conditions, rural epidemics, emergency triage,
 * safe OTC medicines, precise dosages, non-harmful home remedies, red flags,
 * and multi-lingual translations (English, Telugu, Hindi).
 */

const CONDITIONS = [
  // ─────────────────────────────────────────────────────────────
  // 1. FEVERS & SYSTEMIC INFECTIONS
  // ─────────────────────────────────────────────────────────────
  {
    id: 'viral_fever',
    category: 'Fevers & Infections',
    title: 'Acute Viral Fever / Seasonal Flu',
    keywords: [
      'fever', 'temperature', 'chills', 'body pain', 'body ache', 'shivering',
      'flu', 'viral', 'bukhar', 'badan dard', 'jwaram', 'olu noppi', 'kampe', 'angam noppi'
    ],
    overview: 'Sudden onset of elevated body temperature accompanied by generalized muscle aches, fatigue, and mild headache common during seasonal changes.',
    possibleConditions: ['Acute Seasonal Viral Fever', 'Influenza (Flu)', 'Early Dengue or Malaria (needs monitoring)'],
    medicines: [
      {
        name: 'Paracetamol (Acetaminophen) 500mg or 650mg',
        dosage: '1 tablet every 6–8 hours after food only when fever exceeds 100°F (37.8°C)',
        duration: '3–5 days',
        purpose: 'Reduces temperature and relieves generalized body aches',
        precautions: 'Do not exceed 3000mg in 24 hours. Safe for most individuals. Avoid alcohol; consult doctor if you have liver disease.',
      },
      {
        name: 'Oral Rehydration Salts (ORS) / Electrolyte Solution',
        dosage: '1 sachet mixed in 1 liter of boiled, cooled water; sip throughout the day',
        duration: 'Throughout fever duration',
        purpose: 'Maintains fluid balance, replaces essential electrolytes lost via sweating',
        precautions: 'Very safe for all age groups. Use prepared solution within 24 hours.',
      },
      {
        name: 'Cetirizine 10mg (if runny nose or sneezing present)',
        dosage: '1 tablet once daily at bedtime',
        duration: '3 days',
        purpose: 'Relieves accompanying nasal congestion, sneezing, and watery eyes',
        precautions: 'May cause mild drowsiness. Avoid driving or operating machinery.',
      },
    ],
    homeRemedies: [
      'Lukewarm water sponging on forehead, neck, and armpits if fever exceeds 101°F (do NOT use ice or cold water).',
      'Drink plenty of warm liquids: tender coconut water, kanji (rice gruel with salt), and ginger-tulsi decoction.',
      'Wear loose, breathable cotton clothes and rest in a well-ventilated room.',
    ],
    warningSigns: [
      'Fever continuing above 102°F for more than 3 consecutive days without improvement.',
      'Appearance of small red or purple skin rashes, bleeding from gums or nose.',
      'Severe intractable vomiting, inability to retain any liquids, or extreme lethargy.',
      'Confusion, severe persistent headache, or stiff neck.',
    ],
    testsAndReferrals: [
      'Complete Blood Count (CBC) with Platelet Count.',
      'Malarial Smear / Rapid Antigen Test (RDT) and Dengue NS1 antigen test if fever persists past day 2.',
      'Visit nearest Primary Health Centre (PHC) or consult village ASHA/ANM worker.',
    ],
    prevention: [
      'Avoid drinking unboiled water and protect against mosquito bites using nets or repellent.',
      'Maintain personal hand hygiene before eating and after using washrooms.',
    ],
  },

  {
    id: 'dengue_fever',
    category: 'Fevers & Infections',
    title: 'Suspected Dengue Fever',
    keywords: [
      'dengue', 'breakbone', 'pain behind eyes', 'retro-orbital', 'low platelet', 'platelets',
      'mosquito bite fever', 'severe body pain', 'joint pain fever'
    ],
    overview: 'High-grade fever accompanied by severe retro-orbital (behind the eyes) headache, intense musculoskeletal aches ("breakbone fever"), and profound weakness transmitted by Aedes mosquitoes.',
    possibleConditions: ['Dengue Virus Infection', 'Chikungunya Fever', 'Viral Hemorrhagic Fever'],
    medicines: [
      {
        name: 'Paracetamol 500mg or 650mg ONLY',
        dosage: '1 tablet every 6 hours after meals as needed for high fever (Max 3g/day)',
        duration: '5–7 days',
        purpose: 'Safe antipyretic to lower fever without increasing bleeding risk',
        precautions: 'CRITICAL WARNING: NEVER take Ibuprofen, Aspirin, Diclofenac, or Aceclofenac as they dramatically increase internal bleeding risk in dengue!',
      },
      {
        name: 'WHO-Formula Oral Rehydration Salts (ORS)',
        dosage: '2–3 liters of prepared solution consumed in small regular sips daily',
        duration: 'Throughout illness',
        purpose: 'Prevents vascular leakage, hemoconcentration, and hypovolemic shock',
        precautions: 'Extremely vital. Hydration is the single most important medical intervention for dengue.',
      },
    ],
    homeRemedies: [
      'Fresh papaya leaf extract (10–15ml twice daily) or Giloy/Amrutha juice to aid recovery.',
      'High fluid diet: tender coconut water, fresh pomegranate juice, lemon water with salt and honey.',
      'Strict bed rest without physical exertion.',
    ],
    warningSigns: [
      'Sudden abdominal pain or persistent vomiting (critical phase alert).',
      'Bleeding from gums, nose, blood in vomit or dark black tarry stools.',
      'Sudden drop in body temperature accompanied by cold clammy skin, restlessness, or low BP.',
      'Platelet count dropping below 50,000 /mcL.',
    ],
    testsAndReferrals: [
      'Dengue NS1 Antigen (Day 1–5) or Dengue IgM/IgG antibodies (after Day 5).',
      'Serial CBC with Hematocrit and Platelet count every 24–48 hours at PHC/CHC.',
    ],
    prevention: [
      'Eliminate open water stagnation in discarded tyres, coolers, and pots around the home.',
      'Apply mosquito repellent creams and wear full-sleeve clothing during daylight hours.',
    ],
  },

  {
    id: 'malaria',
    category: 'Fevers & Infections',
    title: 'Suspected Malaria',
    keywords: [
      'malaria', 'chills and fever', 'shivering cold', 'sweating fever', 'intermittent fever',
      'anopheles', 'sheethajwaram', 'thanda bukhar'
    ],
    overview: 'Cyclical episodes of intense shivering chills (cold stage), spiking high fever (hot stage), followed by profuse sweating and exhaustion, caused by Plasmodium parasite.',
    possibleConditions: ['Plasmodium vivax Malaria', 'Plasmodium falciparum Malaria', 'Typhoid / Enteric Fever'],
    medicines: [
      {
        name: 'Paracetamol 500mg',
        dosage: '1 tablet during fever peaks to provide symptomatic comfort',
        duration: '3–5 days',
        purpose: 'Lowers temperature spikes and eases shivering headache',
        precautions: 'Antipyretics only reduce temperature; they do NOT kill the malaria parasite. Confirmed anti-malarials must be obtained from PHC.',
      },
      {
        name: 'Prescription Anti-Malarial (Artemisinin-based / Chloroquine)',
        dosage: 'Exact government-supplied NVBDCP blister pack based on blood smear species test',
        duration: 'Complete full 3–14 day course strictly without skipping',
        purpose: 'Eradicates parasite from blood and liver stages',
        precautions: 'Free testing and full drug kits are available at every PHC and with village ASHA workers.',
      },
    ],
    homeRemedies: [
      'Cover with light warm blanket during cold/shivering phase; remove heavy blankets once fever spikes.',
      'Keep hydrated with light rice kanji, boiled water, and lemon juice.',
      'Rest completely in a well-ventilated mosquito-netted bed.',
    ],
    warningSigns: [
      'Extreme drowsiness, confusion, convulsions, or inability to sit up (Cerebral Malaria risk).',
      'Yellowing of eyes/skin (jaundice) or dark brownish urine.',
      'Persistent vomiting preventing oral medication intake.',
    ],
    testsAndReferrals: [
      'Blood peripheral smear examination for Malarial Parasite (MP) and Rapid Diagnostic Kit (RDK) at PHC.',
    ],
    prevention: [
      'Sleep under insecticide-treated bed nets (ITNs).',
      'Use neem oil or repellent creams, avoid evening outdoor exposure near breeding water.',
    ],
  },

  {
    id: 'typhoid',
    category: 'Fevers & Infections',
    title: 'Suspected Typhoid (Enteric Fever)',
    keywords: [
      'typhoid', 'step ladder fever', 'prolonged fever', 'fever with stomach pain',
      'enteric fever', 'continuous fever'
    ],
    overview: 'Gradually rising continuous high fever over several days, accompanied by headache, abdominal discomfort, coated white tongue, and marked loss of appetite.',
    possibleConditions: ['Typhoid / Paratyphoid Fever (Salmonella enterica)', 'Viral Hepatitis A/E', 'Urinary Tract Infection'],
    medicines: [
      {
        name: 'Paracetamol 500mg or 650mg',
        dosage: '1 tablet 3 times daily after food for fever spikes',
        duration: '5 days',
        purpose: 'Provides safe temperature control',
        precautions: 'Do not exceed recommended dose.',
      },
      {
        name: 'ORS & Hydration Supplements',
        dosage: '1.5 to 2 liters daily in divided sips',
        duration: 'Throughout recovery',
        purpose: 'Protects gut mucosal barrier and prevents dehydration',
        precautions: 'Ensure water used is thoroughly boiled for at least 5 minutes.',
      },
      {
        name: 'Prescription Antibiotic (e.g. Cefixime / Azithromycin)',
        dosage: 'Only as formally prescribed by PHC Medical Officer after Widal/Blood Culture confirmation',
        duration: 'Full 7–14 day course',
        purpose: 'Eliminates Salmonella bacterial infection',
        precautions: 'Never stop antibiotic early even if fever subsides, to prevent chronic carrier state.',
      },
    ],
    homeRemedies: [
      'Eat easily digestible, well-cooked bland foods: soft khichdi, boiled potatoes, steamed dahlia, clear soups.',
      'Avoid raw vegetables, unpeeled fruits, street food, and spicy/oily dishes.',
      'Drink strictly boiled and cooled water.',
    ],
    warningSigns: [
      'Severe sudden localized abdominal pain (intestinal perforation risk).',
      'Blood in stools or coffee-ground colored vomiting.',
      'Extreme delirium or inability to recognize family members.',
    ],
    testsAndReferrals: [
      'Widal Test (after Day 7 of fever) or Blood Culture / Typhidot test at CHC/PHC.',
    ],
    prevention: [
      'Strict hand hygiene with soap before cooking and eating.',
      'Typhoid conjugate vaccine (TCV) available at health centers.',
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 2. RESPIRATORY & THROAT CONDITIONS
  // ─────────────────────────────────────────────────────────────
  {
    id: 'common_cold',
    category: 'Respiratory',
    title: 'Common Cold, Runny Nose & Nasal Congestion',
    keywords: [
      'cold', 'runny nose', 'sneezing', 'blocked nose', 'nasal congestion', 'watery eyes',
      'jaldobbu', 'jala', 'cheemidha', 'sardi', 'zukam', 'chheenk'
    ],
    overview: 'Upper respiratory viral infection causing nasal mucosal inflammation, clear to cloudy nasal discharge, frequent sneezing, and scratchy throat.',
    possibleConditions: ['Acute Viral Rhinitis (Common Cold)', 'Allergic Rhinitis', 'Early Sinusitis'],
    medicines: [
      {
        name: 'Cetirizine 10mg or Levocetirizine 5mg',
        dosage: '1 tablet once daily at night before sleeping',
        duration: '3–5 days',
        purpose: 'Suppresses histamine release, halting runny nose and allergic sneezing',
        precautions: 'Safe OTC medication. May cause mild sedation; take at bedtime.',
      },
      {
        name: 'Normal Saline (0.9% NaCl) Nasal Drops / Spray',
        dosage: '2–3 drops in each nostril 3 to 4 times daily as needed',
        duration: '5–7 days',
        purpose: 'Safely liquifies thick mucus and decongests airways naturally without rebound swelling',
        precautions: 'Completely safe for infants, children, pregnant women, and elderly.',
      },
      {
        name: 'Paracetamol 500mg (if head heaviness or mild fever)',
        dosage: '1 tablet after food as needed (Max 3 times daily)',
        duration: '2–3 days',
        purpose: 'Eases sinus heaviness and mild forehead headache',
        precautions: 'Take only if pain or fever is present.',
      },
    ],
    homeRemedies: [
      'Steam inhalation twice daily: add a drop of eucalyptus oil or a pinch of turmeric to steaming water.',
      'Warm water with freshly squeezed lemon juice and 1 teaspoon of honey.',
      'Warm salt water gargling twice daily to soothe the throat.',
    ],
    warningSigns: [
      'Fever lasting longer than 4 days or spiking above 101°F.',
      'Severe pain around eyebrows or cheekbones with yellowish-green foul nasal discharge.',
      'Difficulty breathing or whistling sound (wheeze) from chest.',
    ],
    testsAndReferrals: ['Usually self-limiting within 5–7 days. Visit PHC if symptoms persist beyond 10 days.'],
    prevention: ['Wash hands frequently; avoid close contact with persons with active respiratory infections.'],
  },

  {
    id: 'dry_cough',
    category: 'Respiratory',
    title: 'Dry Cough / Irritant Throat Cough',
    keywords: [
      'dry cough', 'cough without phlegm', 'throat irritation', 'tickling cough', 'khasi',
      'sookhi khasi', 'podi daggu', 'gontu gichukapovatam'
    ],
    overview: 'Non-productive, irritating cough without mucus production, typically triggered by viral recovery, post-nasal drip, dust, smoke, or allergen exposure.',
    possibleConditions: ['Post-Viral Cough Hyperreactivity', 'Allergic Pharyngitis', 'Acid Reflux Cough (GERD)'],
    medicines: [
      {
        name: 'Dextromethorphan Hydrobromide Syrup (10mg/5ml)',
        dosage: '10ml (2 teaspoons) three times daily after food',
        duration: '3–5 days',
        purpose: 'Centrally suppresses cough reflex in the medulla to provide relief from constant dry fits',
        precautions: 'Safe for adults and children above 6 years. Do not take if you have productive phlegmy cough.',
      },
      {
        name: 'Warm Honey Lozenges / Strepsils',
        dosage: '1 lozenge dissolved slowly in mouth every 4–6 hours',
        duration: 'As needed',
        purpose: 'Coats and lubricates the inflamed pharyngeal mucosa',
        precautions: 'Do not give honey to infants under 1 year of age.',
      },
      {
        name: 'Cetirizine 10mg (if allergy or night coughing)',
        dosage: '1 tablet at bedtime',
        duration: '3–5 days',
        purpose: 'Reduces post-nasal drip and allergic bronchial twitching',
        precautions: 'Mild drowsiness possible.',
      },
    ],
    homeRemedies: [
      '1 tablespoon warm honey mixed with 1/4 teaspoon freshly crushed black pepper and ginger juice twice daily.',
      'Sip warm turmeric milk (golden milk) before going to bed.',
      'Avoid cold drinks, fried items, and dry powdery dust or cooking smoke.',
    ],
    warningSigns: [
      'Cough lasting longer than 2 weeks (critical alert: requires Tuberculosis - TB testing).',
      'Coughing up blood or blood-tinged sputum.',
      'Significant unintentional weight loss, loss of appetite, or night sweats.',
    ],
    testsAndReferrals: [
      'Sputum smear microscopy / CBNAAT (GeneXpert) test for TB at any government PHC (free of cost).',
      'Chest X-Ray if cough persists beyond 2 weeks.',
    ],
    prevention: ['Wear a mask in dusty rural environments; ventilate indoor cooking spaces.'],
  },

  {
    id: 'wet_cough_bronchitis',
    category: 'Respiratory',
    title: 'Productive Cough with Phlegm / Bronchitis',
    keywords: [
      'wet cough', 'cough with phlegm', 'chest congestion', 'mucus cough', 'balgam',
      'kapha', 'telisi daggu', 'phlegm', 'rattling chest'
    ],
    overview: 'Cough that brings up yellowish, greenish, or white mucus from the lower respiratory tract, associated with chest congestion and deep rattling.',
    possibleConditions: ['Acute Bronchitis', 'Chest Congestion / Bronchospasm', 'Early Pneumonia'],
    medicines: [
      {
        name: 'Ambroxol (30mg) + Guaifenesin (100mg) Syrup',
        dosage: '10ml (2 teaspoons) three times daily with a full glass of warm water',
        duration: '5 days',
        purpose: 'Expectorant and mucolytic that thins tenacious bronchial mucus, making it easy to cough out',
        precautions: 'Drinking plenty of warm water is essential for the medicine to thin the phlegm effectively.',
      },
      {
        name: 'Paracetamol 500mg',
        dosage: '1 tablet twice or thrice daily if chest soreness or mild fever accompanies cough',
        duration: '3 days',
        purpose: 'Eases rib/chest wall muscle soreness caused by constant coughing',
        precautions: 'Take after meals.',
      },
      {
        name: 'Amoxicillin 500mg (Only if confirmed bacterial infection by doctor)',
        dosage: '1 capsule three times daily for 5 days as prescribed',
        duration: '5 days',
        purpose: 'First-line antibiotic for bacterial bronchitis or respiratory infection',
        precautions: 'Prescription drug. Do not take without doctor evaluation. Always complete the full course.',
      },
    ],
    homeRemedies: [
      'Perform steam inhalation twice a day for 10 minutes to loosen chest phlegm.',
      'Drink warm water throughout the day; avoid cold water, curd, and ice completely.',
      'Kadha: decoction made by boiling crushed tulsi leaves, ginger, black pepper, and clove in water.',
    ],
    warningSigns: [
      'Shortness of breath, rapid breathing (tachypnea), or chest drawing inward while inhaling.',
      'Rust-colored or blood-streaked phlegm.',
      'High fever with chills and severe localized chest pain while breathing deeply.',
    ],
    testsAndReferrals: [
      'Chest X-Ray and CBC at Community Health Centre (CHC). Sputum exam if prolonged > 2 weeks.',
    ],
    prevention: ['Avoid exposure to biomass fuel smoke, chulha emissions, and tobacco smoke.'],
  },

  {
    id: 'sore_throat',
    category: 'Respiratory',
    title: 'Sore Throat / Pharyngitis / Tonsillitis',
    keywords: [
      'sore throat', 'throat pain', 'difficulty swallowing', 'tonsil', 'tonsillitis', 'pharyngitis',
      'gale me dard', 'gontu noppi', 'mingaleni noppi'
    ],
    overview: 'Pain, burning, or scratchiness in the throat that intensifies during swallowing, often accompanied by swollen tonsils or tender neck lymph nodes.',
    possibleConditions: ['Viral Pharyngitis', 'Streptococcal Tonsillitis', 'Laryngitis'],
    medicines: [
      {
        name: 'Paracetamol 500mg or Ibuprofen 400mg',
        dosage: '1 tablet every 8 hours after food',
        duration: '3 days',
        purpose: 'Relieves acute swallowing pain and reduces throat inflammation',
        precautions: 'Always take with or after food. If taking Ibuprofen, avoid if you have gastritis/ulcers.',
      },
      {
        name: 'Povidone-Iodine 2% Gargle Solution / Warm Saline',
        dosage: 'Dilute with equal amount of warm water; gargle for 30 seconds 3–4 times daily',
        duration: '4–5 days',
        purpose: 'Antiseptic gargle that reduces bacterial load and soothes inflamed pharyngeal tissue',
        precautions: 'Do NOT swallow the gargle solution; spit out completely.',
      },
      {
        name: 'Throat Lozenges (Amylmetacresol + Dichlorobenzyl alcohol)',
        dosage: '1 lozenge dissolved slowly every 3 hours',
        duration: '3 days',
        purpose: 'Provides mild topical local anesthetic and antiseptic action',
        precautions: 'Safe OTC medication.',
      },
    ],
    homeRemedies: [
      'Warm salt water gargle: 1/2 teaspoon rock salt in a glass of lukewarm water 3–4 times daily.',
      'Drink warm ginger tea with 1 teaspoon of pure honey.',
      'Avoid spicy, rough-textured, acidic, or extremely cold foods that scratch the inflamed throat.',
    ],
    warningSigns: [
      'Inability to swallow even saliva or water; drooling.',
      'Difficulty opening the mouth wide (Trismus) or severe one-sided throat swelling (Quinsy).',
      'Stridor (high-pitched whistling sound while breathing in).',
    ],
    testsAndReferrals: ['Throat examination by PHC Medical Officer. Rapid Strep test if white patches on tonsils.'],
    prevention: ['Do not share drinking tumblers or utensils with infected individuals.'],
  },

  {
    id: 'asthma_wheezing',
    category: 'Respiratory',
    title: 'Asthma / Bronchospasm / Wheezing',
    keywords: [
      'asthma', 'wheezing', 'breathlessness', 'shortness of breath', 'chest tightness',
      'dama', 'saas lene me takleef', 'dammu', 'aayasam', 'swasa aagadam'
    ],
    overview: 'Chronic inflammatory airway disorder causing hyperreactive bronchoconstriction, whistling sound in chest during exhalation, and feeling of suffocation.',
    possibleConditions: ['Bronchial Asthma Exacerbation', 'Chronic Obstructive Pulmonary Disease (COPD)', 'Allergic Bronchospasm'],
    medicines: [
      {
        name: 'Salbutamol (Albuterol) Inhaler (100mcg/puff) with Spacer',
        dosage: '2 puffs immediately via spacer; can repeat after 15–20 minutes if relief is incomplete',
        duration: 'As needed for acute episodes',
        purpose: 'Fast-acting beta-2 agonist bronchodilator that relaxes smooth muscle in airways within minutes',
        precautions: 'Essential life-saving emergency inhaler. May cause temporary hand tremors or mild rapid pulse.',
      },
      {
        name: 'Budesonide (200mcg) Inhaler / Rotacap (Maintenance)',
        dosage: '1 puff twice daily after which patient must thoroughly rinse and spit water from mouth',
        duration: 'Continuous daily maintenance as directed by doctor',
        purpose: 'Inhaled corticosteroid that calms underlying chronic bronchial inflammation and prevents attacks',
        precautions: 'Rinsing mouth prevents oral thrush/fungal infection. Do not stop maintenance abruptly.',
      },
    ],
    homeRemedies: [
      'Sit fully upright or lean slightly forward over a table (tripod position); NEVER lie flat on back.',
      'Practice slow, pursed-lip breathing (breathe in through nose for 2 counts, out through pursed lips for 4 counts).',
      'Immediately remove patient from smoke, dust, chulha fumes, incense (agarbatti), and animal dander.',
    ],
    warningSigns: [
      'Severe breathlessness preventing patient from speaking more than 2–3 words in a single breath.',
      'Bluish discoloration of lips, tongue, or fingertips (Cyanosis - extreme emergency).',
      'No improvement after 4–6 puffs of Salbutamol inhaler; pulse oximeter SpO2 reading below 92%.',
    ],
    testsAndReferrals: [
      'Urgent referral to PHC/CHC or Call 108 Ambulance immediately for oxygen and nebulization.',
    ],
    prevention: [
      'Identify and avoid known personal triggers (pollen, cold air, smoke, strong sprays).',
      'Never skip daily prescribed maintenance inhalers.',
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 3. DIGESTIVE & GASTROINTESTINAL
  // ─────────────────────────────────────────────────────────────
  {
    id: 'acidity_gerd',
    category: 'Gastrointestinal',
    title: 'Acidity, Gastritis, GERD & Heartburn',
    keywords: [
      'acidity', 'gas', 'heartburn', 'burning stomach', 'acid reflux', 'sour burps',
      'pet me jalan', 'chhati me jalan', 'kadupulo manta', 'gundelo manta', 'uppati theanpulu'
    ],
    overview: 'Excess gastric acid secretion causing retrosternal burning pain (heartburn), sour water regurgitation, and epigastric discomfort, often aggravated by irregular meals or spicy food.',
    possibleConditions: ['Acute Gastritis', 'Gastroesophageal Reflux Disease (GERD)', 'Peptic / Duodenal Ulcer'],
    medicines: [
      {
        name: 'Pantoprazole 40mg or Omeprazole 20mg',
        dosage: '1 tablet once daily in the morning 30–45 minutes BEFORE breakfast',
        duration: '7–14 days',
        purpose: 'Proton pump inhibitor (PPI) that effectively reduces gastric acid production and heals stomach lining',
        precautions: 'Must be swallowed whole with water on an empty stomach. Safe and non-harmful.',
      },
      {
        name: 'Antacid Gel (Magaldrate 400mg + Simethicone 20mg / Digene / Gelusil)',
        dosage: '10ml (2 teaspoons) 1 hour after meals and before bed as needed',
        duration: 'As needed for instant relief',
        purpose: 'Directly neutralizes existing stomach acid within minutes and breaks gas bubbles',
        precautions: 'Take 2 hours apart from other medicines to avoid absorption interference.',
      },
    ],
    homeRemedies: [
      'Drink a glass of cold milk or fresh tender coconut water for fast soothing relief.',
      'Sip warm water boiled with 1 teaspoon of cumin seeds (jeera) and fennel (saunf) after meals.',
      'Elevate the head of your bed by 6 inches and avoid lying down for at least 2 hours after dinner.',
    ],
    warningSigns: [
      'Vomiting blood or coffee-ground colored material.',
      'Passing dark black, tarry, sticky stools (Melena - indicates internal upper GI bleeding).',
      'Severe burning chest pain radiating to left jaw or arm (Must rule out Heart Attack immediately!).',
      'Difficulty or pain when swallowing food (Dysphagia).',
    ],
    testsAndReferrals: [
      'Upper GI endoscopy if symptoms persist beyond 4 weeks or if alarming signs present.',
      'Check for H. pylori infection at CHC.',
    ],
    prevention: [
      'Eat small, frequent meals on fixed timings. Avoid deep-fried, excessively spicy food, tea on empty stomach, and tobacco.',
    ],
  },

  {
    id: 'diarrhea_loose_motions',
    category: 'Gastrointestinal',
    title: 'Acute Diarrhea, Loose Motions & Gastroenteritis',
    keywords: [
      'diarrhea', 'loose motions', 'watery stool', 'stomach upset', 'food poisoning',
      'dast', 'pet kharab', 'vichirekalu', 'bedhi', 'loose stools'
    ],
    overview: 'Frequent passage of abnormally loose or watery stools (more than 3 times in 24 hours), causing rapid dehydration and electrolyte depletion.',
    possibleConditions: ['Acute Viral Gastroenteritis (Rotavirus/Norovirus)', 'Bacterial Food Poisoning', 'Traveler\'s Diarrhea'],
    medicines: [
      {
        name: 'WHO-Formula Oral Rehydration Salts (ORS)',
        dosage: 'Mix 1 full sachet in exactly 1 liter of clean drinking water. Drink 200–300ml after every loose stool',
        duration: 'Until diarrhea stops completely (at least 2–3 days)',
        purpose: 'Lifesaving electrolyte balance restoration that prevents fatal dehydration',
        precautions: 'Do not boil prepared ORS solution. Prepare fresh batch every 24 hours. Safe for all ages.',
      },
      {
        name: 'Zinc Sulphate (20mg daily for adults/children > 6mo; 10mg < 6mo)',
        dosage: '1 tablet once daily dissolved in water after food',
        duration: 'Full 14 days course strictly',
        purpose: 'Repairs intestinal epithelial lining, shortens diarrhea duration, and prevents recurrence for 3 months',
        precautions: 'WHO standard treatment for diarrhea. Extremely safe and essential.',
      },
      {
        name: 'Probiotic (Lactobacillus / Spores of Bacillus clausii)',
        dosage: '1 capsule or mini-bottle twice daily after meals',
        duration: '5 days',
        purpose: 'Restores beneficial gut flora and competitively eliminates pathogenic bacteria',
        precautions: 'Completely safe, non-toxic, and non-harmful.',
      },
      {
        name: 'Racecadotril 100mg (for adults with high-volume watery diarrhea)',
        dosage: '1 capsule three times daily before food until stools normalize (Max 7 days)',
        duration: '2–3 days',
        purpose: 'Antisecretory agent that reduces water/electrolyte leakage into the gut without slowing intestinal motility',
        precautions: 'Safer than Loperamide because it does not trap toxins inside the bowel.',
      },
    ],
    homeRemedies: [
      'Drink salted rice kanji, thin buttermilk with a pinch of salt and roasted cumin, and coconut water.',
      'BRAT diet: Banana, Rice (khichdi), Applesauce/stewed apple, Toast/plain roti.',
      'Continue feeding regular foods; NEVER starve a patient with diarrhea.',
    ],
    warningSigns: [
      'Blood or red streaks in stool (indicates Dysentery - requires immediate antibiotics).',
      'Signs of severe dehydration: sunken eyes, dry tongue/mouth, no urine for 6–8 hours, extreme thirst, lethargy.',
      'High persistent fever > 102°F or uncontrollable vomiting where oral liquids cannot stay down.',
    ],
    testsAndReferrals: [
      'Routine and microscopic stool examination at PHC. If severely dehydrated, immediate IV fluids (Ringer\'s Lactate) at PHC.',
    ],
    prevention: [
      'Always drink boiled/purified water. Wash hands with soap after defecation and before handling food.',
    ],
  },

  {
    id: 'stomach_pain_cramps',
    category: 'Gastrointestinal',
    title: 'Stomach Pain, Abdominal Cramps & Spasms',
    keywords: [
      'stomach pain', 'abdominal pain', 'belly pain', 'stomach cramps', 'spasm', 'twisting pain',
      'pet dard', 'kadupu noppi', 'kadupulo manta', 'marod'
    ],
    overview: 'Colicky or cramping pain in the abdomen caused by smooth muscle spasm in gut, gas trapped in intestines, indigestion, or urinary/menstrual causes.',
    possibleConditions: ['Intestinal Colic / Muscle Spasm', 'Acute Gastritis / Indigestion', 'Renal Colic / Appendicitis (if severe localized)'],
    medicines: [
      {
        name: 'Drotaverine Hydrochloride 40mg or 80mg',
        dosage: '1 tablet after food as needed (Max 3 times daily)',
        duration: '1–2 days',
        purpose: 'Pure antispasmodic that relieves intestinal, biliary, and urinary smooth muscle spasms without masking peritoneal signs',
        precautions: 'Safe and non-harmful. Do not take on empty stomach.',
      },
      {
        name: 'Dicyclomine 10mg + Paracetamol 325mg (Meftal-Spas / Cyclopam)',
        dosage: '1 tablet after meals if pain is accompanied by fever or intense cramping',
        duration: '1–2 days as needed',
        purpose: 'Relieves both visceral smooth muscle spasm and pain',
        precautions: 'May cause mild dry mouth or blurred vision. Do not take repeatedly without diagnosis.',
      },
      {
        name: 'Pantoprazole 40mg (if pain is in upper central abdomen / burning)',
        dosage: '1 tablet empty stomach',
        duration: '3–5 days',
        purpose: 'Calms acid-induced mucosal irritation',
        precautions: 'Take 30 mins before food.',
      },
    ],
    homeRemedies: [
      'Apply a warm water bottle or heating pad over the abdomen for 15–20 minutes.',
      'Drink warm water infused with crushed carom seeds (ajwain) and a pinch of black salt (kala namak).',
      'Eat light, warm, non-spicy semi-solid foods (moong dal khichdi).',
    ],
    warningSigns: [
      'Severe sharp pain shifting to the RIGHT LOWER abdomen that worsens on coughing/touching (Appendicitis alert!).',
      'Abdomen feels rigid and hard like a wooden board (Peritonitis emergency!).',
      'Inability to pass gas or stool accompanied by severe abdominal distension and persistent vomiting (Obstruction).',
      'Severe pain in pregnant woman (Ectopic pregnancy or premature labor risk).',
    ],
    testsAndReferrals: [
      'Abdominal Ultrasound (USG) and Urine Routine at CHC if pain is recurrent or localized.',
    ],
    prevention: ['Avoid overeating, chewing too quickly, consuming stale food, and excessive aerated drinks.'],
  },

  {
    id: 'constipation',
    category: 'Gastrointestinal',
    title: 'Constipation & Hard Stools',
    keywords: [
      'constipation', 'hard stools', 'difficulty passing stool', 'straining', 'kabz',
      'pet saaf nahi hona', 'malam bandham', 'sukka mala'
    ],
    overview: 'Infrequent bowel movements (fewer than 3 per week), passage of hard, dry stools requiring painful straining, accompanied by abdominal fullness.',
    possibleConditions: ['Functional Dietary Constipation', 'Irritable Bowel Syndrome (IBS-C)', 'Medication-Induced Constipation'],
    medicines: [
      {
        name: 'Isabgol (Psyllium Husk)',
        dosage: '1 to 2 tablespoons stirred briskly into a glass of warm water or milk, drank immediately at bedtime',
        duration: '5–7 days or as needed',
        purpose: 'Natural soluble dietary fiber bulk-forming laxative that absorbs water and softens stool naturally',
        precautions: 'Very safe, non-habit forming. Drink an additional glass of water immediately after consuming.',
      },
      {
        name: 'Lactulose Syrup (10g/15ml)',
        dosage: '15ml to 30ml at night with plenty of water',
        duration: '3–5 days',
        purpose: 'Osmotic laxative that draws water into the colon to soften hard compacted stool',
        precautions: 'Safe for elderly and pregnant women under guidance. May cause mild initial bloating.',
      },
      {
        name: 'Bisacodyl 5mg (Dulcolax) - Only for short-term acute relief',
        dosage: '1 tablet at bedtime with water',
        duration: 'Single dose or Max 2 days',
        purpose: 'Stimulant laxative providing bowel movement within 6–8 hours',
        precautions: 'Do not use continuously to prevent bowel dependence.',
      },
    ],
    homeRemedies: [
      'Drink 2 full glasses of warm water first thing every morning on waking up.',
      'Eat fresh papaya, soaked figs (anjeer), prunes, guava, and plenty of green leafy vegetables.',
      'Increase daily clean water intake to at least 2.5 to 3 liters.',
    ],
    warningSigns: [
      'Blood coating the hard stool or bleeding into the toilet bowl (Piles/Anal Fissure).',
      'Severe abdominal pain with inability to pass even gas or flatus.',
      'Unexplained progressive constipation in persons over 50 years of age with weight loss.',
    ],
    testsAndReferrals: ['Consult PHC doctor for digital rectal examination if pain or bleeding is present.'],
    prevention: ['Regular physical walking, high-fiber traditional unpolished grain diet, and never suppress natural urges.'],
  },

  {
    id: 'vomiting_nausea',
    category: 'Gastrointestinal',
    title: 'Nausea, Vomiting & Motion Sickness',
    keywords: [
      'vomiting', 'nausea', 'throwing up', 'puking', 'vomit', 'ulti', 'ji machlana',
      'vanthulu', 'vichedam', 'motion sickness'
    ],
    overview: 'Forceful expulsion of stomach contents through the mouth, preceded by nausea, salivation, and retching.',
    possibleConditions: ['Acute Gastroenteritis', 'Gastric Irritation / Food Intolerance', 'Labyrinthitis / Motion Sickness'],
    medicines: [
      {
        name: 'Ondansetron 4mg (Emset / Vomikind)',
        dosage: '1 tablet 30 minutes before meals or as needed (Max 8mg twice daily)',
        duration: '1–2 days',
        purpose: 'Potent, safe 5-HT3 receptor blocker that rapidly stops nausea and vomiting signals in the brain and gut',
        precautions: 'Very safe and preferred antiemetic. Do not exceed recommended dose.',
      },
      {
        name: 'Domperidone 10mg (alternative prokinetic)',
        dosage: '1 tablet 15–30 minutes before food',
        duration: '2 days',
        purpose: 'Promotes downward gastric emptying and prevents reflux vomiting',
        precautions: 'Avoid if taking heart rhythm medications.',
      },
      {
        name: 'Oral Rehydration Salts (ORS)',
        dosage: 'Take small sips (1 tablespoon every 5 minutes) 30 minutes after vomiting stops',
        duration: 'Until rehydrated',
        purpose: 'Gradually replaces lost potassium, sodium, and water without triggering the gag reflex',
        precautions: 'Do NOT gulp large quantities at once as it triggers vomiting reflex.',
      },
    ],
    homeRemedies: [
      'Chew a small piece of fresh ginger or sip warm ginger water.',
      'Smell fresh lemon peel or suck on a hard sour candy.',
      'Rest in a sitting upright position; avoid lying flat immediately after eating or drinking.',
    ],
    warningSigns: [
      'Vomiting blood (bright red or dark brown coffee grounds).',
      'Vomiting accompanied by severe sudden "worst of life" headache and neck stiffness.',
      'Inability to keep any liquid down for more than 12 hours with dark concentrated urine.',
      'Projectile vomiting in an infant.',
    ],
    testsAndReferrals: ['Visit PHC for IV fluid administration (Normal Saline / DNS) if unable to take oral fluids.'],
    prevention: ['Eat small, bland meals; avoid foul odors, overly greasy foods, and rapid posture changes.'],
  },

  // ─────────────────────────────────────────────────────────────
  // 4. PAIN, MUSCULOSKELETAL & NERVOUS SYSTEM
  // ─────────────────────────────────────────────────────────────
  {
    id: 'headache_migraine',
    category: 'Neurological & Pain',
    title: 'Headache, Migraine & Tension Headache',
    keywords: [
      'headache', 'head pain', 'migraine', 'throbbing head', 'forehead pain', 'one side head pain',
      'sar dard', 'adha sar dard', 'thala noppi', 'tala potu', 'mandha thalanoppi'
    ],
    overview: 'Diffuse or localized aching pain in the head, temples, forehead, or occiput ranging from tight band-like tension to pulsating one-sided migraine with nausea.',
    possibleConditions: ['Tension-Type Headache', 'Migraine with or without Aura', 'Sinusitis / Eyestrain Headache'],
    medicines: [
      {
        name: 'Paracetamol 500mg or 650mg',
        dosage: '1 tablet after food with a full glass of water (Max 3 times daily)',
        duration: '1–2 days as needed',
        purpose: 'Safe first-line analgesic that relieves dull tension headaches and mild migraines',
        precautions: 'Safe for most patients. Avoid empty stomach.',
      },
      {
        name: 'Naproxen 250mg or Ibuprofen 400mg (for moderate migraine / throbbing pain)',
        dosage: '1 tablet taken early at the very start of the migraine attack after meals',
        duration: 'Single dose, repeat after 8 hours only if needed',
        purpose: 'Anti-inflammatory NSAID that reduces neurovascular inflammation in cranial arteries',
        precautions: 'Must be taken with food. Contraindicated in active peptic ulcer disease or severe kidney disease.',
      },
    ],
    homeRemedies: [
      'Rest in a quiet, dark, well-ventilated room with eyes closed during a migraine attack.',
      'Apply a cold ice pack wrapped in a cloth to forehead or a warm compress to the back of the neck.',
      'Drink 2 large glasses of water to correct subtle dehydration, a very frequent cause of headaches.',
    ],
    warningSigns: [
      'Sudden explosive, severe "thunderclap" headache reaching maximum intensity within seconds (Stroke/Subarachnoid bleed).',
      'Headache accompanied by high fever, stiff neck, and inability to touch chin to chest (Meningitis).',
      'Headache with weakness in one arm/leg, facial droop, or slurred speech (Dial 108 immediately!).',
      'New worsening headache after a head injury or fall.',
    ],
    testsAndReferrals: ['Check blood pressure at PHC/Health sub-centre. Eye examination to check refractive error.'],
    prevention: ['Maintain regular sleep timings (7–8 hours), stay well-hydrated, and limit prolonged screen exposure.'],
  },

  {
    id: 'back_pain_joint_pain',
    category: 'Musculoskeletal',
    title: 'Back Pain, Joint Pain & Arthritis',
    keywords: [
      'back pain', 'joint pain', 'knee pain', 'arthritis', 'lower back pain', 'sciatica',
      'kamar dard', 'peeth dard', 'ghutne ka dard', 'naddi noppi', 'vennu noppi', 'mokaalla noppi'
    ],
    overview: 'Musculoskeletal ache, stiffness, or sharp discomfort in the lumbar spine, knees, hips, or shoulders aggravated by prolonged agricultural labor, lifting, or osteoarthritis.',
    possibleConditions: ['Lumbar Muscle Strain / Spasm', 'Osteoarthritis of Knees/Spine', 'Lumbar Disc Prolapse'],
    medicines: [
      {
        name: 'Paracetamol 650mg',
        dosage: '1 tablet twice daily after meals as needed',
        duration: '3–5 days',
        purpose: 'Safe systemic pain relief without gastric or renal irritation',
        precautions: 'First-line medication for musculoskeletal pain.',
      },
      {
        name: 'Diclofenac 1.16% or Aceclofenac Topical Gel / Spray (Volini / Moov)',
        dosage: 'Gently apply a thin layer over the painful joint/back area 3 times daily; do not massage forcefully',
        duration: '5–7 days',
        purpose: 'Targeted local NSAID anti-inflammatory that penetrates tissues directly with negligible systemic side effects',
        precautions: 'Wash hands after applying. Do not apply on broken skin or near eyes.',
      },
      {
        name: 'Thiocolchicoside 4mg + Aceclofenac 100mg (for severe back muscle spasm)',
        dosage: '1 tablet twice daily after food for short course (Only if prescribed by doctor)',
        duration: '3–5 days',
        purpose: 'Combines muscle relaxant with anti-inflammatory to break severe muscular back spasm',
        precautions: 'Take strictly with meals. Avoid during pregnancy.',
      },
    ],
    homeRemedies: [
      'Apply warm fomentation (hot water bag or warm salt pouch) for 15 minutes twice daily to relax tight muscles.',
      'Sleep on a firm, supportive mattress or flat surface; place a pillow under your knees when sleeping on your back.',
      'Practice gentle back-stretching exercises (cat-cow stretch, pelvic tilts); avoid lifting heavy weights with a bent back.',
    ],
    warningSigns: [
      'Back pain accompanied by loss of control over urination or bowel movements (Cauda Equina emergency!).',
      'Numbness, loss of sensation, or "pins and needles" traveling down both legs with weakness while walking.',
      'Severe pain accompanied by unexplained fever and weight loss.',
    ],
    testsAndReferrals: ['X-Ray of Lumbar Spine / Knees at CHC. Serum Uric acid if joint swelling is sudden (Gout).'],
    prevention: ['Bend your knees, not your spine, when lifting heavy sacks or agricultural produce; maintain good posture.'],
  },

  {
    id: 'toothache_dental',
    category: 'ENT & Dental',
    title: 'Toothache, Dental Cavity & Gum Swelling',
    keywords: [
      'toothache', 'tooth pain', 'cavity', 'gum swelling', 'dental pain', 'bleeding gums',
      'daant dard', 'danto me dard', 'pallu noppi', 'chiguru vaapu', 'danta shoola'
    ],
    overview: 'Throbbing, sharp, or constant dental pain triggered by enamel erosion, deep dental caries, pulpitis, or acute gum infection/abscess.',
    possibleConditions: ['Dental Pulpitis / Deep Caries', 'Periapical Abscess', 'Gingivitis / Periodontitis'],
    medicines: [
      {
        name: 'Paracetamol 500mg + Ibuprofen 400mg (Combiflam / Flexon)',
        dosage: '1 tablet after food twice or thrice daily for pain relief',
        duration: '2–3 days',
        purpose: 'Effective dual analgesic and anti-inflammatory relief for throbbing dental nerve pain',
        precautions: 'Take strictly after meals with water. Avoid if you have active stomach ulcers.',
      },
      {
        name: 'Chlorhexidine 0.2% Antiseptic Mouthwash',
        dosage: 'Rinse mouth with 10ml undiluted for 1 minute twice daily after brushing; spit out',
        duration: '5 days',
        purpose: 'Powerful oral antiseptic that eliminates plaque bacteria and reduces gum inflammation',
        precautions: 'Do not eat or drink for 30 minutes after rinsing.',
      },
      {
        name: 'Amoxicillin 500mg + Metronidazole 400mg (Only if dental abscess with facial swelling)',
        dosage: 'As prescribed by dental surgeon / PHC doctor',
        duration: '5 days',
        purpose: 'Broad-spectrum antibiotic coverage against oral anaerobic and aerobic bacteria',
        precautions: 'Avoid all alcohol during Metronidazole therapy. Requires dental extraction or root canal treatment.',
      },
    ],
    homeRemedies: [
      'Apply 1–2 drops of pure Clove Oil (Laung ka tel) on a small sterile cotton swab and press gently against the painful cavity.',
      'Rinse mouth thoroughly with lukewarm salt water (1/2 tsp salt in 1 cup warm water) after every meal.',
      'Never place an aspirin or pain tablet directly on the gum as it causes severe chemical burns.',
    ],
    warningSigns: [
      'Swelling spreading rapidly to the cheek, below the jaw, or neck (Ludwig\'s Angina - airway compromise risk!).',
      'High fever accompanying dental swelling with difficulty swallowing or breathing.',
    ],
    testsAndReferrals: ['Dental X-Ray (IOPA) and treatment at nearest Community Health Centre (CHC) Dental Clinic.'],
    prevention: ['Brush teeth twice daily with fluoride toothpaste; reduce sugary snacks and tobacco/gutkha chewing.'],
  },

  // ─────────────────────────────────────────────────────────────
  // 5. DERMATOLOGY & SKIN
  // ─────────────────────────────────────────────────────────────
  {
    id: 'fungal_infection',
    category: 'Dermatology',
    title: 'Fungal Skin Infection / Ringworm / Tinea',
    keywords: [
      'fungal', 'ringworm', 'tinea', 'itching in groin', 'round rash', 'fungus',
      'daad', 'khaj', 'khujli', 'tamara', 'durada', 'dhobi itch'
    ],
    overview: 'Superficial dermatophyte fungal infection characterized by red, raised, itchy, circular ring-like patches with clear centers, common in warm, sweaty body folds.',
    possibleConditions: ['Tinea Corporis (Body Ringworm)', 'Tinea Cruris (Jock Itch)', 'Intertrigo'],
    medicines: [
      {
        name: 'Clotrimazole 1% Cream or Terbinafine 1% Cream',
        dosage: 'Clean and dry area thoroughly; apply a thin layer extending 2cm beyond the red border twice daily',
        duration: '2 to 3 weeks continuously (continue for 1 week AFTER rash visibly disappears)',
        purpose: 'Topical antifungal that destroys fungal cell membranes',
        precautions: 'CRITICAL WARNING: NEVER apply steroid combination creams (e.g., Betnovate, Quadriderm, Panderm)! Steroids worsen fungal infection and thin the skin.',
      },
      {
        name: 'Cetirizine 10mg',
        dosage: '1 tablet at night before sleeping',
        duration: '5–7 days',
        purpose: 'Controls severe nocturnal itching, preventing patient from scratching and spreading the fungus',
        precautions: 'Safe OTC antihistamine.',
      },
      {
        name: 'Clotrimazole 1% Dusting Powder (Abzorb / Candid)',
        dosage: 'Dust into groin, underarms, and skin folds every morning after bath',
        duration: 'Throughout hot/humid weather',
        purpose: 'Absorbs sweat, maintains dry environment, and prevents fungal regrowth',
        precautions: 'Keep powder dry.',
      },
    ],
    homeRemedies: [
      'Bathe twice daily; dry skin thoroughly with a clean, dry towel before wearing clothes.',
      'Wear loose, clean, 100% cotton underwear and clothing. Change clothes immediately if sweaty.',
      'Wash bedsheets and underwear in hot water and dry them in direct sunlight to kill fungal spores.',
    ],
    warningSigns: [
      'Secondary bacterial infection: yellow pus oozing, severe swelling, redness, and fever.',
      'Infection covering large surface areas of the body without responding to creams after 2 weeks.',
    ],
    testsAndReferrals: ['Consult PHC Medical Officer for oral antifungal tablets (Itraconazole/Terbinafine) if widespread.'],
    prevention: ['Never share personal towels, soap, undergarments, or bedsheets with other family members.'],
  },

  {
    id: 'scabies',
    category: 'Dermatology',
    title: 'Scabies (Night Itching & Web Space Mites)',
    keywords: [
      'scabies', 'night itching', 'itching between fingers', 'intense night itch',
      'itch mite', 'khujli raat me', 'gajji', 'cheraku', 'repagalu durada'
    ],
    overview: 'Infestation by the Sarcoptes scabiei microscopic mite, causing intense allergic itching that worsens dramatically at night, with tiny red burrows between fingers, wrists, and waistline.',
    possibleConditions: ['Scabies Mite Infestation', 'Papular Urticaria', 'Contact Dermatitis'],
    medicines: [
      {
        name: 'Permethrin 5% Cream / Lotion (Scaboma / Permite)',
        dosage: 'Apply thoroughly from neck down to toes over entire body at night; leave on for 8–12 hours, then wash off thoroughly next morning. Repeat once after 7 days',
        duration: 'Single overnight application, repeat once on Day 7',
        purpose: 'Paralyzes and eradicates scabies mites and their eggs completely',
        precautions: 'CRITICAL RULE: ALL family members and close contacts living in the same house MUST be treated at the exact same time, even if they have no itching!',
      },
      {
        name: 'Cetirizine 10mg or Levocetirizine 5mg',
        dosage: '1 tablet at bedtime',
        duration: '7–10 days',
        purpose: 'Suppresses intense night itching to allow restful sleep and prevent scratching excoriations',
        precautions: 'Mild drowsiness possible.',
      },
      {
        name: 'Calamine Lotion',
        dosage: 'Apply gently over itchy areas during the day as needed',
        duration: 'Until skin heals',
        purpose: 'Soothes and cools inflamed skin',
        precautions: 'Safe for all ages.',
      },
    ],
    homeRemedies: [
      'Wash ALL bed linens, blankets, towels, and clothing in boiling hot water; dry in direct sunlight or seal in plastic bags for 72 hours.',
      'Cut fingernails short and keep them clean to prevent scratching skin into open wounds.',
    ],
    warningSigns: [
      'Crusted, oozing honey-colored sores on skin (secondary Impetigo bacterial infection).',
      'Severe widespread scaling and crusting in elderly or immunocompromised patients (Crusted Scabies).',
    ],
    testsAndReferrals: ['Skin scraping examination at CHC if diagnosis is uncertain.'],
    prevention: ['Avoid sharing beds, clothing, or towels with affected individuals until treated.'],
  },

  {
    id: 'allergy_rash_urticaria',
    category: 'Dermatology',
    title: 'Allergic Skin Rash, Hives & Urticaria',
    keywords: [
      'allergy', 'hives', 'urticaria', 'skin rash', 'itching', 'red welts', 'swollen patches',
      'pitti', 'chitthe', 'allergy rash', 'dhaddulu', 'kandalu'
    ],
    overview: 'Sudden emergence of raised, intensely itchy, red or pink swollen wheals (hives) on the skin triggered by food, plant contact, insect stings, dust, or medications.',
    possibleConditions: ['Acute Urticaria (Hives)', 'Contact Dermatitis', 'Drug Allergy (if new medicine started)'],
    medicines: [
      {
        name: 'Cetirizine 10mg or Levocetirizine 5mg',
        dosage: '1 tablet once daily (can be taken twice daily for acute severe hives under guidance)',
        duration: '3–5 days',
        purpose: 'Fast-acting H1 antihistamine that blocks histamine release and clears hives within hours',
        precautions: 'Extremely safe OTC medicine. Causes minimal sedation.',
      },
      {
        name: 'Calamine Lotion',
        dosage: 'Apply liberally to itchy welts with a cotton ball 3–4 times daily',
        duration: 'As needed',
        purpose: 'Topical cooling, astringent, and soothing relief',
        precautions: 'Safe for all ages. Shake bottle well before use.',
      },
      {
        name: 'Hydrocortisone 1% Cream (for small localized contact allergy patches)',
        dosage: 'Apply a very thin layer twice daily for maximum 3–5 days',
        duration: '3–5 days',
        purpose: 'Mild topical anti-inflammatory for localized contact rash',
        precautions: 'Do not use on fungal infections or open cuts.',
      },
    ],
    homeRemedies: [
      'Apply cool compresses or take a cool water bath to soothe burning itch.',
      'Wear loose-fitting, soft cotton clothing; avoid tight woolen or synthetic clothes.',
      'Stop any suspected new food, herbal powder, cosmetic, or medicine immediately.',
    ],
    warningSigns: [
      'Swelling of the lips, tongue, face, or difficulty breathing/swallowing (Anaphylaxis - extreme life emergency! Call 108 immediately!).',
      'Feeling dizzy, lightheaded, or fainting.',
    ],
    testsAndReferrals: ['Emergency injection of Adrenaline / Hydrocortisone at PHC if throat swelling or breathing issues occur.'],
    prevention: ['Identify and strictly avoid the offending allergen once identified.'],
  },

  {
    id: 'minor_cuts_burns',
    category: 'Emergency & Trauma',
    title: 'Minor Wounds, Cuts & Superficial Burns',
    keywords: [
      'cut', 'wound', 'burn', 'minor burn', 'bleeding cut', 'scrape', 'injury',
      'chot', 'jalna', 'ghav', 'gaayam', 'kaalipovadam', 'debba'
    ],
    overview: 'Traumatic skin breaks, abrasions, lacerations, or superficial first/second-degree heat burns common during farming, kitchen work, and rural daily activities.',
    possibleConditions: ['Superficial Laceration / Abrasion', 'First or Second Degree Thermal Burn'],
    medicines: [
      {
        name: 'Povidone-Iodine 5% Ointment (Betadine) - For Cuts & Wounds',
        dosage: 'After washing wound with clean water and soap, apply ointment and cover with sterile gauze bandage',
        duration: 'Apply twice daily until skin closes (3–7 days)',
        purpose: 'Broad-spectrum antiseptic that kills bacteria, viruses, and fungi, preventing wound infection',
        precautions: 'Do not use if allergic to iodine.',
      },
      {
        name: 'Silver Sulfadiazine 1% Cream (Silverex / Burnol) - For Burns',
        dosage: 'Apply a thick layer (1–2mm) over clean burned skin; cover with sterile non-adherent dressing',
        duration: 'Apply twice daily until re-epithelialization',
        purpose: 'Prevents bacterial colonization in burn wounds and accelerates soothing healing',
        precautions: 'Only for burns. Do not apply on open bleeding wounds.',
      },
      {
        name: 'Paracetamol 500mg',
        dosage: '1 tablet after food as needed for throbbing wound pain',
        duration: '2–3 days',
        purpose: 'Pain relief',
        precautions: 'Take after meals.',
      },
      {
        name: 'Tetanus Toxoid (TT) Injection 0.5ml IM',
        dosage: '1 dose within 24–48 hours of injury if not vaccinated in past 5 years',
        duration: 'Single dose',
        purpose: 'Prevents lethal Clostridium tetani infection from rust, soil, or animal dung exposure',
        precautions: 'Available free at all government PHCs and sub-centres.',
      },
    ],
    homeRemedies: [
      'FOR BURNS: Immediately hold the burned area under cool running tap water for 15–20 FULL MINUTES. This stops heat from continuing to damage deeper tissue.',
      'CRITICAL: NEVER apply toothpaste, butter, mud, cow dung, turmeric, or ink on burns or wounds!',
      'FOR CUTS: Apply direct firm pressure with a clean cloth for 5 minutes to halt bleeding before dressing.',
    ],
    warningSigns: [
      'Burns covering face, hands, groin, or area larger than the palm of the patient\'s hand.',
      'Pus discharge, spreading redness, foul smell, or fever developing after 2–3 days (wound sepsis).',
      'Deep cut where edges do not come together, or spurting bright red blood.',
    ],
    testsAndReferrals: ['Suturing (stitches) or specialized burn dressing at PHC/CHC.'],
    prevention: ['Wear protective footwear in fields; keep cooking stoves (chulhas) guarded from children.'],
  },

  // ─────────────────────────────────────────────────────────────
  // 6. CHRONIC CONDITIONS, METABOLIC & WOMEN'S HEALTH
  // ─────────────────────────────────────────────────────────────
  {
    id: 'diabetes_management',
    category: 'Chronic & Metabolic',
    title: 'Diabetes Mellitus & Blood Sugar Management',
    keywords: [
      'diabetes', 'sugar', 'blood sugar', 'high glucose', 'frequent urination', 'excessive thirst',
      'madhumeha', 'sugar bimari', 'sugar vyadhi', 'sugar level'
    ],
    overview: 'Chronic metabolic disorder characterized by elevated blood glucose levels due to insulin deficiency or resistance, presenting with frequent urination, excessive thirst, and delayed healing.',
    possibleConditions: ['Type 2 Diabetes Mellitus', 'Impaired Fasting Glucose (Prediabetes)'],
    medicines: [
      {
        name: 'Metformin 500mg or 850mg (Standard First-Line)',
        dosage: '1 tablet once or twice daily with or immediately after food as prescribed by Medical Officer',
        duration: 'Long-term maintenance',
        purpose: 'Improves insulin sensitivity, reduces hepatic glucose production without causing hypoglycemia',
        precautions: 'Must be prescribed by a doctor after kidney function check. Take with meals to prevent stomach upset.',
      },
      {
        name: 'Glimepiride 1mg or 2mg (Sulfonylurea - Only if prescribed)',
        dosage: '1 tablet before the first main meal of the day',
        duration: 'Long-term maintenance',
        purpose: 'Stimulates pancreas to secrete more insulin',
        precautions: 'Take meals on time to prevent low blood sugar (Hypoglycemia).',
      },
    ],
    homeRemedies: [
      'Drink water soaked overnight with 1 teaspoon of fenugreek (methi) seeds.',
      'Include bitter gourd (karela) juice, amla, and unpolished millets (ragi, jowar, bajra) in daily diet.',
      'Walk briskly for 30–45 minutes every day.',
      'HYPOGLYCEMIA FIRST AID: If sweating, trembling, or feeling faint occurs, immediately consume 3 teaspoons of sugar or a sweet candy!',
    ],
    warningSigns: [
      'Hypoglycemia signs: cold sweating, shakiness, confusion, dizziness (immediate sugar needed!).',
      'Non-healing sores, blisters, or black discoloration on feet/toes (Diabetic foot ulcer risk).',
      'Deep rapid breathing with fruity-smelling breath, vomiting, and confusion (Diabetic Ketoacidosis - DKA emergency!).',
    ],
    testsAndReferrals: [
      'Fasting Blood Sugar (FBS), Postprandial Blood Sugar (PPBS), and HbA1c test every 3 months at PHC.',
    ],
    prevention: [
      'Avoid white sugar, jaggery sweets, packaged sodas, and refined flour. Check feet daily for minor cuts.',
    ],
  },

  {
    id: 'hypertension_bp',
    category: 'Cardiovascular',
    title: 'Hypertension & High Blood Pressure',
    keywords: [
      'hypertension', 'blood pressure', 'high bp', 'bp problem', 'pressure',
      'uchh raktchap', 'bp ekkuva', 'raktapotu', 'bp bimari'
    ],
    overview: 'Persistently elevated arterial pressure (> 140/90 mmHg) that strains blood vessels, heart, brain, and kidneys, often remaining asymptomatic until complications develop.',
    possibleConditions: ['Essential Hypertension Stage 1 / 2', 'Hypertensive Urgency'],
    medicines: [
      {
        name: 'Amlodipine 5mg (Calcium Channel Blocker)',
        dosage: '1 tablet once daily in the morning as prescribed by Medical Officer',
        duration: 'Continuous daily maintenance',
        purpose: 'Relaxes and widens peripheral arterial walls, steadily bringing blood pressure down to safe target',
        precautions: 'Prescription medication. Do not skip doses even if you feel completely healthy. Mild ankle swelling may occur.',
      },
      {
        name: 'Telmisartan 40mg (Angiotensin Receptor Blocker)',
        dosage: '1 tablet once daily as prescribed',
        duration: 'Continuous daily maintenance',
        purpose: 'Protects heart and kidneys while maintaining smooth 24-hour BP control',
        precautions: 'Take at the same time every day. Contraindicated during pregnancy.',
      },
    ],
    homeRemedies: [
      'Strictly limit daily salt intake to LESS than 1 level teaspoon (under 5 grams) per day for the entire day\'s cooking.',
      'Avoid salty pickles (achaar), papad, dried fish (karuvadu), and salted snacks completely.',
      'Incorporate 30 minutes of brisk daily walking, practice deep breathing (Pranayama), and quit bidi/tobacco.',
    ],
    warningSigns: [
      'BP reading above 180/110 mmHg with severe headache, blurred vision, or vomiting (Hypertensive Emergency!).',
      'Sudden heaviness or crushing pain in center of chest radiating to left arm (Call 108 immediately!).',
      'Sudden weakness or numbness in face, arm, or leg, or slurred speech (Stroke alert!).',
    ],
    testsAndReferrals: ['Check BP monthly at nearest Health and Wellness Centre (Ayushman Arogya Mandir) / PHC. Annual ECG and kidney tests.'],
    prevention: ['Never stop BP tablets without consulting your doctor; hypertension is a lifelong silent condition.'],
  },

  {
    id: 'menstrual_cramps',
    category: 'Women\'s Health',
    title: 'Menstrual Cramps & Dysmenorrhea',
    keywords: [
      'period pain', 'menstrual cramps', 'dysmenorrhea', 'periods pain', 'stomach pain periods',
      'mahavari dard', 'kashta aarthavam', 'menses pain', 'periods noppi'
    ],
    overview: 'Sharp, throbbing, or cramping lower abdominal and pelvic pain occurring before and during menstruation, caused by uterine prostaglandin-induced muscle contractions.',
    possibleConditions: ['Primary Dysmenorrhea', 'Secondary Dysmenorrhea (Endometriosis/Fibroids)'],
    medicines: [
      {
        name: 'Mefenamic Acid 250mg or 500mg (Meftal)',
        dosage: '1 tablet after food twice or thrice daily during the first 2–3 days of menses',
        duration: '2–3 days as needed',
        purpose: 'Inhibits prostaglandin synthesis, relieving both uterine cramping and pelvic backache',
        precautions: 'Take strictly after meals with water. Very effective for period cramps.',
      },
      {
        name: 'Dicyclomine 10mg + Paracetamol 325mg (Cyclopam / Meftal-Spas)',
        dosage: '1 tablet after meals if pain has intense spasmodic peaks',
        duration: '1–2 days',
        purpose: 'Relaxes uterine smooth muscle spasms',
        precautions: 'Safe for short-term menstrual relief.',
      },
    ],
    homeRemedies: [
      'Place a warm water bottle or heating pad on the lower abdomen for 20 minutes.',
      'Drink warm chamomile or ginger tea with jaggery.',
      'Gentle lower-body stretches, yoga postures (child\'s pose / balasana), and staying well hydrated.',
    ],
    warningSigns: [
      'Unusually heavy bleeding requiring changing pads every 1–2 hours, or passing large blood clots.',
      'Severe pain accompanied by high fever or foul-smelling vaginal discharge (Pelvic Inflammatory Disease).',
      'Severe cramping pain in a woman who has missed her menstrual period (Ectopic Pregnancy emergency!).',
    ],
    testsAndReferrals: ['Pelvic Ultrasound and Hemoglobin test at CHC if pain is progressively worsening.'],
    prevention: ['Regular exercise, warm baths, and reducing excess caffeine and salt intake before periods.'],
  },

  {
    id: 'uti_urinary_infection',
    category: 'Urology & Women\'s Health',
    title: 'Urinary Tract Infection (UTI) & Burning Urination',
    keywords: [
      'uti', 'burning urination', 'pain while passing urine', 'frequent urine', 'urine infection',
      'peshab me jalan', 'mootram lo manta', 'urinary burning'
    ],
    overview: 'Bacterial infection of bladder (cystitis) or urethra, presenting with burning sensation during micturition, increased frequency, urgency, and lower abdominal heaviness.',
    possibleConditions: ['Acute Bacterial Cystitis', 'Urethritis', 'Urinary Calculi (Kidney stone)'],
    medicines: [
      {
        name: 'Disodium Hydrogen Citrate Syrup (Citraka / Cital)',
        dosage: '2 teaspoons (10ml) mixed in a full glass of clean water three times daily after food',
        duration: '3–5 days',
        purpose: 'Urinary alkalinizer that neutralizes acidic urine, providing fast relief from agonizing burning sensation',
        precautions: 'Always dilute in a full glass of water. Safe for adults.',
      },
      {
        name: 'Paracetamol 500mg',
        dosage: '1 tablet after food as needed',
        duration: '2–3 days',
        purpose: 'Relieves lower pelvic soreness and mild fever',
        precautions: 'Take after meals.',
      },
      {
        name: 'Nitrofurantoin 100mg Controlled Release (Prescription Antibiotic)',
        dosage: '1 tablet twice daily with meals for 5 days as prescribed by doctor',
        duration: '5 days',
        purpose: 'Concentrates directly in urine to eradicate E. coli and common bladder bacteria',
        precautions: 'Prescription drug. Take with food or milk to prevent nausea. Do not take in late pregnancy.',
      },
    ],
    homeRemedies: [
      'Drink 3 to 4 liters of clean water daily to continually flush bacteria out of the urinary tract.',
      'Drink fresh tender coconut water and unsweetened cranberry juice if available.',
      'Do not hold urine; empty bladder completely whenever you feel the urge.',
    ],
    warningSigns: [
      'High fever with shivering chills and severe one-sided lower back/flank pain (Pyelonephritis / Kidney infection!).',
      'Visible red blood in urine (Hematuria).',
      'Severe UTI symptoms in a pregnant woman (requires immediate doctor treatment to prevent premature labor).',
    ],
    testsAndReferrals: ['Urine Routine & Microscopy and Urine Culture & Sensitivity at PHC.'],
    prevention: ['Wipe from front to back after using the toilet; maintain perineal hygiene and drink ample water.'],
  },

  // ─────────────────────────────────────────────────────────────
  // 7. CRITICAL EMERGENCIES & TOXIC BITES
  // ─────────────────────────────────────────────────────────────
  {
    id: 'chest_pain_emergency',
    category: 'Emergency',
    title: 'Acute Chest Pain / Suspected Heart Attack',
    isEmergency: true,
    keywords: [
      'chest pain', 'heart attack', 'chest heaviness', 'pain left arm', 'angina',
      'chhati me dard', 'seene me dard', 'gundelo noppi', 'hridaya rogam', 'gas in chest'
    ],
    overview: 'CRITICAL MEDICAL EMERGENCY: Crushing central retrosternal chest tightness or pressure, often radiating to left arm, neck, or jaw, accompanied by profuse cold sweating and shortness of breath.',
    possibleConditions: ['Acute Myocardial Infarction (Heart Attack)', 'Unstable Angina', 'Acute Coronary Syndrome'],
    medicines: [
      {
        name: 'Aspirin (Soluble) 300mg / Disprin (Emergency First Aid)',
        dosage: 'CHEW 1 tablet (300mg) immediately with saliva — DO NOT swallow whole with water',
        duration: 'Single emergency loading dose immediately',
        purpose: 'Rapidly inhibits platelet aggregation to prevent the coronary thrombus/clot from growing larger',
        precautions: 'EMERGENCY FIRST AID. Do not give if known severe aspirin allergy or active major bleeding.',
      },
      {
        name: 'Sorbitrate (Isosorbide Dinitrate) 5mg (Only if previously prescribed for heart patients)',
        dosage: '1 tablet placed UNDER the tongue (sublingual); allow to dissolve',
        duration: 'Single dose',
        purpose: 'Dilates coronary arteries and reduces cardiac preload',
        precautions: 'Do not take if patient feels dizzy, faint, or BP is low.',
      },
    ],
    homeRemedies: [
      'CALL 108 AMBULANCE IMMEDIATELY! Do not waste time trying home remedies or thinking it is simple "gas"!',
      'Keep patient sitting in a half-reclined W-position with back supported; loosen tight collar, belt, and clothes.',
      'Ensure continuous fresh air ventilation; keep patient calm and avoid any physical walking or exertion.',
    ],
    warningSigns: [
      'Cold clammy sweating, pale ashen face, feeling of impending doom.',
      'Loss of consciousness or gasping for breath (Begin CPR chest compressions immediately if no pulse).',
    ],
    testsAndReferrals: ['RUSH TO NEAREST EMERGENCY HOSPITAL WITH ECG & ICU FACILITIES. DIAL 108!'],
    prevention: ['Immediate hospital care saves lives within the first "Golden Hour".'],
  },

  {
    id: 'snake_bite',
    category: 'Emergency',
    title: 'Snake Bite Emergency Protocol',
    isEmergency: true,
    keywords: [
      'snake bite', 'snake', 'cobra', 'viper', 'krait', 'saanp kaatna', 'paamu kaatu', 'sarpa kaatu'
    ],
    overview: 'LIFE-THREATENING EMERGENCY: Envenomation from venomous snake (Russell\'s Viper, Saw-scaled Viper, Cobra, or Common Krait) causing neurotoxicity, hemotoxicity, or rapid local tissue necrosis.',
    possibleConditions: ['Venomous Snake Envenomation (Neurotoxic / Hemotoxic)'],
    medicines: [
      {
        name: 'Polyvalent Anti-Snake Venom (ASV) Serum',
        dosage: 'Administered intravenously by doctors at hospital following formal protocol',
        duration: 'Emergency hospital treatment only',
        purpose: 'Neutralizes circulating snake venom in the bloodstream',
        precautions: 'Must ONLY be given at a Primary Health Centre, Community Health Centre, or District Hospital by medical staff.',
      },
    ],
    homeRemedies: [
      'DO NOT PANIC: Keep the victim calm and strictly still. Movement causes venom to circulate faster through lymphatics.',
      'IMMOBILIZE THE BITTEN LIMB: Support the limb with a firm splint (wood/bamboo stick) and crepe bandage just like a bone fracture.',
      'CRITICAL DANGERS - NEVER DO THESE: NEVER cut the wound, NEVER try to suck venom out, NEVER apply ice, and NEVER tie tight rope tourniquets that stop arterial blood flow (causes gangrene!).',
      'Remove rings, bangles, anklets, and shoes before swelling develops.',
      'RUSH IMMEDIATELY TO THE NEAREST PHC/CHC BY VEHICLE. DO NOT VISIT FAITH HEALERS OR TANTRICS!',
    ],
    warningSigns: [
      'Neurotoxic signs: drooping eyelids (Ptosis), difficulty swallowing saliva, slurred speech, respiratory paralysis.',
      'Hemotoxic signs: continuous bleeding from puncture fang marks, bleeding from gums, dark red urine.',
    ],
    testsAndReferrals: ['20-Minute Whole Blood Clotting Test (20WBCT) and Anti-Snake Venom (ASV) at PHC/Hospital.'],
    prevention: ['Use a torch/flashlight at night in fields; avoid reaching into dark crevices; use tall boots.'],
  },

  {
    id: 'dog_animal_bite',
    category: 'Emergency',
    title: 'Dog / Animal Bite (Rabies Prevention)',
    isEmergency: true,
    keywords: [
      'dog bite', 'animal bite', 'puppy bite', 'monkey bite', 'cat scratch',
      'kutta kaatna', 'kukka katlu', 'pilli katlu', 'rabies'
    ],
    overview: 'Bite or scratch by dog, cat, monkey, or bat carrying potential transmission of fatal Rabies virus or secondary bacterial wound infection.',
    possibleConditions: ['Category II / III Animal Bite Exposure (Rabies Risk)'],
    medicines: [
      {
        name: 'Anti-Rabies Vaccine (ARV) - Rabipur / Abhayrab',
        dosage: 'Intramuscular / Intradermal schedule on Days 0, 3, 7, 14, and 28',
        duration: 'Full course as per government schedule',
        purpose: 'Stimulates active protective antibodies against fatal Rabies virus before it reaches the nervous system',
        precautions: 'Available completely FREE at all government PHCs, CHCs, and District Hospitals. Never skip a dose.',
      },
      {
        name: 'Rabies Immunoglobulin (RIG) - For Category III (bleeding bites)',
        dosage: 'Infiltrated into and around the bite wound on Day 0',
        duration: 'Single dose',
        purpose: 'Provides immediate passive neutralizing antibodies at the wound site',
        precautions: 'Essential for bleeding bites or bites near face/head.',
      },
      {
        name: 'Amoxicillin + Clavulanic Acid 625mg (Augmentin)',
        dosage: '1 tablet twice daily for 5 days as prescribed',
        duration: '5 days',
        purpose: 'Prevents Pasteurella and anaerobic bacterial infection from animal saliva',
        precautions: 'Take with food.',
      },
    ],
    homeRemedies: [
      'CRITICAL FIRST AID: Immediately wash the bite wound thoroughly under brisk running tap water with soap for a FULL 15 MINUTES! This simple washing kills over 90% of the rabies virus particles at the wound site.',
      'Apply Povidone-Iodine 5% (Betadine) ointment after thorough washing.',
      'NEVER apply red chilli powder, lime, cow dung, or plant juice to the wound.',
      'NEVER stitch or suture a fresh animal bite wound.',
    ],
    warningSigns: [
      'Rabies once symptoms appear is 100% FATAL. Prophylaxis within 24 hours of bite is 100% PREVENTABLE!',
      'Any bleeding bite, bite from stray/aggressive animal, or bite on head/neck/hands is highest priority.',
    ],
    testsAndReferrals: ['RUSH TO NEAREST PHC/CHC WITHIN 24 HOURS FOR ANTI-RABIES VACCINE (ARV).'],
    prevention: ['Vaccinate domestic pets against rabies; never provoke sleeping or feeding animals.'],
  },
];

const { getLocalizedTabletAdvice } = require('./tabletGuidance');

// ─────────────────────────────────────────────────────────────
// Multilingual Keywords Mapping for Indian Rural Languages
// ─────────────────────────────────────────────────────────────
const MULTILINGUAL_KEYWORDS = {
  viral_fever: [
    'జ్వరం', 'జ్వరంగా ఉంది', 'ఒళ్ళు నొప్పులు', 'ఒంటి నొప్పులు', 'శరీర నొప్పులు', 'నొప్పులు',
    'ఒళ్ళు నొప్పులుగా ఉంది', 'చలి', 'వణుకు', 'నీరసం', 'వేడి', 'తీవ్రమైన జ్వరం',
    'బుఖార్', 'బుఖార', 'బదన్ దర్ద్',
    'बुखार', 'बदन दर्द', 'शरीर में दर्द', 'कमजोरी', 'कंपकंपी', 'हरारत', 'ताप', 'तेज बुखार',
    'காய்ச்சல்', 'உடல் வலி', 'நடுக்கம்', 'জ্বর', 'গা ব্যথা', 'দুর্বলতা'
  ],
  dengue_fever: [
    'డెంగ్యూ', 'ప్లేట్‌లెట్స్', 'కళ్ళ వెనుక నొప్పి',
    'डेंगू', 'प्लेटलेट्स'
  ],
  malaria: [
    'మలేరియా', 'చలి జ్వరం', 'వణుకు జ్వరం',
    'मलेरिया', 'ठंड लगकर बुखार', 'कंपकंपी बुखार'
  ],
  typhoid: [
    'టైఫాయిడ్', 'ముదిరిన జ్వరం',
    'टाइफाइड', 'मियादी बुखार'
  ],
  common_cold: [
    'జలుబు', 'ముక్కు కారడం', 'తుమ్ములు', 'ముక్కు దిబ్బడ', 'దగ్గు & జలుబు',
    'జుకామ్', 'సర్దీ',
    'जुकाम', 'सर्दी', 'छींक', 'नाक बहना', 'बंद नाक'
  ],
  dry_cough: [
    'పొడి దగ్గు', 'దగ్గు', 'గొంతు గరగర',
    'సూఖీ ఖాసీ',
    'सूखी खांसी', 'खांसी', 'गले में खराश'
  ],
  wet_cough_bronchitis: [
    'కఫం దగ్గు', 'తెమడ', 'కఫం', 'ఛాతీలో కఫం',
    'बलगम वाली खांसी', 'बलगम', 'कफ'
  ],
  sore_throat: [
    'గొంతు నొప్పి', 'గొంతు మంట', 'టాన్సిల్స్', 'మింగలేకపోవడం',
    'गले में दर्द', 'गला खराब', 'गले में सूजन'
  ],
  asthma_wheezing: [
    'ఆయాసం', 'శ్వాస తీసుకోవడంలో ఇబ్బంది', 'దమ్ము', 'ఊపిరి ఆడకపోవడం',
    'दमा', 'अस्थमा', 'सांस फूलना', 'सांस लेने में दिक्कत'
  ],
  acidity_gerd: [
    'ఎసిడిటీ', 'అసిడిటీ', 'గుండెల్లో మంట', 'పుల్లటి తేన్పులు', 'కడుపులో మంట', 'గ్యాస్',
    'एसिडिटी', 'सीने में जलन', 'खट्टी डकार', 'पेट में जलन'
  ],
  diarrhea_loose_motions: [
    'విరేచనాలు', 'మోషన్స్', 'నీళ్ల విరేచనాలు', 'కడుపు కదలికలు',
    'విరేచనం', 'మోషన్',
    'दस्त', 'लूज मोशन', 'पतले दस्त', 'पेचिश'
  ],
  stomach_pain_cramps: [
    'కడుపు నొప్పి', 'కడుపులో నొప్పి', 'కడుపు తిప్పడం', 'కడుపు ఉబ్బరం', 'కడుపు పిసికినట్టు',
    'కడుపు',
    'पेट दर्द', 'पेट में दर्द', 'पेट में तेज दर्द', 'पेट में मरोड़', 'पेट ऐंठन', 'मरोड़'
  ],
  constipation: [
    'మలబద్ధకం', 'మోషన్ సాఫీగా కాకపోవడం',
    'कब्ज', 'पेट साफ न होना'
  ],
  vomiting_nausea: [
    'వాంతులు', 'వికారం', 'వాంతి రావడం',
    'उल्टी', 'जी मिचलाना', 'वमन'
  ],
  headache_migraine: [
    'తల నొప్పి', 'తలనొప్పి', 'ఒంటి తలనొప్పి', 'తీవ్రమైన తలనొప్పి',
    'తల',
    'सिर दर्द', 'सिरदर्द', 'माइग्रेन', 'आधे सिर में दर्द'
  ],
  back_pain_joint_pain: [
    'కీళ్ల నొప్పులు', 'కీళ్ల వాపు', 'ఎముకలు లేదా కీళ్ల వాపు', 'మోకాళ్ళ నొప్పులు', 'నడుము నొప్పి', 'వెన్ను నొప్పి', 'కీళ్ళ నొప్పు',
    'हड्डियों या जोड़ों में सूजन', 'जोड़ों का दर्द', 'घुटने का दर्द', 'कमर दर्द', 'पीठ दर्द'
  ],
  toothache_dental: [
    'పంటి నొప్పి', 'చిగుళ్ల వాపు', 'పన్ను నొప్పి',
    'दांत दर्द', 'दांत में दर्द', 'मसूड़ों में सूजन'
  ],
  fungal_infection: [
    'తామర', 'గజ్జి', 'చర్మంపై పొట్టు',
    'दाद', 'खाज', 'फंगल इन्फेक्शन'
  ],
  scabies: [
    'గజ్జి', 'రాత్రి దురద', 'వేళ్ళ మధ్య దురద',
    'स्कैबीज', 'रात में खुजली'
  ],
  allergy_rash_urticaria: [
    'చర్మ దురద', 'దద్దుర్లు', 'ఎర్రటి దద్దుర్లు', 'దురద',
    'खुजली', 'चकत्ते', 'पित्ती', 'एलर्जी'
  ],
  minor_cuts_burns: [
    'గాయం', 'కాలిన గాయం', 'రక్తం కారడం', 'తెగిన గాయం',
    'చोट', 'घाव', 'जलना', 'कटना'
  ],
  diabetes_management: [
    'షుగర్ వ్యాధి', 'డయాబెటిస్', 'రక్తంలో చక్కెర',
    'शुगर', 'मधुमेह', 'डायबिटीज'
  ],
  hypertension_bp: [
    'బీపీ', 'రక్తపోటు', 'హై బీపీ',
    'ब्लड प्रेशर', 'हाई ब्लड प्रेशर'
  ],
  menstrual_cramps: [
    'పీరియడ్స్ నొప్పి', 'నెలసరి నొప్పి', 'రుతుక్రమ నొప్పి',
    'मासिक धर्म दर्द', 'पीरियड्स का दर्द'
  ],
  uti_urinary_infection: [
    'మూత్రంలో మంట', 'మూత్రం పోసేటప్పుడు నొప్పి',
    'पेशाब में जलन', 'यूरिन इन्फेक्शन'
  ],
  chest_pain_emergency: [
    'గుండె నొప్పి', 'ఛాతీ నొప్పి', 'ఛాతీలో బరువు',
    'सीने में तेज दर्द', 'सीने में दर्द', 'छाती में दर्द', 'दिल का दौरा'
  ],
  snake_bite: [
    'పాము కాటు', 'పాము కరిచింది',
    'सांप का काटना', 'सर्पदंश'
  ],
  dog_animal_bite: [
    'కుక్క కాటు', 'కుక్క కరిచింది', 'జంతువు కాటు',
    'कुत्ते का काटना', 'कुत्ते ने काटा'
  ],
};

// ─────────────────────────────────────────────────────────────
// Intelligent Symptom Matcher Engine
// ─────────────────────────────────────────────────────────────
function matchCondition(userText) {
  if (!userText || typeof userText !== 'string') return null;
  const text = userText.toLowerCase().trim();

  let bestMatch = null;
  let highestScore = 0;

  for (const cond of CONDITIONS) {
    let score = 0;
    const allKeywords = [...cond.keywords, ...(MULTILINGUAL_KEYWORDS[cond.id] || [])];

    for (const kw of allKeywords) {
      const lowerKw = kw.toLowerCase().trim();
      if (!lowerKw) continue;
      if (text.includes(lowerKw)) {
        const wordCount = lowerKw.split(/\s+/).length;
        score += wordCount >= 2 ? wordCount * 5 : 3;
      }
    }

    // Secondary semantic boosts
    if (cond.id === 'stomach_pain_cramps') {
      if (text.includes('కడుపు') && (text.includes('నొప్పి') || text.includes('బాధ') || text.includes('తిప్పడం') || text.includes('ఉబ్బరం'))) {
        score += 10;
      }
      if (text.includes('पेट') && (text.includes('दर्द') || text.includes('मरोड़') || text.includes('ऐंठन'))) {
        score += 10;
      }
    }
    if (cond.id === 'headache_migraine') {
      if (text.includes('తల') && text.includes('నొప్పి')) score += 10;
      if (text.includes('सिर') && text.includes('दर्द')) score += 10;
    }
    if (cond.id === 'viral_fever') {
      if (text.includes('ఒళ్ళు') || text.includes('ఒంటి') || text.includes('శరీర')) score += 8;
      if (text.includes('బదన్') || text.includes('बदन') || text.includes('बुखार')) score += 8;
    }
    if (cond.id === 'back_pain_joint_pain') {
      if (text.includes('కీళ్ల') || text.includes('కీళ్ళ') || text.includes('ఎముకలు') || text.includes('మోకాళ్ళ')) score += 9;
      if (text.includes('जोड़ों') || text.includes('घुटने') || text.includes('कमर')) score += 9;
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = cond;
    }
  }

  // Minimum threshold to prevent false positives
  if (highestScore >= 3) {
    return bestMatch;
  }

  return null;
}

// ─────────────────────────────────────────────────────────────
// Multilingual Formatter
// Direct, concise tablet suggestions tailored for rural healthcare
// ─────────────────────────────────────────────────────────────
function formatConditionResponse(condition, userMessage, language = 'en') {
  const isTe = language === 'te';
  const isHi = language === 'hi';
  const isTa = language === 'ta';
  const isBn = language === 'bn';
  const isEs = language === 'es';

  const advice = getLocalizedTabletAdvice(condition.id, language, userMessage);

  let formattedText = '';
  if (isTe) {
    formattedText = `🔍 **మీ సమస్య:** ${advice.symptom}

💊 **సిఫార్సు చేయబడిన మాత్ర (Tablet):**
• **${advice.tablet}**
  - మోతాదు: ${advice.dosage}
  - ప్రయోజనం: ${advice.purpose}
  - జాగ్రత్త: ${advice.precaution}

🌿 **సాధారణ సంరక్షణ:**
• ${advice.homeCare}

⚠️ **ముఖ్య గమనిక:**
• ${advice.warning}`;
  } else if (isHi) {
    formattedText = `🔍 **आपकी समस्या:** ${advice.symptom}

💊 **सुझाई गई गोली (Tablet):**
• **${advice.tablet}**
  - खुराक: ${advice.dosage}
  - लाभ: ${advice.purpose}
  - सावधानी: ${advice.precaution}

🌿 **घरेलू देखभाल:**
• ${advice.homeCare}

⚠️ **महत्वपूर्ण सूचना:**
• ${advice.warning}`;
  } else if (isTa || isBn || isEs) {
    formattedText = `🔍 **${advice.symptom}**

💊 **${advice.tablet}**
• Dosage: ${advice.dosage}
• Purpose: ${advice.purpose}
• Care: ${advice.homeCare}

⚠️ ${advice.warning}`;
  } else {
    // English default
    formattedText = `🔍 **Your Symptom:** ${advice.symptom}

💊 **Recommended Tablet:**
• **${advice.tablet}**
  - Dosage: ${advice.dosage}
  - Purpose: ${advice.purpose}
  - Caution: ${advice.precaution}

🌿 **Simple Care:**
• ${advice.homeCare}

⚠️ **Important Notice:**
• ${advice.warning}`;
  }

  return {
    text: formattedText,
    spokenText: advice.spokenText,
    toString() {
      return this.text;
    },
  };
}

// Fallback when specific keywords don't trigger a distinct condition
function getGeneralSymptomGuidance(userMessage, language = 'en') {
  const advice = getLocalizedTabletAdvice(null, language, userMessage);
  const isTe = language === 'te';
  const isHi = language === 'hi';

  let formattedText = '';
  if (isTe) {
    formattedText = `🔍 **మీ సమస్య:** ${advice.symptom}

💊 **సిఫార్సు చేయబడిన ప్రాథమిక మాత్ర:**
• **${advice.tablet}**
  - మోతాదు: ${advice.dosage}
  - ప్రయోజనం: ${advice.purpose}
  - జాగ్రత్త: ${advice.precaution}

🌿 **సాధారణ సంరక్షణ:**
• ${advice.homeCare}
• మరింత స్పష్టమైన సలహా కోసం మీ ప్రధాన లక్షణాన్ని (జ్వరం, కడుపు నొప్పి, దగ్గు వంటివి) తెలపండి.

⚠️ **ముఖ్య గమనిక:**
• ${advice.warning}`;
  } else if (isHi) {
    formattedText = `🔍 **आपकी स्थिति:** ${advice.symptom}

💊 **प्राथमिक सुरक्षित दवा:**
• **${advice.tablet}**
  - खुराक: ${advice.dosage}
  - लाभ: ${advice.purpose}
  - सावधानी: ${advice.precaution}

🌿 **घरेलू देखभाल:**
• ${advice.homeCare}
• सटीक सलाह के लिए कृपया अपना मुख्य लक्षण (जैसे बुखार, पेट दर्द, खांसी) बताएं।

⚠️ **महत्वपूर्ण सूचना:**
• ${advice.warning}`;
  } else {
    formattedText = `🔍 **Your Symptoms:** ${advice.symptom}

💊 **Primary Recommended Relief:**
• **${advice.tablet}**
  - Dosage: ${advice.dosage}
  - Purpose: ${advice.purpose}
  - Caution: ${advice.precaution}

🌿 **Simple Care:**
• ${advice.homeCare}

⚠️ **Important Notice:**
• ${advice.warning}`;
  }

  return {
    text: formattedText,
    spokenText: advice.spokenText,
    toString() {
      return this.text;
    },
  };
}

module.exports = {
  CONDITIONS,
  matchCondition,
  formatConditionResponse,
  getGeneralSymptomGuidance,
};
