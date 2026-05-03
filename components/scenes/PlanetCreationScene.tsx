"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Stars } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

const DUST_COUNT = 3000;

function Planet() {
  const planet = useRef<THREE.Mesh>(null);
  const atmosphere = useRef<THREE.Mesh>(null);
  const dust = useRef<THREE.Points>(null);

  const dustPositions = useMemo(() => {
    const arr = new Float32Array(DUST_COUNT * 3);
    for (let i = 0; i < DUST_COUNT; i++) {
      const r = 2 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame(({ camera, clock }, delta) => {
    const p = readProgressVar();
    const t = clock.elapsedTime;

    const planetScale = THREE.MathUtils.smoothstep(p, 0.2, 0.6);
    if (planet.current) {
      planet.current.scale.setScalar(planetScale * 1.4);
      planet.current.rotation.y += delta * 0.15;
      const mat = planet.current.material as THREE.MeshStandardMaterial;
      mat.color.lerpColors(
        new THREE.Color("#553311"),
        new THREE.Color("#4466aa"),
        THREE.MathUtils.smoothstep(p, 0.4, 0.8)
      );
    }

    const atmoScale = THREE.MathUtils.smoothstep(p, 0.6, 0.9);
    if (atmosphere.current) {
      atmosphere.current.scale.setScalar(planetScale * 1.5);
      const mat = atmosphere.current.material as THREE.MeshBasicMaterial;
      mat.opacity = atmoScale * 0.25;
    }

    if (dust.current) {
      const arr = dust.current.geometry.attributes.position.array as Float32Array;
      const collapse = THREE.MathUtils.smoothstep(p, 0, 0.5);
      for (let i = 0; i < DUST_COUNT; i++) {
        const dx = dustPositions[i * 3];
        const dy = dustPositions[i * 3 + 1];
        const dz = dustPositions[i * 3 + 2];
        const factor = 1 - collapse * 0.8;
        arr[i * 3] = dx * factor + Math.sin(t + i) * 0.02;
        arr[i * 3 + 1] = dy * factor + Math.cos(t + i * 0.7) * 0.02;
        arr[i * 3 + 2] = dz * factor;
      }
      dust.current.geometry.attributes.position.needsUpdate = true;
      dust.current.rotation.y += delta * 0.1;
    }

    camera.position.z = THREE.MathUtils.lerp(8, 4, p);
    camera.lookAt(0, 0, 0);
  });

  return (
    <group>
      <mesh ref={planet}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color="#553311" roughness={0.6} metalness={0.1} />
      </mesh>
      <mesh ref={atmosphere}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshBasicMaterial color="#6699ff" transparent opacity={0} side={THREE.BackSide} blending={THREE.AdditiveBlending} />
      </mesh>
      <points ref={dust}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[new Float32Array(dustPositions), 3]} count={DUST_COUNT} />
        </bufferGeometry>
        <pointsMaterial size={0.04} color="#ffcc88" transparent opacity={0.7} depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
    </group>
  );
}

export default function PlanetCreationScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 45 }}>
      <color attach="background" args={["#02020a"]} />
      <Stars radius={40} depth={30} count={2000} factor={2} fade />
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 3, 5]} intensity={1.6} color="#ffd48a" />
      <Environment preset="night" />
      <Planet />
    </Canvas>
  );
}
