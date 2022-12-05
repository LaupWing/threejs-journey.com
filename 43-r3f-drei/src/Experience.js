import { Html, OrbitControls, PivotControls, TransformControls } from "@react-three/drei"
import { useRef } from "react"

export default function Experience() {
   const cube = useRef()
   const sphere = useRef()

   return (
      <>
         <OrbitControls makeDefault/>
         <directionalLight position={[1, 2, 3]} intensity={1.5} />
         <ambientLight intensity={0.5} />

         <PivotControls 
            depthTest={false} 
            anchor={[0, 0, 0]}
            lineWidth={4}
            axisColors={["#9381ff", "#ff4d6d", "#7ae582"]}
            scale={100}
            fixed={true}
         >
            <mesh 
               position-x={-2}
               ref={sphere}
            >
               <sphereGeometry />
               <meshStandardMaterial color="orange" />
               <Html 
                  center 
                  wrapperClass="label" 
                  position={[1, 1, 0]}
                  distanceFactor={8}
                  occlude={[cube, sphere]}
               >
                  That's a sphere 👍
               </Html>
            </mesh>
         </PivotControls>

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
