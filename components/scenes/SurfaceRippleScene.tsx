"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

function RipplePlane() {
  const mesh = useRef<THREE.Mesh>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const geom = useMemo(() => {
    const g = new THREE.PlaneGeometry(8, 8, 120, 120);
    g.userData.base = new Float32Array(g.attributes.position.array as Float32Array);
    return g;
  }, []);

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
    const mx = mouse.current.x * 4;
    const my = mouse.current.y * 4;
    const strength = THREE.MathUtils.lerp(0.1, 1.5, p);

    for (let i = 0; i < arr.length; i += 3) {
      const x = base[i];
      const y = base[i + 1];
      const dx = x - mx;
      const dy = y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const ripple = Math.sin(dist * 4 - t * 6) * strength / (1 + dist);
      const ambient = Math.sin(x * 0.8 + t) * Math.cos(y * 0.8 + t * 0.7) * 0.05;
      arr[i + 2] = ripple + ambient;
    }
    geom.attributes.position.needsUpdate = true;
    geom.computeVertexNormals();

    camera.position.set(0, THREE.MathUtils.lerp(3, 1.5, p), THREE.MathUtils.lerp(5, 3, p));
    camera.lookAt(0, 0, 0);
  });

  return (
    <mesh ref={mesh} geometry={geom} rotation-x={-Math.PI / 3}>
      <meshPhysicalMaterial
        color="#2244aa"
        metalness={0.6}
        roughness={0.1}
        clearcoat={1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function SurfaceRippleScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 3, 5], fov: 50 }}>
      <color attach="background" args={["#04040c"]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 4]} intensity={1.4} />
      <Environment preset="studio" />
      <RipplePlane />
    </Canvas>
  );
}
