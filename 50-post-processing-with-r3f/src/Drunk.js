import React from "react"
import DrunkEffect from "./DrunkEffect"

const Drunk = (props) => {
   const effect = new DrunkEffect(props)

   return (
      <primitive
         object={effect}
      />
   )
}

export default Drunk
