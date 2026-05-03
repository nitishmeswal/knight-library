"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

const NODE_COUNT = 200;
const CONNECTION_COUNT = 400;

function NeuralNetwork() {
  const nodes = useRef<THREE.InstancedMesh>(null);
  const lines = useRef<THREE.LineSegments>(null);
  const group = useRef<THREE.Group>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tmpColor = useMemo(() => new THREE.Color(), []);

  const { nodePositions, connectionIndices } = useMemo(() => {
    const nodePositions: THREE.Vector3[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const r = 1 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      nodePositions.push(
        new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta) * 0.7,
          r * Math.cos(phi)
        )
      );
    }

    const connectionIndices: [number, number][] = [];
    for (let i = 0; i < CONNECTION_COUNT; i++) {
      const a = Math.floor(Math.random() * NODE_COUNT);
      let b = Math.floor(Math.random() * NODE_COUNT);
      if (b === a) b = (a + 1) % NODE_COUNT;
      connectionIndices.push([a, b]);
    }
    return { nodePositions, connectionIndices };
  }, []);

  const linePositions = useMemo(() => new Float32Array(CONNECTION_COUNT * 6), []);
  const lineColors = useMemo(() => new Float32Array(CONNECTION_COUNT * 6), []);

  useFrame(({ camera, clock }, delta) => {
    const p = readProgressVar();
    const t = clock.elapsedTime;
    const activity = THREE.MathUtils.lerp(0.1, 1, p);

    if (group.current) group.current.rotation.y += delta * 0.12;

    for (let i = 0; i < NODE_COUNT; i++) {
      const pos = nodePositions[i];
      const pulse = 1 + Math.sin(t * 3 + i * 0.5) * 0.3 * activity;
      dummy.position.copy(pos);
      dummy.scale.setScalar(0.04 * pulse);
      dummy.updateMatrix();
      nodes.current?.setMatrixAt(i, dummy.matrix);

      const brightness = 0.3 + Math.sin(t * 2 + i * 0.3) * 0.3 * activity;
      tmpColor.setHSL(0.55 + activity * 0.1, 0.8, brightness);
      nodes.current?.setColorAt(i, tmpColor);
    }
    if (nodes.current) {
      nodes.current.instanceMatrix.needsUpdate = true;
      if (nodes.current.instanceColor) nodes.current.instanceColor.needsUpdate = true;
    }

    for (let i = 0; i < CONNECTION_COUNT; i++) {
      const [a, b] = connectionIndices[i];
      const pa = nodePositions[a];
      const pb = nodePositions[b];
      linePositions[i * 6] = pa.x;
      linePositions[i * 6 + 1] = pa.y;
      linePositions[i * 6 + 2] = pa.z;
      linePositions[i * 6 + 3] = pb.x;
      linePositions[i * 6 + 4] = pb.y;
      linePositions[i * 6 + 5] = pb.z;

      const signal = Math.sin(t * 4 + i * 0.2) * 0.5 + 0.5;
      const alpha = signal * activity;
      lineColors[i * 6] = 0.3 + alpha * 0.7;
      lineColors[i * 6 + 1] = 0.5 + alpha * 0.5;
      lineColors[i * 6 + 2] = 1;
      lineColors[i * 6 + 3] = 0.3 + alpha * 0.7;
      lineColors[i * 6 + 4] = 0.5 + alpha * 0.5;
      lineColors[i * 6 + 5] = 1;
    }
    if (lines.current) {
      lines.current.geometry.attributes.position.needsUpdate = true;
      lines.current.geometry.attributes.color.needsUpdate = true;
    }

    camera.position.z = THREE.MathUtils.lerp(6, 3.5, p);
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={group}>
      <instancedMesh ref={nodes} args={[undefined, undefined, NODE_COUNT]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial />
      </instancedMesh>
      <lineSegments ref={lines}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} count={CONNECTION_COUNT * 2} />
          <bufferAttribute attach="attributes-color" args={[lineColors, 3]} count={CONNECTION_COUNT * 2} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

export default function AIBrainScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6], fov: 50 }}>
      <color attach="background" args={["#03030c"]} />
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#4488ff" distance={5} />
      <NeuralNetwork />
    </Canvas>
  );
}
