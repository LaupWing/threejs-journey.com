import { useKeyboardControls } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { RigidBody } from "@react-three/rapier"
import React, { useRef } from "react"

const Player = () => {
   const [subscribeKeys, getKeys] = useKeyboardControls()
   const body = useRef()

   useFrame(()=>{
      const {forward, backward, leftward, rightward} = getKeys()
   })

   return (
      <>
         <RigidBody 
            colliders="ball" 
            position={[0, 1, 0]}
            restitution={0.2}
            friction={1}
         >
            <mesh castShadow>
               <icosahedronGeometry args={[0.3, 1]} />
               <meshStandardMaterial flatShading color={"mediumpurple"} />
            </mesh>
         </RigidBody>
      </>
   )
}

export default Player
