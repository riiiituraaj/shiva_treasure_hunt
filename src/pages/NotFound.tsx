import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center text-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-typewriter text-8xl md:text-9xl text-primary font-bold">404</h1>
        <p className="font-typewriter text-2xl md:text-3xl text-foreground mt-4 mb-8">
          Oops! Page Not Found
        </p>
        <p className="font-typewriter text-lg text-muted-foreground mb-8">
          Looks like you've taken a wrong turn in the hunt.
        </p>
        <Button asChild className="font-typewriter text-lg bg-primary hover:bg-secondary text-primary-foreground border-2 border-secondary shadow-lg transition-all hover:shadow-xl">
          <Link to="/">
            <Home className="mr-2 h-5 w-5" />
            Go Back Home
          </Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFound;
