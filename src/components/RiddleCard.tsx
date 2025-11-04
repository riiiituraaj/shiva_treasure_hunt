import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface RiddleCardProps {
  riddle: string;
  riddleNumber: number;
  totalRiddles: number;
  onCorrectAnswer: () => void;
  correctAnswer: string;
}

const RiddleCard = ({ riddle, riddleNumber, totalRiddles, onCorrectAnswer, correctAnswer }: RiddleCardProps) => {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [isFlipping, setIsFlipping] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (answer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()) {
      // Play click sound
      const audio = new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHW7A7+OZSA0PVKzn7K1aGAg+ltzy0H8pBS2Dyff=");
      audio.play().catch(() => {}); // Ignore if autoplay is blocked
      
      setIsFlipping(true);
      setError("");
      
      setTimeout(() => {
        onCorrectAnswer();
        setAnswer("");
        setIsFlipping(false);
      }, 800);
    } else {
      setError("Wrong key, rookie.");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <motion.div
      key={riddleNumber}
      initial={{ rotateY: 90, opacity: 0 }}
      animate={{ rotateY: isFlipping ? 90 : 0, opacity: isFlipping ? 0 : 1 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-card border-4 border-secondary p-8 md:p-12 rounded-sm shadow-2xl relative">
        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary"></div>

        <div className="text-center mb-6">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-typewriter text-2xl md:text-3xl text-foreground mb-2"
          >
            CLUE #{riddleNumber} of {totalRiddles}
          </motion.h2>
          <div className="w-24 h-1 bg-secondary mx-auto"></div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-typewriter text-lg md:text-xl text-foreground text-center mb-8 leading-relaxed min-h-[60px]"
        >
          "{riddle}"
        </motion.p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter the passkey..."
              className="font-typewriter text-center text-lg border-2 border-secondary bg-input focus:border-primary transition-colors"
              autoFocus
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-typewriter text-destructive text-center text-sm"
            >
              {error}
            </motion.p>
          )}

          <Button
            type="submit"
            className="w-full font-typewriter text-lg bg-primary hover:bg-secondary text-primary-foreground border-2 border-secondary shadow-lg transition-all hover:shadow-xl"
          >
            SUBMIT PASSKEY
          </Button>
        </form>
      </div>
    </motion.div>
  );
};

export default RiddleCard;
