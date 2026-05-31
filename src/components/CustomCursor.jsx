import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const getCursorEnabled = () =>
    window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [enabled, setEnabled] = useState(getCursorEnabled);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      // Expand cursor on clickable elements or elements with data-cursor="pointer"
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.magnetic') ||
        target.getAttribute('data-cursor') === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const pointerMedia = window.matchMedia('(pointer: fine)');
    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateEnabled = () => setEnabled(getCursorEnabled());

    pointerMedia.addEventListener('change', updateEnabled);
    motionMedia.addEventListener('change', updateEnabled);

    if (enabled) {
      window.addEventListener('mousemove', updateMousePosition);
      window.addEventListener('mouseover', handleMouseOver);
    }

    return () => {
      pointerMedia.removeEventListener('change', updateEnabled);
      motionMedia.removeEventListener('change', updateEnabled);
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [enabled]);

  const variants = {
    default: {
      x: mousePosition.x - 10,
      y: mousePosition.y - 10,
      width: 20,
      height: 20,
      backgroundColor: 'transparent',
      border: '2px solid var(--accent)',
      transition: {
        type: 'spring',
        mass: 0.1,
        stiffness: 800,
        damping: 30,
      },
    },
    hover: {
      x: mousePosition.x - 25,
      y: mousePosition.y - 25,
      width: 50,
      height: 50,
      backgroundColor: 'var(--accent-glow, rgba(124, 58, 237, 0.2))',
      border: '1px solid var(--accent)',
      transition: {
        type: 'spring',
        mass: 0.1,
        stiffness: 800,
        damping: 30,
      },
    },
  };

  // Hide the default cursor on desktop, but keep it on touch devices
  useEffect(() => {
    if (!enabled) return undefined;

    document.body.style.cursor = 'none';
    const clickableElements = document.querySelectorAll('a, button');
    clickableElements.forEach((el) => {
      el.style.cursor = 'none';
    });
    
    return () => {
      document.body.style.cursor = 'auto';
      const clickableElements = document.querySelectorAll('a, button');
      clickableElements.forEach((el) => {
        el.style.cursor = 'pointer';
      });
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        variants={variants}
        animate={isHovering ? 'hover' : 'default'}
      />
      {/* Small dot that follows instantly */}
      <div 
        className="fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[10000] hidden md:block"
        style={{
          transform: `translate(${mousePosition.x - 4}px, ${mousePosition.y - 4}px)`,
        }}
      />
    </>
  );
}
