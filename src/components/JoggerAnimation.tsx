import { motion } from "framer-motion";

interface JoggerAnimationProps {
  speed: number; // 0-1 intensity
}

const JoggerAnimation = ({ speed }: JoggerAnimationProps) => {
  const animationDuration = Math.max(0.2, 0.6 - speed * 0.4);
  
  return (
    <div className="relative w-full h-40 flex items-end justify-center overflow-hidden">
      {/* Ground line */}
      <div className="absolute bottom-8 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      {/* Particle trail effect */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/40"
            style={{
              left: -20 - i * 15,
              bottom: Math.random() * 10,
            }}
            animate={{
              opacity: [0.6 - i * 0.1, 0],
              x: [-10, -30],
              y: [0, -5],
            }}
            transition={{
              duration: animationDuration * 2,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
      
      {/* Jogger SVG */}
      <motion.svg
        width="80"
        height="120"
        viewBox="0 0 80 120"
        className="relative z-10"
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: animationDuration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Head */}
        <motion.circle
          cx="40"
          cy="15"
          r="12"
          fill="hsl(var(--primary))"
          animate={{
            cy: [15, 13, 15],
          }}
          transition={{
            duration: animationDuration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Headphones */}
        <motion.path
          d="M28 12 Q28 4 40 4 Q52 4 52 12"
          stroke="hsl(var(--foreground))"
          strokeWidth="3"
          fill="none"
          animate={{
            d: [
              "M28 12 Q28 4 40 4 Q52 4 52 12",
              "M28 10 Q28 2 40 2 Q52 2 52 10",
              "M28 12 Q28 4 40 4 Q52 4 52 12",
            ],
          }}
          transition={{
            duration: animationDuration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <circle cx="28" cy="14" r="4" fill="hsl(var(--foreground))" />
        <circle cx="52" cy="14" r="4" fill="hsl(var(--foreground))" />
        
        {/* Body */}
        <motion.path
          d="M40 27 L40 60"
          stroke="hsl(var(--primary))"
          strokeWidth="6"
          strokeLinecap="round"
          animate={{
            d: [
              "M40 27 L40 60",
              "M40 25 L40 58",
              "M40 27 L40 60",
            ],
          }}
          transition={{
            duration: animationDuration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Left Arm */}
        <motion.path
          d="M40 35 L25 50 L20 40"
          stroke="hsl(var(--primary))"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          animate={{
            d: [
              "M40 35 L25 50 L20 40",
              "M40 33 L55 48 L60 38",
              "M40 35 L25 50 L20 40",
            ],
          }}
          transition={{
            duration: animationDuration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Right Arm */}
        <motion.path
          d="M40 35 L55 50 L60 40"
          stroke="hsl(var(--primary))"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          animate={{
            d: [
              "M40 35 L55 50 L60 40",
              "M40 33 L25 48 L20 38",
              "M40 35 L55 50 L60 40",
            ],
          }}
          transition={{
            duration: animationDuration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Left Leg */}
        <motion.path
          d="M40 60 L25 85 L15 110"
          stroke="hsl(var(--primary))"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          animate={{
            d: [
              "M40 60 L25 85 L15 110",
              "M40 58 L50 80 L65 100",
              "M40 60 L25 85 L15 110",
            ],
          }}
          transition={{
            duration: animationDuration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Right Leg */}
        <motion.path
          d="M40 60 L55 85 L65 110"
          stroke="hsl(var(--primary))"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          animate={{
            d: [
              "M40 60 L55 85 L65 110",
              "M40 58 L30 80 L15 100",
              "M40 60 L55 85 L65 110",
            ],
          }}
          transition={{
            duration: animationDuration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.svg>
      
      {/* Speed indicator text */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-muted-foreground font-medium"
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        {speed < 0.3 ? "Walking" : speed < 0.6 ? "Jogging" : speed < 0.85 ? "Running" : "Sprinting"}
      </motion.div>
    </div>
  );
};

export default JoggerAnimation;
