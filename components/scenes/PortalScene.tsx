"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

const RING_LAYERS = 6;
const PARTICLE_COUNT = 2000;

function Portal() {
  const rings = useRef<THREE.Group>(null);
  const particles = useRef<THREE.Points>(null);

  const particlePositions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const r = 1.5 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      arr[i * 3] = Math.cos(theta) * r;
      arr[i * 3 + 1] = Math.sin(theta) * r;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return arr;
  }, []);

  useFrame(({ camera, clock }) => {
    const p = readProgressVar();
    const t = clock.elapsedTime;
    const warp = THREE.MathUtils.smoothstep(p, 0.3, 0.9);

    if (rings.current) {
      rings.current.children.forEach((child, i) => {
        const m = child as THREE.Mesh;
        const speed = 0.3 + i * 0.15;
        m.rotation.z = t * speed + i * 0.5;
        const scale = 1 + Math.sin(t * 2 + i) * 0.1;
        m.scale.setScalar(scale * (1 - warp * 0.3));
        m.position.z = -warp * i * 1.5;
      });
    }

    if (particles.current) {
      const arr = particles.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const baseZ = particlePositions[i * 3 + 2];
        arr[i * 3] = particlePositions[i * 3] * (1 - warp * 0.5);
        arr[i * 3 + 1] = particlePositions[i * 3 + 1] * (1 - warp * 0.5);
        arr[i * 3 + 2] = baseZ - warp * 8 + Math.sin(t * 2 + i * 0.01) * 0.2;
      }
      particles.current.geometry.attributes.position.needsUpdate = true;
    }

    camera.position.z = THREE.MathUtils.lerp(6, -2, warp);
    camera.lookAt(0, 0, -10);
  });

  const ringColors = ["#7c5cff", "#ff5ca0", "#5cffcc", "#ffcc5c", "#ff5c5c", "#5c8aff"];

  return (
    <group>
      <group ref={rings}>
        {Array.from({ length: RING_LAYERS }, (_, i) => (
          <mesh key={i}>
            <torusGeometry args={[1.5 + i * 0.3, 0.03, 8, 64]} />
            <meshBasicMaterial
              color={ringColors[i]}
              transparent
              opacity={0.7}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>
      <points ref={particles}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[new Float32Array(particlePositions), 3]} count={PARTICLE_COUNT} />
        </bufferGeometry>
        <pointsMaterial size={0.03} color="#c9b8ff" transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
    </group>
  );
}

export default function PortalScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6], fov: 55 }}>
      <color attach="background" args={["#04020c"]} />
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={3} color="#7c5cff" distance={8} />
      <Environment preset="night" />
      <Portal />
    </Canvas>
  );
}
