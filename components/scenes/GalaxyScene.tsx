"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

/**
 * GalaxyScene
 * -----------
 * A spiral galaxy of 18,000 particles. Scroll tightens the spiral,
 * increases rotation speed, and warms up the color palette.
 */
function Galaxy({ count = 18000 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);
  const branches = 4;

  const { positions, colors, radii, angles, branchIndex } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const radii = new Float32Array(count);
    const angles = new Float32Array(count);
    const branchIndex = new Float32Array(count);

    const inside = new THREE.Color("#ff7c5c");
    const outside = new THREE.Color("#5c8aff");

    for (let i = 0; i < count; i++) {
      const r = Math.pow(Math.random(), 1.4) * 3.2;
      const b = i % branches;
      radii[i] = r;
      angles[i] = (b / branches) * Math.PI * 2;
      branchIndex[i] = b;

      const randomness = 0.35;
      const rx = (Math.random() - 0.5) * randomness * r;
      const ry = (Math.random() - 0.5) * randomness * r * 0.3;
      const rz = (Math.random() - 0.5) * randomness * r;

      positions[i * 3 + 0] = rx;
      positions[i * 3 + 1] = ry;
      positions[i * 3 + 2] = rz;

      const mix = r / 3.2;
      const col = inside.clone().lerp(outside, mix);
      colors[i * 3 + 0] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }
    return { positions, colors, radii, angles, branchIndex };
  }, [count]);

  useFrame((_s, delta) => {
    const p = readProgressVar();
    if (!points.current) return;
    const geom = points.current.geometry;
    const arr = geom.attributes.position.array as Float32Array;
    const rot =
      points.current.rotation.y + delta * THREE.MathUtils.lerp(0.05, 0.5, p);
    points.current.rotation.y = rot;

    const spin = THREE.MathUtils.lerp(0.2, 2.5, p);
    for (let i = 0; i < radii.length; i++) {
      const r = radii[i];
      const ang = angles[i] + r * spin;
      arr[i * 3 + 0] = Math.cos(ang) * r + Math.sin(i) * 0.08;
      arr[i * 3 + 2] = Math.sin(ang) * r + Math.cos(i) * 0.08;
    }
    geom.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.95}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function GalaxyScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 2.5, 5], fov: 55 }}>
      <color attach="background" args={["#03030a"]} />
      <Galaxy />
    </Canvas>
  );
}
