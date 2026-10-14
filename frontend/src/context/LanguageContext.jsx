import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const LanguageContext = createContext(null);

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', native: 'English', speechCode: 'en-US' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', speechCode: 'hi-IN' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', speechCode: 'te-IN' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', speechCode: 'ta-IN' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', speechCode: 'bn-IN' },
  { code: 'es', name: 'Spanish', native: 'Español', speechCode: 'es-ES' },
];

const TRANSLATIONS = {
  en: {
    dashboard: 'Dashboard',
    appointments: 'Appointments',
    records: 'Medical Records',
    aiAssistant: 'AI Health Assistant',
    emergency: 'Emergency SOS',
    healthCenters: 'Health Centers',
    healthTips: 'Health Tips',
    prescriptions: 'Prescriptions',
    profile: 'Profile',
    logout: 'Log Out',
    welcomeBack: "Welcome back",
    healthOverview: "Here's an overview of your health at a glance.",
    upcomingAppointments: 'Upcoming Appointments',
    bookAppointment: 'Book Appointment',
    emergencyCall: 'Emergency Hotline (108)',
    quickActions: 'Quick Actions',
    nearbyCenters: 'Nearby Health Centers',
    emergencyContacts: 'Emergency Contacts',
    voiceSearch: 'Tap microphone to speak your symptoms',
    listening: 'Listening...',
    readAloud: 'Read aloud',
    stopSpeaking: 'Stop reading',
    pillReminder: 'Daily Pill Routine & Adherence',
    taken: 'Taken',
    pending: 'Pending',
    distance: 'Distance',
    directions: 'Get Directions',
    offlineMode: 'Offline Mode',
    synced: 'All changes synchronized',
    pendingSync: 'changes queued for sync',
    teleconsultation: 'Virtual Consultation',
    joinCall: 'Join Video Room',
    scanReport: 'Scan Prescription / Lab Report',
    scanning: 'Analyzing medical document...',
  },
  hi: {
    dashboard: 'डैशबोर्ड',
    appointments: 'अपॉइंटमेंट्स',
    records: 'चिकित्सा रिकॉर्ड',
    aiAssistant: 'एआई स्वास्थ्य सहायक',
    emergency: 'आपातकालीन सहायता (SOS)',
    healthCenters: 'निकटतम स्वास्थ्य केंद्र',
    healthTips: 'स्वास्थ्य सुझाव',
    prescriptions: 'दवाओं का पर्चा',
    profile: 'प्रोफ़ाइल',
    logout: 'लॉग आउट',
    welcomeBack: 'नमस्ते',
    healthOverview: 'यहाँ आपके स्वास्थ्य का संक्षिप्त विवरण है।',
    upcomingAppointments: 'आगामी अपॉइंटमेंट्स',
    bookAppointment: 'अपॉइंटमेंट बुक करें',
    emergencyCall: 'आपातकालीन हेल्पलाइन (108)',
    quickActions: 'त्वरित सेवाएं',
    nearbyCenters: 'निकटतम अस्पताल व केंद्र',
    emergencyContacts: 'आपातकालीन संपर्क',
    voiceSearch: 'लक्षण बोलने के लिए माइक दबाएं',
    listening: 'सुन रहे हैं...',
    readAloud: 'आवाज़ में सुनें',
    stopSpeaking: 'रोकें',
    pillReminder: 'दवा लेने की दैनिक दिनचर्या',
    taken: 'दवा ले ली',
    pending: 'बाकी है',
    distance: 'दूरी',
    directions: 'रास्ता देखें',
    offlineMode: 'ऑफ़लाइन मोड',
    synced: 'सभी डेटा सुरक्षित',
    pendingSync: 'ऑफ़लाइन बदलाव सुरक्षित, नेटवर्क आने पर सिंक होंगे',
    teleconsultation: 'वीडियो परामर्श',
    joinCall: 'कॉल से जुड़ें',
    scanReport: 'पर्चा या रिपोर्ट स्कैन करें',
    scanning: 'रिपोर्ट की जाँच हो रही है...',
  },
  te: {
    dashboard: 'డాష్‌బోర్డ్',
    appointments: 'అపాయింట్‌మెంట్‌లు',
    records: 'వైద్య రికార్డులు',
    aiAssistant: 'AI ఆరోగ్య సహాయకుడు',
    emergency: 'అత్యవసర SOS',
    healthCenters: 'ఆరోగ్య కేంద్రాలు',
    healthTips: 'ఆరోగ్య చిట్కాలు',
    prescriptions: 'మందుల చీటి',
    profile: 'ప్రొఫైల్',
    logout: 'లాగ్ అవుట్',
    welcomeBack: 'స్వాగతం',
    healthOverview: 'మీ ఆరోగ్య సమాచారం సంక్షిప్తంగా ఇక్కడ ఉంది.',
    upcomingAppointments: 'రాబోయే అపాయింట్‌మెంట్‌లు',
    bookAppointment: 'అపాయింట్‌మెంట్ బుక్ చేయండి',
    emergencyCall: 'అత్యవసర హెల్ప్‌లైన్ (108)',
    quickActions: 'త్వరిత చర్యలు',
    nearbyCenters: 'సమీప ఆరోగ్య కేంద్రాలు',
    emergencyContacts: 'అత్యవసర పరిచయాలు',
    voiceSearch: 'మీ సమస్యను చెప్పడానికి మైక్ నొక్కండి',
    listening: 'వింటున్నాము...',
    readAloud: 'వినండి',
    stopSpeaking: 'ఆపండి',
    pillReminder: 'రోజువారీ మందుల సమయం',
    taken: 'తీసుకున్నారు',
    pending: 'బాకీ ఉంది',
    distance: 'దూరం',
    directions: 'దారి చూపించు',
    offlineMode: 'ఆఫ్‌లైన్ మోడ్',
    synced: 'అన్నీ సింక్ అయ్యాయి',
    pendingSync: 'ఆఫ్‌లైన్ మార్పులు నిల్వ చేయబడ్డాయి',
    teleconsultation: 'వీడియో సంప్రదింపు',
    joinCall: 'కాల్‌లో చేరండి',
    scanReport: 'రిపోర్ట్ స్కాన్ చేయండి',
    scanning: 'రిపోర్ట్ పరిశీలిస్తోంది...',
  },
  ta: {
    dashboard: 'டாஷ்போர்டு',
    appointments: 'மருத்துவ சந்திப்புகள்',
    records: 'மருத்துவ குறிப்புகள்',
    aiAssistant: 'AI சுகாதார உதவியாளர்',
    emergency: 'அவசர SOS',
    healthCenters: 'சுகாதார மையங்கள்',
    healthTips: 'சுகாதார குறிப்புகள்',
    prescriptions: 'மருந்து சீட்டு',
    profile: 'சுயவிவரம்',
    logout: 'வெளியேறு',
    welcomeBack: 'வணக்கம்',
    healthOverview: 'உங்கள் உடல்நலக் குறிப்பு இங்கே உள்ளது.',
    upcomingAppointments: 'வரவிருக்கும் சந்திப்புகள்',
    bookAppointment: 'சந்திப்பை பதிவு செய்க',
    emergencyCall: 'அவசர உதவி எண் (108)',
    quickActions: 'விரைவு சேவைகள்',
    nearbyCenters: 'அருகிலுள்ள மருத்துவ மையங்கள்',
    emergencyContacts: 'அவசர தொடர்புகள்',
    voiceSearch: 'பேச மைக்ரோஃபோனை அழுத்தவும்',
    listening: 'கேட்கிறது...',
    readAloud: 'கேளுங்கள்',
    stopSpeaking: 'நிறுத்து',
    pillReminder: 'தினசரி மருந்து அட்டவணை',
    taken: 'எடுக்கப்பட்டது',
    pending: 'மீதமுள்ளது',
    distance: 'தூரம்',
    directions: 'திசைகள்',
    offlineMode: 'ஆஃப்லைன் முறை',
    synced: 'ஒத்திசைக்கப்பட்டது',
    pendingSync: 'ஆஃப்லைன் தரவு சேமிக்கப்பட்டது',
    teleconsultation: 'வீடியோ ஆலோசனை',
    joinCall: 'அழைப்பில் இணையுங்கள்',
    scanReport: 'அறிக்கையை ஸ்கேன் செய்',
    scanning: 'ஸ்கேன் செய்யப்படுகிறது...',
  },
  bn: {
    dashboard: 'ড্যাশবোর্ড',
    appointments: 'অ্যাপয়েন্টমেন্ট',
    records: 'মেডিকেল রেকর্ড',
    aiAssistant: 'এআই স্বাস্থ্য সহকারী',
    emergency: 'জরুরি SOS',
    healthCenters: 'স্বাস্থ্য কেন্দ্র',
    healthTips: 'স্বাস্থ্য টিপস',
    prescriptions: 'প্রেসক্রিপশন',
    profile: 'প্রোফাইল',
    logout: 'লগ আউট',
    welcomeBack: 'স্বাগতম',
    healthOverview: 'আপনার স্বাস্থ্যের সংক্ষিপ্ত তথ্য এখানে দেওয়া হলো।',
    upcomingAppointments: 'আসন্ন অ্যাপয়েন্টমেন্ট',
    bookAppointment: 'অ্যাপয়েন্টমেন্ট বুক করুন',
    emergencyCall: 'জরুরি হেল্পলাইন (108)',
    quickActions: 'দ্রুত পরিষেবা',
    nearbyCenters: 'নিকটবর্তী স্বাস্থ্য কেন্দ্র',
    emergencyContacts: 'জরুরি যোগাযোগ',
    voiceSearch: 'কথা বলতে মাইকে চাপুন',
    listening: 'শুনছি...',
    readAloud: 'পড়ে শুনুন',
    stopSpeaking: 'থামুন',
    pillReminder: 'দৈনিক ওষুধের নিয়ম',
    taken: 'নেওয়া হয়েছে',
    pending: 'বাকি আছে',
    distance: 'দূরত্ব',
    directions: 'পথ নির্দেশ',
    offlineMode: 'অফলাইন মোড',
    synced: 'সব সিঙ্ক হয়েছে',
    pendingSync: 'অফলাইন পরিবর্তন সংরক্ষিত',
    teleconsultation: 'ভিডিও পরামর্শ',
    joinCall: 'কলে যোগ দিন',
    scanReport: 'রিপোর্ট স্ক্যান করুন',
    scanning: 'পরীক্ষা করা হচ্ছে...',
  },
  es: {
    dashboard: 'Panel de Control',
    appointments: 'Citas Médicas',
    records: 'Historial Médico',
    aiAssistant: 'Asistente de Salud IA',
    emergency: 'Emergencia SOS',
    healthCenters: 'Centros de Salud',
    healthTips: 'Consejos de Salud',
    prescriptions: 'Recetas Médicas',
    profile: 'Perfil',
    logout: 'Cerrar Sesión',
    welcomeBack: 'Bienvenido de nuevo',
    healthOverview: 'Resumen de su estado de salud general.',
    upcomingAppointments: 'Próximas Citas',
    bookAppointment: 'Reservar Cita',
    emergencyCall: 'Línea de Emergencia (108)',
    quickActions: 'Acciones Rápidas',
    nearbyCenters: 'Centros de Salud Cercanos',
    emergencyContacts: 'Contactos de Emergencia',
    voiceSearch: 'Toque el micrófono para describir síntomas',
    listening: 'Escuchando...',
    readAloud: 'Leer en voz alta',
    stopSpeaking: 'Detener',
    pillReminder: 'Rutina y Control de Medicamentos',
    taken: 'Tomada',
    pending: 'Pendiente',
    distance: 'Distancia',
    directions: 'Cómo llegar',
    offlineMode: 'Modo sin conexión',
    synced: 'Sincronizado',
    pendingSync: 'cambios pendientes de sincronizar',
    teleconsultation: 'Teleconsulta Virtual',
    joinCall: 'Entrar a Videollamada',
    scanReport: 'Escanear Receta o Informe',
    scanning: 'Analizando documento médico...',
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('app_language') || 'en';
  });
  const [isSpeaking, setIsSpeaking] = useState(false);

  const setLanguage = (langCode) => {
    setLanguageState(langCode);
    localStorage.setItem('app_language', langCode);
  };

  const currentLangConfig = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  const t = useCallback(
    (key, fallback = '') => {
      const langDict = TRANSLATIONS[language] || TRANSLATIONS.en;
      return langDict[key] || TRANSLATIONS.en[key] || fallback || key;
    },
    [language]
  );

  const cleanTextForSpeech = (text) => {
    if (!text) return '';
    return text
      .replace(/[#*_~`]/g, '')
      .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
      .replace(/^[\s•\-\+*]+/gm, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  // Web Speech Synthesis (Text-to-Speech)
  const speak = useCallback(
    (text) => {
      if (!('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      const cleanedText = cleanTextForSpeech(text);
      if (!cleanedText) {
        setIsSpeaking(false);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(cleanedText);
      utterance.lang = currentLangConfig.speechCode;
      utterance.rate = 0.92; // Clear pace for rural users

      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        let match = voices.find(
          (v) =>
            v.lang === currentLangConfig.speechCode ||
            v.lang.replace('_', '-').toLowerCase() === currentLangConfig.speechCode.toLowerCase()
        );
        if (!match) {
          match = voices.find((v) => v.lang.toLowerCase().startsWith(currentLangConfig.code.toLowerCase()));
        }
        if (!match) {
          match = voices.find((v) => v.name.toLowerCase().includes(currentLangConfig.name.toLowerCase()));
        }
        if (match) {
          utterance.voice = match;
        }
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    },
    [currentLangConfig]
  );

  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        currentLangConfig,
        t,
        speak,
        stopSpeaking,
        isSpeaking,
        supportedLanguages: SUPPORTED_LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
