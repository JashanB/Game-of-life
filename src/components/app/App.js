import React, { useEffect, useState } from 'react'
import './App.css';
import Grid from '../grid';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { dispatch } from 'rxjs/internal/observable/range';
import { connect } from 'react-redux';

function App(props) { 
  console.log('app props', props)
  const handleStart = () => {
    if (props.aliveCount >= 5) {
      if (props.ifStarted) {
        dispatch({type: "STOP"})
      } else {
        dispatch({type: "START"})
      }
    }
  }
  useEffect(() => {
    if (props.aliveCount <= 0) {
      props.dispatch({type: "STOP"})
    }
  }, [props.aliveCount])

  return (
    <div className="App">
      <button onClick={() => props.dispatch({type: "MINUSTILE"})}> - </button>
      <span># of tiles in row: {props.tileNum} </span>
      <button onClick={() => props.dispatch({type: "PLUSTILE"})}> + </button>
      <button onClick={() => props.dispatch({type: "MINUSTIME"})}> - </button>
      <span>Timer: {props.timer} sec </span>
      <button onClick={() => props.dispatch({type: "PLUSTIME"})}> + </button>
      <button onClick={() => handleStart()}>Start!</button>
      <span>Number Alive: {props.aliveCount}</span>
      <Grid
        tileNum={props.tileNum}
        aliveCount={props.aliveCount}
        ifStarted={props.ifStarted}
        timer={props.timer}
        grid={props.grid}
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
