import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, X, Send, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatBubble } from "./ChatBubble";
import { QuickReplyButton } from "./QuickReplyButton";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  actionButton?: {
    text: string;
    url: string;
  };
  actionButtons?: Array<{
    text: string;
    url: string;
  }>;
}

const STORAGE_KEY = "closwork-chat-history";
const TALLY_FORM_URL = "https://tally.so/r/yPPBqB";

// Función para detectar el idioma del texto
const detectLanguage = (text: string): 'es' | 'en' => {
  const lower = text.toLowerCase();
  // Palabras comunes en inglés
  const englishWords = ['hello', 'hi', 'hey', 'company', 'business', 'closer', 'sales', 'information', 'more', 'good morning', 'good afternoon', 'good evening', 'good night', 'bye', 'goodbye'];
  // Palabras comunes en español
  const spanishWords = ['hola', 'empresa', 'closer', 'cerrador', 'vendedor', 'información', 'más', 'buenos días', 'buenas tardes', 'buenas noches', 'adiós'];
  
  const englishCount = englishWords.filter(word => lower.includes(word)).length;
  const spanishCount = spanishWords.filter(word => lower.includes(word)).length;
  
  // Si hay más palabras en inglés, asumimos inglés
  if (englishCount > spanishCount) return 'en';
  // Por defecto español
  return 'es';
};

const initialGreeting: Message = {
  id: "greeting",
  text: "¡Hola! 👋 Soy tu asistente personal de Closwork. Estoy aquí para ayudarte a encontrar las mejores soluciones para tu negocio. ¿Cómo puedo asistirte hoy?",
  isBot: true,
  timestamp: new Date(),
};

const menuOptions = [
  "Soy Empresa",
  "Soy Closer",
  "Más información",
];

const menuOptionsEn = [
  "I'm a Company",
  "I'm a Closer",
  "More Information",
];

type ChatBridgeEvent = CustomEvent<{ text: string }>;

