export default function ScoreboardModal({ onClose, showScoreBoard }) {
  const scores = Object.fromEntries(
    Object.entries(showScoreBoard()).sort((a, b) => b[1] - a[1]),
  );

  return (
    <>
      {Object.entries(scores).map(([name, score]) => (
        <div key={name}>
          <div>
            {name}: {score}
          </div>
        </div>
      ))}
      <button onClick={onClose}>Close</button>
    </>
  );
}
