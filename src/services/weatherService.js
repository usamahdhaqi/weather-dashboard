// Base URL Open-Meteo
const BASE = "https://api.open-meteo.com/v1/forecast";
const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";

// Ambil prakiraan cuaca berdasarkan koordinat
export async function fetchForecastByCoords(lat, lon) {
  try {
    const url = `${BASE}?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&timezone=auto`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch forecast: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();

    // Normalisasi format supaya mirip OpenWeatherMap
    return {
      current: {
        temp: data.current_weather.temperature,
        description: `Code ${data.current_weather.weathercode}`,
      },
      daily: data.daily.time.map((t, i) => ({
        time: t,
        temp_max: data.daily.temperature_2m_max[i],
        temp_min: data.daily.temperature_2m_min[i],
        precipitation: data.daily.precipitation_sum[i],
        weathercode: data.daily.weathercode[i],
      }))
    };
  } catch (err) {
    console.error("Error fetching forecast:", err);
    throw err;
  }
}

// Geocoding untuk dapatkan koordinat dari nama kota
export async function geocodeCity(city) {
  try {
    const url = `${GEO_URL}?name=${encodeURIComponent(city)}&count=1`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to geocode: ${res.status} ${res.statusText}`);
    }
    const results = await res.json();
    if (!results.results || !results.results.length) {
      throw new Error("Location not found");
    }
    const r = results.results[0];
    return { lat: r.latitude, lon: r.longitude, name: r.name, country: r.country };
  } catch (err) {
    console.error("Error geocoding city:", err);
    throw err;
  }
}
