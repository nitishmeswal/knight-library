"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

const STRAND_POINTS = 60;
const STRAND_COUNT = 2;
const PULSE_COUNT = 800;

function DataHelix() {
  const strandA = useRef<THREE.InstancedMesh>(null);
  const strandB = useRef<THREE.InstancedMesh>(null);
  const pulses = useRef<THREE.Points>(null);
  const group = useRef<THREE.Group>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const pulsePositions = useMemo(() => new Float32Array(PULSE_COUNT * 3), []);

  useFrame(({ camera, clock }, delta) => {
    const p = readProgressVar();
    const t = clock.elapsedTime;
    const twist = THREE.MathUtils.lerp(2, 6, p);
    const radius = THREE.MathUtils.lerp(1.2, 0.8, p);

    if (group.current) group.current.rotation.y += delta * 0.2;

    for (let i = 0; i < STRAND_POINTS; i++) {
      const frac = i / (STRAND_POINTS - 1);
      const y = (frac - 0.5) * 8;
      const ang = frac * twist * Math.PI * 2 + t * 0.5;

      dummy.position.set(Math.cos(ang) * radius, y, Math.sin(ang) * radius);
      dummy.scale.setScalar(0.08);
      dummy.updateMatrix();
      strandA.current?.setMatrixAt(i, dummy.matrix);

      dummy.position.set(Math.cos(ang + Math.PI) * radius, y, Math.sin(ang + Math.PI) * radius);
      dummy.updateMatrix();
      strandB.current?.setMatrixAt(i, dummy.matrix);
    }
    if (strandA.current) strandA.current.instanceMatrix.needsUpdate = true;
    if (strandB.current) strandB.current.instanceMatrix.needsUpdate = true;

    const arr = pulsePositions;
    const speed = THREE.MathUtils.lerp(1, 4, p);
    for (let i = 0; i < PULSE_COUNT; i++) {
      const frac = ((i / PULSE_COUNT + t * speed * 0.05) % 1);
      const y = (frac - 0.5) * 8;
      const ang = frac * twist * Math.PI * 2 + t * 0.5;
      const strandOffset = i % 2 === 0 ? 0 : Math.PI;
      const r = radius + (Math.random() - 0.5) * 0.15;
      arr[i * 3] = Math.cos(ang + strandOffset) * r;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = Math.sin(ang + strandOffset) * r;
    }
    if (pulses.current) {
      pulses.current.geometry.attributes.position.needsUpdate = true;
    }

    camera.position.z = THREE.MathUtils.lerp(7, 4, p);
    camera.position.y = Math.sin(p * Math.PI) * 1.5;
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={group}>
      <instancedMesh ref={strandA} args={[undefined, undefined, STRAND_POINTS]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#00ccff" emissive="#004488" emissiveIntensity={0.5} metalness={0.6} roughness={0.2} />
      </instancedMesh>
      <instancedMesh ref={strandB} args={[undefined, undefined, STRAND_POINTS]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#ff44cc" emissive="#440022" emissiveIntensity={0.5} metalness={0.6} roughness={0.2} />
      </instancedMesh>
      <points ref={pulses}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pulsePositions, 3]} count={PULSE_COUNT} />
        </bufferGeometry>
        <pointsMaterial size={0.03} color="#aaffee" transparent opacity={0.8} blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
    </group>
  );
}

export default function DataStreamScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 7], fov: 50 }}>
      <color attach="background" args={["#02020a"]} />
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 4, 0]} intensity={2} color="#00ccff" />
      <pointLight position={[0, -4, 0]} intensity={2} color="#ff44cc" />
      <DataHelix />
    </Canvas>
  );
}
