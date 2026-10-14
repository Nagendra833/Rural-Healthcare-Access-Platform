/**
 * Frontend Clinical Profiles & Medication Knowledge Base
 * Specialty-specific diagnoses, verified medicines, dosages, and diagnostic findings
 */

export const CLINICAL_PROFILES = {
  bone: {
    key: 'bone',
    label: 'Bone & Joint / Orthopedic Scan',
    domain: 'Orthopedics & Diagnostic Radiology',
    documentType: 'Bone Diagnostic Scan & Orthopedic Report',
    doctorName: 'Dr. Vikram Reddy (MS Ortho, Senior Orthopedic Specialist)',
    diagnoses: [
      'Hairline Cortical Fissure / Bone Contusion',
      'Post-Traumatic Musculoskeletal Spasm & Joint Inflammation',
      'Mild Osteopenia / Calcium & Vitamin D3 Deficiency',
    ],
    medications: [
      {
        name: 'Shelcal 500 (Calcium Carbonate 500mg + Vitamin D3 250 IU)',
        dosage: '500mg',
        frequency: '1-0-0 after lunch',
        duration: '30 days',
        purpose: 'Accelerates bone remineralization & cortical healing',
      },
      {
        name: 'Zerodol-P (Aceclofenac 100mg + Paracetamol 325mg)',
        dosage: '100mg/325mg',
        frequency: '1-0-1 after meals',
        duration: '5 days',
        purpose: 'Controls acute bone ache, joint swelling & musculoskeletal inflammation',
      },
      {
        name: 'Muscoril / Thiocolchicoside 4mg (Muscle Relaxant)',
        dosage: '4mg',
        frequency: '1-0-1 after food',
        duration: '5 days',
        purpose: 'Relieves protective muscle guarding & spasms around the injured bone',
      },
      {
        name: 'Volini / Diclofenac Topical Pain Relief Gel 1.16%',
        dosage: 'Apply thin layer',
        frequency: '3 times daily',
        duration: '7 days',
        purpose: 'Targeted local anti-inflammatory comfort',
      },
      {
        name: 'Pantoprazole 40mg (Pan 40)',
        dosage: '40mg',
        frequency: '1-0-0 before breakfast',
        duration: '5 days',
        purpose: 'Protects gastric lining during anti-inflammatory medication',
      },
    ],
    labResults: [
      {
        testName: 'Digital X-Ray / Bone Radiology Scan (AP & Lateral View)',
        value: 'Hairline undisplaced cortical fissure visible; bony alignment intact; no joint dislocation',
        normalRange: 'Intact bony cortex without fracture line',
        status: 'Abnormal',
      },
      {
        testName: 'Serum Calcium',
        value: '8.6 mg/dL',
        normalRange: '8.5–10.2 mg/dL',
        status: 'Normal',
      },
      {
        testName: '25-Hydroxy Vitamin D3',
        value: '18.4 ng/mL',
        normalRange: '30.0–100.0 ng/mL',
        status: 'Low',
      },
    ],
    vitals: {
      bp: '122/78 mmHg',
      pulse: '76 bpm',
      temperature: '98.4°F',
      weight: '64 kg',
      spo2: '99%',
    },
    followUpDate: 'In 2 weeks for repeat clinical check & control X-ray',
    advice:
      'Strictly avoid bearing heavy weight or high-impact stress on the affected limb. Keep supported with a firm crepe bandage or splint. Consume milk, ragi porridge, and calcium-rich foods. Elevate the limb while resting to minimize swelling.',
    summary:
      'Diagnostic radiological scan confirms bone fissure/strain with associated musculoskeletal swelling. Prescribed targeted bone remineralization therapy, anti-inflammatory relief, muscle relaxant, and gastroprotective support.',
  },

  stomach: {
    key: 'stomach',
    label: 'Stomach & Gastro / Acidity & Colic',
    domain: 'Gastroenterology & Digestive Health',
    documentType: 'Gastroenterology Diagnostic Report & Prescription',
    doctorName: 'Dr. Suresh Patil (MD Internal Medicine, Gastroenterologist)',
    diagnoses: [
      'Acute Gastritis & Peptic Irritation',
      'Abdominal Smooth Muscle Colic / Intestinal Spasms',
      'Non-Ulcer Dyspepsia & Acid Reflux',
    ],
    medications: [
      {
        name: 'Pantoprazole 40mg + Domperidone 30mg (Pan-D)',
        dosage: '40mg/30mg',
        frequency: '1-0-0 before breakfast on empty stomach',
        duration: '14 days',
        purpose: 'Suppresses excess acid secretion & prevents bile reflux',
      },
      {
        name: 'Drotaverine Hydrochloride 80mg (Drotin-80)',
        dosage: '80mg',
        frequency: '1-0-1 as needed for pain',
        duration: '3 days',
        purpose: 'Relieves acute abdominal cramps & visceral smooth muscle spasms',
      },
      {
        name: 'Digene / Magaldrate 400mg + Simethicone 20mg Gel',
        dosage: '10ml',
        frequency: 'After meals & bedtime',
        duration: '7 days',
        purpose: 'Instant soothing barrier for stomach lining & gas dispersion',
      },
      {
        name: 'Bacillus clausii Spores (Probiotic Suspension)',
        dosage: '1 mini bottle',
        frequency: 'Once daily after lunch',
        duration: '5 days',
        purpose: 'Restores beneficial intestinal microflora',
      },
    ],
    labResults: [
      {
        testName: 'Whole Abdomen Ultrasound Scan',
        value: 'Mild antral mucosal thickening; liver, gallbladder, pancreas & kidneys normal',
        normalRange: 'Normal abdominal echotexture',
        status: 'Normal',
      },
      {
        testName: 'Helicobacter pylori Stool Antigen',
        value: 'Negative',
        normalRange: 'Negative',
        status: 'Normal',
      },
    ],
    vitals: {
      bp: '118/76 mmHg',
      pulse: '74 bpm',
      temperature: '98.6°F',
      weight: '58 kg',
      spo2: '98%',
    },
    followUpDate: 'In 10 days if heartburn or colic recurs',
    advice:
      'Avoid spicy, oily, deep-fried foods, citrus fruits, and caffeinated drinks. Eat small, easily digestible meals at fixed intervals. Drink tender coconut water and cold milk. Do not lie down within 2 hours of eating.',
    summary:
      'Clinical assessment confirms acute gastritis with spasmodic abdominal colic. Prescribed targeted proton-pump inhibition, visceral antispasmodic, oral antacid barrier, and gut probiotics.',
  },

  skin: {
    key: 'skin',
    label: 'Skin & Dermatology / Fungal & Rash',
    domain: 'Dermatology & Cutaneous Medicine',
    documentType: 'Dermatological Clinical Note & Prescription',
    doctorName: 'Dr. Meera Nambiar (MD Dermatology, Consultant Dermatologist)',
    diagnoses: [
      'Tinea Corporis (Fungal Ringworm Infection)',
      'Allergic Contact Dermatitis with Pruritic Erythema',
      'Secondary Cutaneous Barrier Disruption',
    ],
    medications: [
      {
        name: 'Itraconazole 100mg Capsules (Candiforce)',
        dosage: '100mg',
        frequency: '1-0-1 after full meals',
        duration: '14 days',
        purpose: 'Systemic antifungal agent eradicating fungal dermatophytes',
      },
      {
        name: 'Luliconazole 1% or Clotrimazole 1% Cream',
        dosage: 'Apply thin layer',
        frequency: 'Twice daily on clean, dry skin',
        duration: '14 days',
        purpose: 'Topical fungal clearance and barrier soothing',
      },
      {
        name: 'Levocetirizine 5mg (Levocet)',
        dosage: '5mg',
        frequency: '0-0-1 at bedtime',
        duration: '7 days',
        purpose: 'Relieves intense skin itching, hives & redness',
      },
      {
        name: 'Candid Dusting Powder (Clotrimazole 1%)',
        dosage: 'Dust gently over skin folds',
        frequency: 'Twice daily after bath',
        duration: '21 days',
        purpose: 'Moisture absorption & prevents fungal recurrence',
      },
    ],
    labResults: [
      {
        testName: 'KOH Mount Skin Scraping Examination',
        value: 'Branching fungal hyphae and arthrospores present',
        normalRange: 'No fungal elements seen',
        status: 'Abnormal',
      },
    ],
    vitals: {
      bp: '120/80 mmHg',
      pulse: '72 bpm',
      temperature: '98.4°F',
      weight: '62 kg',
      spo2: '99%',
    },
    followUpDate: 'In 2 weeks after finishing antifungal course',
    advice:
      'Keep affected skin clean and completely dry. Wear loose, breathable cotton clothes. Do not share towels, combs, or bedsheets. Wash clothes in hot water and sun-dry thoroughly.',
    summary:
      'Dermatological scraping confirms fungal dermatophytosis with allergic inflammation. Prescribed oral antifungal therapy, topical luliconazole, antipruritic coverage, and antifungal dusting powder.',
  },

  dental: {
    key: 'dental',
    label: 'Dental & Oral Health / Toothache',
    domain: 'Dentistry & Maxillofacial Care',
    documentType: 'Dental Diagnostic Note & Prescription',
    doctorName: 'Dr. Rajesh Sharma (BDS, MDS Oral & Maxillofacial Specialist)',
    diagnoses: [
      'Acute Dental Pulpitis & Periapical Inflammation',
      'Localized Dental Caries (Cavity)',
      'Marginal Gingivitis with Tissue Tenderness',
    ],
    medications: [
      {
        name: 'Augmentin 625 (Amoxicillin 500mg + Clavulanic Acid 125mg)',
        dosage: '625mg',
        frequency: '1-0-1 after food',
        duration: '5 days',
        purpose: 'Controls bacterial dental pulp and periapical tissue infection',
      },
      {
        name: 'Combiflam (Ibuprofen 400mg + Paracetamol 325mg)',
        dosage: '1 tablet',
        frequency: '1-0-1 after meals',
        duration: '3 days',
        purpose: 'Relieves intense throbbing toothache and facial tissue swelling',
      },
      {
        name: 'Chlorhexidine 0.2% Antiseptic Oral Rinse (Hexidine)',
        dosage: '10ml rinse',
        frequency: 'Twice daily for 45 seconds after brushing',
        duration: '7 days',
        purpose: 'Germicidal mouthwash eliminating pathogenic oral bacteria',
      },
      {
        name: 'Metronidazole 400mg (Flagyl)',
        dosage: '400mg',
        frequency: '1-0-1 after food',
        duration: '5 days',
        purpose: 'Eradicates deep anaerobic bacterial colonies in periodontal pockets',
      },
    ],
    labResults: [
      {
        testName: 'Intraoral Periapical Dental Radiograph (IOPA X-Ray)',
        value: 'Radiolucency extending into coronal pulp space; periapical ligament widening at root apex',
        normalRange: 'Intact enamel, dentin, and normal periapical lamina dura',
        status: 'Abnormal',
      },
    ],
    vitals: {
      bp: '124/82 mmHg',
      pulse: '78 bpm',
      temperature: '98.8°F',
      weight: '68 kg',
      spo2: '98%',
    },
    followUpDate: 'In 4 days for root canal therapy / dental restoration',
    advice:
      'Rinse with warm salt water after every meal. Avoid chewing hard or sticky foods on the affected side. Avoid very hot or icy beverages. Brush gently with a soft-bristled toothbrush.',
    summary:
      'IOPA dental radiograph confirms acute pulpitis with localized caries. Prescribed broad-spectrum antibiotic coverage, dual-action analgesic, anaerobic protection, and antiseptic oral rinse.',
  },

  cardio: {
    key: 'cardio',
    label: 'Heart & BP / Cardiovascular',
    domain: 'Cardiovascular Medicine',
    documentType: 'Cardiology Consultation & Diagnostic Summary',
    doctorName: 'Dr. Ananya Rao (MD, DM Cardiology, Senior Medical Officer)',
    diagnoses: [
      'Stage 2 Essential Hypertension',
      'Cardiovascular Risk Assessment with Mild Hyperlipidemia',
      'Tension Arterial Strain',
    ],
    medications: [
      {
        name: 'Telma-AM (Telmisartan 40mg + Amlodipine 5mg)',
        dosage: '40mg/5mg',
        frequency: '1-0-0 in morning after food',
        duration: '30 days',
        purpose: 'Dual arterial vasodilation & 24-hour blood pressure control',
      },
      {
        name: 'Atorvastatin 10mg (Atorva-10)',
        dosage: '10mg',
        frequency: '0-0-1 at bedtime',
        duration: '30 days',
        purpose: 'Lowers LDL cholesterol & stabilizes vascular endothelium',
      },
      {
        name: 'Ecosprin 75mg (Enteric Coated Aspirin)',
        dosage: '75mg',
        frequency: '1-0-0 after lunch',
        duration: '30 days',
        purpose: 'Prevents micro-thrombus aggregation in coronary vessels',
      },
    ],
    labResults: [
      {
        testName: 'Resting 12-Lead Electrocardiogram (ECG)',
        value: 'Normal sinus rhythm; heart rate 78 bpm; no acute ST segment elevation',
        normalRange: 'Normal sinus rhythm',
        status: 'Normal',
      },
      {
        testName: 'Lipid Profile - Total Cholesterol',
        value: '228 mg/dL',
        normalRange: '<200 mg/dL',
        status: 'High',
      },
    ],
    vitals: {
      bp: '148/92 mmHg',
      pulse: '78 bpm',
      temperature: '98.4°F',
      weight: '72 kg',
      spo2: '98%',
    },
    followUpDate: 'In 30 days for blood pressure & lipid re-evaluation',
    advice:
      'Strict low-sodium diet (under 1 teaspoon salt daily). Avoid processed snacks, papads, and pickles. Engage in 30 minutes of daily moderate walking. Check blood pressure weekly at village sub-centre.',
    summary:
      'Clinical evaluation confirms Stage 2 essential hypertension with elevated serum cholesterol. Prescribed combination antihypertensive therapy, statin lipid control, and antiplatelet cardioprotection.',
  },

  diabetes: {
    key: 'diabetes',
    label: 'Diabetes & Blood Sugar / Endocrine',
    domain: 'Endocrinology & Diabetology',
    documentType: 'Diabetes Diagnostic Panel & Prescription',
    doctorName: 'Dr. Sunita Sen (MD Internal Medicine, Consultant Diabetologist)',
    diagnoses: [
      'Type 2 Diabetes Mellitus (Uncontrolled Glycemia)',
      'Mild Peripheral Diabetic Neuropathy',
      'Metabolic Dysregulation',
    ],
    medications: [
      {
        name: 'Metformin Hydrochloride 500mg Extended Release (Glycomet-SR)',
        dosage: '500mg',
        frequency: '1-0-1 with breakfast & dinner',
        duration: '30 days',
        purpose: 'Reduces hepatic glucose output and improves insulin sensitivity',
      },
      {
        name: 'Teneligliptin 20mg (Zita-20)',
        dosage: '20mg',
        frequency: '1-0-0 before breakfast',
        duration: '30 days',
        purpose: 'DPP-4 inhibitor enhancing post-prandial insulin release',
      },
      {
        name: 'Methylcobalamin 1500mcg + Alpha Lipoic Acid (Rejunuron)',
        dosage: '1 capsule',
        frequency: 'Once daily at bedtime',
        duration: '30 days',
        purpose: 'Restores peripheral nerve function & prevents numbness/tingling',
      },
    ],
    labResults: [
      {
        testName: 'Fasting Blood Glucose (FBS)',
        value: '158 mg/dL',
        normalRange: '70–100 mg/dL',
        status: 'High',
      },
      {
        testName: 'Post-Prandial Blood Glucose (PPBS)',
        value: '224 mg/dL',
        normalRange: '<140 mg/dL',
        status: 'High',
      },
      {
        testName: 'Glycated Hemoglobin (HbA1c)',
        value: '8.4 %',
        normalRange: '<5.7 %',
        status: 'High',
      },
    ],
    vitals: {
      bp: '126/82 mmHg',
      pulse: '74 bpm',
      temperature: '98.6°F',
      weight: '70 kg',
      spo2: '98%',
    },
    followUpDate: 'In 30 days with repeat Fasting and Post-meal blood glucose',
    advice:
      'Strictly avoid white sugar, sweets, potatoes, and aerated beverages. Prefer millets (ragi, jowar), brown rice, and green leafy vegetables. Walk 45 minutes daily. Inspect feet daily for blisters, cuts, or numbness.',
    summary:
      'Diagnostic glycemic profile demonstrates elevated HbA1c (8.4%) indicating type 2 diabetes. Prescribed dual-action oral hypoglycemic agents, neuroprotective vitamin support, and strict dietary counseling.',
  },

  respiratory: {
    key: 'respiratory',
    label: 'Chest & Respiratory / Cough & Cold',
    domain: 'Pulmonology & Respiratory Medicine',
    documentType: 'Respiratory Diagnostic Assessment & Prescription',
    doctorName: 'Dr. Ramesh Kumar (MBBS, Rural Medical Officer)',
    diagnoses: [
      'Acute Upper Respiratory Infection & Bronchial Irritation',
      'Seasonal Viral Pharyngitis with Productive Cough',
    ],
    medications: [
      {
        name: 'Ambroxol 30mg + Guaiphenesin 100mg Syrup (Ascoril)',
        dosage: '10ml',
        frequency: '1-1-1 after food',
        duration: '5 days',
        purpose: 'Mucus expectorant clearing trapped bronchial phlegm',
      },
      {
        name: 'Montair-LC (Montelukast 10mg + Levocetirizine 5mg)',
        dosage: '1 tablet',
        frequency: '0-0-1 at bedtime',
        duration: '5 days',
        purpose: 'Controls allergic airway constriction, night coughing & sneezing',
      },
      {
        name: 'Paracetamol 650mg (Dolo 650)',
        dosage: '650mg',
        frequency: '1-0-1 as needed for fever or throat ache',
        duration: '3 days',
        purpose: 'Relieves accompanying fever, headache and malaise',
      },
      {
        name: 'Normal Saline (0.9% NaCl) Nasal Drops / Spray',
        dosage: '2 drops each nostril',
        frequency: '3 times daily',
        duration: '5 days',
        purpose: 'Non-medicated clearance of blocked nasal passages',
      },
    ],
    labResults: [
      {
        testName: 'Oxygen Saturation (SpO2)',
        value: '98 %',
        normalRange: '95–100 %',
        status: 'Normal',
      },
    ],
    vitals: {
      bp: '120/78 mmHg',
      pulse: '76 bpm',
      temperature: '99.2°F',
      weight: '60 kg',
      spo2: '98%',
    },
    followUpDate: 'In 5 days if cough or breathing difficulty worsens',
    advice:
      'Inhale warm water steam twice daily. Drink warm water frequently and avoid chilled drinks. Rest in a well-ventilated dust-free room. Take honey with ginger juice for throat comfort.',
    summary:
      'Clinical examination confirms seasonal upper respiratory inflammation with bronchial mucus. Prescribed targeted expectorant syrup, leukotriene receptor antagonist, antipyretic relief, and nasal saline drops.',
  },

  eye: {
    key: 'eye',
    label: 'Eye & Ophthalmology / Vision',
    domain: 'Ophthalmology & Visual Health',
    documentType: 'Ophthalmic Clinical Examination & Prescription',
    doctorName: 'Dr. Priya Desai (MS Ophthalmology, Eye Surgeon)',
    diagnoses: [
      'Acute Bacterial / Allergic Conjunctivitis',
      'Bilateral Ocular Surface Strain & Dryness',
    ],
    medications: [
      {
        name: 'Moxifloxacin 0.5% Ophthalmic Drops (Vigamox)',
        dosage: '1 drop in affected eye',
        frequency: '4 times daily',
        duration: '7 days',
        purpose: 'Broad-spectrum fluoroquinolone treating bacterial eye infection',
      },
      {
        name: 'Carboxymethylcellulose 0.5% Lubricant Eye Drops (Refresh)',
        dosage: '1 drop',
        frequency: '3-4 times daily',
        duration: '14 days',
        purpose: 'Relieves ocular dryness, gritty irritation and redness',
      },
      {
        name: 'Paracetamol 500mg',
        dosage: '500mg',
        frequency: '1 tablet as needed for periorbital headache',
        duration: '2 days',
        purpose: 'Mild eye and temple pain relief',
      },
    ],
    labResults: [
      {
        testName: 'Slit Lamp Biomicroscopy',
        value: 'Conjunctival injection (+2), clear cornea, anterior chamber quiet',
        normalRange: 'Quiet conjunctiva, clear cornea',
        status: 'Abnormal',
      },
      {
        testName: 'Visual Acuity (Snellen Chart)',
        value: '6/6 Both Eyes',
        normalRange: '6/6',
        status: 'Normal',
      },
    ],
    vitals: {
      bp: '120/80 mmHg',
      pulse: '72 bpm',
      temperature: '98.4°F',
      weight: '62 kg',
      spo2: '99%',
    },
    followUpDate: 'In 7 days for ocular slit-lamp review',
    advice:
      'Do not rub eyes with bare hands. Wash hands with soap frequently. Avoid screen glare and wear protective glasses outdoors. Do not share face towels or pillows.',
    summary:
      'Slit lamp examination confirms acute conjunctival inflammation. Prescribed topical fluoroquinolone antibiotic drops, lubricating ocular barrier, and strict eye hygiene guidelines.',
  },
};

