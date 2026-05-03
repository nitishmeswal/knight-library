"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

/**
 * ShatteredGlassScene
 * -------------------
 * A flat pane of glass fractures into triangles that fly toward the
 * camera in a pre-choreographed burst. Scroll reverses or completes
 * the shatter. Each shard rotates on its own axis.
 */
function Shards({ cols = 16, rows = 10 }: { cols?: number; rows?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const count = cols * rows * 2; // 2 triangles per quad

  const data = useMemo(() => {
    const basePos: THREE.Vector3[] = [];
    const velocity: THREE.Vector3[] = [];
    const spin: THREE.Vector3[] = [];
    const w = 4.8 / cols;
    const h = 2.8 / rows;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cx = (x - cols / 2 + 0.5) * w;
        const cy = (y - rows / 2 + 0.5) * h;
        for (let t = 0; t < 2; t++) {
          basePos.push(new THREE.Vector3(cx, cy, 0));
          velocity.push(
            new THREE.Vector3(
              (Math.random() - 0.5) * 1.5,
              (Math.random() - 0.5) * 1.2,
              3 + Math.random() * 3
            )
          );
          spin.push(
            new THREE.Vector3(
              (Math.random() - 0.5) * 6,
              (Math.random() - 0.5) * 6,
              (Math.random() - 0.5) * 6
            )
          );
        }
      }
    }
    return { basePos, velocity, spin, w, h };
  }, [cols, rows]);

  useFrame(({ camera }) => {
    const p = readProgressVar();
    const burst = THREE.MathUtils.smoothstep(p, 0.15, 0.8);
    for (let i = 0; i < count; i++) {
      const b = data.basePos[i];
      const v = data.velocity[i];
      const s = data.spin[i];
      dummy.position.set(
        b.x + v.x * burst,
        b.y + v.y * burst,
        b.z + v.z * burst
      );
      dummy.rotation.set(s.x * burst, s.y * burst, s.z * burst);
      const scale = THREE.MathUtils.lerp(1, 0.4, burst);
      dummy.scale.set(data.w * scale, data.h * scale, 0.02);
      dummy.updateMatrix();
      mesh.current?.setMatrixAt(i, dummy.matrix);
    }
    if (mesh.current) mesh.current.instanceMatrix.needsUpdate = true;

    camera.position.z = THREE.MathUtils.lerp(5, 2.4, p);
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshPhysicalMaterial
        color="#c9e0ff"
        transmission={0.85}
        thickness={0.4}
        roughness={0.05}
        metalness={0.1}
        ior={1.5}
        transparent
        opacity={0.85}
      />
    </instancedMesh>
  );
}

export default function ShatteredGlassScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 50 }}>
      <color attach="background" args={["#05060a"]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 5, 3]} intensity={1.6} color="#c9b8ff" />
      <Environment preset="studio" />
      <Shards />
    </Canvas>
  );
}
