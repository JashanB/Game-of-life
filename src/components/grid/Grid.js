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
      for (let i = 1; i <= props.tileNum; i++) {
        arrayOfTiles.push({
          isAlive: false,
          index: i
        });
      }
      setGrid(state => [...state, arrayOfTiles])
      numOfRows--
    } while (numOfRows > 0);
  }, [props.tileNum])

  // const tiles = grid.map(function(row, index) {
  //   console.log(row)
  //   return row.map(function(tile, i) {
  //     return (
  //       <Tile 
  //         key={i.toString() + index.toString()}
  //         row={index}
  //         index={i}
  //         setGrid={setGrid}
  //         grid={grid}
  //         status={tile.isAlive}
  //       />
  //     )
  //   })
  // })
  const tilecolumns = grid.map(function (row, index) {
    return (
      <div className="tile-row">
        <TileColumn
          key={index}
          row={index + 1}
          tiles={row}
          setGrid={setGrid}
          grid={grid}
          square={props.tileNum}
        />
      </div>
    )
  })
  console.log('tiles', tilecolumns)
  setTimeout(function () { console.log("Hello", grid); }, 2000);
  return (
    <ul className="grid-container">
      {/* <ul> */}
      {tilecolumns}
      {/* </ul> */}
    </ul>
  )
}