const { GoogleGenerativeAI } = require('@google/generative-ai');
const asyncHandler = require('../utils/asyncHandler');

const DISCLAIMER =
  'AI responses are for educational purposes only and are not a substitute for professional medical advice.';

const SYSTEM_INSTRUCTION = `You are a helpful, careful health education assistant embedded in a rural healthcare platform.
You can:
- Help users understand symptoms in plain language
- Answer general health questions
- Offer general diet and exercise suggestions
- Encourage users to seek in-person care for anything serious or urgent

You must NEVER:
- Provide a definitive diagnosis
- Prescribe medication, dosages, or treatment plans
- Discourage someone from seeing a doctor when symptoms sound serious

Keep answers concise, clear, and easy to understand for people who may have limited health literacy.
If symptoms sound urgent or severe (e.g. chest pain, difficulty breathing, severe bleeding), clearly advise the user to seek emergency care immediately.`;

// @desc    Chat with the Gemini-powered AI Health Assistant
// @route   POST /api/ai/chat
// @access  Private
const chat = asyncHandler(async (req, res) => {
  const { message, history } = req.body;

  if (!message || !message.trim()) {
    return res.status(400).json({ success: false, message: 'Message is required' });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({
      success: false,
      message: 'AI assistant is not configured. Please set GEMINI_API_KEY on the server.',
    });
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction: SYSTEM_INSTRUCTION,
  });

  // history is an array of { role: 'user'|'model', parts: [{ text }] } from the client
  const chatSession = model.startChat({
    history: Array.isArray(history) ? history : [],
    generationConfig: { maxOutputTokens: 500 },
  });

  const result = await chatSession.sendMessage(message);
  const responseText = result.response.text();

  res.status(200).json({
    success: true,
    reply: responseText,
    disclaimer: DISCLAIMER,
  });
});

module.exports = { chat };
