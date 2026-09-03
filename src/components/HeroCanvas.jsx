import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useInView } from "framer-motion";
import {
  Float,
  OrbitControls,
  Text,
  Billboard,
  Html,
  MeshDistortMaterial,
  Sparkles as DreiSparkles,
} from "@react-three/drei";
import * as THREE from "three";
import {
  FaJava,
  FaReact,
  FaPython,
  FaGitAlt,
  FaDocker,
} from "react-icons/fa";
import {
  SiSpringboot,
  SiHibernate,
  SiApachekafka,
  SiPostman,
  SiMysql,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { FlaskConical } from "lucide-react";

const getColors = (theme) => ({
  accent: theme === "light" ? "#059669" : "#10b981",
  accent2: theme === "light" ? "#0284c7" : "#06b6d4",
  accent3: theme === "light" ? "#d97706" : "#f59e0b",
  text: theme === "light" ? "#0f172a" : "#f8fafc",
  outline: theme === "light" ? "#ffffff" : "#07090e",
  wireframe: theme === "light" ? "#059669" : "#34d399",
});

function CentralCore({ colors, mouse, lightMode = false }) {
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

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1.2}>
      <group ref={coreRef}>
        <mesh ref={glowRef} scale={1.35}>
          <sphereGeometry args={[0.72, isMobile ? 16 : 32, isMobile ? 16 : 32]} />
          <meshBasicMaterial color={colors.accent} transparent opacity={0.09} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.68, isMobile ? 1 : 2]} />
          {lightMode || isMobile ? (
            <meshStandardMaterial
              color={colors.accent}
              emissive={colors.accent}
              emissiveIntensity={0.5}
              roughness={0.2}
              metalness={0.8}
            />
          ) : (
            <MeshDistortMaterial
              color={colors.accent}
              emissive={colors.accent}
              emissiveIntensity={0.65}
              roughness={0.1}
              metalness={0.9}
              distort={0.25}
              speed={3}
            />
          )}
        </mesh>
        <mesh scale={0.88}>
          <icosahedronGeometry args={[0.68, 1]} />
          <meshStandardMaterial
            color={colors.accent2}
            wireframe
            transparent
            opacity={0.55}
          />
        </mesh>
        <Billboard>
          <Text
            position={[0, 0, 0.85]}
            fontSize={0.2}
            color={colors.text}
            fontWeight="bold"
            letterSpacing={0.05}
            outlineWidth={0.03}
            outlineColor={colors.outline}
          >
            Systems Core
          </Text>
        </Billboard>
      </group>
    </Float>
  );
}

