import { useAnimations, useGLTF } from "@react-three/drei"
import { useControls } from "leva"
import React from "react"
import { useEffect } from "react"

const Fox = () => {
   const fox = useGLTF("./Fox/glTF/Fox.gltf")
   const animations = useAnimations(fox.animations, fox.scene)

   const { animationName } = useControls({
      animationName: {
         options: animations.names
      }
   })

   useEffect(() => {
      const action = animations.actions[animationName]
      action.reset().fadeIn(0.5).play()

      return () =>{
         action.fadeOut(0.5)
      }
   }, [animationName])

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
