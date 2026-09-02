export default function ScoreboardModal({
  onClose,
  getRoundsArray,
  getAllPlayerRoundScores,
}) {
  return (
    <>
      <table>
        <tr>
          <th>Name</th>
          {getRoundsArray().map((round) => (
            <th>{round}</th>
          ))}
          <th>Total</th>
        </tr>
        {getAllPlayerRoundScores().map((player) => (
          <tr>
            {player.map((data) => (
              <td>{data}</td>
            ))}
          </tr>
        ))}
      </table>
      <button onClick={onClose}>Close</button>
    </>
  );
}
