import { useRef, useState } from "react";
import React from "react";
import { useFrame } from "@react-three/fiber";
import { useThree, extend } from "@react-three/fiber";
import { Stats } from "@react-three/drei";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

// EXTENDS OrbitControls three.js element
extend({ OrbitControls })

const Cube = ({ rotation, position }) => {

    const meshRef = useRef(null);
    const [rotate, setRotate] = useState(true);

    useFrame(() => {
      if (rotate) {
        meshRef.current.rotation.y += 0.01
      }
    })

    return (
      <mesh
        ref={meshRef}
        rotation={rotation}
        position={position}
        onPointerOver={() => {
          setRotate(false)
        }}
        onPointerOut={() => {
          setRotate(true)
        }}
        castShadow
        receiveShadow
      >
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <meshStandardMaterial attach="material" color="pink" />
        {/* args=[width,height,depth] */}
      </mesh>
    )
  }

  const CubeScene = () => {
    const {
      camera,
      gl: {
        domElement
      }
    } = useThree();

    return (
      <React.Fragment>
        <ambientLight />
        <pointLight intensity={0.3} position={[0, 0, 0]} />
        <gridHelper color="blue" args={[10, 10]} />
        <Cube
          rotation={[10, 10, 0]}
          position={[2, 1, 0]} />
        <orbitControls args={[camera, domElement]} />
        <Stats />
      </React.Fragment>
    )
  }
  export default CubeScene; 