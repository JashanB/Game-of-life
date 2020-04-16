import React, { useEffect, useState } from 'react'
import './Tile.css'

export default function Tile (props) {
  let widthPercentage = 100/props.square;
  return (
    <div className="tile" style={{width: widthPercentage}}>
      <h2>{props.row}</h2>
      <h5>{props.index}</h5>
    </div>
  )
}