import { OrbitControls } from "@react-three/drei"
import { CuboidCollider, Debug, Physics, RigidBody } from "@react-three/rapier"
import { Perf } from "r3f-perf"
import { useRef } from "react"

export default function Experience() {
   const twister = useRef()
   const cube = useRef()

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
