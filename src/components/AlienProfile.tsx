import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import type { Alien } from "@/lib/aliens";

export function AlienProfile({ alien, onClose }: { alien: Alien | null; onClose: () => void }) {
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (alien) {
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 700);
      return () => clearTimeout(t);
    }
  }, [alien]);

  return (
    <AnimatePresence>
      {alien && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/95 backdrop-blur-xl"
          onClick={onClose}
        >
          {/* Transformation flash */}
          {flash && (
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 30, opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="absolute w-32 h-32 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, #a3ff12, transparent 70%)" }}
            />
          )}

          <motion.div
            initial={{ scale: 0.8, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ delay: 0.3, type: "spring", damping: 22 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl glass-panel rounded-2xl overflow-hidden scanlines"
          >
            <div className="absolute inset-0 hex-grid opacity-30 pointer-events-none" />
            <div
              className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-30 pointer-events-none"
              style={{ background: alien.color }}
            />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full border border-primary/40 text-primary hover:bg-primary/10 font-mono"
              aria-label="Close"
            >
              ✕
            </button>

            <div className="grid md:grid-cols-2 gap-8 p-10">
              {/* Image */}
              <div className="relative flex items-center justify-center min-h-[400px]">
                <div
                  className="absolute inset-0 rounded-full blur-3xl opacity-50"
                  style={{ background: `radial-gradient(circle, ${alien.color}, transparent 60%)` }}
                />
                <div className="absolute inset-4 rounded-full border-2 border-dashed border-primary/30 animate-spin-slow" />
                <div className="absolute inset-12 rounded-full border border-primary/20" />
                <motion.img
                  initial={{ scale: 0.5, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  src={alien.image}
                  alt={alien.name}
                  className="relative max-h-[380px] w-auto object-contain drop-shadow-[0_0_60px_rgba(163,255,18,0.6)] animate-float"
                />
              </div>

              {/* Info */}
              <div className="space-y-6">
                <div>
                  <div className="font-mono text-xs tracking-[0.4em] text-primary/70 uppercase mb-2">
                    [ DNA SAMPLE / 010{alien.id.slice(0, 3)} ]
                  </div>
                  <h2 className="font-display font-black text-6xl text-glow tracking-tight text-primary leading-none">
                    {alien.name}
                  </h2>
                  <p className="mt-3 text-lg italic text-muted-foreground">"{alien.tagline}"</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="Species" value={alien.species} />
                  <Field label="Home Planet" value={alien.planet} />
                </div>

                <p className="text-foreground/80 leading-relaxed text-sm">{alien.description}</p>

                {/* Stats */}
                <div className="space-y-3">
                  {Object.entries(alien.stats).map(([k, v], i) => (
                    <motion.div
                      key={k}
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "100%", opacity: 1 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                    >
                      <div className="flex justify-between font-mono text-[10px] tracking-[0.3em] uppercase mb-1 text-muted-foreground">
                        <span>{k}</span>
                        <span className="text-primary">{v}%</span>
                      </div>
                      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${v}%` }}
                          transition={{ delay: 0.8 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                          className="h-full rounded-full"
                          style={{ background: `linear-gradient(90deg, ${alien.color}, #a3ff12)`, boxShadow: `0 0 12px ${alien.color}` }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Abilities */}
                <div>
                  <div className="font-mono text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3">
                    Abilities
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {alien.abilities.map((a) => (
                      <span
                        key={a}
                        className="px-3 py-1.5 border border-primary/40 text-xs font-mono tracking-wider uppercase text-primary bg-primary/5 hover:bg-primary/15 transition-colors clip-hex"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l-2 border-primary/50 pl-3">
      <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground">{label}</div>
      <div className="font-display text-sm text-foreground mt-0.5">{value}</div>
    </div>
  );
}
