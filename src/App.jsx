import { useEffect, useState } from "react";
import { GameBoard } from "./components/GameBoard";
import { Player } from "./components/Player";
import { Log } from "./components/Log";
import { WINNING_COMBINATIONS } from "../winning-combination";
import { Gameover } from "./components/Gameover";

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}

const INITIAL_GAMEBOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

const derivedActivePlayer = (gameTurns) => {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O'
  }
  return currentPlayer;
}

const derievedGameBoard = (gameTurns) => {
  let gameBoard = [...INITIAL_GAMEBOARD.map(array => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

const derivedWinner = (gameBoard, players) => {
  let winner;
  for (const winningcobination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[winningcobination[0].row][winningcobination[0].column];
    const secondSquareSymbol = gameBoard[winningcobination[1].row][winningcobination[1].column];
    const thirdSquareSymbol = gameBoard[winningcobination[2].row][winningcobination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol
      && firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = derivedActivePlayer(gameTurns)
  const gameBoard = derievedGameBoard(gameTurns);
  const winner = derivedWinner(gameBoard, players)
  const hasDraw = gameTurns.length === 9 && !winner;

  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurns((prevTurns) => {
      const currentPlayer = derivedActivePlayer(prevTurns)

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns
      ];
      return updatedTurns;
    })
  }


  // Handle computer move
  // useEffect(() => {
  //   if (winner || hasDraw) return;
  //   if (activePlayer === "O") {
  //     const emptySquares = [];
  //     gameBoard.forEach((row, r) =>
  //       row.forEach((cell, c) => {
  //         if (!cell) emptySquares.push({ row: r, col: c });
  //       })
  //     );

  //     if (emptySquares.length === 0) return;

  //     const move = emptySquares[Math.floor(Math.random() * emptySquares.length)];

  //     const timeout = setTimeout(() => {
  //       handleSelectSquare(move.row, move.col);
  //     }, 500);

  //     return () => clearTimeout(timeout);
  //   }
  // }, [activePlayer, gameBoard, winner, hasDraw]);


  const handleRestart = () => {
    setGameTurns([]);
  }

  const handleNameChange = (symbol, newName) => {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYERS.X} symbol='X' isActive={activePlayer === 'X'} onchangeName={handleNameChange} />
          <Player initialName={PLAYERS.O} symbol='O' isActive={activePlayer === 'O'} onchangeName={handleNameChange} />
        </ol>
        {(winner || hasDraw) && <Gameover winner={winner} onRestart={handleRestart} />}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App;