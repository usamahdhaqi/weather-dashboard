import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import ForecastCard from "./components/ForecastCard";
import WeatherChart from "./components/WeatherChart";
import { fetchForecastByCoords, geocodeCity } from "./services/weatherService";

function App() {
  const [forecast, setForecast] = useState(null);
  const [cityLabel, setCityLabel] = useState("");
  const [theme, setTheme] = useState("dark");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
          setLoading(true);
          const data = await fetchForecastByCoords(
            pos.coords.latitude,
            pos.coords.longitude
          );
          setForecast(data);
          setCityLabel("Your Location");
        } catch (e) {
          setError(e.message);
        } finally {
          setLoading(false);
        }
      }, () => {});
    }
  }, []);

  async function handleSearch(q) {
    if (!q) return;
    try {
      setLoading(true);
      setError("");
      const geo = await geocodeCity(q);
      const data = await fetchForecastByCoords(geo.lat, geo.lon);
      setForecast(data);
      setCityLabel(`${geo.name}, ${geo.country}`);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleUseLocation() {
    if (!("geolocation" in navigator)) return setError("Geolocation not supported");
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        setLoading(true);
        const data = await fetchForecastByCoords(pos.coords.latitude, pos.coords.longitude);
        setForecast(data);
        setCityLabel("Your Location");
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }, (err) => setError(err.message || "Permission denied"));
  }

  return (
    <div className={`app ${theme}`}>
      <header className="topbar">
        <div className="brand">
          <h1>Weather Dashboard</h1>
          <p className="tag">Minimal • Cold • Modern</p>
        </div>

        <div className="controls">
          <SearchBar onSearch={handleSearch} onUseLocation={handleUseLocation} />
          <button
            className="theme-toggle"
            onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>
      </header>

      <main>
        {loading && <div className="loader">Loading…</div>}
        {error && <div className="error">{error}</div>}

        {forecast && (
          <>
            <section className="summary">
              <h2>{cityLabel}</h2>

              {/* Tambahan thermometer icon */}
              <img
                className="thermometer-icon"
                src={
                  forecast.current.temp >= 20
                    ? "/icons/thermometer-warmer.svg"
                    : "/icons/thermometer-colder.svg"
                }
                alt="Temperature indicator"
              />

              <div className="current">
                <div className="temp">{Math.round(forecast.current.temp)}°C</div>
                <div className="desc">{forecast.current.description}</div>
              </div>
            </section>

            <section className="chart-section">
              <WeatherChart daily={forecast.daily.slice(0, 7)} />
            </section>

            <section className="cards">
              {forecast.daily.slice(0, 7).map((d, i) => (
                <ForecastCard key={i} day={d} />
              ))}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
