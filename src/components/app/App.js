import React, { useEffect, useState } from 'react'
import './App.css';
import Grid from '../grid';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

let obj = {};
for (let i = 0; i < initialState.tileNum; i++) {
  obj[i] = [];
  for (let z = 0; z < initialState.tileNum; z++) {
    obj[i].push({
      isAlive: false,
      index: z
    })
  }
}

const initialState = {
  tileNum: 25,
  timer: 3,
  aliveCount: 0,
  ifStarted: false,
  grid: obj
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case "PLUSTILES":
      return {
        ...state, tileNum: state.tileNum + 1
      };
    case "MINUSTILES":
      return {
        ...state, tileNum: state.tileNum - 1
      };
    case "PLUSTIME":
      return {
        ...state, timer: state.timer + 1
      };
    case "MINUSTIME":
      return {
        ...state, timer: state.timer - 1
      };
    case "SETALIVE":
      return {
        ...state, aliveCount: state.aliveCount + 1
      };
    case "SETDEAD":
      return {
        ...state, aliveCount: state.aliveCount - 1
      };
    case "START":
      return {
        ...state, ifStarted: true
      };
    case "STOP":
      return {
        ...state, ifStarted: false
      };
    case "CHANGEGRID":
      return {
        ...state, grid: {...state.grid, ...action.column}
      }
  }
}
const store = createStore(reducer);
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
    <Provider className="App">
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
    </Provider>
  );
}

export default App;
