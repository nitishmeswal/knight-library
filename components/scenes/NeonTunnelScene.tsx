"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

const RING_COUNT = 80;
const DEPTH = 100;

function NeonRings() {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tmpColor = useMemo(() => new THREE.Color(), []);

  useFrame(({ camera, clock }) => {
    const p = readProgressVar();
    const speed = THREE.MathUtils.lerp(1, 8, p);
    const t = clock.elapsedTime * speed * 0.3;

    for (let i = 0; i < RING_COUNT; i++) {
      const baseZ = -i * (DEPTH / RING_COUNT);
      let z = ((baseZ + t * 10) % DEPTH) - DEPTH * 0.1;
      if (z > 5) z -= DEPTH;

      const wobble = Math.sin(i * 0.4 + t * 0.5) * 0.3;
      dummy.position.set(wobble, wobble * 0.5, z);
      dummy.rotation.set(0, 0, i * 0.08 + t * 0.1);
      const pulse = 1 + Math.sin(i * 0.5 + t * 2) * 0.15;
      dummy.scale.set(2.5 * pulse, 2.5 * pulse, 0.04);
      dummy.updateMatrix();
      mesh.current?.setMatrixAt(i, dummy.matrix);

      const hue = (i / RING_COUNT + t * 0.05) % 1;
      tmpColor.setHSL(hue, 0.9, 0.6);
      mesh.current?.setColorAt(i, tmpColor);
    }
    if (mesh.current) {
      mesh.current.instanceMatrix.needsUpdate = true;
      if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
    }

    camera.position.z = 4;
    camera.position.x = Math.sin(t * 0.2) * 0.3;
    camera.lookAt(0, 0, -10);
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, RING_COUNT]}>
      <torusGeometry args={[1, 0.025, 8, 64]} />
      <meshBasicMaterial transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} />
    </instancedMesh>
  );
}

export default function NeonTunnelScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 70 }}>
      <color attach="background" args={["#010108"]} />
      <fog attach="fog" args={["#010108", 5, 50]} />
      <NeonRings />
    </Canvas>
  );
}
