/**
 * Localized Direct Tablet Recommendations for Rural Health Platform
 * Provides concise, condition-specific tablet recommendations with exact dosages,
 * home care, precautions, and spoken text in Telugu, Hindi, Tamil, Bengali, Spanish, and English.
 */

const TABLET_RECOMMENDATIONS = {
  viral_fever: {
    te: {
      symptom: 'జ్వరం మరియు ఒళ్ళు నొప్పులు',
      tablet: 'పారాసిటమాల్ 650mg (Dolo 650 / Paracetamol)',
      dosage: 'భోజనం తర్వాత 1 మాత్ర వేసుకోండి (రోజుకు 2-3 సార్లు, అవసరమైనప్పుడు మాత్రమే).',
      purpose: 'జ్వరాన్ని తగ్గించి, ఒంటి నొప్పులు మరియు కండరాల నొప్పి నుండి ఉపశమనం ఇస్తుంది.',
      precaution: 'ఖాళీ కడుపుతో వేసుకోకండి. 24 గంటల్లో 3 మాత్రలకు మించవద్దు.',
      homeCare: 'పుష్కలంగా గోరువెచ్చని నీరు, కొబ్బరి నీళ్ళు త్రాగండి మరియు తగినంత విశ్రాంతి తీసుకోండి.',
      warning: '3 రోజుల్లో జ్వరం తగ్గకపోతే లేదా తీవ్రమైన బలహీనత ఉంటే వెంటనే సమీప PHC వైద్యుడిని సంప్రదించండి.',
      spokenText: 'మీ ఒళ్ళు నొప్పులు మరియు జ్వరానికి పారాసిటమాల్ 650mg మాత్ర భోజనం తర్వాత వేసుకోండి. గోరువెచ్చని నీరు త్రాగి విశ్రాంతి తీసుకోండి. మూడు రోజుల్లో తగ్గకపోతే ప్రాథమిక ఆరోగ్య కేంద్రానికి వెళ్లండి.'
    },
    hi: {
      symptom: 'बुखार और बदन दर्द',
      tablet: 'पैरासिटामोल 650mg (Dolo 650 / Paracetamol)',
      dosage: 'भोजन के बाद 1 गोली लें (दिन में 2 से 3 बार आवश्यकतानुसार)।',
      purpose: 'बुखार और शरीर के दर्द से तुरंत राहत मिलती है।',
      precaution: 'खाली पेट न लें। 24 घंटे में 3 गोली से अधिक न लें।',
      homeCare: 'गुनगुना पानी पिएं, हल्का ताजा खाना खाएं और पूरा आराम करें।',
      warning: '3 दिन बाद भी बुखार न उतरे तो तुरंत नजदीकी प्राथमिक स्वास्थ्य केंद्र (PHC) जाएं।',
      spokenText: 'आपके बुखार और बदन दर्द के लिए पैरासिटामोल 650mg की गोली भोजन के बाद लें। गुनगुना पानी पिएं और आराम करें। तीन दिनों में आराम न मिले तो स्वास्थ्य केंद्र जाएं।'
    },
    en: {
      symptom: 'Viral Fever & Body Aches',
      tablet: 'Paracetamol 650mg (Dolo 650)',
      dosage: 'Take 1 tablet after food (2-3 times daily as needed).',
      purpose: 'Reduces temperature and relieves generalized body pains.',
      precaution: 'Do not take on an empty stomach. Do not exceed 3 tablets in 24 hours.',
      homeCare: 'Drink plenty of warm water, tender coconut water, and take complete rest.',
      warning: 'If fever persists past 3 days, visit your nearest Primary Health Centre (PHC).',
      spokenText: 'For your fever and body ache, please take Paracetamol 650mg after food. Drink warm fluids and rest well. If fever continues after three days, visit your nearest health centre.'
    },
    ta: {
      symptom: 'காய்ச்சல் மற்றும் உடல் வலி',
      tablet: 'பாராசிட்டமால் 650mg (Paracetamol / Dolo 650)',
      dosage: 'உணவுக்குப் பிறகு 1 மாத்திரை எடுத்துக் கொள்ளவும் (தேவைப்பட்டால் தினமும் 2-3 முறை).',
      purpose: 'காய்ச்சலைக் குறைத்து, உடல் வலியைப் போக்குகிறது.',
      precaution: 'வெறும் வயிற்றில் சாப்பிட வேண்டாம்.',
      homeCare: 'வெதுவெதுப்பான நீர் அருந்தவும், நல்ல ஓய்வு எடுக்கவும்.',
      warning: '3 நாட்களுக்கு மேல் காய்ச்சல் தொடர்ந்தால் PHC மருத்துவரை அணுகவும்.',
      spokenText: 'உங்கள் காய்ச்சல் மற்றும் உடல் வலிக்கு பாராசிட்டமால் 650mg மாத்திரை உணவுக்குப் பின் உட்கொள்ளவும். வெதுவெதுப்பான நீர் குடித்து ஓய்வெடுக்கவும்.'
    },
    bn: {
      symptom: 'জ্বর এবং শরীর ব্যথা',
      tablet: 'প্যারাসিটামল 650mg (Paracetamol / Dolo 650)',
      dosage: 'খাওয়ার পরে ১টি ট্যাবলেট খান (প্রয়োজনে দিনে ২-৩ বার)।',
      purpose: 'জ্বর কমায় এবং সারা শরীরের ব্যথা দূর করে।',
      precaution: 'খালি পেটে ওষুধ খাবেন না।',
      homeCare: 'প্রচুর হালকা গরম জল পান করুন এবং বিশ্রাম নিন।',
      warning: '৩ দিনের বেশি জ্বর থাকলে নিকটস্থ স্বাস্থ্যকেন্দ্রে যান।',
      spokenText: 'আপনার জ্বর এবং গা ব্যথার জন্য প্যারাসিটামল 650mg ট্যাবলেট খাওয়ার পরে খান। গরম জল পান করুন এবং বিশ্রাম নিন।'
    },
    es: {
      symptom: 'Fiebre y dolor corporal',
      tablet: 'Paracetamol 650mg',
      dosage: '1 tableta después de comer (2-3 veces al día si es necesario).',
      purpose: 'Reduce la fiebre y alivia los dolores musculares.',
      precaution: 'No tomar con el estómago vacío.',
      homeCare: 'Beba abundantes líquidos tibios y descanse.',
      warning: 'Si la fiebre continúa más de 3 días, consulte a su centro de salud.',
      spokenText: 'Para su fiebre y dolor corporal, tome Paracetamol 650mg después de las comidas. Beba agua tibia y descanse bien.'
    }
  },

  dengue_fever: {
    te: {
      symptom: 'తీవ్రమైన జ్వరం మరియు కీళ్ల నొప్పులు (డెంగ్యూ అనుమానం)',
      tablet: 'పారాసిటమాల్ 650mg మాత్ర & ORS ద్రావణం',
      dosage: 'భోజనం తర్వాత 1 మాత్ర మాత్రమే వేసుకోండి (బ్రూఫిన్ లేదా ఇతర మాత్రలు వాడవద్దు).',
      purpose: 'రక్తస్రావ ప్రమాదం లేకుండా సురక్షితంగా జ్వరాన్ని తగ్గిస్తుంది.',
      precaution: 'ముఖ్య హెచ్చరిక: ఐబుప్రోఫెన్, ఆస్పిరిన్ వంటివి అస్సలు వాడవద్దు.',
      homeCare: 'రోజూ 2-3 లీటర్ల ORS ద్రావణం, కొబ్బరి నీళ్ళు మరియు బొప్పాయి ఆకుల రసం త్రాగండి.',
      warning: 'చిగుళ్ళ నుండి రక్తం కారినా లేదా వాంతులు అయినా వెంటనే అత్యవసర ఆసుపత్రికి వెళ్ళండి.',
      spokenText: 'తీవ్రమైన జ్వరానికి పారాసిటమాల్ 650mg మాత్రమే వేసుకోండి. ORS మరియు కొబ్బరి నీళ్ళు ఎక్కువగా త్రాగండి. బ్రూఫిన్ మాత్రలు అస్సలు వాడవద్దు.'
    },
    hi: {
      symptom: 'तेज बुखार और जोड़ों में दर्द (डेंगू की संभावना)',
      tablet: 'पैरासिटामोल 650mg और ओआरएस (ORS) घोल',
      dosage: 'भोजन के बाद केवल 1 गोली लें (आईबुप्रोफेन या अन्य पेनकिलर न लें)।',
      purpose: 'सुरक्षित रूप से बुखार को कम करता है।',
      precaution: 'कड़ा निर्देश: ब्रूफेन या एस्पिरिन बिल्कुल न लें।',
      homeCare: 'खूब ओआरएस, नारियल पानी पिएं और पूरा आराम करें।',
      warning: 'मसूड़ों से खून आए या बहुत कमजोरी हो तो तुरंत अस्पताल जाएं।',
      spokenText: 'तेज बुखार में केवल पैरासिटामोल 650mg लें। ओआरएस और नारियल पानी खूब पिएं। कोई अन्य पेनकिलर न लें।'
    },
    en: {
      symptom: 'High Fever & Joint Pain (Suspected Dengue)',
      tablet: 'Paracetamol 650mg ONLY & WHO-ORS Solution',
      dosage: '1 tablet after food as needed for fever.',
      purpose: 'Lowers fever safely without risk of internal bleeding.',
      precaution: 'NEVER take Ibuprofen, Aspirin, or Diclofenac as they increase bleeding risk.',
      homeCare: 'Drink 2-3 liters of ORS fluids, tender coconut water, and take complete bed rest.',
      warning: 'If gum bleeding or severe abdominal pain occurs, rush to the hospital immediately.',
      spokenText: 'Take only Paracetamol 650mg for high fever. Drink plenty of ORS fluids and coconut water. Never take ibuprofen or aspirin.'
    }
  },

  stomach_pain_cramps: {
    te: {
      symptom: 'కడుపు నొప్పి మరియు తిమ్మిరి',
      tablet: 'మెఫ్టల్-స్పాస్ లేదా డ్రోటావరిన్ 40mg (Meftal-Spas / Drotaverine)',
      dosage: 'భోజనం తర్వాత 1 మాత్ర వేసుకోండి (నొప్పి ఉన్నప్పుడు మాత్రమే).',
      purpose: 'కడుపు కండరాల సంకోచాలు మరియు తిమ్మిరి నొప్పిని త్వరగా తగ్గిస్తుంది.',
      precaution: 'ఖాళీ కడుపుతో తీసుకోకండి. కారం, మసాలా ఆహారాలు మానేయండి.',
      homeCare: 'గోరువెచ్చని నీరు త్రాగండి, తేలికపాటి గంజి లేదా కిచిడీ తీసుకోండి.',
      warning: 'నొప్పి తగ్గకుండా తీవ్రమైతే లేదా వాంతులు వస్తే వెంటనే PHC వైద్యుడిని సంప్రదించండి.',
      spokenText: 'మీ కడుపు నొప్పికి మెఫ్టల్-స్పాస్ లేదా డ్రోటావరిన్ మాత్ర భోజనం తర్వాత వేసుకోండి. గోరువెచ్చని నీరు త్రాగి కారం తక్కువగా తినండి.'
    },
    hi: {
      symptom: 'पेट में दर्द और मरोड़',
      tablet: 'मेफ्टल-स्पास या ड्रोटावेरिन 40mg (Meftal-Spas / Drotaverine)',
      dosage: 'भोजन के बाद 1 गोली लें (केवल दर्द होने पर)।',
      purpose: 'पेट की मांसपेशियों की ऐंठन और मरोड़ को ठीक करती है।',
      precaution: 'खाली पेट न लें। मिर्च-मसालेदार खाना बंद रखें।',
      homeCare: 'गुनगुना पानी पिएं, पतली खिचड़ी या दलिया खाएं।',
      warning: 'यदि दर्द असहनीय हो या उल्टी शुरू हो तो तुरंत डॉक्टर को दिखाएं।',
      spokenText: 'आपके पेट दर्द के लिए मेफ्टल-स्पास या ड्रोटावेरिन की गोली भोजन के बाद लें। गुनगुना पानी पिएं और सादा भोजन लें।'
    },
    en: {
      symptom: 'Stomach Pain & Abdominal Cramps',
      tablet: 'Meftal-Spas (Dicyclomine + Paracetamol) or Drotaverine 40mg',
      dosage: '1 tablet after food as needed for pain.',
      purpose: 'Relieves abdominal muscle spasms and cramping pain.',
      precaution: 'Do not take on an empty stomach. Avoid oily, spicy meals.',
      homeCare: 'Drink warm water and consume light food like khichdi or rice gruel.',
      warning: 'If pain becomes severe, localized, or accompanied by vomiting, visit PHC immediately.',
      spokenText: 'For stomach pain and cramps, take Meftal-Spas or Drotaverine after food. Drink warm water and eat light meals.'
    }
  },

  acidity_gerd: {
    te: {
      symptom: 'ఎసిడిటీ, గ్యాస్ మరియు గుండెల్లో మంట',
      tablet: 'పాంటోప్రజోల్ 40mg (Pantoprazole / Pan 40)',
      dosage: 'ఉదయం అల్పాహారానికి 30 నిమిషాల ముందు (ఖాళీ కడుపుతో) 1 మాత్ర వేసుకోండి.',
      purpose: 'కడుపులో అదనపు యాసిడ్ ఉత్పత్తిని ఆపి, గ్యాస్ మరియు మంటను తగ్గిస్తుంది.',
      precaution: 'టీ, కాఫీ, వేపుళ్ళు మరియు మసాలాలు తగ్గించండి.',
      homeCare: 'చల్లటి పాలు లేదా కొబ్బరి నీళ్ళు త్రాగండి. తిన్న వెంటనే పడుకోవద్దు.',
      warning: 'ఛాతీలో విపరీతమైన నొప్పి లేదా ఎడమ చేతికి పాకే నొప్పి ఉంటే వెంటనే 108 కి కాల్ చేయండి.',
      spokenText: 'మీ ఎసిడిటీ మరియు గ్యాస్ సమస్యకు పాంటోప్రజోల్ 40mg మాత్ర ఉదయం ఖాళీ కడుపుతో వేసుకోండి. కారాలు తగ్గించి చల్లటి పాలు లేదా కొబ్బరి నీళ్ళు త్రాగండి.'
    },
    hi: {
      symptom: 'एसिडिटी, गैस और सीने में जलन',
      tablet: 'पैंटोप्राजोल 40mg (Pantoprazole / Pan 40)',
      dosage: 'सुबह नाश्ते से 30 मिनट पहले खाली पेट 1 गोली लें।',
      purpose: 'पेट में अतिरिक्त एसिड बनना रोकती है और जलन शांत करती है।',
      precaution: 'चाय, कॉफी और तला-भुना खाना बंद करें।',
      homeCare: 'ठंडा दूध या नारियल पानी पिएं। भोजन के तुरंत बाद न लेटें।',
      warning: 'सीने में भारीपन या बाएं हाथ में दर्द फैले तो तुरंत 108 पर संपर्क करें।',
      spokenText: 'एसिडिटी और गैस के लिए पैंटोप्राजोल 40mg गोली सुबह खाली पेट लें। तली-भुनी चीजें न खाएं और ठंडा दूध पिएं।'
    },
    en: {
      symptom: 'Acidity, Gas & Heartburn',
      tablet: 'Pantoprazole 40mg (Pan 40)',
      dosage: '1 tablet once daily in the morning, 30 minutes before breakfast.',
      purpose: 'Suppresses excess stomach acid and relieves burning sensation.',
      precaution: 'Avoid strong tea, coffee, smoking, and oily spicy foods.',
      homeCare: 'Sip cold milk or tender coconut water. Do not lie down immediately after meals.',
      warning: 'If severe crushing chest pain radiates to arm or jaw, call 108 immediately.',
      spokenText: 'For acidity and gas, take Pantoprazole 40mg once daily before breakfast on an empty stomach. Avoid spicy food and sip cold milk.'
    }
  },

  common_cold: {
    te: {
      symptom: 'జలుబు, తుమ్ములు మరియు ముక్కు కారడం',
      tablet: 'సెటిరిజైన్ 10mg (Cetirizine / Cetzine)',
      dosage: 'రాత్రి భోజనం తర్వాత పడుకునే ముందు 1 మాత్ర వేసుకోండి.',
      purpose: 'జలుబు, తుమ్ములు, ముక్కు కారడం మరియు గొంతు దురదను త్వరగా తగ్గిస్తుంది.',
      precaution: 'ఈ మాత్ర వేసుకున్న తర్వాత నిద్రమత్తు రావచ్చు, డ్రైవింగ్ చేయవద్దు.',
      homeCare: 'వేడి నీటి ఆవిరి పట్టండి మరియు గోరువెచ్చని నీరు త్రాగండి.',
      warning: 'తీవ్రమైన దగ్గు లేదా శ్వాసలో ఇబ్బంది ఉంటే PHC వైద్యుడిని సంప్రదించండి.',
      spokenText: 'మీ జలుబు మరియు తుమ్ములకు సెటిరిజైన్ 10mg మాత్ర రాత్రి పడుకునే ముందు వేసుకోండి. ఆవిరి పట్టి గోరువెచ్చని నీరు త్రాగండి.'
    },
    hi: {
      symptom: 'जुकाम, छींकें और बहती नाक',
      tablet: 'सेटिरिज़िन 10mg (Cetirizine / Cetzine)',
      dosage: 'रात को खाना खाने के बाद सोने से पहले 1 गोली लें।',
      purpose: 'छींक, जुकाम, नाक बहना और एलर्जी से तुरंत आराम देती है।',
      precaution: 'दवा से हल्की नींद आ सकती है, गाड़ी न चलाएं।',
      homeCare: 'गर्म पानी की भाप लें और गुनगुना पानी पिएं।',
      warning: 'खांसी या सांस लेने में तकलीफ बढ़े तो डॉक्टर को दिखाएं।',
      spokenText: 'जुकाम और छींक के लिए सेटिरिज़िन 10mg गोली रात को सोने से पहले लें। भाप लें और गुनगुना पानी पिएं।'
    },
    en: {
      symptom: 'Common Cold, Sneezing & Runny Nose',
      tablet: 'Cetirizine 10mg',
      dosage: '1 tablet once daily at bedtime after dinner.',
      purpose: 'Relieves runny nose, sneezing, nasal congestion, and allergy symptoms.',
      precaution: 'May cause mild drowsiness. Avoid driving or operating machinery.',
      homeCare: 'Take steam inhalation and drink warm water with honey.',
      warning: 'Consult a doctor if high fever or difficulty breathing develops.',
      spokenText: 'For cold and sneezing, take Cetirizine 10mg once daily at bedtime. Inhale steam and drink warm fluids.'
    }
  },

  dry_cough: {
    te: {
      symptom: 'పొడి దగ్గు మరియు గొంతు గరగర',
      tablet: 'కాఫ్ సిరప్ లేదా సెటిరిజైన్ 10mg మాత్ర',
      dosage: 'రాత్రి భోజనం తర్వాత 10ml సిరప్ లేదా 1 మాత్ర తీసుకోండి.',
      purpose: 'పొడి దగ్గును అరికట్టి, గొంతు మంటను తగ్గిస్తుంది.',
      precaution: 'చల్లటి నీరు, ఐస్‌క్రీములు మానేయండి.',
      homeCare: 'తులసి ఆకులు, అల్లం రసం, తేనె కలిపి తీసుకోండి. గోరువెచ్చని నీరు త్రాగండి.',
      warning: 'దగ్గు 7 రోజులకు మించి తగ్గకపోతే PHC లో పరీక్ష చేయించుకోండి.',
      spokenText: 'మీ పొడి దగ్గుకు కాఫ్ సిరప్ లేదా సెటిరిజైన్ మాత్ర తీసుకోండి. గోరువెచ్చని నీరు త్రాగి తేనె, అల్లం రసం తీసుకోండి.'
    },
    hi: {
      symptom: 'सूखी खांसी और गले में खराश',
      tablet: 'कफ सिरप (Dextromethorphan) या सेटिरिज़िन 10mg',
      dosage: 'रात को भोजन के बाद 10ml सिरप या 1 गोली लें।',
      purpose: 'सूखी खांसी और गले की जलन को शांत करता है।',
      precaution: 'ठंडा पानी और तली चीजें न लें।',
      homeCare: 'अदरक का रस और शहद लें, गुनगुने पानी के गरारे करें।',
      warning: 'खांसी एक हफ्ते से ज्यादा रहे तो प्राथमिक स्वास्थ्य केंद्र जाएं।',
      spokenText: 'सूखी खांसी के लिए कफ सिरप या सेटिरिज़िन गोली लें। अदरक और शहद लें और गुनगुने पानी से गरारे करें।'
    },
    en: {
      symptom: 'Dry Cough & Throat Irritation',
      tablet: 'Cough Syrup (Dextromethorphan) or Cetirizine 10mg',
      dosage: '10ml syrup or 1 tablet after food at bedtime.',
      purpose: 'Suppresses dry hacking cough and soothes inflamed throat.',
      precaution: 'Avoid cold beverages and smoking.',
      homeCare: 'Take 1 teaspoon honey with fresh ginger juice. Gargle with warm water.',
      warning: 'If cough continues beyond a week, visit your PHC for an evaluation.',
      spokenText: 'For dry cough, take cough syrup or Cetirizine at bedtime. Drink warm water with honey and ginger.'
    }
  },

  headache_migraine: {
    te: {
      symptom: 'తల నొప్పి / ఒంటి తలనొప్పి',
      tablet: 'పారాసిటమాల్ 650mg (Paracetamol / Dolo 650)',
      dosage: 'భోజనం లేదా అల్పాహారం తర్వాత 1 మాత్ర వేసుకోండి.',
      purpose: 'తలనొప్పి, కణతల నొప్పి మరియు మానసిక ఒత్తిడిని తగ్గిస్తుంది.',
      precaution: 'ఖాళీ కడుపుతో వేసుకోకండి. ఎక్కువ ఎండలో తిరగవద్దు.',
      homeCare: 'ప్రశాంతమైన, చీకటి గదిలో కాసేపు కళ్ళు మూసుకుని విశ్రాంతి తీసుకోండి.',
      warning: 'తలతిరగడం, వాంతులు లేదా కంటి చూపు మసకబారితే వెంటనే వైద్యుడిని సంప్రదించండి.',
      spokenText: 'మీ తలనొప్పికి పారాసిటమాల్ 650mg మాత్ర భోజనం తర్వాత వేసుకోండి. ప్రశాంతమైన గదిలో విశ్రాంతి తీసుకోండి.'
    },
    hi: {
      symptom: 'सिरदर्द और माइग्रेन',
      tablet: 'पैरासिटामोल 650mg (Paracetamol / Dolo 650)',
      dosage: 'नाश्ते या खाने के बाद 1 गोली लें।',
      purpose: 'सिर के दर्द और भारीपन को तुरंत दूर करती है।',
      precaution: 'खाली पेट न लें। तेज धूप और शोर से बचें।',
      homeCare: 'शांत और अंधेरे कमरे में लेटकर आराम करें, पर्याप्त पानी पिएं।',
      warning: 'उल्टी आए या चक्कर बढ़े तो तुरंत प्राथमिक स्वास्थ्य केंद्र जाएं।',
      spokenText: 'सिरदर्द के लिए पैरासिटामोल 650mg की गोली खाने के बाद लें। शांत कमरे में आराम करें और पानी पिएं।'
    },
    en: {
      symptom: 'Headache & Tension Headache',
      tablet: 'Paracetamol 650mg (Dolo 650)',
      dosage: '1 tablet after food as needed (max 3 per day).',
      purpose: 'Relieves throbbing headache and muscular tension.',
      precaution: 'Do not take on an empty stomach. Stay hydrated.',
      homeCare: 'Rest in a quiet, dark room and apply a cool wet cloth to forehead.',
      warning: 'If accompanied by stiff neck, visual changes, or vomiting, consult a doctor immediately.',
      spokenText: 'For headache, take Paracetamol 650mg after food. Rest in a quiet dark room and stay hydrated.'
    }
  },

  back_pain_joint_pain: {
    te: {
      symptom: 'కీళ్ల నొప్పులు, మోకాళ్ళ నొప్పులు లేదా నడుము నొప్పి',
      tablet: 'పారాసిటమాల్ 650mg & వోలినీ / మూవ్ జెల్ (Volini Gel)',
      dosage: 'భోజనం తర్వాత 1 మాత్ర వేసుకోండి, నొప్పి ఉన్న చోట రోజుకు 2-3 సార్లు జెల్ రాయండి.',
      purpose: 'కీళ్ల వాపు మరియు కండరాల నొప్పిని త్వరగా తగ్గిస్తుంది.',
      precaution: 'జెల్ రాసిన చోట గట్టిగా రుద్దవద్దు. బరువైన పనులు చేయవద్దు.',
      homeCare: 'గోరువెచ్చని నీటి కాపడం పెట్టండి, తగినంత విశ్రాంతి తీసుకోండి.',
      warning: 'నొప్పి తగ్గకుండా విపరీతమైన వాపు ఉంటే PHC వైద్యుడిని సంప్రదించండి.',
      spokenText: 'మీ కీళ్ల నొప్పులకు పారాసిటమాల్ 650mg మాత్ర వేసుకోండి మరియు నొప్పి ఉన్న చోట వోలినీ జెల్ రాయండి. వేడి నీటి కాపడం పెట్టండి.'
    },
    hi: {
      symptom: 'जोड़ों का दर्द, घुटनों का दर्द या कमर दर्द',
      tablet: 'पैरासिटामोल 650mg और वॉलिनी/मूव जेल (Volini Gel)',
      dosage: 'भोजन के बाद 1 गोली लें, दर्द की जगह पर जेल हल्के हाथ से लगाएं।',
      purpose: 'जोड़ों की सूजन और दर्द से आराम दिलाती है।',
      precaution: 'जेल लगाकर जोर से न रगड़ें। भारी वजन न उठाएं।',
      homeCare: 'गर्म पानी की सिकाई करें और पर्याप्त आराम करें।',
      warning: 'यदि जोड़ में अत्यधिक सूजन या चलने में लाचारी हो तो डॉक्टर से मिलें।',
      spokenText: 'जोड़ों के दर्द के लिए पैरासिटामोल 650mg गोली लें और दर्द वाली जगह पर वॉलिनी जेल लगाएं। गर्म पानी से सिकाई करें।'
    },
    en: {
      symptom: 'Back Pain, Joint Pain & Swelling',
      tablet: 'Paracetamol 650mg + Topical Gel (Volini / Moov)',
      dosage: '1 tablet after meals, apply gel gently 2-3 times daily.',
      purpose: 'Eases musculoskeletal stiffness and reduces joint aches.',
      precaution: 'Do not massage vigorously over inflamed joints.',
      homeCare: 'Apply warm fomentation and avoid heavy lifting.',
      warning: 'If severe swelling or inability to walk persists, visit your nearest health centre.',
      spokenText: 'For joint and back pain, take Paracetamol 650mg after food and apply pain relief gel gently. Use warm compression and rest.'
    }
  },

  diarrhea_loose_motions: {
    te: {
      symptom: 'విరేచనాలు మరియు నీళ్ల మోషన్స్',
      tablet: 'ORS ప్యాకెట్ & జింక్ 20mg మాత్ర (Zinc 20mg)',
      dosage: '1 ప్యాకెట్ ORS ని 1 లీటరు కాచి చల్లార్చిన నీటిలో కలిపి ప్రతి మోషన్ తర్వాత త్రాగండి.',
      purpose: 'శరీరంలో నీరు మరియు లవణాలు తగ్గకుండా కాపాడుతుంది.',
      precaution: 'కలిపిన ORS ద్రావణాన్ని 24 గంటల వరకే వాడాలి. బయటి ఆహారం తినవద్దు.',
      homeCare: 'మజ్జిగ, కొబ్బరి నీళ్ళు, బియ్యం గంజి ఎక్కువగా తీసుకోండి.',
      warning: 'మలంలో రక్తం పడినా లేదా విపరీతమైన నీరసం ఉంటే వెంటనే PHC కి వెళ్ళండి.',
      spokenText: 'మీ విరేచనాలకు ORS ద్రావణం ఎక్కువగా త్రాగండి మరియు జింక్ మాత్ర వేసుకోండి. మజ్జిగ, గంజి తాగుతూ విశ్రాంతి తీసుకోండి.'
    },
    hi: {
      symptom: 'दस्त और पतले मोशन',
      tablet: 'ओआरएस (ORS) घोल और जिंक 20mg की गोली',
      dosage: '1 पैकेट ओआरएस 1 लीटर उबले पानी में घोलें और हर दस्त के बाद पिएं।',
      purpose: 'शरीर में पानी और लवणों की कमी को तुरंत रोकता है।',
      precaution: 'बना हुआ घोल 24 घंटे के अंदर ही इस्तेमाल करें। बाहर का खाना न खाएं।',
      homeCare: 'छाछ, नारियल पानी और चावल का मांड (कांजी) पिएं।',
      warning: 'मल में खून आए या अत्यधिक कमजोरी हो तो तुरंत स्वास्थ्य केंद्र जाएं।',
      spokenText: 'दस्त के लिए ओआरएस का घोल लगातार पिएं और जिंक की गोली लें। छाछ और चावल का पानी पिएं।'
    },
    en: {
      symptom: 'Diarrhea & Loose Motions',
      tablet: 'WHO-Formula ORS & Zinc Sulphate 20mg',
      dosage: 'Mix 1 sachet ORS in 1 liter clean water; sip regularly after each motion.',
      purpose: 'Prevents dehydration and restores essential electrolytes.',
      precaution: 'Use prepared solution within 24 hours. Avoid street food.',
      homeCare: 'Drink buttermilk, tender coconut water, and salted rice water.',
      warning: 'If blood appears in stool or high fever develops, rush to PHC immediately.',
      spokenText: 'For loose motions, drink plenty of prepared ORS solution and take a Zinc tablet. Drink buttermilk and stay hydrated.'
    }
  },

  vomiting_nausea: {
    te: {
      symptom: 'వాంతులు మరియు వికారం',
      tablet: 'ఒండాన్‌సెట్రాన్ 4mg (Ondansetron / Vomikind 4mg)',
      dosage: 'భోజనానికి 20 నిమిషాల ముందు 1 మాత్ర నాలుకపై కరిగించుకోండి.',
      purpose: 'వాంతులు మరియు కడుపు వికారాన్ని త్వరగా ఆపుతుంది.',
      precaution: 'ఒకేసారి ఎక్కువ ఆహారం తినవద్దు, కొద్దికొద్దిగా నీరు సిప్ చేయండి.',
      homeCare: 'అల్లం రసం లేదా నిమ్మరసంలో చిటికెడు ఉప్పు వేసి త్రాగడం మంచిది.',
      warning: 'నీరు కూడా తాగలేనంతగా వాంతులు ఆగకపోతే వెంటనే ఆసుపత్రికి వెళ్ళండి.',
      spokenText: 'మీ వాంతులు మరియు వికారానికి ఒండాన్‌సెట్రాన్ 4mg మాత్ర భోజనానికి ముందు నాలుకపై వేసుకోండి. నిమ్మరసం లేదా కొబ్బరి నీళ్ళు సిప్ చేయండి.'
    },
    hi: {
      symptom: 'उल्टी और जी मिचलाना',
      tablet: 'ओन्डेनसेट्रॉन 4mg (Ondansetron / Vomikind 4mg)',
      dosage: 'भोजन से 20 मिनट पहले 1 गोली जीभ पर रखकर घोलें।',
      purpose: 'उल्टी और मिचली को तुरंत नियंत्रित करती है।',
      precaution: 'एक साथ ज्यादा पानी या खाना न लें, थोड़ा-थोड़ा पिएं।',
      homeCare: 'अदरक का टुकड़ा चबाएं या नींबू पानी में चुटकी भर नमक डालकर पिएं।',
      warning: 'यदि पानी भी न पचे और कमजोरी बढ़े तो तुरंत अस्पताल जाएं।',
      spokenText: 'उल्टी और मिचली के लिए ओन्डेनसेट्रॉन 4mg गोली भोजन से पहले लें। नींबू पानी या नारियल पानी थोड़ा-थोड़ा पिएं।'
    },
    en: {
      symptom: 'Nausea & Vomiting',
      tablet: 'Ondansetron 4mg (Vomikind)',
      dosage: 'Dissolve 1 tablet on tongue 20 minutes before meals.',
      purpose: 'Rapidly controls vomiting and nausea.',
      precaution: 'Avoid large gulps of water; take small frequent sips.',
      homeCare: 'Chew a small piece of fresh ginger or sip lemon water with salt.',
      warning: 'If unable to retain any fluids for over 6 hours, visit hospital immediately.',
      spokenText: 'For vomiting and nausea, take Ondansetron 4mg before meals. Sip lemon water or coconut water slowly.'
    }
  },

  toothache_dental: {
    te: {
      symptom: 'పంటి నొప్పి మరియు చిగుళ్ల వాపు',
      tablet: 'పారాసిటమాల్ 650mg లేదా కోంబిఫ్లామ్ (Combiflam)',
      dosage: 'భోజనం తర్వాత 1 మాత్ర వేసుకోండి (నొప్పి ఉన్నప్పుడు).',
      purpose: 'పంటి నొప్పి మరియు చిగుళ్ల వాపును తగ్గిస్తుంది.',
      precaution: 'తీపి పదార్థాలు తినవద్దు, ఆ వైపు నమలవద్దు.',
      homeCare: 'గోరువెచ్చని ఉప్పు నీటితో రోజుకు 3 సార్లు నోరు పుక్కిలించండి. లవంగ నూనె దూదితో పంటిపై ఉంచండి.',
      warning: 'చెంప వాపు లేదా చీము పట్టి జ్వరం వస్తే దంత వైద్యుడిని సంప్రదించండి.',
      spokenText: 'మీ పంటి నొప్పికి పారాసిటమాల్ లేదా కోంబిఫ్లామ్ మాత్ర భోజనం తర్వాత వేసుకోండి. గోరువెచ్చని ఉప్పు నీటితో నోరు పుక్కిలించండి.'
    },
    hi: {
      symptom: 'दांत दर्द और मसूड़ों में सूजन',
      tablet: 'कॉम्बीफ्लेम या पैरासिटामोल 650mg (Combiflam)',
      dosage: 'भोजन के बाद 1 गोली लें (दर्द होने पर)।',
      purpose: 'दांत के असहनीय दर्द और सूजन को शांत करती है।',
      precaution: 'मीठा और बहुत ठंडा या गर्म खाना न खाएं।',
      homeCare: 'गुनगुने नमक पानी से दिन में 3 बार कुल्ला करें। लौंग का तेल लगाएं।',
      warning: 'चेहरे पर सूजन या मवाद निकले तो तुरंत दंत चिकित्सक को दिखाएं।',
      spokenText: 'दांत दर्द के लिए कॉम्बीफ्लेम या पैरासिटामोल गोली भोजन के बाद लें। गुनगुने नमक पानी से कुल्ला करें।'
    },
    en: {
      symptom: 'Toothache & Gum Swelling',
      tablet: 'Combiflam (Ibuprofen + Paracetamol) or Paracetamol 650mg',
      dosage: '1 tablet after meals as needed for pain.',
      purpose: 'Relieves intense throbbing toothache and gum inflammation.',
      precaution: 'Avoid very hot, cold, or sugary foods.',
      homeCare: 'Rinse with warm salt water 3 times daily. Apply clove oil using cotton.',
      warning: 'If facial swelling or pus discharge develops, consult a dentist promptly.',
      spokenText: 'For toothache, take Combiflam or Paracetamol after food. Rinse with warm salt water and apply clove oil.'
    }
  },

  allergy_rash_urticaria: {
    te: {
      symptom: 'చర్మ దురద మరియు దద్దుర్లు',
      tablet: 'సెటిరిజైన్ 10mg మాత్ర & క్యాలమైన్ లోషన్ (Calamine Lotion)',
      dosage: 'రాత్రి 1 మాత్ర వేసుకోండి, దద్దుర్లపై లోషన్ సున్నితంగా రాయండి.',
      purpose: 'దురద, ఎరుపు దద్దుర్లు మరియు అలర్జీని నివారిస్తుంది.',
      precaution: 'గోళ్ళతో గట్టిగా గిల్లవద్దు. తడి బట్టలు వేసుకోవద్దు.',
      homeCare: 'స్నానం తర్వాత పొడి కాటన్ బట్టలు ధరించండి, కొబ్బరి నూనె రాయండి.',
      warning: 'దద్దుర్లు శరీరం మొత్తం వ్యాపించి శ్వాసలో ఇబ్బంది వస్తే వెంటనే 108 కి కాల్ చేయండి.',
      spokenText: 'మీ చర్మ దురదకు సెటిరిజైన్ మాత్ర వేసుకోండి మరియు క్యాలమైన్ లోషన్ రాయండి. చర్మాన్ని పొడిగా ఉంచుకోండి.'
    },
    hi: {
      symptom: 'त्वचा में खुजली और लाल चकत्ते',
      tablet: 'सेटिरिज़िन 10mg गोली और कैलामाइन लोशन (Calamine Lotion)',
      dosage: 'रात को 1 गोली लें, खुजली वाली जगह पर लोशन लगाएं।',
      purpose: 'एलर्जी, खुजली और लाल चकत्तों को दूर करती है।',
      precaution: 'नाखूनों से न खरोंचें, सूती कपड़े पहनें।',
      homeCare: 'नहाने के बाद नारियल तेल लगाएं, साफ-सफाई रखें।',
      warning: 'यदि चेहरे पर सूजन या सांस लेने में दिक्कत हो तो तुरंत अस्पताल जाएं।',
      spokenText: 'खुजली और चकत्तों के लिए सेटिरिज़िन 10mg गोली लें और कैलामाइन लोशन लगाएं। नाखूनों से न खरोंचें।'
    },
    en: {
      symptom: 'Skin Allergy, Rash & Itching',
      tablet: 'Cetirizine 10mg + Calamine Lotion',
      dosage: '1 tablet once daily at night, apply lotion externally.',
      purpose: 'Controls histamine reaction and relieves itching and hives.',
      precaution: 'Do not scratch vigorously. Wear loose cotton clothes.',
      homeCare: 'Apply cool water compresses or coconut oil to soothe skin.',
      warning: 'If swelling of lips/throat or difficulty breathing occurs, call 108 immediately.',
      spokenText: 'For skin rash and itching, take Cetirizine 10mg at night and apply Calamine lotion. Avoid scratching.'
    }
  },

  chest_pain_emergency: {
    te: {
      symptom: 'ఛాతీ నొప్పి / అత్యవసర పరిస్థితి',
      tablet: 'ఆస్పిరిన్ 300mg మాత్ర (Aspirin 300mg / Disprin)',
      dosage: 'వెంటనే 1 మాత్ర నమిలి మింగండి మరియు ఏమాత్రం ఆలస్యం చేయవద్దు.',
      purpose: 'రక్త నాళాల్లో గడ్డకట్టడాన్ని అరికట్టి గుండెకు రక్షణ కల్పిస్తుంది.',
      precaution: 'అత్యవసరం: నడవవద్దు, వెంటనే కూర్చోండి లేదా పడుకోండి.',
      homeCare: 'రోగిని కంగారు పెట్టవద్దు, గాలి ఆడేలా ఉంచండి.',
      warning: 'వెంటనే 108 అంబులెన్స్‌కు కాల్ చేసి సమీప అత్యవసర ఆసుపత్రికి తరలించండి!',
      spokenText: 'ఇది అత్యవసర పరిస్థితి కావచ్చు. ఆస్పిరిన్ మాత్ర నమిలి వెంటనే 108 కి కాల్ చేసి ఆసుపత్రికి వెళ్ళండి.'
    },
    hi: {
      symptom: 'सीने में दर्द / आपातकालीन स्थिति',
      tablet: 'एस्पिरिन 300mg की गोली (Aspirin 300mg / Disprin)',
      dosage: 'तुरंत 1 गोली चबाकर निगल लें, बिल्कुल देर न करें।',
      purpose: 'रक्त के थक्के बनने से रोककर दिल को सुरक्षा देती है।',
      precaution: 'मरीज को तुरंत बैठाएं या लिटाएं, चलने न दें।',
      homeCare: 'खिड़कियां खोलें ताकि ताजी हवा मिले, मरीज को शांत रखें।',
      warning: 'तुरंत 108 एम्बुलेंस पर कॉल करें और नजदीकी आपातकालीन अस्पताल ले जाएं!',
      spokenText: 'यह आपातकालीन स्थिति हो सकती है। एस्पिरिन की गोली चबाएं और तुरंत 108 पर कॉल करके अस्पताल जाएं।'
    },
    en: {
      symptom: 'Acute Chest Pain / Emergency',
      tablet: 'Aspirin 300mg (Soluble Disprin)',
      dosage: 'Chew and swallow 1 tablet immediately without delay.',
      purpose: 'Inhibits platelet clotting to protect the heart.',
      precaution: 'Keep the patient seated or lying down. Do NOT allow walking.',
      homeCare: 'Keep the patient calm and loosen tight clothing.',
      warning: 'CALL 108 EMERGENCY AMBULANCE IMMEDIATELY!',
      spokenText: 'This could be an emergency. Chew one Aspirin 300mg tablet immediately and call 108 for an ambulance without delay.'
    }
  }
};

