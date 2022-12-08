import { useGLTF } from "@react-three/drei"
import React from "react"

const Model = () => {
   const model = useGLTF("./hamburger.glb")
   return (
      <primitive 
         object={model.scene} 
         scale={0.35} 
      />)
}

export default Model
