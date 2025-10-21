'use client';

import { useLocationStore } from '@/store/locationStore';
import { useWeatherStore } from '@/store/weatherStore';
import { IconLoader2, IconLoader3, IconRobotFace, IconSend2 } from '@tabler/icons-react';
import { useState, useRef, useEffect } from 'react';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    isStreaming?: boolean;
}

export default function WeatherChatbot() {


    const { weather } = useWeatherStore();
    const { city, coOrdinates } = useLocationStore();
    const [messages, setMessages] = useState<Message[]>([]);
    // Set initial message only on client to avoid hydration mismatch
    useEffect(() => {
        if (messages.length === 0) {
            setMessages([
                {
                    id: '1',
                    role: 'assistant',
                    content: `Hi! 👋 I'm your weather assistant. Ask me anything about the weather${city ? ` in ${city.city}` : ''}!`,
                    timestamp: new Date(),
                },
            ]);
        }
    }, [city]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [streamingMessage, setStreamingMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, streamingMessage, input, isTyping]);

    // Simulate typing indicator when bot is thinking
    useEffect(() => {
        if (isLoading) {
            setIsTyping(true);
        } else {
            setIsTyping(false);
        }
    }, [isLoading]);

    const simulateStreaming = (text: string) => {
        return new Promise<void>((resolve) => {
            let index = 0;
            setStreamingMessage('');

            const interval = setInterval(() => {
                if (index < text.length) {
                    setStreamingMessage((prev) => prev + text[index]);
                    index++;
                } else {
                    clearInterval(interval);
                    resolve();
                }
            }, 20); // Adjust speed here (lower = faster)
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: input,
                    weatherData: weather,
                    location: city,
                    conversationHistory: messages.slice(-6),
                }),
            });

            const data = await response.json();

            // Simulate streaming effect
            await simulateStreaming(data.message);

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.message,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, assistantMessage]);
            setStreamingMessage('');
        } catch (error) {
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please try again. 😔',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
            setStreamingMessage('');
        } finally {
            setIsLoading(false);
            inputRef.current?.focus();
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const quickPrompts = [
        "What's the temperature?",
        "Should I bring an umbrella?",
        "What should I wear?",
        "Is it windy?",
    ];

    const handleQuickPrompt = (prompt: string) => {
        setInput(prompt);
        inputRef.current?.focus();
    };

    return (
        <div className="flex flex-col h-[600px] w-full max-w-sm mx-auto rounded-2xl shadow-2xl overflow-hidden" style={{ background: 'white' }}>
            {/* Header */}
            <div className="text-white px-5 py-3 bg-dark2">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white">
                        <IconRobotFace className='text-dark1 w-full h-full p-1' />
                    </div>
                    <div className='-space-y-2'>
                        <h2 className="text-xl font-bold">Weather Assistant</h2>
                        <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 rounded-full animate-pulse bg-accent2"></div>
                            <p className="text-sm font-nunito">Online</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-accent1/20">
                {messages.length === 1 && (
                    <div className="text-center py-4">
                        <p className="text-sm mb-4" style={{ color: 'var(--color-accent1)' }}>Try asking:</p>
                        <div className="flex flex-wrap justify-center gap-2">
                            {quickPrompts.map((prompt, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleQuickPrompt(prompt)}
                                    className="px-3 py-2 rounded-full text-sm transition-all"
                                    style={{ background: 'white', color: 'var(--color-dark2)', border: '1px solid var(--color-accent2)' }}
                                >
                                    {prompt}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'
                            } animate-fadeIn`}
                    >
                        <div
                            className={`max-w-[85%] rounded-2xl px-4 py-2 shadow-sm ${message.role === 'user'
                                ? 'bg-linear-to-br from-primary/40 to-primary/60 text-dark2 rounded-br-none'
                                : 'bg-white text-dark2 rounded-bl-none border border-dark2'
                                }`}
                        >
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                            <span
                                className={`text-xs mt-1 block ${message.role === 'user' ? "text-dark1" : "text-dark2/60"}`}
                            >
                                {message.timestamp.toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </span>
                        </div>
                    </div>
                ))}

                {/* Streaming Message */}
                {streamingMessage && (
                    <div className="flex justify-start animate-fadeIn">
                        <div className="max-w-[85%] rounded-2xl rounded-bl-none px-4 py-3 shadow-sm" style={{ background: 'white', color: 'var(--color-dark2)', borderBottomLeftRadius: 0, border: '1px solid var(--color-accent2)' }}>
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                {streamingMessage}
                                <span className="inline-block w-1 h-4 ml-1 animate-blink" style={{ background: 'var(--color-primary)' }}></span>
                            </p>
                        </div>
                    </div>
                )}

                {/* Typing Indicator */}
                {isTyping && !streamingMessage && (
                    <div className="flex justify-start">
                        <div className="rounded-2xl rounded-bl-none px-4 py-3 shadow-sm" style={{ background: 'white', borderBottomLeftRadius: 0, border: '1px solid var(--color-accent2)' }}>
                            <div className="flex space-x-2">
                                <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: 'var(--color-accent1)' }}></div>
                                <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: 'var(--color-accent1)', animationDelay: '0.1s' }}></div>
                                <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: 'var(--color-accent1)', animationDelay: '0.2s' }}></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="px-4 py-2 bg-white border border-accent2">
                <form onSubmit={handleSubmit} className="flex items-end space-x-2">
                    <div className="flex-1 relative">
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message..."
                            className="w-full px-4 py-2.5 pr-12 rounded-full focus:outline-none transition-all"
                            style={{ border: '1px solid var(--color-accent2)', background: 'white', color: 'var(--color-dark2)', boxShadow: 'none' }}
                            disabled={isLoading}
                        />
                        <div className="absolute right-3 bottom-0 text-gray-400 text-xs">
                            {input.length}/500
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="px-6 py-2 rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-lg bg-dark2 text-white"
                        style={{ opacity: isLoading || !input.trim() ? 0.5 : 1, cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer' }}
                    >
                        {isLoading ? (
                            <IconLoader3 className='animate-spin' />
                        ) : (
                            <IconSend2 />
                        )}
                    </button>
                </form>
                <p className="text-xs mt-2 text-center" style={{ color: 'var(--color-accent1)' }}>
                    Press Enter to send • Shift+Enter for new line
                </p>
            </div>

            <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes blink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
        </div>
    );
}