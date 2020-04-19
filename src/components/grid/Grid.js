import React, { useEffect, useState } from 'react'
import './Grid.css'
import TileColumn from '../tilecolumn'

export default function Grid(props) {
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

  const setAlive = (column, index) => {
    let columnArray = grid[column];
    if (columnArray[index].isAlive === false) {
      columnArray[index].isAlive = true;
      setGrid(state => ({ ...state, [column]: columnArray }))
      if (props.aliveCount < (props.tileNum * props.tileNum)) {
        props.setAliveCount(state => state += 1)
      }
    }
  }

  const setDead = (column, index) => {
    let columnArray = grid[column];
    if (columnArray[index].isAlive) {
      columnArray[index].isAlive = false;
      setGrid(state => ({ ...state, [column]: columnArray }))
      if (props.aliveCount > 0) {
        props.setAliveCount(state => state -= 1)
      }
    }
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

  const rules = (timer, col, index, bordering, status) => {
    let numberAlive = countBox(col, index, bordering);
    setInterval(function () {
      if (numberAlive < 2 && numberAlive >= 0 && status === true) {
        setDead(col, index);
      }
      if (numberAlive >= 4 && numberAlive <= 8 && status === true) {
        setDead(col, index);
      }
      if (numberAlive === 3 && status === false) {
        setAlive(col, index);
      }
    }, timer)
  }

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
        rules={rules}
        timer={props.timer}
      />
    )
  })
  return (
    <ul className="grid-container">
      {tilecolumns}
    </ul>
  )
}