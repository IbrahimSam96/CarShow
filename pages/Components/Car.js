import React, { useEffect, useRef, useState } from 'react';
// @react-three/fiber
import { useFrame, useLoader } from '@react-three/fiber';
// react-three/drei
import { Bounds, Cloud, Float, Lightformer, MeshReflectorMaterial, Sky, Stars } from "@react-three/drei";
import { CubeCamera, Environment, PerspectiveCamera, Stats, useTexture } from '@react-three/drei'
import { OrbitControls } from '@react-three/drei';
// three
import { Color, RepeatWrapping, TextureLoader, Vector3 } from 'three';
import { CorvetteBlue } from '../../CorvetteBlue';
import { Porche } from '../../Porche';
import { Benz } from '../../Benz';
import { BMW } from '../../BMW';
import { Tesla } from '../../Tesla';
import { Urus } from '../../Urus';
import { AstonMartin } from '../../AstonMartin';
import { Batmobil } from '../../Batmobil';
import { CyberPunk } from '../../CyberPunk';
import { Ferari } from '../../Ferari';
import { Formula1 } from '../../Formula1';
import { Ghost } from '../../Ghost';
import { Maserati } from '../../Maserati';
import { Mclaren } from '../../Mclaren';
import { SCIFI } from '../../SCIFI';
import { Shelby } from '../../Shelby';
import { GWagon6x6 } from '../../GWagon6x6';
import { Bloom, ChromaticAberration, EffectComposer, DepthOfField } from '@react-three/postprocessing';
import { BlendFunction } from "postprocessing"
import { useControls } from 'leva';

import { Canvas } from '@react-three/fiber';

const Rings = () => {

    const ringsRef = useRef([]);

    const data = useControls({
        "Even Rings": {
            value: "#ad7373",
            onChange: (v) => {
                for (let i = 0; i < ringsRef.current.length; i++) {
                    let mesh = ringsRef.current[i];

                    if (i % 2 == 1) {
                        mesh.material.emissive = new Color(v)
                    }
                }
            },
        },
        "Odd Rings": {
            value: "#72adad",
            onChange: (v) => {
                for (let i = 0; i < ringsRef.current.length; i++) {
                    let mesh = ringsRef.current[i];

                    if (i % 2 == 1) {
                    }
                    else {
                        mesh.material.emissive = new Color(v)
                    }
                }
            },
        },
    })


    useEffect(() => {
        for (let i = 0; i < ringsRef.current.length; i++) {
            let mesh = ringsRef.current[i];

            if (i % 2 == 1) {
                mesh.material.emissive = new Color(6, 0.15, 0.7)
            }
            else {
                mesh.material.emissive = new Color(0.1, 0.7, 3)
            }
        }
    }, [])

    useFrame((state) => {
        for (let i = 0; i < ringsRef.current.length; i++) {
            let mesh = ringsRef.current[i];
            let z = (i - 7) * 3.5;
            mesh.position.set(0, 0, -z)
            let dist = Math.abs(z)

            mesh.scale.set(1 - dist * 0.04, 1 - dist * 0.04, 1 - dist * 0.04)

            // if (i % 2 == 1) {
            //     mesh.material.emissive = new Color(6, 0.15, 0.7)
            // }
            // else {
            //     mesh.material.emissive = new Color(0.1, 0.7, 3)
            // }
        }
    })

    return (
        <React.Fragment>
            {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((ring, index) => (
                <mesh castShadow receiveShadow position={[0, 0, 0]} key={index} ref={(el) => (ringsRef.current[index] = el)} >
                    <torusGeometry args={[3.35, 0.05, 16, 100]} />
                    <meshStandardMaterial color={[0, 0, 0]} />
                </mesh>
            )
            )}
        </React.Fragment>
    )
}

