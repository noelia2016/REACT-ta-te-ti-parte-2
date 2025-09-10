export default function GameAbandonar({ setCount, winner, onRestart }) {

  let elemento;

  if (setCount() >= 3 && !winner){
      elemento=<p>
        <button onClick={onRestart}>Volver a jugar!</button>
      </p>;
  }else{
      elemento=<h2>Ups!! Tiene que jugar al menos una tirada para poder abandonar!!!</h2>;
  }

  return (
    <div id="game-abandona">
        {elemento}     
    </div>
  );
}