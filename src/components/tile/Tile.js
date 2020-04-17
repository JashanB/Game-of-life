import React, { useEffect, useState } from 'react'
import './Tile.css'

export default function Tile(props) {
  let className = "tile-button";
  if (props.status === true) {
    className += '-alive'
  }
  let borderingSquares = 8
  let col = props.column
  let row = props.row

  if (col === 0 || row === 0 || col === props.max || row === props.max) {
    borderingSquares = 5;
  }
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
        if (props.grid[column - 1][i] && props.grid[column - 1][i].isAlive) {
          count += 1;
        }
        if (i !== row) {
          if (props.grid[column][i] && props.grid[column][i].isAlive) {
            count += 1;
          }
        }
        if (props.grid[column + 1][i] && props.grid[column + 1][i].isAlive) {
          count += 1;
        }
      }
    }
    return count;
  }
  if (props.ifStarted) {
    setInterval(function () {
      let numberAlive = countBox(col, row, borderingSquares);
      if (numberAlive < 2 && props.status === true) {
        props.setAlive(col, row);
      }
      if (numberAlive >= 4 && props.status === true) {
        props.setAlive(col, row);
      }
      if (numberAlive === 3 && props.status === false) {
        props.setAlive(col, row);
      }
    }, 3000);
  }
  // if (props.grid[col][row].isAlive) {
  //   console.log('here', props.grid[col][row])

  // }

  return (
    <div className="tile">
      <button className={className} onClick={() => props.setAlive(col, row)}></button>
    </div>
  )
}