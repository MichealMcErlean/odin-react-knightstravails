import { useState } from 'react';
import {Node, knightsTravails} from './scripts/knightsTravails';
import './App.css';
import ChessBoard from './components/ChessBoard';

function App() {
  const [board, setBoard] = useState(
    Array(8).fill(null).map(() => Array(8).fill('.'))
  );

  const [placingKnight, setPlacingKnight] = useState(false);
  const [placingEnd, setPlacingEnd] = useState(false);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  function handleClick(event) {
    
    const cellKey = event.currentTarget.getAttribute('data-cell');
    let coords = cellKey.split('-');
    let row = coords[0];
    let col = coords[1];

    let newBoard = Array(8).fill(null).map(() => Array(8).fill('.'));

    if (placingKnight) {
      newBoard[row][col] = '\u2658';
      setStart([Number(row), Number(col)]);
      if (end) {
        newBoard[end[0]][end[1]] = 'X';
      }
      setPlacingKnight(false);
      setBoard(newBoard);   
    } else if (placingEnd) {
      newBoard[row][col] = 'X';
      setEnd([Number(row), Number(col)]);
      if (start) {
        newBoard[start[0]][start[1]] = '\u2658';
      }
      setPlacingEnd(false);
      setBoard(newBoard)
    }
  }

  function handleStartPlacing() {
    setPlacingKnight(true);
    setPlacingEnd(false);
  }

  function handleStartPlacingEnd() {
    setPlacingEnd(true);
    setPlacingKnight(false);
  }

  function handleEmbark() {
    if (!(start && end)) {
      alert('Place the knight and choose a destination first!');
      return;
    }
    let path = knightsTravails(start, end);
    let newBoard = Array(8).fill(null).map(() => Array(8).fill('.'));
    path.map((cell, index) => {
      if (index + 1 == path.length ) {
        newBoard[cell[0]][cell[1]] = '\u2658';
      } else {
        newBoard[cell[0]][cell[1]] = index;
      }
    });
    setBoard(newBoard);
  }

  function handleReset() {
    setStart(null);
    setEnd(null);
    setBoard(Array(8).fill(null).map(() => Array(8).fill('.')));
  }

  return (
    <main>
      <header>
        <h1>Knight's Travails</h1>
        <h2>An Odin Project exercise</h2>
        <h3>Powered by React</h3>
      </header>
      <article>
        <ChessBoard 
          board={board}
          onClick={handleClick}
        />
        <div className="buttonbox">
          <button 
            type="button"
            onClick={handleStartPlacing}
          >
            Place Your Knight
          </button>
          <button 
            type="button"
            onClick={handleStartPlacingEnd}
          >
            Choose Your Destination
          </button>
          <button 
            type='button'
            onClick={handleEmbark}
          >
            Embark!
          </button>
          <button 
            type="button"
            onClick={handleReset}
          >
            Reset Board
          </button>
        </div>
      </article>
      <footer>
        &copy; Micheal McErlean 2025.
      </footer>
    </main>
  )
}

export default App
