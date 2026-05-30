import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, Suspense } from "react";
import * as THREE from "three";

function Hourglass() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.4;
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.6) * 0.08;
  });

  // Hourglass shape via two cones
  return (
    <group ref={ref}>
      {/* Outer torus ring (Omnitrix bezel) */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.25, 32, 96]} />
        <meshStandardMaterial color="#0a0e14" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <torusGeometry args={[1.9, 0.08, 32, 96]} />
        <meshStandardMaterial color="#a3ff12" emissive="#a3ff12" emissiveIntensity={1.5} />
      </mesh>

      {/* Inner black dial */}
      <mesh>
        <cylinderGeometry args={[1.75, 1.75, 0.4, 64]} />
        <meshStandardMaterial color="#0d1117" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Green hourglass — two cones tip-to-tip */}
      <mesh position={[0, 0.25, 0]} rotation={[0, 0, 0]}>
        <coneGeometry args={[0.85, 0.9, 4, 1]} />
        <meshStandardMaterial color="#a3ff12" emissive="#a3ff12" emissiveIntensity={2} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0.25, 0]} rotation={[Math.PI, 0, Math.PI / 4]}>
        <coneGeometry args={[0.85, 0.9, 4, 1]} />
        <meshStandardMaterial color="#a3ff12" emissive="#a3ff12" emissiveIntensity={2} toneMapped={false} />
      </mesh>

      {/* Side prongs */}
      {[0, Math.PI / 2, Math.PI, -Math.PI / 2].map((a, i) => (
        <mesh key={i} position={[Math.cos(a) * 2.4, 0, Math.sin(a) * 2.4]} rotation={[0, -a, 0]}>
          <boxGeometry args={[0.5, 0.6, 1.1]} />
          <meshStandardMaterial color="#e5e7eb" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function FloatingParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 200;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.05;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#a3ff12" transparent opacity={0.7} />
    </points>
  );
}

export function OmnitrixCore() {
  return (
    <Canvas camera={{ position: [0, 1.5, 6], fov: 50 }} dpr={[1, 2]}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={2} color="#a3ff12" />
        <pointLight position={[-5, -3, -5]} intensity={1.5} color="#3b82f6" />
        <Hourglass />
        <FloatingParticles />
      </Suspense>
    </Canvas>
  );
}
