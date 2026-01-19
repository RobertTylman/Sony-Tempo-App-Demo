import { motion, useSpring, useTransform, useMotionValue, useAnimationFrame } from "framer-motion";
import { useState, useEffect } from "react";

interface JoggerAnimationProps {
  speed: number; // 0-1 intensity
}

// Keyframe times for the cycle
const TIMES = [0, 0.16, 0.33, 0.5, 0.66, 0.83, 1];

// Linear interpolation helper
const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

// Helper to get interpolated points from keyframes based on progress
const getInterpolatedPoints = (progress: number, keyframes: number[][]) => {
  // Ensure progress is 0-1
  const p = Math.max(0, Math.min(1, progress));

  // Find segment
  let segmentIndex = 0;
  for (let i = 0; i < TIMES.length - 1; i++) {
    if (p >= TIMES[i] && p < TIMES[i + 1]) {
      segmentIndex = i;
      break;
    }
  }

  const tStart = TIMES[segmentIndex];
  const tEnd = TIMES[segmentIndex + 1];
  const segmentProgress = (p - tStart) / (tEnd - tStart);

  const startPoints = keyframes[segmentIndex];
  const endPoints = keyframes[segmentIndex + 1];

  return startPoints.map((val, i) => lerp(val, endPoints[i], segmentProgress));
};

