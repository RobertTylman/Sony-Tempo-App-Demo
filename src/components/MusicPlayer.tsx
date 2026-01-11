import { motion } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { useState } from "react";

interface MusicPlayerProps {
  bpm: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

const MusicPlayer = ({ bpm, isPlaying, onTogglePlay }: MusicPlayerProps) => {
  const [progress] = useState(35);
  
  // Simulated track info based on BPM
  const getTrackInfo = () => {
    if (bpm < 100) return { title: "Slow Motion", artist: "Ambient Flow" };
    if (bpm < 130) return { title: "Steady Pace", artist: "Beat Runner" };
    if (bpm < 160) return { title: "Power Surge", artist: "High Energy" };
    return { title: "Maximum Velocity", artist: "Sprint Masters" };
  };
  
  const track = getTrackInfo();
  
  return (
    <div className="w-full glass-panel p-4">
      {/* Track Info */}
      <div className="flex items-center gap-4 mb-4">
        <motion.div
          className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/80 to-sony-amber/60 flex items-center justify-center glow-box"
          animate={isPlaying ? {
            scale: [1, 1.05, 1],
          } : {}}
          transition={{
            duration: 60 / bpm,
            repeat: Infinity,
          }}
        >
          <Volume2 className="w-6 h-6 text-primary-foreground" />
        </motion.div>
        
        <div className="flex-1 min-w-0">
          <motion.h3
            className="font-semibold text-foreground truncate"
            key={track.title}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {track.title}
          </motion.h3>
          <motion.p
            className="text-sm text-muted-foreground truncate"
            key={track.artist}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {track.artist}
          </motion.p>
        </div>
        
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 border border-primary/20">
          <span className="text-xs font-bold text-primary">{bpm}</span>
          <span className="text-[10px] text-primary/70">BPM</span>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="h-1 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: "var(--gradient-primary)",
              width: `${progress}%`,
            }}
            animate={isPlaying ? {
              opacity: [0.8, 1, 0.8],
            } : {}}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-muted-foreground">1:24</span>
          <span className="text-[10px] text-muted-foreground">4:02</span>
        </div>
      </div>
      
      {/* Controls */}
      <div className="flex items-center justify-center gap-6">
        <motion.button
          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          whileTap={{ scale: 0.9 }}
        >
          <SkipBack className="w-5 h-5" />
        </motion.button>
        
        <motion.button
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{
            background: "var(--gradient-primary)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={onTogglePlay}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-primary-foreground" />
          ) : (
            <Play className="w-6 h-6 text-primary-foreground ml-1" />
          )}
        </motion.button>
        
        <motion.button
          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          whileTap={{ scale: 0.9 }}
        >
          <SkipForward className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};

export default MusicPlayer;
