import { motion } from "framer-motion";

interface JoggerAnimationProps {
  speed: number; // 0-1 intensity
}

const JoggerAnimation = ({ speed }: JoggerAnimationProps) => {
  // Speed mapping: Higher speed = Lower duration
  // Range: 1.2s (slow jog) down to 0.5s (fast run)
  const animationDuration = Math.max(0.5, 1.2 - speed * 0.8);

  // Stride length multiplier
  const s = 1 + speed * 0.5;

  // Joint coordinates logic
  // Hip center approx: (80, 95)
  // We define the cycle points for the RIGHT side limbs. 
  // LEFT side will use the same points but shifted phase in the array.

  // LEG CYCLES (Rotary motion)
  // 1. Contact (Front land)
  const legContact = `M80 95 L${95 + 10 * s} 110 L${110 + 10 * s} 135`;
  // 2. Down (Support/Compress)
  const legDown = `M80 97 L${90} 120 L${85} 140`;
  // 3. Kick (Push back)
  const legKick = `M80 95 L${55 - 10 * s} 115 L${30 - 20 * s} 110`;
  // 4. Fold (Recover/Fold)
  const legFold = `M80 95 L${65} 110 L${55} 125`;
  // 5. Up (High Knee Drive)
  const legUp = `M80 95 L${100 + 10 * s} 90 L${95 + 10 * s} 115`;

  // Full Leg Cycle Loops
  const rightLegCycle = [legContact, legDown, legKick, legFold, legUp, legContact];
  const leftLegCycle = [legKick, legFold, legUp, legContact, legDown, legKick]; // Offset by ~50%

  // ARM CYCLES (Opposite to legs)
  // Shoulder center approx: (88, 55)
  // 1. Back (When leg is Forward)
  const armBack = `M88 55 L${65 - 10 * s} 65 L${50 - 15 * s} 55`;
  // 2. Mid Back
  const armMidBack = `M88 55 L${75} 70 L${65} 65`;
  // 3. Forward (When leg is Back)
  const armForward = `M88 55 L${105 + 10 * s} 60 L${120 + 15 * s} 45`;
  // 4. Mid Forward
  const armMidForward = `M88 55 L${95} 65 L${105} 55`;

  // Full Arm Cycle Loops
  // Right Arm (Opposite to Right Leg -> So matches Left Leg phase, i.e., starts Forward)
  const rightArmCycle = [armBack, armMidBack, armForward, armMidForward, armBack, armBack];
  // Note: Right arm should be BACK when Right leg is FORWARD.
  // Let's correct phases:
  // Right Leg starts at CONTACT (Forward). So Right Arm should be BACK.
  const rightArmSequence = [armBack, armMidBack, armForward, armMidForward, armBack];
  const leftArmSequence = [armForward, armMidForward, armBack, armMidBack, armForward];


  // Common style props
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
        viewBox="0 0 180 180" // Wider viewbox
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

        {/* Left Arm (Phase: Forward -> Back) */}
        <motion.path
          {...silhouetteProps}
          strokeWidth="14" // Slightly smaller for depth
          style={{ ...silhouetteProps.style, opacity: 0.85 }}
          animate={{ d: leftArmSequence }}
          transition={{
            duration: animationDuration,
            repeat: Infinity,
            ease: "linear", // Linear for continuous loop
            times: [0, 0.25, 0.5, 0.75, 1]
          }}
        />

        {/* Left Leg (Phase: Push -> Contact) */}
        <motion.path
          {...silhouetteProps}
          strokeWidth="15"
          style={{ ...silhouetteProps.style, opacity: 0.85 }}
          animate={{ d: leftLegCycle }}
          transition={{
            duration: animationDuration,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.2, 0.4, 0.6, 0.8, 1]
          }}
        />

        {/* --- BODY LAYER --- */}

        {/* Head */}
        <motion.path
          d="M85 45 L88 55" // Neck
          {...silhouetteProps}
          strokeWidth="16"
        />
        <motion.circle
          cx="86"
          cy="32"
          r="14"
          fill="url(#runnerGradient)"
          style={{ filter: "url(#glow)" }}
          animate={{
            y: [0, 1.5, 0, 1.5, 0], // Bobbing twice per cycle (left step, right step)
            x: [0, 0.5, 0, 0.5, 0]
          }}
          transition={{
            duration: animationDuration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Torso */}
        <motion.path
          d="M88 50 C 92 65, 82 85, 80 95" // Spine
          {...silhouetteProps}
          strokeWidth="20"
          animate={{
            // Subtle torsion/bounce
            d: [
              "M88 50 C 92 65, 82 85, 80 95",
              "M89 51 C 93 66, 83 86, 81 96",
              "M88 50 C 92 65, 82 85, 80 95",
              "M89 51 C 93 66, 83 86, 81 96",
              "M88 50 C 92 65, 82 85, 80 95"
            ]
          }}
          transition={{
            duration: animationDuration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* --- FRONT LAYER --- */}

        {/* Right Leg (Phase: Contact -> Push) */}
        <motion.path
          {...silhouetteProps}
          animate={{ d: rightLegCycle }}
          transition={{
            duration: animationDuration,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.2, 0.4, 0.6, 0.8, 1]
          }}
        />

        {/* Right Arm (Phase: Back -> Forward) */}
        <motion.path
          {...silhouetteProps}
          strokeWidth="14"
          animate={{ d: rightArmSequence }}
          transition={{
            duration: animationDuration,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.25, 0.5, 0.75, 1]
          }}
        />

      </motion.svg>

      {/* Shadow */}
      <motion.div
        className="absolute bottom-6 w-24 h-3 bg-black/40 rounded-full blur-md"
        animate={{
          scaleX: [0.95, 1.05, 0.95, 1.05, 0.95],
          opacity: [0.3, 0.4, 0.3, 0.4, 0.3],
        }}
        transition={{
          duration: animationDuration,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};

export default JoggerAnimation;
