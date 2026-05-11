import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float } from "@react-three/drei";
import * as THREE from "three";

function FloatingShapes() {
  const shapes = useMemo(() => {
    return Array.from({ length: 15 }).map(() => ({
      position: [
        (Math.random() - 0.5) * 30, // x spread
        (Math.random() - 0.5) * 30, // y spread
        (Math.random() - 0.5) * 20 - 10, // z spread (mostly behind)
      ],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
      scale: Math.random() * 0.5 + 0.2,
      speed: Math.random() * 0.2 + 0.1,
      type: Math.floor(Math.random() * 3), // 0: Icosahedron, 1: Torus, 2: Sphere
    }));
  }, []);

  const ref = useRef();

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.children.forEach((child, i) => {
        child.rotation.x += delta * shapes[i].speed;
        child.rotation.y += delta * shapes[i].speed * 1.2;
        child.position.y +=
          Math.sin(state.clock.elapsedTime * shapes[i].speed) * 0.01;
      });
    }
  });

  return (
    <group ref={ref}>
      {shapes.map((props, i) => (
        <mesh
          key={i}
          position={props.position}
          rotation={props.rotation}
          scale={props.scale}
        >
          {props.type === 0 && <icosahedronGeometry args={[1, 0]} />}
          {props.type === 1 && <torusGeometry args={[0.8, 0.2, 16, 32]} />}
          {props.type === 2 && <sphereGeometry args={[0.8, 16, 16]} />}
          <meshStandardMaterial
            color={i % 2 === 0 ? "#7b6ff0" : "#00f5d4"}
            wireframe={i % 3 === 0}
            transparent
            opacity={0.15}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

function MovingStars() {
  const ref = useRef();

  useFrame((state, delta) => {
    if (ref.current) {
      // Gentle constant rotation
      ref.current.rotation.y -= delta * 0.03;
      ref.current.rotation.x -= delta * 0.01;

      // Parallax effect based on mouse scroll and position
      const scrollY = window.scrollY;
      ref.current.position.y = scrollY * 0.005;
    }
  });

  return (
    <group ref={ref}>
      <Stars
        radius={100}
        depth={50}
        count={4000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
    </group>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none opacity-50">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ambientLight intensity={0.2} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          color="#00f5d4"
        />
        <directionalLight
          position={[-10, -10, -5]}
          intensity={1}
          color="#7b6ff0"
        />
        <MovingStars />
        <FloatingShapes />
      </Canvas>
    </div>
  );
}
