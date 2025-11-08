// import { useState } from "react"


export const GameBoard = ({onSelectSquare,board}) => {
    return(
        <>
            <ol id="game-board">
               {board.map((row,rowIndex) => <li key={rowIndex}>
                <ol>
                    {row.map((playersymbol,colIndex) => <li key={colIndex}>
                      <button onClick={()=>onSelectSquare(rowIndex,colIndex)}
                        disabled={playersymbol !== null}>{playersymbol}</button>
                    </li>)}
                </ol>
               </li>)}
            </ol>
        </>
    )
}