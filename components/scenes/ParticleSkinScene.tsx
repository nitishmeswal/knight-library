"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

const PARTICLE_COUNT = 5000;

function ParticleObject() {
  const points = useRef<THREE.Points>(null);
  const group = useRef<THREE.Group>(null);

  const { surfacePositions, explodedPositions, colors } = useMemo(() => {
    const surfacePositions = new Float32Array(PARTICLE_COUNT * 3);
    const explodedPositions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const col = new THREE.Color();

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 1.3 + (Math.random() - 0.5) * 0.05;
      surfacePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      surfacePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      surfacePositions[i * 3 + 2] = r * Math.cos(phi);

      const er = r + 0.5 + Math.random() * 2;
      explodedPositions[i * 3] = er * Math.sin(phi) * Math.cos(theta) + (Math.random() - 0.5) * 0.5;
      explodedPositions[i * 3 + 1] = er * Math.sin(phi) * Math.sin(theta) + (Math.random() - 0.5) * 0.5;
      explodedPositions[i * 3 + 2] = er * Math.cos(phi) + (Math.random() - 0.5) * 0.5;

      col.setHSL(0.6 + Math.random() * 0.2, 0.7, 0.5 + Math.random() * 0.3);
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }
    return { surfacePositions, explodedPositions, colors };
  }, []);

  useFrame(({ camera, clock }, delta) => {
    const p = readProgressVar();
    if (!points.current) return;
    const arr = points.current.geometry.attributes.position.array as Float32Array;
    const t = clock.elapsedTime;

    const breakup = THREE.MathUtils.smoothstep(p, 0.2, 0.6);
    const reform = THREE.MathUtils.smoothstep(p, 0.6, 0.95);
    const blend = breakup - reform;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const noise = Math.sin(t * 2 + i * 0.01) * 0.05 * blend;
      arr[i * 3] = THREE.MathUtils.lerp(surfacePositions[i * 3], explodedPositions[i * 3], blend) + noise;
      arr[i * 3 + 1] = THREE.MathUtils.lerp(surfacePositions[i * 3 + 1], explodedPositions[i * 3 + 1], blend) + noise;
      arr[i * 3 + 2] = THREE.MathUtils.lerp(surfacePositions[i * 3 + 2], explodedPositions[i * 3 + 2], blend);
    }
    points.current.geometry.attributes.position.needsUpdate = true;

    if (group.current) group.current.rotation.y += delta * 0.15;

    camera.position.z = THREE.MathUtils.lerp(4.5, 5.5, blend);
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={group}>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[new Float32Array(surfacePositions), 3]} count={PARTICLE_COUNT} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} count={PARTICLE_COUNT} />
        </bufferGeometry>
        <pointsMaterial size={0.02} sizeAttenuation vertexColors transparent opacity={0.9} depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
    </group>
  );
}

export default function ParticleSkinScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 4.5], fov: 50 }}>
      <color attach="background" args={["#03030a"]} />
      <ParticleObject />
    </Canvas>
  );
}
