import { useState } from 'react'
import './App.css'

function App() {

  const [currentRound, setCurrentRound] = useState(1);
  const [player, setPlayer] = useState({
    name: "ray",
    round: {
      1: {
        numbers: [],
        modifiers: {
          plus2: false,
          plus4: false,
          plus6: false,
          plus8: false,
          plus10: false,
          times2: false,
        }
      }
    }
  });

  const handleChange = (e) => {
    const target = e.target;
    const value = Number(target.value);
    const newNumbers = target.checked ? [...player.round[currentRound].numbers, value] 
     : player.round[currentRound].numbers.filter((num) => num !== value);

    const newPlayer = {
      ...player,
      round: {
        ...player.round,
        [currentRound]: {
          ...player.round[currentRound],
          numbers: newNumbers
        } 
      }
    }

    setPlayer(newPlayer);

  }

  const handleModifierChanges = (e) => {
    const target = e.target;
    const id = target.id;
    const checked = target.checked;
    const newModifiers = {...player.round[currentRound].modifiers, [id]: checked}
    const newPlayer = {
      ...player,
      round: {
        ...player.round,
        [currentRound]: {
          ...player.round[currentRound],
          modifiers: newModifiers
        } 
      }
    }
    setPlayer(newPlayer);
  }
  
  const getFinalScore = () => {
    let score = 0;
    Object.keys(player.round).forEach((roundNum) => {
      score += getRoundScore(roundNum);
    });
    return score;
  }

  const getRoundScore = (roundNum) => {
    let score = 0;
    player.round[roundNum].numbers.forEach((value) => {
      score += value;
    });

    if(player.round[roundNum].modifiers.times2) {
      score *= 2;
    }

    let modifierScore =
      (player.round[roundNum].modifiers.plus2 ? 2 : 0) +
      (player.round[roundNum].modifiers.plus4 ? 4 : 0) +
      (player.round[roundNum].modifiers.plus6 ? 6 : 0) +
      (player.round[roundNum].modifiers.plus8 ? 8 : 0) +
      (player.round[roundNum].modifiers.plus10 ? 10 : 0);
    score += modifierScore

    if (player.round[roundNum].numbers.length >= 7) {
      score += 15
    }
    return score;
  }

  const nextRound = () => {
    let newRound = currentRound + 1
    if(newRound > Object.keys(player.round).length) {
      let newPlayer = {...player, round: {
        ...player.round,
        [newRound]: {
          numbers: [],
          modifiers: {
            plus2: false,
            plus4: false,
            plus6: false,
            plus8: false,
            plus10: false,
            times2: false,
          }
        }
      }}
      setPlayer(newPlayer);     
    }
    setCurrentRound(newRound);
  }

  const prevRound = () => {
    let newRound = currentRound - 1;
    setCurrentRound(newRound);
  }
  
  return (
    <>
      <div>Round {currentRound}</div>
      <div>ray</div>
      <label className='checkbox-card'>
        <input type='checkbox' id='zero' value='0' checked={player.round[currentRound].numbers.includes(0)} onChange={handleChange}></input>
        <span className='box'>0</span>
      </label>
      <label className='checkbox-card'>
        <input type='checkbox' id='one' value='1' checked={player.round[currentRound].numbers.includes(1)} onChange={handleChange}></input>
        <span className='box'>1</span>
      </label>
      <label className='checkbox-card'>
        <input type='checkbox' id='two' value='2' checked={player.round[currentRound].numbers.includes(2)} onChange={handleChange}></input>
        <span className='box'>2</span>
      </label>
      <label className='checkbox-card'>
        <input type='checkbox' id='three' value='3' checked={player.round[currentRound].numbers.includes(3)} onChange={handleChange}></input>
        <span className='box'>3</span>
      </label>
      <label className='checkbox-card'>
        <input type='checkbox' id='four' value='4' checked={player.round[currentRound].numbers.includes(4)} onChange={handleChange}></input>
        <span className='box'>4</span>
      </label>
      <label className='checkbox-card'>
        <input type='checkbox' id='five' value='5' checked={player.round[currentRound].numbers.includes(5)} onChange={handleChange}></input>
        <span className='box'>5</span>
      </label>
      <label className='checkbox-card'>
        <input type='checkbox' id='six' value='6' checked={player.round[currentRound].numbers.includes(6)} onChange={handleChange}></input>
        <span className='box'>6</span>
      </label>
      <label className='checkbox-card'>
        <input type='checkbox' id='seven' value='7' checked={player.round[currentRound].numbers.includes(7)} onChange={handleChange}></input>
        <span className='box'>7</span>
      </label>
      <label className='checkbox-card'>
        <input type='checkbox' id='eight' value='8' checked={player.round[currentRound].numbers.includes(8)} onChange={handleChange}></input>
        <span className='box'>8</span>
      </label>
      <label className='checkbox-card'>
        <input type='checkbox' id='nine' value='9' checked={player.round[currentRound].numbers.includes(9)} onChange={handleChange}></input>
        <span className='box'>9</span>
      </label>
      <label className='checkbox-card'>
        <input type='checkbox' id='ten' value='10' checked={player.round[currentRound].numbers.includes(10)} onChange={handleChange}></input>
        <span className='box'>10</span>
      </label>
      <label className='checkbox-card'>
        <input type='checkbox' id='eleven' value='11'checked={player.round[currentRound].numbers.includes(11)} onChange={handleChange}></input>
        <span className='box'>11</span>
      </label>
      <label className='checkbox-card'>
        <input type='checkbox' id='twelve' value='12' checked={player.round[currentRound].numbers.includes(12)} onChange={handleChange}></input>
        <span className='box'>12</span>
      </label>

      <label className='checkbox-card'>
        <input type='checkbox' id='plus2' value='2' checked={player.round[currentRound].modifiers.plus2} onChange={handleModifierChanges}></input>
        <span className='box'>+2</span>
      </label>
      <label className='checkbox-card'>
        <input type='checkbox' id='plus4' value='4' checked={player.round[currentRound].modifiers.plus4} onChange={handleModifierChanges}></input>
        <span className='box'>+4</span>
      </label>
      <label className='checkbox-card'>
        <input type='checkbox' id='plus6' value='6' checked={player.round[currentRound].modifiers.plus6} onChange={handleModifierChanges}></input>
        <span className='box'>+6</span>
      </label>
      <label className='checkbox-card'>
        <input type='checkbox' id='plus8' value='8' checked={player.round[currentRound].modifiers.plus8} onChange={handleModifierChanges}></input>
        <span className='box'>+8</span>
      </label>
      <label className='checkbox-card'>
        <input type='checkbox' id='plus10' value='10' checked={player.round[currentRound].modifiers.plus10} onChange={handleModifierChanges}></input>
        <span className='box'>+10</span>
      </label>
      <label className='checkbox-card'>
        <input type='checkbox' id='times2' checked={player.round[currentRound].modifiers.times2} onChange={handleModifierChanges}></input>
        <span className='box'>x2</span>
      </label>
      <div>{getFinalScore()}</div>
      <div>{getRoundScore(currentRound)}</div>

      <button id='prevRound' onClick={prevRound} disabled={currentRound === 1}>&lt;</button>
      <button onClick={nextRound}>&gt;</button>
    </>
  )
}

export default App
