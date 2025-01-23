import React from "react";

const Controls = ({ startGame, resetGame }) => {
  return (
    <div className="controls">
      <button onClick={startGame}>Start Wave</button>
      <button onClick={resetGame}>Reset </button>
    </div>
  );
};

export default Controls;
