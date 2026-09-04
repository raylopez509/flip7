export default function ScoreboardModal({
  onClose,
  getRoundsArray,
  getAllPlayerRoundScores,
}) {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            {getRoundsArray().map((round) => (
              <th key={"round" + round}>{round}</th>
            ))}
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {getAllPlayerRoundScores().map((player) => (
            <tr key={player.id}>
              <td>{player.name}</td>
              {player.scores.map((data, index) => (
                <td key={index}>{data}</td>
              ))}
              <td>{player.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onClose}>Close</button>
    </>
  );
}
