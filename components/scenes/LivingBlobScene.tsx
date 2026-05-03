"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

function BreathingBlob() {
  const mesh = useRef<THREE.Mesh>(null);
  const geom = useMemo(() => new THREE.SphereGeometry(1.3, 64, 64), []);
  const basePositions = useMemo(
    () => new Float32Array(geom.attributes.position.array as Float32Array),
    [geom]
  );

  useFrame(({ clock, camera }) => {
    const p = readProgressVar();
    const t = clock.elapsedTime;
    const arr = geom.attributes.position.array as Float32Array;
    const stress = THREE.MathUtils.lerp(0.05, 0.5, p);
    const breathRate = THREE.MathUtils.lerp(1, 4, p);
    const breath = Math.sin(t * breathRate) * 0.15 + 1;

    for (let i = 0; i < arr.length; i += 3) {
      const bx = basePositions[i];
      const by = basePositions[i + 1];
      const bz = basePositions[i + 2];
      const noise =
        Math.sin(bx * 3 + t * 1.5) * Math.cos(by * 2.8 + t * 1.2) * Math.sin(bz * 3.2 + t) * stress;
      const len = Math.sqrt(bx * bx + by * by + bz * bz);
      const scale = breath + noise;
      arr[i] = (bx / len) * len * scale;
      arr[i + 1] = (by / len) * len * scale;
      arr[i + 2] = (bz / len) * len * scale;
    }
    geom.attributes.position.needsUpdate = true;
    geom.computeVertexNormals();

    if (mesh.current) {
      mesh.current.rotation.y += 0.003;
      const mat = mesh.current.material as THREE.MeshPhysicalMaterial;
      mat.color.lerpColors(
        new THREE.Color("#44cc88"),
        new THREE.Color("#ff4466"),
        p
      );
    }

    camera.position.z = THREE.MathUtils.lerp(4.5, 3, p);
    camera.lookAt(0, 0, 0);
  });

  return (
    <mesh ref={mesh} geometry={geom}>
      <meshPhysicalMaterial
        color="#44cc88"
        metalness={0.3}
        roughness={0.15}
        clearcoat={1}
        transmission={0.15}
        thickness={1}
      />
    </mesh>
  );
}

export default function LivingBlobScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 4.5], fov: 45 }}>
      <color attach="background" args={["#05050c"]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 4]} intensity={1.3} />
      <Environment preset="sunset" />
      <BreathingBlob />
    </Canvas>
  );
}