/**
 * Detects the clinical profile from record fields (title, recordType, notes)
 */
export function detectProfileFromRecord(record = {}) {
  const text = [
    record.title || '',
    record.recordType || '',
    record.doctorNotes || '',
    record.notes || '',
    record.fileName || '',
    record.fileUrl || '',
  ]
    .join(' ')
    .toLowerCase();

  if (
    text.includes('dental') ||
    text.includes('tooth') ||
    text.includes('teeth') ||
    text.includes('gum') ||
    text.includes('cavity') ||
    text.includes('dent')
  ) {
    return CLINICAL_PROFILES.dental;
  }

  if (
    text.includes('bone') ||
    text.includes('ortho') ||
    text.includes('joint') ||
    text.includes('fracture') ||
    text.includes('knee') ||
    text.includes('spine') ||
    text.includes('calcium') ||
    text.includes('arthritis') ||
    text.includes('skeletal') ||
    text.includes('arm') ||
    text.includes('leg') ||
    (text.includes('scan') && !text.includes('abdomen') && !text.includes('chest')) ||
    (text.includes('xray') && !text.includes('chest') && !text.includes('tooth')) ||
    (text.includes('x-ray') && !text.includes('chest') && !text.includes('tooth'))
  ) {
    return CLINICAL_PROFILES.bone;
  }

  if (
    text.includes('stomach') ||
    text.includes('gastro') ||
    text.includes('abdomen') ||
    text.includes('acidity') ||
    text.includes('ulcer') ||
    text.includes('colic') ||
    text.includes('gastritis') ||
    text.includes('digest')
  ) {
    return CLINICAL_PROFILES.stomach;
  }

  if (
    text.includes('skin') ||
    text.includes('derma') ||
    text.includes('rash') ||
    text.includes('fungal') ||
    text.includes('allergy') ||
    text.includes('eczema') ||
    text.includes('ringworm')
  ) {
    return CLINICAL_PROFILES.skin;
  }

  if (
    text.includes('heart') ||
    text.includes('cardio') ||
    text.includes('bp') ||
    text.includes('hypertension') ||
    text.includes('ecg') ||
    text.includes('cardiac')
  ) {
    return CLINICAL_PROFILES.cardio;
  }

  if (
    text.includes('diabetes') ||
    text.includes('sugar') ||
    text.includes('glucose') ||
    text.includes('hba1c')
  ) {
    return CLINICAL_PROFILES.diabetes;
  }

  if (
    text.includes('eye') ||
    text.includes('vision') ||
    text.includes('optic') ||
    text.includes('cataract') ||
    text.includes('conjunctivitis')
  ) {
    return CLINICAL_PROFILES.eye;
  }

  return CLINICAL_PROFILES.respiratory;
}

export const CATEGORY_OPTIONS = [
  { value: 'auto', label: '✨ Auto-Detect from Document' },
  { value: 'bone', label: '🦴 Bone & Joint / Orthopedic (X-Ray, Fracture)' },
  { value: 'stomach', label: '🫄 Stomach & Digestion (Gastritis, Acidity, Colic)' },
  { value: 'skin', label: '🧴 Skin & Allergy / Dermatology (Fungal, Rash)' },
  { value: 'dental', label: '🦷 Dental & Oral Health (Toothache, Cavity)' },
  { value: 'cardio', label: '❤️ Heart & BP / Cardiology (Hypertension, ECG)' },
  { value: 'diabetes', label: '🩸 Diabetes & Sugar / Diabetology (HbA1c)' },
  { value: 'respiratory', label: '🫁 Chest & Respiratory (Cough, Phlegm, Cold)' },
  { value: 'eye', label: '👁️ Eye Care / Ophthalmology (Infection, Vision)' },
];
