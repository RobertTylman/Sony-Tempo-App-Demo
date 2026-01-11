import { motion } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { useState } from "react";

interface MusicPlayerProps {
  bpm: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

// Spotify Logo SVG Component
const SpotifyLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
);

// Apple Music Logo SVG Component
const AppleMusicLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.401-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03c.525 0 1.048-.034 1.57-.1.823-.106 1.597-.35 2.296-.81.84-.553 1.472-1.287 1.88-2.208.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.042-1.785-.455-2.107-1.323-.238-.64-.158-1.27.238-1.828.327-.46.786-.71 1.327-.846.47-.118.95-.18 1.43-.264.313-.055.62-.13.904-.266.22-.105.348-.27.367-.517.003-.032.01-.064.01-.097V8.347c0-.117-.005-.236-.022-.352-.04-.282-.203-.44-.488-.462-.16-.013-.32-.02-.48.005-.614.095-1.228.2-1.84.3-1.22.203-2.438.412-3.658.614-.362.06-.51.224-.542.596-.01.12-.005.24-.005.36v7.563c0 .398-.048.79-.218 1.157-.29.626-.77 1.024-1.42 1.213-.326.095-.66.155-1.002.173-.94.05-1.803-.396-2.148-1.28-.247-.632-.174-1.26.204-1.82.313-.465.77-.72 1.304-.862.454-.12.92-.185 1.382-.266.32-.056.633-.129.922-.27.21-.1.33-.26.362-.488.01-.075.015-.15.015-.226v-9.2c0-.21.03-.418.092-.62.1-.323.31-.53.632-.603.22-.05.443-.083.666-.12l2.093-.346 2.17-.36c.55-.092 1.1-.186 1.65-.274.27-.044.543-.07.814.012.345.104.52.336.554.7.01.12.006.24.006.36v6.023z" />
  </svg>
);

const MusicPlayer = ({ bpm, isPlaying, onTogglePlay }: MusicPlayerProps) => {
  const [progress] = useState(35);
  const [activeSource, setActiveSource] = useState<'spotify' | 'apple'>('spotify');

  // Simulated track info based on BPM
  const getTrackInfo = () => {
    if (bpm < 100) return { title: "Slow Motion", artist: "Ambient Flow" };
    if (bpm < 130) return { title: "Steady Pace", artist: "Beat Runner" };
    if (bpm < 160) return { title: "Power Surge", artist: "High Energy" };
    return { title: "Maximum Velocity", artist: "Sprint Masters" };
  };

  const track = getTrackInfo();

  return (
    <div className="w-full bg-card rounded-2xl p-4 border border-border/50">
      {/* Music Source Selector */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <button
          onClick={() => setActiveSource('spotify')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${activeSource === 'spotify'
              ? 'bg-[#1DB954]/20 text-[#1DB954] border border-[#1DB954]/30'
              : 'bg-muted/50 text-muted-foreground hover:bg-muted'
            }`}
        >
          <SpotifyLogo className="w-4 h-4" />
          Spotify
        </button>
        <button
          onClick={() => setActiveSource('apple')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${activeSource === 'apple'
              ? 'bg-[#FC3C44]/20 text-[#FC3C44] border border-[#FC3C44]/30'
              : 'bg-muted/50 text-muted-foreground hover:bg-muted'
            }`}
        >
          <AppleMusicLogo className="w-4 h-4" />
          Apple Music
        </button>
      </div>

      {/* Track Info */}
      <div className="flex items-center gap-4 mb-4">
        <motion.div
          className={`w-14 h-14 rounded-xl flex items-center justify-center ${activeSource === 'spotify'
              ? 'bg-gradient-to-br from-[#1DB954] to-[#1ed760]'
              : 'bg-gradient-to-br from-[#FC3C44] to-[#ff6b6b]'
            }`}
          animate={isPlaying ? {
            scale: [1, 1.03, 1],
          } : {}}
          transition={{
            duration: 60 / bpm,
            repeat: Infinity,
          }}
        >
          {activeSource === 'spotify' ? (
            <SpotifyLogo className="w-7 h-7 text-white" />
          ) : (
            <AppleMusicLogo className="w-7 h-7 text-white" />
          )}
        </motion.div>

        <div className="flex-1 min-w-0">
          <motion.h3
            className="font-semibold text-foreground truncate text-sm"
            key={track.title}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {track.title}
          </motion.h3>
          <motion.p
            className="text-xs text-muted-foreground truncate"
            key={track.artist}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {track.artist}
          </motion.p>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
          <span className="text-sm font-bold text-primary tabular-nums">{bpm}</span>
          <span className="text-[10px] font-medium text-primary/70">BPM</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: activeSource === 'spotify'
                ? 'linear-gradient(90deg, #1DB954, #1ed760)'
                : 'linear-gradient(90deg, #FC3C44, #ff6b6b)',
              width: `${progress}%`,
            }}
            animate={isPlaying ? {
              opacity: [0.85, 1, 0.85],
            } : {}}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-[10px] text-muted-foreground tabular-nums">1:24</span>
          <span className="text-[10px] text-muted-foreground tabular-nums">4:02</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-8">
        <motion.button
          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          whileTap={{ scale: 0.9 }}
        >
          <SkipBack className="w-5 h-5" />
        </motion.button>

        <motion.button
          className={`w-14 h-14 rounded-full flex items-center justify-center ${activeSource === 'spotify'
              ? 'bg-gradient-to-br from-[#1DB954] to-[#1ed760]'
              : 'bg-gradient-to-br from-[#FC3C44] to-[#ff6b6b]'
            }`}
          whileTap={{ scale: 0.95 }}
          onClick={onTogglePlay}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-white" />
          ) : (
            <Play className="w-6 h-6 text-white ml-1" />
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
