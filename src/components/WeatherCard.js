function weatherCard({ weather }) {
    return (
        <div style={style.card}>
            <h2>{weather.name}</h2>
            
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="icon"
      />
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Description: {weather.weather[0].description}</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
    );
}

const style = {
  card: {
    marginTop: "30px",
    padding: "25px",
    borderRadius: "15px",
    backgroundColor: "white",
    display: "inline-block",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  },
};

export default weatherCard; 
