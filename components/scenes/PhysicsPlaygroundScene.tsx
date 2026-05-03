"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

const BALL_COUNT = 60;

function PhysicsBalls() {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tmpColor = useMemo(() => new THREE.Color(), []);

  const balls = useMemo(() => {
    return Array.from({ length: BALL_COUNT }, () => ({
      pos: new THREE.Vector3(
        (Math.random() - 0.5) * 6,
        Math.random() * 4 + 1,
        (Math.random() - 0.5) * 6
      ),
      vel: new THREE.Vector3(0, 0, 0),
      radius: 0.15 + Math.random() * 0.25,
      hue: Math.random(),
      bounce: 0.6 + Math.random() * 0.3,
    }));
  }, []);

  const prevP = useRef(0);

  useFrame(({ camera }, delta) => {
    const p = readProgressVar();
    const scrollDelta = (p - prevP.current) * 60;
    prevP.current = p;
    const force = scrollDelta * 15;

    for (let i = 0; i < BALL_COUNT; i++) {
      const b = balls[i];
      b.vel.y -= 9.8 * delta;
      b.vel.y += force * delta * (0.5 + Math.random() * 0.5);
      b.vel.multiplyScalar(0.995);

      b.pos.addScaledVector(b.vel, delta);

      if (b.pos.y < b.radius) {
        b.pos.y = b.radius;
        b.vel.y = Math.abs(b.vel.y) * b.bounce;
        b.vel.x += (Math.random() - 0.5) * 2;
        b.vel.z += (Math.random() - 0.5) * 2;
      }

      if (Math.abs(b.pos.x) > 4) {
        b.pos.x = Math.sign(b.pos.x) * 4;
        b.vel.x *= -b.bounce;
      }
      if (Math.abs(b.pos.z) > 4) {
        b.pos.z = Math.sign(b.pos.z) * 4;
        b.vel.z *= -b.bounce;
      }

      dummy.position.copy(b.pos);
      dummy.scale.setScalar(b.radius);
      dummy.updateMatrix();
      mesh.current?.setMatrixAt(i, dummy.matrix);

      tmpColor.setHSL(b.hue, 0.6, 0.5);
      mesh.current?.setColorAt(i, tmpColor);
    }
    if (mesh.current) {
      mesh.current.instanceMatrix.needsUpdate = true;
      if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
    }

    camera.position.set(6, 4, 6);
    camera.lookAt(0, 1, 0);
  });

  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.01, 0]}>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#14141c" roughness={0.9} />
      </mesh>
      <instancedMesh ref={mesh} args={[undefined, undefined, BALL_COUNT]}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial metalness={0.5} roughness={0.2} />
      </instancedMesh>
    </group>
  );
}

export default function PhysicsPlaygroundScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [6, 4, 6], fov: 50 }}>
      <color attach="background" args={["#06060c"]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[6, 8, 4]} intensity={1.4} castShadow />
      <Environment preset="warehouse" />
      <PhysicsBalls />
    </Canvas>
  );
}
