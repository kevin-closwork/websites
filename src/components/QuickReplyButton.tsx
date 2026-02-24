import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuickReplyButtonProps {
  text: string;
  onClick: () => void;
  delay?: number;
}

export const QuickReplyButton = ({ text, onClick, delay = 0 }: QuickReplyButtonProps) => {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className={cn(
        "animate-bounce-in border-primary/30 hover:bg-primary hover:text-primary-foreground",
        "hover:border-primary transition-all duration-300 hover:shadow-glow rounded-full"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {text}
    </Button>
  );
};
