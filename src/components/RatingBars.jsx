import React from "react";

const RatingBars = ({ statistic }) => {

    const oldScoreList = statistic.scores.map(el => el.votes)
    const scoreList = [];

    for (let i = 0; i < oldScoreList.length; i += 2) {
        const sum = oldScoreList[i] + (oldScoreList[i + 1] || 0);
        scoreList.push(sum);
    }

    console.log(scoreList);

    const total = scoreList.reduce((sum, value) => sum + value, 0);

    return (
        <div className="rating-bars">
            {scoreList.map((value, index) => (
                <div className="rating-bar" key={index}>
                    <h5>{index + 1}</h5>
                    <svg width="300" height="15">
                        <rect
                            x="0"
                            y="0"
                            width="100%"
                            height="15"
                            fill="#f0f0f0" // Light Gray
                            rx="7" // Горизонтальный радиус скругления
                            ry="7" // Вертикальный радиус скругления
                        />
                        {((value / total) * 100) >= 5 ? (
                            <rect
                                x="0"
                                y="0"
                                width={`${(value / total) * 100}%`}
                                height="15"
                                fill="#a9a9a9"
                                rx="7"
                                ry="7"
                            />
                        ) : null}
                    </svg>
                </div>
            ))}
        </div>
    );
};

export default RatingBars;

