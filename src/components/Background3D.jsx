import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Stars } from "@react-three/drei";
import * as THREE from "three";

const getColors = (theme) => ({
  accent: theme === "light" ? "#6366f1" : "#8b5cf6",
  accent2: theme === "light" ? "#0891b2" : "#22d3ee",
  accent3: theme === "light" ? "#e11d48" : "#f43f5e",
});

function MouseParallaxGroup({ children }) {
  const group = useRef();
  const target = useRef({ x: 0, y: 0 });

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += (target.current.x - group.current.rotation.y) * delta * 2;
    group.current.rotation.x += (target.current.y - group.current.rotation.x) * delta * 2;
  });

  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 0.4;
      const y = (e.clientY / window.innerHeight - 0.5) * 0.25;
      target.current = { x, y: -y };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return <group ref={group}>{children}</group>;
}

function GlowingBlob({ color, position, scale, speed = 1.5, distort = 0.35 }) {
  const mesh = useRef();

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.15 * speed;
      mesh.current.rotation.z = state.clock.elapsedTime * 0.1 * speed;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={mesh} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.35}
          roughness={0.15}
          metalness={0.85}
          distort={distort}
          speed={2}
          transparent
          opacity={0.55}
        />
      </mesh>
    </Float>
  );
}

function TorusAccent({ color, position, rotation }) {
  const ref = useRef();

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.2;
      ref.current.rotation.z += delta * 0.15;
    }
  });

  return (
    <mesh ref={ref} position={position} rotation={rotation}>
      <torusGeometry args={[2.5, 0.04, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.2} />
    </mesh>
  );
}

function FloatingRings({ colors }) {
  const ref = useRef();

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={ref}>
      <TorusAccent color={colors.accent} position={[0, 0, -8]} rotation={[Math.PI / 3, 0, 0]} />
      <TorusAccent color={colors.accent2} position={[3, -2, -12]} rotation={[Math.PI / 4, Math.PI / 6, 0]} />
      <TorusAccent color={colors.accent3} position={[-4, 3, -10]} rotation={[-Math.PI / 5, Math.PI / 3, 0]} />
    </group>
  );
}

function ScrollCamera() {
  const { camera } = useThree();

  useFrame(() => {
    const scrollY = window.scrollY;
    camera.position.y = scrollY * 0.004;
    camera.position.z = 1 + scrollY * 0.0025;
  });

  return null;
}

function MovingStars({ theme }) {
  const ref = useRef();

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y -= delta * 0.02;
    }
  });

  return (
    <group ref={ref} visible={theme === "dark"}>
      <Stars radius={80} depth={40} count={3000} factor={3} saturation={0} fade speed={0.5} />
    </group>
  );
}

function Scene({ theme }) {
  const colors = getColors(theme);

  return (
    <>
      <ambientLight intensity={theme === "light" ? 0.4 : 0.25} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color={colors.accent} />
      <pointLight position={[-10, -5, -5]} intensity={0.8} color={colors.accent2} />
      <ScrollCamera />
      <MovingStars theme={theme} />
      <MouseParallaxGroup>
        <GlowingBlob color={colors.accent} position={[-6, 2, -6]} scale={1.8} speed={1.2} />
        <GlowingBlob color={colors.accent2} position={[7, -3, -8]} scale={1.4} speed={1.8} distort={0.45} />
        <GlowingBlob color={colors.accent3} position={[2, 5, -10]} scale={1.0} speed={2.2} distort={0.5} />
        <FloatingRings colors={colors} />
      </MouseParallaxGroup>
      <fog attach="fog" args={[theme === "light" ? "#e8edf5" : "#030712", 8, 35]} />
    </>
  );
}

export default function Background3D({ theme, disabled = false }) {
  if (disabled) return null;

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none opacity-70">
      <Canvas camera={{ position: [0, 0, 1], fov: 60 }}>
        <Scene theme={theme} />
      </Canvas>
    </div>
  );
}
