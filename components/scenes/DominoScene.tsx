"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

/**
 * DominoScene
 * -----------
 * A curved line of 60 dominoes. Scroll progressively tips each one over
 * in sequence — a classic cause-and-effect demo. Camera trails the wave.
 */
function Dominoes({ count = 60 }: { count?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const positions = useMemo(() => {
    const arr: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      const t = i / (count - 1);
      const x = (t - 0.5) * 24;
      const z = Math.sin(t * Math.PI * 2) * 2.4;
      arr.push(new THREE.Vector3(x, 0, z));
    }
    return arr;
  }, [count]);

  useFrame(({ camera }) => {
    const p = readProgressVar();
    const head = p * count; // wave front index
    for (let i = 0; i < count; i++) {
      const pos = positions[i];
      const dist = head - i;
      const fall = THREE.MathUtils.clamp(dist / 3, 0, 1);
      const angle = (Math.PI / 2) * fall;

      // facing direction for curved line
      const next = positions[Math.min(count - 1, i + 1)];
      const prev = positions[Math.max(0, i - 1)];
      const dir = next.clone().sub(prev).normalize();
      const yaw = Math.atan2(dir.x, dir.z);

      dummy.position.set(pos.x, 0.5, pos.z);
      dummy.rotation.set(0, yaw, -angle);
      // Translate pivot to base
      dummy.position.y =
        0.5 * Math.cos(angle) + 0.15 * Math.sin(angle) - 0.5 + 0.5;
      dummy.scale.set(0.3, 1, 0.08);
      dummy.updateMatrix();
      mesh.current?.setMatrixAt(i, dummy.matrix);

      const c = new THREE.Color().setHSL(0.7 - i / count * 0.3, 0.55, 0.55);
      mesh.current?.setColorAt(i, c);
    }
    if (mesh.current) {
      mesh.current.instanceMatrix.needsUpdate = true;
      if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
    }

    // Camera trails the wave
    const idx = Math.min(count - 1, Math.max(0, Math.floor(head)));
    const look = positions[idx];
    camera.position.x = look.x - 4;
    camera.position.z = look.z + 4;
    camera.position.y = 2.8;
    camera.lookAt(look.x, 0.4, look.z);
  });

  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.01, 0]}>
        <planeGeometry args={[40, 20]} />
        <meshStandardMaterial color="#14141c" roughness={0.9} />
      </mesh>
      <instancedMesh ref={mesh} args={[undefined, undefined, count]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial metalness={0.4} roughness={0.25} />
      </instancedMesh>
    </group>
  );
}

export default function DominoScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 3, 5], fov: 55 }}>
      <color attach="background" args={["#06060c"]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[6, 8, 4]} intensity={1.6} castShadow />
      <Environment preset="warehouse" />
      <Dominoes />
    </Canvas>
  );
}
