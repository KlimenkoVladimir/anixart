import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../../context/context";
import classes from "./Squares.module.css";

const Squares = ({ width, padding, num, extraClasses }) => {
  // const { statusLabels, color } = useContext(AuthContext);

  const statusLabels = [
    "Смотрю",
    "В планах",
    "Просмотрено",
    "Отложено",
    "Брошено",
  ];
  const color = ["#e74c3c", "#f39c12", "#3498db", "#27ae60", "#9b59b6"];

  const squares = [classes.squares];

  if (extraClasses) {
    squares.push(classes.squaresProfile);
  }
  return (
    <div className={squares.join(" ")}>
      {statusLabels.map((label, index) => (
        <div className={classes.squareId} key={index}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill={color[index]}
            className={classes.biSquareFill}
            viewBox="0 0 16 16"
          >
            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
          </svg>
          <h5>{`${label}\u00A0`} </h5>
          <h5>{num[index]}</h5>
        </div>
      ))}
    </div>
  );
};

export default Squares;