/**
 * Get localized direct tablet advice for a condition
 */
function getLocalizedTabletAdvice(conditionId, language = 'en', userMessage = '') {
  const lang = ['te', 'hi', 'ta', 'bn', 'es', 'en'].includes(language) ? language : 'en';
  const condData = TABLET_RECOMMENDATIONS[conditionId];
  
  if (condData && condData[lang]) {
    return condData[lang];
  }
  if (condData && condData.en) {
    return condData.en;
  }

  // Fallback default safe care tablet (Paracetamol 650mg)
  if (lang === 'te') {
    return {
      symptom: userMessage || 'శారీరక అసౌకర్యం / నొప్పులు',
      tablet: 'పారాసిటమాల్ 650mg (Dolo 650 / Paracetamol)',
      dosage: 'భోజనం తర్వాత 1 మాత్ర వేసుకోండి (నొప్పులు లేదా జ్వరం ఉంటే మాత్రమే).',
      purpose: 'నొప్పులు మరియు జ్వరాన్ని తగ్గించడానికి సురక్షితమైన మాత్ర.',
      precaution: 'ఖాళీ కడుపుతో వేసుకోకండి. తగినంత నీరు త్రాగండి.',
      homeCare: 'గోరువెచ్చని నీరు త్రాగండి, విశ్రాంతి తీసుకోండి.',
      warning: 'లక్షణాలు తగ్గకపోతే సమీప ప్రాథమిక ఆరోగ్య కేంద్రం (PHC) వైద్యుడిని సంప్రదించండి.',
      spokenText: 'మీ లక్షణాలకు పారాసిటమాల్ 650mg మాత్ర భోజనం తర్వాత వేసుకోండి. గోరువెచ్చని నీరు త్రాగి విశ్రాంతి తీసుకోండి. తగ్గకపోతే ప్రాథమిక ఆరోగ్య కేంద్రానికి వెళ్లండి.'
    };
  }

  if (lang === 'hi') {
    return {
      symptom: userMessage || 'शारीरिक दर्द या अस्वस्थता',
      tablet: 'पैरासिटामोल 650mg (Dolo 650 / Paracetamol)',
      dosage: 'भोजन के बाद 1 गोली लें (दर्द या बुखार होने पर)।',
      purpose: 'दर्द और बुखार को कम करने के लिए सुरक्षित दवा।',
      precaution: 'खाली पेट न लें। पर्याप्त पानी पिएं।',
      homeCare: 'गुनगुना पानी पिएं और आराम करें।',
      warning: 'आराम न मिलने पर नजदीकी स्वास्थ्य केंद्र (PHC) में डॉक्टर से संपर्क करें।',
      spokenText: 'आपके लक्षणों के लिए पैरासिटामोल 650mg की गोली भोजन के बाद लें। गुनगुना पानी पिएं और आराम करें।'
    };
  }

  return {
    symptom: userMessage || 'Physical discomfort / pain',
    tablet: 'Paracetamol 650mg (Dolo 650)',
    dosage: 'Take 1 tablet after food as needed for pain or fever.',
    purpose: 'Safe first-line relief for fever and body discomfort.',
    precaution: 'Do not take on an empty stomach. Stay hydrated.',
    homeCare: 'Drink plenty of warm water and take rest.',
    warning: 'If symptoms persist, consult your nearest Primary Health Centre.',
    spokenText: 'For your symptoms, please take Paracetamol 650mg after food. Drink warm water and rest well.'
  };
}

module.exports = {
  TABLET_RECOMMENDATIONS,
  getLocalizedTabletAdvice,
};
