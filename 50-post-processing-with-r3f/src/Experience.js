import { OrbitControls } from "@react-three/drei"
import { 
   // Bloom, 
   // DepthOfField, 
   EffectComposer, SSR, 
   // Glitch, 
   // Noise, 
   // Vignette 
} from "@react-three/postprocessing"
import { 
   BlendFunction, 
   GlitchMode 
} from "postprocessing"
import { Perf } from "r3f-perf"

export default function Experience() {
   return (
      <>
         <color args={["#ffffff"]} attach="background"/>
         <EffectComposer>        
            {/* <Vignette
               offset={0.3}
               darkness={0.9}
               blendFunction={BlendFunction.NORMAL}
            /> */}
            {/* <Glitch
               delay={[0.5, 1]}
               duration={[0.1, 0.3]}
               strength={[0.2, 0.4]}
               mode={GlitchMode.CONSTANT_MILD}
            /> */}
            {/* <Noise
               blendFunction={BlendFunction.SOFT_LIGHT}
            /> */}
            {/* <Bloom 
               mipmapBlur 
               intensity={0.5}
               luminanceThreshold={0}
            /> */}
            {/* <DepthOfField 
               focalLength={0.025}
               focusDistance={0.025}
               bokehScale={6}
            /> */}
            <SSR
               
            />
         </EffectComposer>
         <Perf position="top-left" />

         <OrbitControls makeDefault />

         <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
         <ambientLight intensity={0.5} />

         <mesh castShadow position-x={-2}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
         </mesh>

         <mesh castShadow position-x={2} scale={1.5} toneMapping={false}>
            <boxGeometry />
            <meshBasicMaterial 
               color="mediumpurple"
            />
         </mesh>

         <mesh
            receiveShadow
            position-y={-1}
            rotation-x={-Math.PI * 0.5}
            scale={10}
         >
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" metalness={0} roughness={0}/>
         </mesh>
      </>
   )
}
