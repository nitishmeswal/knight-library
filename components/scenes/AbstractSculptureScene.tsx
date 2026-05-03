"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

const PIECE_COUNT = 50;

function Sculpture() {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tmpColor = useMemo(() => new THREE.Color(), []);
  const group = useRef<THREE.Group>(null);

  const pieces = useMemo(() => {
    const items: { target: THREE.Vector3; scatter: THREE.Vector3; rotScatter: THREE.Euler; rotTarget: THREE.Euler; hue: number; delay: number }[] = [];
    for (let i = 0; i < PIECE_COUNT; i++) {
      const t = i / PIECE_COUNT;
      const ang = t * Math.PI * 6;
      const r = 0.3 + t * 1.5;
      const y = (t - 0.5) * 4;
      items.push({
        target: new THREE.Vector3(Math.cos(ang) * r, y, Math.sin(ang) * r),
        scatter: new THREE.Vector3(
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 12
        ),
        rotScatter: new THREE.Euler(Math.random() * 6, Math.random() * 6, Math.random() * 6),
        rotTarget: new THREE.Euler(Math.random() * 2, Math.random() * 2, Math.random() * 2),
        hue: t * 0.3 + 0.6,
        delay: t * 0.4,
      });
    }
    return items;
  }, []);

  useFrame(({ camera }, delta) => {
    const p = readProgressVar();
    if (group.current) group.current.rotation.y += delta * 0.1;

    for (let i = 0; i < PIECE_COUNT; i++) {
      const piece = pieces[i];
      const local = THREE.MathUtils.smoothstep(p, piece.delay, piece.delay + 0.5);
      dummy.position.lerpVectors(piece.scatter, piece.target, local);
      dummy.rotation.set(
        piece.rotScatter.x * (1 - local) + piece.rotTarget.x * local,
        piece.rotScatter.y * (1 - local) + piece.rotTarget.y * local,
        piece.rotScatter.z * (1 - local) + piece.rotTarget.z * local
      );
      const s = THREE.MathUtils.lerp(0.05, 0.2, local);
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      mesh.current?.setMatrixAt(i, dummy.matrix);

      tmpColor.setHSL(piece.hue, 0.5, 0.5 + local * 0.2);
      mesh.current?.setColorAt(i, tmpColor);
    }
    if (mesh.current) {
      mesh.current.instanceMatrix.needsUpdate = true;
      if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
    }

    camera.position.z = THREE.MathUtils.lerp(7, 4, p);
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={group}>
      <instancedMesh ref={mesh} args={[undefined, undefined, PIECE_COUNT]}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial metalness={0.7} roughness={0.1} />
      </instancedMesh>
    </group>
  );
}

export default function AbstractSculptureScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 7], fov: 45 }}>
      <color attach="background" args={["#06060c"]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.4} />
      <Environment preset="warehouse" />
      <Sculpture />
    </Canvas>
  );
}
