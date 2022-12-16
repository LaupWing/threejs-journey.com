import React from "react"

const Interface = () => {
   return (
      <div className="interface">
         <div className="time">0.00</div>
         <div className="restart">Restart</div>
         <div className="controls">
            <div className="raw">
               <div className="key"></div>
            </div>
            <div className="raw">
               <div className="key"></div>
               <div className="key"></div>
               <div className="key"></div>
            </div>
            <div className="raw">
               <div className="key large"></div>
            </div>
         </div>
      </div>
   )
}

export default Interface
