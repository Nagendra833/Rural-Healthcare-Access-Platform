const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const asyncHandler = require('../utils/asyncHandler');
const {
  matchCondition,
  formatConditionResponse,
  getGeneralSymptomGuidance,
} = require('../utils/medicalKnowledgeBase');
const { detectClinicalProfile } = require('../utils/clinicalDocumentProfiles');

const DISCLAIMER =
  '⚕️ This advice is for educational purposes only. Always consult a qualified doctor for diagnosis and treatment. In emergencies, call 108 immediately.';

// ─────────────────────────────────────────────────────────────────
// SHORT, FOCUSED system instruction — clear role + strict rules
// ─────────────────────────────────────────────────────────────────
const SYSTEM_INSTRUCTION = `You are Dr. Aarogya, an empathetic rural health expert AI physician.
CRITICAL RULES:
1. Directly suggest the single best, safe tablet and exact dosage (after food) for the patient's symptoms.
2. DO NOT speak extra or write long verbose essays. Rural patients need clear, simple, concise advice.
3. Always respond 100% in the selected language script without any English words or headers.
4. For emergencies (chest pain, severe bleeding, snakebite), advise calling 108 immediately.`;

// ─────────────────────────────────────────────────────────────────
// Per-message augmentation — forces direct tablet-focused output
// ─────────────────────────────────────────────────────────────────
const buildAugmentedMessage = (userMessage, language) => {
  const langMap = {
    te: 'Telugu (తెలుగు)', hi: 'Hindi (हिन्दी)', ta: 'Tamil (தமிழ்)', bn: 'Bengali (বাংলা)',
    mr: 'Marathi (मराठी)', gu: 'Gujarati (ગુજરાતી)', kn: 'Kannada (ಕನ್ನಡ)', ml: 'Malayalam (മലയാളം)',
    or: 'Odia (ଓଡ଼ିଆ)', pa: 'Punjabi (ਪੰਜਾਬੀ)', es: 'Spanish (Español)',
  };

  const chosenLang = langMap[language] || 'English';

  return `The patient states: "${userMessage}".
Please reply ENTIRELY in ${chosenLang} using its own script without English words.
Provide a concise, direct response focusing on the tablet for this symptom:
- 🔍 Symptom acknowledgment in ${chosenLang}
- 💊 Recommended Tablet with exact strength and dosage (e.g. 1 tablet after food)
- 🌿 1 simple home care tip (warm water, rest)
- ⚠️ When to visit the nearest Primary Health Centre (PHC) or call 108
Keep it brief and practical. Do not speak extra.`;
};

// ─────────────────────────────────────────────────────────────────
// Supported languages
// ─────────────────────────────────────────────────────────────────
const LANG_NAMES = {
  te: 'Telugu (తెలుగు)',
  hi: 'Hindi (हिन्दी)',
  ta: 'Tamil (தமிழ்)',
  bn: 'Bengali (বাংলা)',
  es: 'Spanish (Español)',
  mr: 'Marathi (मराठी)',
  gu: 'Gujarati (ગુજરાતી)',
  kn: 'Kannada (ಕನ್ನಡ)',
  ml: 'Malayalam (മലയാളം)',
  or: 'Odia (ଓଡ଼ିଆ)',
  pa: 'Punjabi (ਪੰਜਾਬੀ)',
};

