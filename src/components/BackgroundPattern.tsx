"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Shape {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

const BackgroundPattern: React.FC = () => {
  const [shapes, setShapes] = useState<Shape[]>([]);

  useEffect(() => {
    // Generate shapes only on the client to avoid hydration mismatches
    const generated = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 40 + 20,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10,
    }));
    setShapes(generated);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30 dark:opacity-20">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute rounded-full bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.size,
            height: shape.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Additional decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-50/20 to-purple-50/20 dark:from-transparent dark:via-blue-900/10 dark:to-purple-900/10" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-10 dark:opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  );
};

export default BackgroundPattern;
