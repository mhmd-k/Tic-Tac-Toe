import React from "react";

export default function History(Props) {
  const moves = Props.moves.map((e, i) => {
    return (
      <li key={i}>
        <button id="move" onClick={() => Props.onPlay(e, i)}>
          go to move #{i + 1}
        </button>
      </li>
    );
  });
  return <ul>{moves}</ul>;
}
