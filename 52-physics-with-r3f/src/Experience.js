import { OrbitControls, useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import {
   CuboidCollider,
   CylinderCollider,
   Debug,
   InstancedRigidBodies,
   Physics,
   RigidBody,
} from "@react-three/rapier"
import { Perf } from "r3f-perf"
import { useState } from "react"
import { useMemo } from "react"
import { useEffect } from "react"
import { useRef } from "react"
import * as THREE from "three"

export default function Experience() {
   const twister = useRef()
   const cube = useRef()
   const [hitSound] = useState(() => new Audio("./hit.mp3"))
   const hamburger = useGLTF("./hamburger.glb")

   const cubesCount = 3
   const cubes = useRef() 

   const cubeTransforms = useMemo(()=>{
      const positions = []
      const rotations= []
      const scales = []

      for(let i = 0; i < cubesCount; i++){
         positions.push([
            (Math.random() -0.5) * 8, 
            6 + 1 * 0.2, 
            (Math.random() -0.5) * 8, 
         ])
         rotations.push([
            Math.random(), 
            Math.random(), 
            Math.random(), 
         ])
         const scale = 0.2 + Math.random() * 0.8
         scales.push([scale, scale, scale])
      }

      return {
         positions,
         rotations,
         scales
      }
   }, [])

   // useEffect(()=>{
   //    for(let i = 0; i < cubesCount; i++){
   //       const matrix = new THREE.Matrix4()
   //       matrix.compose(
   //          new THREE.Vector3(i * 2, 0, 0),
   //          new THREE.Quaternion(),
   //          new THREE.Vector3(1, 1, 1),
   //       )
   //       cubes.current.setMatrix(i, matrix)
   //    }
   // },[])

   useFrame((state) => {
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
         y: -0.8,
      })
   })

   const cubeJump = () => {
      const mass = cube.current.mass()
      cube.current.applyImpluse({
         x: 0,
         y: mass,
         z: 0,
      })
      cube.current.applyTorque({
         x: 0,
         y: 1,
         z: 0,
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
            <Debug />
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
               colliders={false}
               onCollisionEnter={collisionEnter}
            >
               <mesh castShadow onClick={cubeJump}>
                  <boxGeometry />
                  <meshStandardMaterial color={"mediumpurple"} />
               </mesh>
               <CuboidCollider mass={0.5} args={[0.5, 0.5, 0.5]} />
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
                  <meshStandardMaterial color={"red"} />
               </mesh>
            </RigidBody>
            <RigidBody colliders={"hull"} position={[0, 4, 0]}>
               <primitive object={hamburger.scene} scale={0.25} />
               {/* <CylinderCollider args={[0.5, 1.15]}/> */}
            </RigidBody>
            <RigidBody type="fixed">
               <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, 5.5]} />
               <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, -5.5]} />
               <CuboidCollider args={[0.5, 2, 5]} position={[5.5, 1, 0]} />
               <CuboidCollider args={[0.5, 2, 5]} position={[-5.5, 1, 0]} />
            </RigidBody>
            <InstancedRigidBodies 
               positions={cubeTransforms.positions}
               rotations={cubeTransforms.rotations}
               scales={cubeTransforms.scales}
            >
               <instancedMesh ref={cubes} castShadow receiveShadow args={[null, null, cubesCount]}>
                  <boxGeometry />
                  <meshStandardMaterial color={"tomato"}/>
               </instancedMesh>
            </InstancedRigidBodies>
         </Physics>
      </>
   )
}
