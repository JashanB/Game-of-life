import React, { useEffect } from 'react'
import './App.css';
import Grid from '../grid';
import { connect } from 'react-redux';

function App(props) { 
  console.log('app props', props)
  const handleStart = () => {
    if (props.aliveCount >= 5) {
      if (props.ifStarted) {
        props.dispatch({type: "STOP"})
      } else {
        props.dispatch({type: "START"})
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
      <div className="heading">
      <button onClick={() => props.dispatch({type: "MINUSTILE"})}> - </button>
      <span># of tiles in row: {props.tileNum} </span>
      <button onClick={() => props.dispatch({type: "PLUSTILE"})}> + </button>
      {/* <button onClick={() => props.dispatch({type: "MINUSTIME"})}> - </button>
      <span>Timer: {props.timer} sec </span>
      <button onClick={() => props.dispatch({type: "PLUSTIME"})}> + </button> */}
      <button onClick={() => handleStart()}>Start!</button>
      <span>Number Alive: {props.aliveCount}</span>
      </div>
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
