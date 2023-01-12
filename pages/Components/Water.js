import { OrbitControls, useHelper, Plane, useTexture, ContactShadows, Float, Cloud, Sky, Stars } from "@react-three/drei";
import React, { useRef } from "react";
import { Stats } from "@react-three/drei";
import { useControls } from "leva";
import { WaterAnimations } from "../../WaterAnimation";

const WaterScene = () => {
    return (

        <React.Fragment>
            <ambientLight />
            <pointLight position={[5, 5, 0]} intensity={4} />
            <OrbitControls />
            <Stats />

            <WaterAnimations />
        </React.Fragment>
    )
}

export default WaterScene;