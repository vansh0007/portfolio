// @ts-nocheck
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

interface FloatingCubeProps {
  position: [number, number, number];
  color: string;
  speedFactor: number;
}

function FloatingCube({ position, color, speedFactor }: FloatingCubeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => new THREE.BoxGeometry(1.5, 1.5, 1.5), []);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.5,
        wireframe: false,
        metalness: 0.7,
        roughness: 0.2,
      }),
    [color]
  );

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(clock.elapsedTime * speedFactor * 0.5) * Math.PI;
      meshRef.current.rotation.y = clock.elapsedTime * speedFactor * 0.7;
      meshRef.current.position.y = position[1] + Math.sin(clock.elapsedTime * speedFactor * 0.3) * 2;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      geometry={geometry}
      material={material}
      castShadow
      receiveShadow
    />
  );
}

interface Tech3DStackProps {
  technologies?: string[];
}

export default function Tech3DStack({
  technologies = ["React", "TypeScript", "Three.js", "Tailwind", "Node.js", "WebGL"],
}: Tech3DStackProps) {
  const cubes = useMemo(
    () =>
      technologies.map((_, i) => ({
        position: [
          Math.cos((i / technologies.length) * Math.PI * 2) * 6,
          (Math.random() - 0.5) * 4,
          Math.sin((i / technologies.length) * Math.PI * 2) * 6,
        ] as [number, number, number],
        color: [0x6366f1, 0xa855f7, 0x06b6d4, 0xec4899, 0xf59e0b, 0x10b981][i % 6],
        speedFactor: Math.random() * 1 + 0.5,
      })),
    [technologies]
  );

  return (
    <div className="relative w-full h-96">
      <Canvas
        camera={{ position: [0, 5, 15], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color={0x6366f1} />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color={0xa855f7} />

        {cubes.map((cube, i) => (
          <FloatingCube
            key={i}
            position={cube.position}
            color={`#${cube.color.toString(16).padStart(6, "0")}`}
            speedFactor={cube.speedFactor}
          />
        ))}
      </Canvas>
    </div>
  );
}
