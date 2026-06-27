import { motion } from "framer-motion";

export default function TiltCard({
  children,
  className = "",
  scale = 1.02,
  style = {},
}) {
  return (
    <motion.div
      whileHover={{ 
        y: -8, 
        scale: scale,
      }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 30 
      }}
      className={`relative ${className}`}
      style={{
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}
