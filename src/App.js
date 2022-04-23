import "./App.css"
import React from "react"

import GameBoard from "./components/GameBoard"
import GameLogic from "./components/GameLogic"
import RestartBtn from "./components/RestartBtn"
import PlayerBtn from "./components/PlayerBtn"
import Result from "./components/Result"

// Šajā funkcijā tiek ģenerētas visas spēles komponentes
function App() {
  return (
    <div className="App">
      <Result />
      <PlayerBtn />
      <GameBoard />
      <GameLogic />
      <RestartBtn />
    </div>
  )
}

export default App
