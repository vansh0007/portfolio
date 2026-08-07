// @ts-nocheck
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function Car({ position = [0, 0.75, 0], onPositionUpdate }: { position?: [number, number, number]; onPositionUpdate?: (pos: [number, number, number]) => void }) {
  const carRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const movement = useRef({ forward: false, backward: false, left: false, right: false });
  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());
  const lastPosition = useRef<[number, number, number]>(position);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      const down = event.type === "keydown";
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.code)) {
        event.preventDefault();
      }

      switch (event.code) {
        case "KeyW":
        case "ArrowUp":
          movement.current.forward = down;
          break;
        case "KeyS":
        case "ArrowDown":
          movement.current.backward = down;
          break;
        case "KeyA":
        case "ArrowLeft":
          movement.current.left = down;
          break;
        case "KeyD":
        case "ArrowRight":
          movement.current.right = down;
          break;
        default:
          break;
      }
    };

    const resetMovement = () => {
      movement.current.forward = false;
      movement.current.backward = false;
      movement.current.left = false;
      movement.current.right = false;
    };

    window.addEventListener("keydown", handleKey, { passive: false });
    window.addEventListener("keyup", handleKey);
    window.addEventListener("blur", resetMovement);
    return () => {
      window.removeEventListener("keydown", handleKey, { passive: false } as any);
      window.removeEventListener("keyup", handleKey);
      window.removeEventListener("blur", resetMovement);
    };
  }, []);

  useFrame((_, delta) => {
    if (!carRef.current) return;

    direction.current.set(0, 0, 0);
    if (movement.current.forward) direction.current.z -= 1;
    if (movement.current.backward) direction.current.z += 1;

    const rotationSpeed = 2.8;
    if (movement.current.left) carRef.current.rotation.y += rotationSpeed * delta;
    if (movement.current.right) carRef.current.rotation.y -= rotationSpeed * delta;

    const forwardVector = new THREE.Vector3(0, 0, -1).applyEuler(carRef.current.rotation);
    const targetVelocity = new THREE.Vector3();
    if (movement.current.forward) targetVelocity.copy(forwardVector).multiplyScalar(18);
    if (movement.current.backward) targetVelocity.copy(forwardVector).multiplyScalar(-12);
    if (!movement.current.forward && !movement.current.backward) targetVelocity.set(0, 0, 0);

    velocity.current.lerp(targetVelocity, 0.18);
    carRef.current.position.addScaledVector(velocity.current, delta);

    carRef.current.position.x = THREE.MathUtils.clamp(carRef.current.position.x, -42, 42);
    carRef.current.position.z = THREE.MathUtils.clamp(carRef.current.position.z, -92, 92);

    const currentPosition: [number, number, number] = [
      parseFloat(carRef.current.position.x.toFixed(2)),
      parseFloat(carRef.current.position.y.toFixed(2)),
      parseFloat(carRef.current.position.z.toFixed(2)),
    ];

    const movedFarEnough =
      Math.abs(currentPosition[0] - lastPosition.current[0]) > 0.1 ||
      Math.abs(currentPosition[2] - lastPosition.current[2]) > 0.1;

    if (movedFarEnough) {
      lastPosition.current = currentPosition;
      onPositionUpdate?.(currentPosition);
    }

    const cameraOffset = new THREE.Vector3(0, 4.5, 10).applyAxisAngle(new THREE.Vector3(0, 1, 0), carRef.current.rotation.y);
    const desiredCamera = new THREE.Vector3().copy(carRef.current.position).add(cameraOffset);
    camera.position.lerp(desiredCamera, 0.08);
    camera.lookAt(carRef.current.position);
  });

  return (
    <group ref={carRef} position={position}>
      <mesh position={[0, 0.22, 0]} castShadow>
        <boxGeometry args={[3.4, 0.55, 5.6]} />
        <meshStandardMaterial color="#d62828" metalness={0.95} roughness={0.08} />
      </mesh>
      <mesh position={[0, 0.88, -0.7]} castShadow>
        <boxGeometry args={[2.8, 0.45, 2.4]} />
        <meshStandardMaterial color="#d62828" metalness={0.95} roughness={0.09} />
      </mesh>
      <mesh position={[0, 1.22, -1.95]} rotation={[-0.24, 0, 0]} castShadow>
        <boxGeometry args={[2.4, 0.3, 1.1]} />
        <meshStandardMaterial color="#0f172a" metalness={0.2} roughness={0.2} transparent opacity={0.88} />
      </mesh>
      <mesh position={[0, 0.45, 2.25]} rotation={[0.06, 0, 0]}>
        <boxGeometry args={[3.5, 0.11, 0.55]} />
        <meshStandardMaterial color="#111827" metalness={0.35} roughness={0.14} />
      </mesh>
      <mesh position={[0, 0.38, -2.85]} castShadow>
        <boxGeometry args={[2.8, 0.18, 0.3]} />
        <meshStandardMaterial color="#facc15" emissive="#fde68a" emissiveIntensity={0.85} metalness={0.22} roughness={0.18} />
      </mesh>
      <mesh position={[0, 0.72, -2.1]}>
        <boxGeometry args={[2.4, 0.1, 0.5]} />
        <meshStandardMaterial color="#fcd34d" metalness={0.3} roughness={0.18} />
      </mesh>
      <mesh position={[1.62, -0.44, 1.88]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.33, 0.33, 1.05, 26]} />
        <meshStandardMaterial color="#111827" metalness={0.95} roughness={0.15} />
      </mesh>
      <mesh position={[-1.62, -0.44, 1.88]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.33, 0.33, 1.05, 26]} />
        <meshStandardMaterial color="#111827" metalness={0.95} roughness={0.15} />
      </mesh>
      <mesh position={[1.62, -0.44, -1.88]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.33, 0.33, 1.05, 26]} />
        <meshStandardMaterial color="#111827" metalness={0.95} roughness={0.15} />
      </mesh>
      <mesh position={[-1.62, -0.44, -1.88]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.33, 0.33, 1.05, 26]} />
        <meshStandardMaterial color="#111827" metalness={0.95} roughness={0.15} />
      </mesh>
      <mesh position={[0, 1.18, 1.2]}>
        <boxGeometry args={[1.75, 0.08, 1.5]} />
        <meshStandardMaterial color="#111827" metalness={0.2} roughness={0.18} transparent opacity={0.92} />
      </mesh>
      <mesh position={[0, 0.8, 2.55]}> 
        <boxGeometry args={[1.6, 0.1, 0.3]} />
        <meshStandardMaterial color="#111827" metalness={0.25} roughness={0.18} />
      </mesh>
      <mesh position={[0, 0.60, -3.05]} rotation={[0.16, 0, 0]}>
        <boxGeometry args={[1.4, 0.12, 0.28]} />
        <meshStandardMaterial color="#facc15" metalness={0.22} roughness={0.18} />
      </mesh>
    </group>
  );
}

