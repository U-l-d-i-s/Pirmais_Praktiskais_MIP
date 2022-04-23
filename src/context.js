import React, { useContext, useState } from "react"

const AppContext = React.createContext()

const ref = 9 // References skaitlis
const IfSmaller = 5 // Ja skaitļu summa mazāka, tad aizvietos ar šo skaitli
const IfBigger = 1 // Ja skaitļu summa lielāka, tad aizvietos ar šo skaitli
const IfEqual = 3 // Ja skaitļu summa vienāda, tad aizvietos ar šo skaitli
const gameValues = [[7, 8, 9, 1, 1, 2, 4]] // Spēles sākuma skaitļu virkne
const initialState = {
  //Spēles pirmreizējais stāvoklis
  turn: true, // gājiens, ja true, tad spēlētāja
  game: gameValues, // viss spēles lauks
  current: gameValues[0], // pašreizējā gajiena skaitļu virkne
  prevMoves: [], // iepriekšējo gājienu indeksi
}

const AppProvider = ({ children }) => {
  let tempState = initialState // Pagaidu stāvokļa inicializācija, domāts minimax algoritmam
  const [state, setState] = useState(initialState) // Spēles stāvokļa usestate hook
  const [result, setResult] = useState("") // Spēles rezultāta usestate hook
  const [start, setStart] = useState("p") // Spēles uzsākšanas spēlētāja usestate hook

  // Tiek aprēķinātas vērtības, ar kurām tiks aizvietoti divi blakus esoši skaitļi
  const calcValues = (first, second) => {
    const sum = first + second
    if (sum < ref) {
      return IfSmaller
    } else if (sum > ref) {
      return IfBigger
    } else if (sum === ref) {
      return IfEqual
    }
  }
  // Tiek izveidots pašreizējais gājiens minimax algoritmam
  const createCurrent = (id, cur) => {
    const sum = cur[id] + cur[id + 1]
    let tempArray = []
    for (let i = 0; i < cur.length; i++) {
      if (i === id) {
        if (sum < ref) {
          tempArray.push(IfSmaller)
        } else if (sum > ref) {
          tempArray.push(IfBigger)
        } else if (sum === ref) {
          tempArray.push(IfEqual)
        }
        i++
      } else tempArray.push(cur[i])
    }
    return tempArray
  }

  // Tiek veikts gājiens spēlē
  const makeMove = (id) => {
    let tempArray = createCurrent(id, state.current)
    const currentState = {
      turn: !state.turn,
      current: tempArray,
      game: state.game.concat([tempArray]),
      prevMoves: state.prevMoves.concat(id + 1),
    }
    if (currentState.current.length === 2)
      determineResult(currentState.current[0], currentState.current[1])
    setState(currentState)
  }
  // Nosaka sākuma stāvokļus pēc spēles restartēšanas vai sākuma spēlētāja maiņas
  const playGame = (value) => {
    if (value === "r") {
      if (start === "p")
        setState({
          turn: true,
          game: gameValues,
          current: gameValues[0],
          prevMoves: [],
        })
      else if (start === "c")
        setState({
          turn: false,
          game: gameValues,
          current: gameValues[0],
          prevMoves: [],
        })
    } else if (value === "p") {
      setState({
        turn: true,
        game: gameValues,
        current: gameValues[0],
        prevMoves: [],
      })
      setStart("p")
    } else if (value === "c") {
      setState({
        turn: false,
        game: gameValues,
        current: gameValues[0],
        prevMoves: [],
      })
      setStart("c")
    }
    setResult("")
  }
  // Atgriež gala rezultātu spēlei
  const determineResult = (f, s) => {
    if (start === "p") {
      if (f > s) setResult("Player wins")
      else if (f < s) setResult("Computer wins")
      else setResult("Draw")
    } else if (start === "c") {
      if (s > f) setResult("Player wins")
      else if (s < f) setResult("Computer wins")
      else setResult("Draw")
    }
  }

  // Minimax algoritmā tiek izpildīts gājiens
  const makeTempMove = (id) => {
    let tempArray = createCurrent(id, tempState.current)
    tempState = {
      turn: !tempState.turn,
      current: tempArray,
      game: tempState.game.concat([tempArray]),
      prevMoves: tempState.prevMoves.concat(id + 1),
    }
    return
  }
  // Minimax algoritms atgriežas iepriekšējā spēles stāvoklī
  const undoTempMove = () => {
    let tempArray = tempState.game
    tempArray.splice(-1, 1)
    let prev = tempState.prevMoves
    prev.splice(-1, 1)

    tempState = {
      turn: !tempState.turn,
      current: tempArray[tempArray.length - 1],
      game: tempArray,
      prevMoves: prev,
    }
    return
  }
  // Atgriež rezultāta vērtību, kad minimax algoritmā tiek sasniegta gala virsotne, lai dators noteiktu vai tā ir pozitīvi, vai negatīva tam
  const checkResult = (one, two) => {
    if (start === "p") {
      if (one > two) return -1
      else if (one < two) return 1
      else return 0
    } else if (start === "c") {
      if (one > two) return 1
      else if (one < two) return -1
      else return 0
    }
  }

  // Tiek noteikts labākais gājiens datoram, atgriežot labākā gājiena id, ja ir vairāki labākie gājieni, tad tiks izvēlēts mazākais id
  // tiek izpildīta arī nulta dziluma maksimizētāja algoritms
  const bestMove = () => {
    //minimax stāvoklim piešķir pašreizējā stāvokļa objekta vērtības
    tempState = state
    // pagaidu vērtība labākajam rezultātam
    let bestResult = -100
    // labākā gājiena pagaidu vērtība
    let moveId = 0
    // cikls, kurš apskata pašreizējos gājienus
    for (let i = 0; i < tempState.current.length - 1; i++) {
      // tiek izpildīts gājiens minimax algoritmā
      makeTempMove(i)
      // mainīgajam tiks piešķirts rezultāts, ko būs atgriezis minimax algoritms
      let tempResult = miniMax(0, false)
      console.log("result: " + tempResult + " | id: " + i)
      // salīdzina pašreizējo rezultātu ar labāko rezultātu, ja pašreizējais ir labāks, tad tiek nomainīts labākā gājiena id un labākais rezultāts
      if (tempResult > bestResult) {
        bestResult = tempResult
        moveId = i
      }
      // atsauc izdarīto gājienu, lai varētu apskatīt nākamo
      undoTempMove()
    }
    console.log("----------------------------")
    //Atgriež labākā gājiena id
    return moveId
  }
  // Minimax algoritms ar dziļuma un pašreizējā gājiena vērtību, lai noteiktu vai ir maksimizējošā vai minimizējošā spēlētēja vērtība
  const miniMax = (depth, turn) => {
    // Pārbauda vai nav sasniegta gala virsotne minimax algoritmā un ja ir, tad atgriež rezultātu šai virsotnei
    if (tempState.current.length === 2) {
      return checkResult(tempState.current[0], tempState.current[1])
    }
    // maksimizējošais spēlētājs
    if (turn) {
      let bestResult = -100 // pagaidu labākais rezultāts
      let tempResult // pagaidu rezultāts
      // cikls, kurš apskata pašreizējos gājienus
      for (let i = 0; i < tempState.current.length - 1; i++) {
        // tiek izpildīts gājiens minimax algoritmā
        makeTempMove(i)
        // mainīgajam tiks piešķirts rezultāts, ko būs atgriezis minimax algoritms
        tempResult = miniMax(depth + 1, false)
        // labākajam rezultātam piešķir lielāko vērtību
        bestResult = tempResult > bestResult ? tempResult : bestResult
        // atsauc izdarīto gājienu, lai varētu apskatīt nākamo
        undoTempMove()
      }
      return bestResult // atgriež labāko rezultātu
    }
    // minimizējošais spēlētājs
    else {
      let bestResult = 100 // pagaidu labākais rezultāts
      let tempResult // pagaidu rezultāts
      for (let i = 0; i < tempState.current.length - 1; i++) {
        // tiek izpildīts gājiens minimax algoritmā

        makeTempMove(i)
        // mainīgajam tiks piešķirts rezultāts, ko būs atgriezis minimax algoritms
        tempResult = miniMax(depth + 1, true)
        // labākajam rezultātam piešķir lielāko vērtību
        bestResult = tempResult < bestResult ? tempResult : bestResult
        // atsauc izdarīto gājienu, lai varētu apskatīt nākamo
        undoTempMove()
      }
      return bestResult // atgriež labāko rezultātu
    }
  }

  // Atgriež visas funkcijas vai vērtības, kuras tiek imantotas/ izsauktas no lietotāja saskarnes
  return (
    <AppContext.Provider
      value={{
        makeMove,
        playGame,
        calcValues,
        bestMove,
        result,
        state,
        start,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
