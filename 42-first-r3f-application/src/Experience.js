import { extend, useFrame, useThree } from "@react-three/fiber"
import React, { useRef } from "react"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

extend({
   OrbitControls,
})

const Experience = () => {
   useFrame((state, delta) => {
      cubeRef.current.rotation.y += delta
      groupRef.current.rotation.y += delta
   })

   const cubeRef = useRef()
   const groupRef = useRef()
   const { camera, gl } = useThree()

   return (
      <>
         <orbitControls args={[camera, gl.domElement]} />
         <directionalLight position={[1, 2, 3]} intensity={1.5} />
         <ambientLight intensity={0.5} />
         <group ref={groupRef}>
            <mesh position-x={2}>
               <sphereGeometry />
               <meshStandardMaterial color={"orange"} wireframe />
            </mesh>
            <mesh
               ref={cubeRef}
               rotateY={Math.PI * 0.25}
               position-x={2}
               scale={1.5}
            >
               <boxGeometry />
               <meshStandardMaterial color={"red"} wireframe />
            </mesh>
         </group>
         <mesh position-y={-1} rotateX={-Math.PI * 0.5} scale={10}>
            <planeGeometry />
            <meshStandardMaterial color={"greenYellow"} />
         </mesh>
      </>
   )
}

export default Experience
