"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

/**
 * HoloGridScene
 * -------------
 * An infinite holographic plane grid that waves. Scroll amplifies wave
 * height and tilts the camera for a sci-fi dashboard feel.
 */
function Grid() {
  const mesh = useRef<THREE.Mesh>(null);

  const geom = useMemo(() => {
    const g = new THREE.PlaneGeometry(40, 40, 120, 120);
    (g as any).userData.basePositions = new Float32Array(
      g.attributes.position.array as Float32Array
    );
    return g;
  }, []);

  useFrame(({ clock, camera }, delta) => {
    const p = readProgressVar();
    const amp = THREE.MathUtils.lerp(0.15, 1.4, p);
    const speed = THREE.MathUtils.lerp(0.6, 2.2, p);
    const t = clock.elapsedTime * speed;

    const base = (geom as any).userData.basePositions as Float32Array;
    const arr = geom.attributes.position.array as Float32Array;
    for (let i = 0; i < arr.length; i += 3) {
      const x = base[i];
      const y = base[i + 1];
      arr[i + 2] =
        Math.sin(x * 0.6 + t) * amp +
        Math.cos(y * 0.5 + t * 0.8) * amp * 0.8;
    }
    geom.attributes.position.needsUpdate = true;
    geom.computeVertexNormals();

    if (mesh.current) mesh.current.rotation.z += delta * 0.03;

    camera.position.y = THREE.MathUtils.lerp(2.2, 4, p);
    camera.position.z = THREE.MathUtils.lerp(6, 4, p);
    camera.lookAt(0, 0, 0);
  });

  return (
    <group rotation-x={-Math.PI / 2.4}>
      <mesh ref={mesh} geometry={geom}>
        <meshBasicMaterial color="#7c5cff" wireframe transparent opacity={0.85} />
      </mesh>
      <mesh geometry={geom} position={[0, -0.01, 0]}>
        <meshStandardMaterial
          color="#0a0618"
          emissive="#20104a"
          emissiveIntensity={0.6}
          flatShading
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export default function HoloGridScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 2.2, 6], fov: 55 }}>
      <color attach="background" args={["#02020a"]} />
      <fog attach="fog" args={["#02020a", 10, 30]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[0, 8, 4]} intensity={0.8} />
      <Grid />
    </Canvas>
  );
}
