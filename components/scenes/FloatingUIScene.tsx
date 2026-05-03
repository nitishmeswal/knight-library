"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

const CARD_COUNT = 60;

function FloatingCards() {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tmpColor = useMemo(() => new THREE.Color(), []);

  const data = useMemo(() => {
    const items: { pos: THREE.Vector3; speed: number; phase: number; hue: number; sizeY: number }[] = [];
    for (let i = 0; i < CARD_COUNT; i++) {
      items.push({
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 12
        ),
        speed: 0.3 + Math.random() * 0.7,
        phase: Math.random() * Math.PI * 2,
        hue: Math.random(),
        sizeY: 0.3 + Math.random() * 0.5,
      });
    }
    return items;
  }, []);

  useFrame(({ camera, clock }) => {
    const p = readProgressVar();
    const t = clock.elapsedTime;
    const zoom = THREE.MathUtils.lerp(10, 2, p);

    for (let i = 0; i < CARD_COUNT; i++) {
      const d = data[i];
      const float = Math.sin(t * d.speed + d.phase) * 0.4;
      dummy.position.set(d.pos.x, d.pos.y + float, d.pos.z);
      dummy.rotation.set(
        Math.sin(t * 0.3 + d.phase) * 0.15,
        t * 0.1 + d.phase,
        Math.cos(t * 0.2 + d.phase) * 0.1
      );
      dummy.scale.set(0.8, d.sizeY, 0.02);
      dummy.updateMatrix();
      mesh.current?.setMatrixAt(i, dummy.matrix);

      tmpColor.setHSL(d.hue, 0.5, 0.55);
      mesh.current?.setColorAt(i, tmpColor);
    }
    if (mesh.current) {
      mesh.current.instanceMatrix.needsUpdate = true;
      if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
    }

    camera.position.z = zoom;
    camera.position.y = Math.sin(p * Math.PI) * 1.5;
    camera.lookAt(0, 0, 0);
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, CARD_COUNT]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshPhysicalMaterial
        roughness={0.1}
        metalness={0.3}
        clearcoat={1}
        transmission={0.3}
        thickness={0.5}
      />
    </instancedMesh>
  );
}

export default function FloatingUIScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 50 }}>
      <color attach="background" args={["#06060e"]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 5, 4]} intensity={1.2} />
      <pointLight position={[-3, 2, -2]} intensity={1} color="#7c5cff" />
      <Environment preset="city" />
      <FloatingCards />
    </Canvas>
  );
}
