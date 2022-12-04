import React from "react"

const Custom = () => {
   const verticesCount = 10 * 3
   const positions = new Float32Array(verticesCount * 3)
   for(let i = 0; i < verticesCount * 3; i++)
      positions[i] = (Math.random() - 0.5) * 3

   return (
      <mesh>
         <boxGeometry/>
         <meshBasicMaterial color={"red"}/>
      </mesh>
   )
}

export default Custom
