import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useInView } from "framer-motion";
import {
  Float,
  OrbitControls,
  Text,
  Billboard,
  Image,
  MeshDistortMaterial,
  Sparkles as DreiSparkles,
} from "@react-three/drei";
import * as THREE from "three";

const getColors = (theme) => ({
  accent: theme === "light" ? "#6366f1" : "#8b5cf6",
  accent2: theme === "light" ? "#0891b2" : "#22d3ee",
  text: theme === "light" ? "#0f172a" : "#f8fafc",
  outline: theme === "light" ? "#ffffff" : "#030712",
  wireframe: theme === "light" ? "#94a3b8" : "#ffffff",
});

function CentralCore({ colors, mouse }) {
  const coreRef = useRef();
  const glowRef = useRef();

  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.y = state.clock.elapsedTime * 0.3 + mouse.current.x * 0.5;
      coreRef.current.rotation.x = mouse.current.y * 0.3;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.05);
    }
  });

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1.2}>
      <group ref={coreRef}>
        <mesh ref={glowRef} scale={1.3}>
          <sphereGeometry args={[0.7, isMobile ? 16 : 32, isMobile ? 16 : 32]} />
          <meshBasicMaterial color={colors.accent} transparent opacity={0.08} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.65, isMobile ? 1 : 2]} />
          <MeshDistortMaterial
            color={colors.accent}
            emissive={colors.accent}
            emissiveIntensity={0.6}
            roughness={0.1}
            metalness={0.9}
            distort={0.25}
            speed={3}
          />
        </mesh>
        <mesh scale={0.85}>
          <icosahedronGeometry args={[0.65, 1]} />
          <meshStandardMaterial
            color={colors.accent2}
            wireframe
            transparent
            opacity={0.5}
          />
        </mesh>
        <Billboard>
          <Text
            position={[0, 0, 0.8]}
            fontSize={0.22}
            color={colors.text}
            fontWeight="bold"
            outlineWidth={0.025}
            outlineColor={colors.outline}
          >
            Full Stack
          </Text>
        </Billboard>
      </group>
    </Float>
  );
}

function SkillNode({ text, color, radius, speed, angle, yOffset, colors, logo }) {
  const groupRef = useRef();

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * speed;
    }
  });

  return (
    <group ref={groupRef}>
      <group position={[Math.cos(angle) * radius, yOffset, Math.sin(angle) * radius]}>
        <Float speed={2} rotationIntensity={2} floatIntensity={1.5}>
          <Billboard>
            <Image url={logo} scale={[0.55, 0.55]} transparent opacity={0.95} toneMapped={false} />
          </Billboard>
          <mesh>
            <octahedronGeometry args={[0.35, 0]} />
            <meshStandardMaterial color={color} wireframe transparent opacity={0.35} />
          </mesh>
          <Billboard>
            <Text
              position={[0, -0.55, 0]}
              fontSize={0.2}
              color={color}
              outlineWidth={0.035}
              outlineColor={colors.outline}
            >
              {text}
            </Text>
          </Billboard>
        </Float>
      </group>
    </group>
  );
}

function OrbitingSkills({ colors }) {
  const iconBase = "https://cdn.iconscout.com/icon/free/png-256/";

  const skills = [
    { text: "React", color: colors.accent2, radius: 2.6, speed: 0.3, angle: 0, yOffset: 0.6, logo: `${iconBase}free-react-1-282599.png` },
    { text: "Java", color: colors.accent, radius: 3.0, speed: 0.2, angle: Math.PI / 4, yOffset: -0.6, logo: `${iconBase}free-java-60-1174953.png` },
    { text: "Spring", color: colors.accent2, radius: 2.8, speed: 0.4, angle: Math.PI / 2, yOffset: 1.0, logo: "https://img.icons8.com/color/256/spring-logo.png" },
    { text: "MySQL", color: colors.accent, radius: 3.3, speed: 0.25, angle: (Math.PI * 3) / 4, yOffset: -1.0, logo: `${iconBase}free-mysql-3521596-2945040.png` },
    { text: "Python", color: colors.accent2, radius: 2.7, speed: 0.45, angle: Math.PI, yOffset: 0.4, logo: `${iconBase}free-python-3521655-2945099.png` },
    { text: "JS", color: colors.accent, radius: 2.9, speed: 0.35, angle: (Math.PI * 5) / 4, yOffset: -0.5, logo: `${iconBase}free-javascript-1-225993.png` },
    { text: "Git", color: colors.accent2, radius: 3.1, speed: 0.28, angle: (Math.PI * 6) / 4, yOffset: 0.8, logo: "https://img.icons8.com/color/256/git.png" },
    { text: "Docker", color: colors.accent, radius: 3.4, speed: 0.32, angle: (Math.PI * 7) / 4, yOffset: -0.8, logo: "https://img.icons8.com/color/256/docker.png" },
  ];

  return (
    <group>
      {skills.map((skill, i) => (
        <SkillNode key={i} {...skill} colors={colors} />
      ))}
    </group>
  );
}

