import React, { useEffect, useState } from 'react'
import './App.css';
import Grid from '../grid';

//set tile count to state (10 - then multiply by itself to form square)
//set timer 

function App() {
  const [tileNum, setTileNum] = useState(5);
  const [timer, setTimer] = useState(2);
  const [aliveCount, setAliveCount] = useState(0);
  const [ifStarted, setIfStarted] = useState(false);

  const handleClick = () => {
    if (aliveCount >= 5) {
      console.log('YO')
      setIfStarted(state => (true));
    }
  }

  return (
    <div className="App">
      <button onClick={() => handleClick()}>Start!</button>
      <span>Number Alive: {aliveCount}</span>
      <Grid
        tileNum={tileNum}
        setTileNum={setTileNum}
        aliveCount={aliveCount}
        setAliveCount={setAliveCount}
        ifStarted={ifStarted}
      />
      {/* <Timer
        timer={timer}
        setTimer={setTimer}
      /> */}
    </div>
  );
}

export default App;
