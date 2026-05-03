"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

/**
 * MorphingTypeScene
 * -----------------
 * Cubes morph between three words as the user scrolls: WORDS flow across
 * the same pool of instances, so each cube slides from one glyph to the
 * next rather than being re-spawned.
 */
function rasterize(text: string, W = 512, H = 96, step = 6) {
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#fff";
  ctx.font = "bold 82px Inter, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, W / 2, H / 2 + 2);
  const data = ctx.getImageData(0, 0, W, H).data;
  const pts: THREE.Vector3[] = [];
  for (let y = 0; y < H; y += step) {
    for (let x = 0; x < W; x += step) {
      if (data[(y * W + x) * 4] > 200) {
        pts.push(
          new THREE.Vector3(
            (x - W / 2) * 0.012,
            -(y - H / 2) * 0.012,
            (Math.random() - 0.5) * 0.1
          )
        );
      }
    }
  }
  return pts;
}

function WordCycle({ words = ["CREATE", "EVOLVE", "SHIP"] }: { words?: string[] }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const { sets, count } = useMemo(() => {
    const sets = words.map((w) => rasterize(w));
    const count = Math.max(...sets.map((s) => s.length));
    // Pad shorter sets with random offscreen points so indices map 1:1
    sets.forEach((s) => {
      while (s.length < count) {
        s.push(
          new THREE.Vector3(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 4
          )
        );
      }
    });
    return { sets, count };
  }, [words]);

  useFrame(({ camera }) => {
    const p = readProgressVar();
    const segs = sets.length - 1;
    const local = p * segs;
    const a = Math.floor(local);
    const b = Math.min(segs, a + 1);
    const t = local - a;
    const ease = THREE.MathUtils.smoothstep(t, 0, 1);

    for (let i = 0; i < count; i++) {
      const from = sets[a][i];
      const to = sets[b][i];
      dummy.position.set(
        THREE.MathUtils.lerp(from.x, to.x, ease),
        THREE.MathUtils.lerp(from.y, to.y, ease),
        THREE.MathUtils.lerp(from.z, to.z, ease)
      );
      const spin = Math.sin(ease * Math.PI) * 2;
      dummy.rotation.set(i * 0.1 + spin, i * 0.17 + spin, i * 0.13);
      dummy.scale.setScalar(0.05);
      dummy.updateMatrix();
      mesh.current?.setMatrixAt(i, dummy.matrix);
    }
    if (mesh.current) mesh.current.instanceMatrix.needsUpdate = true;

    camera.position.z = THREE.MathUtils.lerp(4.2, 5.2, Math.sin(p * Math.PI));
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#ffffff"
        metalness={0.7}
        roughness={0.15}
        emissive="#7c5cff"
        emissiveIntensity={0.25}
      />
    </instancedMesh>
  );
}

export default function MorphingTypeScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 4.6], fov: 45 }}>
      <color attach="background" args={["#06060c"]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} />
      <Environment preset="studio" />
      <WordCycle />
    </Canvas>
  );
}
