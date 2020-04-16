import React, { useEffect, useState } from 'react'
import Tile from '../tile'

export default function Grid (props) {
  //each tile -> have function to set alive on click
  //each tile should also have ability to change the grid
  //set to alive function here that changes grid state 
  const [grid, setGrid] = useState([]);
  let numOfRows = props.tileNum;
  useEffect(() => {
    do {
      let arrayOfTiles = [];
      for (let i = 1; i <= props.tileNum; i++) {
        arrayOfTiles.push({
          isAlive: false,
          index: i
        });
      }
      setGrid(state => [...state, arrayOfTiles])
      numOfRows --
    } while (numOfRows > 0);
  }, [props.tileNum])

  const tiles = Object.values(grid).map(function(row, index) {
    row.map(function(tileNumber, i) {
      return (
        <Tile 
          key={i.toString() + index.toString()}

        />
      )
    })
  })
  setTimeout(function(){ console.log("Hello", grid); }, 2000);
  return (
    <ul>
      {tiles}
    </ul>
  )
}