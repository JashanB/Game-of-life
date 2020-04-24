import React, { useEffect, useState } from 'react'
import './Grid.css'
import TileColumn from '../tilecolumn'
import { connect } from 'react-redux';

export default function Grid(props) {
  // const [grid, setGrid] = useState({});

  // useEffect(() => {
  //   let obj = {};
  //   for (let i = 0; i < props.tileNum; i++) {
  //     obj[i] = [];
  //     for (let z = 0; z < props.tileNum; z++) {
  //       obj[i].push({
  //         isAlive: false,
  //         index: z
  //       })
  //     }
  //   }
  //   setGrid(state => (obj))
  // }, [props.tileNum])
  console.log('grid props', props)
  useEffect(() => {
    let obj = {};
    for (let i = 0; i < props.state.tileNum; i++) {
      obj[i] = [];
      for (let z = 0; z < props.state.tileNum; z++) {
        obj[i].push({
          isAlive: false,
          index: z
        })
      }
    }
    props.dispatch({type: "SETGRID", grid: obj})
  }, [props.state.tileNum])

  const setAlive = (column, index) => {
    let columnArray = props.state.grid[column];
    if (columnArray[index].isAlive === false) {
      columnArray[index].isAlive = true;
      props.dispatch({type: "CHANGEGRID", column: {[column]: columnArray}})
      // setGrid(state => ({ ...state, [column]: columnArray }))
      if (props.aliveCount < (props.tileNum * props.tileNum)) {
        props.dispatch({type: "SETALIVE"})
        // props.setAliveCount(state => state += 1)
      }
    }
  }

  const setDead = (column, index) => {
    let columnArray = props.grid[column];
    if (columnArray[index].isAlive) {
      columnArray[index].isAlive = false;
      props.dispatch({type: "CHANGEGRID", column: {[column]: columnArray}})
      // setGrid(state => ({ ...state, [column]: columnArray }))
      if (props.aliveCount > 0) {
        props.dispatch({type: "SETDEAD"})
        // props.setAliveCount(state => state -= 1)
      }
    }
  }

  // const countBox = (column, row, bordering) => {
  //   let count = 0;
  //   for (let i = row - 1; i < row + 2; i++) {
  //     if (bordering === 8) {
  //       grid[column - 1][i].isAlive ? count += 1 : count += 0
  //       if (i !== row) {
  //         grid[column][i].isAlive ? count += 1 : count += 0
  //       }
  //       grid[column + 1][i].isAlive ? count += 1 : count += 0
  //     } else if (bordering <= 5) {
  //       if (grid[column - 1] && grid[column - 1][i] && grid[column - 1][i].isAlive) {
  //         count += 1;
  //       }
  //       if (i !== row) {
  //         if (grid[column][i] && grid[column][i].isAlive) {
  //           count += 1;
  //         }
  //       }
  //       if (grid[column + 1] && grid[column + 1][i] && grid[column + 1][i].isAlive) {
  //         count += 1;
  //       }
  //     }
  //   }
  //   return count;
  // };
  const countBox = (column, row, bordering) => {
    let count = 0;
    for (let i = row - 1; i < row + 2; i++) {
      if (bordering === 8) {
        props.state.grid[column - 1][i].isAlive ? count += 1 : count += 0
        if (i !== row) {
          props.state.grid[column][i].isAlive ? count += 1 : count += 0
        }
        props.state.grid[column + 1][i].isAlive ? count += 1 : count += 0
      } else if (bordering <= 5) {
        if (props.state.grid[column - 1] && props.state.grid[column - 1][i] && props.state.grid[column - 1][i].isAlive) {
          count += 1;
        }
        if (i !== row) {
          if (props.state.grid[column][i] && props.state.grid[column][i].isAlive) {
            count += 1;
          }
        }
        if (props.state.grid[column + 1] && props.state.grid[column + 1][i] && props.state.grid[column + 1][i].isAlive) {
          count += 1;
        }
      }
    }
    return count;
  }

  const rules = (timer, col, index, bordering, status) => {
    let numberAlive = countBox(col, index, bordering);
      if (numberAlive < 2 && numberAlive >= 0 && status === true) {
        setDead(col, index);
      }
      if (numberAlive >= 4 && numberAlive <= 8 && status === true) {
        setDead(col, index);
      }
      if (numberAlive === 3 && status === false) {
        setAlive(col, index);
      }
  }
  const tilecolumns = Object.values(props.grid).map(function (column, index) {
    return (
      <TileColumn
        key={index}
        column={index}
        tiles={column}
        // setGrid={setGrid}
        // grid={grid}
        square={props.tileNum}
        // setAlive={setAlive}
        // setDead={setDead}
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
// const mapStateToProps = (state) => ({
//   aliveCount: state.aliveCount,
//   timer: state.timer,
//   tileNum: state.tileNum,
//   ifStarted: state.ifStarted,
//   grid: state.grid
// })

// export default connect(mapStateToProps) (Grid)