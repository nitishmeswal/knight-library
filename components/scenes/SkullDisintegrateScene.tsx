"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

const PARTICLE_COUNT = 4000;

function SkullParticles() {
  const points = useRef<THREE.Points>(null);
  const group = useRef<THREE.Group>(null);

  const { assembled, scattered } = useMemo(() => {
    const assembled = new Float32Array(PARTICLE_COUNT * 3);
    const scattered = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * Math.PI * 2;
      const phi = Math.acos(2 * v - 1);

      let r: number;
      const region = Math.random();
      if (region < 0.6) {
        r = 1.2 + (Math.random() - 0.5) * 0.1;
      } else if (region < 0.75) {
        const eyeAngle = region < 0.675 ? -0.4 : 0.4;
        const ex = Math.cos(eyeAngle) * 0.3;
        const ey = 0.15;
        const ez = -1.1;
        assembled[i * 3] = ex + (Math.random() - 0.5) * 0.3;
        assembled[i * 3 + 1] = ey + (Math.random() - 0.5) * 0.2;
        assembled[i * 3 + 2] = ez + (Math.random() - 0.5) * 0.1;
        scattered[i * 3] = (Math.random() - 0.5) * 16;
        scattered[i * 3 + 1] = (Math.random() - 0.5) * 16;
        scattered[i * 3 + 2] = (Math.random() - 0.5) * 16;
        continue;
      } else if (region < 0.85) {
        r = 1.2;
        assembled[i * 3] = (Math.random() - 0.5) * 0.15;
        assembled[i * 3 + 1] = -0.15 + (Math.random() - 0.5) * 0.15;
        assembled[i * 3 + 2] = -1.2;
        scattered[i * 3] = (Math.random() - 0.5) * 16;
        scattered[i * 3 + 1] = (Math.random() - 0.5) * 16;
        scattered[i * 3 + 2] = (Math.random() - 0.5) * 16;
        continue;
      } else {
        r = 0.8 + Math.random() * 0.3;
        assembled[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        assembled[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) - 0.6;
        assembled[i * 3 + 2] = r * Math.cos(phi) * 0.7;
        scattered[i * 3] = (Math.random() - 0.5) * 16;
        scattered[i * 3 + 1] = (Math.random() - 0.5) * 16;
        scattered[i * 3 + 2] = (Math.random() - 0.5) * 16;
        continue;
      }

      assembled[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      assembled[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) + 0.1;
      assembled[i * 3 + 2] = r * Math.cos(phi);
      scattered[i * 3] = (Math.random() - 0.5) * 16;
      scattered[i * 3 + 1] = (Math.random() - 0.5) * 16;
      scattered[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    return { assembled, scattered };
  }, []);

  useFrame(({ camera }, delta) => {
    const p = readProgressVar();
    if (!points.current) return;
    const arr = points.current.geometry.attributes.position.array as Float32Array;
    const disintegrate = THREE.MathUtils.smoothstep(p, 0.1, 0.7);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr[i * 3] = THREE.MathUtils.lerp(assembled[i * 3], scattered[i * 3], disintegrate);
      arr[i * 3 + 1] = THREE.MathUtils.lerp(assembled[i * 3 + 1], scattered[i * 3 + 1], disintegrate);
      arr[i * 3 + 2] = THREE.MathUtils.lerp(assembled[i * 3 + 2], scattered[i * 3 + 2], disintegrate);
    }
    points.current.geometry.attributes.position.needsUpdate = true;

    if (group.current) group.current.rotation.y += delta * 0.15;

    camera.position.z = THREE.MathUtils.lerp(4, 6, disintegrate);
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={group}>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[new Float32Array(assembled), 3]} count={PARTICLE_COUNT} />
        </bufferGeometry>
        <pointsMaterial
          size={0.025}
          color="#ccddff"
          transparent
          opacity={0.85}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export default function SkullDisintegrateScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 50 }}>
      <color attach="background" args={["#04040c"]} />
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 2]} intensity={2} color="#4488ff" />
      <Environment preset="night" />
      <SkullParticles />
    </Canvas>
  );
}
