import React, { useContext, useEffect, useState } from "react";
import { AuthContext, OptionContext } from "../context/context";
import Squers from "./Squers";
import DiskChart from "./DiskChart";

const Bar = ({ statistic }) => {
    const { statusLabels, color } = useContext(AuthContext)
    const statusValue = [statistic.watching, statistic.plan_to_watch, statistic.completed, statistic.on_hold, statistic.dropped]
    const statusTotal = statistic.total
    let currentX = 0;
    console.log(statusLabels, color)

    return (
        <div className="bar">
            <svg className="main-bar" width="600" height="20" rx="7" ry="7">
                {statusValue.map((value, index) => {
                    const currentWidth = (value / statusTotal) * 100
                    const rect = (
                        <rect
                            key={index}
                            x={`${currentX}%`}
                            y="0"
                            width={`${currentWidth}%`}
                            height="20"
                            fill={color[index]}
                        />
                    )
                    currentX += currentWidth
                    return rect
                })}
            </svg>
            <Squers padding={'15px'} num={[]}/>

        </div>
    );
};

export default Bar;
