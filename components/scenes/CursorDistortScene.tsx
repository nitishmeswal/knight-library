"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

function DistortMesh() {
  const mesh = useRef<THREE.Mesh>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const geom = useMemo(() => new THREE.PlaneGeometry(6, 6, 100, 100), []);
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

  useFrame(({ clock }) => {
    const p = readProgressVar();
    const arr = geom.attributes.position.array as Float32Array;
    const t = clock.elapsedTime;
    const mx = mouse.current.x * 3;
    const my = mouse.current.y * 3;
    const strength = THREE.MathUtils.lerp(0.3, 2.5, p);

    for (let i = 0; i < arr.length; i += 3) {
      const bx = basePositions[i];
      const by = basePositions[i + 1];
      const dx = bx - mx;
      const dy = by - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const ripple = Math.sin(dist * 3 - t * 4) / (1 + dist * 2);
      const wave = Math.sin(bx * 1.5 + t) * Math.cos(by * 1.5 + t * 0.7) * 0.1;
      arr[i + 2] = (ripple * strength + wave) * 0.5;
    }
    geom.attributes.position.needsUpdate = true;
    geom.computeVertexNormals();
  });

  return (
    <mesh ref={mesh} geometry={geom}>
      <meshPhysicalMaterial
        color="#7c5cff"
        metalness={0.7}
        roughness={0.1}
        clearcoat={1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function CursorDistortScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 4.5], fov: 50 }}>
      <color attach="background" args={["#05050c"]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 5, 4]} intensity={1.4} />
      <Environment preset="studio" />
      <DistortMesh />
    </Canvas>
  );
}
