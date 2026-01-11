import { motion } from "framer-motion";

interface BPMDisplayProps {
  bpm: number;
  intensity: number; // 0-1 based on running speed
}

const BPMDisplay = ({ bpm, intensity }: BPMDisplayProps) => {
  const pulseSpeed = Math.max(0.4, 1.2 - intensity * 0.8);
  
  return (
    <div className="relative flex flex-col items-center justify-center py-2">
      {/* Subtle glow */}
      <motion.div
        className="absolute w-24 h-24 rounded-full"
        style={{
          background: `radial-gradient(circle, hsl(var(--primary) / ${0.1 + intensity * 0.1}), transparent 70%)`,
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: pulseSpeed,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* BPM Value */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        animate={{
          scale: [1, 1 + intensity * 0.02, 1],
        }}
        transition={{
          duration: pulseSpeed,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.span
          className="text-5xl font-bold text-foreground tabular-nums"
          key={bpm}
          initial={{ opacity: 0.8, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.15 }}
        >
          {bpm}
        </motion.span>
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          BPM
        </span>
      </motion.div>
    </div>
  );
};

export default BPMDisplay;