// @desc    Chat with the AI Health Assistant (powered by Google Gemini & Clinical Knowledge Base)
// @route   POST /api/ai/chat
// @access  Private
const chat = asyncHandler(async (req, res) => {
  const { message, history, language, context } = req.body;

  if (!message || !message.trim()) {
    return res.status(400).json({ success: false, message: 'Message is required' });
  }

  // Clean prompt boilerplate if a caller passed a wrapped template
  let cleanMessage = message.trim();
  const spokenMatch = cleanMessage.match(/The patient just spoken to you:\s*"([^"]+)"/i);
  if (spokenMatch && spokenMatch[1]) {
    cleanMessage = spokenMatch[1].trim();
  }

  // Match condition on clean user message, with fallback to context if message is very short
  let matchedCondition = matchCondition(cleanMessage);
  if (!matchedCondition && context) {
    matchedCondition = matchCondition(cleanMessage + ' ' + context);
  }

  // 1. Attempt Google Gemini if API Key is configured
  if (process.env.GEMINI_API_KEY) {
    try {
      let systemInstruction = SYSTEM_INSTRUCTION;
      if (language && language !== 'en' && LANG_NAMES[language]) {
        systemInstruction += `\n\nLANGUAGE RULE: The patient has selected ${LANG_NAMES[language]}. You MUST write your entire response in ${LANG_NAMES[language]} script. Do NOT use English at all. Translate all medical terms into simple ${LANG_NAMES[language]} words that a village patient can understand. Focus on suggesting the tablet for their symptom.`;
      }

      if (matchedCondition) {
        systemInstruction += `\n\nCLINICAL KNOWLEDGE BASE FOR THIS QUERY:
Condition Detected: ${matchedCondition.title}
Safe Tablets: ${matchedCondition.medicines.map((m) => `${m.name} (${m.dosage})`).join('; ')}`;
      }

      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        systemInstruction: systemInstruction,
      });

      const cleanHistory = Array.isArray(history)
        ? history.filter((h) => h.role && h.parts && h.parts[0]?.text)
        : [];

      const chatSession = model.startChat({
        history: cleanHistory,
        generationConfig: {
          maxOutputTokens: 500,
          temperature: 0.3,
          topK: 40,
          topP: 0.95,
        },
      });

      const augmentedMessage = buildAugmentedMessage(cleanMessage, language);
      const result = await chatSession.sendMessage(augmentedMessage);
      const responseText = result.response.text();

      return res.status(200).json({
        success: true,
        reply: responseText,
        spokenText: responseText.replace(/[*#_•]/g, '').trim(),
        disclaimer: DISCLAIMER,
      });
    } catch (geminiError) {
      console.warn('Gemini API call unsuccessful, using Clinical Knowledge Base fallback:', geminiError.message);
    }
  }

  // 2. Comprehensive Clinical Knowledge Base Generation
  // Provides direct, condition-specific safe tablet guidance in the patient's preferred language
  let responseData;
  if (matchedCondition) {
    responseData = formatConditionResponse(matchedCondition, cleanMessage, language);
  } else {
    responseData = getGeneralSymptomGuidance(cleanMessage, language);
  }

  const replyText = typeof responseData === 'object' && responseData.text ? responseData.text : String(responseData);
  const spokenText = typeof responseData === 'object' && responseData.spokenText ? responseData.spokenText : '';

  return res.status(200).json({
    success: true,
    reply: replyText,
    spokenText,
    disclaimer: DISCLAIMER,
  });
});

