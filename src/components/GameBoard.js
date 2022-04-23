import React from "react"
import { useGlobalContext } from "../context"

// Šajā konstantē tiek attēlots spēles laukums
const GameBoard = () => {
  const { state } = useGlobalContext()
  return (
    <div className="board">
      {state.game.map((values, stateIndex) => {
        return (
          <div className={`state`} key={stateIndex}>
            {values.map((v, valIndex) => {
              return (
                <div
                  key={valIndex}
                  className={`state-num ${
                    valIndex === state.prevMoves[stateIndex] ||
                    valIndex + 1 === state.prevMoves[stateIndex]
                      ? "prev"
                      : ""
                  }`}
                >
                  {v}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default GameBoard
