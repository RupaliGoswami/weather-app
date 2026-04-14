import { useState, useEffect } from "react";
import Search from "./components/Search";
import WeatherCard from "./components/WeatherCard";
import "./app.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [useDemo, setUseDemo] = useState(false);
  const randomTemp = Math.floor(Math.random() * 15) + 20;

  const getVideo = () => {
    const condition = weather?.weather?.[0]?.main;

    console.log("Weather condition:", condition);

    if (!condition) {
      return "https://cdn.pixabay.com/video/2025/02/23/260397_large.mp4";
    }

    if (condition === "Rain") {
      return "https://cdn.pixabay.com/video/2024/05/15/212102_large.mp4";
    }

    if (condition === "Clouds") {
      return "https://cdn.pixabay.com/video/2022/08/09/127351-738456858_large.mp4";
    }

    if (condition === "Clear") {
      return "https://cdn.pixabay.com/video/2021/03/22/68703-528689481_large.mp4";
    }

    return "https://cdn.pixabay.com/video/2025/02/23/260397_large.mp4";
  };

  const demoWeather = {
    main: {
      temp: randomTemp,
      humidity: 60 + Math.floor(Math.random() * 20),
    },
    weather: [
      {
        main: "Clear",
        description: "clear sky",
        icon: "01d",
      },
    ],
    wind: {
      speed: Math.floor(Math.random() * 10),
    },
  };

  const getLocationWeather = () => {
    setLoading(true);
    setError("");
    setWeather(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;

          const apiKey = "0173f4977512b3f68801dc49f4f75a9a";

          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
          );

          const data = await response.json();

          setWeather(data);
        } catch (err) {
          setError("Failed to fetch location weather");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Location permission denied ❌");
        setLoading(false);
      },
    );
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

      const apiKey = "0173f4977512b3f68801dc49f4f75a9a";

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
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

  useEffect(() => {
    getLocationWeather();
  }, []);

  return (
    <>
      <video
        key={weather?.name || "default"} // 🔥 better key
        autoPlay
        loop
        muted
        playsInline
        style={style.videoBg}
      >
        <source src={getVideo()} type="video/mp4" />
      </video>

      <div style={style.overlay}></div>

      <div
        style={{
          ...style.container,
        }}
      >
        <h1 style={style.title}>Weather App 🌦️</h1>

        <div style={style.searchBox}>
          <label style={{ cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={useDemo}
              onChange={() => setUseDemo(!useDemo)}
              style={{ width: "20px", height: "20px" }}
            />
            <strong>
              <span style={style.demotext}>
                {useDemo ? "Demo Mode 🧪" : "Live Mode 🌐"}
              </span>
            </strong>
          </label>
        </div>

        {!weather && !loading && !error && (
          <strong>
            <p style={style.SearchText}>Search a city to see weather 🌍</p>
          </strong>
        )}

        <Search
          city={city}
          setCity={setCity}
          getWeather={getWeather}
          getLocation={getLocationWeather}
        />

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
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "theme.text",
    fontFamily: "Arial",
  },
  title: {
    fontSize: "42px",
    fontWeight: "bold",
    letterSpacing: "1px",
    textShadow: "2px 2px 10px rgba(0,0,0,0.5)",
  },
  loading: {
    color: "white",
  },
  error: {
    color: "red",
    fontFamily: "math",
    fontSize: "20px",
    textShadow: "1px 1px 4px rgba(206, 206, 103, 0.9)",
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
    color: "#fff",
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
    width: "100vw",
    height: "100vh",
    objectFit: "cover",
    zIndex: "-10", // 🔥 force behind everything
  },

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))",
    zIndex: "-1", //
  },
};

export default App;
