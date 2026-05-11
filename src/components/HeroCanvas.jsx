import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/* ── Holographic Inner Core ───────────────────── */
function InnerCore() {
  const ref = useRef();

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.5;
      ref.current.rotation.x += delta * 0.3;
    }
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1, 0]} />
      {/* Glowing neon wireframe */}
      <meshBasicMaterial color="#00f5d4" wireframe />
      {/* Inner solid to catch light */}
      <mesh scale={0.95}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#00f5d4"
          emissive="#00f5d4"
          emissiveIntensity={0.2}
          transparent
          opacity={0.6}
        />
      </mesh>
    </mesh>
  );
}

/* ── Glass Torus Knot Outer ───────────────────── */
function GlassTorus() {
  const ref = useRef();

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y -= delta * 0.15;
      ref.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[1.5, 0.15, 120, 16]} />
      <meshPhysicalMaterial
        color="#7b6ff0"
        transmission={0.9} // Glass effect
        opacity={1}
        metalness={0.2}
        roughness={0.1}
        ior={1.5}
        thickness={0.5}
        transparent={true}
      />
    </mesh>
  );
}

/* ── Floating Tech Particles ──────────────────── */
function TechParticles({ count = 30 }) {
  const mesh = useRef();

  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * Math.PI * 2;
      const r = 2.5 + Math.random() * 2;
      const y = (Math.random() - 0.5) * 4;
      temp.push({
        position: [Math.cos(t) * r, y, Math.sin(t) * r],
        factor: 0.1 + Math.random(),
        speed: 0.01 + Math.random() * 0.015,
        xFactor: Math.random() * 2 - 1,
        yFactor: Math.random() * 2 - 1,
        zFactor: Math.random() * 2 - 1,
      });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    particles.forEach((particle, i) => {
      let { factor, speed, position, xFactor, yFactor, zFactor } = particle;
      const t = (particle.factor += speed);
      dummy.position.set(
        position[0] + Math.cos(t) * xFactor,
        position[1] + Math.sin(t) * yFactor,
        position[2] + Math.cos(t) * zFactor,
      );
      dummy.rotation.set(t, t, t);
      dummy.scale.setScalar(0.08);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#7b6ff0" wireframe />
    </instancedMesh>
  );
}

/* ── Main Scene ────────────────────────────────── */
function OrbitRings() {
  const ref = useRef();

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.2;
      ref.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={ref}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.02, 16, 100]} />
        <meshBasicMaterial color="#00f5d4" transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[2.6, 0.02, 16, 100]} />
        <meshBasicMaterial color="#7b6ff0" transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[2.7, 0.02, 16, 100]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 10]}
        intensity={1.5}
        color="#00f5d4"
      />
      <directionalLight
        position={[-10, -10, -10]}
        intensity={1}
        color="#7b6ff0"
      />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <InnerCore />
        <GlassTorus />
        <OrbitRings />
      </Float>

      <TechParticles count={50} />
    </>
  );
}

/* ── Exported Canvas Component ─────────────────── */
export default function HeroCanvas() {
  return (
    <div
      className="w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] mx-auto relative cursor-grab active:cursor-grabbing"
      style={{ touchAction: "none" }}
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1.5}
        />
      </Canvas>
    </div>
  );
}
