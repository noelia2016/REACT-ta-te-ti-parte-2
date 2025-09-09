export default function Log({ turns }) {
  return (
    <ol id="log">
      {turns.map((turn) => (
        <li key={`${turn.square.row}${turn.square.col}`}>
          Lo seleciono el jugador {turn.player} - {turn.square.row},{turn.square.col}
        </li>
      ))}
    </ol>
  );
}
