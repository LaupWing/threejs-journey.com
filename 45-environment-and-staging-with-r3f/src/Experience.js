import { useFrame } from "@react-three/fiber"
import { AccumulativeShadows, ContactShadows, Environment, Lightformer, OrbitControls, RandomizedLight, Sky, useHelper } from "@react-three/drei"
import { useRef } from "react"
import { Perf } from "r3f-perf"
import * as THREE from "three"
import { useControls } from "leva"

// softShadows({
//    frustum: 3.75,
//    sizes: 0.005,
//    near: 9.5,
//    samples: 17,
//    rings: 11
// })

export default function Experience() {
   const cube = useRef()

   const directionalLight = useRef()
   // useHelper(directionalLight, THREE.DirectionalLightHelper, 1)

   useFrame((state, delta) => {
      const time = state.clock.elapsedTime
      cube.current.rotation.y += delta * 0.2
      cube.current.position.x = 2 + Math.sin(time)
   })

   const {color, opacity, blur} = useControls("contact shadows", {
      color: "#1d8f75",
      opacity: {
         value: 0.4,
         min: 0,
         max: 1
      },
      blur: {
         value: 2.8,
         min: 0,
         max: 10
      }
   })

   const {sunPosition} = useControls("sky", {
      sunPosition: {
         value: [1, 2, 3]
      }
   })

   const {envMapIntensity} = useControls("environment map", {
      envMapIntensity: {
         value: 1,
         min: 0,
         max: 12
      }
   })

   return (
      <>
         <Environment 
            preset="sunset"
            resolution={32}
            ground={{
               height: 7,
               radius: 28,
               scale: 100
            }}
         >
            {/* <color args={["#000000"]} attach="background"/> */}
            {/* <mesh scale={10} position-z={-4}>
               <planeGeometry/>
               <meshBasicMaterial color={[1, 0, 0]}/>
            </mesh> */}
            {/* <Lightformer 
               position-z={-5} 
               scale={10}
               color="red"
               intensity={10}
               form="ring"
            /> */}
         </Environment>
         <color args={["ivory"]} attach="background"/>
         <Perf position="top-left" />

         <OrbitControls makeDefault />
         <ContactShadows
            position={[0, -0.99, 0]}
            scale={10}
            resolution={512}
            far={5}
            color={color}
            opacity={opacity}
            blur={blur}
            frames={1}
         />
         {/* <directionalLight 
            castShadow
            position={sunPosition} 
            intensity={1.5} 
            ref={directionalLight}
            shadow-mapSize={[ 1024, 1024 ]}
            shadow-camera-near={1}
            shadow-camera-far={10}
            shadow-camera-top={2}
            shadow-camera-right={2}
            shadow-camera-bottom={-2}
            shadow-camera-left={-2}
         /> */}
         {/* <ambientLight intensity={0.5} /> */}
         {/* <Sky sunPosition={sunPosition}/> */}
         {/* <AccumulativeShadows
            position={[0, -0.99, 0]}
            scale={10}
            color="#366d39"
            opacity={0.8}
            frames={Infinity}
            blend={100}
            temporal
         >
            <RandomizedLight
               amount={8}
               radius={1}
               ambient={0.5}
               intensity={1}
               position={[1,2,3]}
               bias={0.001}
            />
         </AccumulativeShadows> */}

         <mesh position-x={-2}>
            <sphereGeometry />
            <meshStandardMaterial envMapIntensity={envMapIntensity} color="orange" />
         </mesh>

         <mesh ref={cube} position-x={2} scale={1.5}>
            <boxGeometry />
            <meshStandardMaterial envMapIntensity={envMapIntensity} color="mediumpurple" />
         </mesh>
         <mesh 
            position-y={-1} 
            rotation-x={-Math.PI * 0.5} 
            scale={10}
         >
            <planeGeometry />
            <meshStandardMaterial envMapIntensity={envMapIntensity} color="greenyellow" />
         </mesh>
      </>
   )
}
