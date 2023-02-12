import React from "react";

export default function Square(Props) {
  let s = {
    pointerEvents: Props.clickabilty ? "visible" : "none",
    backgroundColor: Props.winBg ? "#e91e63" : "#343a46",
  };

  return (
    <button className="square" style={s} onClick={Props.click}>
      {Props.value}
    </button>
  );
}
