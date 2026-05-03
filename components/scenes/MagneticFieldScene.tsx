"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

/**
 * MagneticFieldScene
 * ------------------
 * Iron filings (instanced cones) orient themselves to a magnetic dipole's
 * field lines. Scroll rotates the dipole axis and intensifies the field,
 * visualizing classic physics beautifully.
 */
function Filings({ count = 1400 }: { count?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const positions = useMemo(() => {
    const arr: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      arr.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 4.5,
          (Math.random() - 0.5) * 8
        )
      );
    }
    return arr;
  }, [count]);

  useFrame(() => {
    const p = readProgressVar();
    // Dipole axis rotates with scroll
    const axisYaw = p * Math.PI * 2;
    const dipole = new THREE.Vector3(
      Math.sin(axisYaw),
      Math.cos(axisYaw * 0.7),
      Math.cos(axisYaw)
    ).normalize();

    for (let i = 0; i < count; i++) {
      const pos = positions[i];
      // Approximate dipole field direction at pos
      const r = pos.clone();
      const rLen = r.length();
      const rHat = r.clone().divideScalar(rLen || 1);
      const mDotR = dipole.dot(rHat);
      const field = rHat
        .clone()
        .multiplyScalar(3 * mDotR)
        .sub(dipole)
        .divideScalar(Math.max(rLen * rLen * rLen, 0.1));

      const fieldDir = field.lengthSq() > 0 ? field.normalize() : dipole;

      dummy.position.copy(pos);
      const q = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        fieldDir
      );
      dummy.quaternion.copy(q);
      const strength = THREE.MathUtils.clamp(field.length() * 2, 0.05, 1);
      dummy.scale.set(0.03, 0.1 + strength * 0.2, 0.03);
      dummy.updateMatrix();
      mesh.current?.setMatrixAt(i, dummy.matrix);

      const c = new THREE.Color().setHSL(
        0.6 + strength * 0.25,
        0.7,
        0.45 + strength * 0.25
      );
      mesh.current?.setColorAt(i, c);
    }
    if (mesh.current) {
      mesh.current.instanceMatrix.needsUpdate = true;
      if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <coneGeometry args={[1, 1, 6]} />
      <meshStandardMaterial metalness={0.6} roughness={0.3} />
    </instancedMesh>
  );
}

function Dipole() {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    const p = readProgressVar();
    if (ref.current) {
      ref.current.rotation.y = p * Math.PI * 2;
      ref.current.rotation.x = Math.sin(p * Math.PI) * 0.5;
    }
  });
  return (
    <group ref={ref}>
      <mesh position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial color="#ff3c6a" emissive="#ff3c6a" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[0, -0.6, 0]}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial color="#3c8aff" emissive="#3c8aff" emissiveIntensity={0.8} />
      </mesh>
      <mesh>
        <cylinderGeometry args={[0.06, 0.06, 1.2, 12]} />
        <meshStandardMaterial color="#888" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

export default function MagneticFieldScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 1.2, 5.5], fov: 50 }}>
      <color attach="background" args={["#05050c"]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 5, 4]} intensity={1.2} />
      <Dipole />
      <Filings />
    </Canvas>
  );
}
