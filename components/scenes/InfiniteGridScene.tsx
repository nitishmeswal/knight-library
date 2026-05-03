"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

function WavingGrid() {
  const mesh = useRef<THREE.Mesh>(null);
  const geom = useMemo(() => {
    const g = new THREE.PlaneGeometry(60, 60, 160, 160);
    const base = new Float32Array(g.attributes.position.array as Float32Array);
    g.userData.base = base;
    return g;
  }, []);

  useFrame(({ clock, camera }) => {
    const p = readProgressVar();
    const t = clock.elapsedTime;
    const base = geom.userData.base as Float32Array;
    const arr = geom.attributes.position.array as Float32Array;
    const amp = THREE.MathUtils.lerp(0.2, 2, p);
    const freq = THREE.MathUtils.lerp(0.3, 0.8, p);

    for (let i = 0; i < arr.length; i += 3) {
      const x = base[i];
      const y = base[i + 1];
      arr[i + 2] =
        Math.sin(x * freq + t * 1.5) * amp +
        Math.cos(y * freq * 0.8 + t * 1.1) * amp * 0.6 +
        Math.sin((x + y) * freq * 0.4 + t * 2) * amp * 0.3;
    }
    geom.attributes.position.needsUpdate = true;
    geom.computeVertexNormals();

    const dive = THREE.MathUtils.smoothstep(p, 0.5, 1);
    camera.position.set(0, THREE.MathUtils.lerp(5, 1.5, dive), THREE.MathUtils.lerp(8, 3, dive));
    camera.lookAt(0, 0, -5);
  });

  return (
    <group rotation-x={-Math.PI / 2}>
      <mesh ref={mesh} geometry={geom}>
        <meshBasicMaterial color="#7c5cff" wireframe transparent opacity={0.7} />
      </mesh>
      <mesh geometry={geom} position={[0, -0.02, 0]}>
        <meshStandardMaterial
          color="#0a0618"
          emissive="#15083a"
          emissiveIntensity={0.5}
          side={THREE.DoubleSide}
          flatShading
        />
      </mesh>
    </group>
  );
}

export default function InfiniteGridScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 5, 8], fov: 55 }}>
      <color attach="background" args={["#02020a"]} />
      <fog attach="fog" args={["#02020a", 8, 35]} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[0, 8, 4]} intensity={0.8} />
      <WavingGrid />
    </Canvas>
  );
}
