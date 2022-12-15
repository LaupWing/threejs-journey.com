import { useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { RigidBody } from "@react-three/rapier"
import { useMemo } from "react"
import { useRef, useState } from "react"
import * as THREE from "three"

THREE.ColorManagement.legacyMode = false

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)

const floor1Material = new THREE.MeshStandardMaterial({ color: 'limegreen' })
const floor2Material = new THREE.MeshStandardMaterial({ color: 'greenyellow' })
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 'orangered' })
const wallMaterial = new THREE.MeshStandardMaterial({ color: 'slategrey' })


export function BlockStart({
   position = [0, 0, 0]
}) {
   return (
      <group position={position}>
         <mesh 
            position={[0, 0, 0]}
            material={floor1Material}
            receiveShadow
            geometry={boxGeometry}
            scale={[4, 0.2, 4]}
         />
      </group>
   )
}

export function BlockEnd({
   position = [0, 0, 0]
}) {
   const hamburger = useGLTF("./hamburger.glb")

   hamburger.scene.children.forEach((mesh)=>{
      mesh.castShadow = true
   })

   return (
      <group position={position}>
         <mesh 
            position={[0, 0, 0]}
            material={floor1Material}
            receiveShadow
            geometry={boxGeometry}
            scale={[4, 0.2, 4]}
         />
         <RigidBody 
            type="fixed" 
            colliders={"hull"}
            position={[0, 0.25, 0]}
            restitution={0.2}
            friction={0}
         >
            <primitive
               object={hamburger.scene}
               scale={0.2}
            />
         </RigidBody>
      </group>
   )
}

export function BlockSpinner({
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
            position={[0, 0, 0]}
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

export function BlockAxe({
   position = [0, 0, 0]
}) {
   const obstacle = useRef()
   const [timeOffset] = useState(()=> Math.random() * Math.PI * 2)

   useFrame((state)=>{
      const time = state.clock.getElapsedTime()

      const x = Math.sin(time * timeOffset) * 1.25

      obstacle.current.setNextKinematicTranslation({
         x: x + position[0],
         y: position[1] + 0.75,
         z: position[2]
      })
   })

   return (
      <group position={position}>
         <mesh 
            geometry={boxGeometry}
            position={[0, 0, 0]}
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

export function BlockLimbo({
   position = [0, 0, 0]
}) {
   const obstacle = useRef()
   const [timeOffset] = useState(()=> Math.random() * Math.PI * 2)

   useFrame((state)=>{
      const time = state.clock.getElapsedTime()

      const y = Math.sin(time * timeOffset) + 1.15

      obstacle.current.setNextKinematicTranslation({
         x: position[0],
         y: y + position[1],
         z: position[2]
      })
   })

   return (
      <group position={position}>
         <mesh 
            geometry={boxGeometry}
            position={[0, 0, 0]}
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

export function Level({ 
   count = 5, 
   types = [BlockSpinner, BlockAxe, BlockLimbo] 
}) {

   const blocks = useMemo(()=>{
      const blocks = []

      for(let i = 0; i < count; i++){
         const type = types[Math.floor(Math.random() * types.length)]
         blocks.push(type)
      }

      return blocks
   }, [ count, types])

   return (
      <>
         <BlockStart position={[0, 0, 0]}/>
         {blocks.map((Block, i) => <Block key={i} position={[0, 0, -(i + 1) * 4]}/>)}
         <BlockEnd position={[0, 0, -(count + 1) * 4]}/>
      </>
   )
}
