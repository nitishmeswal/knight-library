"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

function Eye() {
  const eyeGroup = useRef<THREE.Group>(null);
  const iris = useRef<THREE.Mesh>(null);
  const pupil = useRef<THREE.Mesh>(null);
  const outerLid = useRef<THREE.Mesh>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  useFrame(({ camera, clock }) => {
    const p = readProgressVar();
    const t = clock.elapsedTime;
    const lookX = mouse.current.x * 0.3;
    const lookY = mouse.current.y * 0.2;

    if (iris.current) {
      iris.current.position.x = THREE.MathUtils.lerp(iris.current.position.x, lookX, 0.08);
      iris.current.position.y = THREE.MathUtils.lerp(iris.current.position.y, lookY, 0.08);
    }
    if (pupil.current) {
      pupil.current.position.x = THREE.MathUtils.lerp(pupil.current.position.x, lookX, 0.08);
      pupil.current.position.y = THREE.MathUtils.lerp(pupil.current.position.y, lookY, 0.08);
      const pupilScale = THREE.MathUtils.lerp(0.25, 0.15, p);
      pupil.current.scale.setScalar(pupilScale);
    }

    const blink = Math.random() < 0.003 ? 1 : 0;
    if (outerLid.current) {
      const target = blink ? 0.01 : 1;
      const current = outerLid.current.scale.y;
      outerLid.current.scale.y = THREE.MathUtils.lerp(current, target, 0.3);
    }

    const zoom = THREE.MathUtils.lerp(4, 1.5, p);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, zoom, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={eyeGroup}>
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color="#f0e8e0" roughness={0.3} metalness={0.05} />
      </mesh>
      <mesh ref={iris} position={[0, 0, 0.85]}>
        <circleGeometry args={[0.4, 64]} />
        <meshStandardMaterial color="#2266aa" emissive="#113355" emissiveIntensity={0.5} />
      </mesh>
      <mesh ref={pupil} position={[0, 0, 0.86]}>
        <circleGeometry args={[1, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh ref={outerLid} position={[0, 0.6, 0.3]}>
        <sphereGeometry args={[0.85, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#d0c0b0" roughness={0.5} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0, 0]} scale={[1.05, 1.05, 1.05]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#8a6655" roughness={0.8} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

export default function MechanicalEyeScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 45 }}>
      <color attach="background" args={["#0a0a12"]} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 3, 5]} intensity={1.4} />
      <pointLight position={[0, 0, 3]} intensity={1} color="#4488cc" />
      <Environment preset="studio" />
      <Eye />
    </Canvas>
  );
}
