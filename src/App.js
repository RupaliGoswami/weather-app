import { useState } from "react";
import Search from "./components/Search";
import WeatherCard from "./components/WeatherCard";
 import './app.css';

function App() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [useDemo, setUseDemo] = useState(false);  
  const randomTemp = Math.floor(Math.random() * 15) + 20;


  const demoWeather = {
      main: {
        temp: randomTemp,
        humidity: 60 + Math.floor(Math.random() * 20),
      },
      weather: [
        {
          description: "clear sky",
          icon: "01d",
        },
      ],
      wind: {
        speed: Math.floor(Math.random() * 10),
      },
    };
      
  const getWeather = async () => {
    setError("");     
    setWeather(null);
    
     if (useDemo) {
        const demoData = {
            ...demoWeather,
            name: city || "Demo City", 
          };
         setWeather(demoData);
        return;
      }
    try {
      setLoading(true);
      // setError("");

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
      // setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (

    <>
      <video autoPlay loop muted style={style.videoBg}>
        <source src="https://media.istockphoto.com/id/1125217870/video/time-lapse-sunrise-over-mountain-with-mist-and-fog-cloud.mp4?s=mp4-640x640-is&k=20&c=gJhYDCEdJQXa1OobqkcK995cZhpIWUcgQwJlKUxEHNs=" type="video/mp4" />
      </video>

    <div style={style.overlay}></div>


    <div  style={{
          ...style.container,
        }}>

     
       <h1 style={style.title}>Weather App 🌦️</h1>

      <div style={style.searchBox}>
        <label style={{ cursor: "pointer" }}>

          <input type="checkbox" checked={useDemo} onChange={() => setUseDemo(!useDemo)} 
          style={{  width: "20px", height: "20px"}} />
            <strong><span style={style.demotext}>
                {useDemo ? "Demo Mode 🧪" : "Live Mode 🌐"}
              </span></strong>
          
        </label>
      </div>

       {!weather && !loading && !error && (
        <strong><p style={style.SearchText}>
            Search a city to see weather 🌍
        </p></strong>
        )}

      <Search city={city} setCity={setCity} getWeather={getWeather} />

      {loading && <p style={style.loading}>Loading...</p>}
      {error && <p style={style.error}>{error}</p>}
      
      {weather && <WeatherCard weather={weather} />}
    
    </div>

  </>
  );
}

const style = {
  container: {
    transition: "all 0.5s ease",
    minHeight: "97vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "theme.text",
    fontFamily: "Arial",
    
  },
  title: {
    // color: "#a7a890",
    marginBottom: "20px",
  },
  loading: {
    color: "white",
  },
  error: {
    color: "red",
    fontFamily: "math",
    fontSize: "20px",
    textShadow: "1px 1px 4px rgba(206, 206, 103, 0.9)"

  },
  searchBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "10px",
    },
  demotext: {
    marginTop: "20px",
    fontSize: "22px",
    // color: "rgba(198, 245, 169, 0.78)",
    color:"#fff",
    fontFamily: "math",
    fontSize: "larger",
    letterSpacing: "0.5px",
    opacity: 0.9,
  },
  SearchText: {
    color: "#a6cd92",
    fontSize: "larger",
    fontFamily: "math",
  },

  videoBg: {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  zIndex: "-2",
},

overlay: {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))",
  zIndex: "-1",
},

};


export default App;
