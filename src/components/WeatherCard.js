function weatherCard({ weather }) {
  if (!weather || !weather.main) {
    return null;
  }
  return (
    <div
      style={style.card}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <h1>
        {weather?.name ? weather.name.toUpperCase() : "Loading..."},{" "}
        {weather.sys?.country}
      </h1>

      <img
        src={`https://www.freeiconspng.com/uploads/weather-icon-png-8.png`}
        alt="icon"
        style={{
          width: "100px",
          height: "100px",
          margin: "10px 0",
        }}
      />
      <div style={style.details}>
        <p>
          <label style={style.headline}>Temperature: </label>
          <h2>
            {weather?.main?.temp ? `${weather.main.temp}°C` : "Loading..."}
          </h2>
        </p>
        <p>
          <label style={style.headline}>Description: </label>{" "}
          {weather?.weather?.[0]?.description ?? "N/A".toUpperCase()}
        </p>
        <p>
          <label style={style.headline}>💧Humidity: </label>{" "}
          {weather.main.humidity}%
        </p>
        <p>
          <label style={style.headline}>🌬️Wind Speed: </label>{" "}
          {weather?.wind?.speed ?? "--"} m/s
        </p>
      </div>
    </div>
  );
}

const style = {
  card: {
    marginTop: "30px",
    padding: "30px",
    borderRadius: "20px",
    backgroundColor: "theme.card",
    display: "inline-block",
    boxShadow: "0 8px 20px rgba(100, 10, 10, 0.76)",
    // transition: "transform 0.3s ease, opacity 0.3s ease",
    textAlign: "center",
    cursor: "pointer",
    width: "10cm",
    color: "#fff",
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(15px)",
    border: "1px solid rgba(255,255,255,0.2)",
    animation: "fadeIn 0.5s ease-in",
  },

  details: {
    // display: "flex",
    display: 1,
    justifyContent: "space-between",
    marginTop: "10px",
    with: "bold",
    color: "#fff",
  },
  headline: {
    fontSize: "18px",
    margin: "10px 0",
    color: "gray bold",
    marginBottom: "15px",
    fontFamily: "math",
  },
  city: {
    fontSize: "32px",
    fontWeight: "600",
  },
  temp: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#fff",
  },
};

export default weatherCard;
