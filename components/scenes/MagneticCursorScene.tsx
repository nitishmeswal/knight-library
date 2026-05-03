"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

function MagneticMesh() {
  const mesh = useRef<THREE.Mesh>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const geom = useMemo(() => new THREE.IcosahedronGeometry(1.5, 32), []);
  const basePositions = useMemo(
    () => new Float32Array(geom.attributes.position.array as Float32Array),
    [geom]
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  useFrame(({ camera }) => {
    const p = readProgressVar();
    const arr = geom.attributes.position.array as Float32Array;
    const mx = mouse.current.x * 2;
    const my = mouse.current.y * 2;
    const strength = THREE.MathUtils.lerp(0.1, 1.5, p);

    for (let i = 0; i < arr.length; i += 3) {
      const bx = basePositions[i];
      const by = basePositions[i + 1];
      const bz = basePositions[i + 2];
      const dx = bx - mx;
      const dy = by - my;
      const dist = Math.sqrt(dx * dx + dy * dy + bz * bz);
      const force = strength / Math.max(dist, 0.3);

      const nx = bx / Math.sqrt(bx * bx + by * by + bz * bz);
      const ny = by / Math.sqrt(bx * bx + by * by + bz * bz);
      const nz = bz / Math.sqrt(bx * bx + by * by + bz * bz);

      arr[i] = bx + nx * force * 0.3;
      arr[i + 1] = by + ny * force * 0.3;
      arr[i + 2] = bz + nz * force * 0.3;
    }
    geom.attributes.position.needsUpdate = true;
    geom.computeVertexNormals();

    if (mesh.current) mesh.current.rotation.y += 0.002;

    camera.position.z = THREE.MathUtils.lerp(5, 3.5, p);
    camera.lookAt(0, 0, 0);
  });

  return (
    <mesh ref={mesh} geometry={geom}>
      <meshPhysicalMaterial
        color="#8866ff"
        metalness={0.9}
        roughness={0.05}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </mesh>
  );
}

export default function MagneticCursorScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
      <color attach="background" args={["#05050c"]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 5]} intensity={1.5} />
      <Environment preset="studio" />
      <MagneticMesh />
    </Canvas>
  );
}