function Section({ position, label, color }) {
  return (
    <group position={position}>
      <mesh position={[0, 1.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[5, 2.8, 5]} />
        <meshStandardMaterial color={color} metalness={0.2} roughness={0.4} />
      </mesh>
      <TextSprite text={label} position={[0, 3.8, 0]} />
    </group>
  );
}

function Building({ position, size, color }: { position: [number, number, number]; size: [number, number, number]; color: string }) {
  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} metalness={0.14} roughness={0.45} />
      </mesh>
      <mesh position={[0, size[1] / 2, size[2] / 2 + 0.02]} rotation={[0, 0, 0]}>
        <planeGeometry args={[size[0] * 0.8, size[1] * 0.7]} />
        <meshStandardMaterial color="#94a3b8" emissive="#c7d2fe" emissiveIntensity={0.35} transparent opacity={0.8} />
      </mesh>
      <mesh position={[0, size[1] / 2, -size[2] / 2 - 0.02]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[size[0] * 0.8, size[1] * 0.7]} />
        <meshStandardMaterial color="#94a3b8" emissive="#e0f2fe" emissiveIntensity={0.32} transparent opacity={0.77} />
      </mesh>
      <mesh position={[-size[0] / 2 - 0.02, size[1] / 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[size[2] * 0.8, size[1] * 0.6]} />
        <meshStandardMaterial color="#94a3b8" emissive="#dbeafe" emissiveIntensity={0.27} transparent opacity={0.78} />
      </mesh>
      <mesh position={[size[0] / 2 + 0.02, size[1] / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[size[2] * 0.8, size[1] * 0.6]} />
        <meshStandardMaterial color="#94a3b8" emissive="#dbeafe" emissiveIntensity={0.27} transparent opacity={0.78} />
      </mesh>
    </group>
  );
}

function Tree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.75, 0]}> 
        <cylinderGeometry args={[0.18, 0.18, 1.5, 10]} />
        <meshStandardMaterial color="#8b5cf6" metalness={0.05} roughness={0.65} />
      </mesh>
      <mesh position={[0, 2.05, 0]}> 
        <sphereGeometry args={[1.1, 16, 16]} />
        <meshStandardMaterial color="#22c55e" metalness={0.05} roughness={0.55} />
      </mesh>
      <mesh position={[0, 1.4, 0.4]}> 
        <sphereGeometry args={[0.7, 12, 12]} />
        <meshStandardMaterial color="#16a34a" metalness={0.05} roughness={0.55} />
      </mesh>
    </group>
  );
}

