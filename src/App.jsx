import React, { useState, useEffect } from "react";
import "./App.css"; // Include a CSS file for custom styling

const App = () => {
  const [inputRows, setInputRows] = useState(15);
  const [inputCols, setInputCols] = useState(20);

  const [rows, setRows] = useState(15);
  const [cols, setCols] = useState(20);

  const [grid, setGrid] = useState(
    Array(15 * 20).fill({ backgroundColor: "black", borderColor: "gray" })
  );
  const [currentColumn, setCurrentColumn] = useState(0);
  const [direction, setDirection] = useState(1);
  const [score, setScore] = useState(0);
  const [collisionCount, setCollisionCount] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const colors = ["rgb(0, 255, 0)", "rgb(0, 0, 255)", "rgb(255, 0, 0)", "rgb(255, 255, 0)"];
  const brightnessFactors = [0.2, 0.3, 0.4, 0.7, 0.8, 3.0];

  const calculateWaveColor = (distance, baseColor, brightnessFactor) => {
    const [r, g, b] = baseColor.match(/\d+/g).map(Number);
    return `rgb(${Math.floor(r * brightnessFactor)}, ${Math.floor(g * brightnessFactor)}, ${Math.floor(b * brightnessFactor)})`;
  };

  const updateWave = () => {
    const baseColor = colors[colorIndex];
    const newGrid = grid.map((cell, index) => {
      const col = index % cols;
      const isInWave =
        direction === 1
          ? col >= currentColumn && col < currentColumn + 6
          : col <= currentColumn && col > currentColumn - 6;

      if (isInWave) {
        const distance = Math.abs(col - currentColumn);
        const brightnessFactor = brightnessFactors[distance] || 1;
        return {
          backgroundColor: calculateWaveColor(distance, baseColor, brightnessFactor),
          borderColor: "black",
        };
      }
      return { backgroundColor: "black", borderColor: "gray" };
    });

    setGrid(newGrid);
    setCurrentColumn((prev) => prev + direction);

    if (direction === 1 && currentColumn >= cols - 2) {
      handleCollision();
      setDirection(-1);
    } else if (direction === -1 && currentColumn < 2) {
      handleCollision();
      setDirection(1);
    }
  };

  const handleCollision = () => {
    setCollisionCount((prev) => prev + 1);
    if (collisionCount >= 1) {
      setCollisionCount(0);
      setColorIndex((prev) => (prev + 1) % colors.length);
      setScore((prev) => prev + 1);
    }
  };

  const startGame = () => {
    setRows(inputRows);
    setCols(inputCols);
    setGrid(
      Array(inputRows * inputCols).fill({ backgroundColor: "black", borderColor: "gray" })
    );
    setIsRunning(true);
    setScore(0);
    setCollisionCount(0);
    setCurrentColumn(0);
    setDirection(1);
  };

  const resetGame = () => {
    setIsRunning(false);
    setGrid(Array(rows * cols).fill({ backgroundColor: "black", borderColor: "gray" }));
    setScore(0);
    setCollisionCount(0);
    setCurrentColumn(0);
    setDirection(1);
  };

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(updateWave, 150);
      return () => clearInterval(interval);
    }
  }, [isRunning, currentColumn, direction, grid]);

  return (
    <div className="app-container">
      <div className="title">Wave Grid Game</div>
      <div className="score">Wave Count: {score}</div>

      <div
        className="grid-container"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 20px)`,
          justifyContent: "center",
        }}
      >
        {grid.map((cell, index) => (
          <div
            key={index}
            className="grid-item"
            style={{
              backgroundColor: cell.backgroundColor,
              borderColor: cell.borderColor,
              width: "20px",
              height: "20px",
              transition: "background-color 0.1s ease",
            }}
          ></div>
        ))}
      </div>

      <div className="controls">
        <div className="input-container">
          <label>
            Rows:
            <input
              type="number"
              value={inputRows}
              onChange={(e) => setInputRows(Number(e.target.value))}
              min="5"
              max="50"
            />
          </label>
          <label>
            Columns:
            <input
              type="number"
              value={inputCols}
              onChange={(e) => setInputCols(Number(e.target.value))}
              min="5"
              max="50"
            />
          </label>
        </div>
        <div className="button-container">
          <button className="start-button" onClick={startGame}>Start Wave</button>
          <button className="reset-button" onClick={resetGame}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default App;
