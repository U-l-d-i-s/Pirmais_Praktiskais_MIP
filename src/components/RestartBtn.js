import React from "react"
import { useGlobalContext } from "../context"

// Šajā konstantē tiek parādīta restartēšanas poga
const RestartBtn = () => {
  const { playGame } = useGlobalContext()
  return (
    <div>
      <button className="restart-btn" onClick={() => playGame("r")}>
        {"restart"}
      </button>
    </div>
  )
}

export default RestartBtn
