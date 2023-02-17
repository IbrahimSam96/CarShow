import React, { useEffect, useRef, useState } from 'react';
import { Stats } from '@react-three/drei'


const BackgroundScene = () => {

    const [bgColor, setBgColor] = useState("");

    useEffect(() => {
        setBgColor("hotpink")
    }, [])

    return (
        <React.Fragment>
            <Stats />
            <ambientLight intensity={1} />
            {/* <OrbitControls />
            <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} /> */}

            <color args={[bgColor]} attach="background" />

        </React.Fragment>
    )

}
export default BackgroundScene;
