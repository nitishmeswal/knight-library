"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

const SHELL_SEGMENTS = 16;

function EnergyCore() {
  const core = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const group = useRef<THREE.Group>(null);

  useFrame(({ camera, clock }, delta) => {
    const p = readProgressVar();
    const t = clock.elapsedTime;
    const openAmount = THREE.MathUtils.smoothstep(p, 0.2, 0.8);

    if (core.current) {
      const pulse = 1 + Math.sin(t * 6) * 0.15;
      core.current.scale.setScalar(0.4 * pulse);
      core.current.rotation.y += delta * 2;
      const mat = core.current.material as THREE.MeshBasicMaterial;
      const hue = (t * 0.1) % 1;
      mat.color.setHSL(hue, 1, 0.6);
    }

    if (group.current) group.current.rotation.y += delta * 0.15;

    for (let i = 0; i < SHELL_SEGMENTS; i++) {
      const phi = Math.acos(2 * (i / SHELL_SEGMENTS) - 1);
      const theta = i * 2.4 + t * 0.3;
      const r = 1 + openAmount * 1.5;
      dummy.position.set(
        Math.sin(phi) * Math.cos(theta) * r,
        Math.sin(phi) * Math.sin(theta) * r,
        Math.cos(phi) * r
      );
      dummy.lookAt(0, 0, 0);
      dummy.rotateX(Math.PI / 2);
      const wobble = Math.sin(t * 3 + i) * 0.1;
      dummy.scale.set(0.5 + wobble, 0.02, 0.5 + wobble);
      dummy.updateMatrix();
      shell.current?.setMatrixAt(i, dummy.matrix);
    }
    if (shell.current) shell.current.instanceMatrix.needsUpdate = true;

    camera.position.z = THREE.MathUtils.lerp(5, 3.5, p);
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={group}>
      <mesh ref={core}>
        <icosahedronGeometry args={[1, 3]} />
        <meshBasicMaterial color="#ffaa00" />
      </mesh>
      <pointLight position={[0, 0, 0]} intensity={3} color="#ffaa00" distance={5} />
      <instancedMesh ref={shell} args={[undefined, undefined, SHELL_SEGMENTS]}>
        <circleGeometry args={[1, 6]} />
        <meshPhysicalMaterial
          color="#334466"
          metalness={0.8}
          roughness={0.1}
          side={THREE.DoubleSide}
          transparent
          opacity={0.7}
        />
      </instancedMesh>
    </group>
  );
}

export default function EnergyCoreScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
      <color attach="background" args={["#04040c"]} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 5, 4]} intensity={1} />
      <Environment preset="night" />
      <EnergyCore />
    </Canvas>
  );
}
