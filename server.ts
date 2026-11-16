import express, { Request, Response, NextFunction } from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '2mb' }));

// Sliding-window rate limiter for AI routes (30 requests / 60s per IP)
const aiRateLimitStore = new Map<string, { count: number; windowStart: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 30;

function aiRateLimiter(req: Request, res: Response, next: NextFunction) {
  const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.ip || 'unknown';
  const now = Date.now();
  const entry = aiRateLimitStore.get(clientIp);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    aiRateLimitStore.set(clientIp, { count: 1, windowStart: now });
    return next();
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return res.status(429).json({
      error: 'Too many tutor requests in a short period. Please wait a minute and try again.',
    });
  }

  entry.count += 1;
  return next();
}

function sanitizeText(input: unknown, maxLen = 6000): string {
  if (typeof input !== 'string') return '';
  return input.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, maxLen);
}

// Server-side Gemini AI client initialization
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const ACTIVE_TEXT_MODEL = 'gemini-4-hydrogen';

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: !!process.env.GEMINI_API_KEY,
    model: ACTIVE_TEXT_MODEL,
    timestamp: new Date().toISOString(),
  });
});

// 1. Bilingual AI English Tutor & Coach (BEGINNER | INTERMEDIATE | ADVANCED)
app.post('/api/ai/coach', aiRateLimiter, async (req, res) => {
  try {
    const rawMessages = Array.isArray(req.body?.messages) ? req.body.messages.slice(-16) : [];
    const learningMode = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'].includes(req.body?.learningMode)
      ? req.body.learningMode
      : 'INTERMEDIATE';
    const responseLanguage = ['en', 'hi', 'both'].includes(req.body?.language)
      ? req.body.language
      : 'both';
    const taskType = sanitizeText(req.body?.taskType, 80) || 'general';

    if (rawMessages.length === 0) {
      return res.status(400).json({ error: 'Please provide at least one question or message.' });
    }

    const sanitizedMessages = rawMessages
      .map((m: { role?: unknown; content?: unknown }) => ({
        role: m?.role === 'assistant' ? 'model' : 'user',
        content: sanitizeText(m?.content, 4000),
      }))
      .filter((m: { content: string }) => m.content.length > 0);

    if (sanitizedMessages.length === 0) {
      return res.status(400).json({ error: 'Message content cannot be empty.' });
    }

    if (!ai) {
      return res.status(503).json({
        error: 'Gemini API key is not configured on the server yet. Please attach GEMINI_API_KEY in Settings > Secrets.',
      });
    }

    const levelGuidance: Record<string, string> = {
      BEGINNER: 'Explain concepts step by step using simple everyday vocabulary, short sentences, clear foundational rules, and everyday English/Hindi illustrations.',
      INTERMEDIATE: 'Provide balanced grammatical rules, sentence transformations, common examination pitfalls, British vs American usage notes, and applied examples.',
      ADVANCED: 'Deliver scholarly depth suitable for NTA UGC NET, MP SET, and linguistics students, covering syntax trees, semantic nuances, stylistics, and critical theory.',
    };

    const langGuidance: Record<string, string> = {
      en: 'Respond in clear, structured academic English.',
      hi: 'Respond primarily in accurate, natural Hindi (देवनागरी), retaining exact English grammatical terms and example sentences alongside natural Hindi translations.',
      both: 'Respond bilingually: give the structured explanation and examples in clear English followed by a natural, accurate Hindi (हिन्दी) explanation and Hindi translations of key examples.',
    };

    const systemInstruction = `You are "Crafty English AI Tutor", an expert English grammarian, linguist, literature professor, spoken English coach, and Hindi-English bilingual educator.
Active Student Level: ${learningMode} (${levelGuidance[learningMode]}).
Language Setting: ${langGuidance[responseLanguage]}.
Requested Focus Area: ${taskType}.

Capabilities you perform accurately:
1. Explain English grammar rules (all 37 curriculum levels) and correct mistakes step by step.
2. Analyze clause & sentence structure, active/passive voice, direct/indirect speech, modals, conditionals, and common exam errors.
3. Translate accurately and naturally between English and Hindi (without word-for-word robotic translation).
4. Teach difficult vocabulary with phonetic clues, synonyms, antonyms, and contextual sentences.
5. Generate personalized practice questions (with answers & explanations hidden below a clear divider or formatted cleanly) when asked.
6. Guide spoken English pronunciation (British RP vs American English differences), fluency drills, and literary concepts (NTA UGC NET, MP SET, MPESB TET).
Never invent fake book references or fabricated exam years.`;

    const contents = sanitizedMessages.map((m: { role: string; content: string }) => ({
      role: m.role,
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: ACTIVE_TEXT_MODEL,
      contents,
      config: {
        systemInstruction,
      },
    });

    const reply = response.text;
    if (!reply) {
      return res.status(502).json({ error: 'Empty response received from Gemini AI Tutor.' });
    }
    return res.json({ reply, model: ACTIVE_TEXT_MODEL, learningMode });
  } catch (err: unknown) {
    console.error('Error in /api/ai/coach:', err);
    return res.status(500).json({
      error: err instanceof Error ? err.message : 'Failed to process AI English Tutor request.',
    });
  }
});

// 2. Dynamic Grammar Correction & Smart Fix Suggestions
app.post('/api/ai/grammar-check', aiRateLimiter, async (req, res) => {
  try {
    const text = sanitizeText(req.body?.text, 5000);
    if (!text) {
      return res.status(400).json({ error: 'Text is required for grammar check.' });
    }

    if (!ai) {
      return res.status(503).json({
        error: 'Gemini API key is not configured on the server yet. Please check Settings > Secrets.',
      });
    }

    const systemInstruction = `You are a strict, constructive English Grammar & Syntax Analyzer.
Analyze the user's English text for grammatical errors (subject-verb agreement, tense shifts, articles, prepositions, modifiers, punctuation, British/American consistency) and style improvements.
Include both clear English explanations and helpful natural Hindi hints inside explanations.`;

    const response = await ai.models.generateContent({
      model: ACTIVE_TEXT_MODEL,
      contents: `Analyze this text for grammar, punctuation, and stylistic fixes:\n\n"""${text}"""`,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER, description: '0-100 grammar score' },
            improvedText: { type: Type.STRING, description: 'Fully corrected version of the text' },
            readabilityNote: { type: Type.STRING, description: 'Concise readability and bilingual feedback note' },
            errors: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  original: { type: Type.STRING },
                  replacement: { type: Type.STRING },
                  category: { type: Type.STRING },
                  severity: { type: Type.STRING },
                  explanation: { type: Type.STRING },
                },
              },
            },
            vocabularySuggestions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  original: { type: Type.STRING },
                  advanced: { type: Type.STRING },
                  reason: { type: Type.STRING },
                },
              },
            },
          },
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (err: unknown) {
    console.error('Error in /api/ai/grammar-check:', err);
    return res.status(500).json({
      error: err instanceof Error ? err.message : 'Grammar check failed.',
    });
  }
});