const Cube = () => {

    const boxRef = useRef([]);
    // Math.random returns 0-1 Math.pow(X,Y) 0-1^2 
    const [scale] = useState(() => Math.pow(Math.random(), 2) * 0.5 + 0.05);
    const [xRotSpeed] = useState(() => Math.random());
    const [yRotSpeed] = useState(() => Math.random());

    useFrame((state, delta) => {
        for (let i = 0; i < boxRef.current.length; i++) {

            boxRef.current[i].rotation.x += delta * xRotSpeed
            boxRef.current[i].rotation.y += delta * yRotSpeed
        }

    }, [xRotSpeed, yRotSpeed]);

    useEffect(() => {

        for (let i = 0; i < boxRef.current.length; i++) {

            const resetPosition = () => {
                // X returns number between -3 to +3; Y returns numbers 0.1 to 2.6; Z returns numbers 15 to -15
                let v = new Vector3((Math.random() * 2 - 1) * 3, Math.random() * 2.5 + 0.1, (Math.random() * 2 - 1) * 15);
                // if v.x position is less than 0 (meaning in the center of screen blocking car add 1.75 to disperce it) 
                if (v.x < 0) {
                    v.x -= 1.75
                }
                if (v.x > 0) {
                    v.x += 1.75
                }
                return v
            }
            const position = resetPosition()

            // delta means how long since last frame was rendered
            boxRef.current[i].position.set(position.x, position.y, position.z);
        }

    }, [])

    const data = useControls({
        "Even Cubes": {
            value: "#865151",
            onChange: (v) => {
                for (let i = 0; i < boxRef.current.length; i++) {
                    let mesh = boxRef.current[i];

                    if (i % 2 == 1) {
                        mesh.material.color = new Color(v)
                    }
                }
            },
        },
        "Odd Cubes": {
            value: "#3e658c",
            onChange: (v) => {
                for (let i = 0; i < boxRef.current.length; i++) {
                    let mesh = boxRef.current[i];

                    if (i % 2 == 1) {
                    }
                    else {
                        mesh.material.color = new Color(v)
                    }
                }
            },
        },
    })

    return (
        <React.Fragment>
            {[
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((obj, i) => {
                    return (
                        <mesh key={i} ref={(el) => (boxRef.current[i] = el)} scale={scale} castShadow  >
                            <boxGeometry args={[1, 1, 1]} />
                            <meshStandardMaterial color={i % 2 == 0 ? [0.4, 0.1, 0.1] : [0.05, 0.15, 0.4]} envMapIntensity={0.15} />
                        </mesh>
                    )
                })}
        </React.Fragment>

    )
}

const Ground = () => {

    const terrainTextures = useTexture({
        map: "Textures/Snow_Diff.jpg",
        displacementMap: "Textures/Snow_Disp.jpg",
        aoMap: "Textures/Snow_AO.jpg",
        roughnessMap: "Textures/Snow_Rough.jpg",
        metalnessMap: "Textures/Snow_Metal.jpg",
        normalMap: "Textures/Snow_Normal.jpg"
    });

    return (
        <React.Fragment>
            <mesh rotation-x={-Math.PI * 0.5} castShadow receiveShadow>
                <planeGeometry args={[30, 30]} />
                <MeshReflectorMaterial
                    {...terrainTextures}
                    envMapIntensity={0}
                    normalScale={[0.15, 0.15]}
                    dithering={true}
                    color={[0.015, 0.015, 0.015]}
                    roughness={0.5}
                    blur={[1000, 400]} // Blur ground reflections (width, heigt), 0 skips blur
                    mixBlur={30} // How much blur mixes with surface roughness (default = 1)
                    mixStrength={80} // Strength of the reflections
                    mixContrast={1} // Contrast of the reflections
                    resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
                    mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
                    depthScale={0.01} // Scale the depth factor (0 = no depth, default = 0)
                    minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
                    maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
                    depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
                    debug={0}
                    reflectorOffset={0.2} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
                />
            </mesh>
        </React.Fragment>
    )
}

const FloatingGrid = () => {

    const diffuse = useLoader(TextureLoader, "Textures/grid-texture.png");

    useEffect(() => {
        diffuse.wrapS = RepeatWrapping;
        diffuse.wrapT = RepeatWrapping;
        // diffuse.anisotropy = 4;
        diffuse.repeat.set(30, 30);
        diffuse.offset.set(0, 0)
    }, [diffuse]);

    //       useFrame((state, delta) => {
    //     let t = -state.clock.getElapsedTime() * 0.68;
    //     diffuse.offset.set(0, t);
    //   });


    return (
        <React.Fragment>
            <mesh rotation-x={-Math.PI * 0.5} position={[0, 0.225, 0]}>
                <planeGeometry args={[35, 35]} />
                <meshBasicMaterial
                    color={[1, 1, 1]}
                    opacity={0.15}
                    map={diffuse}
                    alphaMap={diffuse}
                    transparent={true}
                />
            </mesh>
        </React.Fragment>
    )
}

const CarScene = () => {

    const color = useControls({
        Bakground: '#000000',
    })

    return (
        <React.Fragment>
            <Canvas shadows camera={{ position: [0, 10, 5] }}>

                <Stats />
                <ambientLight intensity={1} />
                <OrbitControls />
                <PerspectiveCamera makeDefault fov={50} position={[1, 1.05, 4]} />

                <color args={[color.Bakground]} attach="background" />

                <CubeCamera resolution={125} frames={Infinity}>
                    {(texture) => (
                        <React.Fragment>
                            <Environment map={texture} />
                            {/* Elements here wont reflect on car */}
                            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                            <Ghost />
                        </React.Fragment>
                    )}
                </CubeCamera>
                <Rings />
                <Cube />
                {/* {[
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((obj, i) => {
                    return (
                        <Cube key={i} Color={i % 2 == 0 ? [0.4, 0.1, 0.1] : [0.05, 0.15, 0.4]} />
                    )
                })} */}
                <FloatingGrid />
                <spotLight
                    color={[1, 0.25, 0.7]}
                    intensity={1.5}
                    angle={0.6}
                    penumbra={0.5}
                    position={[5, 5, 0]}
                    castShadow
                    shadow-bias={-0.0001}
                />
                <spotLight
                    color={[0.14, 0.5, 1]}
                    intensity={2}
                    angle={0.6}
                    penumbra={0.5}
                    position={[-5, 5, 0]}
                    castShadow
                    shadow-bias={-0.0001}
                />
                <Ground />

                <EffectComposer>
                    <DepthOfField focusDistance={0.0036} focalLength={0.01} bokehScale={6} height={480} />
                    <Bloom
                        blendFunction={BlendFunction.ADD}
                        intensity={1.3}
                        width={300}
                        height={300}
                        kernelSize={5}
                        luminanceThreshold={0.65}
                        luminanceSmoothing={0.25}
                    />
                    <ChromaticAberration
                        blendFunction={BlendFunction.NORMAL}
                        offset={[0.0005, 0.0012]} />
                </EffectComposer>
            </Canvas>

        </React.Fragment>
    )
}
export default CarScene;
