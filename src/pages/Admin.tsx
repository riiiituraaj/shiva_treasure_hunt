import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { users, User } from "@/data/users";
import { Eye, RefreshCw, LogOut } from "lucide-react";

const Admin = () => {
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    if (!user || user.username !== "admin") {
      navigate("/");
    }

    // Get base users but exclude admin
    const baseUsers = users.filter(u => u.username !== 'admin');
    
    // Merge with stored progress
    const usersWithProgress = baseUsers.map(user => {
      const progress = localStorage.getItem(`shiva_hunt_${user.username}`);
      if (progress) {
        const { completedRiddles } = JSON.parse(progress);
        return {
          ...user,
          solvedRiddles: completedRiddles.length,
          collectedWords: completedRiddles.map(riddleId => {
            const riddle = user.riddles[riddleId - 1];
            return riddle ? user.finalSentence.split(' ')[riddleId - 1] : '';
          }).filter(Boolean)
        };
      }
      return user;
    });
    
    setAllUsers(usersWithProgress);
  }, [navigate]);

  const handleResetProgress = (userId: string) => {
    const targetUser = users.find(u => u.id === userId);
    if (targetUser) {
      // Clear localStorage for this user
      localStorage.removeItem(`shiva_hunt_${targetUser.username}`);
      
      // Update state
      const updatedUsers = allUsers.map(user => {
        if (user.id === userId) {
          return { ...user, solvedRiddles: 0, collectedWords: [] };
        }
        return user;
      });
      setAllUsers(updatedUsers);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="font-typewriter text-4xl text-foreground">Admin Dashboard</h1>
          <div className="flex gap-4">
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline" 
              className="font-typewriter border-2 border-secondary"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button 
              onClick={handleLogout} 
              variant="outline" 
              className="font-typewriter border-2 border-secondary"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allUsers.map((user) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-card border-2 border-primary shadow-lg h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="font-typewriter text-2xl text-foreground">{user.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="font-typewriter text-muted-foreground mb-4">Progress: {user.solvedRiddles} / {user.riddles.length}</p>
                  <div className="space-y-2 mb-4">
                    <h4 className="font-typewriter text-foreground">Collected Words:</h4>
                    <p className="font-mono text-sm bg-primary/10 p-2 rounded-md">
                      {user.collectedWords.join(", ") || "None yet"}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-typewriter text-foreground">Final Sentence:</h4>
                    <p className="font-mono text-sm bg-primary/10 p-2 rounded-md">
                      {user.finalSentence}
                    </p>
                  </div>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button onClick={() => handleResetProgress(user.id)} className="w-full font-typewriter bg-secondary hover:bg-primary">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reset Progress
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