function ConnectingThread({ start = [0, 0, 0], end, color }) {
  const lineGeo = useMemo(() => {
    const points = [
      new THREE.Vector3(start[0], start[1], start[2]),
      new THREE.Vector3(end[0], end[1], end[2]),
    ];
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [start, end]);

  return (
    <line geometry={lineGeo}>
      <lineBasicMaterial color={color} transparent opacity={0.25} />
    </line>
  );
}

function SkillNode({ text, color, radius, speed, angle, yOffset, colors, IconComponent, iconColor }) {
  const groupRef = useRef();

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * speed;
    }
  });

  const nodePos = [Math.cos(angle) * radius, yOffset, Math.sin(angle) * radius];

  return (
    <group ref={groupRef}>
      {/* Connecting thin thread line to center */}
      <ConnectingThread start={[0, 0, 0]} end={nodePos} color={color} />

      <group position={nodePos}>
        <Float speed={2.2} rotationIntensity={1.8} floatIntensity={1.2}>
          <mesh>
            <octahedronGeometry args={[0.34, 0]} />
            <meshStandardMaterial color={color} wireframe transparent opacity={0.4} />
          </mesh>

          {/* Render Vector Icon via Html Center without heavy backdrop blur */}
          <Html center distanceFactor={10} style={{ pointerEvents: "none", userSelect: "none" }}>
            <div className="flex flex-col items-center justify-center p-1.5 rounded-xl bg-[#090d16]/95 border border-slate-700/60 shadow-[0_0_12px_rgba(0,0,0,0.5)]">
              <IconComponent size={20} color={iconColor || color} />
            </div>
          </Html>

          <Billboard>
            <Text
              position={[0, -0.48, 0]}
              fontSize={0.17}
              color={color}
              fontWeight="bold"
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
  const skills = [
    // Java Backend Core Ecosystem
    {
      text: "Java",
      color: colors.accent,
      iconColor: "#e76f51",
      radius: 2.6,
      speed: 0.25,
      angle: 0,
      yOffset: 0.5,
      IconComponent: FaJava,
    },
    {
      text: "SpringBoot",
      color: colors.accent2,
      iconColor: "#6db33f",
      radius: 2.9,
      speed: 0.32,
      angle: Math.PI / 3,
      yOffset: -0.6,
      IconComponent: SiSpringboot,
    },
    {
      text: "Hibernate",
      color: colors.accent,
      iconColor: "#b5a642",
      radius: 3.1,
      speed: 0.22,
      angle: (Math.PI * 2) / 3,
      yOffset: 0.8,
      IconComponent: SiHibernate,
    },
    {
      text: "Microservices",
      color: colors.accent2,
      iconColor: "#38bdf8",
      radius: 3.4,
      speed: 0.35,
      angle: Math.PI,
      yOffset: -0.4,
      IconComponent: TbApi,
    },
    {
      text: "Kafka",
      color: colors.accent,
      iconColor: "#cbd5e1",
      radius: 3.6,
      speed: 0.28,
      angle: (Math.PI * 4) / 3,
      yOffset: 0.7,
      IconComponent: SiApachekafka,
    },
    {
      text: "Postman",
      color: colors.accent2,
      iconColor: "#ff6c37",
      radius: 3.3,
      speed: 0.38,
      angle: (Math.PI * 5) / 3,
      yOffset: -0.8,
      IconComponent: SiPostman,
    },
    {
      text: "JUnit",
      color: colors.accent,
      iconColor: "#2563eb",
      radius: 2.8,
      speed: 0.3,
      angle: Math.PI / 6,
      yOffset: -0.9,
      IconComponent: FlaskConical,
    },

    // Relational DB, DevOps & Full Stack
    {
      text: "MySQL",
      color: colors.accent2,
      iconColor: "#00758f",
      radius: 3.7,
      speed: 0.24,
      angle: (Math.PI * 3) / 4,
      yOffset: 1.0,
      IconComponent: SiMysql,
    },
    {
      text: "Docker",
      color: colors.accent,
      iconColor: "#0db7ed",
      radius: 3.9,
      speed: 0.33,
      angle: (Math.PI * 7) / 6,
      yOffset: -0.7,
      IconComponent: FaDocker,
    },
    {
      text: "React",
      color: colors.accent2,
      iconColor: "#61dafb",
      radius: 3.5,
      speed: 0.4,
      angle: (Math.PI * 11) / 6,
      yOffset: 0.4,
      IconComponent: FaReact,
    },
    {
      text: "Git",
      color: colors.accent,
      iconColor: "#f05032",
      radius: 3.8,
      speed: 0.29,
      angle: (Math.PI * 5) / 4,
      yOffset: -0.5,
      IconComponent: FaGitAlt,
    },
    {
      text: "Python",
      color: colors.accent2,
      iconColor: "#ffd43b",
      radius: 4.0,
      speed: 0.36,
      angle: (Math.PI * 2) / 4,
      yOffset: 0.6,
      IconComponent: FaPython,
    },
  ];

  return (
    <group>
      {skills.map((skill) => (
        <SkillNode key={skill.text} {...skill} colors={colors} />
      ))}
    </group>
  );
}

