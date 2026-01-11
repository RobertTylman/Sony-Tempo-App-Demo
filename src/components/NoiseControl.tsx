import { motion } from "framer-motion";
import { Headphones, Wind, Volume2 } from "lucide-react";

interface NoiseControlProps {
  intensity: number; // 0-1
}

const NoiseControl = ({ intensity }: NoiseControlProps) => {
  // ANC level inversely proportional to speed (less when running fast for safety)
  const ancLevel = Math.round((1 - intensity * 0.7) * 100);
  // Ambient sound increases with speed
  const ambientLevel = Math.round(intensity * 60);
  
  const getANCMode = () => {
    if (ancLevel > 80) return "Full ANC";
    if (ancLevel > 50) return "Moderate ANC";
    if (ancLevel > 20) return "Light ANC";
    return "Ambient Focus";
  };
  
  return (
    <div className="glass-panel p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Headphones className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
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
      
      <div className="space-y-3">
        {/* ANC Level */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Volume2 className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Active NC</span>
              <span className="font-medium text-foreground">{ancLevel}%</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-primary"
                animate={{ width: `${ancLevel}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
        
        {/* Ambient Level */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
            <Wind className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Ambient Sound</span>
              <span className="font-medium text-foreground">{ambientLevel}%</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-muted-foreground/50"
                animate={{ width: `${ambientLevel}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-[10px] text-muted-foreground mt-3 text-center">
        Auto-adjusts based on your pace for safety
      </p>
    </div>
  );
};

export default NoiseControl;
