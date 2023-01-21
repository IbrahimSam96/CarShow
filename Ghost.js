import React, { useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


export const Ghost = () => {

    const gltf = useLoader(GLTFLoader, "Models/Ghost/Ghost.gltf")

    useEffect(() => {
        gltf.scene.scale.set(2, 2, 2);
        gltf.scene.position.set(0, 0.5, 0);
        gltf.scene.traverse((object) => {
            if (object instanceof Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.envMapIntensity = 20;
            }
        })
    }, [gltf])

    return <primitive object={gltf.scene} />;

} 