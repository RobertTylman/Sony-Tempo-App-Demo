import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import BPMDisplay from "@/components/BPMDisplay";
import JoggerAnimation from "@/components/JoggerAnimation";
import MusicPlayer from "@/components/MusicPlayer";
import NoiseControl from "@/components/NoiseControl";
import SpeedSlider from "@/components/SpeedSlider";
import BottomNav from "@/components/BottomNav";
import { ChevronRight, Play, Zap } from "lucide-react";

const Index = () => {
  const [speed, setSpeed] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(true);
  const [bpm, setBpm] = useState(140);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // BPM adjusts based on speed (60-180 BPM range)
  useEffect(() => {
    const targetBpm = Math.round(60 + speed * 120);
    setBpm(targetBpm);
  }, [speed]);

  // Demo automation - scrolls and adjusts slider for presentation
  const runDemoSequence = useCallback(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const SCROLL_DURATION = 3000; // ms for each scroll direction
    const SLIDER_DURATION = 4000; // ms for each slider direction
    const PAUSE_BETWEEN = 1000; // ms pause between actions

    // Helper: Smooth scroll animation
    const smoothScroll = (
      element: HTMLElement,
      targetScroll: number,
      duration: number
    ): Promise<void> => {
      return new Promise((resolve) => {
        const startScroll = element.scrollTop;
        const distance = targetScroll - startScroll;
        const startTime = performance.now();

        const animateScroll = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease in-out cubic
          const easeProgress =
            progress < 0.5
              ? 4 * progress * progress * progress
              : 1 - Math.pow(-2 * progress + 2, 3) / 2;

          element.scrollTop = startScroll + distance * easeProgress;

          if (progress < 1) {
            requestAnimationFrame(animateScroll);
          } else {
            resolve();
          }
        };
        requestAnimationFrame(animateScroll);
      });
    };

    // Helper: Smooth slider animation
    const smoothSlider = (
      startValue: number,
      endValue: number,
      duration: number,
      setValue: (v: number) => void
    ): Promise<void> => {
      return new Promise((resolve) => {
        const startTime = performance.now();
        const distance = endValue - startValue;

        const animateSlider = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease in-out cubic
          const easeProgress =
            progress < 0.5
              ? 4 * progress * progress * progress
              : 1 - Math.pow(-2 * progress + 2, 3) / 2;

          setValue(startValue + distance * easeProgress);

          if (progress < 1) {
            requestAnimationFrame(animateSlider);
          } else {
            resolve();
          }
        };
        requestAnimationFrame(animateSlider);
      });
    };

    // Helper: Delay/pause
    const delay = (ms: number): Promise<void> =>
      new Promise((resolve) => setTimeout(resolve, ms));

    // Run the demo sequence
    const runSequence = async () => {
      while (true) {
        const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;

        // 1. Scroll down slowly
        await smoothScroll(scrollContainer, maxScroll, SCROLL_DURATION);
        await delay(PAUSE_BETWEEN);

        // 2. Increase tempo to near max (while at bottom)
        await smoothSlider(0.5, 0.9, SLIDER_DURATION, setSpeed);
        await delay(PAUSE_BETWEEN);

        // 3. Scroll back up
        await smoothScroll(scrollContainer, 0, SCROLL_DURATION);
        await delay(PAUSE_BETWEEN);

        // 4. Decrease tempo to ~78 BPM
        await smoothSlider(0.9, 0.15, SLIDER_DURATION, setSpeed);
        await delay(PAUSE_BETWEEN);

        // 5. Reset to middle and pause before next cycle
        await smoothSlider(0.15, 0.5, SLIDER_DURATION / 2, setSpeed);
        await delay(PAUSE_BETWEEN * 2);
      }
    };

    runSequence();
  }, []);

  // Start demo automation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      runDemoSequence();
    }, 2000); // 2 second delay before starting

    return () => clearTimeout(timer);
  }, [runDemoSequence]);

  // Calculate pulse animation based on BPM
  const pulseDuration = 60 / bpm; // Time for one beat in seconds
  // Very subtle pulse - max 1% lightness variation
  const pulseIntensity = Math.min(0.01, speed * 0.01);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* iPhone Frame */}
      <motion.div
        className="relative w-[375px] h-[812px] rounded-[50px] overflow-hidden bg-background cursor-none [&_*]:!cursor-none"
        style={{
          boxShadow: `
            0 0 0 12px hsl(0 0% 10%),
            0 0 0 14px hsl(0 0% 6%),
            0 30px 60px -15px rgba(0, 0, 0, 0.6)
          `,
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Pulsing background */}
        <motion.div
          className="absolute inset-0 bg-background"
          animate={{
            backgroundColor: [
              `hsl(0 0% 7%)`,
              // Very subtle pulse: minimal tint and lightness change
              `hsl(142 ${3 + speed * 5}% ${7 + pulseIntensity * 100}%)`,
              `hsl(0 0% 7%)`,
            ],
          }}
          transition={{
            duration: pulseDuration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Status Bar */}
        <div className="absolute top-0 left-0 right-0 h-10 flex items-center justify-center z-20">
          <div className="w-28 h-7 bg-black rounded-b-2xl" />
        </div>

        {/* Sony Logo - Absolute Top Left (Next to notch) */}
        <div className="absolute top-[0px] left-7 z-30 pointer-events-none">
          <img
            src="/sony logo.svg"
            alt="Sony"
            className="w-20 h-auto invert opacity-90"
          />
        </div>

        {/* Screen Content */}
        <div className="relative z-10 h-full pt-0 pb-0 flex flex-col">
          {/* Main scrollable content */}
          <div ref={scrollContainerRef} className="flex-1 overflow-y-auto px-4 pt-4 pb-20 space-y-4">

            {/* Spacer to push runner down */}
            <div className="h-16" />

            {/* Jogger Animation - Main Hero */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <JoggerAnimation speed={speed} />
            </motion.div>

            {/* BPM Display - Compact */}
            <motion.div
              className="flex justify-center -mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <BPMDisplay bpm={bpm} intensity={speed} />
            </motion.div>

            {/* Speed Slider */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <SpeedSlider speed={speed} onSpeedChange={setSpeed} />
            </motion.div>

            {/* Feature Cards Grid */}
            <motion.div
              className="grid grid-cols-2 gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {/* Running Card - Active */}
              <div className="bg-card rounded-2xl p-4 border border-border/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Running</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <Play className="w-2.5 h-2.5 text-primary-foreground fill-current" />
                  </div>
                  <span className="text-xs font-medium text-primary">Active</span>
                </div>
              </div>

              {/* Adaptive Sound Card */}
              <div className="bg-card rounded-2xl p-4 border border-border/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Sound</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                    <Zap className="w-2.5 h-2.5 text-accent" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">Adaptive</span>
                </div>
              </div>
            </motion.div>

            {/* Noise Control */}
            <motion.div
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
            <div className="w-32 h-1 bg-foreground/20 rounded-full" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
