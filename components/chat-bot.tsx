"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

interface Message {
  id: number
  text: string
  isBot: boolean
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "¡Hola! Soy el asistente virtual de IASSIST. ¿En qué puedo ayudarte hoy?",
    isBot: true,
    timestamp: new Date(),
  },
]

export default function ChatBot({ isDark }: { isDark: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: newMessage,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")
    setIsTyping(true)

    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponses = [
        "¡Claro! Puedo ayudarte con información sobre nuestros planes de protección.",
        "Nuestro servicio cubre todo tipo de dispositivos móviles, incluyendo smartphones y tablets.",
        "La validación con IA toma solo unos segundos y es completamente segura.",
        "Puedes registrar hasta 5 dispositivos en una sola cuenta.",
        "El reembolso se procesa en 48 horas una vez aprobada la solicitud.",
        "¿Necesitas más información sobre algún tema específico?",
      ]

      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        isBot: true,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={toggleChat}
          className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? isDark
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-black text-white hover:bg-gray-800"
              : isDark
                ? "bg-[#0067B2] text-white hover:bg-[#0067B2]/80"
                : "bg-[#0067B2] text-white hover:bg-[#0067B2]/80"
          }`}
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`fixed bottom-24 right-6 w-80 sm:w-96 z-40 rounded-2xl overflow-hidden shadow-xl glass-card ${
              isDark ? "bg-[#181818]/95 border border-white/10" : "bg-gray-800/90 border border-gray-600/30"
            }`}
          >
            {/* Chat Header */}
            <div
              className={`p-4 flex items-center justify-between ${
                isDark ? "bg-[#0067B2]/20 border-b border-white/10" : "bg-gray-700/50 border-b border-gray-600/30"
              }`}
            >
              <div className="flex items-center space-x-2">
                <Bot className="h-5 w-5 text-[#0067B2]" />
                <h3 className={`font-medium transition-colors duration-300 ${isDark ? "text-white" : "text-white"}`}>
                  Asistente IASSIST
                </h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleChat}
                className={`p-1 h-8 w-8 rounded-full transition-colors ${
                  isDark ? "hover:bg-white/10 text-white" : "hover:bg-white/10 text-white"
                }`}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Chat Messages */}
            <div className={`h-80 overflow-y-auto p-4 ${isDark ? "scrollbar-dark" : "scrollbar-light"}`}>
              {messages.map((message) => (
                <div key={message.id} className={`mb-4 flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.isBot
                        ? isDark
                          ? "bg-[#0067B2]/20 text-white"
                          : "bg-[#0067B2]/30 text-white"
                        : isDark
                          ? "bg-white/10 text-white"
                          : "bg-white/20 text-white"
                    }`}
                  >
                    <div className="flex items-center space-x-1 mb-1">
                      {message.isBot ? (
                        <Bot className="h-3 w-3 text-[#0067B2]" />
                      ) : (
                        <User className="h-3 w-3 text-gray-400" />
                      )}
                      <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-300"}`}>
                        {message.isBot ? "Asistente" : "Tú"} •{" "}
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="mb-4 flex justify-start">
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      isDark ? "bg-[#0067B2]/20 text-white" : "bg-[#0067B2]/30 text-white"
                    }`}
                  >
                    <div className="flex items-center space-x-1 mb-1">
                      <Bot className="h-3 w-3 text-[#0067B2]" />
                      <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                        Asistente está escribiendo...
                      </span>
                    </div>
                    <div className="flex space-x-1">
                      <div className="typing-dot"></div>
                      <div className="typing-dot animation-delay-200"></div>
                      <div className="typing-dot animation-delay-400"></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <form
              onSubmit={handleSendMessage}
              className={`p-4 flex items-center space-x-2 border-t ${isDark ? "border-white/10" : "border-gray-600/30"}`}
            >
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Escribe un mensaje..."
                className={`flex-1 transition-colors duration-300 ${
                  isDark
                    ? "bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    : "bg-white/10 border-white/20 text-white placeholder:text-gray-300"
                }`}
              />
              <Button
                type="submit"
                disabled={!newMessage.trim() || isTyping}
                className={`transition-all duration-300 ${
                  isDark
                    ? "bg-white text-black hover:bg-gray-200 disabled:bg-white/20 disabled:text-gray-500"
                    : "bg-black text-white hover:bg-gray-800 disabled:bg-black/20 disabled:text-gray-400"
                }`}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
