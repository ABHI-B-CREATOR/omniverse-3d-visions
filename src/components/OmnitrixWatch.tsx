import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ALIENS, type Alien } from "@/lib/aliens";

type Props = {
  onTransform?: (alien: Alien) => void;
};

type WatchPhase = "idle" | "selecting" | "locking" | "revealed";

const LOCK_DELAY_MS = 1250;
const DNA_LOCK_MS = 650;
const FLASH_START_MS = 900;
const FLASH_END_MS = 1250;
const REVEAL_MS = 1250;
const COMPLETE_MS = 2100;
const MEDIA_BASE = import.meta.env.BASE_URL;

function vibrate(pattern: VibratePattern) {
  if ("vibrate" in navigator) {
    navigator.vibrate(pattern);
  }
}

export function OmnitrixWatch({ onTransform }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const dialAudioRef = useRef<HTMLAudioElement | null>(null);
  const beepAudioRef = useRef<HTMLAudioElement | null>(null);
  const transformAudioRef = useRef<HTMLAudioElement | null>(null);
  const lockTimerRef = useRef<number | null>(null);
  const timelineTimersRef = useRef<number[]>([]);
  const [phase, setPhase] = useState<WatchPhase>("idle");
  const [flash, setFlash] = useState(false);
  const [dnaLocked, setDnaLocked] = useState(false);
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [lockedAlien, setLockedAlien] = useState<Alien | null>(null);
  const [revealed, setRevealed] = useState<Alien | null>(null);

  const active = phase === "locking" || phase === "revealed";
  const choosing = phase === "selecting";
  const candidate = ALIENS[candidateIndex];

  useEffect(() => {
    dialAudioRef.current = new Audio(`${MEDIA_BASE}media/dial-turning.mp3`);
    beepAudioRef.current = new Audio(`${MEDIA_BASE}media/omnitrix-beeps.mp3`);
    transformAudioRef.current = new Audio(`${MEDIA_BASE}media/omnitrix-transform.mp3`);

    if (dialAudioRef.current) {
      dialAudioRef.current.loop = true;
      dialAudioRef.current.volume = 0.55;
      dialAudioRef.current.preload = "auto";
    }
    if (beepAudioRef.current) {
      beepAudioRef.current.volume = 0.8;
      beepAudioRef.current.preload = "auto";
    }
    if (transformAudioRef.current) {
      transformAudioRef.current.volume = 0.9;
      transformAudioRef.current.preload = "auto";
    }

    return () => {
      clearLockTimer();
      clearTimelineTimers();
      stopDialLoop();
    };
  }, []);

  const clearLockTimer = () => {
    if (lockTimerRef.current) {
      window.clearTimeout(lockTimerRef.current);
      lockTimerRef.current = null;
    }
  };

  const clearTimelineTimers = () => {
    timelineTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    timelineTimersRef.current = [];
  };

  const playSound = (type: "beep" | "transform") => {
    const audio = type === "beep" ? beepAudioRef.current : transformAudioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  const startDialLoop = () => {
    const audio = dialAudioRef.current;
    if (!audio || !audio.paused) return;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  const stopDialLoop = () => {
    const audio = dialAudioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  };

  const queueTimeline = (alien: Alien) => {
    clearTimelineTimers();
    timelineTimersRef.current = [
      window.setTimeout(() => setDnaLocked(true), DNA_LOCK_MS),
      window.setTimeout(() => setFlash(true), FLASH_START_MS),
      window.setTimeout(() => {
        setFlash(false);
        setRevealed(alien);
      }, REVEAL_MS),
      window.setTimeout(() => setFlash(false), FLASH_END_MS),
      window.setTimeout(() => {
        setPhase("revealed");
        vibrate([30, 40, 80]);
        onTransform?.(alien);
      }, COMPLETE_MS),
    ];
  };

  const beginLock = (alien: Alien) => {
    clearLockTimer();
    setPhase("locking");
    setDnaLocked(false);
    setFlash(false);
    setLockedAlien(alien);
    setRevealed(null);
    stopDialLoop();
    playSound("transform");

    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      v.play().catch(() => {});
    }

    queueTimeline(alien);
  };

  const scheduleLock = (index: number) => {
    clearLockTimer();
    lockTimerRef.current = window.setTimeout(() => beginLock(ALIENS[index]), LOCK_DELAY_MS);
  };

  const activate = () => {
    if (phase === "locking") return;

    playSound("beep");
    vibrate(25);

    if (phase === "revealed") {
      reset();
      const nextIndex = (candidateIndex + 1) % ALIENS.length;
      setCandidateIndex(nextIndex);
      setPhase("selecting");
      startDialLoop();
      scheduleLock(nextIndex);
      return;
    }

    const nextIndex = phase === "selecting" ? (candidateIndex + 1) % ALIENS.length : candidateIndex;
    setCandidateIndex(nextIndex);
    setPhase("selecting");
    setLockedAlien(null);
    setRevealed(null);
    setDnaLocked(false);
    setFlash(false);
    startDialLoop();
    scheduleLock(nextIndex);
  };

  const reset = () => {
    clearLockTimer();
    clearTimelineTimers();
    setPhase("idle");
    setFlash(false);
    setDnaLocked(false);
    setLockedAlien(null);
    setRevealed(null);
    stopDialLoop();
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      {/* Revealed alien hologram ABOVE the watch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[340px] h-[340px] pointer-events-none z-20">
        <AnimatePresence mode="wait">
          {choosing && candidate && (
            <motion.div
              key={`candidate-${candidate.id}`}
              initial={{ opacity: 0, y: 22, scale: 0.72, filter: "blur(14px)" }}
              animate={{ opacity: 0.72, y: 0, scale: 0.9, filter: "blur(2px)" }}
              exit={{ opacity: 0, y: -18, scale: 0.8, filter: "blur(12px)" }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="relative w-full h-full"
            >
              <div
                className="absolute inset-0"
                style={{ background: `radial-gradient(circle at center, ${candidate.color}40, transparent 62%)` }}
              />
              <motion.img
                src={candidate.image}
                alt={candidate.name}
                animate={{ y: [0, -6, 0], opacity: [0.65, 0.9, 0.65] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full h-full object-contain"
                style={{ filter: `drop-shadow(0 0 18px ${candidate.color})` }}
              />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-center">
                <div className="font-mono text-[9px] tracking-[0.4em] text-primary/70 uppercase">
                  ◉ Cycling DNA
                </div>
                <div className="font-display font-black text-xl tracking-widest text-primary text-glow uppercase">
                  {candidate.name}
                </div>
              </div>
            </motion.div>
          )}

          {revealed && (
            <motion.div
              key={`revealed-${revealed.id}`}
              initial={{ opacity: 0, y: 30, scale: 0.6, filter: "blur(20px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative w-full h-full"
            >
              {/* Hologram beam */}
              <div
                className="absolute inset-0 mx-auto"
                style={{
                  background: `conic-gradient(from 90deg at 50% 100%, transparent 80deg, ${revealed.color}55 100deg, transparent 120deg)`,
                  filter: "blur(8px)",
                  opacity: 0.7,
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle at center, ${revealed.color}40, transparent 60%)`,
                }}
              />
              <motion.img
                src={revealed.image}
                alt={revealed.name}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full h-full object-contain drop-shadow-[0_0_30px_var(--omni)]"
                style={{ filter: `drop-shadow(0 0 20px ${revealed.color})` }}
              />
              {/* Scanlines on hologram */}
              <div
                className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-40"
                style={{
                  background:
                    "repeating-linear-gradient(0deg, transparent 0 2px, rgba(163,255,18,0.4) 2px 3px)",
                }}
              />
              {/* Label */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-center">
                <div className="font-mono text-[9px] tracking-[0.4em] text-primary/70 uppercase">
                  ◉ DNA Locked
                </div>
                <div className="font-display font-black text-xl tracking-widest text-primary text-glow uppercase">
                  {revealed.name}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Watch container */}
      <div className="relative mt-[280px]">
        {/* Outer glow ring */}
        <motion.div
          animate={active ? { scale: [1, 1.3, 1.1], opacity: [0.6, 1, 0.8] } : { scale: choosing ? 1.16 : 1, opacity: choosing ? 0.8 : 0.5 }}
          transition={{ duration: active ? 1.5 : 0.4, ease: "easeOut" }}
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle, var(--omni-glow), transparent 65%)",
            filter: "blur(30px)",
          }}
        />

        {/* Rotating HUD ring */}
        <motion.div
          animate={{ rotate: active ? 720 : choosing ? 180 : 360 }}
          transition={{ duration: active ? 2 : choosing ? 1.25 : 30, ease: active ? "easeOut" : "linear", repeat: active || choosing ? 0 : Infinity }}
          className="absolute -inset-6 rounded-full border border-primary/30"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, var(--omni) 40deg, transparent 80deg, transparent 180deg, var(--omni) 220deg, transparent 260deg)",
            mask: "radial-gradient(circle, transparent 60%, black 62%, black 70%, transparent 72%)",
            WebkitMask: "radial-gradient(circle, transparent 60%, black 62%, black 70%, transparent 72%)",
          }}
        />

        {/* Tick marks */}
        <div className="absolute -inset-2 rounded-full">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-0 w-px h-2 bg-primary/40 origin-bottom"
              style={{ transform: `translateX(-50%) rotate(${i * 15}deg) translateY(0)` }}
            />
          ))}
        </div>

        {/* Video lens */}
        <button
          onClick={activate}
          aria-label="Activate Omnitrix"
          className="relative block w-[340px] h-[340px] rounded-full overflow-hidden cursor-pointer group"
          style={{
            boxShadow:
              "0 0 0 4px #0a0e14, 0 0 0 8px var(--omni), 0 0 60px var(--omni-glow), inset 0 0 40px rgba(0,0,0,0.6)",
          }}
        >
          <video
            ref={videoRef}
            src={`${MEDIA_BASE}media/omnitrix.mp4`}
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover scale-110"
          />

          {/* Tint overlay */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-overlay"
            style={{ background: "radial-gradient(circle, transparent 30%, rgba(163,255,18,0.25) 100%)" }}
          />

          {/* Scanlines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent 0 3px, rgba(163,255,18,0.15) 3px 4px)",
            }}
          />

          {/* Crosshair */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/20" />
            <div className="absolute top-1/2 left-0 right-0 h-px bg-primary/20" />
            <motion.div
              animate={dnaLocked ? { scale: [1, 1.28, 1], opacity: [0.4, 1, 0.7] } : { scale: 1, opacity: 0.4 }}
              transition={{ duration: 0.38, ease: "easeOut" }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border border-primary/40"
            />
          </div>

          {/* Idle prompt */}
          <AnimatePresence>
            {!active && !choosing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] group-hover:bg-black/20 transition-colors"
              >
                <motion.div
                  animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center text-primary font-display font-black text-3xl mb-3 text-glow"
                >
                  Ω
                </motion.div>
                <div className="font-mono text-[10px] tracking-[0.5em] text-primary uppercase">
                  Tap to Activate
                </div>
                <div className="font-mono text-[8px] tracking-[0.4em] text-primary/50 uppercase mt-1">
                  Omnitrix v10.0
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cycling prompt */}
          <AnimatePresence>
            {choosing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/20"
              >
                <div className="font-mono text-[9px] tracking-[0.45em] text-primary/70 uppercase">
                  Tap to Cycle
                </div>
                <div className="mt-2 font-display font-black text-2xl tracking-[0.2em] text-primary text-glow uppercase">
                  {candidate.name}
                </div>
                <div className="mt-2 font-mono text-[8px] tracking-[0.35em] text-primary/50 uppercase">
                  Locking on pause
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Transformation flash */}
          <AnimatePresence>
            {flash && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.6, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0 bg-primary"
                style={{ mixBlendMode: "screen" }}
              />
            )}
          </AnimatePresence>
        </button>

        {/* Status readout */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
          <div className="font-mono text-[10px] tracking-[0.4em] uppercase">
            {phase === "selecting" && <span className="text-primary text-glow">◉ DNA Select: {candidate.name}</span>}
            {phase === "locking" && (
              <span className="text-primary text-glow">
                {dnaLocked ? `◉ DNA Lock: ${lockedAlien?.name}` : "◉ DNA Stream Active"}
              </span>
            )}
            {phase === "revealed" && <span className="text-primary text-glow">◉ Transform Complete</span>}
            {phase === "idle" && <span className="text-muted-foreground">○ Standby Mode</span>}
          </div>
          {phase !== "idle" && (
            <button
              onClick={reset}
              className="mt-2 font-mono text-[9px] tracking-[0.4em] text-primary/60 hover:text-primary uppercase underline-offset-4 hover:underline"
            >
              ↻ Reset Watch
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
