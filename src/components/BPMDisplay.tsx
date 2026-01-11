import { motion } from "framer-motion";

interface BPMDisplayProps {
  bpm: number;
  intensity: number; // 0-1 based on running speed
}

const BPMDisplay = ({ bpm, intensity }: BPMDisplayProps) => {
  const pulseSpeed = Math.max(0.3, 1 - intensity * 0.7);
  
  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Glow rings */}
      <motion.div
        className="absolute w-48 h-48 rounded-full"
        style={{
          background: `radial-gradient(circle, hsl(32 100% 50% / ${0.15 + intensity * 0.15}), transparent 70%)`,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: pulseSpeed,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute w-36 h-36 rounded-full border border-primary/30"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: pulseSpeed,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.1,
        }}
      />
      
      {/* BPM Value */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        animate={{
          scale: [1, 1 + intensity * 0.05, 1],
        }}
        transition={{
          duration: pulseSpeed,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-[0.3em] mb-1">
          BPM
        </span>
        <motion.span
          className="text-7xl font-black glow-text text-gradient tabular-nums"
          key={bpm}
          initial={{ opacity: 0.8, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {bpm}
        </motion.span>
        <span className="text-xs font-medium text-muted-foreground mt-1">
          beats per minute
        </span>
      </motion.div>
    </div>
  );
};

export default BPMDisplay;
