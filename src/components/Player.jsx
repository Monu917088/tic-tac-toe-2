import React, { useState } from "react";

const Player = ({ name, symbol, isActive,onChangeName }) => {
  const [isEditing, setIsEditing] = useState(false);
   const [playerName, setplayerName]= useState(name)

  function handleEditClick() {
    setIsEditing((prevState)=>!prevState); 

    if(isEditing){
    onChangeName(symbol, playerName)
    }
  }

  function handleChange(event){

    setplayerName(event.target.value)
  }
  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {!isEditing && <span className="player-name"> {playerName }</span>}
        {isEditing && <input type="text" value={playerName} onChange={handleChange} required/>}
        <span className="player=symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? 'Save' :'Edit'}</button>
    </li>
  );
};

export default Player;
