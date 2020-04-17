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
            if (item.isAlive === false) {
              props.setAliveCount(state => state += 1)
              return {isAlive: true, index: j}
            } else {
              return item
            }
          } else {
            return item;
          }
        })
      } else {
        return col;
      }
    })
    console.log('set alive', column, index)
    setGrid(state => newGrid);
  }

  const setDead = (column, index) => {
    const newGrid = grid.map(function(col, i) {
      if (column === i) {
         return col.map(function(item, j) {
          if (j === index) {
            if (item.isAlive) {
              props.setAliveCount(state => state -= 1)
              return {isAlive: false, index: j}
            } else {
              return item
            }
          } else {
            return item;
          }
        })
      } else {
        return col;
      }
    })
    console.log('set dead', column, index)
    setGrid(state => newGrid);
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
        if (grid[column +1] && grid[column + 1][i] && grid[column + 1][i].isAlive) {
          count += 1;
        }
      }
    }
    return count;
  }

  const tilecolumns = grid.map(function (row, index) {
    return (
        <TileColumn
          key={index}
          column={index}
          tiles={row}
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