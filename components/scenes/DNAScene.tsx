"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

/**
 * DNAScene
 * --------
 * A double-helix of two color-coded strands connected by "rungs".
 * Scroll unravels the helix (pitch grows) and drops the rungs away.
 */
function Helix({ rungs = 40 }: { rungs?: number }) {
  const group = useRef<THREE.Group>(null);
  const strandA = useRef<THREE.InstancedMesh>(null);
  const strandB = useRef<THREE.InstancedMesh>(null);
  const rungMesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ camera }, delta) => {
    const p = readProgressVar();
    const turns = THREE.MathUtils.lerp(4, 1.2, p); // fewer turns = unravel
    const spread = THREE.MathUtils.lerp(0.9, 2.4, p);
    const heightPerRung = THREE.MathUtils.lerp(0.14, 0.32, p);

    if (group.current) group.current.rotation.y += delta * 0.35;

    for (let i = 0; i < rungs; i++) {
      const t = i / (rungs - 1);
      const y = (t - 0.5) * rungs * heightPerRung;
      const ang = t * turns * Math.PI * 2;

      // Strand A
      dummy.position.set(Math.cos(ang) * spread, y, Math.sin(ang) * spread);
      dummy.scale.setScalar(0.13);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      strandA.current?.setMatrixAt(i, dummy.matrix);

      // Strand B (opposite)
      dummy.position.set(
        Math.cos(ang + Math.PI) * spread,
        y,
        Math.sin(ang + Math.PI) * spread
      );
      dummy.updateMatrix();
      strandB.current?.setMatrixAt(i, dummy.matrix);

      // Rung between them
      const cx = 0;
      const cz = 0;
      const dx = Math.cos(ang) * spread - Math.cos(ang + Math.PI) * spread;
      const dz = Math.sin(ang) * spread - Math.sin(ang + Math.PI) * spread;
      const len = Math.hypot(dx, dz);
      dummy.position.set(cx, y, cz);
      dummy.rotation.set(0, -ang, Math.PI / 2);
      const fade = 1 - THREE.MathUtils.smoothstep(p, 0.3, 0.9);
      dummy.scale.set(0.04, len * 0.5, 0.04);
      dummy.scale.multiplyScalar(fade);
      dummy.updateMatrix();
      rungMesh.current?.setMatrixAt(i, dummy.matrix);
    }
    if (strandA.current) strandA.current.instanceMatrix.needsUpdate = true;
    if (strandB.current) strandB.current.instanceMatrix.needsUpdate = true;
    if (rungMesh.current) rungMesh.current.instanceMatrix.needsUpdate = true;

    camera.position.z = THREE.MathUtils.lerp(6, 8, p);
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={group}>
      <instancedMesh ref={strandA} args={[undefined, undefined, rungs]}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial color="#7c5cff" metalness={0.4} roughness={0.25} />
      </instancedMesh>
      <instancedMesh ref={strandB} args={[undefined, undefined, rungs]}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial color="#5cffd1" metalness={0.4} roughness={0.25} />
      </instancedMesh>
      <instancedMesh ref={rungMesh} args={[undefined, undefined, rungs]}>
        <cylinderGeometry args={[1, 1, 1, 10]} />
        <meshStandardMaterial color="#ffffff" opacity={0.7} transparent />
      </instancedMesh>
    </group>
  );
}

export default function DNAScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6], fov: 50 }}>
      <color attach="background" args={["#05050c"]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 5]} intensity={1.4} />
      <Environment preset="city" />
      <Helix />
    </Canvas>
  );
}
