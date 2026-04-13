import { useState } from "react";
import Search from "./components/Search";
import WeatherCard from "./components/WeatherCard";

function App() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const getWeather = async () => {
    try {
      setLoading(true);
      setError("");

    const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    if (data.cod !== 200) {
       throw new Error("City not found. Please try again.");
      }
       setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (

    <div style={style.container}>
      <h1>Weather App 🌦️ </h1>

      <Search city={city} setCity={setCity} getWeather={getWeather} />

      {loading && <p>Loading...</p>}

      {error && <p style={{color:"red"}}>{error}</p>}
      
      {weather && <WeatherCard weather={weather} />}
      
    </div>
  );
}

const style = {
  container: {
    textAlign: "center",
    minHeight: "100vh",
    padding: "20px",
    marginTop: "50px",
    fontFamily: "Arial",
    backgroundColor: "linear-gradient(to right, #74ebd5, #ACB6E5)",
  }
};


export default App;
