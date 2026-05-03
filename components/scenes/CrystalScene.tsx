"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

/**
 * CrystalScene
 * ------------
 * A cluster of emissive crystals (icosahedra) that grow from zero and
 * animate outward as scroll progresses. Colors shift hue per crystal.
 */
function Crystals({ count = 90 }: { count?: number }) {
  const group = useRef<THREE.Group>(null);
  const meshes = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const data = useMemo(() => {
    const arr: { pos: THREE.Vector3; rot: THREE.Euler; scale: number; hue: number; delay: number }[] = [];
    for (let i = 0; i < count; i++) {
      const r = 2 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr.push({
        pos: new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        ),
        rot: new THREE.Euler(Math.random() * 6, Math.random() * 6, Math.random() * 6),
        scale: 0.15 + Math.random() * 0.35,
        hue: Math.random(),
        delay: Math.random() * 0.5,
      });
    }
    return arr;
  }, [count]);

  useFrame(({ camera }, delta) => {
    const p = readProgressVar();
    if (group.current) group.current.rotation.y += delta * 0.15;

    data.forEach((d, i) => {
      const local = THREE.MathUtils.smoothstep(p, d.delay, d.delay + 0.5);
      dummy.position.copy(d.pos).multiplyScalar(THREE.MathUtils.lerp(0.2, 1, local));
      dummy.rotation.set(d.rot.x + p * 2, d.rot.y + p * 2, d.rot.z);
      dummy.scale.setScalar(d.scale * local);
      dummy.updateMatrix();
      meshes.current?.setMatrixAt(i, dummy.matrix);

      const color = new THREE.Color().setHSL(
        (d.hue + p * 0.3) % 1,
        0.6,
        0.55
      );
      meshes.current?.setColorAt(i, color);
    });
    if (meshes.current) {
      meshes.current.instanceMatrix.needsUpdate = true;
      if (meshes.current.instanceColor) meshes.current.instanceColor.needsUpdate = true;
    }

    camera.position.z = THREE.MathUtils.lerp(6.5, 4.2, p);
  });

  return (
    <group ref={group}>
      <instancedMesh ref={meshes} args={[undefined, undefined, count]}>
        <icosahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          roughness={0.1}
          metalness={0.2}
          clearcoat={1}
          transmission={0.25}
          thickness={0.6}
          flatShading
        />
      </instancedMesh>
    </group>
  );
}

export default function CrystalScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6.5], fov: 45 }}>
      <color attach="background" args={["#070712"]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 5, 4]} intensity={1.6} />
      <pointLight position={[-4, -3, -3]} intensity={1.4} color="#7c5cff" />
      <Environment preset="warehouse" />
      <Crystals />
    </Canvas>
  );
}
