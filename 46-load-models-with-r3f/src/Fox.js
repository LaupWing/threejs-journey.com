import { useAnimations, useGLTF } from "@react-three/drei"
import React from "react"
import { useEffect } from "react"

const Fox = () => {
   const fox = useGLTF("./Fox/glTF/Fox.gltf")
   const animations = useAnimations(fox.animations, fox.scene)
   useEffect(() => {
      const action = animations.actions.Run
      action.play()
   }, [])
   return (
      <primitive 
         object={fox.scene}
         position={[-2.5, 0, 2.5]}
         rotation-y={0.3}
         scale={0.02}
      />
   )
}

export default Fox
