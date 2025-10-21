import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// In-memory rate limiter
const requestLog = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 20;

function checkRateLimit(identifier: string): boolean {
    const now = Date.now();
    if (!requestLog.has(identifier)) requestLog.set(identifier, []);
    const requests = requestLog.get(identifier)!;
    const recentRequests = requests.filter(t => now - t < RATE_LIMIT_WINDOW_MS);

    if (recentRequests.length >= MAX_REQUESTS) return false;

    recentRequests.push(now);
    requestLog.set(identifier, recentRequests);
    return true;
}

export async function POST(req: NextRequest) {
    try {
        // Ensure API key exists
        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({ message: '⚠️ Gemini API key is missing.' }, { status: 500 });
        }

        const identifier = req.headers.get('x-forwarded-for') || 'default';
        if (!checkRateLimit(identifier)) {
            return NextResponse.json({ message: 'Too many requests. 🕐' }, { status: 429 });
        }

        const { message, weatherData, location, conversationHistory } = await req.json();

        if (!message?.trim()) {
            return NextResponse.json({ message: 'Please enter a message.' }, { status: 400 });
        }

        if (message.length > 500) {
            return NextResponse.json({ message: 'Message too long (max 500 characters).' }, { status: 400 });
        }

        // Build weather context
        const weatherContext = weatherData
            ? `Weather for ${location}: ${JSON.stringify(weatherData)}`
            : 'Weather data is currently unavailable.';

        // Build conversation history (last 6 messages)
        const conversationContext = conversationHistory?.slice(-6)
            .map((msg: any) => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
            .join('\n') || '';

        // Construct prompt for Gemini
        const prompt = `You are WeatherBot 🌤️.

${weatherContext}

Previous conversation:
${conversationContext}

User's question: ${message}

Instructions:
- Be friendly and conversational
- Use 1-2 emojis per response
- Provide accurate weather info and recommendations
- Keep responses concise (2-4 sentences)
- Redirect non-weather questions politely

Your response:`;

        // Try multiple Gemini models in order
        const modelNames = ['gemini-2.5-flash', 'gemini-2.5-flash-lite', 'gemini-2.5-pro'];
        let assistantMessage = '';
        let lastError: any;

        for (const modelName of modelNames) {
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent({
                    contents: [{ role: 'user', parts: [{ text: prompt }] }],
                    generationConfig: { temperature: 0.7, topK: 40, topP: 0.95, maxOutputTokens: 200 },
                });

                assistantMessage = result.response?.text()?.trim() || '';
                if (assistantMessage) break; // Stop after first successful generation
            } catch (err) {
                lastError = err;
                continue; // Try next model
            }
        }

        if (!assistantMessage) {
            console.error('All Gemini models failed:', lastError);
            assistantMessage = "I'm having trouble generating a response. 😊";
        }

        return NextResponse.json({ message: assistantMessage, timestamp: new Date().toISOString() });

    } catch (error: any) {
        console.error('Chat API Error:', error);
        return NextResponse.json({ message: 'Error: ' + error.message }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({
        status: 'ok',
        apiKeyConfigured: !!process.env.GEMINI_API_KEY,
        timestamp: new Date().toISOString()
    });
}
