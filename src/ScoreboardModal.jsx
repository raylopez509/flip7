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
            <tr key={player[0]}>
              {player.map((data) => (
                <td>{data}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onClose}>Close</button>
    </>
  );
}
