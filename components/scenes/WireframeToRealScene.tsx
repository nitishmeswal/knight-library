"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

function TransformObject() {
  const group = useRef<THREE.Group>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const solidRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null);

  useFrame(({ camera }, delta) => {
    const p = readProgressVar();
    if (group.current) {
      group.current.rotation.y += delta * 0.25;
      group.current.rotation.x = Math.sin(p * Math.PI) * 0.3;
    }

    if (wireRef.current) {
      (wireRef.current.material as THREE.MeshBasicMaterial).opacity =
        THREE.MathUtils.lerp(1, 0, p);
    }

    if (matRef.current) {
      matRef.current.opacity = THREE.MathUtils.lerp(0, 1, p);
      matRef.current.metalness = THREE.MathUtils.lerp(0, 0.95, p);
      matRef.current.roughness = THREE.MathUtils.lerp(0.8, 0.02, p);
      matRef.current.clearcoat = p;
      const c = new THREE.Color().lerpColors(
        new THREE.Color("#333355"),
        new THREE.Color("#ffffff"),
        p
      );
      matRef.current.color.copy(c);
    }

    camera.position.z = THREE.MathUtils.lerp(5, 3.5, p);
    camera.position.y = Math.sin(p * Math.PI * 2) * 0.5;
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={group}>
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.5, 3]} />
        <meshBasicMaterial color="#7c5cff" wireframe transparent opacity={1} />
      </mesh>
      <mesh ref={solidRef} scale={1.001}>
        <icosahedronGeometry args={[1.5, 3]} />
        <meshPhysicalMaterial
          ref={matRef}
          color="#333355"
          transparent
          opacity={0}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </group>
  );
}

export default function WireframeToRealScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
      <color attach="background" args={["#05050c"]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 4, 6]} intensity={1.6} color="#c9b8ff" />
      <directionalLight position={[-4, -2, 3]} intensity={0.8} color="#5cffd1" />
      <Environment preset="studio" />
      <TransformObject />
    </Canvas>
  );
}
