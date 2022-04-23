import React from "react"
import { useGlobalContext } from "../context"

// Šajā konstantē tiek parādīts spēles rezultāts
const Result = () => {
  const { state, result } = useGlobalContext()
  return (
    <>
      {state.current.length === 2 && (
        <div>
          <h2>{result}</h2>
        </div>
      )}
    </>
  )
}

export default Result
