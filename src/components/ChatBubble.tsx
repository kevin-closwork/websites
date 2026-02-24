import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  message: string;
  isBot: boolean;
  timestamp: Date;
  delay?: number;
}

export const ChatBubble = ({ message, isBot, timestamp, delay = 0 }: ChatBubbleProps) => {
  return (
    <div
      className={cn(
        "flex w-full mb-4 animate-slide-up",
        isBot ? "justify-start" : "justify-end"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className={cn(
          "max-w-[80%] px-5 py-3 rounded-2xl shadow-soft transition-all duration-300 hover:shadow-float",
          isBot
            ? "bg-card border border-border rounded-tl-sm"
            : "bg-primary text-primary-foreground rounded-tr-sm"
        )}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
        <span className={cn(
          "text-xs mt-2 block",
          isBot ? "text-muted-foreground" : "text-primary-foreground/70"
        )}>
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};
