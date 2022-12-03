import React from "react"

const Experience = () => {
   return (
      <>
         <mesh rotateY={Math.PI * 0.5} position-x={1} scale={1.5}>
            {/* <sphereGeometry args={[1.5, 32, 32]} /> */}
            <boxGeometry/>
            <meshBasicMaterial 
               color={'red'}
               wireframe
            />
         </mesh>
         <mesh rotateY={Math.PI * 0.5}  scale={1.5}>
            {/* <sphereGeometry args={[1.5, 32, 32]} /> */}
            <boxGeometry/>
            <meshBasicMaterial 
               color={'red'}
               wireframe
            />
         </mesh>
      </>
   )
}

export default Experience
