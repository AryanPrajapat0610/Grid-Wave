import React from "react";

const Grid = ({ grid }) => {
  return (
    <div className="grid-container">
      {grid.map((cell, index) => (
        <div
          key={index}
          className="grid-item"
          style={{
            backgroundColor: cell.backgroundColor,
            borderColor: cell.borderColor,
          }}
        ></div>
      ))}
    </div>
  );
};

export default Grid;
