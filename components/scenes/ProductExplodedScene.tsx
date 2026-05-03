"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

const PART_COUNT = 12;

function ExplodedParts() {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tmpColor = useMemo(() => new THREE.Color(), []);

  const parts = useMemo(() => {
    const items: { assembled: THREE.Vector3; offset: THREE.Vector3; hue: number; scaleY: number }[] = [];
    const layers = [
      { y: -0.6, count: 3, r: 0 },
      { y: 0, count: 4, r: 0.3 },
      { y: 0.6, count: 3, r: 0 },
      { y: 1.2, count: 2, r: 0.2 },
    ];
    for (const layer of layers) {
      for (let i = 0; i < layer.count; i++) {
        const ang = (i / layer.count) * Math.PI * 2;
        items.push({
          assembled: new THREE.Vector3(
            Math.cos(ang) * layer.r,
            layer.y,
            Math.sin(ang) * layer.r
          ),
          offset: new THREE.Vector3(
            Math.cos(ang) * 2.5,
            layer.y * 2.5,
            Math.sin(ang) * 2.5
          ),
          hue: i / layer.count,
          scaleY: 0.3 + Math.random() * 0.4,
        });
      }
    }
    return items.slice(0, PART_COUNT);
  }, []);

  useFrame(({ camera }, delta) => {
    const p = readProgressVar();
    const explode = THREE.MathUtils.smoothstep(p, 0.1, 0.7);

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      dummy.position.lerpVectors(part.assembled, part.offset, explode);
      dummy.rotation.set(0, explode * Math.PI * 0.5 + i * 0.3, 0);
      dummy.scale.set(0.4, part.scaleY, 0.4);
      dummy.updateMatrix();
      mesh.current?.setMatrixAt(i, dummy.matrix);

      tmpColor.setHSL(part.hue * 0.3 + 0.55, 0.5, 0.55);
      mesh.current?.setColorAt(i, tmpColor);
    }
    if (mesh.current) {
      mesh.current.instanceMatrix.needsUpdate = true;
      if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
    }

    const orbit = p * Math.PI;
    camera.position.set(Math.sin(orbit) * 5, 1.5, Math.cos(orbit) * 5);
    camera.lookAt(0, 0.3, 0);
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, PART_COUNT]}>
      <cylinderGeometry args={[0.8, 1, 1, 32]} />
      <meshStandardMaterial metalness={0.6} roughness={0.15} />
    </instancedMesh>
  );
}

export default function ProductExplodedScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 1.5, 5], fov: 45 }}>
      <color attach="background" args={["#06060c"]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 4]} intensity={1.4} />
      <Environment preset="studio" />
      <ExplodedParts />
    </Canvas>
  );
}
