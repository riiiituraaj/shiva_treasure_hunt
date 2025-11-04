import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex justify-between mb-2 font-typewriter text-sm text-foreground">
        <span>Progress</span>
        <span>{current} / {total} Riddles</span>
      </div>
      <div className="h-3 bg-card border-2 border-secondary rounded-sm overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
