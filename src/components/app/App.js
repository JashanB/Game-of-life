import React, { useEffect, useState } from 'react'
import './App.css';
import Grid from '../grid';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { dispatch } from 'rxjs/internal/observable/range';
import { connect } from 'react-redux';

// let obj = {};
// for (let i = 0; i < 25; i++) {
//   obj[i] = [];
//   for (let z = 0; z <  25; z++) {
//     obj[i].push({
//       isAlive: false,
//       index: z
//     })
//   }
// }

// const initialState = {
//   tileNum: 25,
//   timer: 3,
//   aliveCount: 0,
//   ifStarted: false,
//   grid: obj
// }

// function reducer(state = initialState, action) {
//   switch (action.type) {
//     case "PLUSTILE":
//       return {
//         ...state, tileNum: state.tileNum + 1
//       };
//     case "MINUSTILE":
//       return {
//         ...state, tileNum: state.tileNum - 1
//       };
//     case "PLUSTIME":
//       return {
//         ...state, timer: state.timer + 1
//       };
//     case "MINUSTIME":
//       return {
//         ...state, timer: state.timer - 1
//       };
//     case "SETALIVE":
//       return {
//         ...state, aliveCount: state.aliveCount + 1
//       };
//     case "SETDEAD":
//       return {
//         ...state, aliveCount: state.aliveCount - 1
//       };
//     case "START":
//       return {
//         ...state, ifStarted: true
//       };
//     case "STOP":
//       return {
//         ...state, ifStarted: false
//       };
//     case "CHANGEGRID":
//       return {
//         ...state, grid: {...state.grid, ...action.column}
//       }
//     case "SETGRID":
//       return {
//         ...state, grid: action.grid
//       }
//   }
// }
// const store = createStore(reducer);
function App(props) { 
  // const [tileNum, setTileNum] = useState(25);
  // const [timer, setTimer] = useState(3);
  // const [aliveCount, setAliveCount] = useState(0);
  // const [ifStarted, setIfStarted] = useState(false);
  console.log('app props', props)
  // const handleStart = () => {
  //   if (aliveCount >= 5) {
  //     if (props.ifStarted) {
  //       dispatch({type: "STOP"})
  //     } else {
  //       dispatch({type: "START"})
  //     }
  //   }
  // }
  // useEffect(() => {
  //   if (aliveCount <= 0) {
  //     props.dispatch({type: "STOP"})
  //   }
  // }, [aliveCount])

  // useEffect(() => {
  //   let obj = {};
  //   for (let i = 0; i < props.tileNum; i++) {
  //     obj[i] = [];
  //     for (let z = 0; z < props.tileNum; z++) {
  //       obj[i].push({
  //         isAlive: false,
  //         index: z
  //       })
  //     }
  //   }
  //   setGrid(state => (obj))
  // }, [props.tileNum])

  return (
    <div className="App">
      {/* <button onClick={() => setTileNum(state => state -= 1)}> - </button>
      <span># of tiles in row: {tileNum} </span>
      <button onClick={() => setTileNum(state => state += 1)}> + </button>
      <button onClick={() => setTimer(state => state -= 1)}> - </button>
      <span>Timer: {timer} sec </span>
      <button onClick={() => setTimer(state => state += 1)}> + </button>
      <button onClick={() => handleStart()}>Start!</button>
      <span>Number Alive: {aliveCount}</span> */}
      <button onClick={() => props.dispatch({type: "MINUSTILE"})}> - </button>
      <span># of tiles in row: {props.state.tileNum} </span>
      <button onClick={() => props.dispatch({type: "PLUSTILE"})}> + </button>
      <button onClick={() => props.dispatch({type: "MINUSTIME"})}> - </button>
      <span>Timer: {props.state.timer} sec </span>
      <button onClick={() => props.dispatch({type: "PLUSTIME"})}> + </button>
      {/* <button onClick={() => handleStart()}>Start!</button> */}
      <span>Number Alive: {props.state.aliveCount}</span>
      <Grid
        // tileNum={tileNum}
        // aliveCount={aliveCount}
        // ifStarted={ifStarted}
        // timer={timer}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  aliveCount: state.aliveCount,
  timer: state.timer,
  tileNum: state.tileNum,
  ifStarted: state.ifStarted,
  grid: state.grid
})

export default connect(mapStateToProps)(App);
