import { Center, OrbitControls, Text3D, useMatcapTexture } from "@react-three/drei"
import { Perf } from "r3f-perf"

export default function Experience() {
   const [matcapTexture] = useMatcapTexture("7B5254_E9DCC7_B19986_C8AC91", 256)

   return (
      <>
         <Perf position="top-left" />

         <OrbitControls makeDefault />
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
            >
               HELLO R3F
               <meshMatcapMaterial matcap={matcapTexture}/>
            </Text3D>
         </Center>
         <mesh>
            <torusGeometry args={[1, 0.6, 16, 32]}/>
            <meshMatcapMaterial matcap={matcapTexture}/>
         </mesh>
      </>
   )
}
