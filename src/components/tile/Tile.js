import React, { useEffect, useState } from 'react'
import './Tile.css'

export default function Tile (props) {
  return (
    <div className="tile">
      <h2>{props.row}</h2>
    </div>
  )
}