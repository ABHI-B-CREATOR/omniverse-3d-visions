import chromastone from "@/assets/aliens/chromastone.png";
import waybig from "@/assets/aliens/swampfire.png";
import heatblast from "@/assets/aliens/heatblast.png";
import ghostfreak from "@/assets/aliens/ghostfreak.png";
import echoecho from "@/assets/aliens/echoecho.png";
import bigchill from "@/assets/aliens/bigchill.png";
import waterhazard from "@/assets/aliens/waterhazard.png";
import alienx from "@/assets/aliens/alienx.png";

export type Alien = {
  id: string;
  name: string;
  species: string;
  planet: string;
  image: string;
  color: string;
  tagline: string;
  description: string;
  abilities: string[];
  stats: { strength: number; speed: number; intelligence: number; power: number };
};

export const ALIENS: Alien[] = [
  {
    id: "chromastone",
    name: "Chromastone",
    species: "Crystalsapien",
    planet: "Petropia",
    image: chromastone,
    color: "#e91e63",
    tagline: "Living prism of cosmic energy",
    description: "A silicon-based life form capable of absorbing nearly any energy attack and redirecting it as devastating ultraviolet beams from his hands.",
    abilities: ["Energy Absorption", "UV Beam", "Crystal Skin", "Flight"],
    stats: { strength: 85, speed: 60, intelligence: 70, power: 95 },
  },
  {
    id: "waybig",
    name: "Way Big",
    species: "To'kustar",
    planet: "Cosmic Storms",
    image: waybig,
    color: "#dc2626",
    tagline: "Colossal cosmic titan",
    description: "A skyscraper-sized powerhouse who channels cosmic energy into devastating beams and can overpower enemies by sheer scale.",
    abilities: ["Cosmic Ray", "Titanic Strength", "Durability", "Enhanced Speed"],
    stats: { strength: 98, speed: 70, intelligence: 65, power: 94 },
  },
  {
    id: "heatblast",
    name: "Heatblast",
    species: "Pyronite",
    planet: "Pyros",
    image: heatblast,
    color: "#facc15",
    tagline: "Walking magmatic star",
    description: "A magma-based Pyronite who can generate and manipulate fire at the molecular level, riding flame discs through the sky.",
    abilities: ["Fire Generation", "Heat Resistance", "Flame Flight", "Combustion"],
    stats: { strength: 70, speed: 80, intelligence: 60, power: 88 },
  },
  {
    id: "ghostfreak",
    name: "Ghostfreak",
    species: "Ectonurite",
    planet: "Anur Phaetos",
    image: ghostfreak,
    color: "#94a3b8",
    tagline: "Whisper between dimensions",
    description: "An intangible Ectonurite who phases through solid matter, turns invisible, and possesses other beings with chilling ease.",
    abilities: ["Intangibility", "Invisibility", "Possession", "Telekinesis"],
    stats: { strength: 60, speed: 90, intelligence: 85, power: 80 },
  },
  {
    id: "echoecho",
    name: "Echo Echo",
    species: "Sonorosian",
    planet: "Sonorosia",
    image: echoecho,
    color: "#a3e635",
    tagline: "An army of one",
    description: "A living recording device that clones himself infinitely and unleashes sonic screams capable of shattering steel.",
    abilities: ["Self-Duplication", "Sonic Scream", "Sonic Flight", "Echo Replication"],
    stats: { strength: 50, speed: 85, intelligence: 75, power: 78 },
  },
  {
    id: "bigchill",
    name: "Big Chill",
    species: "Necrofriggian",
    planet: "Kylmyys",
    image: bigchill,
    color: "#3b82f6",
    tagline: "Silence of absolute zero",
    description: "A moth-like Necrofriggian who flies through walls, breathes sub-zero ice, and watches his prey from impossible angles.",
    abilities: ["Cryokinesis", "Intangibility", "Flight", "Invisibility"],
    stats: { strength: 65, speed: 88, intelligence: 80, power: 85 },
  },
  {
    id: "waterhazard",
    name: "Water Hazard",
    species: "Orishan",
    planet: "Andromeda",
    image: waterhazard,
    color: "#06b6d4",
    tagline: "Pressurized tidal force",
    description: "An Orishan whose armored exoskeleton fires high-pressure jets of water strong enough to cut through bedrock.",
    abilities: ["Hydrokinesis", "Pressure Blasts", "Armored Hide", "Aquatic Adaptation"],
    stats: { strength: 82, speed: 65, intelligence: 70, power: 80 },
  },
  {
    id: "alienx",
    name: "Alien X",
    species: "Celestialsapien",
    planet: "The Forge of Creation",
    image: alienx,
    color: "#1e1b4b",
    tagline: "Galaxy in a heartbeat",
    description: "A reality-warping Celestialsapien with the power to rewrite the laws of the universe — if only its three personalities can agree.",
    abilities: ["Omnipotence", "Reality Warping", "Time Manipulation", "Cosmic Awareness"],
    stats: { strength: 100, speed: 100, intelligence: 100, power: 100 },
  },
];
