"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

function GlassOrb() {
  const mesh = useRef<THREE.Mesh>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const geom = useMemo(() => new THREE.SphereGeometry(1.4, 64, 64), []);
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

  useFrame(({ clock, camera }) => {
    const p = readProgressVar();
    const t = clock.elapsedTime;
    const arr = geom.attributes.position.array as Float32Array;
    const distort = THREE.MathUtils.lerp(0.02, 0.2, p);
    const mx = mouse.current.x * 2;
    const my = mouse.current.y * 2;

    for (let i = 0; i < arr.length; i += 3) {
      const bx = basePositions[i];
      const by = basePositions[i + 1];
      const bz = basePositions[i + 2];
      const len = Math.sqrt(bx * bx + by * by + bz * bz);

      const dx = bx - mx;
      const dy = by - my;
      const mouseDist = Math.sqrt(dx * dx + dy * dy);
      const mouseEffect = distort * 2 / Math.max(mouseDist, 0.5);

      const noise = Math.sin(bx * 3 + t) * Math.cos(by * 3 + t * 1.2) * distort;

      const displacement = noise + mouseEffect * 0.1;
      arr[i] = bx + (bx / len) * displacement;
      arr[i + 1] = by + (by / len) * displacement;
      arr[i + 2] = bz + (bz / len) * displacement;
    }
    geom.attributes.position.needsUpdate = true;
    geom.computeVertexNormals();

    if (mesh.current) mesh.current.rotation.y += 0.002;

    camera.position.z = THREE.MathUtils.lerp(4.5, 3, p);
    camera.lookAt(0, 0, 0);
  });

  return (
    <mesh ref={mesh} geometry={geom}>
      <meshPhysicalMaterial
        color="#e0eeff"
        transmission={0.95}
        thickness={1.5}
        roughness={0.02}
        metalness={0}
        ior={2.0}
        transparent
        clearcoat={1}
      />
    </mesh>
  );
}

export default function LiquidGlassScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 4.5], fov: 45 }}>
      <color attach="background" args={["#08081a"]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <pointLight position={[-3, -2, 2]} intensity={1} color="#ff88cc" />
      <Environment preset="studio" />
      <GlassOrb />
    </Canvas>
  );
}
