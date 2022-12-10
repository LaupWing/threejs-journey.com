import { Center, OrbitControls, Sparkles, useGLTF, useTexture } from "@react-three/drei"
import portalVertexShader from "./shaders/portal/vertex.js"

export default function Experience() {
   const { nodes } = useGLTF("./model/portal.glb")

   const bakedTexture = useTexture("./model/baked.jpg")
   bakedTexture.flipY = false
   
   return (
      <>
         <color args={["#201919"]} attach={"background"}/>
         <OrbitControls makeDefault />

         <Center>
            <mesh 
               geometry={nodes.poleLightA.geometry}
               position={nodes.poleLightA.position}
            >
               <meshBasicMaterial color={"#ffffe5"}/>
            </mesh>
            <mesh 
               geometry={nodes.poleLightB.geometry}
               position={nodes.poleLightB.position}
            >
               <meshBasicMaterial color={"#ffffe5"}/>
            </mesh>
            <mesh geometry={nodes.baked.geometry}> 
               <meshBasicMaterial map={bakedTexture}/>
            </mesh>

            <mesh
               geometry={ nodes.portalLight.geometry }
               position={ nodes.portalLight.position }
               rotation={ nodes.portalLight.rotation }
            >
               <shaderMaterial />
            </mesh>

            <Sparkles 
               size={6}
               scale={[4, 2, 4]}
               position-y={1}
               speed={0.2}
               count={40}
            />
         </Center>
      </>
   )
}
