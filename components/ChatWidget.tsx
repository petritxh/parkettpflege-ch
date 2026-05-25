'use client';

// @ts-nocheck
import { useState, useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type UIMessage } from 'ai';
import { MessageSquare, X, Send, Paperclip, Loader2, Sparkles, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const chatTransport = new DefaultChatTransport({
    body: () => ({
      data: selectedImage ? { imageUrl: selectedImage } : undefined,
    }),
  });

  const { messages, sendMessage, status } = useChat<UIMessage>({
    transport: chatTransport,
    messages: [
      {
        id: 'welcome',
        role: 'assistant',
        parts: [
          {
            type: 'text',
            text: 'Hallo! Ich bin dein Parkett-Assistent. Wie kann ich dir helfen? Wenn du einen Schaden hast, kannst du mir gerne ein Foto davon hochladen.'
          }
        ]
      }
    ]
  });

  const isLoading = status === 'submitted' || status === 'streaming';

  const getMessageText = (message: UIMessage) =>
    message.parts
      .filter((part): part is { type: 'text'; text: string } => part.type === 'text')
      .map((part) => part.text)
      .join('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-open chat after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedInput = inputValue.trim();
    if (!trimmedInput && !selectedImage) return;

    try {
      const messageData: any = {
        text: trimmedInput || (selectedImage ? 'Hier ist ein Foto meines Parketts.' : ''),
      };

      // Convert base64 image to File if present
      if (selectedImage) {
        const blob = await fetch(selectedImage).then(res => res.blob());
        const file = new File([blob], 'parkett-foto.jpg', { type: 'image/jpeg' });
        // Create a FileList-like object
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        messageData.files = dataTransfer.files;
      }

      await sendMessage(messageData);
      setInputValue('');
      setSelectedImage(null);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-secondary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        aria-label="Chat öffnen"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-primary border-2 border-white"></span>
        </span>
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-6 right-6 w-[380px] max-w-[calc(100vw-3rem)] bg-surface/90 backdrop-blur-xl border border-outline-variant/30 shadow-2xl rounded-3xl overflow-hidden flex flex-col z-50 transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'} h-[600px] max-h-[calc(100vh-3rem)]`}>
        
        {/* Header */}
        <div className="bg-secondary p-4 flex justify-between items-center text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/30">
              <Sparkles className="w-5 h-5 text-primary-container" />
            </div>
            <div>
              <h3 className="font-headline-sm text-sm">Parkett-Assistent</h3>
              <p className="text-[10px] text-white/70 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span> Online
              </p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface-container-lowest/50">
          {messages.map((m) => (
            <div key={m.id} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
              
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.role === 'user' ? 'bg-primary-container text-primary' : 'bg-secondary-container text-secondary'}`}>
                {m.role === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
              </div>
              
              <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${m.role === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-surface border border-outline-variant/30 text-on-surface rounded-tl-none'}`}>
                
                <div className={`prose prose-sm max-w-none ${m.role === 'user' ? 'prose-invert prose-p:text-white' : 'prose-p:text-on-surface-variant'}`}>
                  <ReactMarkdown>
                    {getMessageText(m)}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          {isLoading && messages[messages.length - 1]?.role === 'user' && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary-container text-secondary flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="bg-surface border border-outline-variant/30 rounded-2xl rounded-tl-none p-4 flex gap-1 items-center">
                <span className="w-2 h-2 rounded-full bg-secondary animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-secondary animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-2 h-2 rounded-full bg-secondary animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-surface border-t border-outline-variant/30 shrink-0">
          
          {selectedImage && (
            <div className="mb-3 relative inline-block">
               {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={selectedImage} alt="Upload preview" className="h-20 w-20 object-cover rounded-lg border-2 border-primary" />
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-2 -right-2 bg-error text-white rounded-full p-1 hover:bg-error/90"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          <form onSubmit={onSubmit} className="flex gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-3 text-on-surface-variant hover:bg-surface-variant rounded-xl transition-colors shrink-0"
              title="Foto hochladen"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={handleImageUpload}
            />
            
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={selectedImage ? "Bild beschreiben..." : "Frage stellen..."}
              className="flex-1 bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-2 font-body-md text-sm focus:ring-2 focus:ring-secondary/50 outline-none"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              disabled={isLoading || (!inputValue.trim() && !selectedImage)}
              className="p-3 bg-secondary text-white rounded-xl hover:bg-secondary/90 transition-colors shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          <div className="text-center mt-2">
             <span className="text-[9px] text-on-surface-variant/70">Powered by Parkettpflege AI</span>
          </div>
        </div>

      </div>
    </>
  );
}
