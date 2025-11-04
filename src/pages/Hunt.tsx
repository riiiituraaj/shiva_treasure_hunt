import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { users, User } from "@/data/users";
import { riddles, Riddle } from "@/data/riddles";
import { ArrowRight, HelpCircle } from "lucide-react";

const Hunt = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentRiddle, setCurrentRiddle] = useState<Riddle | null>(null);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/");
      return;
    }

    const user: User = JSON.parse(storedUser);

    if (user.username === "admin") {
      navigate("/");
      return;
    }

    setCurrentUser(user);

    if (user.solvedRiddles < user.riddles.length) {
      const riddleId = user.riddles[user.solvedRiddles];
      // Before showing the final riddle, interstitial page
      const gateKey = `final_gate_seen_${user.id}`;
      const gateSeen = localStorage.getItem(gateKey) === "true";
      if (riddleId === 6 && !gateSeen) {
        navigate("/final-gate");
        return;
      }
      const riddle = riddles.find((r) => r.id === riddleId);
      setCurrentRiddle(riddle || null);
    } else {
      navigate("/complete");
    }
  }, [navigate]);

  const handleAnswerSubmit = () => {
    if (!currentUser || !currentRiddle) return;

    if (answer.trim().toLowerCase() === currentRiddle.answer.trim().toLowerCase()) {
      const updatedUser = {
        ...currentUser,
        solvedRiddles: currentUser.solvedRiddles + 1,
        collectedWords: [...currentUser.collectedWords, currentRiddle.answer],
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      const userIndex = users.findIndex((u) => u.id === currentUser.id);
      if (userIndex !== -1) {
        users[userIndex] = updatedUser;
      }

      setCurrentUser(updatedUser);
      setAnswer("");
      setError("");

      if (updatedUser.solvedRiddles < updatedUser.riddles.length) {
        const nextRiddleId = updatedUser.riddles[updatedUser.solvedRiddles];
        // If next is final riddle, show the interstitial first unless already seen
        const gateKey = `final_gate_seen_${updatedUser.id}`;
        const gateSeen = localStorage.getItem(gateKey) === "true";
        if (nextRiddleId === 6 && !gateSeen) {
          navigate("/final-gate");
          return;
        }
        const nextRiddle = riddles.find((r) => r.id === nextRiddleId);
        setCurrentRiddle(nextRiddle || null);
      } else {
        navigate("/complete");
      }
    } else {
      setError("Incorrect answer. Try again, hunter.");
    }
  };

  if (!currentUser || !currentRiddle) {
    return <div>Loading...</div>; // Or a proper loader
  }

  const progress = (currentUser.solvedRiddles / currentUser.riddles.length) * 100;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        <div className="bg-card border-4 border-primary p-8 rounded-lg shadow-2xl">
          <div className="text-center mb-6">
            <h1 className="font-typewriter text-3xl text-foreground mb-2">
              Riddle #{currentUser.solvedRiddles + 1}
            </h1>
            <p className="font-typewriter text-lg text-muted-foreground">
              Welcome, {currentUser.name}
            </p>
          </div>

          <div className="mb-8">
            <Progress value={progress} className="w-full" />
            <p className="text-center font-typewriter text-sm text-muted-foreground mt-2">
              {currentUser.solvedRiddles} of {currentUser.riddles.length} riddles solved
            </p>
          </div>

          <div className="bg-primary/10 p-6 rounded-md mb-6">
            <p className="font-typewriter text-xl text-foreground text-center">
              {currentRiddle.text}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter the collected word"
              className="font-typewriter flex-grow border-2 border-primary focus:border-secondary"
            />
            <Button
              onClick={handleAnswerSubmit}
              className="font-typewriter text-lg bg-primary hover:bg-secondary text-primary-foreground border-2 border-secondary shadow-lg transition-all hover:shadow-xl"
            >
              <ArrowRight className="mr-2 h-5 w-5" />
              Unlock Next Riddle
            </Button>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-600 text-sm font-typewriter text-center mt-4"
            >
              {error}
            </motion.p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Hunt;