function Bird({ initialPosition, speed, size, color }: { initialPosition: [number, number, number]; speed: number; size: number; color: string }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime * speed;
    const x = initialPosition[0] + Math.cos(t) * 8;
    const y = initialPosition[1] + Math.sin(t * 1.4) * 0.6;
    const z = initialPosition[2] + Math.sin(t) * 8;
    ref.current.position.set(x, y, z);
    ref.current.rotation.y = Math.atan2(Math.sin(t), Math.cos(t));
  });

  return (
    <group ref={ref}>
      <mesh>
        <coneGeometry args={[size * 0.15, size * 0.5, 6]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} metalness={0.1} roughness={0.3} />
      </mesh>
    </group>
  );
}

function StreetLamp({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 1.6, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 3.2, 10]} />
        <meshStandardMaterial color="#d4d4d8" metalness={0.1} roughness={0.3} />
      </mesh>
      <mesh position={[0, 3.15, 0.18]} castShadow>
        <boxGeometry args={[0.3, 0.22, 0.22]} />
        <meshStandardMaterial color="#fde68a" emissive="#fef3c7" emissiveIntensity={1.2} metalness={0.05} roughness={0.35} />
      </mesh>
    </group>
  );
}

function CityScape() {
  const buildings = useMemo(
    () => [
      { position: [-36, 8.5, -52], size: [14, 18, 14], color: "#24303b" },
      { position: [-36, 6.2, -20], size: [12, 12, 12], color: "#334155" },
      { position: [-36, 6.2, 20], size: [12, 12, 12], color: "#1f2937" },
      { position: [-36, 8.5, 52], size: [14, 18, 14], color: "#0f172a" },
      { position: [-10, 5.5, 40], size: [10, 10, 10], color: "#475569" },
      { position: [10, 6.7, 18], size: [12, 13, 12], color: "#334155" },
      { position: [10, 6.7, -18], size: [12, 13, 12], color: "#1f2937" },
      { position: [-10, 5.8, -40], size: [10, 10, 10], color: "#334155" },
      { position: [36, 8.2, -44], size: [14, 16, 14], color: "#1f2937" },
      { position: [36, 6.0, -10], size: [11, 11, 11], color: "#475569" },
      { position: [36, 6.0, 10], size: [11, 11, 11], color: "#334155" },
      { position: [36, 8.2, 44], size: [14, 16, 14], color: "#0f172a" },
      { position: [0, 10.5, -70], size: [18, 22, 18], color: "#1e293b" },
      { position: [0, 7.0, 64], size: [16, 14, 16], color: "#24303b" },
    ],
    []
  );

  const passages = useMemo(
    () => [
      { position: [0, 0.03, -28], size: [12, 0.05, 38] },
      { position: [0, 0.03, 28], size: [12, 0.05, 38] },
      { position: [-24, 0.03, 0], size: [10, 0.05, 104] },
      { position: [24, 0.03, 0], size: [10, 0.05, 104] },
      { position: [0, 0.03, 0], size: [24, 0.05, 16] },
    ],
    []
  );

  const trees = useMemo(
    () => [
      [-20, 0, -56], [-12, 0, -52], [12, 0, -52], [20, 0, -56],
      [-22, 0, 34], [-14, 0, 28], [14, 0, 28], [22, 0, 34],
    ] as [number, number, number][],
    []
  );

  const birds = useMemo(
    () => [
      { position: [-10, 18, -10], speed: 0.7, size: 1.6, color: "#f8fafc" },
      { position: [6, 16, -24], speed: 0.9, size: 1.4, color: "#e2e8f0" },
      { position: [18, 20, 12], speed: 0.55, size: 1.8, color: "#fef3c7" },
    ],
    []
  );

  const lamps = useMemo(
    () => [
      [-12, 0, -40], [12, 0, -40], [-12, 0, 40], [12, 0, 40],
      [-28, 0, 0], [28, 0, 0], [-28, 0, -20], [28, 0, 20],
    ] as [number, number, number][],
    []
  );

  return (
    <group>
      {buildings.map((building, index) => (
        <Building key={`building-${index}`} position={building.position} size={building.size} color={building.color} />
      ))}
      {passages.map((passage, index) => (
        <mesh key={`passage-${index}`} position={passage.position} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[passage.size[0], passage.size[2]]} />
          <meshStandardMaterial color="#101820" metalness={0.02} roughness={0.88} transparent opacity={0.95} />
        </mesh>
      ))}
      {trees.map((tree, index) => (
        <Tree key={`tree-${index}`} position={tree} />
      ))}
      {lamps.map((lamp, index) => (
        <StreetLamp key={`lamp-${index}`} position={lamp} />
      ))}
      {birds.map((bird, index) => (
        <Bird key={`bird-${index}`} initialPosition={bird.position} speed={bird.speed} size={bird.size} color={bird.color} />
      ))}
    </group>
  );
}

