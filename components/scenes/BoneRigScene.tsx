"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

const SEGMENT_COUNT = 12;

function OrganicLimb() {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const group = useRef<THREE.Group>(null);

  useFrame(({ camera, clock }, delta) => {
    const p = readProgressVar();
    const t = clock.elapsedTime;
    const poseBlend = p;

    if (group.current) group.current.rotation.y += delta * 0.1;

    let prevX = 0;
    let prevY = -2;
    let prevAngle = 0;

    for (let i = 0; i < SEGMENT_COUNT; i++) {
      const frac = i / (SEGMENT_COUNT - 1);
      const segLen = 0.35;
      const wave = Math.sin(frac * Math.PI * 2 + t * 2) * poseBlend * 0.5;
      const curl = frac * poseBlend * 1.2;
      const angle = prevAngle + wave + curl * 0.3;

      const x = prevX + Math.sin(angle) * segLen;
      const y = prevY + Math.cos(angle) * segLen;

      dummy.position.set(x, y, 0);
      dummy.rotation.set(0, 0, -angle);
      const thickness = THREE.MathUtils.lerp(0.15, 0.05, frac);
      dummy.scale.set(thickness, segLen, thickness);
      dummy.updateMatrix();
      mesh.current?.setMatrixAt(i, dummy.matrix);

      prevX = x;
      prevY = y;
      prevAngle = angle;
    }
    if (mesh.current) mesh.current.instanceMatrix.needsUpdate = true;

    camera.position.set(0, 0, THREE.MathUtils.lerp(5, 3.5, p));
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={group}>
      <instancedMesh ref={mesh} args={[undefined, undefined, SEGMENT_COUNT]}>
        <capsuleGeometry args={[1, 1, 8, 16]} />
        <meshStandardMaterial color="#cc8866" metalness={0.3} roughness={0.4} />
      </instancedMesh>
    </group>
  );
}

export default function BoneRigScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
      <color attach="background" args={["#06060c"]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 5, 4]} intensity={1.3} />
      <Environment preset="city" />
      <OrganicLimb />
    </Canvas>
  );
}
