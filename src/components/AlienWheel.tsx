import { motion } from "framer-motion";
import { useState } from "react";
import { ALIENS, type Alien } from "@/lib/aliens";

export function AlienWheel({ onSelect }: { onSelect: (a: Alien) => void }) {
  const [angle, setAngle] = useState(0);
  const [hover, setHover] = useState<string | null>(null);
  const radius = 320;

  const rotate = (dir: 1 | -1) => setAngle((a) => a + dir * (360 / ALIENS.length));

  return (
    <div className="relative w-full h-[720px] flex items-center justify-center select-none overflow-hidden">
      {/* Floor ring */}
      <div className="absolute bottom-32 w-[800px] h-[200px] rounded-[50%] border border-primary/40 [transform:rotateX(75deg)] animate-pulse-glow" />
      <div className="absolute bottom-32 w-[600px] h-[140px] rounded-[50%] border border-primary/20 [transform:rotateX(75deg)]" />

      <div
        className="relative w-[640px] h-[640px]"
        style={{ perspective: "1400px" }}
      >
        <motion.div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: angle }}
          transition={{ type: "spring", stiffness: 60, damping: 18 }}
        >
          {ALIENS.map((alien, i) => {
            const theta = (i / ALIENS.length) * 360;
            const isHover = hover === alien.id;
            return (
              <button
                key={alien.id}
                onMouseEnter={() => setHover(alien.id)}
                onMouseLeave={() => setHover(null)}
                onClick={() => onSelect(alien)}
                className="absolute top-1/2 left-1/2 w-[220px] h-[320px] -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                style={{
                  transform: `rotateY(${theta}deg) translateZ(${radius}px)`,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* counter-rotate the contents so they face out */}
                <div
                  className="w-full h-full relative flex flex-col items-center justify-end transition-all duration-500"
                  style={{ transform: `rotateY(${-theta - angle}deg) scale(${isHover ? 1.15 : 1})` }}
                >
                  {/* Glow disc */}
                  <div
                    className="absolute bottom-2 w-44 h-12 rounded-[50%] blur-2xl opacity-60 transition-opacity group-hover:opacity-100"
                    style={{ background: alien.color }}
                  />
                  {/* Rim light */}
                  <div
                    className="absolute inset-0 rounded-3xl blur-3xl opacity-0 group-hover:opacity-70 transition-opacity"
                    style={{ background: `radial-gradient(circle at center, ${alien.color}, transparent 65%)` }}
                  />
                  <img
                    src={alien.image}
                    alt={alien.name}
                    className="relative h-[290px] w-auto object-contain drop-shadow-[0_0_30px_rgba(163,255,18,0.4)] animate-float"
                    style={{ animationDelay: `${i * 0.4}s`, filter: isHover ? `drop-shadow(0 0 40px ${alien.color})` : undefined }}
                  />
                  <div className="absolute bottom-0 text-center w-full">
                    <div className="font-display font-black tracking-[0.25em] text-xs text-primary text-glow uppercase">
                      {alien.name}
                    </div>
                    <div className="text-[10px] text-muted-foreground tracking-widest uppercase mt-1">
                      {alien.species}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </motion.div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 items-center z-10">
        <button
          onClick={() => rotate(-1)}
          className="glass-panel px-6 py-3 font-mono text-xs tracking-[0.3em] uppercase text-primary hover:bg-primary/10 transition-colors"
        >
          ◄ PREV
        </button>
        <div className="font-mono text-[10px] tracking-[0.4em] text-muted-foreground uppercase">
          ROTATE OMNITRIX
        </div>
        <button
          onClick={() => rotate(1)}
          className="glass-panel px-6 py-3 font-mono text-xs tracking-[0.3em] uppercase text-primary hover:bg-primary/10 transition-colors"
        >
          NEXT ►
        </button>
      </div>
    </div>
  );
}
