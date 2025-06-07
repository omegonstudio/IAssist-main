"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import {
  Smartphone,
  Shield,
  Zap,
  ArrowRight,
  Download,
  Brain,
  LinkIcon,
  Users,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Moon,
  Sun,
  Globe,
} from "lucide-react"
import ChatBot from "@/components/chat-bot"

// Traducciones
const translations = {
  es: {
    nav: {
      home: "Home",
      about: "Somos",
      login: "Login",
    },
    hero: {
      title: "Protegé lo que te conecta con tus mejores momentos",
      subtitle: "Viví sin preocupaciones. Siempre conectado. Siempre protegido.",
      cta: "Descargar la app",
      stores: "App Store • Google Play",
    },
    benefits: {
      fast: {
        title: "Rápido",
        description: "Validación instantánea con tecnología de vanguardia",
      },
      secure: {
        title: "Seguro",
        description: "Protección blockchain y encriptación de nivel militar",
      },
      simple: {
        title: "Simple",
        description: "Interfaz intuitiva diseñada para todos los usuarios",
      },
    },
    process: {
      title: "Proceso Simple y Efectivo",
      steps: {
        register: {
          title: "Registrá tu equipo",
          description: "Carga los datos de tu dispositivo en segundos",
        },
        validate: {
          title: "Validación con IA",
          description: "Nuestro sistema verifica automáticamente",
        },
        coverage: {
          title: "Cobertura activa",
          description: "Tu dispositivo queda protegido al instante",
        },
        refund: {
          title: "Reembolso en 48hs",
          description: "Proceso rápido y sin complicaciones",
        },
      },
      cta: "Descargar la app",
    },
    protection: {
      title: "Tu tranquilidad en cada momento",
      description:
        "Desde aventuras urbanas hasta momentos íntimos, tu tecnología está protegida para que puedas vivir cada experiencia sin preocupaciones.",
      cta: "Ver más",
    },
    trust: {
      title: "Tecnología en la que confías",
      blockchain: {
        title: "Blockchain",
        description: "Registro inmutable y transparente de todas las transacciones",
      },
      ai: {
        title: "IA Inteligente",
        description: "Algoritmos avanzados para detección y validación automática",
      },
      users: {
        title: "+30.000 usuarios protegidos",
        description: "Una comunidad creciente que confía en nuestra tecnología",
      },
      partners: "Aliados tecnológicos:",
    },
    cta: {
      title: "Tu tecnología, lista para la aventura",
      button: "Comenzar ahora",
    },
    about: {
      title: "Somos IASSIST",
      description:
        "Protegemos lo que te conecta con tus mejores momentos. Somos una empresa tecnológica dedicada a brindar tranquilidad digital a través de soluciones innovadoras, ágiles y comprensibles para todos.",
      values: {
        innovation: {
          title: "Innovación",
          description: "Tecnología de vanguardia",
        },
        agility: {
          title: "Agilidad",
          description: "Respuestas rápidas",
        },
        understanding: {
          title: "Comprensión",
          description: "Soluciones humanas",
        },
        security: {
          title: "Seguridad",
          description: "Protección total",
        },
      },
    },
    footer: {
      contact: "Contactanos",
      name: "Nombre",
      email: "Email",
      message: "Mensaje",
      send: "Enviar mensaje",
      rights: "© 2024 IASSIST. Todos los derechos reservados.",
      privacy: "Privacidad",
      terms: "Términos y Condiciones",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      login: "Login",
    },
    hero: {
      title: "Protect what connects you to your best moments",
      subtitle: "Live worry-free. Always connected. Always protected.",
      cta: "Download the app",
      stores: "App Store • Google Play",
    },
    benefits: {
      fast: {
        title: "Fast",
        description: "Instant validation with cutting-edge technology",
      },
      secure: {
        title: "Secure",
        description: "Blockchain protection and military-grade encryption",
      },
      simple: {
        title: "Simple",
        description: "Intuitive interface designed for all users",
      },
    },
    process: {
      title: "Simple and Effective Process",
      steps: {
        register: {
          title: "Register your device",
          description: "Upload your device data in seconds",
        },
        validate: {
          title: "AI Validation",
          description: "Our system verifies automatically",
        },
        coverage: {
          title: "Active coverage",
          description: "Your device is protected instantly",
        },
        refund: {
          title: "48h refund",
          description: "Fast process without complications",
        },
      },
      cta: "Download the app",
    },
    protection: {
      title: "Your peace of mind in every moment",
      description:
        "From urban adventures to intimate moments, your technology is protected so you can live every experience worry-free.",
      cta: "Learn more",
    },
    trust: {
      title: "Technology you can trust",
      blockchain: {
        title: "Blockchain",
        description: "Immutable and transparent record of all transactions",
      },
      ai: {
        title: "Smart AI",
        description: "Advanced algorithms for automatic detection and validation",
      },
      users: {
        title: "+30,000 protected users",
        description: "A growing community that trusts our technology",
      },
      partners: "Technology partners:",
    },
    cta: {
      title: "Your technology, ready for adventure",
      button: "Start now",
    },
    about: {
      title: "We are IASSIST",
      description:
        "We protect what connects you to your best moments. We are a technology company dedicated to providing digital peace of mind through innovative, agile and understandable solutions for everyone.",
      values: {
        innovation: {
          title: "Innovation",
          description: "Cutting-edge technology",
        },
        agility: {
          title: "Agility",
          description: "Fast responses",
        },
        understanding: {
          title: "Understanding",
          description: "Human solutions",
        },
        security: {
          title: "Security",
          description: "Total protection",
        },
      },
    },
    footer: {
      contact: "Contact us",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send message",
      rights: "© 2024 IASSIST. All rights reserved.",
      privacy: "Privacy",
      terms: "Terms and Conditions",
    },
  },
}

