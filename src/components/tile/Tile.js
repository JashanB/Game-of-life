import React, { useEffect, useState } from 'react'
import './Tile.css'

export default function Tile (props) {
  let widthPercentage = 100/props.square;
  let className = "tile-button";
  if (props.status === true) {
    className += '-alive' 
  }
  return (
    <div className="tile" style={{width: widthPercentage}}>
      <button className={className} onClick={() => props.setAlive(props.column, props.index)}></button>
    </div>
  )
}