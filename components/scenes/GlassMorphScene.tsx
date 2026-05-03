"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

const PANEL_COUNT = 8;

function GlassPanels() {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const data = useMemo(() => {
    const items: { angle: number; radius: number; height: number; phase: number }[] = [];
    for (let i = 0; i < PANEL_COUNT; i++) {
      items.push({
        angle: (i / PANEL_COUNT) * Math.PI * 2,
        radius: 2,
        height: -0.5 + Math.random(),
        phase: Math.random() * Math.PI * 2,
      });
    }
    return items;
  }, []);

  useFrame(({ camera, clock }) => {
    const p = readProgressVar();
    const t = clock.elapsedTime;
    const spread = THREE.MathUtils.lerp(0.5, 2.5, p);
    const morphFactor = Math.sin(p * Math.PI);

    for (let i = 0; i < PANEL_COUNT; i++) {
      const d = data[i];
      const ang = d.angle + t * 0.15;
      const r = spread + Math.sin(t * 0.5 + d.phase) * 0.3;
      dummy.position.set(
        Math.cos(ang) * r,
        d.height + Math.sin(t * 0.8 + d.phase) * 0.2,
        Math.sin(ang) * r
      );
      dummy.rotation.set(
        morphFactor * 0.3,
        ang + Math.PI / 2,
        morphFactor * Math.sin(t + d.phase) * 0.2
      );
      const scaleX = THREE.MathUtils.lerp(0.8, 1.5, morphFactor);
      const scaleY = THREE.MathUtils.lerp(1.2, 0.8, morphFactor);
      dummy.scale.set(scaleX, scaleY, 0.02);
      dummy.updateMatrix();
      mesh.current?.setMatrixAt(i, dummy.matrix);
    }
    if (mesh.current) mesh.current.instanceMatrix.needsUpdate = true;

    camera.position.set(
      Math.sin(p * Math.PI * 0.5) * 2,
      0.5,
      THREE.MathUtils.lerp(5, 3, p)
    );
    camera.lookAt(0, 0, 0);
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, PANEL_COUNT]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshPhysicalMaterial
        color="#c9e0ff"
        transmission={0.9}
        thickness={0.3}
        roughness={0.05}
        metalness={0}
        ior={1.5}
        transparent
        opacity={0.6}
        clearcoat={1}
      />
    </instancedMesh>
  );
}

export default function GlassMorphScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0.5, 5], fov: 45 }}>
      <color attach="background" args={["#08081a"]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 5, 4]} intensity={1.4} color="#c9b8ff" />
      <pointLight position={[-2, -1, 3]} intensity={1} color="#ff88cc" />
      <Environment preset="studio" />
      <GlassPanels />
    </Canvas>
  );
}
