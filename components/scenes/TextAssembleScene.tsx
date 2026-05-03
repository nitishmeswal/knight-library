"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

/**
 * TextAssembleScene
 * -----------------
 * The word "CREATE" is rasterized to a pixel grid and each pixel becomes
 * a small cube. Cubes fly in from random positions and assemble into the
 * word as the user scrolls.
 */
function Word({ text = "CREATE" }: { text?: string }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const { targets, scatter, count } = useMemo(() => {
    // Rasterize text to a canvas, then sample
    const W = 512;
    const H = 96;
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

    const step = 5; // sample density
    const targets: THREE.Vector3[] = [];
    for (let y = 0; y < H; y += step) {
      for (let x = 0; x < W; x += step) {
        const idx = (y * W + x) * 4;
        if (data[idx] > 200) {
          targets.push(
            new THREE.Vector3(
              (x - W / 2) * 0.012,
              -(y - H / 2) * 0.012,
              (Math.random() - 0.5) * 0.1
            )
          );
        }
      }
    }
    const scatter = targets.map(
      () =>
        new THREE.Vector3(
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 14
        )
    );
    return { targets, scatter, count: targets.length };
  }, [text]);

  useFrame(({ camera }, delta) => {
    const p = readProgressVar();
    const t = THREE.MathUtils.smoothstep(p, 0.1, 0.9);
    for (let i = 0; i < count; i++) {
      const tg = targets[i];
      const sc = scatter[i];
      dummy.position.set(
        THREE.MathUtils.lerp(sc.x, tg.x, t),
        THREE.MathUtils.lerp(sc.y, tg.y, t),
        THREE.MathUtils.lerp(sc.z, tg.z, t)
      );
      const spin = (1 - t) * 3;
      dummy.rotation.set(i * 0.15 + spin, i * 0.22 + spin, i * 0.11 + spin);
      dummy.scale.setScalar(0.045);
      dummy.updateMatrix();
      mesh.current?.setMatrixAt(i, dummy.matrix);
    }
    if (mesh.current) mesh.current.instanceMatrix.needsUpdate = true;

    camera.position.z = THREE.MathUtils.lerp(6, 3.8, p);
    camera.position.y = Math.sin(p * Math.PI) * 0.4;
    camera.lookAt(0, 0, 0);
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

export default function TextAssembleScene({ text = "CREATE" }: { text?: string }) {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6], fov: 45 }}>
      <color attach="background" args={["#06060c"]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} />
      <Environment preset="studio" />
      <Word text={text} />
    </Canvas>
  );
}
