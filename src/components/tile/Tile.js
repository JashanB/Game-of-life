import React from 'react'
import './Tile.css'

export default function Tile(props) {
  let className = "tile";
  if (props.status) {
    className += '-alive';
  };
  let borderingSquares = 8
  let col = props.column
  let row = props.row
  //checks to see how many squares are bordering tile
  if (col === 0 || row === 0 || col === props.max || row === props.max) {
    borderingSquares = 5;
  }
  if ((col === 0 || col === props.max) && (row === 0 || row === props.max)){
    borderingSquares = 4;
  }
  //handles actions when setting tiles to alive at beginning of game
  const handleClick = (column, row, status) => {
    status ? props.setDead(column, row) : props.setAlive(column, row)
  }
  //sets tile change interval 
  if (props.ifStarted) {
    setInterval(function() {
      props.rules(props.timer, col, row, borderingSquares, props.status)
    }, props.timer)
  }

  return (
    <div className="tile">
      <button className={className} onClick={() => handleClick(col, row, props.status)}></button>
    </div>
  )
}