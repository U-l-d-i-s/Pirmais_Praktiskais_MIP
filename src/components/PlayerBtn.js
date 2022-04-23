import React from "react"
import { useGlobalContext } from "../context"

// Šajā konstantē tiek parādītas pogas, kuras atbild par sākuma spēlētāju izvēli
const PlayerBtn = () => {
  const { playGame, start } = useGlobalContext()
  return (
    <div>
      <button
        className={"start-btn " + (start === "p" ? "active-btn" : "")}
        onClick={() => playGame("p")}
      >
        {"player starts"}
      </button>
      <button
        className={"start-btn " + (start === "c" ? "active-btn" : "")}
        onClick={() => playGame("c")}
      >
        {"computer starts"}
      </button>
    </div>
  )
}

export default PlayerBtn