function TextSprite({ text, position = [0, 0, 0] }) {
  const canvas = useMemo(() => {
    const size = 512;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, size, size);
      ctx.font = "bold 72px Inter";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#f8fafc";
      ctx.fillText(text, size / 2, size / 2);
      ctx.strokeStyle = "rgba(15, 23, 42, 0.55)";
      ctx.lineWidth = 10;
      ctx.strokeText(text, size / 2, size / 2);
    }
    return canvas;
  }, [text]);

  const texture = useMemo(() => new THREE.CanvasTexture(canvas), [canvas]);

  return (
    <sprite position={position} scale={[6, 2, 1]}>
      <spriteMaterial map={texture} transparent depthWrite={false} />
    </sprite>
  );
}

function Road() {
  const stripes = useMemo(
    () => Array.from({ length: 18 }, (_, index) => ({ z: index * -10 + 28 })),
    []
  );

  const crosswalks = useMemo(
    () => Array.from({ length: 10 }, (_, index) => ({ x: -24 + index * 5.5, z: -24 })),
    []
  );

  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      <mesh receiveShadow>
        <planeGeometry args={[124, 244]} />
        <meshStandardMaterial color="#0d1723" metalness={0.04} roughness={0.92} />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <planeGeometry args={[96, 192]} />
        <meshStandardMaterial color="#0c131f" metalness={0.02} roughness={0.94} />
      </mesh>
      <mesh position={[0, 0.035, 0]}> 
        <planeGeometry args={[50, 192]} />
        <meshStandardMaterial color="#141f2d" metalness={0.03} roughness={0.88} />
      </mesh>
      <mesh position={[0, 0.035, 0]} rotation={[0, Math.PI / 2, 0]}> 
        <planeGeometry args={[50, 96]} />
        <meshStandardMaterial color="#141f2d" metalness={0.03} roughness={0.88} />
      </mesh>

      {stripes.map((stripe, idx) => (
        <mesh key={idx} position={[0, 0.06, stripe.z]}>
          <boxGeometry args={[5.4, 0.05, 1.15]} />
          <meshStandardMaterial color="#f8fafc" metalness={0.12} roughness={0.58} />
        </mesh>
      ))}

      {crosswalks.map((line, idx) => (
        <mesh key={idx} position={[line.x, 0.06, line.z]}>
          <boxGeometry args={[2.2, 0.05, 0.55]} />
          <meshStandardMaterial color="#f8fafc" metalness={0.05} roughness={0.72} />
        </mesh>
      ))}

      <mesh position={[0, 0.045, -26]}>
        <boxGeometry args={[24, 0.05, 56]} />
        <meshStandardMaterial color="#111921" metalness={0.02} roughness={0.87} />
      </mesh>
      <mesh position={[0, 0.045, 26]}>
        <boxGeometry args={[24, 0.05, 56]} />
        <meshStandardMaterial color="#111921" metalness={0.02} roughness={0.87} />
      </mesh>

      <mesh position={[-30, 0.045, 0]} rotation={[0, Math.PI / 2, 0]}> 
        <boxGeometry args={[10.5, 0.05, 192]} />
        <meshStandardMaterial color="#101a24" metalness={0.03} roughness={0.9} />
      </mesh>
      <mesh position={[30, 0.045, 0]} rotation={[0, Math.PI / 2, 0]}> 
        <boxGeometry args={[10.5, 0.05, 192]} />
        <meshStandardMaterial color="#101a24" metalness={0.03} roughness={0.9} />
      </mesh>

      <mesh position={[0, 0.08, 0]}>
        <planeGeometry args={[96, 192]} />
        <meshStandardMaterial color="#0d1723" metalness={0.01} roughness={0.95} transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

function Galaxy() {
  const stars = useMemo(() => {
    const arr = new Float32Array(700 * 3);
    for (let i = 0; i < 700; i += 1) {
      arr[i * 3] = (Math.random() - 0.5) * 220;
      arr[i * 3 + 1] = Math.random() * 50 + 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 220;
    }
    return arr;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={stars.length / 3} array={stars} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.14} color="#ffffff" transparent opacity={0.75} sizeAttenuation />
    </points>
  );
}

function BoundaryWall({ position, rotation, size }) {
  return (
    <mesh position={position} rotation={rotation} receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color="#111827" metalness={0.1} roughness={0.9} />
    </mesh>
  );
}

function SkyDome() {
  return (
    <mesh scale={120} rotation={[0, 0, 0]}>
      <sphereGeometry args={[80, 32, 32]} />
      <meshStandardMaterial
        side={THREE.BackSide}
        transparent
        opacity={0.96}
        color="#87cfff"
        emissive="#c9e6ff"
        emissiveIntensity={0.22}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}

function Ground() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[220, 220, 12, 12]} />
        <meshStandardMaterial color="#6f8c73" roughness={0.9} metalness={0.05} />
      </mesh>
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[220, 220]} />
        <meshStandardMaterial
          color="#7ba07a"
          roughness={0.85}
          metalness={0.02}
          emissive="#2f4b3a"
          emissiveIntensity={0.04}
          transparent
          opacity={0.98}
        />
      </mesh>
    </group>
  );
}

