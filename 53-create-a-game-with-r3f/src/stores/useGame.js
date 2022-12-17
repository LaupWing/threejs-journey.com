import create from "zustand"

export default create((set)=>{

   return {
      blocksCount: 3,
      phase: "ready",
      start: () =>{
         set(() => ({
            phase: "playing"
         }))
      }
   }
})