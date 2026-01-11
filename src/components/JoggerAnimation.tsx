import { motion } from "framer-motion";

interface JoggerAnimationProps {
  speed: number; // 0-1 intensity
}

const JoggerAnimation = ({ speed }: JoggerAnimationProps) => {
  const animationDuration = Math.max(0.35, 0.9 - speed * 0.55);
  const isActive = speed > 0.15;
  
  return (
    <div className="relative w-full h-52 flex items-center justify-center overflow-hidden">
      {/* Illustrated Runner SVG */}
      <motion.svg
        width="120"
        height="190"
        viewBox="0 0 120 190"
        className="relative z-10"
      >
        {/* Hair */}
        <ellipse
          cx="60"
          cy="28"
          rx="16"
          ry="18"
          fill="hsl(0 0% 50%)"
        />
        {/* Ponytail */}
        <motion.path
          d="M72 22 C85 20 90 35 82 48"
          stroke="hsl(0 0% 50%)"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
          animate={isActive ? {
            d: [
              "M72 22 C85 20 90 35 82 48",
              "M72 22 C90 18 95 30 88 42",
              "M72 22 C85 20 90 35 82 48",
            ],
          } : {}}
          transition={{
            duration: animationDuration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Head/Face */}
        <ellipse
          cx="60"
          cy="35"
          rx="14"
          ry="16"
          fill="hsl(25 55% 55%)"
        />
        
        {/* Ear */}
        <ellipse cx="46" cy="35" r="3.5" fill="hsl(25 45% 50%)" />
        
        {/* Earbud */}
        <circle cx="45" cy="35" r="4" fill="hsl(0 0% 90%)" />
        <circle cx="45" cy="35" r="2" fill="hsl(0 0% 75%)" />
        
        {/* Neck */}
        <rect x="54" y="49" width="12" height="10" rx="2" fill="hsl(25 55% 55%)" />
        
        {/* Torso - White shirt */}
        <motion.path
          d="M42 58 L78 58 L82 105 L38 105 Z"
          fill="hsl(0 0% 90%)"
          animate={isActive ? {
            d: [
              "M42 58 L78 58 L82 105 L38 105 Z",
              "M40 56 L80 56 L84 103 L36 103 Z",
              "M42 58 L78 58 L82 105 L38 105 Z",
            ],
          } : {}}
          transition={{
            duration: animationDuration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Left Arm */}
        <motion.g>
          <motion.line
            x1="44"
            y1="62"
            x2="28"
            y2="78"
            stroke="hsl(25 55% 55%)"
            strokeWidth="12"
            strokeLinecap="round"
            animate={isActive ? {
              x2: [28, 70, 28],
              y2: [78, 75, 78],
            } : { x2: 35, y2: 82 }}
            transition={{
              duration: animationDuration,
              repeat: isActive ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
          <motion.line
            x1="28"
            y1="78"
            x2="32"
            y2="62"
            stroke="hsl(25 55% 55%)"
            strokeWidth="10"
            strokeLinecap="round"
            animate={isActive ? {
              x1: [28, 70, 28],
              y1: [78, 75, 78],
              x2: [32, 58, 32],
              y2: [62, 62, 62],
            } : { x1: 35, y1: 82, x2: 30, y2: 95 }}
            transition={{
              duration: animationDuration,
              repeat: isActive ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
        </motion.g>
        
        {/* Right Arm */}
        <motion.g>
          <motion.line
            x1="76"
            y1="62"
            x2="92"
            y2="78"
            stroke="hsl(25 55% 55%)"
            strokeWidth="12"
            strokeLinecap="round"
            animate={isActive ? {
              x2: [92, 50, 92],
              y2: [78, 75, 78],
            } : { x2: 85, y2: 82 }}
            transition={{
              duration: animationDuration,
              repeat: isActive ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
          <motion.line
            x1="92"
            y1="78"
            x2="88"
            y2="62"
            stroke="hsl(25 55% 55%)"
            strokeWidth="10"
            strokeLinecap="round"
            animate={isActive ? {
              x1: [92, 50, 92],
              y1: [78, 75, 78],
              x2: [88, 62, 88],
              y2: [62, 62, 62],
            } : { x1: 85, y1: 82, x2: 90, y2: 95 }}
            transition={{
              duration: animationDuration,
              repeat: isActive ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
        </motion.g>
        
        {/* Shorts - Dark */}
        <motion.path
          d="M40 102 L80 102 L78 128 L62 128 L60 118 L58 128 L42 128 Z"
          fill="hsl(0 0% 22%)"
          animate={isActive ? {
            d: [
              "M40 102 L80 102 L78 128 L62 128 L60 118 L58 128 L42 128 Z",
              "M38 100 L82 100 L80 126 L64 126 L60 116 L56 126 L40 126 Z",
              "M40 102 L80 102 L78 128 L62 128 L60 118 L58 128 L42 128 Z",
            ],
          } : {}}
          transition={{
            duration: animationDuration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Left Leg */}
        <motion.g>
          <motion.line
            x1="52"
            y1="125"
            x2="45"
            y2="155"
            stroke="hsl(25 55% 55%)"
            strokeWidth="16"
            strokeLinecap="round"
            animate={isActive ? {
              x2: [38, 72, 38],
              y2: [152, 148, 152],
            } : { x2: 48, y2: 158 }}
            transition={{
              duration: animationDuration,
              repeat: isActive ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
          <motion.line
            x1="45"
            y1="155"
            x2="44"
            y2="178"
            stroke="hsl(25 55% 55%)"
            strokeWidth="13"
            strokeLinecap="round"
            animate={isActive ? {
              x1: [38, 72, 38],
              y1: [152, 148, 152],
              x2: [35, 88, 35],
              y2: [178, 172, 178],
            } : { x1: 48, y1: 158, x2: 47, y2: 180 }}
            transition={{
              duration: animationDuration,
              repeat: isActive ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
          <motion.ellipse
            cx="44"
            cy="182"
            rx="12"
            ry="6"
            fill="hsl(0 0% 18%)"
            animate={isActive ? {
              cx: [35, 88, 35],
              cy: [182, 176, 182],
            } : { cx: 47, cy: 184 }}
            transition={{
              duration: animationDuration,
              repeat: isActive ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
        </motion.g>
        
        {/* Right Leg */}
        <motion.g>
          <motion.line
            x1="68"
            y1="125"
            x2="75"
            y2="155"
            stroke="hsl(25 55% 55%)"
            strokeWidth="16"
            strokeLinecap="round"
            animate={isActive ? {
              x2: [82, 48, 82],
              y2: [152, 148, 152],
            } : { x2: 72, y2: 158 }}
            transition={{
              duration: animationDuration,
              repeat: isActive ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
          <motion.line
            x1="75"
            y1="155"
            x2="76"
            y2="178"
            stroke="hsl(25 55% 55%)"
            strokeWidth="13"
            strokeLinecap="round"
            animate={isActive ? {
              x1: [82, 48, 82],
              y1: [152, 148, 152],
              x2: [85, 32, 85],
              y2: [178, 172, 178],
            } : { x1: 72, y1: 158, x2: 73, y2: 180 }}
            transition={{
              duration: animationDuration,
              repeat: isActive ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
          <motion.ellipse
            cx="76"
            cy="182"
            rx="12"
            ry="6"
            fill="hsl(0 0% 18%)"
            animate={isActive ? {
              cx: [85, 32, 85],
              cy: [182, 176, 182],
            } : { cx: 73, cy: 184 }}
            transition={{
              duration: animationDuration,
              repeat: isActive ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
        </motion.g>
      </motion.svg>
    </div>
  );
};

export default JoggerAnimation;
