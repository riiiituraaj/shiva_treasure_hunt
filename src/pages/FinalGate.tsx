import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const FinalGate = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/");
      return;
    }
    try {
      const parsed = JSON.parse(storedUser);
      if (!parsed || parsed.username === "admin") {
        navigate("/");
        return;
      }
      setUserId(parsed.id);
    } catch {
      navigate("/");
    }
  }, [navigate]);

  const handleProceed = () => {
    if (userId) {
      localStorage.setItem(`final_gate_seen_${userId}`, "true");
    }
    navigate("/hunt");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        <div className="bg-card border-4 border-primary p-8 rounded-lg shadow-2xl text-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="font-typewriter text-3xl md:text-4xl text-foreground mb-4"
          >
            Congrats, Hunter!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-typewriter text-lg md:text-xl text-muted-foreground mb-8"
          >
            You have reached the final riddle. Take a breath — the last key awaits.
          </motion.p>
          <Button
            onClick={handleProceed}
            className="font-typewriter text-lg bg-primary hover:bg-secondary text-primary-foreground border-2 border-secondary shadow-lg transition-all hover:shadow-xl"
          >
            Proceed to Final Riddle
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default FinalGate;


