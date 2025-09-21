// Mapping lengkap weathercode Open-Meteo ke ikon Bas Milius (folder public/icons)
const weatherIconMap = {
  0: { desc: "Clear sky", icon: "/icons/clear-day.svg" },
  1: { desc: "Mainly clear", icon: "/icons/partly-cloudy-day.svg" },
  2: { desc: "Partly cloudy", icon: "/icons/cloudy.svg" },
  3: { desc: "Overcast", icon: "/icons/overcast.svg" },

  45: { desc: "Fog", icon: "/icons/fog.svg" },
  48: { desc: "Rime fog", icon: "/icons/fog.svg" },

  51: { desc: "Light drizzle", icon: "/icons/partly-cloudy-day-drizzle.svg" },
  53: { desc: "Moderate drizzle", icon: "/icons/drizzle.svg" },
  55: { desc: "Dense drizzle", icon: "/icons/overcast-drizzle.svg" },

  56: { desc: "Light freezing drizzle", icon: "/icons/sleet.svg" },
  57: { desc: "Dense freezing drizzle", icon: "/icons/overcast-sleet.svg" },

  61: { desc: "Slight rain", icon: "/icons/partly-cloudy-day-rain.svg" },
  63: { desc: "Moderate rain", icon: "/icons/rain.svg" },
  65: { desc: "Heavy rain", icon: "/icons/overcast-rain.svg" },

  66: { desc: "Light freezing rain", icon: "/icons/overcast-sleet.svg" },
  67: { desc: "Heavy freezing rain", icon: "/icons/sleet.svg" },

  71: { desc: "Slight snow fall", icon: "/icons/partly-cloudy-day-snow.svg" },
  73: { desc: "Moderate snow fall", icon: "/icons/snow.svg" },
  75: { desc: "Heavy snow fall", icon: "/icons/overcast-day-snow.svg" },
  77: { desc: "Snow grains", icon: "/icons/overcast-snow.svg" },

  80: { desc: "Slight rain showers", icon: "/icons/partly-cloudy-day-rain.svg" },
  81: { desc: "Moderate rain showers", icon: "/icons/rain.svg" },
  82: { desc: "Violent rain showers", icon: "/icons/overcast-rain.svg" },

  85: { desc: "Slight snow showers", icon: "/icons/snow.svg" },
  86: { desc: "Heavy snow showers", icon: "/icons/overcast-snow.svg" },

  95: { desc: "Thunderstorm", icon: "/icons/thunderstorms.svg" },
  96: { desc: "Thunderstorm with hail", icon: "/icons/thunderstorms.svg" },
  99: { desc: "Thunderstorm with hail", icon: "/icons/thunderstorms.svg" },
};

function getWeatherInfo(code) {
  return weatherIconMap[code] || { desc: "Unknown", icon: "/icons/na.svg" };
}

export default function ForecastCard({ day }) {
  const date = new Date(day.time);
  const dayLabel = date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const info = getWeatherInfo(day.weathercode);

  return (
    <div className="forecast-card">
      <div className="date">{dayLabel}</div>
      <img
        src={info.icon}
        alt={info.desc}
        style={{ width: "48px", height: "48px" }}
      />
      <div className="temps">
        <span className="max">{Math.round(day.temp_max)}°C</span>
        <span className="min">{Math.round(day.temp_min)}°C</span>
      </div>
      <div className="desc">{info.desc}</div>
      <div className="pop">Rain: {Math.round(day.precipitation)} mm</div>
    </div>
  );
}