function OrbitRings({ colors, lightMode = false }) {
  const ref = useRef();

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.03;
      ref.current.rotation.y += delta * 0.05;
      ref.current.rotation.z += delta * 0.02;
    }
  });

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const radialSegments = lightMode || isMobile ? 48 : 96;

  return (
    <group ref={ref}>
      {[
        { r: 2.6, rot: [Math.PI / 3, 0.2, 0], color: colors.accent },
        { r: 3.1, rot: [-Math.PI / 4, 0.6, 0.4], color: colors.accent2 },
        { r: 3.6, rot: [Math.PI / 2.5, -0.5, 0.8], color: colors.accent },
        { r: 4.1, rot: [-Math.PI / 6, 0.8, -0.3], color: colors.accent2 },
      ].map((ring, i) => (
        <mesh key={i} rotation={ring.rot}>
          <torusGeometry args={[ring.r, 0.009, 16, radialSegments]} />
          <meshBasicMaterial
            color={ring.color}
            transparent
            opacity={lightMode ? 0.35 : 0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

function createInitialParticles(count) {
  const temp = [];
  for (let i = 0; i < count; i++) {
    const seed1 = Math.sin(i * 12.9898) * 43758.5453;
    const rand1 = seed1 - Math.floor(seed1);
    const seed2 = Math.sin((i + 1) * 78.233) * 43758.5453;
    const rand2 = seed2 - Math.floor(seed2);
    const seed3 = Math.sin((i + 2) * 45.164) * 43758.5453;
    const rand3 = seed3 - Math.floor(seed3);
    const seed4 = Math.sin((i + 3) * 93.387) * 43758.5453;
    const rand4 = seed4 - Math.floor(seed4);

    const t = rand1 * Math.PI * 2;
    const r = 1.0 + rand2 * 3.8;
    temp.push({
      position: [Math.cos(t) * r, (rand3 - 0.5) * 5, Math.sin(t) * r],
      factor: rand4,
      speed: 0.005 + rand1 * 0.01,
      xFactor: rand2 * 2 - 1,
      yFactor: rand3 * 2 - 1,
      zFactor: rand4 * 2 - 1,
      scale: 0.01 + rand1 * 0.04,
    });
  }
  return temp;
}

function DataParticles({ count = 60, colors }) {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => createInitialParticles(count), [count]);

  useFrame(() => {
    if (!mesh.current) return;
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
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <>
      <ambientLight intensity={theme === "light" ? 0.5 : 0.35} />
      <pointLight position={[8, 8, 8]} intensity={1.5} color={colors.accent2} />
      <pointLight position={[-8, -4, -6]} intensity={1.0} color={colors.accent} />
      <spotLight position={[0, 10, 5]} intensity={0.6} color={colors.accent} angle={0.5} penumbra={1} />

      <CentralCore colors={colors} mouse={mouse} lightMode={lightMode || isMobile} />
      <OrbitingSkills colors={colors} />
      <OrbitRings colors={colors} lightMode={lightMode} />
      <DataParticles count={lightMode || isMobile ? 18 : 60} colors={colors} />
      {!lightMode && !isMobile && (
        <DreiSparkles count={40} scale={8} size={1.5} speed={0.3} color={colors.accent2} opacity={0.6} />
      )}
    </>
  );
}

export default function HeroCanvas({ theme, lightMode = false }) {
  const mouse = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const rectRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "200px" });
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const updateRect = () => {
    if (containerRef.current) {
      rectRef.current = containerRef.current.getBoundingClientRect();
    }
  };

  return (
    <div
      ref={containerRef}
      className="h-full w-full relative cursor-grab active:cursor-grabbing rounded-3xl overflow-hidden glass-panel touch-pan-y"
      style={{ touchAction: "pan-y" }}
      onPointerEnter={updateRect}
      onMouseMove={(e) => {
        const rect = rectRef.current || e.currentTarget.getBoundingClientRect();
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
          style={{ touchAction: "pan-y", pointerEvents: isMobile ? "none" : "auto" }}
        >
          <Suspense fallback={null}>
            <Scene theme={theme} lightMode={lightMode} mouse={mouse} />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableTouch={false}
              autoRotate
              autoRotateSpeed={lightMode || isMobile ? 0.6 : 1.2}
            />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}



