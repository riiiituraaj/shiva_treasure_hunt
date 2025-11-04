import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { users } from "@/data/users";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = () => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      if (user.username === "admin") {
        navigate("/admin");
      } else {
        navigate("/hunt");
      }
    } else {
      toast({
        title: "Invalid credentials",
        description: "Please check your username and password.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background font-mono">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-lg border-2 border-primary"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary font-typewriter">
            Shiva&apos;s Hunt Quest
          </h1>
          <p className="text-muted-foreground">
            A treasure hunt for the worthy.
          </p>
        </div>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-input"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-input"
          />
        </div>
        <Button onClick={handleLogin} className="w-full">
          Login
        </Button>
      </motion.div>
    </div>
  );
};

export default Login;
