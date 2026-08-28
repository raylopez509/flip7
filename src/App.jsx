import { useState } from 'react'
import './App.css'
import PlayerRow from './PlayerRow'

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
    }
  })
  const [currentRound, setCurrentRound] = useState(1);
  const [players, setPlayers] = useState([{
    id: 1,
    name: "ray",
    round: {
      1: createEmptyRound()
    }
  }]);


  const updatePlayer = (playerId, updateFn) => {
    setPlayers(players.map((p) => (p.id === playerId ? updateFn(p) : p)))
  }

  const handleChange = (playerId, e) => {
    const value = Number(e.target.value);
    const checked = e.target.checked;

    updatePlayer(playerId, (p) => {
      const currentNumbers = p.round[currentRound].numbers;
      const newNumbers = checked ? [...currentNumbers, value] : currentNumbers.filter(num => num !== value);
      return {
        ...p,
        round: {
          ...p.round,
          [currentRound]: {...p.round[currentRound], numbers: newNumbers}
        }
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
          modifiers: {...p.round[currentRound].modifiers, [modifierKey]: checked}
        } 
      }
    }))
  }


  const nextRound = () => {
    let newRound = currentRound + 1
    if(newRound > Object.keys(players[0].round).length) {
      let newPlayers = players.map((p) => ({
        ...p, round: {
          ...p.round,
          [newRound]: createEmptyRound()
        }
      }))
      setPlayers(newPlayers);     
    }
    setCurrentRound(newRound);
  }

  const prevRound = () => {
    let newRound = currentRound - 1;
    setCurrentRound(newRound);
  }

  const handleAddPlayer = () => {

    const name = window.prompt("Enter a name");
    if(name !== null && name.trim() !== "") {
      const newId = players.at(-1).id + 1;
      console.log(newId);
      let newPlayer = {
        id: newId,
        name: name,
        round: {
          // 1: createEmptyRound()
        }
      };
      let round = 0;
      while (currentRound !== round) {
        round++;
        const newRound = {[round]: createEmptyRound()}
        Object.assign(newPlayer.round, newRound);
      }
      setPlayers([...players, newPlayer]);
    }
  }
  
  return (
    <>
      <div>Round {currentRound}</div>

      <button id='prevRound' onClick={prevRound} disabled={currentRound === 1}>&lt;</button>
      <button onClick={nextRound}>&gt;</button>

      <button onClick={handleAddPlayer}>Add Player</button>
      
      {players.map((player) => (
        <PlayerRow key={player.id} player={player} currentRound={currentRound} handleChange={handleChange} handleModifierChanges={handleModifierChanges}></PlayerRow>
      ))}
    </>
  )
}

export default App
