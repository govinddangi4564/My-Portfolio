import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

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
        <MovingStars />
      </Canvas>
    </div>
  );
}
