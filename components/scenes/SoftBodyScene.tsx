"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

function JellyCube() {
  const mesh = useRef<THREE.Mesh>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const geom = useMemo(() => new THREE.BoxGeometry(2, 2, 2, 16, 16, 16), []);
  const basePositions = useMemo(
    () => new Float32Array(geom.attributes.position.array as Float32Array),
    [geom]
  );
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
    const arr = geom.attributes.position.array as Float32Array;
    const jiggle = THREE.MathUtils.lerp(0.01, 0.15, p);
    const mx = mouse.current.x * 2;
    const my = mouse.current.y * 2;

    for (let i = 0; i < arr.length; i += 3) {
      const bx = basePositions[i];
      const by = basePositions[i + 1];
      const bz = basePositions[i + 2];

      const dx = bx - mx;
      const dy = by - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const impact = jiggle * 2 / Math.max(dist, 0.5);

      const spring = 0.15;
      const damping = 0.85;

      for (let axis = 0; axis < 3; axis++) {
        const base = basePositions[i + axis];
        const current = arr[i + axis];
        const noise = Math.sin(base * 3 + t * 2 + axis) * jiggle;
        const target = base + noise + (axis === 2 ? impact * 0.2 : 0);
        const force = (target - current) * spring;
        velocities[i + axis] = (velocities[i + axis] + force) * damping;
        arr[i + axis] = current + velocities[i + axis];
      }
    }
    geom.attributes.position.needsUpdate = true;
    geom.computeVertexNormals();

    if (mesh.current) {
      mesh.current.rotation.y += 0.003;
      mesh.current.rotation.x = Math.sin(t * 0.5) * 0.1;
    }

    camera.position.z = THREE.MathUtils.lerp(5, 3.5, p);
    camera.lookAt(0, 0, 0);
  });

  return (
    <mesh ref={mesh} geometry={geom}>
      <meshPhysicalMaterial
        color="#44aaff"
        metalness={0.1}
        roughness={0.15}
        clearcoat={1}
        transmission={0.3}
        thickness={1}
      />
    </mesh>
  );
}

export default function SoftBodyScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
      <color attach="background" args={["#05050c"]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 5, 5]} intensity={1.4} />
      <Environment preset="studio" />
      <JellyCube />
    </Canvas>
  );
}
