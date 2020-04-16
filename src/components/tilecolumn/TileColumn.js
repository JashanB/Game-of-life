import React, { useEffect, useState } from 'react'
import './TileColumn.css'
import Tile from '../tile'

export default function TileColumn(props) {

  // const setAlive = (column, index) => {
  //   const newGrid = props.grid.map(function(col, i) {
  //     if (column === i) {
  //        return col.map(function(item, j) {
  //         if (j === index) {
  //           return {isAlive: true, index: j}
  //         } else {
  //           return item
  //         }
  //       })
  //     } else {
  //       return col;
  //     }
  //   })
  //   props.setGrid(state => newGrid);
  // }
  const tiles = props.tiles.map(function (tile, index) {
    return (
      <Tile
        key={index}
        index={index}
        column={props.column}
        setGrid={props.setGrid}
        grid={props.grid}
        status={tile.isAlive}
        square={props.square}
        setAlive={props.setAlive}
      />
    )
  })
  return (
    <>
      {tiles}
    </>
  )
}