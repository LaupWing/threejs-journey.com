import {
   Center,
   OrbitControls,
   Text3D,
   useMatcapTexture,
} from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { Perf } from "r3f-perf"
import { useRef } from "react"
import { useEffect } from "react"
// import { useState } from "react"
import * as THREE from "three"

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32)
const material = new THREE.MeshMatcapMaterial()

export default function Experience() {
   const donuts = useRef([])
   const [matcapTexture] = useMatcapTexture("7B5254_E9DCC7_B19986_C8AC91", 256)

   useEffect(()=>{
      matcapTexture.encoding = THREE.sRGBEncoding
      matcapTexture.needsUpdate = true

      material.matcap = matcapTexture
      material.needsUpdate = true
   }, [])

   useFrame((state, delta) => {
      for(const donut of donutsGroup.current.children){
         donut.rotation.y += delta * 0.2
      }
   })

   return (
      <>
         <Perf position="top-left" />

         <OrbitControls makeDefault />
         {/* <torusGeometry ref={setTorusGeometry} args={[1, 0.6, 16, 32]} /> */}
         {/* <meshMatcapMaterial ref={setMaterial} matcap={matcapTexture} /> */}
         <Center>
            <Text3D
               font={"./fonts/helvetiker_regular.typeface.json"}
               size={0.75}
               height={0.2}
               curveSegments={12}
               bevelEnabled
               bevelSegments={5}
               bevelSize={0.02}
               bevelOffset={0}
               bevelThickness={0.02}
               material={material}
            >
               HELLO R3F
            </Text3D>
         </Center>
         {[...Array(100)].map((_, i) => (
            <mesh
               ref={(el) => {
                  donuts.current[i] = el
               }}
               key={i}
               position={[
                  (Math.random() - 0.5) * 10,
                  (Math.random() - 0.5) * 10,
                  (Math.random() - 0.5) * 10,
               ]}
               scale={0.2 + Math.random() * 0.2}
               rotation={[
                  Math.random() * Math.PI,
                  Math.random() * Math.PI,
                  0
               ]}
               geometry={torusGeometry}
               material={material}
            />
         ))}
      </>
   )
}
