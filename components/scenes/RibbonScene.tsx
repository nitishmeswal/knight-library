"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

/**
 * RibbonScene
 * -----------
 * Silk ribbons flowing along animated helical paths. Scroll increases the
 * twist frequency and pulls the ribbons inward, then scatters them outward.
 * Each ribbon is a live-updated TubeGeometry.
 */
function Ribbon({
  seed = 0,
  color = "#7c5cff",
}: {
  seed?: number;
  color?: string;
}) {
  const ref = useRef<THREE.Mesh>(null);

  const buildCurve = (time: number, twist: number, spread: number) => {
    const pts: THREE.Vector3[] = [];
    const N = 80;
    for (let i = 0; i < N; i++) {
      const t = i / (N - 1);
      const a = t * Math.PI * 2 * twist + time + seed * 1.7;
      const r = spread * (0.6 + 0.4 * Math.sin(t * Math.PI + seed));
      pts.push(
        new THREE.Vector3(
          Math.cos(a) * r,
          (t - 0.5) * 4 + Math.sin(time * 0.8 + seed) * 0.4,
          Math.sin(a) * r
        )
      );
    }
    return new THREE.CatmullRomCurve3(pts);
  };

  useFrame(({ clock }) => {
    const p = readProgressVar();
    const twist = THREE.MathUtils.lerp(1.2, 4.5, Math.abs(p - 0.5) * 2);
    const spread = THREE.MathUtils.lerp(0.8, 2.6, Math.abs(p - 0.5) * 2);
    const curve = buildCurve(clock.elapsedTime * 0.4, twist, spread);
    const geom = new THREE.TubeGeometry(curve, 80, 0.035, 8, false);
    if (ref.current) {
      ref.current.geometry.dispose();
      ref.current.geometry = geom;
    }
  });

  return (
    <mesh ref={ref}>
      <meshStandardMaterial
        color={color}
        metalness={0.4}
        roughness={0.15}
        emissive={color}
        emissiveIntensity={0.18}
      />
    </mesh>
  );
}

export default function RibbonScene() {
  const group = useRef<THREE.Group>(null);
  const colors = useMemo(
    () => ["#7c5cff", "#5cffd1", "#ff7c5c", "#c9b8ff", "#ffffff"],
    []
  );

  useFrame(({ camera }, delta) => {
    const p = readProgressVar();
    if (group.current) group.current.rotation.y += delta * 0.15;
    camera.position.z = THREE.MathUtils.lerp(6, 4.2, Math.sin(p * Math.PI));
    camera.position.y = (p - 0.5) * 0.8;
    camera.lookAt(0, 0, 0);
  });

  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6], fov: 45 }}>
      <color attach="background" args={["#05050c"]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 4, 5]} intensity={1.2} />
      <Environment preset="night" />
      <group ref={group}>
        {colors.map((c, i) => (
          <Ribbon key={i} seed={i} color={c} />
        ))}
      </group>
    </Canvas>
  );
}
