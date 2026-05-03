"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

const NODE_COUNT = 300;
const EDGE_COUNT = 500;

function BrainMesh() {
  const nodes = useRef<THREE.InstancedMesh>(null);
  const edges = useRef<THREE.LineSegments>(null);
  const group = useRef<THREE.Group>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tmpColor = useMemo(() => new THREE.Color(), []);

  const { nodePositions, edgePairs } = useMemo(() => {
    const nodePositions: THREE.Vector3[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.2 + Math.random() * 1.3;
      nodePositions.push(
        new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta) * 0.65,
          r * Math.cos(phi) * 0.85
        )
      );
    }
    const edgePairs: [number, number][] = [];
    for (let i = 0; i < EDGE_COUNT; i++) {
      const a = Math.floor(Math.random() * NODE_COUNT);
      let b = Math.floor(Math.random() * NODE_COUNT);
      if (b === a) b = (a + 1) % NODE_COUNT;
      if (nodePositions[a].distanceTo(nodePositions[b]) < 2) {
        edgePairs.push([a, b]);
      }
    }
    return { nodePositions, edgePairs };
  }, []);

  const edgePositions = useMemo(() => new Float32Array(edgePairs.length * 6), [edgePairs]);
  const edgeColors = useMemo(() => new Float32Array(edgePairs.length * 6), [edgePairs]);

  useFrame(({ camera, clock }, delta) => {
    const p = readProgressVar();
    const t = clock.elapsedTime;
    const growth = THREE.MathUtils.smoothstep(p, 0, 0.6);

    if (group.current) group.current.rotation.y += delta * 0.1;

    for (let i = 0; i < NODE_COUNT; i++) {
      const pos = nodePositions[i];
      const pulse = Math.sin(t * 3 + i * 0.3) * 0.5 + 0.5;
      const show = i / NODE_COUNT < growth ? 1 : 0;
      dummy.position.copy(pos);
      dummy.scale.setScalar(show * (0.03 + pulse * 0.02 * growth));
      dummy.updateMatrix();
      nodes.current?.setMatrixAt(i, dummy.matrix);

      tmpColor.setHSL(0.6 - pulse * 0.1 * growth, 0.8, 0.4 + pulse * 0.3);
      nodes.current?.setColorAt(i, tmpColor);
    }
    if (nodes.current) {
      nodes.current.instanceMatrix.needsUpdate = true;
      if (nodes.current.instanceColor) nodes.current.instanceColor.needsUpdate = true;
    }

    for (let i = 0; i < edgePairs.length; i++) {
      const [a, b] = edgePairs[i];
      const pa = nodePositions[a];
      const pb = nodePositions[b];
      const show = Math.max(a, b) / NODE_COUNT < growth ? 1 : 0;
      edgePositions[i * 6] = pa.x;
      edgePositions[i * 6 + 1] = pa.y;
      edgePositions[i * 6 + 2] = pa.z;
      edgePositions[i * 6 + 3] = pb.x;
      edgePositions[i * 6 + 4] = pb.y;
      edgePositions[i * 6 + 5] = pb.z;

      const signal = (Math.sin(t * 5 + i * 0.1) * 0.5 + 0.5) * show * growth;
      edgeColors[i * 6] = signal * 0.3;
      edgeColors[i * 6 + 1] = signal * 0.6;
      edgeColors[i * 6 + 2] = signal;
      edgeColors[i * 6 + 3] = signal * 0.3;
      edgeColors[i * 6 + 4] = signal * 0.6;
      edgeColors[i * 6 + 5] = signal;
    }
    if (edges.current) {
      edges.current.geometry.attributes.position.needsUpdate = true;
      edges.current.geometry.attributes.color.needsUpdate = true;
    }

    camera.position.z = THREE.MathUtils.lerp(5.5, 3.5, p);
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={group}>
      <instancedMesh ref={nodes} args={[undefined, undefined, NODE_COUNT]}>
        <sphereGeometry args={[1, 10, 10]} />
        <meshBasicMaterial />
      </instancedMesh>
      <lineSegments ref={edges}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[edgePositions, 3]} count={edgePairs.length * 2} />
          <bufferAttribute attach="attributes-color" args={[edgeColors, 3]} count={edgePairs.length * 2} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.5} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

export default function NeuralPulseScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5.5], fov: 50 }}>
      <color attach="background" args={["#03030c"]} />
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#3388ff" distance={6} />
      <BrainMesh />
    </Canvas>
  );
}
