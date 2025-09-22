# Weather Dashboard 🌦️

A modern, minimal, and responsive **Weather Dashboard** built with React.  
This project fetches weather data using the **[Open-Meteo API](https://open-meteo.com/)** (free & no API key required) and displays it in a clean dashboard with charts and forecast cards.

---

## ✨ Features
- 🌍 Search any city or use **your current location**
- 📊 7-day forecast chart with **temperature & precipitation**
- 🎨 Dark/Light theme toggle
- 🖼️ Professional weather icons (**Bas Milius Weather Icons**)
- ⚡ Built with **React + Chart.js**

---

## 🚀 Tech Stack
- **React 18**
- **Chart.js** for data visualization
- **Open-Meteo API** (weather & geocoding)
- **Bas Milius Weather Icons** (MIT License, SVG based)

---

## 📂 Project Structure
```
/public
  /icons       → Weather icons (SVG, Bas Milius)
/src
  /components
    ForecastCard.js
    SearchBar.js
    WeatherChart.js
  /services
    weatherService.js
  App.js
  App.css
```

---

## ⚡ Installation & Setup
1. Clone this repo:
   ```bash
   git clone https://github.com/usamahdhaqi/weather-dashboard.git
   cd weather-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the dev server:
   ```bash
   npm start
   ```

4. Open in browser: **http://localhost:3000**

---

## 🌦️ Weather Icons
This project uses **Bas Milius Weather Icons** (MIT License).  
Icons are placed inside `public/icons/` and mapped to **Open-Meteo weather codes**.

Example mapping:
| Code | Description | Icon |
|------|-------------|------|
| 0    | Clear sky   | day_clear.svg |
| 2    | Partly cloudy | day_partial_cloud.svg |
| 61   | Rain        | day_rain.svg |
| 71   | Snow        | day_snow.svg |
| 95   | Thunderstorm | day_thunderstorm.svg |

Full mapping is implemented in `ForecastCard.js`.

---

## 📸 Screenshots
### Dark Theme
![Dark Mode](./public/screenshoot-weather-dashboard-2.PNG)

### Light Theme
![Light Mode](docs/screenshots/light.png)

---

## 🛠️ Customization
- Change theme colors in `App.css`
- Add/replace weather icons in `public/icons/`
- Extend chart data in `WeatherChart.js`

---

## 📜 License
This project is licensed under the **MIT License**.  
Weather icons by **Bas Milius** (MIT License).  
Weather data by **Open-Meteo API** (free, no key required).

---

## ⭐ Acknowledgements
- [Open-Meteo](https://open-meteo.com/) for the free weather API
- [Bas Milius Weather Icons](https://github.com/basmilius/weather-icons) for the icon set
- [Chart.js](https://www.chartjs.org/) for visualization
- React community 🚀

---

Made with ❤️ by [usamahdhaqi]