function OrbitRings({ colors, lightMode = false }) {
  const ref = useRef();

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.04;
      ref.current.rotation.y += delta * 0.06;
    }
  });

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const radialSegments = lightMode || isMobile ? 48 : 100;

  return (
    <group ref={ref}>
      {[3.2, 3.6, 2.9].map((r, i) => (
        <mesh key={r} rotation={[Math.PI / (2 + i * 0.5), i * 0.4, i * 0.3]}>
          <torusGeometry args={[r, 0.018, 16, radialSegments]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? colors.accent : colors.accent2}
            transparent
            opacity={lightMode ? 0.3 : 0.18}
          />
        </mesh>
      ))}
    </group>
  );
}

function DataParticles({ count = 60, colors }) {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * Math.PI * 2;
      const r = 1.0 + Math.random() * 3.5;
      temp.push({
        position: [Math.cos(t) * r, (Math.random() - 0.5) * 5, Math.sin(t) * r],
        factor: Math.random(),
        speed: 0.005 + Math.random() * 0.01,
        xFactor: Math.random() * 2 - 1,
        yFactor: Math.random() * 2 - 1,
        zFactor: Math.random() * 2 - 1,
        scale: 0.01 + Math.random() * 0.04,
      });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    particles.forEach((particle, i) => {
      const t = (particle.factor += particle.speed);
      dummy.position.set(
        particle.position[0] + Math.cos(t) * particle.xFactor,
        particle.position[1] + Math.sin(t) * particle.yFactor,
        particle.position[2] + Math.cos(t) * particle.zFactor,
      );
      dummy.rotation.set(t, t, t);
      dummy.scale.setScalar(particle.scale);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color={colors.accent2} wireframe />
    </instancedMesh>
  );
}

function Scene({ theme, lightMode, mouse }) {
  const colors = getColors(theme);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <>
      <ambientLight intensity={theme === "light" ? 0.5 : 0.35} />
      <pointLight position={[8, 8, 8]} intensity={1.5} color={colors.accent2} />
      <pointLight position={[-8, -4, -6]} intensity={1.0} color={colors.accent} />
      <spotLight position={[0, 10, 5]} intensity={0.6} color={colors.accent} angle={0.5} penumbra={1} />

      <CentralCore colors={colors} mouse={mouse} />
      <OrbitingSkills colors={colors} />
      <OrbitRings colors={colors} lightMode={lightMode} />
      <DataParticles count={lightMode || isMobile ? 24 : 60} colors={colors} />
      {!lightMode && (
        <DreiSparkles count={isMobile ? 30 : 80} scale={8} size={1.5} speed={0.3} color={colors.accent2} opacity={0.6} />
      )}
    </>
  );
}

export default function HeroCanvas({ theme, lightMode = false }) {
  const mouse = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "200px" });

  return (
    <div
      ref={containerRef}
      className="h-full w-full relative cursor-grab active:cursor-grabbing rounded-3xl overflow-hidden glass-panel"
      style={{ touchAction: "none" }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouse.current = {
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
        };
      }}
    >
      {isInView && (
        <Canvas
          camera={{ position: [0, 0, 11], fov: 42 }}
          dpr={[1, 1]}
          gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        >
          <Scene theme={theme} lightMode={lightMode} mouse={mouse} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={lightMode ? 0.6 : 1.2}
          />
        </Canvas>
      )}
    </div>
  );
}
