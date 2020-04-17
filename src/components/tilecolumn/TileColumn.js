import React, { useEffect, useState } from 'react'
import './TileColumn.css'
import Tile from '../tile'

export default function TileColumn(props) {
  const tiles = props.tiles.map(function (tile, index) {
    return (
      <Tile
        key={index}
        row={index}
        column={props.column}
        setGrid={props.setGrid}
        grid={props.grid}
        status={tile.isAlive}
        square={props.square}
        setAlive={props.setAlive}
        setDead={props.setDead}
        max={props.max}
        ifStarted={props.ifStarted}
        countBox={props.countBox}
      />
    )
  })
  return (
    <div className="tile-column">
      {tiles}
    </div>
  )
}