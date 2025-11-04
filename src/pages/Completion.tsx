import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Trophy, Home } from "lucide-react";

const Completion = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("current_user");
    if (!user || user === "admin") {
      navigate("/");
      return;
    }
    setUsername(user);
  }, [navigate]);

  const handleBackToHome = () => {
    localStorage.removeItem("current_user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="w-full max-w-3xl"
      >
        <div className="bg-card border-8 border-primary p-8 md:p-12 rounded-sm shadow-2xl relative">
          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-8 border-l-8 border-secondary"></div>
          <div className="absolute top-0 right-0 w-16 h-16 border-t-8 border-r-8 border-secondary"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-8 border-l-8 border-secondary"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-8 border-r-8 border-secondary"></div>

          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.1, 1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
              className="inline-block mb-6"
            >
              <Trophy className="w-24 h-24 md:w-32 md:h-32 text-primary mx-auto" />
            </motion.div>

            <h1 className="font-typewriter text-4xl md:text-6xl text-foreground mb-4 tracking-wide">
              CONGRATULATIONS
            </h1>
            
            <div className="w-48 h-1 bg-primary mx-auto mb-6"></div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="font-typewriter text-lg md:text-xl text-foreground leading-relaxed mb-8 px-4"
            >
              You've cracked every clue, every corner of the hostel whispered your name.
              <br />
              <br />
              Welcome, Hunter — you've conquered
              <br />
              <span className="text-2xl md:text-3xl text-primary font-bold">
                SHIVA HUNT 2025
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-primary/20 border-2 border-primary p-6 rounded-sm mb-8"
            >
              <p className="font-typewriter text-lg text-foreground">
                🎯 The final destination awaits you at the <span className="font-bold text-primary">MESS</span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <Button
                onClick={handleBackToHome}
                className="font-typewriter text-lg bg-primary hover:bg-secondary text-primary-foreground border-2 border-secondary shadow-lg transition-all hover:shadow-xl"
              >
                <Home className="mr-2 h-5 w-5" />
                BACK TO HOME
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Completion;
