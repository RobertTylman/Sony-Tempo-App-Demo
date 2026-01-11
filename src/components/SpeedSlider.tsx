import { motion } from "framer-motion";
import { Footprints } from "lucide-react";

interface SpeedSliderProps {
  speed: number;
  onSpeedChange: (speed: number) => void;
}

const SpeedSlider = ({ speed, onSpeedChange }: SpeedSliderProps) => {
  const stepsPerMinute = Math.round(80 + speed * 120);
  
  return (
    <div className="w-full px-2">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Footprints className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium text-muted-foreground">
            Simulate Step Rate
          </span>
        </div>
        <motion.span
          className="text-xs font-bold text-foreground"
          key={stepsPerMinute}
          initial={{ scale: 1.2, color: "hsl(var(--primary))" }}
          animate={{ scale: 1, color: "hsl(var(--foreground))" }}
        >
          {stepsPerMinute} spm
        </motion.span>
      </div>
      
      <div className="relative">
        <input
          type="range"
          min="0"
          max="100"
          value={speed * 100}
          onChange={(e) => onSpeedChange(Number(e.target.value) / 100)}
          className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-gradient-to-br
            [&::-webkit-slider-thumb]:from-primary
            [&::-webkit-slider-thumb]:to-sony-amber
            [&::-webkit-slider-thumb]:shadow-lg
            [&::-webkit-slider-thumb]:shadow-primary/30
            [&::-webkit-slider-thumb]:cursor-grab
            [&::-webkit-slider-thumb]:active:cursor-grabbing
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:hover:scale-110"
        />
        
        {/* Track fill */}
        <div
          className="absolute top-0 left-0 h-2 rounded-full pointer-events-none"
          style={{
            width: `${speed * 100}%`,
            background: "var(--gradient-primary)",
          }}
        />
      </div>
      
      <div className="flex justify-between mt-1">
        <span className="text-[10px] text-muted-foreground">Walk</span>
        <span className="text-[10px] text-muted-foreground">Sprint</span>
      </div>
    </div>
  );
};

export default SpeedSlider;
