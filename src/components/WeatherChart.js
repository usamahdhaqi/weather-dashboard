import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function WeatherChart({ daily }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!daily) return;
    const ctx = canvasRef.current.getContext("2d");

    // Gradient background untuk chart area
    const gradientBg = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
    gradientBg.addColorStop(0, "rgba(255, 165, 171, 0.3)"); // #ffa5ab
    gradientBg.addColorStop(1, "rgba(249, 219, 189, 0.3)"); // #f9dbbd

    // Gradient fill untuk garis Max (pink rose → transparan)
    const gradientMax = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
    gradientMax.addColorStop(0, "rgba(218, 98, 125, 0.4)"); // #da627d
    gradientMax.addColorStop(1, "rgba(218, 98, 125, 0)");

    // Gradient fill untuk garis Min (ungu kemerahan → transparan)
    const gradientMin = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
    gradientMin.addColorStop(0, "rgba(165, 56, 96, 0.4)"); // #a53860
    gradientMin.addColorStop(1, "rgba(165, 56, 96, 0)");

    const labels = daily.map(d =>
      new Date(d.time).toLocaleDateString(undefined, { weekday: "short" })
    );
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
            borderColor: "#da627d",
            backgroundColor: gradientMax, // gunakan gradient fill
            fill: true, // aktifkan fill
            yAxisID: "y",
          },
          {
            label: "Min (°C)",
            data: tempsMin,
            tension: 0.3,
            borderColor: "#a53860",
            backgroundColor: gradientMin, // gunakan gradient fill
            fill: true, // aktifkan fill
            yAxisID: "y",
          },
          {
            label: "Precip (mm)",
            data: precip,
            type: "bar",
            yAxisID: "y2",
            backgroundColor: "rgba(69, 9, 32, 0.7)", // lebih gelap
            borderRadius: 4,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          y: {
            type: "linear",
            position: "left",
            title: { display: true, text: "Temperature (°C)", color: "#450920" },
            ticks: { color: "#450920" },
            grid: { color: "rgba(69, 9, 32, 0.2)" },
          },
          y2: {
            type: "linear",
            position: "right",
            grid: { drawOnChartArea: false, color: "rgba(69, 9, 32, 0.2)" },
            title: { display: true, text: "Precipitation (mm)", color: "#450920" },
            ticks: { color: "#450920" },
          },
          x: {
            ticks: { color: "#450920" },
            grid: { color: "rgba(69, 9, 32, 0.2)" },
          },
        },
        plugins: {
          legend: {
            position: "top",
            labels: { color: "#450920" },
          },
        },
      },
      plugins: [
        {
          id: "customBackground",
          beforeDraw: (chart) => {
            const { ctx, chartArea } = chart;
            if (!chartArea) return;
            ctx.save();
            ctx.fillStyle = gradientBg;
            ctx.fillRect(
              chartArea.left,
              chartArea.top,
              chartArea.right - chartArea.left,
              chartArea.bottom - chartArea.top
            );
            ctx.restore();
          },
        },
      ],
    });

    return () => chart.destroy();
  }, [daily]);

  return (
    <div className="chart-wrap">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
