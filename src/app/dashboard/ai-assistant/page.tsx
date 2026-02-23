"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
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

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Спасибо за ваш вопрос. На основании предоставленной информации и законодательства РК, могу сообщить следующее:\n\n1. **Ваши права защищены** — согласно Закону РК «О защите прав потребителей финансовых услуг», кредитор обязан предоставить полную информацию о задолженности.\n\n2. **Рекомендации:**\n   - Запросите полную выписку по кредиту\n   - Проверьте законность начисленных штрафов\n   - Рассмотрите возможность реструктуризации\n\n3. **Следующий шаг:** Для более детального анализа рекомендую загрузить кредитный договор в раздел «Документы».\n\nХотите, чтобы я подготовил заявление на реструктуризацию?`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2500);
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
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
              message.role === "assistant"
                ? "bg-gray-900 text-white"
                : "bg-gray-200"
            }`}>
              {message.role === "assistant" ? (
                <Bot className="w-4 h-4 text-gray-900" />
              ) : (
                <User className="w-4 h-4 text-gray-300" />
              )}
            </div>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
              message.role === "assistant"
                ? "bg-white border border-gray-200 shadow-sm rounded-2xl border border-gray-200 rounded-bl-md"
                : "bg-gray-100 border border-gray-200 rounded-br-md"
            }`}>
              <div className="text-sm text-gray-200 leading-relaxed whitespace-pre-wrap">
                {message.content.split(/(\*\*.*?\*\*)/).map((part, i) => {
                  if (part.startsWith("**") && part.endsWith("**")) {
                    return <strong key={i} className="text-gray-900">{part.slice(2, -2)}</strong>;
                  }
                  return part;
                })}
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
            <div className="w-8 h-8 rounded-lg bg-gray-900 text-white flex items-center justify-center">
              <Bot className="w-4 h-4 text-gray-900" />
            </div>
            <div className="bg-white border border-gray-200 shadow-sm rounded-2xl rounded-bl-md px-4 py-3 border border-gray-200">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-gray-900 animate-pulse" />
                <span className="text-xs text-gray-500">Keneshub AI анализирует...</span>
                <div className="flex gap-1">
                  <span className="ai-typing-dot" />
                  <span className="ai-typing-dot" />
                  <span className="ai-typing-dot" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-3 border border-gray-200">
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
            className="flex-1 bg-transparent text-gray-900 text-sm placeholder:text-gray-600 resize-none focus:outline-none py-2 px-2 max-h-32"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center text-gray-900 hover:shadow-lg hover:shadow-accent-blue/20 transition-all disabled:opacity-50 disabled:hover:shadow-none flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <div className="flex items-center justify-between mt-2 px-2">
          <span className="text-xs text-gray-600">14/20 запросов использовано</span>
          <span className="text-xs text-gray-600">Shift + Enter для новой строки</span>
        </div>
      </div>
    </div>
  );
}
