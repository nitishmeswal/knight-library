"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

const FRAG_COUNT = 300;

function Fragments() {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tmpColor = useMemo(() => new THREE.Color(), []);
  const group = useRef<THREE.Group>(null);

  const { origins, exploded, seeds } = useMemo(() => {
    const origins: THREE.Vector3[] = [];
    const exploded: THREE.Vector3[] = [];
    const seeds: number[] = [];
    for (let i = 0; i < FRAG_COUNT; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = Math.cbrt(Math.random()) * 1.2;
      origins.push(
        new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        )
      );
      exploded.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 12
        )
      );
      seeds.push(Math.random());
    }
    return { origins, exploded, seeds };
  }, []);

  useFrame(({ camera }, delta) => {
    const p = readProgressVar();
    const reform = THREE.MathUtils.smoothstep(p, 0.05, 0.85);

    if (group.current) {
      group.current.rotation.y += delta * 0.15;
    }

    for (let i = 0; i < FRAG_COUNT; i++) {
      const o = origins[i];
      const e = exploded[i];
      dummy.position.set(
        THREE.MathUtils.lerp(e.x, o.x, reform),
        THREE.MathUtils.lerp(e.y, o.y, reform),
        THREE.MathUtils.lerp(e.z, o.z, reform)
      );
      const spin = (1 - reform) * 5;
      dummy.rotation.set(seeds[i] * 6 + spin, seeds[i] * 4 + spin, 0);
      const s = THREE.MathUtils.lerp(0.06, 0.12, reform);
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      mesh.current?.setMatrixAt(i, dummy.matrix);

      const glow = (1 - reform) * 0.8;
      tmpColor.setHSL(0.05 + seeds[i] * 0.1, 0.9, 0.4 + glow * 0.4);
      mesh.current?.setColorAt(i, tmpColor);
    }
    if (mesh.current) {
      mesh.current.instanceMatrix.needsUpdate = true;
      if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
    }

    camera.position.z = THREE.MathUtils.lerp(8, 3, p);
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={group}>
      <instancedMesh ref={mesh} args={[undefined, undefined, FRAG_COUNT]}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial metalness={0.5} roughness={0.25} />
      </instancedMesh>
    </group>
  );
}

export default function ExplodeReassembleScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 45 }}>
      <color attach="background" args={["#08080c"]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 5]} intensity={1.4} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#ff6030" distance={5} />
      <Environment preset="studio" />
      <Fragments />
    </Canvas>
  );
}
