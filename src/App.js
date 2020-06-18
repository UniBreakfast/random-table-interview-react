import React from 'react';
import Table from './components/table/Table'
import { genNumMatrix } from './numMatrix'
import './App.css';

const DEFAULT_ROWS = 5,  DEFAULT_COLS = 7,  DEFAULT_CLOSEST = 4

function App() {
  const numData = {
    ...genNumMatrix(DEFAULT_ROWS, DEFAULT_COLS),
    rows: {value: DEFAULT_ROWS},
    columns: {value: DEFAULT_COLS},
    closest: {value: DEFAULT_CLOSEST},
    litIDs: []
  }
  return (
    <div className="App">
      <Table numData={numData}/>
    </div>
  );
}

export default App;
