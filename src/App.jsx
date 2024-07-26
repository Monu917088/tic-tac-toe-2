import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import { Log } from "./components/Log";
import {WINNING_COMBINATIONS} from "./data.js"
import GameOver from "./components/GameOver.jsx";

const initialGameBoard= [
  [null,null,null],
  [null,null,null],
  [null,null,null]

];

function handleSelectedPlayer(turn){
  let Player='X';
  if(turn.length >0 && turn[0].player === 'X'){
    Player='0';
  }
  return Player;
}

function derivedWinner(gameBoard ,players){
  let winner;
  for(const combination  of WINNING_COMBINATIONS){
    const firstMove= gameBoard[combination[0].row][combination[0].column];
    const secondMove= gameBoard[combination[1].row][combination[1].column];
    const thirdMove= gameBoard[combination[2].row][combination[2].column];

    if(firstMove && firstMove === secondMove && firstMove=== thirdMove){
      winner=players[firstMove]
    }
   }
   return winner;
}

function derivedGameBoard( gameTurns){
  let gameBoard= [...initialGameBoard.map(board=> [...board])]

  for(const turn of gameTurns){
      const {square ,player} = turn;
      const {row,col}= square;
      gameBoard[row][col]=player;
  }
  return gameBoard;
}

function App() {
  const [gameTurns , setGameTurns]= useState([])
  const [players,setPlayers] = useState({
    X:'Player 1',
    0:'Player 2'
  })
  const activePlayer= handleSelectedPlayer(gameTurns);
  const gameBoard= derivedGameBoard(gameTurns)

  

    const  winner = derivedWinner(gameBoard,players)
     

     const hasDraw = gameTurns.length === 9 && !winner

     function handlePlayerNameChange(symbol,newName){
         setPlayers(prevState=> {
          return {
            ...prevState, [symbol]:newName
          }
         })
     }


    function handleSelectSquare( rowIndex,colIndex){
      setGameTurns((prevState)=>{
         const currentPlayer= handleSelectedPlayer(prevState);
        
        const updatedTurns= [{square :{row:rowIndex, col:colIndex} ,player:currentPlayer},...prevState];
        return updatedTurns;
      })
    }

    function handleRestart (){
      setGameTurns([])
    }
  return (
     <main>
      <div id="game-container">
        <ol id="players"  className="highlight-player">
          <Player name="player 1"  symbol= "X" onChangeName={handlePlayerNameChange}  isActive={activePlayer=== 'X'}/>
          <Player name="player 2" symbol= "0" onChangeName={handlePlayerNameChange}  isActive={activePlayer === '0'}/>
        </ol>
        {(winner || hasDraw  )&& <GameOver winner={winner}  reMatch = {handleRestart}/>}
        <GameBoard onSelectSquare= {handleSelectSquare}   gameBoard ={gameBoard} />
      </div>
      <Log turns ={gameTurns}/> 
     </main>
  )
}

export default App
