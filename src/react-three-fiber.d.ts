import * as THREE from "three";
import { ReactThreeFiber } from "@react-three/fiber";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: ReactThreeFiber.Object3DNode<THREE.Group, typeof THREE.Group>;
      mesh: ReactThreeFiber.Object3DNode<THREE.Mesh, typeof THREE.Mesh>;
      points: ReactThreeFiber.Object3DNode<THREE.Points, typeof THREE.Points>;
      bufferGeometry: ReactThreeFiber.Node<THREE.BufferGeometry, typeof THREE.BufferGeometry>;
      bufferAttribute: ReactThreeFiber.Node<THREE.BufferAttribute, typeof THREE.BufferAttribute>;
      pointsMaterial: ReactThreeFiber.Node<THREE.PointsMaterial, typeof THREE.PointsMaterial>;
      ambientLight: ReactThreeFiber.Object3DNode<THREE.AmbientLight, typeof THREE.AmbientLight>;
      pointLight: ReactThreeFiber.Object3DNode<THREE.PointLight, typeof THREE.PointLight>;
      meshPhongMaterial: ReactThreeFiber.Node<THREE.MeshPhongMaterial, typeof THREE.MeshPhongMaterial>;
      sphereGeometry: ReactThreeFiber.Node<THREE.SphereGeometry, typeof THREE.SphereGeometry>;
      boxGeometry: ReactThreeFiber.Node<THREE.BoxGeometry, typeof THREE.BoxGeometry>;
      torusGeometry: ReactThreeFiber.Node<THREE.TorusGeometry, typeof THREE.TorusGeometry>;
      meshStandardMaterial: ReactThreeFiber.Node<THREE.MeshStandardMaterial, typeof THREE.MeshStandardMaterial>;
    }
  }
}

export {};
