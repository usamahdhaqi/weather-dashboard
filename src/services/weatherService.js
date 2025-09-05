const BASE = "https://api.openweathermap.org/data/2.5";
const KEY = process.env.REACT_APP_OWM_KEY;

// Ambil prakiraan cuaca berdasarkan koordinat
export async function fetchForecastByCoords(lat, lon) {
  try {
    const url = `${BASE}/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${KEY}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch forecast: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    console.error("Error fetching forecast:", err);
    throw err;
  }
}

// Geocoding untuk dapatkan koordinat dari nama kota
export async function geocodeCity(city) {
  try {
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
      city
    )}&limit=1&appid=${KEY}`;
    const res = await fetch(geoUrl);
    if (!res.ok) {
      throw new Error(`Failed to geocode: ${res.status} ${res.statusText}`);
    }
    const results = await res.json();
    if (!results.length) {
      throw new Error("Location not found");
    }
    return results[0]; // { lat, lon, name, country }
  } catch (err) {
    console.error("Error geocoding city:", err);
    throw err;
  }
}
