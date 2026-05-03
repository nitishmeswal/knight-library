"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

function MeltingObject() {
  const mesh = useRef<THREE.Mesh>(null);
  const geom = useMemo(() => new THREE.IcosahedronGeometry(1.3, 32), []);
  const basePositions = useMemo(
    () => new Float32Array(geom.attributes.position.array as Float32Array),
    [geom]
  );

  useFrame(({ clock, camera }) => {
    const p = readProgressVar();
    const t = clock.elapsedTime;
    const arr = geom.attributes.position.array as Float32Array;
    const melt = THREE.MathUtils.lerp(0, 1, p);

    for (let i = 0; i < arr.length; i += 3) {
      const bx = basePositions[i];
      const by = basePositions[i + 1];
      const bz = basePositions[i + 2];

      const droop = Math.max(0, (by + 1.3) / 2.6) * melt * 1.5;
      const spread = 1 + droop * 0.5;
      const noise = Math.sin(bx * 4 + t * 2) * Math.cos(bz * 4 + t * 1.5) * melt * 0.15;

      arr[i] = bx * spread + noise;
      arr[i + 1] = by - droop * droop + noise * 0.5;
      arr[i + 2] = bz * spread + noise;
    }
    geom.attributes.position.needsUpdate = true;
    geom.computeVertexNormals();

    if (mesh.current) {
      mesh.current.rotation.y += 0.003;
      const mat = mesh.current.material as THREE.MeshPhysicalMaterial;
      mat.color.lerpColors(
        new THREE.Color("#cccccc"),
        new THREE.Color("#ff4400"),
        melt
      );
      mat.emissive.lerpColors(
        new THREE.Color("#000000"),
        new THREE.Color("#ff2200"),
        melt * 0.5
      );
    }

    camera.position.z = THREE.MathUtils.lerp(4.5, 3.5, p);
    camera.lookAt(0, -0.5 * p, 0);
  });

  return (
    <mesh ref={mesh} geometry={geom}>
      <meshPhysicalMaterial
        color="#cccccc"
        metalness={0.8}
        roughness={0.1}
        clearcoat={1}
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

export default function HeatDistortScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 4.5], fov: 45 }}>
      <color attach="background" args={["#08060c"]} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[4, 5, 5]} intensity={1.4} />
      <pointLight position={[0, -2, 0]} intensity={2} color="#ff4400" distance={5} />
      <Environment preset="warehouse" />
      <MeltingObject />
    </Canvas>
  );
}
