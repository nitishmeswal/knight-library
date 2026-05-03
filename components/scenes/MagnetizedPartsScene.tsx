"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

const PART_COUNT = 40;

function FloatingParts() {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tmpColor = useMemo(() => new THREE.Color(), []);
  const mouse = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const parts = useMemo(() => {
    return Array.from({ length: PART_COUNT }, (_, i) => ({
      orbitAngle: (i / PART_COUNT) * Math.PI * 2,
      orbitRadius: 1.5 + Math.random() * 1.5,
      orbitSpeed: 0.3 + Math.random() * 0.5,
      yOffset: (Math.random() - 0.5) * 2,
      size: 0.1 + Math.random() * 0.2,
      hue: Math.random(),
      pos: new THREE.Vector3(),
    }));
  }, []);

  useFrame(({ camera, clock }) => {
    const p = readProgressVar();
    const t = clock.elapsedTime;
    const mx = mouse.current.x * 3;
    const my = mouse.current.y * 2;
    const pullStrength = THREE.MathUtils.lerp(0, 2, p);

    for (let i = 0; i < PART_COUNT; i++) {
      const part = parts[i];
      const ang = part.orbitAngle + t * part.orbitSpeed;
      const baseX = Math.cos(ang) * part.orbitRadius;
      const baseY = part.yOffset + Math.sin(t * 0.5 + i) * 0.2;
      const baseZ = Math.sin(ang) * part.orbitRadius;

      const dx = mx - baseX;
      const dy = my - baseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const pull = pullStrength / Math.max(dist, 0.8);

      part.pos.set(baseX + dx * pull * 0.3, baseY + dy * pull * 0.3, baseZ);
      dummy.position.copy(part.pos);
      dummy.rotation.set(t + i, t * 0.7 + i, t * 0.5);
      dummy.scale.setScalar(part.size);
      dummy.updateMatrix();
      mesh.current?.setMatrixAt(i, dummy.matrix);

      tmpColor.setHSL(part.hue, 0.6, 0.5);
      mesh.current?.setColorAt(i, tmpColor);
    }
    if (mesh.current) {
      mesh.current.instanceMatrix.needsUpdate = true;
      if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
    }

    camera.position.z = THREE.MathUtils.lerp(6, 4, p);
    camera.lookAt(0, 0, 0);
  });

  return (
    <group>
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#ffffff" emissive="#7c5cff" emissiveIntensity={0.8} />
      </mesh>
      <instancedMesh ref={mesh} args={[undefined, undefined, PART_COUNT]}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial metalness={0.6} roughness={0.2} />
      </instancedMesh>
    </group>
  );
}

export default function MagnetizedPartsScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6], fov: 50 }}>
      <color attach="background" args={["#05050c"]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 4]} intensity={1.3} />
      <Environment preset="city" />
      <FloatingParts />
    </Canvas>
  );
}
