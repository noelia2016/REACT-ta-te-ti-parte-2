export default function GameAbandonar({ winner, onRestart }) {
  return (
    <div id="game-abandona">
      <h2>Abandona el juego!</h2>
      <p>
        <button onClick={onRestart}>Volver a jugar!</button>
      </p>
    </div>
  );
}