import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  OrbitControls,
  Text,
  Billboard,
  Image,
} from "@react-three/drei";
import * as THREE from "three";

/* -- Theme Config -- */
const getColors = (theme) => ({
  accent: theme === "light" ? "#4338ca" : "#8b5cf6",
  accent2: theme === "light" ? "#0f766e" : "#10b981",
  text: theme === "light" ? "#1e293b" : "#f8fafc",
  outline: theme === "light" ? "#ffffff" : "#0f172a",
  wireframe: theme === "light" ? "#94a3b8" : "#ffffff",
});

/* -- Central Core ------------------------------- */
function CentralCore({ colors }) {
  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={1}>
      <mesh>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshStandardMaterial color={colors.accent2} wireframe />
      </mesh>
      <mesh scale={0.9}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshStandardMaterial
          color={colors.accent}
          emissive={colors.accent}
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </mesh>
      <Billboard>
        <Text
          position={[0, 0, 0]}
          fontSize={0.25}
          color={colors.text}
          fontWeight="bold"
          outlineWidth={0.02}
          outlineColor={colors.outline}
        >
          Full Stack
        </Text>
      </Billboard>
    </Float>
  );
}

/* -- Floating Skill Node ----------------------- */
function SkillNode({
  text,
  color,
  radius,
  speed,
  angle,
  yOffset,
  colors,
  logo,
}) {
  const groupRef = useRef();

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * speed;
    }
  });

  return (
    <group ref={groupRef}>
      <group
        position={[Math.cos(angle) * radius, yOffset, Math.sin(angle) * radius]}
      >
        <Float speed={2} rotationIntensity={2} floatIntensity={1.5}>
          {/* Logo Billboard */}
          <Billboard>
            <Image
              url={logo}
              scale={[0.6, 0.6]}
              transparent
              opacity={0.9}
              toneMapped={false}
            />
          </Billboard>

          <mesh position={[0, 0, 0]}>
            <octahedronGeometry args={[0.4, 0]} />
            <meshStandardMaterial
              color={color}
              wireframe
              transparent
              opacity={0.3}
            />
          </mesh>

          <Billboard>
            <Text
              position={[0, -0.6, 0]}
              fontSize={0.25}
              color={color}
              outlineWidth={0.04}
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

/* -- Revolving Skills Orbit --------------------- */
function OrbitingSkills({ colors, lightMode = false }) {
  const iconBase = "https://cdn.iconscout.com/icon/free/png-256/";

  const skills = [
    {
      text: "React",
      color: colors.accent2,
      radius: 2.6,
      speed: 0.3,
      angle: 0,
      yOffset: 0.6,
      logo: `${iconBase}free-react-1-282599.png`,
    },
    {
      text: "Java",
      color: colors.accent,
      radius: 3.0,
      speed: 0.2,
      angle: Math.PI / 4,
      yOffset: -0.6,
      logo: `${iconBase}free-java-60-1174953.png`,
    },
    {
      text: "Spring Boot",
      color: colors.accent2,
      radius: 2.8,
      speed: 0.4,
      angle: Math.PI / 2,
      yOffset: 1.0,
      logo: `https://img.icons8.com/color/256/spring-logo.png`,
    },
    {
      text: "MySQL",
      color: colors.accent,
      radius: 3.3,
      speed: 0.25,
      angle: (Math.PI * 3) / 4,
      yOffset: -1.0,
      logo: `${iconBase}free-mysql-3521596-2945040.png`,
    },
    {
      text: "Python",
      color: colors.accent2,
      radius: 2.7,
      speed: 0.45,
      angle: Math.PI,
      yOffset: 0.4,
      logo: `${iconBase}free-python-3521655-2945099.png`,
    },
    {
      text: "JS",
      color: colors.accent,
      radius: 2.9,
      speed: 0.35,
      angle: (Math.PI * 5) / 4,
      yOffset: -0.5,
      logo: `${iconBase}free-javascript-1-225993.png`,
    },
    {
      text: "Git",
      color: colors.accent2,
      radius: 3.1,
      speed: 0.28,
      angle: (Math.PI * 6) / 4,
      yOffset: 0.8,
      logo: `https://img.icons8.com/color/256/git.png`,
    },
    {
      text: "Docker",
      color: colors.accent,
      radius: 3.4,
      speed: 0.32,
      angle: (Math.PI * 7) / 4,
      yOffset: -0.8,
      logo: `https://img.icons8.com/color/256/docker.png`,
    },
  ];

  return (
    <group>
      {skills.map((skill, i) => (
        <SkillNode key={i} {...skill} colors={colors} />
      ))}
    </group>
  );
}

/* -- Connection Lines --------------------------- */
function ConnectionLines({ colors, lightMode = false }) {
  const skills = [
    { radius: 2.6, speed: 0.3, angle: 0, yOffset: 0.6 },
    { radius: 3.0, speed: 0.2, angle: Math.PI / 4, yOffset: -0.6 },
    { radius: 2.8, speed: 0.4, angle: Math.PI / 2, yOffset: 1.0 },
    { radius: 3.3, speed: 0.25, angle: (Math.PI * 3) / 4, yOffset: -1.0 },
    { radius: 2.7, speed: 0.45, angle: Math.PI, yOffset: 0.4 },
    { radius: 2.9, speed: 0.35, angle: (Math.PI * 5) / 4, yOffset: -0.5 },
    { radius: 3.1, speed: 0.28, angle: (Math.PI * 6) / 4, yOffset: 0.8 },
    { radius: 3.4, speed: 0.32, angle: (Math.PI * 7) / 4, yOffset: -0.8 },
  ];

  const lineRefs = useRef([]);

  useFrame((state, delta) => {
    lineRefs.current.forEach((line, i) => {
      if (line) {
        const skill = skills[i];
        skill.angle += delta * skill.speed; // Sync with SkillNode rotation
        const x = Math.cos(skill.angle) * skill.radius;
        const z = Math.sin(skill.angle) * skill.radius;
        const y = skill.yOffset;

        const attr = line.geometry.attributes.position;
        if (attr) {
          attr.array[3] = x;
          attr.array[4] = y;
          attr.array[5] = z;
          attr.needsUpdate = true;
        }
      }
    });
  });

  return (
    <group>
      {skills.map((_, i) => (
        <line key={i} ref={(el) => (lineRefs.current[i] = el)}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array(6)}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color={i % 2 === 0 ? colors.accent : colors.accent2}
            transparent
            opacity={0.15}
          />
        </line>
      ))}
    </group>
  );
}

