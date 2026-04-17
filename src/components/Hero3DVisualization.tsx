// @ts-nocheck
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function RotatingTorus() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => new THREE.TorusGeometry(3, 1, 16, 100), []);
  const material = useMemo(
    () =>
      new THREE.MeshPhongMaterial({
        color: 0x6366f1,
        emissive: 0x4f46e5,
        emissiveIntensity: 0.8,
        wireframe: true,
      }),
    []
  );

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = clock.elapsedTime * 0.5;
      meshRef.current.scale.x = 1 + Math.sin(clock.elapsedTime * 0.5) * 0.2;
      meshRef.current.scale.y = 1 + Math.sin(clock.elapsedTime * 0.5 + 1) * 0.2;
      meshRef.current.scale.z = 1 + Math.sin(clock.elapsedTime * 0.5 + 2) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} geometry={geometry} material={material} />
  );
}

function FloatingSpheres() {
  const group = useRef<THREE.Group>(null);
  const spheres = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 5; i++) {
      arr.push({
        position: [Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10],
        speed: Math.random() * 2 + 1,
        color: [0x6366f1, 0xa855f7, 0x06b6d4, 0xec4899, 0xf59e0b][i],
        emissive: [0x4f46e5, 0x7c3aed, 0x0891b2, 0xdb2777, 0xd97706][i],
      });
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.x = clock.elapsedTime * 0.1;
      group.current.rotation.y = clock.elapsedTime * 0.15;
    }
  });

  return (
    <group ref={group}>
      {spheres.map((sphere, i) => (
        <mesh key={i} position={sphere.position as [number, number, number]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial
            color={`#${sphere.color.toString(16).padStart(6, "0")}`}
            emissive={`#${sphere.emissive.toString(16).padStart(6, "0")}`}
            emissiveIntensity={0.6}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function Hero3DVisualization() {
  return (
    <div className="absolute inset-0 lg:w-1/2 flex items-center justify-center">
      <div className="w-full h-full max-w-xl">
        <Canvas camera={{ position: [0, 0, 15], fov: 75 }} gl={{ antialias: true, alpha: true }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1.2} color={0x6366f1} />
          <pointLight position={[-10, -10, -10]} intensity={0.8} color={0xa855f7} />
          <pointLight position={[0, 0, 20]} intensity={0.6} color={0x06b6d4} />

          <RotatingTorus />
          <FloatingSpheres />
        </Canvas>
      </div>
    </div>
  );
}
