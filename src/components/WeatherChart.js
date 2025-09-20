import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function WeatherChart({ daily }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!daily) return;
    const ctx = canvasRef.current.getContext("2d");
    const labels = daily.map(d => new Date(d.time).toLocaleDateString(undefined, { weekday: "short" }));
    const tempsMax = daily.map(d => d.temp_max);
    const tempsMin = daily.map(d => d.temp_min);
    const precip = daily.map(d => d.precipitation);

    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Max (°C)",
            data: tempsMax,
            tension: 0.3,
            yAxisID: 'y',
          },
          {
            label: "Min (°C)",
            data: tempsMin,
            tension: 0.3,
            yAxisID: 'y',
          },
          {
            label: "Precip (mm)",
            data: precip,
            type: "bar",
            yAxisID: 'y2',
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          y: {
            type: 'linear',
            position: 'left',
            title: { display: true, text: 'Temperature (°C)' }
          },
          y2: {
            type: 'linear',
            position: 'right',
            grid: { drawOnChartArea: false },
            title: { display: true, text: 'Precipitation (mm)' }
          }
        },
        plugins: { legend: { position: 'top' } }
      }
    });

    return () => chart.destroy();
  }, [daily]);

  return <div className="chart-wrap"><canvas ref={canvasRef}></canvas></div>;
}
