import { motion } from "framer-motion";

interface JoggerAnimationProps {
  speed: number; // 0-1 intensity
}

const JoggerAnimation = ({ speed }: JoggerAnimationProps) => {
  const animationDuration = Math.max(0.35, 0.9 - speed * 0.55);
  const isActive = speed > 0.15;
  
  return (
    <div className="relative w-full h-52 flex items-center justify-center overflow-hidden">
      {/* Side Profile Runner SVG */}
      <motion.svg
        width="140"
        height="190"
        viewBox="0 0 140 190"
        className="relative z-10"
      >
        {/* Hair - Side profile */}
        <ellipse
          cx="55"
          cy="28"
          rx="18"
          ry="18"
          fill="hsl(0 0% 50%)"
        />
        
        {/* Ponytail flowing behind */}
        <motion.path
          d="M40 25 C20 22 10 35 15 50"
          stroke="hsl(0 0% 50%)"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
          animate={isActive ? {
            d: [
              "M40 25 C20 22 10 35 15 50",
              "M40 25 C15 18 2 28 8 45",
              "M40 25 C20 22 10 35 15 50",
            ],
          } : {}}
          transition={{
            duration: animationDuration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Head/Face - Side profile */}
        <ellipse
          cx="58"
          cy="35"
          rx="12"
          ry="16"
          fill="hsl(25 55% 55%)"
        />
        
        {/* Nose */}
        <ellipse
          cx="70"
          cy="36"
          rx="3"
          ry="2"
          fill="hsl(25 50% 50%)"
        />
        
        {/* Ear */}
        <ellipse cx="48" cy="35" rx="3" fill="hsl(25 45% 50%)" ry="4" />
        
        {/* Earbud in ear */}
        <circle cx="48" cy="35" r="3.5" fill="hsl(0 0% 90%)" />
        <circle cx="48" cy="35" r="1.5" fill="hsl(0 0% 75%)" />
        
        {/* Neck - angled forward for running posture */}
        <motion.rect 
          x="54" 
          y="49" 
          width="10" 
          height="12" 
          rx="2" 
          fill="hsl(25 55% 55%)"
          style={{ transform: 'rotate(-10deg)', transformOrigin: '60px 55px' }}
        />
        
        {/* Torso - White shirt, leaning forward */}
        <motion.path
          d="M45 58 L75 56 L80 105 L40 107 Z"
          fill="hsl(0 0% 90%)"
          animate={isActive ? {
            d: [
              "M45 58 L75 56 L80 105 L40 107 Z",
              "M43 56 L77 54 L82 103 L38 105 Z",
              "M45 58 L75 56 L80 105 L40 107 Z",
            ],
          } : {}}
          transition={{
            duration: animationDuration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Back Arm (behind body) */}
        <motion.g>
          <motion.line
            x1="48"
            y1="62"
            x2="72"
            y2="85"
            stroke="hsl(25 55% 55%)"
            strokeWidth="11"
            strokeLinecap="round"
            animate={isActive ? {
              x2: [72, 30, 72],
              y2: [85, 78, 85],
            } : { x2: 55, y2: 90 }}
            transition={{
              duration: animationDuration,
              repeat: isActive ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
          <motion.line
            x1="72"
            y1="85"
            x2="65"
            y2="70"
            stroke="hsl(25 55% 55%)"
            strokeWidth="9"
            strokeLinecap="round"
            animate={isActive ? {
              x1: [72, 30, 72],
              y1: [85, 78, 85],
              x2: [65, 48, 65],
              y2: [70, 62, 70],
            } : { x1: 55, y1: 90, x2: 50, y2: 100 }}
            transition={{
              duration: animationDuration,
              repeat: isActive ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
        </motion.g>
        
        {/* Front Arm */}
        <motion.g>
          <motion.line
            x1="55"
            y1="62"
            x2="30"
            y2="78"
            stroke="hsl(25 55% 55%)"
            strokeWidth="12"
            strokeLinecap="round"
            animate={isActive ? {
              x2: [30, 85, 30],
              y2: [78, 82, 78],
            } : { x2: 45, y2: 85 }}
            transition={{
              duration: animationDuration,
              repeat: isActive ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
          <motion.line
            x1="30"
            y1="78"
            x2="45"
            y2="60"
            stroke="hsl(25 55% 55%)"
            strokeWidth="10"
            strokeLinecap="round"
            animate={isActive ? {
              x1: [30, 85, 30],
              y1: [78, 82, 78],
              x2: [45, 72, 45],
              y2: [60, 65, 60],
            } : { x1: 45, y1: 85, x2: 38, y2: 95 }}
            transition={{
              duration: animationDuration,
              repeat: isActive ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
        </motion.g>
        
        {/* Shorts - Dark */}
        <motion.path
          d="M42 102 L78 100 L82 128 L65 130 L60 120 L55 130 L38 128 Z"
          fill="hsl(0 0% 22%)"
          animate={isActive ? {
            d: [
              "M42 102 L78 100 L82 128 L65 130 L60 120 L55 130 L38 128 Z",
              "M40 100 L80 98 L84 126 L67 128 L60 118 L53 128 L36 126 Z",
              "M42 102 L78 100 L82 128 L65 130 L60 120 L55 130 L38 128 Z",
            ],
          } : {}}
          transition={{
            duration: animationDuration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Back Leg */}
        <motion.g>
          <motion.line
            x1="55"
            y1="125"
            x2="25"
            y2="150"
            stroke="hsl(25 55% 55%)"
            strokeWidth="15"
            strokeLinecap="round"
            animate={isActive ? {
              x2: [25, 90, 25],
              y2: [150, 145, 150],
            } : { x2: 45, y2: 158 }}
            transition={{
              duration: animationDuration,
              repeat: isActive ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
          <motion.line
            x1="25"
            y1="150"
            x2="35"
            y2="178"
            stroke="hsl(25 55% 55%)"
            strokeWidth="12"
            strokeLinecap="round"
            animate={isActive ? {
              x1: [25, 90, 25],
              y1: [150, 145, 150],
              x2: [35, 75, 35],
              y2: [178, 175, 178],
            } : { x1: 45, y1: 158, x2: 42, y2: 180 }}
            transition={{
              duration: animationDuration,
              repeat: isActive ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
          <motion.ellipse
            cx="38"
            cy="181"
            rx="14"
            ry="5"
            fill="hsl(0 0% 18%)"
            animate={isActive ? {
              cx: [38, 78, 38],
              cy: [181, 178, 181],
            } : { cx: 42, cy: 183 }}
            transition={{
              duration: animationDuration,
              repeat: isActive ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
        </motion.g>
        
        {/* Front Leg */}
        <motion.g>
          <motion.line
            x1="65"
            y1="125"
            x2="95"
            y2="148"
            stroke="hsl(25 55% 55%)"
            strokeWidth="16"
            strokeLinecap="round"
            animate={isActive ? {
              x2: [95, 30, 95],
              y2: [148, 152, 148],
            } : { x2: 72, y2: 158 }}
            transition={{
              duration: animationDuration,
              repeat: isActive ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
          <motion.line
            x1="95"
            y1="148"
            x2="110"
            y2="176"
            stroke="hsl(25 55% 55%)"
            strokeWidth="13"
            strokeLinecap="round"
            animate={isActive ? {
              x1: [95, 30, 95],
              y1: [148, 152, 148],
              x2: [110, 22, 110],
              y2: [176, 178, 176],
            } : { x1: 72, y1: 158, x2: 74, y2: 180 }}
            transition={{
              duration: animationDuration,
              repeat: isActive ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
          <motion.ellipse
            cx="113"
            cy="180"
            rx="14"
            ry="5"
            fill="hsl(0 0% 18%)"
            animate={isActive ? {
              cx: [113, 22, 113],
              cy: [180, 181, 180],
            } : { cx: 74, cy: 183 }}
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
