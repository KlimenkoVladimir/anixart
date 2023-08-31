import React, { useContext } from "react";
import { AuthContext } from "../context/context";

const DiskChart = ({ num }) => {
  const { statusLabels, color } = useContext(AuthContext);

  // Вычисляем общее количество для расчета процентов
  const total = num.reduce((sum, count) => sum + count, 0);

  // Рассчитываем проценты для каждого сектора
  const percentages = num.map(count => (count / total) * 100);

  // Вычисляем начальный и конечный угол для каждого сектора
  let startAngle = -90;
  const sectorData = percentages.map(percent => {
    const endAngle = startAngle + (360 * percent) / 100;
    const data = {
      startAngle,
      endAngle
    };
    startAngle = endAngle;
    return data;
  });

  console.log(sectorData);

  return (
    <div className="disk-chart">
      <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 16 16">
        {sectorData.map((data, index) => (
          <path
            key={index}
            d={describeArc(8, 8, 7, data.startAngle, data.endAngle)}
            fill="transparent"
            stroke={color[index]}
            strokeWidth="2"
          />
        ))}
      </svg>
    </div>
  );
};

// Функция для создания дуги сектора
function describeArc(x, y, radius, startAngle, endAngle) {
  var start = polarToCartesian(x, y, radius, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);
  var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
  var d = [
    "M", start.x, start.y,
    "A", radius, radius, 0, arcSweep, 0, end.x, end.y
  ].join(" ");
  return d;
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

export default DiskChart;

