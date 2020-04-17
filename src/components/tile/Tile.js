import React, { useEffect, useState } from 'react'
import './Tile.css'

export default function Tile(props) {
  const [numAlive, setNumAlive] = useState(0);
  let className = "tile-button";
  if (props.status) {
    className += '-alive'
  }
  let borderingSquares = 8
  let col = props.column
  let row = props.row

  if (col === 0 || row === 0 || col === props.max || row === props.max) {
    borderingSquares = 5;
  }
  if ((col === 0 || col === props.max) && (row === 0 || row === props.max)){
    borderingSquares = 4;
  }

  // useEffect(() => {
  //   let newNumber = props.countBox(col, row, borderingSquares);
  //   // console.log('new', newNumber)
  //   setNumAlive(state => (newNumber));
  // }, [props.grid])

  const handleClick = (column, row, status) => {
    // let count = countBox(column, row, 8)
    // console.log('click count', count)
    status ? props.setDead(column, row) : props.setAlive(column, row)
  }

  if (props.ifStarted) {
    setInterval(function () {
      let numberAlive = props.countBox(col, row, borderingSquares);
      console.log('interval', numberAlive, col, row)
      if (numberAlive < 2 && numberAlive >= 0 && props.status === true) {
        props.setDead(col, row);
      }
      if (numberAlive >= 4 && props.status === true) {
        props.setDead(col, row);
      }
      if (numberAlive === 3 && props.status === false) {
        props.setAlive(col, row);
      }
    }, 3000);
  }

  // if (props.ifStarted) {
  //   setInterval(function () {
  //     if (numAlive < 2 && props.status === true) {
  //       props.setDead(col, row);
  //     }
  //     if (numAlive >= 4 && props.status === true) {
  //       props.setDead(col, row);
  //     }
  //     if (numAlive === 3 && props.status === false) {
  //       props.setAlive(col, row);
  //     }
  //   }, 5000);
  // }

  return (
    <div className="tile">
      <button className={className} onClick={() => handleClick(col, row, props.status)}></button>
    </div>
  )
}