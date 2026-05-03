"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * MorphShapeSection
 * -----------------
 * A single mesh whose vertices morph between two shapes (box <-> sphere)
 * based on scroll progress through the section.
 */
function MorphingMesh() {
  const mesh = useRef<THREE.Mesh>(null);

  const { basePositions, targetPositions, geometry } = useMemo(() => {
    const geometry = new THREE.IcosahedronGeometry(1.4, 6);
    const basePositions = new Float32Array(
      geometry.attributes.position.array as Float32Array
    );
    const targetPositions = new Float32Array(basePositions.length);
    const tmp = new THREE.Vector3();
    for (let i = 0; i < basePositions.length; i += 3) {
      tmp.set(
        basePositions[i],
        basePositions[i + 1],
        basePositions[i + 2]
      );
      // Target = cube projection (clamp to [-1,1])
      const m = Math.max(Math.abs(tmp.x), Math.abs(tmp.y), Math.abs(tmp.z));
      targetPositions[i] = (tmp.x / m) * 1.4;
      targetPositions[i + 1] = (tmp.y / m) * 1.4;
      targetPositions[i + 2] = (tmp.z / m) * 1.4;
    }
    return { basePositions, targetPositions, geometry };
  }, []);

  useFrame((_state, delta) => {
    const raw =
      document.documentElement.style.getPropertyValue("--morph-progress") ||
      "0";
    const p = Math.max(0, Math.min(1, parseFloat(raw) || 0));
    const arr = geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < arr.length; i++) {
      arr[i] = THREE.MathUtils.lerp(basePositions[i], targetPositions[i], p);
    }
    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();
    if (mesh.current) mesh.current.rotation.y += delta * 0.3;
  });

  return (
    <mesh ref={mesh} geometry={geometry}>
      <meshStandardMaterial
        color="#7c5cff"
        metalness={0.3}
        roughness={0.25}
        flatShading
      />
    </mesh>
  );
}

export default function MorphShapeSection() {
  const ref = useRef<HTMLElement>(null);

  useMemo(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.max(
        0,
        Math.min(1, (vh - rect.top) / (rect.height + vh))
      );
      document.documentElement.style.setProperty(
        "--morph-progress",
        p.toFixed(4)
      );
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={ref} className="relative h-[180vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[3, 4, 5]} intensity={1.4} />
            <MorphingMesh />
          </Canvas>
        </div>
        <div className="relative z-10 text-center pointer-events-none">
          <p className="eyebrow mb-4">Morph</p>
          <h2 className="headline">Sphere ⟷ Cube</h2>
        </div>
      </div>
    </section>
  );
}
