"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

const BUILDING_COUNT = 400;
const RAIN_COUNT = 3000;

function CyberCity() {
  const buildings = useRef<THREE.InstancedMesh>(null);
  const rain = useRef<THREE.Points>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tmpColor = useMemo(() => new THREE.Color(), []);

  const bData = useMemo(() => {
    const items: { x: number; z: number; h: number; hue: number; widthX: number; widthZ: number }[] = [];
    for (let i = 0; i < BUILDING_COUNT; i++) {
      items.push({
        x: (Math.random() - 0.5) * 40,
        z: (Math.random() - 0.5) * 60,
        h: 0.5 + Math.pow(Math.random(), 2) * 6,
        hue: 0.8 + Math.random() * 0.2,
        widthX: 0.8 + Math.random() * 0.01,
        widthZ: 0.8 + Math.random() * 0.01,
      });
    }
    return items;
  }, []);

  const rainPositions = useMemo(() => {
    const arr = new Float32Array(RAIN_COUNT * 3);
    for (let i = 0; i < RAIN_COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = Math.random() * 15;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return arr;
  }, []);

  useFrame(({ camera, clock }) => {
    const p = readProgressVar();
    const t = clock.elapsedTime;

    for (let i = 0; i < BUILDING_COUNT; i++) {
      const b = bData[i];
      dummy.position.set(b.x, b.h / 2, b.z - p * 30);
      dummy.scale.set(b.widthX, b.h, b.widthZ);
      dummy.updateMatrix();
      buildings.current?.setMatrixAt(i, dummy.matrix);

      tmpColor.setHSL(b.hue, 0.7, 0.25 + Math.sin(t + i) * 0.1);
      buildings.current?.setColorAt(i, tmpColor);
    }
    if (buildings.current) {
      buildings.current.instanceMatrix.needsUpdate = true;
      if (buildings.current.instanceColor) buildings.current.instanceColor.needsUpdate = true;
    }

    if (rain.current) {
      const arr = rain.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < RAIN_COUNT; i++) {
        arr[i * 3 + 1] -= 0.15;
        if (arr[i * 3 + 1] < 0) arr[i * 3 + 1] = 15;
      }
      rain.current.geometry.attributes.position.needsUpdate = true;
    }

    camera.position.set(0, THREE.MathUtils.lerp(2, 8, p), 12);
    camera.lookAt(0, 2, -10);
  });

  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.01, 0]}>
        <planeGeometry args={[200, 200]} />
        <meshBasicMaterial color="#0a0216" />
      </mesh>
      <gridHelper args={[200, 120, "#ff1a75", "#1a0030"]} position={[0, 0.01, 0]} />
      <instancedMesh ref={buildings} args={[undefined, undefined, BUILDING_COUNT]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial metalness={0.5} roughness={0.3} emissiveIntensity={0.6} />
      </instancedMesh>
      <points ref={rain}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[rainPositions, 3]} count={RAIN_COUNT} />
        </bufferGeometry>
        <pointsMaterial size={0.02} color="#88ccff" transparent opacity={0.5} depthWrite={false} />
      </points>
    </group>
  );
}

export default function CyberpunkFlyScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 2, 12], fov: 65 }}>
      <color attach="background" args={["#08021a"]} />
      <fog attach="fog" args={["#08021a", 10, 50]} />
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 8, -5]} intensity={3} color="#ff1a75" />
      <pointLight position={[5, 8, 5]} intensity={2} color="#1af0ff" />
      <CyberCity />
    </Canvas>
  );
}
