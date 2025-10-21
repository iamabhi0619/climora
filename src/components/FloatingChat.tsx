'use client';

import { useState } from 'react';
import WeatherChatbot from './WeatherChatbot';
import { IconAi, IconChevronDown, IconX } from '@tabler/icons-react';


export default function FloatingChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [hasNewMessage, setHasNewMessage] = useState(false);

    const toggleChat = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setHasNewMessage(false);
        }
    };

    return (
        <>
            {/* Floating Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 z-50 animate-slideUp">
                    <div className="relative">
                        {/* Close button */}
                        <button
                            onClick={toggleChat}
                            className="absolute -top-2 -right-2 cursor-pointer w-6 h-6 bg-accent1 rounded-full transition-all shadow-lg z-10 flex items-center justify-center"
                        >
                            <IconX className='w-full h-full text-white p-0.5' />
                        </button>
                        <WeatherChatbot />
                    </div>
                </div >
            )
            }

            {/* Floating Chat Button */}
            <button
                onClick={toggleChat}
                className="fixed bottom-6 w-12 h-12 right-6 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all z-40 flex items-center justify-center group"
                style={{ background: 'var(--color-dark2)', color: 'white' }}
            >
                {isOpen ? (
                    <>
                        <IconChevronDown size={30} className='w-full h-full' />
                    </>
                ) : (
                    <>
                        <IconAi size={30} className='w-full h-full' />
                        {hasNewMessage && (
                            <span className="absolute top-0 right-0 w-4 h-4 rounded-full border-2 border-white animate-pulse"
                                style={{ background: 'var(--color-accent1)' }}></span>
                        )}
                    </>
                )}

                {/* Tooltip */}
                <span className="absolute right-16 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {isOpen ? "Close Chat" : "Chat with AI"}
                </span>
            </button>

            {/* Pulse animation ring */}
            {
                !isOpen && (
                    <div className="fixed bottom-6 right-6 w-12 h-12 rounded-full animate-ping opacity-20 z-30 pointer-events-none"
                        style={{ background: 'var(--color-dark1)' }}></div>
                )
            }

            <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
        </>
    );
}