/* -- Decorative Orbit Rings --------------------- */
function OrbitRings({ colors, lightMode = false }) {
  const ref = useRef();
  const radialSegments = lightMode ? 48 : 100;
  const tubeSegments = lightMode ? 16 : 32;
  const baseOpacity = lightMode ? 0.28 : 0.15;
  const accentOpacity = lightMode ? 0.34 : 0.2;

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.05;
      ref.current.rotation.y += delta * 0.05;
    }
  });
  return (
    <group ref={ref}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.2, lightMode ? 0.016 : 0.02, tubeSegments, radialSegments]} />
        <meshBasicMaterial
          color={colors.wireframe}
          transparent
          opacity={baseOpacity}
        />
      </mesh>
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[3.6, lightMode ? 0.014 : 0.02, tubeSegments, radialSegments]} />
        <meshBasicMaterial color={colors.accent} transparent opacity={accentOpacity} />
      </mesh>
      <mesh rotation={[-Math.PI / 3, -Math.PI / 4, 0]}>
        <torusGeometry args={[2.9, lightMode ? 0.014 : 0.02, tubeSegments, radialSegments]} />
        <meshBasicMaterial color={colors.accent2} transparent opacity={accentOpacity} />
      </mesh>
      {lightMode && (
        <mesh rotation={[Math.PI / 2.6, -Math.PI / 5, 0]}>
          <torusGeometry args={[2.35, 0.012, 12, 44]} />
          <meshBasicMaterial color={colors.wireframe} transparent opacity={0.24} />
        </mesh>
      )}
    </group>
  );
}

/* -- Floating Data Particles -------------------- */
function DataParticles({ count = 30, colors }) {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * Math.PI * 2;
      const r = 1.0 + Math.random() * 3.5;
      const y = (Math.random() - 0.5) * 5;
      temp.push({
        position: [Math.cos(t) * r, y, Math.sin(t) * r],
        factor: 0.1 + Math.random(),
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
      let { speed, position, xFactor, yFactor, zFactor, scale } = particle;
      const t = (particle.factor += speed);
      dummy.position.set(
        position[0] + Math.cos(t) * xFactor,
        position[1] + Math.sin(t) * yFactor,
        position[2] + Math.cos(t) * zFactor,
      );
      dummy.rotation.set(t, t, t);
      dummy.scale.setScalar(scale);
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

/* -- Main Scene Composition -------------------- */
function Scene({ theme, lightMode = false }) {
  const colors = getColors(theme);

  return (
    <>
      <ambientLight intensity={theme === "light" ? 0.35 : 0.4} />
      <directionalLight
        position={[10, 10, 10]}
        intensity={theme === "light" ? 0.6 : 1.0}
        color={colors.accent2}
      />
      <directionalLight
        position={[-10, -10, -10]}
        intensity={theme === "light" ? 0.5 : 0.8}
        color={colors.accent}
      />

      <CentralCore colors={colors} />
      <OrbitingSkills colors={colors} lightMode={lightMode} />
      <ConnectionLines colors={colors} lightMode={lightMode} />
      <OrbitRings colors={colors} lightMode={lightMode} />
      <DataParticles count={lightMode ? 24 : 80} colors={colors} />
    </>
  );
}

/* -- Exported Canvas Component ------------------ */
export default function HeroCanvas({ theme, lightMode = false }) {
  return (
    <div
      className="h-full w-full mx-auto relative cursor-grab active:cursor-grabbing"
      style={{ touchAction: "none" }}
    >
      <Canvas
        camera={{ position: [0, 0, 11], fov: 45 }}
        dpr={lightMode ? [1, 1] : [1, 1.25]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <Scene theme={theme} lightMode={lightMode} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={lightMode ? 0.55 : 1.0}
        />
      </Canvas>
    </div>
  );
}
