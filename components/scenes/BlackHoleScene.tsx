"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

/**
 * BlackHoleScene
 * --------------
 * An accretion disk swirls around a dark sphere while infalling particles
 * spiral inward. Scroll increases infall speed and tightens the spiral.
 */
function AccretionDisk() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_s, delta) => {
    const p = readProgressVar();
    if (ref.current)
      ref.current.rotation.z += delta * THREE.MathUtils.lerp(0.3, 1.4, p);
  });
  return (
    <mesh ref={ref} rotation-x={-Math.PI / 2.2}>
      <ringGeometry args={[1.2, 3.2, 128, 1]} />
      <meshBasicMaterial
        color="#ff7c3c"
        side={THREE.DoubleSide}
        transparent
        opacity={0.55}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

function InfallingParticles({ count = 3500 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);

  const { positions, radii, angles, lifes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const radii = new Float32Array(count);
    const angles = new Float32Array(count);
    const lifes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      radii[i] = 1.5 + Math.random() * 4;
      angles[i] = Math.random() * Math.PI * 2;
      lifes[i] = Math.random();
    }
    return { positions, radii, angles, lifes };
  }, [count]);

  useFrame((_s, delta) => {
    const p = readProgressVar();
    const pull = THREE.MathUtils.lerp(0.05, 0.35, p);
    if (!points.current) return;
    const geom = points.current.geometry;
    const arr = geom.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      radii[i] -= pull * delta * (1 + lifes[i]);
      angles[i] += delta * (2 + 4 / Math.max(radii[i], 0.4));
      if (radii[i] < 0.6) {
        radii[i] = 4 + Math.random() * 1.5;
        angles[i] = Math.random() * Math.PI * 2;
      }
      const r = radii[i];
      arr[i * 3 + 0] = Math.cos(angles[i]) * r;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 0.05 * (r - 0.6);
      arr[i * 3 + 2] = Math.sin(angles[i]) * r;
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
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#ffd48a"
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function BlackHoleScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 1.8, 6.5], fov: 45 }}>
      <color attach="background" args={["#010106"]} />
      <CameraRig />
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={4} color="#ff9c5c" distance={6} />
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <AccretionDisk />
      <InfallingParticles />
    </Canvas>
  );
}

function CameraRig() {
  useFrame(({ camera }) => {
    const p = readProgressVar();
    const el = THREE.MathUtils.lerp(1.8, 0.3, p);
    const z = THREE.MathUtils.lerp(6.5, 3.4, p);
    camera.position.y = el;
    camera.position.z = z;
    camera.lookAt(0, 0, 0);
  });
  return null;
}
