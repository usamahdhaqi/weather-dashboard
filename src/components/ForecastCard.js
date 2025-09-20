// Mapping lengkap weathercode Open-Meteo ke ikon Bas Milius (folder public/icons)
const weatherIconMap = {
  0: { desc: "Clear sky", icon: "/icons/day_clear.svg" },
  1: { desc: "Mainly clear", icon: "/icons/day_clear.svg" },
  2: { desc: "Partly cloudy", icon: "/icons/day_partial_cloud.svg" },
  3: { desc: "Overcast", icon: "/icons/cloudy.svg" },

  45: { desc: "Fog", icon: "/icons/fog.svg" },
  48: { desc: "Rime fog", icon: "/icons/fog.svg" },

  51: { desc: "Light drizzle", icon: "/icons/day_rain_light.svg" },
  53: { desc: "Moderate drizzle", icon: "/icons/day_rain_light.svg" },
  55: { desc: "Dense drizzle", icon: "/icons/day_rain.svg" },

  56: { desc: "Light freezing drizzle", icon: "/icons/day_rain_mix.svg" },
  57: { desc: "Dense freezing drizzle", icon: "/icons/day_rain_mix.svg" },

  61: { desc: "Slight rain", icon: "/icons/day_rain_light.svg" },
  63: { desc: "Moderate rain", icon: "/icons/day_rain.svg" },
  65: { desc: "Heavy rain", icon: "/icons/day_rain.svg" },

  66: { desc: "Light freezing rain", icon: "/icons/day_rain_mix.svg" },
  67: { desc: "Heavy freezing rain", icon: "/icons/day_rain_mix.svg" },

  71: { desc: "Slight snow fall", icon: "/icons/day_snow.svg" },
  73: { desc: "Moderate snow fall", icon: "/icons/day_snow.svg" },
  75: { desc: "Heavy snow fall", icon: "/icons/day_snow.svg" },
  77: { desc: "Snow grains", icon: "/icons/day_snow.svg" },

  80: { desc: "Slight rain showers", icon: "/icons/day_rain_light.svg" },
  81: { desc: "Moderate rain showers", icon: "/icons/day_rain.svg" },
  82: { desc: "Violent rain showers", icon: "/icons/day_rain.svg" },

  85: { desc: "Slight snow showers", icon: "/icons/day_snow.svg" },
  86: { desc: "Heavy snow showers", icon: "/icons/day_snow_thunderstorm.svg" },

  95: { desc: "Thunderstorm", icon: "/icons/day_thunderstorm.svg" },
  96: { desc: "Thunderstorm with hail", icon: "/icons/day_thunderstorm.svg" },
  99: { desc: "Thunderstorm with hail", icon: "/icons/day_thunderstorm.svg" },
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
