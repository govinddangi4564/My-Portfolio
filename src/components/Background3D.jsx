import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Stars } from "@react-three/drei";


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
    let width = window.innerWidth;
    let height = window.innerHeight;

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
    };

    const onMove = (e) => {
      const x = (e.clientX / width - 0.5) * 0.35;
      const y = (e.clientY / height - 0.5) * 0.2;
      target.current = { x, y: -y };
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <group ref={group}>{children}</group>;
}

function GlowingBlob({ color, position, scale, speed = 1.5, distort = 0.35 }) {
  const mesh = useRef();

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.12 * speed;
      mesh.current.rotation.z = state.clock.elapsedTime * 0.08 * speed;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.3} floatIntensity={1.0}>
      <mesh ref={mesh} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 2]} />
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.8}
          distort={distort}
          speed={1.5}
          transparent
          opacity={0.5}
        />
      </mesh>
    </Float>
  );
}

function TorusAccent({ color, position, rotation }) {
  const ref = useRef();

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.15;
      ref.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <mesh ref={ref} position={position} rotation={rotation}>
      <torusGeometry args={[2.5, 0.04, 8, 48]} />
      <meshBasicMaterial color={color} transparent opacity={0.18} />
    </mesh>
  );
}

function FloatingRings({ colors }) {
  const ref = useRef();

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.04;
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
  useFrame((state) => {
    const scrollY = window.scrollY;
    state.camera.position.y = scrollY * 0.0035;
    state.camera.position.z = 1 + scrollY * 0.002;
  });

  return null;
}

function MovingStars({ theme }) {
  const ref = useRef();

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y -= delta * 0.015;
    }
  });

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <group ref={ref} visible={theme === "dark"}>
      <Stars radius={70} depth={35} count={isMobile ? 350 : 1000} factor={2.5} saturation={0} fade speed={0.4} />
    </group>
  );
}

function Scene({ theme }) {
  const colors = getColors(theme);

  return (
    <>
      <ambientLight intensity={theme === "light" ? 0.4 : 0.25} />
      <pointLight position={[10, 10, 10]} intensity={1.0} color={colors.accent} />
      <pointLight position={[-10, -5, -5]} intensity={0.7} color={colors.accent2} />
      <ScrollCamera />
      <MovingStars theme={theme} />
      <MouseParallaxGroup>
        <GlowingBlob color={colors.accent} position={[-6, 2, -6]} scale={1.8} speed={1.2} />
        <GlowingBlob color={colors.accent2} position={[7, -3, -8]} scale={1.4} speed={1.6} distort={0.4} />
        <GlowingBlob color={colors.accent3} position={[2, 5, -10]} scale={1.0} speed={2.0} distort={0.45} />
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
      <Canvas camera={{ position: [0, 0, 1], fov: 60 }} dpr={[1, 1]} gl={{ antialias: false, powerPreference: "high-performance" }}>
        <Scene theme={theme} />
      </Canvas>
    </div>
  );
}

