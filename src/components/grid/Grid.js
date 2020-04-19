import React, { useEffect, useState } from 'react'
import Tile from '../tile';
import './Grid.css'
import TileColumn from '../tilecolumn'

export default function Grid(props) {
  //each tile -> have function to set alive on click
  //each tile should also have ability to change the grid
  //set to alive function here that changes grid state 
  // const [grid, setGrid] = useState([]);
  const [grid, setGrid] = useState({});

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
    setGrid(state => (obj))
  }, [props.tileNum])

  setTimeout(function () { console.log('grid', grid) }, 2000)
  const setAlive = (column, index) => {
    let columnArray = grid[column];
    console.log('set alive', columnArray)
    columnArray[index].isAlive = true;
    setGrid(state => ({...state, [column]: columnArray}))
    props.setAliveCount(state => state += 1)
  }

  const setDead = (column, index) => {
    let columnArray = grid[column];
    console.log('set dead', columnArray)
    columnArray[index].isAlive = false;
    setGrid(state => ({...state, [column]: columnArray}))
    props.setAliveCount(state => state -= 1)
  }

  const countBox = (column, row, bordering) => {
    let count = 0;
    for (let i = row - 1; i < row + 2; i++) {
      if (bordering === 8) {
        grid[column - 1][i].isAlive ? count += 1 : count += 0
        if (i !== row) {
          grid[column][i].isAlive ? count += 1 : count += 0
        }
        grid[column + 1][i].isAlive ? count += 1 : count += 0
      } else if (bordering <= 5) {
        if (grid[column - 1] && grid[column - 1][i] && grid[column - 1][i].isAlive) {
          count += 1;
        }
        if (i !== row) {
          if (grid[column][i] && grid[column][i].isAlive) {
            count += 1;
          }
        }
        if (grid[column + 1] && grid[column + 1][i] && grid[column + 1][i].isAlive) {
          count += 1;
        }
      }
    }
    return count;
  }
  // setTimeout(function () { console.log(grid) }, 2000)
  const tilecolumns = Object.values(grid).map(function (column, index) {
    return (
      <TileColumn
        key={index}
        column={index}
        tiles={column}
        setGrid={setGrid}
        grid={grid}
        square={props.tileNum}
        setAlive={setAlive}
        setDead={setDead}
        max={props.tileNum - 1}
        ifStarted={props.ifStarted}
        countBox={countBox}
      />
    )
  })
  return (
    <ul className="grid-container">
      {tilecolumns}
    </ul>
  )
}