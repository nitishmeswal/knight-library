"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Sparkles } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

/**
 * OceanScene
 * ----------
 * A displaced plane acting as an ocean surface. Camera skims low over the
 * water. Scroll whips up the waves and raises the camera to reveal depth.
 */
function Ocean() {
  const mesh = useRef<THREE.Mesh>(null);
  const geom = useMemo(() => {
    const g = new THREE.PlaneGeometry(60, 60, 180, 180);
    (g as any).userData.base = new Float32Array(
      g.attributes.position.array as Float32Array
    );
    return g;
  }, []);

  useFrame(({ clock, camera }) => {
    const p = readProgressVar();
    const base = (geom as any).userData.base as Float32Array;
    const arr = geom.attributes.position.array as Float32Array;
    const t = clock.elapsedTime;
    const amp = THREE.MathUtils.lerp(0.2, 1.4, p);
    const chop = THREE.MathUtils.lerp(0.3, 1.2, p);

    for (let i = 0; i < arr.length; i += 3) {
      const x = base[i];
      const y = base[i + 1];
      arr[i + 2] =
        Math.sin(x * 0.35 + t * 1.2) * amp +
        Math.cos(y * 0.42 + t * 0.9) * amp * 0.8 +
        Math.sin((x + y) * 0.22 + t * 1.7) * amp * chop * 0.4;
    }
    geom.attributes.position.needsUpdate = true;
    geom.computeVertexNormals();

    camera.position.y = THREE.MathUtils.lerp(0.4, 3.5, p);
    camera.position.z = THREE.MathUtils.lerp(4, 6, p);
    camera.lookAt(0, 0, -2);
  });

  return (
    <group rotation-x={-Math.PI / 2.1}>
      <mesh ref={mesh} geometry={geom}>
        <meshPhysicalMaterial
          color="#1a3a6e"
          metalness={0.15}
          roughness={0.25}
          clearcoat={1}
          clearcoatRoughness={0.15}
          transmission={0.15}
          thickness={1}
        />
      </mesh>
    </group>
  );
}

export default function OceanScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0.4, 4], fov: 55 }}>
      <color attach="background" args={["#06101a"]} />
      <fog attach="fog" args={["#06101a", 6, 30]} />
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[8, 10, 4]}
        intensity={1.6}
        color="#ffd48a"
      />
      <Sparkles count={80} scale={[15, 2, 15]} size={2} speed={0.3} color="#cde7ff" />
      <Environment preset="sunset" />
      <Ocean />
    </Canvas>
  );
}