// 3. Tone Shifter Tool
app.post('/api/ai/tone-shift', aiRateLimiter, async (req, res) => {
  try {
    const text = sanitizeText(req.body?.text, 5000);
    const targetTone = sanitizeText(req.body?.targetTone, 80) || 'Academic Research';
    if (!text) {
      return res.status(400).json({ error: 'Text is required for tone shifting.' });
    }

    if (!ai) {
      return res.status(503).json({
        error: 'Gemini API key is not configured on the server yet. Please check Settings > Secrets.',
      });
    }

    const systemInstruction = `You are an expert English stylistic editor. Rewrite the text cleanly in the requested tone ("Formal Business", "Creative Storytelling", "Casual Idiomatic", "Academic Research", or "NET/SET Critical Essay").`;

    const response = await ai.models.generateContent({
      model: ACTIVE_TEXT_MODEL,
      contents: `Target Tone: ${targetTone}\n\nOriginal Text:\n"""${text}"""`,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            rewrittenText: { type: Type.STRING },
            explanation: { type: Type.STRING },
            keyVocabularyUsed: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (err: unknown) {
    console.error('Error in /api/ai/tone-shift:', err);
    return res.status(500).json({
      error: err instanceof Error ? err.message : 'Tone shift failed.',
    });
  }
});

// 4. Exam Explainer (NTA UGC NET, MP SET, MPESB TET, Grammar)
app.post('/api/ai/exam-explainer', aiRateLimiter, async (req, res) => {
  try {
    const question = sanitizeText(req.body?.question, 2000);
    const options = Array.isArray(req.body?.options) ? req.body.options.slice(0, 8) : [];
    const selectedOption = sanitizeText(req.body?.selectedOption, 400);
    const correctOption = sanitizeText(req.body?.correctOption, 400);
    const examContext = sanitizeText(req.body?.examContext, 120) || 'NTA UGC NET English';

    if (!question || !correctOption) {
      return res.status(400).json({ error: 'Question and verified correct option are required.' });
    }

    if (!ai) {
      return res.status(503).json({
        error: 'Gemini API key is not configured on the server yet. Please check Settings > Secrets.',
      });
    }

    const systemInstruction = `You are the Academic Director for NTA UGC NET English, MP SET, and Competitive English Grammar.
Provide an accurate, scholarly breakdown without inventing false publication years or fake citations.`;

    const prompt = `Context: ${examContext}
Question: ${question}
Options: ${JSON.stringify(options)}
Verified Correct Answer: ${correctOption}
Student Selected: ${selectedOption || 'Not answered'}`;

    const response = await ai.models.generateContent({
      model: ACTIVE_TEXT_MODEL,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            detailedExplanation: { type: Type.STRING },
            examTip: { type: Type.STRING },
            pyqTrendNote: { type: Type.STRING },
          },
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (err: unknown) {
    console.error('Error in /api/ai/exam-explainer:', err);
    return res.status(500).json({
      error: err instanceof Error ? err.message : 'Exam explanation failed.',
    });
  }
});

// Vite middleware for dev / static files for prod
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Crafty English server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Server failed to start:', err);
  process.exit(1);
});
