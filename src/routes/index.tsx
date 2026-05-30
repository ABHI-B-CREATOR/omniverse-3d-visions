import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { OmnitrixWatch } from "@/components/OmnitrixWatch";
import { AlienWheel } from "@/components/AlienWheel";
import { AlienProfile } from "@/components/AlienProfile";
import { ALIENS, type Alien } from "@/lib/aliens";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Omnitrix Codex — 3D Ben 10 Alien Database" },
      { name: "description", content: "Explore Ben 10's alien arsenal in an immersive 3D holographic Omnitrix interface." },
      { property: "og:title", content: "Omnitrix Codex" },
      { property: "og:description", content: "Interactive 3D Ben 10 alien database with holographic UI." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;800;900&family=JetBrains+Mono:wght@400;600&display=swap" },
    ],
  }),
  component: Index,
});

function Index() {
  const [selected, setSelected] = useState<Alien | null>(null);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Ambient backdrops */}
      <div className="fixed inset-0 hex-grid opacity-20 pointer-events-none" />
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[140px]" />
        <div className="absolute bottom-1/4 -right-40 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[160px]" />
      </div>
      {/* Scan beam */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-b from-primary/40 to-transparent animate-scan pointer-events-none z-30" />

      {/* NAV */}
      <header className="relative z-20 flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary flex items-center justify-center text-primary font-black animate-pulse-glow">
            Ω
          </div>
          <div>
            <div className="font-display font-black text-sm tracking-[0.3em] text-primary">OMNITRIX</div>
            <div className="font-mono text-[9px] tracking-[0.4em] text-muted-foreground">CODEX v10.0</div>
          </div>
        </div>
        <nav className="hidden md:flex gap-8 font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
          <a href="#hero" className="hover:text-primary transition-colors">Core</a>
          <a href="#vault" className="hover:text-primary transition-colors">Alien Vault</a>
          <a href="#lore" className="hover:text-primary transition-colors">Lore</a>
          <a href="#transmission" className="hover:text-primary transition-colors">Transmission</a>
        </nav>
        <div className="font-mono text-[10px] tracking-widest text-primary/70 hidden md:block">
          ◉ SIGNAL LOCKED
        </div>
      </header>

      {/* HERO */}
      <section id="hero" className="relative grid lg:grid-cols-2 gap-8 items-center min-h-[80vh] px-8 lg:px-16">
        <div className="relative z-10 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="font-mono text-[10px] tracking-[0.5em] text-primary uppercase border-l-2 border-primary pl-3"
          >
            [ Galvan Prime / Watchdog Protocol Active ]
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-display font-black text-7xl lg:text-8xl leading-[0.9] tracking-tighter"
          >
            <span className="text-glow text-primary">10</span>
            <span className="block text-foreground">ALIEN</span>
            <span className="block text-glitch text-foreground" data-text="GENOMES">GENOMES</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-muted-foreground max-w-md leading-relaxed"
          >
            A holographic interface to the universe's most powerful watch.
            Spin the Omnitrix, scan the DNA library, transform into legends.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex gap-4"
          >
            <a
              href="#vault"
              className="group relative px-8 py-4 bg-primary text-primary-foreground font-display font-bold tracking-widest text-sm uppercase clip-hex hover:bg-primary/90 transition-colors"
            >
              Activate Codex
            </a>
            <a
              href="#lore"
              className="px-8 py-4 border border-primary/40 text-primary font-mono text-xs tracking-[0.3em] uppercase hover:bg-primary/10 transition-colors"
            >
              Read Files
            </a>
          </motion.div>

          {/* Telemetry */}
          <div className="grid grid-cols-3 gap-4 pt-8 max-w-md">
            {[
              ["09", "Aliens"],
              ["10K+", "DNA Strands"],
              ["∞", "Combinations"],
            ].map(([n, l]) => (
              <div key={l} className="glass-panel p-3 rounded">
                <div className="font-display font-black text-2xl text-primary text-glow">{n}</div>
                <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Omnitrix Watch */}
        <div className="relative h-[760px] w-full">
          <OmnitrixWatch onTransform={setSelected} />
        </div>
      </section>

      {/* ALIEN VAULT */}
      <section id="vault" className="relative py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="font-mono text-[10px] tracking-[0.5em] text-primary uppercase mb-3">
              ━━━ DNA Vault Access ━━━
            </div>
            <h2 className="font-display font-black text-5xl lg:text-7xl tracking-tighter">
              <span className="text-foreground">CHOOSE YOUR </span>
              <span className="text-primary text-glow">FORM</span>
            </h2>
            <p className="mt-4 text-muted-foreground font-mono text-xs tracking-widest uppercase">
              Drag • Rotate • Transform
            </p>
          </div>

          <AlienWheel onSelect={setSelected} />
        </div>
      </section>

      {/* LORE STRIP */}
      <section id="lore" className="relative py-24 px-8 border-y border-border">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { code: "01", title: "The Watch", text: "Forged by Azmuth on Galvan Prime, the Omnitrix stores DNA from a million species across the cosmos." },
            { code: "02", title: "The Wielder", text: "Ben Tennyson — a kid who found a watch and became Earth's most unpredictable line of defense." },
            { code: "03", title: "The Multiverse", text: "Every transformation rewrites who you are. Every alien is a new perspective on power." },
          ].map((b) => (
            <motion.div
              key={b.code}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-6 rounded-lg group hover:border-primary/60 transition-colors"
            >
              <div className="font-mono text-xs tracking-[0.4em] text-primary mb-4">// FILE {b.code}</div>
              <h3 className="font-display font-bold text-2xl mb-3 group-hover:text-primary transition-colors">{b.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{b.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ALIEN ROSTER STRIP */}
      <section className="relative py-16 overflow-hidden border-b border-border">
        <div className="font-mono text-[10px] tracking-[0.5em] uppercase text-center text-muted-foreground mb-8">
          ━━━ Active DNA Signatures ━━━
        </div>
        <div className="flex gap-12 animate-[spin-slow_60s_linear_infinite] [animation-name:none] overflow-x-auto px-8 scrollbar-hide">
          {[...ALIENS, ...ALIENS].map((a, i) => (
            <button
              key={i}
              onClick={() => setSelected(a)}
              className="shrink-0 flex flex-col items-center gap-2 group"
            >
              <div className="relative w-24 h-24 rounded-full glass-panel flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform">
                <div
                  className="absolute inset-0 opacity-30 group-hover:opacity-60 transition-opacity"
                  style={{ background: `radial-gradient(circle, ${a.color}, transparent 70%)` }}
                />
                <img src={a.image} alt={a.name} className="relative h-20 w-auto object-contain" />
              </div>
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground group-hover:text-primary">
                {a.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* TRANSMISSION CTA */}
      <section id="transmission" className="relative py-32 px-8">
        <div className="max-w-3xl mx-auto text-center relative">
          <div className="absolute inset-0 -z-10 blur-3xl opacity-30 bg-primary rounded-full" />
          <div className="font-mono text-[10px] tracking-[0.5em] text-primary uppercase mb-4">
            ◉ Incoming Transmission
          </div>
          <h2 className="font-display font-black text-5xl lg:text-6xl tracking-tighter mb-6">
            <span className="text-glitch text-foreground" data-text="IT'S HERO TIME.">IT'S HERO TIME.</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-10">
            The Omnitrix has chosen its bearer. The galaxy is watching. Will you answer the call?
          </p>
          <button
            onClick={() => setSelected(ALIENS[7])}
            className="group relative px-10 py-5 bg-primary text-primary-foreground font-display font-black tracking-[0.3em] text-sm uppercase clip-hex hover:scale-105 transition-transform animate-pulse-glow"
          >
            Transform Now
          </button>
        </div>
      </section>

      <footer className="border-t border-border py-8 px-8 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
        <div>◉ Omnitrix Codex / Fan Project</div>
        <div>Built in the spirit of Ben Tennyson</div>
        <div className="text-primary">SIGNAL ◉ STABLE</div>
      </footer>

      <AlienProfile alien={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
