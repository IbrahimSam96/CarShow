import React, { useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


export const Mclaren = () => {

    const gltf = useLoader(GLTFLoader, "Models/Mclaren/Mclaren.gltf")

    useEffect(() => {
        gltf.scene.scale.set(1.5, 1.5, 1.5);
        gltf.scene.rotateY(Math.PI / 2)

        gltf.scene.position.set(0, 0.01, 0);
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