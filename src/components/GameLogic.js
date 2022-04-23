import React, { useEffect } from "react"
import { useGlobalContext } from "../context"

// Šajā konstantē tiek attēlots pašreizēja gājiena izvēles iespējas
const GameLogic = () => {
  const { state, makeMove, calcValues, bestMove } = useGlobalContext()

  useEffect(() => {
    if (state.current.length > 2 && !state.turn) {
      makeMove(bestMove())
    }
  }, [state, makeMove, bestMove])

  return (
    <div>
      <div className="move-btn-div">
        {state.current.length > 2 &&
          state.current.map((btn, id) => {
            return id + 1 === state.current.length ? null : (
              <button
                className="move-btn"
                key={id}
                onClick={() => {
                  makeMove(id)
                }}
              >
                {calcValues(state.current[id], state.current[id + 1])}
              </button>
            )
          })}
      </div>
    </div>
  )
}

export default GameLogic
