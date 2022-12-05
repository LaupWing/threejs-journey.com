import { OrbitControls, TransformControls } from "@react-three/drei"
import { useRef } from "react"

export default function Experience() {
   const cube = useRef()

   return (
      <>
         <OrbitControls />
         <directionalLight position={[1, 2, 3]} intensity={1.5} />
         <ambientLight intensity={0.5} />
            <mesh position-x={-2}>
               <sphereGeometry />
               <meshStandardMaterial color="orange" />
            </mesh>

         <mesh 
            ref={cube} 
            scale={1.5} 
            position-x={2}
         >
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
         </mesh>
         <TransformControls object={cube}/>

         <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
         </mesh>
      </>
   )
}
