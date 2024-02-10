"use client";

import React, { useRef } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { OrbitControls } from "@react-three/drei";
import {
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";
import { motion } from "framer-motion-3d";

export default function Cube() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });
  const progress = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const smoothProgress = useSpring(progress, { damping: 20 });

  return (
      <Canvas>
        <OrbitControls enableZoom={false} enablePan={false} />
        <ambientLight intensity={2} />
        <directionalLight position={[2, 1, 1]} />
        <ThreeDCube progress={smoothProgress} />
      </Canvas>
  );
}

function ThreeDCube({ progress }: any) {
  const meshRef = useRef(null);

  const textureOne = useLoader(TextureLoader, "/assets/1.jpg");
  const textureTwo = useLoader(TextureLoader, "/assets/2.jpg");
  const textureThree = useLoader(TextureLoader, "/assets/3.jpg");
  const textureFour = useLoader(TextureLoader, "/assets/4.jpg");
  const textureFive = useLoader(TextureLoader, "/assets/5.jpg");
  const textureSix = useLoader(TextureLoader, "/assets/6.jpg");

  return (
    <motion.mesh ref={meshRef} rotation-y={progress} rotation-x={progress}>
      <boxGeometry args={[2.5, 2.5, 2.5]} />
      <meshStandardMaterial map={textureOne} attach={"material-0"} />
      <meshStandardMaterial map={textureTwo} attach={"material-1"} />
      <meshStandardMaterial map={textureThree} attach={"material-2"} />
      <meshStandardMaterial map={textureFour} attach={"material-3"} />
      <meshStandardMaterial map={textureFive} attach={"material-4"} />
      <meshStandardMaterial map={textureSix} attach={"material-5"} />
    </motion.mesh>
  );
}
