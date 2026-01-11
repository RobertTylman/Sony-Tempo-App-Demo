import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BPMDisplay from "@/components/BPMDisplay";
import JoggerAnimation from "@/components/JoggerAnimation";
import MusicPlayer from "@/components/MusicPlayer";
import NoiseControl from "@/components/NoiseControl";
import SpeedSlider from "@/components/SpeedSlider";
import SonyHeader from "@/components/SonyHeader";

const Index = () => {
  const [speed, setSpeed] = useState(0.3);
  const [isPlaying, setIsPlaying] = useState(true);
  const [bpm, setBpm] = useState(120);

  // BPM adjusts based on speed (80-180 BPM range)
  useEffect(() => {
    const targetBpm = Math.round(80 + speed * 100);
    setBpm(targetBpm);
  }, [speed]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* iPhone Frame */}
      <motion.div
        className="relative w-[375px] h-[844px] rounded-[50px] overflow-hidden bg-[hsl(0_0%_5%)]"
        style={{
          boxShadow: `
            0 0 0 12px hsl(0 0% 15%),
            0 0 0 14px hsl(0 0% 10%),
            0 25px 50px -12px rgba(0, 0, 0, 0.5),
            0 0 100px hsl(var(--sony-orange) / 0.08)
          `,
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Status Bar */}
        <div className="absolute top-0 left-0 right-0 h-12 flex items-center justify-center z-20">
          <div className="w-28 h-7 bg-background rounded-b-2xl" />
        </div>

        {/* Screen Content */}
        <div className="h-full pt-12 pb-10 flex flex-col overflow-y-auto">
          <SonyHeader />

          {/* Main Content */}
          <div className="flex-1 flex flex-col px-5 py-2 gap-2">
            {/* BPM Section */}
            <motion.div
              className="flex-shrink-0 flex justify-center py-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <BPMDisplay bpm={bpm} intensity={speed} />
            </motion.div>

            {/* Jogger Animation */}
            <motion.div
              className="flex-shrink-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <JoggerAnimation speed={speed} />
            </motion.div>

            {/* Speed Slider */}
            <motion.div
              className="flex-shrink-0 py-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <SpeedSlider speed={speed} onSpeedChange={setSpeed} />
            </motion.div>

            {/* Noise Control */}
            <motion.div
              className="flex-shrink-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <NoiseControl intensity={speed} />
            </motion.div>

            {/* Music Player */}
            <motion.div
              className="flex-shrink-0"
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

          {/* Home Indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
            <div className="w-32 h-1 bg-muted-foreground/30 rounded-full" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
