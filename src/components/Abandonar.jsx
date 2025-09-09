export default function Abandonar({ winner, onRestart }) {
  return (
    <div id="game-abandona">
      <h2>Abandona el juego!</h2>
      {winner && <p>{winner} won!</p>}
      {!winner && <p>It&apos;s a draw!</p>}
      <p>
        <button onClick={onRestart}>Retirarme!</button>
      </p>
    </div>
  );
}