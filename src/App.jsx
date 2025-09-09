import { useState } from 'react';

import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import GameOver from './components/GameOver.jsx';
import { WINNING_COMBINATIONS } from './winning-combinations.js';
import Abandonar from './components/Abandonar.jsx';

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// quien es el ultimo jugador activo
function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

// para redibujar el tablero
function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

/* calcula quien es el ganador del juego devuelve 'X' o 'O' ... si retorna nulo es porque es empate*/
function deriveWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS); // administra los nombres de los jugadores
  const [gameTurns, setGameTurns] = useState([]); // almacena el historial de movimientos realizados en el juego en una matriz

  const activePlayer = deriveActivePlayer(gameTurns); // el ultimo que jugo para evitar el renderizado -- jugador activo por defecto x
  const gameBoard = deriveGameBoard(gameTurns); // deriva los turnos por 
  const winner = deriveWinner(gameBoard, players); // Esta función (no proporcionada) verificaría una condición de victoria según la información gameBoardactual players.
  const hasDraw = gameTurns.length === 9 && !winner; // grilla de 9 casilleros no puede a ver mas mov
  
  const [quitTurns, setGameAbandonar]; // para abandonar juego cuento la cant de mov que hicieron los jugadores es mayor a 2
  // necesito una variable que contabilice cada vez que cambia de jugador para q supere 2 y habilite el boton

 // modifico el tablero con la nueva selecion del jugador
  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      // muestra los turnos del jugador
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  // Restablece el gameTurns estado a una matriz vacía, reiniciando efectivamente el juego.
  function handleRestart() {
    setGameTurns([]); // restablece el estado del tablero en vacio como si se jugara nuevamente
  }

  // Actualiza el playersestado cuando un jugador cambia de nombre. 
  // Usa symbol(p. ej., 'X' u 'O') para identificar el nombre del jugador que se debe actualizar.
  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        {/* muestra los jugadores */}
        <ol id="players" className="highlight-player"> 
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerNameChange}   
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        {/** Representa el tablero de juego, pasando el onSelectSquarecontrolador y el boardestado derivado. */}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
        {/** para abandonar juego 
         * necesito que cant moviemientos del jugador sea mayor a 1 o que cantidad de movimientos en la grilla supere 2
         * para poder cancelar el juego
        */}
        <GameAbandonar onRestart={handleRestart} /> // nose donde es que tiene que verificar la cantidad de mov que hubo
      </div>
      <Log turns={gameTurns} /> 
	  {/*
		* representa los logs de los movimientos que van haciendo los jugadores en una lista
        */}
    </main>
  );
}

export default App;
