import React, { useEffect, useState } from 'react'
import './Grid.css'
import TileColumn from '../tilecolumn'
import { connect } from 'react-redux';

function Grid(props) {
  //use effect to set grid size based on # of tiles in row buttons
  useEffect(() => {
    let obj = {};
    for (let i = 0; i < props.tileNum; i++) {
      obj[i] = [];
      for (let z = 0; z < props.tileNum; z++) {
        obj[i].push({
          isAlive: false,
          index: z
        })
      }
    }
    props.dispatch({type: "SETGRID", grid: obj})
  }, [props.tileNum])
    //sets tile status to alive and increases alive count - called when rules dictate cell to be alive
  const setAlive = (column, index) => {
    let columnArray = props.grid[column];
    if (columnArray[index].isAlive === false) {
      columnArray[index].isAlive = true;
      props.dispatch({type: "CHANGEGRID", column: {[column]: columnArray}})
      if (props.aliveCount < (props.tileNum * props.tileNum)) {
        props.dispatch({type: "SETALIVE"})
      }
    }
  }
  //sets tile status to dead and decreases alive count - called when rules dictate cell death
  const setDead = (column, index) => {
    let columnArray = props.grid[column];
    if (columnArray[index].isAlive) {
      columnArray[index].isAlive = false;
      props.dispatch({type: "CHANGEGRID", column: {[column]: columnArray}})
      if (props.aliveCount > 0) {
        props.dispatch({type: "SETDEAD"})
      }
    }
  }
  //counts in a square around each tile, checks to see if on edge/corner
  const countBox = (column, row, bordering) => {
    let count = 0;
    for (let i = row - 1; i < row + 2; i++) {
      if (bordering === 8) {
        props.grid[column - 1][i].isAlive ? count += 1 : count += 0
        if (i !== row) {
          props.grid[column][i].isAlive ? count += 1 : count += 0
        }
        props.grid[column + 1][i].isAlive ? count += 1 : count += 0
      } else if (bordering <= 5) {
        if (props.grid[column - 1] && props.grid[column - 1][i] && props.grid[column - 1][i].isAlive) {
          count += 1;
        }
        if (i !== row) {
          if (props.grid[column][i] && props.grid[column][i].isAlive) {
            count += 1;
          }
        }
        if (props.grid[column + 1] && props.grid[column + 1][i] && props.grid[column + 1][i].isAlive) {
          count += 1;
        }
      }
    }
    return count;
  }
  //applies rues of life to each tile
  const rules = (timer, col, index, bordering, status) => {
    let numberAlive = countBox(col, index, bordering);
      if (numberAlive < 2 && numberAlive >= 0 && status === true) {
        setDead(col, index);
      }
      if (numberAlive >= 4 && numberAlive <= 8 && status === true) {
        setDead(col, index);
      }
      if (numberAlive === 3 && status === false) {
        setAlive(col, index);
      }
  }
  //creates tile column based on each values array of grid 
  const tilecolumns = Object.values(props.grid).map(function (column, index) {
    return (
      <TileColumn
        key={index}
        column={index}
        tiles={column}
        square={props.tileNum}
        setAlive={setAlive}
        setDead={setDead}
        max={props.tileNum - 1}
        ifStarted={props.ifStarted}
        countBox={countBox}
        rules={rules}
        timer={props.timer}
      />
    )
  })
  return (
    <ul className="grid-container">
      {tilecolumns}
    </ul>
  )
}
//just need dispatch
const mapStateToProps = () => ({})

export default connect(mapStateToProps) (Grid)