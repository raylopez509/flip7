export default function PlayerRow({
  player,
  currentRound,
  handleChange,
  handleModifierChanges,
  deletePlayer,
}) {
  const currentRoundData = player.round[currentRound];
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const modifiers = [
    { key: 'plus2', label: '+2' },
    { key: 'plus4', label: '+4' },
    { key: 'plus6', label: '+6' },
    { key: 'plus8', label: '+8' },
    { key: 'plus10', label: '+10' },
    { key: 'times2', label: 'x2' },
  ];

  const getFinalScore = () => {
    let score = 0;
    Object.keys(player.round).forEach((roundNum) => {
      score += getRoundScore(roundNum);
    });
    return score;
  };

  const getRoundScore = (roundNum) => {
    let score = 0;
    player.round[roundNum].numbers.forEach((value) => {
      score += value;
    });

    if (player.round[roundNum].modifiers.times2) {
      score *= 2;
    }

    let modifierScore =
      (player.round[roundNum].modifiers.plus2 ? 2 : 0) +
      (player.round[roundNum].modifiers.plus4 ? 4 : 0) +
      (player.round[roundNum].modifiers.plus6 ? 6 : 0) +
      (player.round[roundNum].modifiers.plus8 ? 8 : 0) +
      (player.round[roundNum].modifiers.plus10 ? 10 : 0);
    score += modifierScore;

    if (player.round[roundNum].numbers.length >= 7) {
      score += 15;
    }
    return score;
  };

  return (
    <div className="player-row">
      <div>{player.name}</div>
      {numbers.map((n) => (
        <label className="checkbox-card" key={n}>
          <input
            className={`number-${n}`}
            type="checkbox"
            value={n}
            checked={currentRoundData.numbers.includes(n)}
            onChange={(e) => handleChange(player.id, e)}
          ></input>
          <span className="box">{n}</span>
        </label>
      ))}
      {modifiers.map(({ key, label }) => (
        <label className="checkbox-card" key={key}>
          <input
            type="checkbox"
            value="2"
            checked={currentRoundData.modifiers[key]}
            onChange={(e) => handleModifierChanges(player.id, key, e)}
          ></input>
          <span className="box">{label}</span>
        </label>
      ))}
      <button onClick={() => deletePlayer(player.id)}>Delete</button>
      <div>{getFinalScore()}</div>
      <div>{getRoundScore(currentRound)}</div>
    </div>
  );
}
