import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, OrbitControls, Float } from '@react-three/drei';
import { useInView } from 'framer-motion';
import * as THREE from 'three';

function Globe() {
  const meshRef = useRef();
  const outerRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15;
    }
    if (outerRef.current) {
      outerRef.current.rotation.y -= delta * 0.1;
      outerRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group>
        {/* Core Wireframe */}
        <Sphere ref={meshRef} args={[2.2, 32, 32]}>
          <meshBasicMaterial 
            color="#00e6ff" 
            wireframe 
            transparent 
            opacity={0.25} 
            blending={THREE.AdditiveBlending}
          />
        </Sphere>
        
        {/* Inner solid sphere to block back lines */}
        <Sphere args={[2.15, 32, 32]}>
          <meshBasicMaterial color="#020617" />
        </Sphere>
        
        {/* Outer glowing shell */}
        <Sphere ref={outerRef} args={[2.4, 16, 16]}>
          <meshBasicMaterial 
            color="#a5b4fc" 
            wireframe 
            transparent 
            opacity={0.08} 
            blending={THREE.AdditiveBlending}
          />
        </Sphere>
      </group>
    </Float>
  );
}

export default function Earth3D({ lightMode = false }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "200px" });

  if (lightMode) return null;

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 opacity-80 mix-blend-screen pointer-events-auto cursor-grab active:cursor-grabbing hidden lg:block">
      {isInView && (
        <Canvas camera={{ position: [0, 0, 7], fov: 45 }} dpr={[1, 1]} gl={{ antialias: false, powerPreference: "high-performance" }}>
          <ambientLight intensity={0.5} />
        <Globe />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableDamping 
          dampingFactor={0.05} 
          autoRotate 
          autoRotateSpeed={0.3}
        />
        </Canvas>
      )}
    </div>
  );
}
