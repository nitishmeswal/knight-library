"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

const OBJECT_COUNT = 30;

function ForceObjects() {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tmpColor = useMemo(() => new THREE.Color(), []);
  const mouse = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const objects = useMemo(() => {
    return Array.from({ length: OBJECT_COUNT }, () => ({
      pos: new THREE.Vector3(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4
      ),
      vel: new THREE.Vector3(0, 0, 0),
      home: new THREE.Vector3(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4
      ),
      size: 0.15 + Math.random() * 0.3,
      hue: Math.random(),
    }));
  }, []);

  useFrame(({ camera }, delta) => {
    const p = readProgressVar();
    const pushStrength = THREE.MathUtils.lerp(0.5, 5, p);
    const mx = mouse.current.x * 4;
    const my = mouse.current.y * 3;

    for (let i = 0; i < OBJECT_COUNT; i++) {
      const o = objects[i];
      const dx = o.pos.x - mx;
      const dy = o.pos.y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const force = pushStrength / Math.max(dist * dist, 0.5);

      o.vel.x += dx * force * delta;
      o.vel.y += dy * force * delta;

      const homeForce = 0.5;
      o.vel.x += (o.home.x - o.pos.x) * homeForce * delta;
      o.vel.y += (o.home.y - o.pos.y) * homeForce * delta;
      o.vel.z += (o.home.z - o.pos.z) * homeForce * delta;
      o.vel.multiplyScalar(0.95);
      o.pos.addScaledVector(o.vel, delta * 3);

      dummy.position.copy(o.pos);
      const wobble = o.vel.length() * 2;
      dummy.rotation.set(wobble, wobble * 0.7, wobble * 0.5);
      dummy.scale.setScalar(o.size);
      dummy.updateMatrix();
      mesh.current?.setMatrixAt(i, dummy.matrix);

      tmpColor.setHSL(o.hue, 0.6, 0.5);
      mesh.current?.setColorAt(i, tmpColor);
    }
    if (mesh.current) {
      mesh.current.instanceMatrix.needsUpdate = true;
      if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
    }

    camera.position.z = THREE.MathUtils.lerp(6, 4, p);
    camera.lookAt(0, 0, 0);
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, OBJECT_COUNT]}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial metalness={0.5} roughness={0.2} />
    </instancedMesh>
  );
}

export default function HandForceScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6], fov: 50 }}>
      <color attach="background" args={["#06060c"]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 5, 4]} intensity={1.3} />
      <Environment preset="city" />
      <ForceObjects />
    </Canvas>
  );
}
