import { OrbitControls } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { CuboidCollider, Debug, Physics, RigidBody } from "@react-three/rapier"
import { Perf } from "r3f-perf"
import { useState } from "react"
import { useRef } from "react"
import * as THREE from "three"

export default function Experience() {
   const twister = useRef()
   const cube = useRef()
   const [hitSound] = useState(()=> new Audio("./hit.mp3"))

   useFrame((state)=>{
      const time = state.clock.getElapsedTime()

      const eulerRotation = new THREE.Euler(0, time * 3, 0)
      const quaternionRotation = new THREE.Quaternion()
      quaternionRotation.setFromEuler(eulerRotation)
      twister.current.setNextKinematicRotation(quaternionRotation)

      const angle = time * 0.5
      const x = Math.cos(angle)
      const z = Math.sin(angle)
      twister.current.setNextKinematicTranslation({
         x,
         z,
         y: -0.8
      })
   })

   const cubeJump = () => {
      const mass = cube.current.mass()
      cube.current.applyImpluse({
         x: 0,
         y: mass,
         z: 0
      })
      cube.current.applyTorque({
         x: 0,
         y: 1,
         z:0
      })
   }

   const collisionEnter = () => {
      hitSound.currentTime = 0
      hitSound.volume = Math.random()
      hitSound.play()
   }

   return (
      <>
         <Perf position="top-left" />

         <OrbitControls makeDefault />

         <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
         <ambientLight intensity={0.5} />

         <Physics gravity={[0, -9.81, 0]}>
            <Debug/>
            <RigidBody colliders="ball">
               <mesh castShadow position={[-1.5, 2, 0]}>
                  <sphereGeometry />
                  <meshStandardMaterial color="orange" />
               </mesh>
            </RigidBody>
            <RigidBody 
               position={[1.5, 2, 0]}
               ref={cube}
               gravityScale={1}
               restitution={0}
               friction={0}
               colliders={ false }
               onCollisionEnter={collisionEnter}
            >
               <mesh 
                  castShadow
                  onClick={cubeJump}
               >
                  <boxGeometry />
                  <meshStandardMaterial color={"mediumpurple"}/>
               </mesh>
               <CuboidCollider mass={0.5} args={[0.5, 0.5, 0.5]}/>
            </RigidBody>
            <RigidBody type="fixed">
               <mesh receiveShadow position-y={-1.25}>
                  <boxGeometry args={[10, 0.5, 10]} />
                  <meshStandardMaterial color="greenyellow" />
               </mesh>
            </RigidBody>
            <RigidBody
               position={[0, -0.8, 0]}
               friction={0}
               type="kinematicPosition"
               ref={twister}
            >
               <mesh castShadow scale={[0.4, 0.4, 3]}>
                  <boxGeometry />
                  <meshStandardMaterial color={"red"}/>
               </mesh>
            </RigidBody>
         </Physics>
      </>
   )
}
