import React, { useEffect, useState } from 'react'
import './TileColumn.css'
import Tile from '../tile'

export default function TileColumn(props) {
  const tiles = props.tiles.map(function (tile, index) {
    return (
      <Tile
        key={index}
        index={index}
        row={props.row}
        setGrid={props.setGrid}
        grid={props.grid}
        status={tile.isAlive}
        square={props.square}
      />
    )
  })
  return (
    <>
      {tiles}
    </>
  )
}