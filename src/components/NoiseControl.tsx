import { motion } from "framer-motion";
import { Headphones, Volume2 } from "lucide-react";

interface NoiseControlProps {
  intensity: number; // 0-1
}

const NoiseControl = ({ intensity }: NoiseControlProps) => {
  // ANC level proportional to speed - higher pace = more noise cancellation
  const ancLevel = Math.round(30 + intensity * 70);

  const getANCMode = () => {
    if (ancLevel > 80) return "Full ANC";
    if (ancLevel > 60) return "High ANC";
    if (ancLevel > 40) return "Moderate ANC";
    return "Light ANC";
  };

  return (
    <div className="bg-card rounded-2xl p-4 border border-border/50">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Headphones className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Noise Control
          </span>
        </div>
        <motion.span
          className="text-xs font-semibold text-primary"
          key={getANCMode()}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {getANCMode()}
        </motion.span>
      </div>

      {/* Single ANC Level Bar */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Volume2 className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-muted-foreground">Active Noise Cancellation</span>
            <span className="font-semibold text-foreground tabular-nums">{ancLevel}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, hsl(var(--primary) / 0.6), hsl(var(--primary)))",
              }}
              animate={{ width: `${ancLevel}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      <p className="text-[10px] text-muted-foreground/70 mt-3 text-center">
        Higher pace = more noise isolation for focus
      </p>
    </div>
  );
};

export default NoiseControl;