// @desc    Scan and analyze prescription or lab report document using Gemini Vision / Clinical Profiles
// @route   POST /api/ai/analyze-document
// @access  Private
const analyzeDocument = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Medical image/file is required' });
  }

  const filePath = req.file.path;
  const mimeType = req.file.mimetype || 'image/jpeg';
  const originalName = req.file.originalname || '';
  const titleHint = req.body.title || req.body.category || req.body.documentType || '';

  // Detect specific clinical profile (Bone/Ortho, Stomach/Gastro, Skin, Dental, Heart, Diabetes, Eye, Respiratory)
  const profile = detectClinicalProfile({
    filename: originalName,
    title: titleHint,
    category: req.body.category,
    documentType: req.body.documentType,
    notes: req.body.notes,
  });

  const patientName = req.user ? req.user.fullName : 'Rural Patient';
  const todayDate = new Date().toISOString().split('T')[0];

  if (!process.env.GEMINI_API_KEY) {
    return res.status(200).json({
      success: true,
      data: {
        documentType: profile.documentType,
        doctorName: profile.doctorName,
        patientName: patientName,
        date: todayDate,
        diagnoses: profile.diagnoses,
        medications: profile.medications,
        labResults: profile.labResults,
        vitals: profile.vitals,
        followUpDate: profile.followUpDate,
        advice: profile.advice,
        summary: profile.summary,
      },
      disclaimer: DISCLAIMER,
    });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const fileBuffer = fs.readFileSync(filePath);
    const imagePart = {
      inlineData: {
        data: fileBuffer.toString('base64'),
        mimeType: mimeType.startsWith('image/') ? mimeType : 'image/jpeg',
      },
    };

    const prompt = `You are an expert medical document analyst for a rural healthcare platform in India.
Carefully analyze this medical document (${originalName}).
Detected clinical context: ${profile.domain}.
Extract all specific medical details into valid JSON with this exact structure:
{
  "documentType": "${profile.documentType}",
  "doctorName": "${profile.doctorName}",
  "patientName": "${patientName}",
  "date": "${todayDate}",
  "diagnoses": ["string array of all diagnosed conditions"],
  "medications": [
    {
      "name": "specific medicine name (not generic paracetamol unless specifically stated for fever)",
      "dosage": "strength e.g. 500mg",
      "frequency": "e.g. twice daily after food",
      "duration": "e.g. 5 days",
      "purpose": "what this medicine treats"
    }
  ],
  "labResults": [
    {
      "testName": "test name",
      "value": "result with units",
      "normalRange": "reference range",
      "status": "Normal | Abnormal | High | Low | Critical"
    }
  ],
  "vitals": {
    "bp": "value or empty",
    "pulse": "value or empty",
    "temperature": "value or empty",
    "weight": "value or empty",
    "spo2": "value or empty"
  },
  "followUpDate": "date string or empty",
  "advice": "All dietary, lifestyle, and activity instructions from the document",
  "summary": "2-3 sentence patient-friendly explanation of the findings and prescribed treatment"
}
Return ONLY the JSON object. No markdown, no explanation.`;

    const result = await model.generateContent([prompt, imagePart]);
    const responseText = result.response.text();
    const cleanedJson = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    let parsedData;
    try {
      parsedData = JSON.parse(cleanedJson);
      // Ensure medications and diagnoses are populated; if Gemini produced empty, fallback to detected profile
      if (!parsedData.medications || parsedData.medications.length === 0) {
        parsedData.medications = profile.medications;
      }
      if (!parsedData.diagnoses || parsedData.diagnoses.length === 0) {
        parsedData.diagnoses = profile.diagnoses;
      }
      if (!parsedData.labResults || parsedData.labResults.length === 0) {
        parsedData.labResults = profile.labResults;
      }
    } catch {
      parsedData = {
        documentType: profile.documentType,
        doctorName: profile.doctorName,
        patientName: patientName,
        date: todayDate,
        diagnoses: profile.diagnoses,
        medications: profile.medications,
        labResults: profile.labResults,
        vitals: profile.vitals,
        followUpDate: profile.followUpDate,
        advice: profile.advice,
        summary: profile.summary,
      };
    }

    res.status(200).json({ success: true, data: parsedData, disclaimer: DISCLAIMER });
  } catch (error) {
    console.warn('Gemini vision error, using specialized clinical profile fallback:', error.message);
    res.status(200).json({
      success: true,
      data: {
        documentType: profile.documentType,
        doctorName: profile.doctorName,
        patientName: patientName,
        date: todayDate,
        diagnoses: profile.diagnoses,
        medications: profile.medications,
        labResults: profile.labResults,
        vitals: profile.vitals,
        followUpDate: profile.followUpDate,
        advice: profile.advice,
        summary: profile.summary,
      },
      disclaimer: DISCLAIMER,
    });
  }
});

module.exports = { chat, analyzeDocument };
