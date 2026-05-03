"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

const POINT_COUNT = 3000;

function MorphingForm() {
  const points = useRef<THREE.Points>(null);
  const group = useRef<THREE.Group>(null);

  const { shapes } = useMemo(() => {
    const sphere: Float32Array = new Float32Array(POINT_COUNT * 3);
    const cube: Float32Array = new Float32Array(POINT_COUNT * 3);
    const torus: Float32Array = new Float32Array(POINT_COUNT * 3);

    for (let i = 0; i < POINT_COUNT; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      sphere[i * 3] = 1.2 * Math.sin(phi) * Math.cos(theta);
      sphere[i * 3 + 1] = 1.2 * Math.sin(phi) * Math.sin(theta);
      sphere[i * 3 + 2] = 1.2 * Math.cos(phi);

      cube[i * 3] = (Math.random() - 0.5) * 2.2;
      cube[i * 3 + 1] = (Math.random() - 0.5) * 2.2;
      cube[i * 3 + 2] = (Math.random() - 0.5) * 2.2;

      const torusR = 1.2;
      const tubeR = 0.4;
      const tTheta = Math.random() * Math.PI * 2;
      const tPhi = Math.random() * Math.PI * 2;
      torus[i * 3] = (torusR + tubeR * Math.cos(tPhi)) * Math.cos(tTheta);
      torus[i * 3 + 1] = tubeR * Math.sin(tPhi);
      torus[i * 3 + 2] = (torusR + tubeR * Math.cos(tPhi)) * Math.sin(tTheta);
    }
    return { shapes: [sphere, cube, torus] };
  }, []);

  useFrame(({ camera }, delta) => {
    const p = readProgressVar();
    if (!points.current) return;
    const arr = points.current.geometry.attributes.position.array as Float32Array;

    const segs = shapes.length - 1;
    const local = p * segs;
    const a = Math.floor(local);
    const b = Math.min(segs, a + 1);
    const t = THREE.MathUtils.smoothstep(local - a, 0, 1);

    for (let i = 0; i < POINT_COUNT; i++) {
      arr[i * 3] = THREE.MathUtils.lerp(shapes[a][i * 3], shapes[b][i * 3], t);
      arr[i * 3 + 1] = THREE.MathUtils.lerp(shapes[a][i * 3 + 1], shapes[b][i * 3 + 1], t);
      arr[i * 3 + 2] = THREE.MathUtils.lerp(shapes[a][i * 3 + 2], shapes[b][i * 3 + 2], t);
    }
    points.current.geometry.attributes.position.needsUpdate = true;

    if (group.current) group.current.rotation.y += delta * 0.2;

    camera.position.z = THREE.MathUtils.lerp(5, 3.5, Math.sin(p * Math.PI));
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={group}>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[new Float32Array(shapes[0]), 3]} count={POINT_COUNT} />
        </bufferGeometry>
        <pointsMaterial
          size={0.025}
          color="#cc88ff"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export default function MorphIdentityScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 50 }}>
      <color attach="background" args={["#04040c"]} />
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 2, 3]} intensity={2} color="#8844ff" />
      <Environment preset="night" />
      <MorphingForm />
    </Canvas>
  );
}
