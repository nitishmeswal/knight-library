"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

function Terrain() {
  const mesh = useRef<THREE.Mesh>(null);
  const geom = useMemo(() => {
    const g = new THREE.PlaneGeometry(30, 30, 200, 200);
    g.userData.base = new Float32Array(g.attributes.position.array as Float32Array);
    return g;
  }, []);

  useFrame(({ clock, camera }) => {
    const p = readProgressVar();
    const t = clock.elapsedTime;
    const base = geom.userData.base as Float32Array;
    const arr = geom.attributes.position.array as Float32Array;
    const chaos = THREE.MathUtils.lerp(0.3, 3, p);
    const detail = THREE.MathUtils.lerp(0.15, 0.6, p);

    for (let i = 0; i < arr.length; i += 3) {
      const x = base[i];
      const y = base[i + 1];
      const n1 = Math.sin(x * detail + t * 0.4) * Math.cos(y * detail + t * 0.3);
      const n2 = Math.sin(x * detail * 2.1 + t * 0.7) * Math.cos(y * detail * 1.8 + t * 0.5);
      const n3 = Math.sin((x + y) * detail * 0.7 + t * 0.9);
      arr[i + 2] = (n1 + n2 * 0.5 + n3 * 0.25) * chaos;
    }
    geom.attributes.position.needsUpdate = true;
    geom.computeVertexNormals();

    camera.position.set(0, THREE.MathUtils.lerp(3, 8, p), THREE.MathUtils.lerp(10, 5, p));
    camera.lookAt(0, 0, -3);
  });

  return (
    <group rotation-x={-Math.PI / 2.2}>
      <mesh ref={mesh} geometry={geom}>
        <meshStandardMaterial
          color="#2a1a4a"
          emissive="#0a0520"
          emissiveIntensity={0.3}
          roughness={0.6}
          metalness={0.2}
          flatShading
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh geometry={geom} position={[0, 0.01, 0]}>
        <meshBasicMaterial color="#7c5cff" wireframe transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

export default function NoiseTerrainScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 3, 10], fov: 55 }}>
      <color attach="background" args={["#04030c"]} />
      <fog attach="fog" args={["#04030c", 10, 35]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 8, 3]} intensity={1.4} color="#c9b8ff" />
      <Terrain />
    </Canvas>
  );
}
