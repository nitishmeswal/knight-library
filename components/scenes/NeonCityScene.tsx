"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

/**
 * NeonCityScene
 * -------------
 * Low-poly neon city. A grid of buildings of varying heights with glowing
 * tops. Camera flies forward over the skyline as scroll progresses;
 * ambient fog is pure synthwave.
 */
function City({ size = 28 }: { size?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const heights = useMemo(() => {
    const arr: number[] = [];
    for (let i = 0; i < size * size; i++) {
      const n = Math.random();
      arr.push(0.4 + Math.pow(n, 2.2) * 4);
    }
    return arr;
  }, [size]);

  useFrame(({ camera, clock }) => {
    const p = readProgressVar();
    let k = 0;
    for (let z = 0; z < size; z++) {
      for (let x = 0; x < size; x++) {
        const h = heights[k];
        const wx = (x - size / 2) * 1.4;
        const wz = (z - size / 2) * 1.4 - p * size * 1.4;
        // Wrap around behind camera
        const zOff = ((wz + 50) % (size * 1.4)) - 25;
        dummy.position.set(wx, h / 2, zOff);
        dummy.scale.set(1, h, 1);
        dummy.updateMatrix();
        mesh.current?.setMatrixAt(k, dummy.matrix);

        const hue = ((x + z) / size + clock.elapsedTime * 0.03) % 1;
        const c = new THREE.Color().setHSL(0.75 - hue * 0.15, 0.75, 0.55);
        mesh.current?.setColorAt(k, c);
        k++;
      }
    }
    if (mesh.current) {
      mesh.current.instanceMatrix.needsUpdate = true;
      if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
    }

    camera.position.y = THREE.MathUtils.lerp(1.6, 6, p);
    camera.position.z = THREE.MathUtils.lerp(8, 4, p);
    camera.lookAt(0, 2, -6);
  });

  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.01, 0]}>
        <planeGeometry args={[200, 200]} />
        <meshBasicMaterial color="#0a0216" />
      </mesh>
      {/* Grid lines */}
      <gridHelper args={[200, 80, "#ff2e87", "#2e0a3a"]} position={[0, 0, 0]} />
      <instancedMesh ref={mesh} args={[undefined, undefined, size * size]}>
        <boxGeometry args={[0.9, 1, 0.9]} />
        <meshStandardMaterial
          roughness={0.3}
          metalness={0.5}
          emissiveIntensity={0.8}
        />
      </instancedMesh>
    </group>
  );
}

export default function NeonCityScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 2, 8], fov: 60 }}>
      <color attach="background" args={["#09021a"]} />
      <fog attach="fog" args={["#09021a", 10, 40]} />
      <ambientLight intensity={0.25} />
      <pointLight position={[0, 6, -6]} intensity={2} color="#ff2e87" />
      <pointLight position={[0, 6, 6]} intensity={2} color="#2ee8ff" />
      <City />
    </Canvas>
  );
}
