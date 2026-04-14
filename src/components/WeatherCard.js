function weatherCard({ weather }) {
    return (
        <div style={style.card}>
            <h1>{weather.name.toUpperCase()}</h1>
            
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
              <p><label style={style.headline}>Temperature:</label> {weather.main.temp}°C</p>
              <p><label style={style.headline}>Description:</label> {weather.weather[0].description.toUpperCase()}</p>
              <p><label style={style.headline}>Humidity:</label>{weather.main.humidity}%</p>
              <p><label style={style.headline}>Wind Speed:</label> {weather.wind.speed} m/s</p>
          </div>
      </div>
    );
}

const style = {
  card: {
    marginTop: "30px",
    padding: "25px",
    borderRadius: "15px",
    backgroundColor: "theme.card",
    display: "inline-block",
    boxShadow: "0 8px 20px rgba(100, 10, 10, 0.76)",
    transition: "transform 0.3s ease, opacity 0.3s ease",
    textAlign: "center",
    cursor: "pointer",
    width:"10cm",
    backgroundImage: "url(https://wallpaperbat.com/img/256594-road-to-forest-mist-fog-beautiful-weather-wallpaper-android.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",      
    backgroundPosition: "center",
    color:"#fff",
  },
  details: {
    // display: "flex",
    display:1,
    justifyContent: "space-between",
    marginTop: "10px",
    with:"bold",
    color:"#fff"
  },
  headline:{
    fontSize: "18px",
    margin: "10px 0",
    color: "gray bold",
    marginBottom: "15px",
    fontFamily: "math",
  }
};

export default weatherCard; 
