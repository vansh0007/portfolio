// @ts-nocheck
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function FloatingGeometry() {
  const meshRef = useRef<THREE.Group>(null);
  const geometries = useMemo(
    () => [
      new THREE.IcosahedronGeometry(1, 4),
      new THREE.OctahedronGeometry(1),
      new THREE.TorusGeometry(1, 0.4, 16, 100),
      new THREE.TetrahedronGeometry(1),
    ],
    []
  );

  const materials = useMemo(
    () => [
      new THREE.MeshPhongMaterial({
        color: 0x6366f1,
        wireframe: true,
        emissive: 0x4f46e5,
      }),
      new THREE.MeshPhongMaterial({
        color: 0xa855f7,
        wireframe: true,
        emissive: 0x9333ea,
      }),
      new THREE.MeshPhongMaterial({
        color: 0x06b6d4,
        wireframe: true,
        emissive: 0x0891b2,
      }),
      new THREE.MeshPhongMaterial({
        color: 0xec4899,
        wireframe: true,
        emissive: 0xdb2777,
      }),
    ],
    []
  );

  const instances = useMemo(
    () =>
      Array.from({ length: 15 }).map(() => ({
        position: [
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 40,
        ] as [number, number, number],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [
          number,
          number,
          number,
        ],
        scale: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.5 + 0.2,
        geometryIndex: Math.floor(Math.random() * geometries.length),
        materialIndex: Math.floor(Math.random() * materials.length),
      })),
    [geometries, materials]
  );

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.0002;
      meshRef.current.rotation.y += 0.0003;
      meshRef.current.rotation.z += 0.0001;
    }
  });

  return (
    <group ref={meshRef}>
      {instances.map((instance, i) => {
        const geometry = geometries[instance.geometryIndex];
        const material = materials[instance.materialIndex];
        return (
          <mesh
            key={i}
            position={instance.position}
            rotation={instance.rotation}
            scale={instance.scale}
            geometry={geometry}
            material={material}
          />
        );
      })}
    </group>
  );
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 500;

  const particlesData = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 100;
      positions[i + 1] = (Math.random() - 0.5) * 100;
      positions[i + 2] = (Math.random() - 0.5) * 100;
    }
    return positions;
  }, [particleCount]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(particlesData, 3));
    return geo;
  }, [particlesData]);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.2,
        color: 0x6366f1,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.6,
      }),
    []
  );

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x += 0.0001;
      pointsRef.current.rotation.y += 0.0002;
    }
  });

  return (
    <points ref={pointsRef} position={[0, 0, 0]} geometry={geometry} material={material} />
  );
}

export default function Canvas3DBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 50], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[20, 20, 20]} intensity={1} color={0x6366f1} />
        <pointLight position={[-20, -20, -20]} intensity={0.8} color={0xa855f7} />
        <FloatingGeometry />
        <ParticleField />
      </Canvas>
    </div>
  );
}
