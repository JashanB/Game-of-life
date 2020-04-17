import React, { useEffect, useState } from 'react'
import Tile from '../tile';
import './Grid.css'
import TileColumn from '../tilecolumn'

export default function Grid(props) {
  //each tile -> have function to set alive on click
  //each tile should also have ability to change the grid
  //set to alive function here that changes grid state 
  const [grid, setGrid] = useState([]);
  let numOfRows = props.tileNum;
  useEffect(() => {
    do {
      let arrayOfTiles = [];
      for (let i = 0; i < props.tileNum; i++) {
        arrayOfTiles.push({
          isAlive: false,
          index: i
        });
      }
      setGrid(state => [...state, arrayOfTiles])
      numOfRows--
    } while (numOfRows > 0);
  }, [props.tileNum])

  const setAlive = (column, index) => {
    const newGrid = grid.map(function(col, i) {
      if (column === i) {
         return col.map(function(item, j) {
          if (j === index) {
            if (item.isAlive) {
              props.setAliveCount(state => state -= 1)
              return {isAlive: false, index: j}
            } else {
              props.setAliveCount(state => state += 1)
              return {isAlive: true, index: j}
            }
          } else {
            return item
          }
        })
      } else {
        return col;
      }
    })
    console.log('index', column, index)
    setGrid(state => (newGrid));
  }

  const tilecolumns = grid.map(function (row, index) {
    return (
      // <div className="tile-row">
        <TileColumn
          key={index}
          column={index}
          tiles={row}
          setGrid={setGrid}
          grid={grid}
          square={props.tileNum}
          setAlive={setAlive}
          max={props.tileNum - 1}
          ifStarted={props.ifStarted}
        />
      // </div>
    )
  })
  setTimeout(function () { console.log("Hello", grid); }, 2000);
  return (
    <ul className="grid-container">
      {tilecolumns}
    </ul>
  )
}