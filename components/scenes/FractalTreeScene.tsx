"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

/**
 * FractalTreeScene
 * ----------------
 * A recursive 3D tree grows level-by-level as the user scrolls. Each
 * branch is an instanced cylinder revealed when scroll progress passes
 * its generation threshold.
 */
type Branch = {
  from: THREE.Vector3;
  to: THREE.Vector3;
  thickness: number;
  gen: number;
};

function generate(max = 7): Branch[] {
  const all: Branch[] = [];
  const root = new THREE.Vector3(0, -1.6, 0);
  const up = new THREE.Vector3(0, 1, 0).multiplyScalar(1.3);
  const recur = (
    from: THREE.Vector3,
    dir: THREE.Vector3,
    gen: number,
    thickness: number
  ) => {
    if (gen > max) return;
    const to = from.clone().add(dir);
    all.push({ from, to, thickness, gen });
    const branches = 2 + (gen % 2);
    for (let i = 0; i < branches; i++) {
      const angle = ((i + 0.5) / branches) * Math.PI * 2;
      const tilt = 0.5 + Math.random() * 0.2;
      const newDir = dir
        .clone()
        .multiplyScalar(0.72)
        .applyAxisAngle(new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle)), tilt);
      recur(to, newDir, gen + 1, thickness * 0.72);
    }
  };
  recur(root, up, 0, 0.1);
  return all;
}

function Tree() {
  const branches = useMemo(() => generate(7), []);
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const group = useRef<THREE.Group>(null);

  useFrame(({ camera }, delta) => {
    const p = readProgressVar();
    if (group.current) group.current.rotation.y += delta * 0.12;

    for (let i = 0; i < branches.length; i++) {
      const b = branches[i];
      const genReveal = b.gen / 7;
      const local = THREE.MathUtils.smoothstep(p, genReveal, genReveal + 0.12);
      const mid = b.from.clone().lerp(b.to, 0.5);
      const dir = b.to.clone().sub(b.from);
      const len = dir.length() * local;
      dummy.position.copy(b.from).lerp(b.to, 0.5 * local);
      dummy.scale.set(b.thickness, Math.max(len, 0.001), b.thickness);
      const q = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        dir.clone().normalize()
      );
      dummy.quaternion.copy(q);
      dummy.updateMatrix();
      mesh.current?.setMatrixAt(i, dummy.matrix);
      const c = new THREE.Color().setHSL(
        0.7 - b.gen * 0.06 + p * 0.2,
        0.55,
        0.55
      );
      mesh.current?.setColorAt(i, c);
      mid; // keep var used
    }
    if (mesh.current) {
      mesh.current.instanceMatrix.needsUpdate = true;
      if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
    }
    camera.position.y = THREE.MathUtils.lerp(0, 1.2, p);
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={group}>
      <instancedMesh
        ref={mesh}
        args={[undefined, undefined, branches.length]}
        castShadow
      >
        <cylinderGeometry args={[1, 1, 1, 6]} />
        <meshStandardMaterial metalness={0.3} roughness={0.35} flatShading />
      </instancedMesh>
    </group>
  );
}

export default function FractalTreeScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6.5], fov: 45 }}>
      <color attach="background" args={["#06060c"]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 5, 3]} intensity={1.3} />
      <Environment preset="forest" />
      <Tree />
    </Canvas>
  );
}
