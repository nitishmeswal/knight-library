"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * ParticleExplosionSection
 * ------------------------
 * Three.js particle field that begins exploded and reforms into a sphere
 * as the page scroll progresses (reads --scroll-progress from <html>).
 *
 * Drop it anywhere in the page — it's a self-contained R3F canvas.
 */
function Particles({ count = 4000 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);

  const { exploded, target } = useMemo(() => {
    const exploded = new Float32Array(count * 3);
    const target = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Exploded: random in big cube
      exploded[i * 3 + 0] = (Math.random() - 0.5) * 12;
      exploded[i * 3 + 1] = (Math.random() - 0.5) * 12;
      exploded[i * 3 + 2] = (Math.random() - 0.5) * 12;
      // Target: on a sphere
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      const r = 1.8;
      target[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      target[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      target[i * 3 + 2] = r * Math.cos(phi);
    }
    return { exploded, target };
  }, [count]);

  const positions = useMemo(() => new Float32Array(exploded), [exploded]);

  useFrame((_state, delta) => {
    const root = document.documentElement;
    const raw = root.style.getPropertyValue("--section-progress") || "0";
    const p = Math.max(0, Math.min(1, parseFloat(raw) || 0));
    const geom = points.current?.geometry;
    if (!geom) return;
    const arr = geom.attributes.position.array as Float32Array;
    for (let i = 0; i < arr.length; i++) {
      arr[i] = THREE.MathUtils.lerp(exploded[i], target[i], p);
    }
    geom.attributes.position.needsUpdate = true;
    if (points.current) points.current.rotation.y += delta * 0.1;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#7c5cff"
        sizeAttenuation
        transparent
        opacity={0.9}
      />
    </points>
  );
}

export default function ParticleExplosionSection() {
  const ref = useRef<HTMLElement>(null);

  // Write local section progress into a CSS var
  useMemo(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const elapsed = vh - rect.top;
      const p = Math.max(0, Math.min(1, elapsed / total));
      document.documentElement.style.setProperty(
        "--section-progress",
        p.toFixed(4)
      );
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={ref}
      className="relative h-[200vh]"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
            <ambientLight intensity={0.7} />
            <Particles />
          </Canvas>
        </div>
        <div className="relative z-10 text-center max-w-2xl px-6 pointer-events-none">
          <p className="eyebrow mb-4">Particles</p>
          <h2 className="headline">Explode. Reform.</h2>
          <p className="mt-6 text-ink/70 text-lg">
            Scroll to watch 4,000 particles collapse from chaos into a sphere.
          </p>
        </div>
      </div>
    </section>
  );
}