export default function IAssistLanding() {
  const [isDark, setIsDark] = useState(true)
  const [language, setLanguage] = useState<"es" | "en">("es")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")

  const t = translations[language]

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDark])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es")
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-[#181818] text-white" : "bg-white text-gray-900"}`}
    >
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
          isDark ? "bg-[#181818]/80 border-white/10" : "bg-white/80 border-gray-200"
        }`}
      >
        <div className="container mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image src="/logo.png" alt="IASSIST Logo" width={100} height={40}/>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="#home"
              className={`transition-colors ${
                isDark ? "text-[#CCCCCC] hover:text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {t.nav.home}
            </Link>
            <Link
              href="#somos"
              className={`transition-colors ${
                isDark ? "text-[#CCCCCC] hover:text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {t.nav.about}
            </Link>
            <Link
              href="#contacto"
              className={`transition-colors ${
                isDark ? "text-[#CCCCCC] hover:text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {language === "es" ? "Contacto" : "Contact"}
            </Link>
            <Link
              href="#login"
              className={`opacity-60 hover:opacity-80 transition-opacity ${
                isDark ? "text-[#949494]" : "text-gray-500"
              }`}
            >
              {t.nav.login}
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className={`p-2 transition-colors ${
                isDark ? "hover:bg-white/10 text-[#CCCCCC]" : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              <Globe className="h-4 w-4 mr-1" />
              {language.toUpperCase()}
            </Button>

            {/* Theme Switcher */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className={`p-2 transition-colors ${
                isDark ? "hover:bg-white/10 text-[#CCCCCC]" : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-image.jpg"
            alt="Persona usando tecnología"
            fill
            className="object-cover"
            priority
          />
          <div
            className={`absolute inset-0 transition-colors duration-300 ${
              isDark
                ? "bg-gradient-to-b from-[#181818]/60 via-[#181818]/40 to-[#181818]/80"
                : "bg-gradient-to-b from-white/60 via-white/40 to-white/80"
            }`}
          />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1
            className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight transition-colors duration-300 ${
              isDark ? "text-[#CCCCCC]" : "text-gray-900"
            }`}
          >
            {t.hero.title}
          </h1>
          <p
            className={`text-xl md:text-2xl mb-8 max-w-2xl mx-auto transition-colors duration-300 ${
              isDark ? "text-[#949494]" : "text-gray-600"
            }`}
          >
            {t.hero.subtitle}
          </p>

          <div
            className={`glass-card inline-block p-6 rounded-2xl transition-colors duration-300 ${
              isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"
            }`}
          >
            <Button
              size="lg"
              className={`px-8 py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105 ${
                isDark ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              <Download className="mr-2 h-5 w-5" />
              {t.hero.cta}
            </Button>
            <div
              className={`flex items-center justify-center space-x-4 mt-4 text-sm transition-colors duration-300 ${
                isDark ? "text-[#949494]" : "text-gray-500"
              }`}
            >
              <span>{t.hero.stores}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios Section */}
      <section className={`py-20 transition-colors duration-300 ${isDark ? "bg-[#181818]" : "bg-white"}`}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card
              className={`glass-card backdrop-blur-md transition-colors duration-300 ${
                isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"
              }`}
            >
              <CardContent className="p-8 text-center">
                <Zap className="h-12 w-12 text-[#0067B2] mx-auto mb-4" />
                <h3
                  className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                    isDark ? "text-[#CCCCCC]" : "text-gray-900"
                  }`}
                >
                  {t.benefits.fast.title}
                </h3>
                <p className={`transition-colors duration-300 ${isDark ? "text-[#949494]" : "text-gray-600"}`}>
                  {t.benefits.fast.description}
                </p>
              </CardContent>
            </Card>

            <Card
              className={`glass-card backdrop-blur-md transition-colors duration-300 ${
                isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"
              }`}
            >
              <CardContent className="p-8 text-center">
                <Shield className="h-12 w-12 text-[#0067B2] mx-auto mb-4" />
                <h3
                  className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                    isDark ? "text-[#CCCCCC]" : "text-gray-900"
                  }`}
                >
                  {t.benefits.secure.title}
                </h3>
                <p className={`transition-colors duration-300 ${isDark ? "text-[#949494]" : "text-gray-600"}`}>
                  {t.benefits.secure.description}
                </p>
              </CardContent>
            </Card>

            <Card
              className={`glass-card backdrop-blur-md transition-colors duration-300 ${
                isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"
              }`}
            >
              <CardContent className="p-8 text-center">
                <Smartphone className="h-12 w-12 text-[#0067B2] mx-auto mb-4" />
                <h3
                  className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                    isDark ? "text-[#CCCCCC]" : "text-gray-900"
                  }`}
                >
                  {t.benefits.simple.title}
                </h3>
                <p className={`transition-colors duration-300 ${isDark ? "text-[#949494]" : "text-gray-600"}`}>
                  {t.benefits.simple.description}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Proceso Section */}
      <section className={`py-20 transition-colors duration-300 ${isDark ? "bg-[#000000]" : "bg-white"}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2
              className={`text-3xl md:text-4xl font-bold text-center mb-16 transition-colors duration-300 ${
                isDark ? "text-[#CCCCCC]" : "text-gray-900"
              }`}
            >
              {t.process.title}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div
                className={`glass-card backdrop-blur-md p-6 rounded-xl text-center transition-colors duration-300 ${
                  isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"
                }`}
              >
                <div className="w-12 h-12 bg-[#0067B2]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#0067B2] font-bold">1</span>
                </div>
                <h3
                  className={`font-bold mb-2 transition-colors duration-300 ${
                    isDark ? "text-[#CCCCCC]" : "text-gray-900"
                  }`}
                >
                  {t.process.steps.register.title}
                </h3>
                <p className={`text-sm transition-colors duration-300 ${isDark ? "text-[#949494]" : "text-gray-600"}`}>
                  {t.process.steps.register.description}
                </p>
              </div>

              <div
                className={`glass-card backdrop-blur-md p-6 rounded-xl text-center transition-colors duration-300 ${
                  isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"
                }`}
              >
                <div className="w-12 h-12 bg-[#0067B2]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#0067B2] font-bold">2</span>
                </div>
                <h3
                  className={`font-bold mb-2 transition-colors duration-300 ${
                    isDark ? "text-[#CCCCCC]" : "text-gray-900"
                  }`}
                >
                  {t.process.steps.validate.title}
                </h3>
                <p className={`text-sm transition-colors duration-300 ${isDark ? "text-[#949494]" : "text-gray-600"}`}>
                  {t.process.steps.validate.description}
                </p>
              </div>

              <div
                className={`glass-card backdrop-blur-md p-6 rounded-xl text-center transition-colors duration-300 ${
                  isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"
                }`}
              >
                <div className="w-12 h-12 bg-[#0067B2]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#0067B2] font-bold">3</span>
                </div>
                <h3
                  className={`font-bold mb-2 transition-colors duration-300 ${
                    isDark ? "text-[#CCCCCC]" : "text-gray-900"
                  }`}
                >
                  {t.process.steps.coverage.title}
                </h3>
                <p className={`text-sm transition-colors duration-300 ${isDark ? "text-[#949494]" : "text-gray-600"}`}>
                  {t.process.steps.coverage.description}
                </p>
              </div>

              <div
                className={`glass-card backdrop-blur-md p-6 rounded-xl text-center transition-colors duration-300 ${
                  isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"
                }`}
              >
                <div className="w-12 h-12 bg-[#0067B2]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#0067B2] font-bold">4</span>
                </div>
                <h3
                  className={`font-bold mb-2 transition-colors duration-300 ${
                    isDark ? "text-[#CCCCCC]" : "text-gray-900"
                  }`}
                >
                  {t.process.steps.refund.title}
                </h3>
                <p className={`text-sm transition-colors duration-300 ${isDark ? "text-[#949494]" : "text-gray-600"}`}>
                  {t.process.steps.refund.description}
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button
                size="lg"
                className={`px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                  isDark ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                <Download className="mr-2 h-5 w-5" />
                {t.process.cta}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Protección Section */}
      <section className={`py-20 transition-colors duration-300 ${isDark ? "bg-[#000000]" : "bg-[#f6f6f6]"}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="relative h-80 rounded-2xl overflow-hidden">
                  <Image src="/friends-street.jpg" alt="Amigas usando tecnología" fill className="object-cover" />
                </div>
                <div className="relative h-80 rounded-2xl overflow-hidden">
                  <Image
                    src="/woman-headphones.jpg"
                    alt="Interfaz de validación digital"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <h2
                  className={`text-3xl md:text-4xl font-bold transition-colors duration-300 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {t.protection.title}
                </h2>
                <p className={`text-lg transition-colors duration-300 ${isDark ? "text-[#949494]" : "text-gray-600"}`}>
                  {t.protection.description}
                </p>
                <Button
                  variant="outline"
                  className={`glass-card backdrop-blur-md transition-colors duration-300 ${
                    isDark
                      ? "border-white/20 text-[#CCCCCC] hover:bg-white/10"
                      : "border-black/20 text-gray-700 hover:bg-black/10"
                  }`}
                >
                  {t.protection.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Confianza Section */}
      <section className={`py-20 transition-colors duration-300 ${isDark ? "bg-[#181818]" : "bg-white"}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2
              className={`text-3xl md:text-4xl font-bold text-center mb-16 transition-colors duration-300 ${
                isDark ? "text-[#CCCCCC]" : "text-gray-900"
              }`}
            >
              {t.trust.title}
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card
                className={`glass-card backdrop-blur-md transition-colors duration-300 ${
                  isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"
                }`}
              >
                <CardContent className="p-8 text-center">
                  <LinkIcon className="h-12 w-12 text-[#0067B2] mx-auto mb-4" />
                  <h3
                    className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {t.trust.blockchain.title}
                  </h3>
                  <p className={`transition-colors duration-300 ${isDark ? "text-[#949494]" : "text-gray-600"}`}>
                    {t.trust.blockchain.description}
                  </p>
                </CardContent>
              </Card>

              <Card
                className={`glass-card backdrop-blur-md transition-colors duration-300 ${
                  isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"
                }`}
              >
                <CardContent className="p-8 text-center">
                  <Brain className="h-12 w-12 text-[#0067B2] mx-auto mb-4" />
                  <h3
                    className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {t.trust.ai.title}
                  </h3>
                  <p className={`transition-colors duration-300 ${isDark ? "text-[#949494]" : "text-gray-600"}`}>
                    {t.trust.ai.description}
                  </p>
                </CardContent>
              </Card>

              <Card
                className={`glass-card backdrop-blur-md transition-colors duration-300 ${
                  isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"
                }`}
              >
                <CardContent className="p-8 text-center">
                  <Users className="h-12 w-12 text-[#0067B2] mx-auto mb-4" />
                  <h3
                    className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {t.trust.users.title}
                  </h3>
                  <p className={`transition-colors duration-300 ${isDark ? "text-[#949494]" : "text-gray-600"}`}>
                    {t.trust.users.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Doble Llamado Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/group-phones.jpg"
            alt="Personas disfrutando sin preocupaciones"
            fill
            className="object-cover"
          />
          <div
            className={`absolute inset-0 transition-colors duration-300 ${
              isDark
                ? "bg-gradient-to-r from-[#181818]/80 to-[#000000]/60"
                : "bg-gradient-to-r from-white/80 to-gray-100/60"
            }`}
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h2
            className={`text-3xl md:text-5xl font-bold mb-8 transition-colors duration-300 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {t.cta.title}
          </h2>
          <Button
            size="lg"
            className={`glass-card backdrop-blur-md px-8 py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105 ${
              isDark
                ? "bg-[#0067B2]/20 hover:bg-[#0067B2]/30 border border-[#0067B2]/50 text-white"
                : "bg-[#0067B2]/20 hover:bg-[#0067B2]/30 border border-[#0067B2]/50 text-gray-900"
            }`}
          >
            <Download className="mr-2 h-5 w-5" />
            {t.cta.button}
          </Button>
        </div>
      </section>

      {/* Somos Section */}
      <section
        id="somos"
        className={`py-20 relative transition-colors duration-300 ${isDark ? "bg-[#000000]" : "bg-[#f6f6f6]"}`}
      >
        <div className="absolute inset-0 bg-gradient-radial from-[#0067B2]/5 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-8 transition-colors duration-300 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {t.about.title}
            </h2>
            <p
              className={`text-lg mb-12 leading-relaxed transition-colors duration-300 ${
                isDark ? "text-[#949494]" : "text-gray-600"
              }`}
            >
              {t.about.description}
            </p>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    isDark ? "bg-white/10" : "bg-black/10"
                  }`}
                >
                  <Zap className="h-8 w-8 text-[#0067B2]" />
                </div>
                <h3
                  className={`font-semibold mb-2 transition-colors duration-300 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {t.about.values.innovation.title}
                </h3>
                <p className={`text-sm transition-colors duration-300 ${isDark ? "text-[#949494]" : "text-gray-600"}`}>
                  {t.about.values.innovation.description}
                </p>
              </div>

              <div className="text-center">
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    isDark ? "bg-white/10" : "bg-black/10"
                  }`}
                >
                  <Clock className="h-8 w-8 text-[#0067B2]" />
                </div>
                <h3
                  className={`font-semibold mb-2 transition-colors duration-300 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {t.about.values.agility.title}
                </h3>
                <p className={`text-sm transition-colors duration-300 ${isDark ? "text-[#949494]" : "text-gray-600"}`}>
                  {t.about.values.agility.description}
                </p>
              </div>

              <div className="text-center">
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    isDark ? "bg-white/10" : "bg-black/10"
                  }`}
                >
                  <Users className="h-8 w-8 text-[#0067B2]" />
                </div>
                <h3
                  className={`font-semibold mb-2 transition-colors duration-300 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {t.about.values.understanding.title}
                </h3>
                <p className={`text-sm transition-colors duration-300 ${isDark ? "text-[#949494]" : "text-gray-600"}`}>
                  {t.about.values.understanding.description}
                </p>
              </div>

              <div className="text-center">
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    isDark ? "bg-white/10" : "bg-black/10"
                  }`}
                >
                  <Shield className="h-8 w-8 text-[#0067B2]" />
                </div>
                <h3
                  className={`font-semibold mb-2 transition-colors duration-300 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {t.about.values.security.title}
                </h3>
                <p className={`text-sm transition-colors duration-300 ${isDark ? "text-[#949494]" : "text-gray-600"}`}>
                  {t.about.values.security.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto Section */}
      <section id="contacto" className={`py-20 transition-colors duration-300 ${isDark ? "bg-[#181818]" : "bg-white"}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2
              className={`text-3xl md:text-4xl font-bold text-center mb-16 transition-colors duration-300 ${
                isDark ? "text-[#CCCCCC]" : "text-gray-900"
              }`}
            >
              {t.footer.contact}
            </h2>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3
                    className={`text-xl font-semibold transition-colors duration-300 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Hablemos
                  </h3>
                  <p className={`transition-colors duration-300 ${isDark ? "text-[#949494]" : "text-gray-600"}`}>
                    {language === "es"
                      ? "¿Tenés alguna pregunta o querés saber más sobre cómo protegemos tu tecnología? Estamos aquí para ayudarte."
                      : "Do you have any questions or want to know more about how we protect your technology? We're here to help you."}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#0067B2]/20 rounded-full flex items-center justify-center">
                      <span className="text-[#0067B2] text-sm">📧</span>
                    </div>
                    <span className={`transition-colors duration-300 ${isDark ? "text-[#CCCCCC]" : "text-gray-700"}`}>
                      contacto@iassist.com
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#0067B2]/20 rounded-full flex items-center justify-center">
                      <span className="text-[#0067B2] text-sm">📱</span>
                    </div>
                    <span className={`transition-colors duration-300 ${isDark ? "text-[#CCCCCC]" : "text-gray-700"}`}>
                      +54 11 1234-5678
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#0067B2]/20 rounded-full flex items-center justify-center">
                      <span className="text-[#0067B2] text-sm">📍</span>
                    </div>
                    <span className={`transition-colors duration-300 ${isDark ? "text-[#CCCCCC]" : "text-gray-700"}`}>
                      Buenos Aires, Argentina
                    </span>
                  </div>
                </div>

                <div className="flex space-x-6 pt-4">
                  <Facebook
                    className={`h-6 w-6 cursor-pointer transition-colors ${
                      isDark ? "text-[#949494] hover:text-white" : "text-gray-500 hover:text-gray-900"
                    }`}
                  />
                  <Twitter
                    className={`h-6 w-6 cursor-pointer transition-colors ${
                      isDark ? "text-[#949494] hover:text-white" : "text-gray-500 hover:text-gray-900"
                    }`}
                  />
                  <Instagram
                    className={`h-6 w-6 cursor-pointer transition-colors ${
                      isDark ? "text-[#949494] hover:text-white" : "text-gray-500 hover:text-gray-900"
                    }`}
                  />
                  <Linkedin
                    className={`h-6 w-6 cursor-pointer transition-colors ${
                      isDark ? "text-[#949494] hover:text-white" : "text-gray-500 hover:text-gray-900"
                    }`}
                  />
                </div>
              </div>

              <div
                className={`glass-card backdrop-blur-md p-8 rounded-2xl transition-colors duration-300 ${
                  isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"
                }`}
              >
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      placeholder={t.footer.name}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`border transition-colors duration-300 ${
                        isDark
                          ? "bg-white/10 border-white/20 text-white placeholder:text-[#949494]"
                          : "bg-black/10 border-black/20 text-gray-900 placeholder:text-gray-500"
                      }`}
                    />
                    <Input
                      type="email"
                      placeholder={t.footer.email}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`border transition-colors duration-300 ${
                        isDark
                          ? "bg-white/10 border-white/20 text-white placeholder:text-[#949494]"
                          : "bg-black/10 border-black/20 text-gray-900 placeholder:text-gray-500"
                      }`}
                    />
                  </div>

                  <Input
                    placeholder={language === "es" ? "Asunto" : "Subject"}
                    className={`border transition-colors duration-300 ${
                      isDark
                        ? "bg-white/10 border-white/20 text-white placeholder:text-[#949494]"
                        : "bg-black/10 border-black/20 text-gray-900 placeholder:text-gray-500"
                    }`}
                  />

                  <Textarea
                    placeholder={t.footer.message}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`border min-h-[120px] transition-colors duration-300 ${
                      isDark
                        ? "bg-white/10 border-white/20 text-white placeholder:text-[#949494]"
                        : "bg-black/10 border-black/20 text-gray-900 placeholder:text-gray-500"
                    }`}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    className={`w-full transition-all duration-300 hover:scale-105 ${
                      isDark ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"
                    }`}
                  >
                    {t.footer.send}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-12 border-t transition-colors duration-300 ${
          isDark ? "bg-[#000000] border-white/10" : "bg-gray-900 border-gray-200"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="flex items-center space-x-4">
              <Image src="/logo.png" alt="IASSIST Logo" width={100} height={32} className="brightness-0 invert" />
            </div>

            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="flex space-x-6 text-sm">
                <Link href="/privacidad" className="text-gray-400 hover:text-white transition-colors">
                  {t.footer.privacy}
                </Link>
                <Link href="/terminos" className="text-gray-400 hover:text-white transition-colors">
                  {t.footer.terms}
                </Link>
              </div>

              <p className="text-sm text-gray-400">{t.footer.rights}</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Chat Bot */}
      <ChatBot isDark={isDark} />
    </div>
  )
}
