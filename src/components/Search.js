function Search({ city, setCity, getWeather }) { 
    return (
        <div style={{ marginBottom: "20px" }} >

            <input
                type="text"
                placeholder="Enter city name" 
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && city.trim() !== "") {
                        getWeather();
                    }
                    }}
                style={style.input}
            />
            <br />
            <button style={style.button} onClick={getWeather} disabled={!city}>
                Get Weather
            </button> 
        </div>
    );
}  

const style = {
  input: {
    padding: "12px",
    width: "220px",
    borderRadius: "8px",
    border: "none",
    marginRight: "10px",
    outline: "none",
  },
 button: {
    adding: "12px 18px",
    border: "none",
    backgroundColor: "#333",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "20px",
  }
};

export default Search;