import React, { useEffect, useState } from 'react'
import Tile from '../tile'

export default function Grid (props) {
  //grid i want to return Tile rows based on number passed down 
  //will require n^2 loop
  const [grid, setGrid] = useState();
  let numOfRows = props.tileNum;
  do {
    let arrayOfTiles = [];
    setGrid(state => ({numOfRows = []}))
    for (let i = 0; i <= props.tileNum; i++) {
      arrayOfTiles.push()
    }
  } while (numOfRows > 0);
  const tiles = grid.map(function(row, index) {
    row.map(function(tile, i) {
      return (
        <Tile 
          key={i.toString() + index.toString()}

        />
      )
    })
  })
  return (
    <ul>
      {tiles}
    </ul>
  )
}