"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

/**
 * TunnelScene
 * -----------
 * Camera flies along a curved 3D tube based on scroll. Rings of light
 * pass by. A true cinematic flythrough.
 */
function Tunnel() {
  const ringsRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const curve = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 40; i++) {
      const t = i / 40;
      pts.push(
        new THREE.Vector3(
          Math.sin(t * Math.PI * 2) * 3,
          Math.cos(t * Math.PI * 3) * 2,
          -t * 80
        )
      );
    }
    return new THREE.CatmullRomCurve3(pts);
  }, []);

  const tubeGeom = useMemo(
    () => new THREE.TubeGeometry(curve, 400, 1.4, 32, false),
    [curve]
  );

  const RING_COUNT = 60;

  useFrame(({ camera }) => {
    const p = readProgressVar();
    const pos = curve.getPointAt(p);
    const tangent = curve.getTangentAt(p).normalize();
    const ahead = curve.getPointAt(Math.min(1, p + 0.01));
    camera.position.lerp(pos, 0.2);
    camera.lookAt(ahead);

    // Ring placement
    for (let i = 0; i < RING_COUNT; i++) {
      const t = i / RING_COUNT;
      const rp = curve.getPointAt(t);
      const rt = curve.getTangentAt(t);
      dummy.position.copy(rp);
      const lookAt = rp.clone().add(rt);
      dummy.lookAt(lookAt);
      const pulse = 1 + Math.sin(t * 40 + performance.now() * 0.002) * 0.05;
      dummy.scale.set(1.2 * pulse, 1.2 * pulse, 0.06);
      dummy.updateMatrix();
      ringsRef.current?.setMatrixAt(i, dummy.matrix);
    }
    if (ringsRef.current) ringsRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <mesh geometry={tubeGeom}>
        <meshStandardMaterial
          color="#140e2a"
          side={THREE.BackSide}
          metalness={0.6}
          roughness={0.4}
          wireframe={false}
          emissive="#1a0f3a"
          emissiveIntensity={0.4}
        />
      </mesh>
      <mesh geometry={tubeGeom}>
        <meshBasicMaterial color="#7c5cff" wireframe side={THREE.BackSide} transparent opacity={0.35} />
      </mesh>
      <instancedMesh ref={ringsRef} args={[undefined, undefined, RING_COUNT]}>
        <torusGeometry args={[1, 0.03, 8, 48]} />
        <meshBasicMaterial color="#c9b8ff" />
      </instancedMesh>
    </group>
  );
}

export default function TunnelScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 0], fov: 75 }}>
      <color attach="background" args={["#04020c"]} />
      <ambientLight intensity={0.6} />
      <pointLight position={[0, 0, -5]} intensity={3} color="#7c5cff" />
      <Tunnel />
    </Canvas>
  );
}
