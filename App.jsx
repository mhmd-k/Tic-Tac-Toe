import React from "react";
import "./App.css";
import History from "./components/history";
import Square from "./components/square";

function App() {
  const [squares, setSquares] = React.useState(generateSquares);
  const [history, setHistory] = React.useState([]);
  const [winner, setWinner] = React.useState(null);
  const [turn, setTurn] = React.useState("X");

  function checkWinner(arr) {
    if (
      arr[0].value !== null &&
      arr[0].value === arr[1].value &&
      arr[0].value === arr[2].value
    ) {
      setWinner(arr[0].value);
      for (let i = 0; i < arr.length; i++) {
        setSquares((prevSquares) =>
          prevSquares.map((e) => {
            return e.id === arr[i].id
              ? { ...e, clickabilty: false, winBg: true }
              : { ...e, clickabilty: false };
          })
        );
      }
    }
  }

  React.useEffect(() => {
    if (winner !== null) return;
    checkWinner([squares[0], squares[1], squares[2]]);
    checkWinner([squares[3], squares[4], squares[5]]);
    checkWinner([squares[0], squares[3], squares[6]]);
    checkWinner([squares[6], squares[7], squares[8]]);
    checkWinner([squares[1], squares[4], squares[7]]);
    checkWinner([squares[2], squares[5], squares[8]]);
    checkWinner([squares[0], squares[4], squares[8]]);
    checkWinner([squares[2], squares[4], squares[6]]);
  }, [squares, winner]);

  function generateSquares() {
    let arr = [];
    for (let i = 1; i <= 9; i++) {
      let square = {
        id: i,
        value: null,
        clickabilty: true,
        winBg: false,
      };
      arr.push(square);
    }
    return arr;
  }

  function draw() {
    let c = 0;
    squares.forEach((e) => {
      if (!e.clickabilty) c++;
    });
    return c;
  }

  function win() {
    if (draw() === 9 && winner === null) return "Draw";
    else {
      return winner !== null ? `${winner} wins` : `${turn} turn`;
    }
  }

  function handleClick(id, clickabilty) {
    if (!clickabilty) return;
    setSquares((prevSquares) => {
      return prevSquares.map((square) =>
        square.id === id
          ? { ...square, value: turn, clickabilty: false }
          : square
      );
    });
    setTurn((prevTurn) => (prevTurn === "X" ? "O" : "X"));
    setHistory((prevHistory) => {
      return [...prevHistory, squares];
    });
  }

  function restart() {
    setSquares(generateSquares);
    setWinner(null);
    setTurn("X");
    setHistory([]);
  }

  function goBack(move, index) {
    setSquares(move);
    setHistory((prevHistory) => {
      const h = prevHistory;
      h.length = index;
      return h;
    });
    setWinner(null);
  }

  const s = squares.map((e) => {
    return (
      <Square
        key={e.id}
        value={e.value}
        click={() => handleClick(e.id, e.clickabilty)}
        clickabilty={e.clickabilty}
        winBg={e.winBg}
      />
    );
  });

  return (
    <div className="container">
      <h2 style={{ color: winner !== null ? "#e91e63" : "white" }}>{win()}</h2>
      <div className="board">{s}</div>
      <button id="restart" onClick={restart}>
        Restart
      </button>
      <History moves={history} onPlay={goBack} />
    </div>
  );
}

export default App;
