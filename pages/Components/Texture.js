import { OrbitControls, useHelper, Plane, useTexture, ContactShadows, Float } from "@react-three/drei";
import React, { useRef } from "react";
import { Stats } from "@react-three/drei";
import { LinearEncoding, PointLightHelper, Vector2 } from "three";
import { useControls } from "leva";
import { Tree } from "../../Tree";

const TextureScene = () => {

    const lightRef = useRef(null);
    useHelper(lightRef, PointLightHelper, 1, "red");

    const terrainTextures = useTexture({
        map: "Textures/Rocks2_Diff.jpg",
        displacementMap: "Textures/Rocks2_Disp.jpg",
        aoMap: "Textures/Rocks2_AO.jpg",
        roughnessMap: "Textures/Rocks2_Rough.jpg",
        metalnessMap: "Textures/Rocks2_Metal.jpg",
        normalMap: "Textures/Rocks2_Normal.jpg"
    });

    const { displacementScale, aoMapIntensity, roughness, metalness, normalScale } = useControls({
        displacementScale: {
            value: 1,
            min: 0,
            max: 3
        },
        aoMapIntensity: {
            value: 1,
            min: 0,
            max: 10
        },
        roughness: {
            value: 1,
            min: 0,
            max: 1
        },
        metalness: {
            value: 0,
            min: 0,
            max: 1
        },
        normalScale: [1, 1]
    });

    return (
        <React.Fragment>
            <ambientLight />
            <pointLight ref={lightRef} position={[5, 5, 0]} intensity={4} />
            <OrbitControls />
            <Stats />
            <Plane args={[15, 15, 60, 60]} rotation-x={-Math.PI / 2}>
                <meshStandardMaterial {...terrainTextures}
                    normalMap-encoding={LinearEncoding}
                    transparent
                    displacementScale={displacementScale}
                    roughness={roughness}
                    aoMapIntensity={aoMapIntensity}
                    metalness={metalness}
                    metalnessMap={null}
                    normalScale={new Vector2(normalScale[0], normalScale[1])}
                />
            </Plane>

            <Float speed={1.6} rotationIntensity={.2} floatIntensity={.5}>
                <Tree />
            </Float>
        </React.Fragment>
    )
}
export default TextureScene;
