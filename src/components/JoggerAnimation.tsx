import { motion } from "framer-motion";

interface JoggerAnimationProps {
  speed: number; // 0-1 intensity
}

const JoggerAnimation = ({ speed }: JoggerAnimationProps) => {
  // Make it run faster: Range from 0.8s (jog) down to 0.28s (sprint)
  const animationDuration = Math.max(0.28, 0.8 - speed * 0.52);
  const isActive = speed > 0.05;

  // Dynamic stride multiplier: as speed increases, limbs reach further
  const stride = 1 + speed * 0.25;

  return (
    <div className="relative w-full h-48 flex items-center justify-center overflow-hidden">
      {/* Simple Stick Figure Runner - Matching reference */}
      <motion.svg
        width="120"
        height="160"
        viewBox="0 0 120 160"
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

        {/* Head - Large round head like reference */}
        <motion.circle
          cx="65"
          cy="22"
          r="14"
          fill="url(#runnerGradient)"
          style={{ filter: "url(#glow)" }}
          animate={isActive ? {
            y: [0, -2, 0],
            x: [0, 1, 0]
          } : {}}
          transition={{
            duration: animationDuration / 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Body/Torso - Simple thin line, slight lean */}
        <motion.path
          d="M62 38 L55 75"
          stroke="url(#runnerGradient)"
          strokeWidth="5"
          strokeLinecap="round"
          style={{ filter: "url(#glow)" }}
          animate={isActive ? {
            d: [
              "M60 38 L56 75",
              "M64 38 L54 75",
              "M60 38 L56 75"
            ]
          } : {}}
          transition={{
            duration: animationDuration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Back Arm - Thin stick arm */}
        <motion.path
          d="M60 45 L40 55 L30 45"
          stroke="url(#runnerGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{ opacity: 0.7, filter: "url(#glow)" }}
          animate={isActive ? {
            d: [
              `M60 45 L${35 - 8 * stride} 58 L${25 - 10 * stride} 48`,
              `M60 45 L${80 + 5 * stride} 52 L${90 + 8 * stride} 40`,
              `M60 45 L${35 - 8 * stride} 58 L${25 - 10 * stride} 48`
            ]
          } : { d: "M60 45 L50 60 L55 70" }}
          transition={{
            duration: animationDuration,
            repeat: isActive ? Infinity : 0,
            ease: "easeInOut"
          }}
        />

        {/* Front Arm - Thin stick arm */}
        <motion.path
          d="M60 45 L80 52 L90 40"
          stroke="url(#runnerGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{ filter: "url(#glow)" }}
          animate={isActive ? {
            d: [
              `M60 45 L${80 + 5 * stride} 52 L${90 + 8 * stride} 40`,
              `M60 45 L${35 - 8 * stride} 58 L${25 - 10 * stride} 48`,
              `M60 45 L${80 + 5 * stride} 52 L${90 + 8 * stride} 40`
            ]
          } : { d: "M60 45 L70 60 L65 70" }}
          transition={{
            duration: animationDuration,
            repeat: isActive ? Infinity : 0,
            ease: "easeInOut"
          }}
        />

        {/* Back Leg - Thin stick leg */}
        <motion.path
          d="M55 75 L35 100 L20 95"
          stroke="url(#runnerGradient)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{ opacity: 0.7, filter: "url(#glow)" }}
          animate={isActive ? {
            d: [
              `M55 75 L${30 - 12 * stride} 100 L${15 - 18 * stride} 90`,
              `M55 75 L${75 + 8 * stride} 105 L${85 + 15 * stride} 130`,
              `M55 75 L${30 - 12 * stride} 100 L${15 - 18 * stride} 90`
            ]
          } : { d: "M55 75 L50 115 L55 130" }}
          transition={{
            duration: animationDuration,
            repeat: isActive ? Infinity : 0,
            ease: "easeInOut"
          }}
        />

        {/* Front Leg - Thin stick leg */}
        <motion.path
          d="M55 75 L75 105 L85 130"
          stroke="url(#runnerGradient)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{ filter: "url(#glow)" }}
          animate={isActive ? {
            d: [
              `M55 75 L${75 + 8 * stride} 105 L${85 + 15 * stride} 130`,
              `M55 75 L${30 - 12 * stride} 100 L${15 - 18 * stride} 90`,
              `M55 75 L${75 + 8 * stride} 105 L${85 + 15 * stride} 130`
            ]
          } : { d: "M55 75 L60 115 L55 130" }}
          transition={{
            duration: animationDuration,
            repeat: isActive ? Infinity : 0,
            ease: "easeInOut"
          }}
        />
      </motion.svg>

      {/* Shadow */}
      <motion.div
        className="absolute bottom-6 w-16 h-2 bg-black/30 rounded-full blur-md"
        animate={isActive ? {
          scaleX: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        } : {}}
        transition={{
          duration: animationDuration,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default JoggerAnimation;