export const ChatWindow = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialGreeting]);
  const [inputValue, setInputValue] = useState("");
  const [showMenu, setShowMenu] = useState(true);
  const [language, setLanguage] = useState<'es' | 'en'>('es'); // Idioma actual del chat
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Cargar historial
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Validamos que sea un array válido antes de setear
        if (Array.isArray(parsed) && parsed.length > 0) {
          const loadedMessages = parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) }));
          setMessages(loadedMessages);
          // Si solo hay el saludo inicial, mostrar el menú
          const hasGreeting = loadedMessages.some((m: Message) => m.id === "greeting");
          if (hasGreeting && loadedMessages.length === 1) {
            setShowMenu(true);
          } else {
            setShowMenu(false);
          }
        }
      } catch (e) {
        console.error("Error parsing chat history", e);
      }
    } else {
      // Si no hay historial, el saludo inicial ya está en el estado inicial
      setShowMenu(true);
    }
  }, []);

  // Guardar historial
  useEffect(() => {
    if (messages.length > 0) { // Cambié > 1 a > 0 para que guarde desde el inicio
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  // Hacer scroll al final cuando se abre el chat
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 300);
    }
  }, [isOpen]);

  useEffect(() => {
    // Mostrar automáticamente la última respuesta del bot
    // Hacer scroll suave hacia el final cuando hay nuevos mensajes
    if (messagesEndRef.current && messages.length > 0) {
      // Verificar si el último mensaje es del bot
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.isBot) {
        // Delay para que el mensaje se renderice primero
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
        }, 300);
      } else {
        // Si es del usuario, también hacer scroll para ver su mensaje
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
        }, 100);
      }
    }
  }, [messages]);

  const handleSendMessage = useCallback((text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => {
      const newMessages = [...prev, userMessage];
      
      setTimeout(() => {
        const botResponse = getBotResponse(text.trim());
        setMessages((current) => {
          const updated = [...current, botResponse];
          
          // Mostrar menú después de "Más información" o respuestas de cortesía que piden el menú
          if (botResponse.text.includes("Closwork es una plataforma innovadora") || 
              botResponse.text.includes("Closwork is an innovative platform") ||
              botResponse.text.includes("Este es tu menú de opciones") ||
              botResponse.text.includes("Here are your menu options") ||
              botResponse.text.includes("Soy tu asistente de Closwork") || 
              botResponse.text.includes("I'm your Closwork assistant") ||
              botResponse.text.includes("Estoy aquí para ayudarte con todo lo relacionado con Closwork") ||
              botResponse.text.includes("I'm here to help you with everything related to Closwork")) {
            setShowMenu(true);
          } else {
            setShowMenu(false);
          }
          
          return updated;
        });
      }, 800);
      
      return newMessages;
    });
    
    setInputValue("");
  }, []);

  // --- CORRECCIÓN ERROR DE TYPESCRIPT AQUÍ ---
  useEffect(() => {
    const handleBridge = (event: Event) => {
      const customEvent = event as ChatBridgeEvent;
      const text = customEvent.detail?.text;
      if (!text) return;
      setIsOpen(true);
      handleSendMessage(text);
    };

    // Agregamos 'as EventListener' para calmar a TypeScript
    window.addEventListener("chat:send", handleBridge as EventListener);
    return () => {
      window.removeEventListener("chat:send", handleBridge as EventListener);
    };
  }, [handleSendMessage]);

  const getBotResponse = (userText: string): Message => {
    const lower = userText.toLowerCase().trim();
    
    // Detectar idioma del mensaje del usuario
    const detectedLang = detectLanguage(userText);
    setLanguage(detectedLang);
    const isEnglish = detectedLang === 'en';
    
    // Respuestas de cortesía (inglés y español)
    if (lower === "hola" || lower === "hola!" || lower === "hi" || lower === "hey" || lower === "hello") {
      return {
        id: (Date.now() + 1).toString(),
        text: isEnglish 
          ? "Hello! How can I help you? I'm your Closwork assistant. Here are your menu options:"
          : "Hola, ¿qué tal? Soy tu asistente de Closwork. Este es tu menú de opciones:",
        isBot: true,
        timestamp: new Date(),
      };
    }

    if (lower.includes("adiós") || lower.includes("adios") || lower.includes("chao") || lower.includes("hasta luego") || lower === "bye" || lower === "goodbye" || lower === "see you") {
      return {
        id: (Date.now() + 1).toString(),
        text: isEnglish
          ? "It was a pleasure helping you, see you soon 😊"
          : "Fue un gusto ayudarte, nos vemos pronto 😊",
        isBot: true,
        timestamp: new Date(),
      };
    }

    if (lower.includes("buenos días") || lower.includes("buenos dias") || lower.includes("buen día") || lower.includes("buen dia") || lower.includes("good morning")) {
      return {
        id: (Date.now() + 1).toString(),
        text: isEnglish
          ? "Good morning! I'm your Closwork assistant. Here are your menu options:"
          : "Buenos días, soy tu asistente de Closwork. Este es tu menú de opciones:",
        isBot: true,
        timestamp: new Date(),
      };
    }

    if (lower.includes("buenas tardes") || lower.includes("good afternoon")) {
      return {
        id: (Date.now() + 1).toString(),
        text: isEnglish
          ? "Good afternoon! I'm your Closwork assistant. Here are your menu options:"
          : "Buenas tardes, soy tu asistente de Closwork. Este es tu menú de opciones:",
        isBot: true,
        timestamp: new Date(),
      };
    }

    if (lower.includes("buenas noches") || lower.includes("buena noche") || lower.includes("good night") || lower.includes("good evening")) {
      return {
        id: (Date.now() + 1).toString(),
        text: isEnglish
          ? "Good evening! I'm your Closwork assistant. Here are your menu options:"
          : "Buenas noches, soy tu asistente de Closwork. Este es tu menú de opciones:",
        isBot: true,
        timestamp: new Date(),
      };
    }

    // Opciones del menú - Empresa (inglés y español)
    if (lower.includes("empresa") || 
        lower.includes("company") || 
        lower.includes("business") || 
        lower === "soy empresa" || 
        lower === "i'm a company" ||
        lower === "i am a company" ||
        lower === "soy una empresa" ||
        lower === "1") {
      const isEnglishCompany = lower.includes("company") || lower.includes("business") || lower === "i'm a company" || lower === "i am a company";
      setLanguage(isEnglishCompany ? 'en' : 'es');
      return {
        id: (Date.now() + 1).toString(),
        text: isEnglishCompany
          ? "Perfect! I have the best sales closers ready. To connect you with them, I need some information.\n\nFill out this form and let's see the profiles that best fit your needs."
          : "¡Perfecto! Tengo a los mejores cerradores de ventas listos. Para conectarte con ellos necesito unos datos.\n\nLlena este formulario y veamos los perfiles que mejor se adecúen a tus necesidades.",
        isBot: true,
        timestamp: new Date(),
        actionButtons: [
          {
            text: isEnglishCompany ? "Fill out form" : "Llenar formulario",
            url: TALLY_FORM_URL,
          },
          {
            text: isEnglishCompany ? "Request info" : "Solicitar información",
            url: "/solicitud",
          },
        ],
      };
    }

    // Opciones del menú - Closer (inglés y español con variaciones)
    if (lower.includes("closer") || 
        lower.includes("cerrador") || 
        lower.includes("vendedor") || 
        lower.includes("cerrador de ventas") ||
        lower.includes("sales closer") ||
        lower.includes("closer de ventas") ||
        lower === "soy closer" || 
        lower === "soy cerrador" ||
        lower === "soy vendedor" ||
        lower === "soy cerrador de ventas" ||
        lower === "i'm a closer" ||
        lower === "i am a closer" ||
        lower === "i'm a sales closer" ||
        lower === "i am a sales closer" ||
        lower === "2") {
      const isEnglishCloser = lower.includes("sales closer") || lower === "i'm a closer" || lower === "i am a closer" || lower === "i'm a sales closer" || lower === "i am a sales closer";
      setLanguage(isEnglishCloser ? 'en' : 'es');
      return {
        id: (Date.now() + 1).toString(),
        text: isEnglishCloser
          ? "Excellent! As a Closer, you have access to incredible opportunities. To get started, please register in our platform."
          : "¡Excelente! Como Closer, tienes acceso a oportunidades increíbles. Para comenzar, por favor regístrate en nuestra plataforma.",
        isBot: true,
        timestamp: new Date(),
        actionButton: {
          text: isEnglishCloser ? "Apply now" : "Aplicar ahora",
          url: "/closer-tyc",
        },
      };
    }

    if (lower.includes("más información") || 
        lower.includes("mas informacion") || 
        lower.includes("información") || 
        lower.includes("informacion") || 
        lower.includes("more information") ||
        lower.includes("info") ||
        lower === "más" || 
        lower === "mas" || 
        lower === "more" ||
        lower === "3") {
      const isEnglishInfo = lower.includes("more information") || lower.includes("info") || lower === "more";
      setLanguage(isEnglishInfo ? 'en' : 'es');
      return {
        id: (Date.now() + 1).toString(),
        text: isEnglishInfo
          ? "Closwork is an innovative platform designed to revolutionize B2B sales, offering advanced tools and personalized solutions."
          : "Closwork es una plataforma innovadora diseñada para revolucionar las ventas B2B, ofreciendo herramientas avanzadas y soluciones personalizadas.",
        isBot: true,
        timestamp: new Date(),
      };
    }

    // Respuestas existentes (mantener compatibilidad)
    if (lower.includes("closwork") || lower.includes("acerca") || lower.includes("about")) {
      const isEnglishAbout = lower.includes("about");
      setLanguage(isEnglishAbout ? 'en' : 'es');
      return {
        id: (Date.now() + 1).toString(),
        text: isEnglishAbout
          ? "Closwork is an innovative platform designed to revolutionize B2B sales, offering advanced tools and personalized solutions."
          : "Closwork es una plataforma innovadora diseñada para revolucionar las ventas B2B, ofreciendo herramientas avanzadas y soluciones personalizadas.",
        isBot: true,
        timestamp: new Date(),
      };
    }

    // Default response - usar el idioma detectado o el actual
    const currentLang = detectedLang || language;
    const isEnglishDefault = currentLang === 'en';
    return {
      id: (Date.now() + 1).toString(),
      text: isEnglishDefault
        ? "I'm here to help you with everything related to Closwork. Here are our menu options:"
        : "Estoy aquí para ayudarte con todo lo relacionado con Closwork. Este es nuestro menú de opciones:",
      isBot: true,
      timestamp: new Date(),
    };
  };

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "fixed bottom-6 right-4 sm:bottom-8 sm:right-6 h-14 w-14 sm:h-16 sm:w-16 rounded-full shadow-float hover:shadow-glow",
            "bg-primary hover:bg-primary-glow transition-all duration-300 z-50",
            "animate-bounce-in"
          )}
        >
          <MessageCircle size={24} />
        </Button>
      )}

      {isOpen && (
        <div 
          className="fixed bottom-6 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[380px] max-w-[380px] h-[550px] sm:h-[650px] max-h-[calc(100vh-8rem)] bg-card rounded-2xl shadow-float overflow-hidden z-40 animate-slide-up flex flex-col"
          style={{ 
            border: '3px solid hsl(210, 100%, 21%)',
            boxShadow: '0 10px 40px -10px hsl(210, 100%, 21%, 0.3), 0 0 0 1px hsl(210, 100%, 21%, 0.1)'
          }}
        >
          <div className="bg-gradient-hero p-3 sm:p-4 text-primary-foreground relative">
            <h3 className="text-xs sm:text-sm font-semibold pr-12">{language === 'en' ? "Your personal Closwork assistant" : "Tu asistente personal de Closwork"}</h3>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-9 w-9 sm:h-10 sm:w-10 text-primary-foreground hover:bg-white/30 bg-white/20 rounded-full border-2 border-white/50"
              aria-label="Cerrar chat"
            >
              <X size={22} className="sm:w-6 sm:h-6" strokeWidth={2.5} />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((msg, idx) => (
              <div key={msg.id}>
                <ChatBubble
                  message={msg.text}
                  isBot={msg.isBot}
                  timestamp={msg.timestamp}
                  delay={idx * 100}
                />
                {msg.actionButton && (
                  // --- CORRECCIÓN CSS: AGREGADO 'flex' ---
                  <div className="mt-3 flex flex-col items-center gap-2">
                    <Button
                      onClick={() => {
                          if(msg.actionButton?.url.startsWith("http")) {
                              window.open(msg.actionButton.url, "_blank");
                          } else {
                              navigate(msg.actionButton!.url);
                          }
                      }}
                      className="rounded-full bg-primary hover:bg-primary-glow flex items-center gap-2"
                    >
                      {msg.actionButton.text}
                      <ExternalLink size={16} />
                    </Button>
                    
                    {/* Solo mostramos el texto secundario si es el mensaje de Empresa */}
                    {msg.actionButton.url.includes("tally") && (
                        <button
                        onClick={() => navigate("/empresas")}
                        className="text-xs text-muted-foreground hover:text-primary transition-colors underline mt-1"
                        >
                        {language === 'en' ? "Learn more about companies" : "Más info para empresas"}
                        </button>
                    )}
                  </div>
                )}
                {msg.actionButtons && msg.actionButtons.length > 0 && (
                  <div className="mt-3 flex flex-col items-center gap-2">
                    {msg.actionButtons.map((btn, idx) => (
                      <Button
                        key={idx}
                        onClick={() => {
                          if (btn.url.startsWith("http")) {
                            window.open(btn.url, "_blank");
                          } else {
                            navigate(btn.url);
                          }
                        }}
                        className={`rounded-full flex items-center gap-2 w-full sm:w-auto ${
                          idx === 0 
                            ? "bg-primary hover:bg-primary-glow text-white" 
                            : idx === 1
                            ? "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                            : "bg-outline hover:bg-outline/80 text-foreground border"
                        }`}
                      >
                        {btn.text}
                        {btn.url.startsWith("http") && <ExternalLink size={16} />}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mostrar menú después del saludo inicial o cuando showMenu es true */}
            {(messages.length === 1 && messages[0].id === "greeting") || showMenu ? (
              <div className="space-y-3 mt-6">
                <p className="text-sm text-muted-foreground text-center mb-4">
                  {language === 'en' ? "Select an option:" : "Selecciona una opción:"}
                </p>
                <div className="flex flex-col gap-3 items-center">
                  {(language === 'en' ? menuOptionsEn : menuOptions).map((option, idx) => (
                    <QuickReplyButton
                      key={option}
                      text={option}
                      onClick={() => {
                        setShowMenu(false);
                        handleSendMessage(option);
                      }}
                      delay={(idx + 1) * 150}
                    />
                  ))}
                </div>
              </div>
            ) : null}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 sm:p-4 border-t border-border bg-muted/30">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
                placeholder={language === 'en' ? "Type your message..." : "Escribe tu mensaje..."}
                className="flex-1 rounded-full bg-background text-sm sm:text-base"
              />
              <Button
                onClick={() => handleSendMessage(inputValue)}
                size="icon"
                className="rounded-full bg-primary hover:bg-primary-glow h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0"
              >
                <Send size={16} className="sm:w-[18px] sm:h-[18px]" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};