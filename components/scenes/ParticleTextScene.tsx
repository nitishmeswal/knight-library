"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

const PARTICLE_COUNT = 5000;

function TextParticles() {
  const points = useRef<THREE.Points>(null);

  const { positions, targets, colors } = useMemo(() => {
    if (typeof document === "undefined") {
      const empty = new Float32Array(0);
      return { positions: empty, targets: empty, colors: empty };
    }
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
    ctx.fillText("KNIGHT", W / 2, H / 2 + 2);
    const data = ctx.getImageData(0, 0, W, H).data;

    const textPts: THREE.Vector3[] = [];
    for (let y = 0; y < H; y += 3) {
      for (let x = 0; x < W; x += 3) {
        if (data[(y * W + x) * 4] > 200) {
          textPts.push(
            new THREE.Vector3(
              (x - W / 2) * 0.012,
              -(y - H / 2) * 0.012,
              0
            )
          );
        }
      }
    }

    const count = Math.min(PARTICLE_COUNT, textPts.length);
    const positions = new Float32Array(count * 3);
    const targets = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const col = new THREE.Color();

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;

      targets[i * 3] = textPts[i].x;
      targets[i * 3 + 1] = textPts[i].y;
      targets[i * 3 + 2] = textPts[i].z;

      col.setHSL(Math.random() * 0.2 + 0.7, 0.8, 0.6);
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }
    return { positions, targets, colors };
  }, []);

  useFrame(({ camera }) => {
    const p = readProgressVar();
    if (!points.current) return;
    const arr = points.current.geometry.attributes.position.array as Float32Array;
    const count = arr.length / 3;
    const t = THREE.MathUtils.smoothstep(p, 0.05, 0.7);

    for (let i = 0; i < count; i++) {
      arr[i * 3] = THREE.MathUtils.lerp(positions[i * 3], targets[i * 3], t);
      arr[i * 3 + 1] = THREE.MathUtils.lerp(positions[i * 3 + 1], targets[i * 3 + 1], t);
      arr[i * 3 + 2] = THREE.MathUtils.lerp(positions[i * 3 + 2], targets[i * 3 + 2], t);
    }
    points.current.geometry.attributes.position.needsUpdate = true;

    const scatter = THREE.MathUtils.smoothstep(p, 0.75, 1);
    if (scatter > 0) {
      for (let i = 0; i < count; i++) {
        arr[i * 3] += (positions[i * 3] - targets[i * 3]) * scatter * 0.5;
        arr[i * 3 + 1] += (positions[i * 3 + 1] - targets[i * 3 + 1]) * scatter * 0.5;
        arr[i * 3 + 2] += (positions[i * 3 + 2] - targets[i * 3 + 2]) * scatter * 0.5;
      }
      points.current.geometry.attributes.position.needsUpdate = true;
    }

    camera.position.z = THREE.MathUtils.lerp(6, 3.5, t);
    camera.lookAt(0, 0, 0);
  });

  const count = positions.length / 3;
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[new Float32Array(positions), 3]} count={count} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ParticleTextScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6], fov: 50 }}>
      <color attach="background" args={["#03030a"]} />
      <TextParticles />
    </Canvas>
  );
}
