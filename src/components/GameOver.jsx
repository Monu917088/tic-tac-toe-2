import React from 'react'

const GameOver = ({winner ,reMatch}) => {
  return (
    <div id ="game-over">
        <h2>Game Over!</h2>
        {winner && <p>{winner} won!</p>}
        {!winner && <p>It's a Draw</p>}
        <p>
            <button onClick={reMatch}>Rematch!</button>
        </p>
    </div>
  )
}

export default GameOver