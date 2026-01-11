import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BPMDisplay from "@/components/BPMDisplay";
import JoggerAnimation from "@/components/JoggerAnimation";
import MusicPlayer from "@/components/MusicPlayer";
import NoiseControl from "@/components/NoiseControl";
import SpeedSlider from "@/components/SpeedSlider";
import BottomNav from "@/components/BottomNav";
import { ChevronRight, Play } from "lucide-react";

const Index = () => {
  const [speed, setSpeed] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(true);
  const [bpm, setBpm] = useState(140);

  // BPM adjusts based on speed (80-180 BPM range)
  useEffect(() => {
    const targetBpm = Math.round(80 + speed * 100);
    setBpm(targetBpm);
  }, [speed]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* iPhone Frame */}
      <motion.div
        className="relative w-[375px] h-[812px] rounded-[50px] overflow-hidden bg-background"
        style={{
          boxShadow: `
            0 0 0 12px hsl(0 0% 12%),
            0 0 0 14px hsl(0 0% 8%),
            0 25px 50px -12px rgba(0, 0, 0, 0.5)
          `,
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Status Bar */}
        <div className="absolute top-0 left-0 right-0 h-12 flex items-center justify-center z-20">
          <div className="w-28 h-7 bg-black rounded-b-2xl" />
        </div>

        {/* Screen Content */}
        <div className="h-full pt-14 pb-0 flex flex-col">
          {/* Main scrollable content */}
          <div className="flex-1 overflow-y-auto px-4 pb-20 space-y-3">
            {/* Jogger Animation - Main Hero */}
            <motion.div
              className="flex justify-center py-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <JoggerAnimation speed={speed} />
            </motion.div>

            {/* BPM Display - Compact */}
            <motion.div
              className="flex justify-center mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <BPMDisplay bpm={bpm} intensity={speed} />
            </motion.div>

            {/* Speed Slider */}
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <SpeedSlider speed={speed} onSpeedChange={setSpeed} />
            </motion.div>

            {/* Feature Cards Grid */}
            <motion.div
              className="grid grid-cols-2 gap-3 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {/* Running Card - Active */}
              <div className="bg-card rounded-2xl p-4 relative overflow-hidden">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">Running</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                    <Play className="w-2 h-2 text-primary-foreground fill-current" />
                  </div>
                  <span className="text-xs text-primary">Active</span>
                </div>
              </div>

              {/* Adaptive Sound Card */}
              <div className="bg-card rounded-2xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">Sound</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
                <span className="text-xs text-muted-foreground">Adaptive</span>
              </div>
            </motion.div>

            {/* Noise Control */}
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <NoiseControl intensity={speed} />
            </motion.div>

            {/* Music Player */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <MusicPlayer
                bpm={bpm}
                isPlaying={isPlaying}
                onTogglePlay={() => setIsPlaying(!isPlaying)}
              />
            </motion.div>
          </div>

          {/* Bottom Navigation */}
          <BottomNav activeTab="scene" />

          {/* Home Indicator */}
          <div className="flex justify-center pb-2">
            <div className="w-32 h-1 bg-foreground/30 rounded-full" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
