function Search({ city, setCity, getWeather }) { 
    return (
        <div style={style.searchBox}>

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
    searchBox: {
        display: "flex",
        gap: "10px",
        marginBottom: "20px",
        },
    input: {
        padding: "12px",
        width: "250px",
        borderRadius: "8px",
        border: "none",
        marginRight: "10px",
        outline: "none",
    },
    button: {
        adding: "18px 18px",
        border: "none",
        backgroundColor: "#0c4645",
        color: "white",
        borderRadius: "10px",
        cursor: "pointer",
        marginTop: "3px",
    }
};

export default Search;