import React, { useState } from 'react'

const GameBoard = ({onSelectSquare, gameBoard}) => { 
  return (
    <>
    <ol id="game-board">
        {gameBoard.map((row,rowIndex)=>(
            <li key={rowIndex}>
            <ol>
                {row.map((playerSymbol,colIndex)=>(
                     <li  key={colIndex} >
                    <button disabled ={playerSymbol !==null} onClick={()=>onSelectSquare(rowIndex,colIndex)}>{playerSymbol}</button>
                    </li>
                ))}
            </ol>
        </li>))}
    </ol>
    </>
  )
}

export default GameBoard