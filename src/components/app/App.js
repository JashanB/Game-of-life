import React, { useEffect, useState } from 'react'
import './App.css';
import Grid from '../grid';

function App() {
  const [tileNum, setTileNum] = useState(25);
  const [timer, setTimer] = useState(3);
  const [aliveCount, setAliveCount] = useState(0);
  const [ifStarted, setIfStarted] = useState(false);

  const handleStart = () => {
    if (aliveCount >= 5) {
      if (ifStarted) {
        setIfStarted(state => (false));
      } else {
        setIfStarted(state => (true));
      }
    }
  }
  useEffect(() => {
    if (aliveCount <= 0) {
      setIfStarted(state => (false));
    }
  }, [aliveCount])

  return (
    <div className="App">
      <button onClick={() => setTileNum(state => state -= 1)}> - </button>
      <span># of tiles in row: {tileNum} </span>
      <button onClick={() => setTileNum(state => state += 1)}> + </button>
      <button onClick={() => setTimer(state => state -= 1)}> - </button>
      <span>Timer: {timer} sec </span>
      <button onClick={() => setTimer(state => state += 1)}> + </button>
      <button onClick={() => handleStart()}>Start!</button>
      <span>Number Alive: {aliveCount}</span>
      <Grid
        tileNum={tileNum}
        setTileNum={setTileNum}
        aliveCount={aliveCount}
        setAliveCount={setAliveCount}
        ifStarted={ifStarted}
        timer={timer}
      />
    </div>
  );
}

export default App;
