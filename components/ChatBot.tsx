import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { sendChatMessage } from '../services/geminiService';
import { ChatMessage } from '../types';

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Welcome to Serenity Sands. I am Aurelia, your personal concierge. How may I assist you today?', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Prepare history for API (excluding the last user message we just added visually)
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const responseText = await sendChatMessage(history, userMsg.text);
      
      const botMsg: ChatMessage = { role: 'model', text: responseText, timestamp: new Date() };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "I apologize, but I'm having trouble connecting right now.", timestamp: new Date(), isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100 bg-navy-900 text-gold-400 hover:bg-navy-800'
        }`}
        aria-label="Open Chat"
      >
        <MessageSquare size={28} />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-full max-w-sm bg-white rounded-2xl shadow-2xl flex flex-col transition-all duration-300 transform origin-bottom-right border border-stone-200 overflow-hidden ${
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-12 pointer-events-none'
        }`}
        style={{ height: '500px' }}
      >
        {/* Header */}
        <div className="bg-navy-900 p-4 flex justify-between items-center text-gold-100">
          <div className="flex items-center gap-2">
            <div className="bg-gold-500 p-1.5 rounded-full">
              <Sparkles size={16} className="text-navy-900" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg">Aurelia</h3>
              <p className="text-xs text-gold-300 uppercase tracking-widest">AI Concierge</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gold-300 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-stone-50 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-gold-500 text-white rounded-br-none'
                    : 'bg-white border border-stone-200 text-stone-700 rounded-bl-none shadow-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-stone-200 p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1">
                <span className="w-2 h-2 bg-gold-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gold-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                <span className="w-2 h-2 bg-gold-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-stone-100">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about rooms, dining, or services..."
              className="w-full bg-stone-100 border-none rounded-full py-3 pl-4 pr-12 text-sm focus:ring-2 focus:ring-gold-400 focus:bg-white transition-all outline-none text-stone-800 placeholder-stone-400"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 p-2 bg-navy-900 text-gold-400 rounded-full hover:bg-navy-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
