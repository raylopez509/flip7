import { useEffect, useState } from 'react';
import './App.css';
import PlayerRow from './PlayerRow';
import ScoreboardButton from './ScoreboardButton';
import ConfirmModal from './ConfirmModal';
import AddPlayerModal from './AddPlayerModal';
import { createPortal } from 'react-dom';

function App() {
  const createEmptyRound = () => ({
    numbers: [],
    modifiers: {
      plus2: false,
      plus4: false,
      plus6: false,
      plus8: false,
      plus10: false,
      times2: false,
    },
  });
  const savedPlayers = localStorage.getItem('players');

  const [currentRound, setCurrentRound] = useState(1);
  const [players, setPlayers] = useState(
    savedPlayers ? JSON.parse(savedPlayers) : [],
  );
  const [showConfirmModal, setConfirmModal] = useState(false);
  const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('players', JSON.stringify(players));
  }, [players]);

  const updatePlayer = (playerId, updateFn) => {
    setPlayers(players.map((p) => (p.id === playerId ? updateFn(p) : p)));
  };

  const handleChange = (playerId, e) => {
    const value = Number(e.target.value);
    const checked = e.target.checked;

    updatePlayer(playerId, (p) => {
      const currentNumbers = p.round[currentRound].numbers;
      const newNumbers = checked
        ? [...currentNumbers, value]
        : currentNumbers.filter((num) => num !== value);
      return {
        ...p,
        round: {
          ...p.round,
          [currentRound]: { ...p.round[currentRound], numbers: newNumbers },
        },
      };
    });
  };

  const handleModifierChanges = (playerId, modifierKey, e) => {
    const target = e.target;
    const checked = target.checked;

    updatePlayer(playerId, (p) => ({
      ...p,
      round: {
        ...p.round,
        [currentRound]: {
          ...p.round[currentRound],
          modifiers: {
            ...p.round[currentRound].modifiers,
            [modifierKey]: checked,
          },
        },
      },
    }));
  };

  const nextRound = () => {
    let newRound = currentRound + 1;
    if (newRound > Object.keys(players[0].round).length) {
      let newPlayers = players.map((p) => ({
        ...p,
        round: {
          ...p.round,
          [newRound]: createEmptyRound(),
        },
      }));
      setPlayers(newPlayers);
    }
    setCurrentRound(newRound);
  };

  const prevRound = () => {
    let newRound = currentRound - 1;
    setCurrentRound(newRound);
  };

  const deletePlayer = (id) => {
    const newPlayers = [...players].filter((player) => player.id !== id);
    setPlayers(newPlayers);
  };

  const getRoundScore = (player, roundNum) => {
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

  const getFinalScore = (player) => {
    let score = 0;
    Object.keys(player.round).forEach((roundNum) => {
      score += getRoundScore(player, roundNum);
    });
    return score;
  };

  const showScoreBoard = () => {
    let scores = {};
    players.forEach((player) => {
      scores[player.name] = getFinalScore(player);
    });
    console.log(scores);
    return scores;
  };

  const resetScores = () => {
    setCurrentRound(1);
    let resetPlayers = [...players];
    resetPlayers.forEach((player) => {
      player.round = {
        1: createEmptyRound(),
      };
    });
    setPlayers(resetPlayers);
  };

  const handleAddNewPlayer = (name) => {
    if (name !== null && name.trim() !== '') {
      const newId = players.length === 0 ? 1 : players.at(-1).id + 1;
      let newPlayer = {
        id: newId,
        name: name,
        round: {
          // 1: createEmptyRound()
        },
      };
      let round = 0;
      while (currentRound !== round) {
        round++;
        const newRound = { [round]: createEmptyRound() };
        Object.assign(newPlayer.round, newRound);
      }
      setPlayers([...players, newPlayer]);
    }
  };

  return (
    <>
      <div>Round {currentRound}</div>

      <button id="prevRound" onClick={prevRound} disabled={currentRound === 1}>
        &lt;
      </button>
      <button onClick={nextRound} disabled={players.length === 0}>
        &gt;
      </button>

      <button onClick={() => setShowAddPlayerModal(true)}>Add Player</button>
      {
        showAddPlayerModal && createPortal(
          <AddPlayerModal
          onClose={() => setShowAddPlayerModal(false)}
          handleAddNewPlayer={handleAddNewPlayer}
          ></AddPlayerModal>,
          document.body
        )
      }

      <ScoreboardButton showScoreBoard={showScoreBoard}></ScoreboardButton>

      <button onClick={() => setConfirmModal(true)}>Reset</button>
      {
        showConfirmModal && createPortal(
          <ConfirmModal
            message="Are you sure you want to reset the scores?"
            onConfirm={() => {
              resetScores();
              setConfirmModal(false);
              }
            }
            onClose={() => setConfirmModal(false)}
          ></ConfirmModal>,
          document.body
        )
      }

      {players.map((player) => (
        <PlayerRow
          key={player.id}
          player={player}
          currentRound={currentRound}
          handleChange={handleChange}
          handleModifierChanges={handleModifierChanges}
          deletePlayer={deletePlayer}
          getRoundScore={getRoundScore}
          getFinalScore={getFinalScore}
        ></PlayerRow>
      ))}
    </>
  );
}

export default App;
