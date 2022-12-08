import { useLoader } from "@react-three/fiber"
import React from "react"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

const Model = () => {
   const model = useLoader(
      GLTFLoader, 
      "./hamburger.glb",
      (loader) => {
         console.log(loader)
         const dracoLoader = new DRACOLoader()
         dracoLoader.setDecoderPath("./draco/")
         loader.setDRACOLoader(dracoLoader)
      }   
   )
   return (
      <primitive 
         object={model.scene} 
         scale={0.35} 
      />)
}

export default Model