function Minimap({ carPosition }: { carPosition: [number, number, number] }) {
  const [x, , z] = carPosition;
  const normalizedX = Math.min(100, Math.max(0, ((x + 45) / 90) * 100));
  const normalizedZ = Math.min(100, Math.max(0, 100 - ((z + 95) / 190) * 100));

  return (
    <div className="pointer-events-none absolute right-6 top-24 z-50 w-48 rounded-[28px] border border-white/15 bg-slate-950/70 p-3 text-white/85 backdrop-blur-2xl text-xs shadow-[0_24px_80px_rgba(15,23,42,0.45)]">
      <div className="mb-2 flex items-center justify-between text-sm font-semibold text-white">
        <span>MINIMAP</span>
        <span className="rounded-full bg-sky-400/15 px-2 py-0.5 text-[10px] text-sky-100">LIVE</span>
      </div>
      <div className="relative h-40 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-2">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(236,72,153,0.12),transparent_38%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:20px_20px,20px_20px]" />
        <div className="absolute left-5 top-8 h-3 w-3 rounded-full bg-violet-400 shadow-[0_0_18px_rgba(124,58,237,0.55)]" />
        <div className="absolute left-12 top-24 h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(16,185,129,0.55)]" />
        <div className="absolute right-6 bottom-12 h-2.5 w-2.5 rounded-full bg-orange-400 shadow-[0_0_14px_rgba(251,146,60,0.55)]" />
        <div className="absolute inset-x-7 top-16 h-0.5 rounded-full bg-sky-400/60" />
        <div className="absolute inset-y-11 left-11 w-0.5 rounded-full bg-slate-500/70" />
        <div
          className="absolute h-3.5 w-3.5 rounded-full bg-sky-300 shadow-[0_0_16px_rgba(56,189,248,0.7)]"
          style={{ left: `calc(${normalizedX}% - 0.7rem)`, top: `calc(${normalizedZ}% - 0.7rem)` }}
        />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-slate-300">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[11px]">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-sky-300" />
            Car
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-violet-400" />
            Project
          </div>
        </div>
        <div className="space-y-1 text-right">
          <div className="text-slate-400">Blue marker</div>
          <div className="text-slate-400">Purple icon</div>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          Experience
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-orange-400" />
          Contact
        </div>
      </div>
    </div>
  );
}

