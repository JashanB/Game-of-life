import React, { useEffect, useState } from 'react'
import './App.css';
import Grid from '../grid';

//set tile count to state (10 - then multiply by itself to form square)
//set timer 

function App() {
  const [tileNum, setTileNum] = useState(10);
  const [timer, setTimer] = useState(2);
  return (
    <div className="App">
      <Grid
        tileNum={tileNum}
        setTileNum={setTileNum}
      />
      {/* <Timer
        timer={timer}
        setTimer={setTimer}
      /> */}
    </div>
  );
}

export default App;
