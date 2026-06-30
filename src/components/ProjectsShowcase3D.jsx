import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, Text, Float, Sparkles, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

const PROJECT_COLORS = ["#8b5cf6", "#22d3ee", "#f43f5e", "#10b981", "#f59e0b", "#6366f1"];

function ProjectPanel({
  project,
  index,
  total,
  selected,
  onSelect,
  theme,
}) {
  const meshRef = useRef();
  const angle = (index / total) * Math.PI * 2;
  const radius = 4.2;
  const color = project.color || PROJECT_COLORS[index % PROJECT_COLORS.length];
  const name = project.shortName || project.name;

  useFrame((state) => {
    if (!meshRef.current) return;
    const targetScale = selected ? 1.25 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

    if (selected) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.08;
    } else {
      // Smoothly return to 0 when deselected
      meshRef.current.rotation.y += (0 - meshRef.current.rotation.y) * 0.1;
    }
  });

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <group
      position={[Math.sin(angle) * radius, 0, Math.cos(angle) * radius]}
      rotation={[0, angle, 0]}
    >
      <group ref={meshRef}>
        <mesh
          className="project-3d-node"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(index);
          }}
          onPointerOver={(e) => e.stopPropagation()}
          onPointerOut={(e) => e.stopPropagation()}
        >
          <RoundedBox args={[2.4, 1.5, 0.12]} radius={0.06} smoothness={isMobile ? 2 : 4}>
            {selected ? (
              <meshPhysicalMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.6}
                metalness={0.9}
                roughness={0.05}
                clearcoat={1}
                clearcoatRoughness={0.1}
                transparent
                opacity={0.95}
              />
            ) : (
              <meshPhysicalMaterial
                color={theme === "light" ? "#e2e8f0" : "#0f172a"}
                metalness={0.8}
                roughness={0.2}
                clearcoat={0.5}
                clearcoatRoughness={0.2}
                transparent
                opacity={0.7}
              />
            )}
          </RoundedBox>
        </mesh>

        {/* Glowing edge frame */}
        <mesh position={[0, 0, 0.07]}>
          <planeGeometry args={[2.5, 1.6]} />
          <meshBasicMaterial color={color} transparent opacity={selected ? 0.35 : 0.12} />
        </mesh>

        <Text
          position={[0, 0.25, 0.1]}
          fontSize={0.18}
          color={selected ? "#ffffff" : theme === "light" ? "#0f172a" : "#f8fafc"}
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
          maxWidth={2}
          textAlign="center"
        >
          {name}
        </Text>

        <Text
          position={[0, -0.2, 0.1]}
          fontSize={0.1}
          color={color}
          anchorX="center"
          anchorY="middle"
          maxWidth={2}
          textAlign="center"
        >
          {project.status?.toUpperCase() || "PROJECT"}
        </Text>

        {selected && (
          <pointLight position={[0, 0, 1]} intensity={2} color={color} distance={4} />
        )}
      </group>
    </group>
  );
}

function Carousel({ projects, selected, onSelect, theme }) {
  const groupRef = useRef();
  const targetRotation = useRef(0);

  useEffect(() => {
    targetRotation.current = -(selected / projects.length) * Math.PI * 2;
  }, [selected, projects.length]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += (targetRotation.current - groupRef.current.rotation.y) * delta * 3;
  });

  return (
    <group ref={groupRef}>
      {projects.map((project, i) => (
        <ProjectPanel
          key={project.id}
          project={project}
          index={i}
          total={projects.length}
          selected={selected === i}
          onSelect={onSelect}
          theme={theme}
        />
      ))}
    </group>
  );
}

function CentralOrb({ theme }) {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.3;
      ref.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <Float speed={2} floatIntensity={0.6}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[0.55, 1]} />
        <MeshTransmissionMaterial
          backside={!isMobile}
          samples={isMobile ? 3 : 8}
          thickness={0.8}
          chromaticAberration={0.3}
          anisotropy={0.3}
          distortion={0.5}
          distortionScale={0.3}
          temporalDistortion={0.2}
          iridescence={1}
          iridescenceIOR={1.3}
          color={theme === "light" ? "#6366f1" : "#8b5cf6"}
        />
      </mesh>
    </Float>
  );
}

function Scene({ projects, selected, onSelect, theme, lightMode }) {
  const { camera, gl } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = gl.domElement;
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = {
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 0.6,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 0.3,
      };
    };
    canvas.addEventListener("mousemove", onMove, { passive: true });
    return () => canvas.removeEventListener("mousemove", onMove);
  }, [gl]);

  useFrame(() => {
    camera.position.x += (mouse.current.x * 2 - camera.position.x) * 0.05;
    camera.position.y += (-mouse.current.y * 1.5 + 0.5 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={theme === "light" ? 0.6 : 0.35} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#8b5cf6" />
      <pointLight position={[-5, -3, 3]} intensity={1} color="#22d3ee" />
      <spotLight position={[0, 8, 0]} intensity={0.8} angle={0.5} penumbra={1} color="#f8fafc" />

      <CentralOrb theme={theme} />
      <Carousel
        projects={projects}
        selected={selected}
        onSelect={onSelect}
        theme={theme}
      />

      {!lightMode && (
        <Sparkles count={typeof window !== 'undefined' && window.innerWidth < 768 ? 30 : 60} scale={10} size={2} speed={0.4} color="#22d3ee" opacity={0.5} />
      )}

      {/* Floor reflection grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial
          color={theme === "light" ? "#6366f1" : "#8b5cf6"}
          transparent
          opacity={0.04}
          wireframe
        />
      </mesh>
    </>
  );
}

export default function ProjectsShowcase3D({ projects, selected, onSelect, theme, lightMode = false }) {
  const displayProjects = useMemo(() => projects, [projects]);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="relative w-full h-[380px] sm:h-[440px] rounded-3xl overflow-hidden glass-panel project-showcase-3d">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-accent2/5 pointer-events-none z-10" />
      <Canvas
        camera={{ position: [0, 0.5, 9], fov: 45 }}
        dpr={lightMode || isMobile ? [1, 1] : [1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ touchAction: "pan-y" }}
      >
        <Scene
          projects={displayProjects}
          selected={selected}
          onSelect={onSelect}
          theme={theme}
          lightMode={lightMode}
        />
      </Canvas>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20 pointer-events-none">
        {displayProjects.map((p, i) => (
          <button
            key={p.id}
            type="button"
            data-cursor="pointer"
            onClick={() => onSelect(i)}
            className={`pointer-events-auto w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              selected === i
                ? "bg-accent scale-125 shadow-[0_0_12px_var(--accent)]"
                : "bg-dimmed/50 hover:bg-accent/60"
            }`}
            aria-label={`Select ${p.name}`}
          />
        ))}
      </div>

      <p className="absolute top-4 right-4 font-mono text-[0.6rem] text-dimmed uppercase tracking-widest z-20 pointer-events-none">
        Click a panel to explore
      </p>
    </div>
  );
}
