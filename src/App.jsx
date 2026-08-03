import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'

function App() {

  const [checkedBoxes, setCheckedBoxes] = useState([]);
  const [checkedModifiers, setCheckedModifiers] = useState({
    plus2: false,
    plus4: false,
    plus6: false,
    plus8: false,
    plus10: false,
    times2: false
  });

  const handleChange = (e) => {
    const target = e.target;
    const value = Number(target.value);
    const newCheckedBoxes = target.checked ? [...checkedBoxes,value] : checkedBoxes.filter((num) => num !== value);
    setCheckedBoxes(newCheckedBoxes);
  }

  const handleModifierChanges = (e) => {
    const target = e.target;
    const id = target.id;
    const checked = target.checked;
    const newCheckedModifiers = {...checkedModifiers, [id]: checked};
    setCheckedModifiers(newCheckedModifiers);
  }

  const getScore = () => {
    let score = 0;
    checkedBoxes.forEach((value) => { 
      score += value;
    });

    if(checkedModifiers.times2) {
      score *= 2;
    }

    let modifierScore =
      (checkedModifiers.plus2 ? 2 : 0) +
      (checkedModifiers.plus4 ? 4 : 0) +
      (checkedModifiers.plus6 ? 6 : 0) +
      (checkedModifiers.plus8 ? 8 : 0) +
      (checkedModifiers.plus10 ? 10 : 0);
    score += modifierScore

    if (checkedBoxes.length >= 7) {
      score += 15
    }
    return score;
  }
  
  return (
    <>
      <div>ray</div>
      <label className='checkbox-card'>
        <input type='checkbox' id='0' value='0' onChange={handleChange}></input>
        <span className='box'>0</span>
      </label>
      <label className='checkbox-card'>
        <input type='checkbox' id='1' value='1' onChange={handleChange}></input>
        <span className='box'>1</span>
      </label>
      <label className='checkbox-card'>
        <input type='checkbox' id='2' value='2' onChange={handleChange}></input>
        <span className='box'>2</span>
      </label>
      <label className='checkbox-card'>
        <input type='checkbox' id='3' value='3' onChange={handleChange}></input>
        <span className='box'>3</span>
      </label>
      <label className='checkbox-card'>
        <input type='checkbox' id='4' value='4' onChange={handleChange}></input>
        <span className='box'>4</span>
      </label>
      <label className='checkbox-card'>
        <input type='checkbox' id='5' value='5' onChange={handleChange}></input>
        <span className='box'>5</span>
      </label>
      <label className='checkbox-card'>
        <input type='checkbox' id='6' value='6' onChange={handleChange}></input>
        <span className='box'>6</span>
      </label>
      <label className='checkbox-card'>
        <input type='checkbox' id='7' value='7' onChange={handleChange}></input>
        <span className='box'>7</span>
      </label>
      <label className='checkbox-card'>
        <input type='checkbox' id='8' value='8' onChange={handleChange}></input>
        <span className='box'>8</span>
      </label>
      <label className='checkbox-card'>
        <input type='checkbox' id='9' value='9' onChange={handleChange}></input>
        <span className='box'>9</span>
      </label>
      <label className='checkbox-card'>
        <input type='checkbox' id='10' value='10' onChange={handleChange}></input>
        <span className='box'>10</span>
      </label>
      <label className='checkbox-card'>
        <input type='checkbox' id='11' value='11' onChange={handleChange}></input>
        <span className='box'>11</span>
      </label>
      <label className='checkbox-card'>
        <input type='checkbox' id='12' value='12' onChange={handleChange}></input>
        <span className='box'>12</span>
      </label>

      <label className='checkbox-card'>
        <input type='checkbox' id='plus2' value='2' onChange={handleModifierChanges}></input>
        <span className='box'>+2</span>
      </label>
      <label className='checkbox-card'>
        <input type='checkbox' id='plus4' value='4' onChange={handleModifierChanges}></input>
        <span className='box'>+4</span>
      </label>
      <label className='checkbox-card'>
        <input type='checkbox' id='plus6' value='6' onChange={handleModifierChanges}></input>
        <span className='box'>+6</span>
      </label>
      <label className='checkbox-card'>
        <input type='checkbox' id='plus8' value='8' onChange={handleModifierChanges}></input>
        <span className='box'>+8</span>
      </label>
      <label className='checkbox-card'>
        <input type='checkbox' id='plus10' value='10' onChange={handleModifierChanges}></input>
        <span className='box'>+10</span>
      </label>
      <label className='checkbox-card'>
        <input type='checkbox' id='times2' onChange={handleModifierChanges}></input>
        <span className='box'>x2</span>
      </label>
      
      <div>{getScore()}</div>

    </>
  )
}

export default App
