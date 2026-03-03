"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Send, Bot, User, Sparkles, RotateCcw } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const sampleMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Здравствуйте! Я — AI-ассистент Keneshub. Я помогу вам разобраться с вашей долговой ситуацией. Расскажите, что вас беспокоит — тип задолженности, сумму, действия кредитора.",
    timestamp: new Date(),
  },
];

function AIAssistantContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q");

  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle initial query from dashboard
  useEffect(() => {
    if (initialQuery && messages.length === 1) {
      handleSend(undefined, initialQuery);
    }
  }, [initialQuery, messages.length]);

  const handleSend = async (e?: React.FormEvent, directInput?: string) => {
    if (e) e.preventDefault();
    const messageContent = directInput || input;
    if (!messageContent.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageContent,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messages.map(m => ({ role: m.role, content: m.content })).concat({ role: "user", content: messageContent }),
          conversationId: conversationId
        }),
      });

      if (!response.ok) throw new Error("Ошибка AI");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let aiContent = "";

      const aiMessageId = (Date.now() + 1).toString();
      const aiMessage: Message = {
        id: aiMessageId,
        role: "assistant",
        content: "",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const dataStr = line.replace("data: ", "").trim();
              if (dataStr === "[DONE]") break;

              try {
                const data = JSON.parse(dataStr);
                if (data.content) {
                  aiContent += data.content;
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === aiMessageId ? { ...msg, content: aiContent } : msg
                    )
                  );
                }
                if (data.conversationId) {
                  setConversationId(data.conversationId);
                }
              } catch (e) {
                console.error("Error parsing AI chunk", e);
              }
            }
          }
        }
      }
    } catch (err) {
      console.error("AI Error:", err);
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: "Извините, произошла ошибка при общении с AI. Пожалуйста, попробуйте позже.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <h1 className="text-xl font-sans font-bold text-gray-900">AI Ассистент</h1>
          <p className="text-sm text-gray-400">Помощь по долговым вопросам 24/7</p>
        </div>
        <button
          onClick={() => setMessages(sampleMessages)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Новый чат
        </button>
      </motion.div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 scrollbar-thin">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm ${
              message.role === "assistant"
                ? "bg-zinc-900 text-white"
                : "bg-white border border-gray-200 text-gray-400"
            }`}>
              {message.role === "assistant" ? (
                <Bot className="w-4 h-4" />
              ) : (
                <User className="w-4 h-4" />
              )}
            </div>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
              message.role === "assistant"
                ? "bg-white border border-gray-200 shadow-sm rounded-bl-none"
                : "bg-zinc-900 text-white shadow-lg shadow-zinc-200 rounded-br-none"
            }`}>
              <div className={`text-sm leading-relaxed whitespace-pre-wrap ${
                message.role === "assistant" ? "text-gray-800" : "text-white"
              }`}>
                {message.content}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center shadow-sm">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-gray-200 shadow-sm rounded-2xl rounded-bl-none px-4 py-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-zinc-900 animate-pulse" />
                <span className="text-xs text-gray-500">Keneshub AI анализирует...</span>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-3">
        <form onSubmit={handleSend} className="flex items-end gap-3">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (textareaRef.current) {
                textareaRef.current.style.height = "auto";
                textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend(e);
              }
            }}
            placeholder="Опишите вашу ситуацию..."
            rows={1}
            className="flex-1 bg-transparent text-gray-900 text-sm placeholder:text-gray-400 resize-none focus:outline-none py-2 px-2 max-h-32"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                input.trim() && !isTyping 
                ? "bg-zinc-900 text-white shadow-lg shadow-zinc-200 hover:scale-105 active:scale-95" 
                : "bg-gray-100 text-zinc-400"
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <div className="flex items-center justify-between mt-2 px-2">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Бета-версия AI</span>
          <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Shift + Enter для новой строки</span>
        </div>
      </div>
    </div>
  );
}

export default function AIAssistantPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" /></div>}>
      <AIAssistantContent />
    </Suspense>
  );
}
