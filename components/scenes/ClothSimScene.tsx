"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

function Cloth() {
  const mesh = useRef<THREE.Mesh>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const geom = useMemo(() => {
    const g = new THREE.PlaneGeometry(4, 4, 50, 50);
    g.userData.base = new Float32Array(g.attributes.position.array as Float32Array);
    return g;
  }, []);

  const velocities = useMemo(
    () => new Float32Array(geom.attributes.position.array.length).fill(0),
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

  useFrame(({ clock, camera }) => {
    const p = readProgressVar();
    const t = clock.elapsedTime;
    const base = geom.userData.base as Float32Array;
    const arr = geom.attributes.position.array as Float32Array;
    const turbulence = THREE.MathUtils.lerp(0.05, 0.8, p);
    const windX = Math.sin(t * 1.5) * turbulence;
    const windY = Math.cos(t * 1.2) * turbulence * 0.5;

    for (let i = 0; i < arr.length; i += 3) {
      const bx = base[i];
      const by = base[i + 1];
      const isFixed = by > 1.8;

      if (isFixed) {
        arr[i] = bx;
        arr[i + 1] = by;
        arr[i + 2] = 0;
        continue;
      }

      const wind = Math.sin(bx * 2 + t * 3) * windX + Math.cos(by * 2 + t * 2) * windY;
      const gravity = -0.02;
      const spring = 0.1;
      const damping = 0.9;

      const targetZ = wind + Math.sin(bx * 3 + by * 2 + t * 4) * turbulence * 0.3;
      const force = (targetZ - arr[i + 2]) * spring + gravity;
      velocities[i + 2] = (velocities[i + 2] + force) * damping;
      arr[i + 2] += velocities[i + 2];
      arr[i] = bx + Math.sin(t + by) * turbulence * 0.1;
      arr[i + 1] = by + velocities[i + 2] * 0.1;
    }
    geom.attributes.position.needsUpdate = true;
    geom.computeVertexNormals();

    camera.position.set(0, 0, THREE.MathUtils.lerp(5, 3, p));
    camera.lookAt(0, 0, 0);
  });

  return (
    <mesh ref={mesh} geometry={geom}>
      <meshPhysicalMaterial
        color="#cc4488"
        metalness={0.1}
        roughness={0.3}
        side={THREE.DoubleSide}
        clearcoat={0.3}
      />
    </mesh>
  );
}

export default function ClothSimScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
      <color attach="background" args={["#06060c"]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 5, 4]} intensity={1.3} />
      <Environment preset="studio" />
      <Cloth />
    </Canvas>
  );
}
