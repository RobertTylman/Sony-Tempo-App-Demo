import { motion } from "framer-motion";
import { Activity } from "lucide-react";

interface SpeedSliderProps {
  speed: number;
  onSpeedChange: (speed: number) => void;
}

const SpeedSlider = ({ speed, onSpeedChange }: SpeedSliderProps) => {
  // Standardized to BPM (same as music) - range 80-180 BPM
  const bpm = Math.round(80 + speed * 100);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Simulated Pace
          </span>
        </div>
      </div>

      {/* Single unified slider bar */}
      <div className="relative h-12 bg-card rounded-xl overflow-hidden border border-border/50">
        {/* Track fill background */}
        <motion.div
          className="absolute top-0 left-0 h-full"
          style={{
            background: "linear-gradient(90deg, hsl(var(--primary) / 0.2), hsl(var(--primary) / 0.4))",
          }}
          animate={{ width: `${speed * 100}%` }}
          transition={{ duration: 0.1, ease: "easeOut" }}
        />

        {/* Slider input */}
        <input
          type="range"
          min="0"
          max="100"
          value={speed * 100}
          onChange={(e) => onSpeedChange(Number(e.target.value) / 100)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-grab active:cursor-grabbing z-20"
        />

        {/* Draggable handle indicator - flush vertical bar */}
        <motion.div
          className="absolute top-0 h-full w-1 bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.5)] pointer-events-none z-10"
          style={{
            left: `${speed * 100}%`,
          }}
          animate={{
            left: `${speed * 100}%`,
          }}
          transition={{ duration: 0.1, ease: "easeOut" }}
        />

        {/* Labels inside the bar */}
        <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
          <span className="text-xs font-medium text-muted-foreground/60">Walk</span>
          <span className="text-xs font-medium text-muted-foreground/60">Run</span>
        </div>
      </div>

      {/* Hint text */}
      <p className="text-[10px] text-muted-foreground/70 mt-2 text-center">
        Drag to simulate your running pace
      </p>
    </div>
  );
};

export default SpeedSlider;