const JoggerAnimation = ({ speed }: JoggerAnimationProps) => {
  // Use MotionValue directly instead of Spring to test raw inputs
  const smoothSpeed = useMotionValue(speed);

  useEffect(() => {
    smoothSpeed.set(speed);
  }, [speed]);

  // Animation progress 0-1
  const cycleProgress = useMotionValue(0);

  // Drive the animation
  useAnimationFrame((t, delta) => {
    const currentSpeed = smoothSpeed.get();

    // BPM Calculation: 60 + speed * 120
    const currentBpm = 60 + currentSpeed * 120;

    // Duration in seconds for one full cycle (2 steps)
    // 1 step = 1 beat. 2 steps = 2 beats.
    // Beats per second = BPM / 60.
    // Seconds per beat = 60 / BPM.
    // Duration (2 beats) = 120 / BPM.
    const duration = 120 / currentBpm;

    // Increment progress
    const deltaSeconds = delta / 1000;
    const increment = deltaSeconds / duration;

    let newProgress = cycleProgress.get() + increment;
    if (newProgress >= 1) newProgress -= 1;
    cycleProgress.set(newProgress);
  });

  // --- PATH GENERATORS ---
  // Returns [HipX, HipY, KneeX, KneeY, AnkleX, AnkleY]
  const getLegPoints = (s: number) => {
    return {
      contact: [80, 95, 95 + 12 * s, 115, 115 + 12 * s, 135],
      midsupport: [80, 98, 90, 125, 85, 145],
      takeoff: [80, 96, 60 - 5 * s, 120, 35 - 15 * s, 135],
      fold: [80, 95, 55 - 5 * s, 110, 40 - 10 * s, 100],
      highKnee: [80, 95, 105 + 5 * s, 90, 100 + 5 * s, 115],
      terminalSwing: [80, 95, 100 + 10 * s, 100, 110 + 10 * s, 125]
    };
  };

  // Returns [ShoulderX, ShoulderY, ElbowX, ElbowY, HandX, HandY]
  const getArmPoints = (s: number) => {
    return {
      back: [88, 55, 60 - 5 * s, 65, 45 - 10 * s, 50],
      mid: [88, 55, 80, 75, 80, 85],
      forward: [88, 55, 115 + 5 * s, 65, 125 + 10 * s, 45]
    };
  };

  // Construct Paths dynamically
  const rightLegPath = useTransform([cycleProgress, smoothSpeed], ([p, sRaw]) => {
    const s = 1 + (sRaw as number) * 0.5;
    const pts = getLegPoints(s);
    const keyframes = [pts.contact, pts.midsupport, pts.takeoff, pts.fold, pts.highKnee, pts.terminalSwing, pts.contact];
    const [hx, hy, kx, ky, ax, ay] = getInterpolatedPoints(p as number, keyframes);
    return `M${hx} ${hy} L${kx} ${ky} L${ax} ${ay} `;
  });

  // Left leg: Offset progress by 0.5
  const leftLegPath = useTransform([cycleProgress, smoothSpeed], ([pRaw, sRaw]) => {
    const p = ((pRaw as number) + 0.5) % 1;
    const s = 1 + (sRaw as number) * 0.5;
    const pts = getLegPoints(s);
    const keyframes = [pts.contact, pts.midsupport, pts.takeoff, pts.fold, pts.highKnee, pts.terminalSwing, pts.contact];
    const [hx, hy, kx, ky, ax, ay] = getInterpolatedPoints(p, keyframes);
    return `M${hx} ${hy} L${kx} ${ky} L${ax} ${ay} `;
  });

  const rightArmPath = useTransform([cycleProgress, smoothSpeed], ([p, sRaw]) => {
    const s = 1 + (sRaw as number) * 0.5;
    const pts = getArmPoints(s);
    // Sequence: Back, Back, Mid, Forward, Forward, Mid, Back
    const keyframes = [pts.back, pts.back, pts.mid, pts.forward, pts.forward, pts.mid, pts.back];
    const [sx, sy, ex, ey, hx, hy] = getInterpolatedPoints(p as number, keyframes);
    return `M${sx} ${sy} L${ex} ${ey} L${hx} ${hy} `;
  });

  const leftArmPath = useTransform([cycleProgress, smoothSpeed], ([pRaw, sRaw]) => {
    // Left arm is opposite to Right Arm (so same path logic but offset 0.5 phase OR mirrored sequence)
    // Using offset 0.5 matches the leg offset logic for symmetry
    const p = ((pRaw as number) + 0.5) % 1;
    const s = 1 + (sRaw as number) * 0.5;
    const pts = getArmPoints(s);
    const keyframes = [pts.back, pts.back, pts.mid, pts.forward, pts.forward, pts.mid, pts.back];
    const [sx, sy, ex, ey, hx, hy] = getInterpolatedPoints(p, keyframes);
    return `M${sx} ${sy} L${ex} ${ey} L${hx} ${hy} `;
  });

  // Bounce and Lean
  const torsoPath = useTransform([cycleProgress, smoothSpeed], ([p, sRaw]) => {
    // Bounce: Sin wave based on 2 steps per cycle
    // Peak at flight phases (approx 0.4 and 0.9?). 
    // Simplified: Math.sin(p * 4 * PI) ? 
    // Let's use specific keyframe-like interpolation for control
    // Keyframes: 0, 5, 0, 5, 0 (Bounce Y offset)
    const bounceKeyframes = [[0], [5], [0], [5], [0]];
    // Remap times for bounce: 0, 0.25, 0.5, 0.75, 1? No, we use 6 segments.
    // Let's just use math for bounce using p
    // 2 bounces per cycle 0..1
    const pVal = p as number;
    const sVal = sRaw as number;
    const bounce = Math.sin(pVal * Math.PI * 2 * 2) * -3 + 3; // Approx 0 to 6 px up

    const lean = sVal * 5;

    // Static spine curve points + dynamic modifications
    // M88 50 C 92 65, 82 85, 80 95
    // Apply bounce to Y coordinates:
    const startY = 50 + bounce;
    const c1Y = 65 + bounce;
    const c2Y = 85 + bounce;
    const endY = 95 + bounce;

    const startX = 88 + lean;
    const c1X = 92 + lean;

    return `M${startX} ${startY} C ${c1X} ${c1Y}, 82 ${c2Y}, 80 ${endY} `;
  });

  const headY = useTransform([cycleProgress, smoothSpeed], ([p, s]) => {
    // Match torso bounce roughly
    const bounce = Math.sin((p as number) * Math.PI * 2 * 2) * -3 + 3;
    return 32 + bounce;
  });

  const headX = useTransform([cycleProgress, smoothSpeed], ([p, s]) => {
    // Slight sway
    return 86 + Math.sin((p as number) * Math.PI * 2) * 1;
  });

  const neckPath = useTransform([cycleProgress, smoothSpeed], ([p, s]) => {
    const bounce = Math.sin((p as number) * Math.PI * 2 * 2) * -3 + 3;
    const y1 = 45 + bounce;
    const y2 = 55 + bounce;
    return `M85 ${y1} L88 ${y2} `;
  });

  // Shadow
  const shadowScale = useTransform(cycleProgress, (p) => {
    // Scale up when low (contact), scale down when high (flight)
    // Bounce is high at 0.25 (flight), 0.75 (flight).
    // Scale should be small at 0.25, 0.75. Large at 0, 0.5.
    const val = Math.cos(p * Math.PI * 2 * 2); // 1 at 0, -1 at 0.25, 1 at 0.5...
    return 1 + val * 0.1; // 0.9 to 1.1
  });

  const shadowOpacity = useTransform(cycleProgress, (p) => {
    const val = Math.cos(p * Math.PI * 2 * 2);
    return 0.4 + val * 0.1; // 0.3 to 0.5
  });

  // Common style
  const silhouetteProps = {
    stroke: "url(#runnerGradient)",
    strokeWidth: "16",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    fill: "none",
    style: { filter: "url(#glow)" }
  };

  return (
    <div className="relative w-full h-48 flex items-center justify-center overflow-hidden">
      <motion.svg
        width="180"
        height="180"
        viewBox="0 0 180 180"
        className="relative z-10"
      >
        <defs>
          <linearGradient id="runnerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.95" />
            <stop offset="100%" stopColor="hsl(var(--sony-purple))" stopOpacity="0.95" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* --- BACK LAYER --- */}
        {/* Left Arm */}
        <motion.path
          {...silhouetteProps}
          strokeWidth="14"
          style={{ ...silhouetteProps.style, opacity: 0.85 }}
          d={leftArmPath}
        />

        {/* Left Leg */}
        <motion.path
          {...silhouetteProps}
          strokeWidth="15"
          style={{ ...silhouetteProps.style, opacity: 0.85 }}
          d={leftLegPath}
        />

        {/* --- BODY LAYER --- */}
        {/* Head */}
        <motion.path
          d={neckPath}
          {...silhouetteProps}
          strokeWidth="16"
        />
        <motion.circle
          r="14"
          fill="url(#runnerGradient)"
          style={{ filter: "url(#glow)" }}
          cx={headX}
          cy={headY}
        />

        {/* Torso */}
        <motion.path
          {...silhouetteProps}
          strokeWidth="20"
          d={torsoPath}
        />

        {/* --- FRONT LAYER --- */}
        {/* Right Leg */}
        <motion.path
          {...silhouetteProps}
          d={rightLegPath}
        />

        {/* Right Arm */}
        <motion.path
          {...silhouetteProps}
          strokeWidth="14"
          d={rightArmPath}
        />

      </motion.svg>

      {/* Shadow */}
      <motion.div
        className="absolute bottom-6 w-24 h-3 bg-black/40 rounded-full blur-md"
        style={{
          scaleX: shadowScale,
          opacity: shadowOpacity
        }}
      />
    </div>
  );
};

export default JoggerAnimation;
