"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

const STRAND_COUNT = 8;
const SEGMENTS = 30;

function Tendrils() {
  const group = useRef<THREE.Group>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const strands = useMemo(() => {
    return Array.from({ length: STRAND_COUNT }, (_, i) => ({
      angle: (i / STRAND_COUNT) * Math.PI * 2,
      positions: Array.from({ length: SEGMENTS }, () => new THREE.Vector3()),
      velocities: Array.from({ length: SEGMENTS }, () => new THREE.Vector3()),
    }));
  }, []);

  useFrame(({ clock }) => {
    const p = readProgressVar();
    const t = clock.elapsedTime;
    const target = new THREE.Vector3(mouse.current.x * 3, mouse.current.y * 2, 0);
    const elasticity = THREE.MathUtils.lerp(0.02, 0.12, p);
    const damping = 0.92;

    for (let s = 0; s < STRAND_COUNT; s++) {
      const strand = strands[s];
      const baseAng = strand.angle + t * 0.3;
      const baseR = 0.5;
      strand.positions[0].set(Math.cos(baseAng) * baseR, Math.sin(baseAng) * baseR, 0);

      for (let i = 1; i < SEGMENTS; i++) {
        const pos = strand.positions[i];
        const vel = strand.velocities[i];
        const prev = strand.positions[i - 1];

        const toTarget = target.clone().sub(pos).multiplyScalar(elasticity * 0.3);
        const toPrev = prev.clone().sub(pos).multiplyScalar(elasticity);
        vel.add(toTarget).add(toPrev).multiplyScalar(damping);
        pos.add(vel);

        const maxDist = 0.3;
        const diff = pos.clone().sub(prev);
        if (diff.length() > maxDist) {
          pos.copy(prev).add(diff.normalize().multiplyScalar(maxDist));
        }
      }

      const curve = new THREE.CatmullRomCurve3(strand.positions);
      const geom = new THREE.TubeGeometry(curve, SEGMENTS, 0.02 + p * 0.02, 6, false);
      const ref = meshRefs.current[s];
      if (ref) {
        ref.geometry.dispose();
        ref.geometry = geom;
      }
    }
  });

  const colors = ["#ff5588", "#5588ff", "#55ff88", "#ffcc55", "#cc55ff", "#55ffcc", "#ff8855", "#8855ff"];

  return (
    <group ref={group}>
      {strands.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => { meshRefs.current[i] = el; }}
        >
          <meshStandardMaterial
            color={colors[i]}
            metalness={0.4}
            roughness={0.2}
            emissive={colors[i]}
            emissiveIntensity={0.15}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function RopePhysicsScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 50 }}>
      <color attach="background" args={["#05050c"]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 4, 5]} intensity={1.2} />
      <Environment preset="night" />
      <Tendrils />
    </Canvas>
  );
}
