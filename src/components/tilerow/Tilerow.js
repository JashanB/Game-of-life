import React, { useEffect, useState } from 'react'
import './Tilerow.css'
import Tile from '../tile'

export default function Tilerow (props) {
  const tiles = props.tiles.map(function(tile, index) {
    return (
            <Tile 
              key={index}
              row={props.row}
              setGrid={props.setGrid}
              grid={props.grid}
              status={tile.isAlive}
            />
          )
  })
  return (
    <> 
    {tiles}
    </>
  )
}