export default function GameModeCanvas() {
  const sections = useMemo(
    () => [
      { position: [0, 0, -26], label: "Projects", color: "#7c3aed" },
      { position: [-15, 0, -12], label: "Experience", color: "#0ea5e9" },
      { position: [15, 0, -12], label: "Contact", color: "#38bdf8" },
      { position: [0, 0, 14], label: "Resume", color: "#f97316" },
    ],
    []
  );

  const [carPosition, setCarPosition] = useState<[number, number, number]>([0, 0, 0]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [controlsActive, setControlsActive] = useState(false);

  useEffect(() => {
    wrapperRef.current?.focus();
    setControlsActive(true);
  }, []);

  return (
    <div
      ref={wrapperRef}
      tabIndex={0}
      onClick={() => {
        wrapperRef.current?.focus();
        setControlsActive(true);
      }}
      onKeyDown={() => setControlsActive(true)}
      onPointerDown={() => {
        wrapperRef.current?.focus();
        setControlsActive(true);
      }}
      className="fixed inset-0 z-40 focus:outline-none"
    >
      <Canvas
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        camera={{ position: [0, 18, 36], fov: 58, near: 0.1, far: 280 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        shadows
        dpr={[1, 2]}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color("#87cfff"));
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
      >
        <color attach="background" args={['#87cfff']} />
        <fog attach="fog" args={['#87cfff', 8, 220]} />
        <ambientLight intensity={1.6} />
        <hemisphereLight skyColor="#d6ebff" groundColor="#6b9fa6" intensity={1.0} />
        <directionalLight
          position={[30, 46, 24]}
          intensity={2.3}
          color="#f8fafc"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={1}
          shadow-camera-far={240}
          shadow-camera-left={-74}
          shadow-camera-right={74}
          shadow-camera-top={74}
          shadow-camera-bottom={-74}
        />
        <pointLight position={[0, 24, 0]} intensity={0.9} color="#dbeafe" />
        <pointLight position={[-18, 14, 12]} intensity={0.65} color="#fde68a" />
        <pointLight position={[18, 14, -12]} intensity={0.55} color="#67e8f9" />
        <pointLight position={[0, 14, -30]} intensity={0.45} color="#c4b5fd" />
        <SkyDome />
        <Ground />
        <spotLight position={[20, 40, 20]} angle={0.35} intensity={1.1} color="#facc15" penumbra={0.35} castShadow />
        <BoundaryWall position={[0, 0.75, -95]} rotation={[0, 0, 0]} size={[90, 2, 2]} />
        <BoundaryWall position={[0, 0.75, 95]} rotation={[0, 0, 0]} size={[90, 2, 2]} />
        <BoundaryWall position={[-45, 0.75, 0]} rotation={[0, Math.PI / 2, 0]} size={[180, 2, 2]} />
        <BoundaryWall position={[45, 0.75, 0]} rotation={[0, Math.PI / 2, 0]} size={[180, 2, 2]} />

        <CityScape />
        <Road />
        {sections.map((section) => (
          <Section key={section.label} position={section.position} label={section.label} color={section.color} />
        ))}
        <Car onPositionUpdate={setCarPosition} />
        <Galaxy />
      </Canvas>
      <Minimap carPosition={carPosition} />
      <div className="pointer-events-none absolute left-6 top-6 z-50 max-w-sm rounded-3xl border border-white/15 bg-black/50 p-4 text-sm text-white/80 backdrop-blur-xl">
        <div className="mb-3 text-xs uppercase tracking-[0.36em] text-white/70">Controls</div>
        <div className="space-y-2 text-[13px]">
          <div className="flex items-center justify-between">
            <span>WASD / arrows</span>
            <span className="text-indigo-300">Drive</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Escape</span>
            <span className="text-indigo-300">Exit game mode</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Click anywhere</span>
            <span className="text-indigo-300">Activate controls</span>
          </div>
        </div>
        {!controlsActive && (
          <div className="mt-3 rounded-2xl bg-white/10 p-3 text-xs text-white/80">
            Click on the game area to enable keyboard controls.
          </div>
        )}
      </div>
    </div>
  );
}
