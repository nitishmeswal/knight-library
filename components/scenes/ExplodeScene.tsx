"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

/**
 * ExplodeScene
 * ------------
 * A 6x6x6 grid of fragments that explodes outward and then reforms into
 * a solid cube, driven by scroll progress. Camera pushes in near the end.
 */
function Fragments({ N = 6 }: { N?: number }) {
  const group = useRef<THREE.Group>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const mesh = useRef<THREE.InstancedMesh>(null);

  const { origins, exploded } = useMemo(() => {
    const count = N * N * N;
    const origins = new Array(count);
    const exploded = new Array(count);
    const step = 1 / N;
    let i = 0;
    for (let x = 0; x < N; x++)
      for (let y = 0; y < N; y++)
        for (let z = 0; z < N; z++) {
          origins[i] = new THREE.Vector3(
            (x - (N - 1) / 2) * step,
            (y - (N - 1) / 2) * step,
            (z - (N - 1) / 2) * step
          );
          exploded[i] = new THREE.Vector3(
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 8
          );
          i++;
        }
    return { origins, exploded };
  }, [N]);

  useFrame(({ camera }, delta) => {
    const p = readProgressVar();
    // 0 -> exploded, 0.5 -> mid blend, 1 -> reformed
    const reform = THREE.MathUtils.smoothstep(p, 0.1, 0.9);

    if (group.current) {
      group.current.rotation.y += delta * 0.2;
      group.current.rotation.x = p * Math.PI * 0.4;
    }

    if (mesh.current) {
      const count = origins.length;
      for (let i = 0; i < count; i++) {
        const o = origins[i];
        const e = exploded[i];
        dummy.position.set(
          THREE.MathUtils.lerp(e.x, o.x, reform),
          THREE.MathUtils.lerp(e.y, o.y, reform),
          THREE.MathUtils.lerp(e.z, o.z, reform)
        );
        const spin = (1 - reform) * 4;
        dummy.rotation.set(i * 0.13 + spin, i * 0.27 + spin, i * 0.19 + spin);
        const s = THREE.MathUtils.lerp(0.09, 1 / N - 0.005, reform);
        dummy.scale.setScalar(s);
        dummy.updateMatrix();
        mesh.current.setMatrixAt(i, dummy.matrix);
      }
      mesh.current.instanceMatrix.needsUpdate = true;
    }

    // Camera push-in
    const z = THREE.MathUtils.lerp(6, 2.6, p);
    camera.position.lerp(new THREE.Vector3(0, 0, z), 0.06);
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={group}>
      <instancedMesh ref={mesh} args={[undefined, undefined, N * N * N]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#7c5cff"
          metalness={0.6}
          roughness={0.2}
        />
      </instancedMesh>
    </group>
  );
}

export default function ExplodeScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6], fov: 45 }}>
      <color attach="background" args={["#08080c"]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 5]} intensity={1.4} />
      <Environment preset="studio" />
      <Fragments N={6} />
    </Canvas>
  );
}
