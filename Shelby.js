import React, { useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


export const Shelby = () => {

    const gltf = useLoader(GLTFLoader, "Models/Shelby/Shelby.gltf")

    useEffect(() => {
        gltf.scene.scale.set(0.7, 0.7, 0.7);
        gltf.scene.position.set(0, 0.01, -1);
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