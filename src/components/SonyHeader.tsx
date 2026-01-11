import { motion } from "framer-motion";
import { Settings, Battery } from "lucide-react";

const SonyHeader = () => {
  return (
    <motion.header
      className="flex items-center justify-between px-4 py-3"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2">
        {/* Sony Logo */}
        <svg
          width="60"
          height="16"
          viewBox="0 0 60 16"
          fill="none"
          className="text-foreground"
        >
          <text
            x="0"
            y="13"
            fill="currentColor"
            fontFamily="Inter"
            fontWeight="700"
            fontSize="14"
            letterSpacing="0.05em"
          >
            SONY
          </text>
        </svg>
        <span className="text-[10px] text-muted-foreground font-medium tracking-wider">
          TEMPO
        </span>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 text-muted-foreground">
          <Battery className="w-4 h-4" />
          <span className="text-[10px] font-medium">78%</span>
        </div>
        <motion.button
          className="p-1.5 rounded-lg hover:bg-muted transition-colors"
          whileTap={{ scale: 0.9 }}
        >
          <Settings className="w-4 h-4 text-muted-foreground" />
        </motion.button>
      </div>
    </motion.header>
  );
};

export default SonyHeader;
