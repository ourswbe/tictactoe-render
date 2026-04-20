import { useState } from 'react';
import './App.css';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (i) => {
  if (board[i] || calculateWinner(board)) return;
  const newBoard = board.slice();
  newBoard[i] = isXNext ? 'X' : 'O';
  setBoard(newBoard);
  setIsXNext(!isXNext);

  // Проверяем победителя после хода
  const winner = calculateWinner(newBoard);
  if (winner) {
    saveResult(winner); // сохраняем "X" или "O"
  } else if (newBoard.every(cell => cell !== null)) {
    saveResult("draw"); // сохраняем ничью
  }
};

  const winner = calculateWinner(board);
  const status = winner ? `Победитель: ${winner}` : `Следующий ход: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className="game">
      <h1>Крестики-Нолики</h1>
      <div className="status">{status}</div>
      <div className="board">
        {board.map((cell, i) => (
          <button key={i} onClick={() => handleClick(i)}>{cell}</button>
        ))}
      </div>
      <button onClick={() => setBoard(Array(9).fill(null))}>Начать заново</button>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
  }
  return null;
}

export default App;

const saveResult = async (result) => {
  await fetch("http://localhost:5000/save-result", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ result }),
  });
};

