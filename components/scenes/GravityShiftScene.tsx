"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

const OBJ_COUNT = 80;

function GravityObjects() {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tmpColor = useMemo(() => new THREE.Color(), []);

  const data = useMemo(() => {
    const items: { pos: THREE.Vector3; vel: THREE.Vector3; size: number; hue: number; shape: number }[] = [];
    for (let i = 0; i < OBJ_COUNT; i++) {
      items.push({
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 6
        ),
        vel: new THREE.Vector3(0, 0, 0),
        size: 0.15 + Math.random() * 0.35,
        hue: Math.random(),
        shape: Math.floor(Math.random() * 3),
      });
    }
    return items;
  }, []);

  useFrame(({ camera }, delta) => {
    const p = readProgressVar();
    const gravAngle = p * Math.PI * 2;
    const gravity = new THREE.Vector3(
      Math.sin(gravAngle) * 4,
      Math.cos(gravAngle) * 4,
      Math.sin(gravAngle * 0.7) * 2
    );

    for (let i = 0; i < OBJ_COUNT; i++) {
      const d = data[i];
      d.vel.addScaledVector(gravity, delta * 0.3);
      d.vel.multiplyScalar(0.98);
      d.pos.addScaledVector(d.vel, delta);

      if (d.pos.length() > 6) {
        d.pos.normalize().multiplyScalar(5.8);
        d.vel.reflect(d.pos.clone().normalize()).multiplyScalar(0.5);
      }

      dummy.position.copy(d.pos);
      dummy.rotation.set(d.vel.x * 0.5, d.vel.y * 0.5, d.vel.z * 0.5);
      dummy.scale.setScalar(d.size);
      dummy.updateMatrix();
      mesh.current?.setMatrixAt(i, dummy.matrix);

      tmpColor.setHSL(d.hue, 0.6, 0.5);
      mesh.current?.setColorAt(i, tmpColor);
    }
    if (mesh.current) {
      mesh.current.instanceMatrix.needsUpdate = true;
      if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
    }

    camera.position.set(0, 1, THREE.MathUtils.lerp(8, 5, p));
    camera.lookAt(0, 0, 0);
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, OBJ_COUNT]}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial metalness={0.5} roughness={0.2} />
    </instancedMesh>
  );
}

export default function GravityShiftScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 1, 8], fov: 50 }}>
      <color attach="background" args={["#06060c"]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 4]} intensity={1.4} />
      <Environment preset="city" />
      <GravityObjects />
    </Canvas>
  );
}
