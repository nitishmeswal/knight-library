"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

function MorphBlob() {
  const mesh = useRef<THREE.Mesh>(null);
  const geom = useMemo(() => new THREE.IcosahedronGeometry(1.4, 64), []);

  const basePositions = useMemo(
    () => new Float32Array(geom.attributes.position.array as Float32Array),
    [geom]
  );

  useFrame(({ clock, camera }) => {
    const p = readProgressVar();
    const t = clock.elapsedTime;
    const arr = geom.attributes.position.array as Float32Array;

    for (let i = 0; i < arr.length; i += 3) {
      const bx = basePositions[i];
      const by = basePositions[i + 1];
      const bz = basePositions[i + 2];
      const len = Math.sqrt(bx * bx + by * by + bz * bz);
      const nx = bx / len;
      const ny = by / len;
      const nz = bz / len;

      const noise1 = Math.sin(bx * 2.5 + t * 1.2) * Math.cos(by * 3.1 + t * 0.8) * Math.sin(bz * 2.8 + t * 0.9);
      const noise2 = Math.sin(bx * 1.3 + t * 2.0) * Math.cos(bz * 1.8 + t * 1.5);
      const morph = THREE.MathUtils.lerp(0.05, 0.45, p);
      const displacement = (noise1 * 0.6 + noise2 * 0.4) * morph;

      arr[i] = bx + nx * displacement;
      arr[i + 1] = by + ny * displacement;
      arr[i + 2] = bz + nz * displacement;
    }
    geom.attributes.position.needsUpdate = true;
    geom.computeVertexNormals();

    if (mesh.current) {
      mesh.current.rotation.y += 0.003;
      const mat = mesh.current.material as THREE.MeshPhysicalMaterial;
      mat.color.lerpColors(
        new THREE.Color("#4488ff"),
        new THREE.Color("#ff44aa"),
        p
      );
      mat.emissive.lerpColors(
        new THREE.Color("#001133"),
        new THREE.Color("#330011"),
        p
      );
    }
    camera.position.z = THREE.MathUtils.lerp(5, 3.2, p);
    camera.lookAt(0, 0, 0);
  });

  return (
    <mesh ref={mesh} geometry={geom}>
      <meshPhysicalMaterial
        color="#4488ff"
        metalness={0.95}
        roughness={0.05}
        clearcoat={1}
        clearcoatRoughness={0.1}
        emissive="#001133"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

export default function LiquidMetalMorphScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
      <color attach="background" args={["#04040a"]} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[4, 6, 5]} intensity={1.5} />
      <pointLight position={[-3, -2, 2]} intensity={1} color="#ff44aa" />
      <Environment preset="studio" />
      <MorphBlob />
    </Canvas>
  );
}
