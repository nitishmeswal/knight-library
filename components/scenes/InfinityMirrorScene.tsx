"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

/**
 * InfinityMirrorScene
 * -------------------
 * 40 nested wireframe boxes receding into the distance. Scroll moves the
 * entire stack forward while new rings spawn at the back — an endless
 * tunnel of shrinking frames.
 */
function Mirror({ count = 40 }: { count?: number }) {
  const group = useRef<THREE.Group>(null);

  const frames = useMemo(() => {
    return new Array(count).fill(0).map((_, i) => ({
      z: -i * 1.4,
      hue: (i / count) * 0.6 + 0.6,
    }));
  }, [count]);

  useFrame(({ clock }, delta) => {
    const p = readProgressVar();
    const speed = THREE.MathUtils.lerp(1, 6, p);
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      const m = child as THREE.Mesh;
      m.position.z += delta * speed;
      if (m.position.z > 2) m.position.z -= count * 1.4;

      const depth = -m.position.z; // 0..count*1.4
      const scale = 1 + depth * 0.08;
      m.scale.setScalar(scale);
      m.rotation.z = clock.elapsedTime * 0.1 + i * 0.12 + p * Math.PI;
      const mat = m.material as THREE.MeshBasicMaterial;
      mat.opacity = 1 - THREE.MathUtils.clamp(depth / (count * 1.4), 0, 0.85);
    });
  });

  return (
    <group ref={group}>
      {frames.map((f, i) => {
        const col = new THREE.Color().setHSL(f.hue, 0.65, 0.6);
        return (
          <mesh key={i} position={[0, 0, f.z]}>
            <torusGeometry args={[1.6, 0.04, 8, 64]} />
            <meshBasicMaterial color={col} transparent opacity={1} />
          </mesh>
        );
      })}
    </group>
  );
}

export default function InfinityMirrorScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 3], fov: 55 }}>
      <color attach="background" args={["#02020a"]} />
      <fog attach="fog" args={["#02020a", 8, 40]} />
      <Mirror />
    </Canvas>
  );
}
