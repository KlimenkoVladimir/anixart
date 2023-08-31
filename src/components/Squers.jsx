import React, { useContext, useEffect, useState } from "react";
import { AuthContext, OptionContext } from "../context/context";

const Squers = ({ width, padding, num }) => {

    const { statusLabels, color } = useContext(AuthContext)

    const squareStyles = {
        width: width,
        padding: padding,
        // ... Другие стили ...
    };


    return (
        <div className="squers">
            {statusLabels.map((label, index) => (
                <div className="squer" style={squareStyles} key={index}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={color[index]} class="bi bi-square-fill" viewBox="0 0 16 16">
                        <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
                    </svg>
                    <h5>{`${label}\u00A0`} </h5>
                    <h5>{num[index]}</h5>
                </div>
            ))}
        </div>
    );
};

export default Squers;