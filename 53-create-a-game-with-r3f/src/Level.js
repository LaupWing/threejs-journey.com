import { useFrame } from "@react-three/fiber"
import { RigidBody } from "@react-three/rapier"
import { useRef, useState } from "react"
import * as THREE from "three"

THREE.ColorManagement.legacyMode = false

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)

const floor1Material = new THREE.MeshStandardMaterial({ color: 'limegreen' })
const floor2Material = new THREE.MeshStandardMaterial({ color: 'greenyellow' })
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 'orangered' })
const wallMaterial = new THREE.MeshStandardMaterial({ color: 'slategrey' })


function BlockStart({
   position = [0, 0, 0]
}) {
   return (
      <group position={position}>
         <mesh 
            position={[0, -0.1, 0]}
            material={floor1Material}
            receiveShadow
            geometry={boxGeometry}
            scale={[4, 0.2, 4]}
         />
      </group>
   )
}

function BlockSpinner({
   position = [0, 0, 0]
}) {
   const obstacle = useRef()
   const [speed] = useState(()=> (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1))

   useFrame((state)=>{
      const time = state.clock.getElapsedTime()

      const rotation = new THREE.Quaternion()
      rotation.setFromEuler(new THREE.Euler(0, time * speed, 0))
      obstacle.current.setNextKinematicRotation(rotation)
   })

   return (
      <group position={position}>
         <mesh 
            geometry={boxGeometry}
            position={[0, -0.1, 0]}
            material={floor2Material}
            scale={[4, 0.2, 4]}
            receiveShadow
         />
         <RigidBody 
            type="kinematicPosition" 
            position={[0, 0.3, 0]}
            restitution={0.2}
            friction={0}
            ref={obstacle}
         >
            <mesh 
               geometry={boxGeometry}
               material={obstacleMaterial}
               scale={[3.5, 0.3, 0.3]}
               castShadow
               receiveShadow
            />
         </RigidBody>
      </group>
   )
}

export default function Level() {
   return (
      <>
         <BlockStart position={[0, 0, 4]}/>
         <BlockSpinner position={[0, 0, 0]}/>
      </>
   )
}
