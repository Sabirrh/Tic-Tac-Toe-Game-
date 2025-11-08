import { useState } from "react"

export const Player = ({ initialName, symbol, isActive, onchangeName, isComputer }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [playerName, setPlayerName] = useState(initialName)
  const handleEdit = () => {
    //  if(!isComputer){
    //   setIsEdit(editing => !editing);
    //  }
    setIsEdit(editing => !editing)
    if (isEdit) {
      onchangeName(symbol, playerName)
    }
  }
  const changeHandle = (e) => {
    setPlayerName(e.target.value);
  }
  let editplayerName = <span className="player-name">{playerName}</span>;
  if (isEdit) {
    editplayerName = <input type="text" required value={playerName} onChange={changeHandle} />
  }
  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {editplayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEdit}>{isEdit ? 'Save' : 'Edit'}</button>
    </li>
  )
}