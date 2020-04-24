import React from 'react'
import './TileColumn.css'
import Tile from '../tile'

export default function TileColumn(props) {
  const tiles = props.tiles.map(function (tile, index) {
    return (
      <Tile
        key={index}
        row={index}
        column={props.column}
        status={tile.isAlive}
        max={props.max}
        ifStarted={props.ifStarted}
        timer={props.timer}
      />
    )
  })
  return (
    <div className="tile-column">
      {tiles}
    </div>
  )
}