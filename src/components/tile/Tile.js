import React, { useEffect, useState } from 'react'
import './Tile.css'

export default function Tile(props) {
  // let widthPercentage = 50/props.square;
  // widthPercentage += "%"
  let className = "tile-button";
  if (props.status === true) {
    className += '-alive'
  }
  let borderingSquares = 8
  let numberDead;
  let numberAlive;
  let col = props.column
  let row = props.index
  if (col === 0 || row === 0 || col === props.max || row === props.max) {
    borderingSquares = 5;
  }
  // const countBox = (column, index) => {
  //   let count = 0;
  //   if (props.grid[column])
  // }
  const countBox = (column, index) => {
    let count = 0;
    for (let i = index - 1; i < index + 2; i++) {
      props.grid[column - 1][i].isAlive ? count += 1 : count += 0
      if (i !== index) {
        props.grid[column][i].isAlive ? count += 1 : count += 0
      }
      props.grid[column + 1][i].isAlive ? count += 1 : count += 0
    }
    return count;
  }
  if (ifStarted) {
    setInterval(function() { 
      numberAlive = countBox(col, row);
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


  return (
    // <div className="tile" style={{width: widthPercentage}}>
    <div className="tile">

      <button className={className} onClick={() => props.setAlive(col, row)}></button>
    </div>
  )
}