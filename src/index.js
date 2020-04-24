import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { dispatch } from 'rxjs/internal/observable/range';
import { connect } from 'react-redux';

let obj = {};
for (let i = 0; i < 25; i++) {
  obj[i] = [];
  for (let z = 0; z <  25; z++) {
    obj[i].push({
      isAlive: false,
      index: z
    })
  }
}

const initialState = {
  tileNum: 25,
  timer: 3,
  aliveCount: 0,
  ifStarted: false,
  grid: obj
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case "PLUSTILE":
      return {
        ...state, tileNum: state.tileNum + 1
      };
    case "MINUSTILE":
      return {
        ...state, tileNum: state.tileNum - 1
      };
    case "PLUSTIME":
      return {
        ...state, timer: state.timer + 1
      };
    case "MINUSTIME":
      return {
        ...state, timer: state.timer - 1
      };
    case "SETALIVE":
      return {
        ...state, aliveCount: state.aliveCount + 1
      };
    case "SETDEAD":
      return {
        ...state, aliveCount: state.aliveCount - 1
      };
    case "START":
      return {
        ...state, ifStarted: true
      };
    case "STOP":
      return {
        ...state, ifStarted: false
      };
    case "CHANGEGRID":
      return {
        ...state, grid: {...state.grid, ...action.column}
      }
    case "SETGRID":
      return {
        ...state, grid: action.grid
      }
  }
}
const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
