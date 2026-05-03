"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

const SHARD_COUNT = 400;

function FrozenExplosion() {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tmpColor = useMemo(() => new THREE.Color(), []);

  const data = useMemo(() => {
    const items: { dir: THREE.Vector3; dist: number; spin: THREE.Vector3; seed: number }[] = [];
    for (let i = 0; i < SHARD_COUNT; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      items.push({
        dir: new THREE.Vector3(
          Math.sin(phi) * Math.cos(theta),
          Math.sin(phi) * Math.sin(theta),
          Math.cos(phi)
        ),
        dist: 0.5 + Math.random() * 4,
        spin: new THREE.Vector3(
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 4
        ),
        seed: Math.random(),
      });
    }
    return items;
  }, []);

  useFrame(({ camera }) => {
    const p = readProgressVar();
    const orbit = p * Math.PI * 2;
    const radius = THREE.MathUtils.lerp(6, 4, Math.sin(p * Math.PI));

    for (let i = 0; i < SHARD_COUNT; i++) {
      const d = data[i];
      const expand = THREE.MathUtils.smoothstep(p, 0, 0.3);
      const r = d.dist * expand;
      dummy.position.copy(d.dir).multiplyScalar(r);
      dummy.rotation.set(
        d.spin.x * expand,
        d.spin.y * expand,
        d.spin.z * expand
      );
      const s = THREE.MathUtils.lerp(0.12, 0.04, expand) * (0.5 + d.seed);
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      mesh.current?.setMatrixAt(i, dummy.matrix);

      const heat = 1 - d.dist / 4;
      tmpColor.setHSL(0.08 * heat, 0.8, 0.35 + heat * 0.3);
      mesh.current?.setColorAt(i, tmpColor);
    }
    if (mesh.current) {
      mesh.current.instanceMatrix.needsUpdate = true;
      if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
    }

    camera.position.set(
      Math.cos(orbit) * radius,
      Math.sin(orbit * 0.4) * 2,
      Math.sin(orbit) * radius
    );
    camera.lookAt(0, 0, 0);
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, SHARD_COUNT]}>
      <tetrahedronGeometry args={[1, 0]} />
      <meshStandardMaterial metalness={0.6} roughness={0.2} />
    </instancedMesh>
  );
}

export default function TimeFreezeScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6], fov: 50 }}>
      <color attach="background" args={["#06050c"]} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 6, 4]} intensity={1.4} />
      <pointLight position={[0, 0, 0]} intensity={3} color="#ff6830" distance={6} />
      <Environment preset="warehouse" />
      <FrozenExplosion />
    </Canvas>
  );
}
