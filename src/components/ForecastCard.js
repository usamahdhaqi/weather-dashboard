export default function ForecastCard({ day }) {
  // day: object from One Call API daily[]
  const date = new Date(day.dt * 1000);
  const dayLabel = date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
  return (
    <div className="forecast-card">
      <div className="date">{dayLabel}</div>
      <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt={day.weather[0].description} />
      <div className="temps">
        <span className="max">{Math.round(day.temp.max)}°C</span>
        <span className="min">{Math.round(day.temp.min)}°C</span>
      </div>
      <div className="desc">{day.weather[0].main}</div>
      <div className="pop">Rain: {Math.round((day.pop||0)*100)}%</div>
    </div>
  );
}
