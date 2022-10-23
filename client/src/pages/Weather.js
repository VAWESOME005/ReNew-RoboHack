import React, { useEffect, useState } from "react";
import "./Weather.css";

const Weather = ({ history }) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    const position = async () => {
      await navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });

      if (latitude !== null && longitude !== null) {
        // const og_url = `https://api.weather.gov/points/37.7605,-121.9379`;
        // await fetch(og_url);

        fetch("https://api.weather.gov/points/" + latitude + "," + longitude)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            const new_url = data["properties"]["forecast"];
            fetch(new_url)
              .then(function (response) {
                return response.json();
              })
              .then(function (data2) {
                setWeather(data2["properties"]["periods"]);
              });
          })
          .catch(function () {
            console.log("yo");
          });
        // const url = og_url.properties.forecast
        // const data = url.properties.periods
      }
    };
    position();
  }, [latitude, longitude]);
  return (
    <div className="weather">
      {/* <h1>Lat: {latitude}</h1>
   <h1>Long: {longitude}</h1> */}
      {/* <h6>{JSON.stringify(weather)}</h6> */}
      <div className="d-flex">
        <div
          className="option"
          onClick={() => history.push("/suggestions/men")}
        >
          <img
            src="https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png"
            className="optionImage"
          />
          <h1 style={{ color: "white", marginLeft: 135 }}>Men</h1>
        </div>

        <div
          className="option"
          onClick={() => history.push("/suggestions/women")}
        >
          <img
            src="https://cdn1.iconfinder.com/data/icons/avatars-1-5/136/87-512.png"
            className="optionImage"
          />
          <h1 style={{ color: "white", marginLeft: 135 }}>Women</h1>
        </div>

        <div className="option">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4646/4646510.png"
            className="optionImage"
            onClick={() => history.push("/suggestions/other")}
          />
          <h1 style={{ color: "white", marginLeft: 135 }}>Other</h1>
        </div>
      </div>
      {weather.slice(0, 4).map((data) => (
        // data.number % 1 ? (
        <div className="label2">
          <h3 style={{ textDecoration: "underline", color: "white" }}>
            {data.name}
          </h3>
          <h5 style={{ color: "white" }}>
            Temperature: {data.temperature}({data.temperatureUnit})
          </h5>
          <h5 style={{ color: "white" }}>Wind Speed: {data.windSpeed}</h5>
          <h5 style={{ color: "white" }}>
            Wind Direction: {data.windDirection}
          </h5>
          <h6 style={{ color: "white" }}>{data.detailedForecast}</h6>
        </div>
        // ) : (
        //   <div className="label2">
        //     <h3 style={{ textDecoration: "underline", color: "white" }}>
        //       {data.name}
        //     </h3>
        //     <h5 style={{ color: "white" }}>
        //       Temperature: {data.temperature}({data.temperatureUnit})
        //     </h5>
        //     <h5 style={{ color: "white" }}>Wind Speed: {data.windSpeed}</h5>
        //     <h5 style={{ color: "white" }}>
        //       Wind Direction: {data.windDirection}
        //     </h5>
        //     <h6 style={{ color: "white" }}>{data.detailedForecast}</h6>
        //   </div>
        // );
        //   }
        //   )
      ))}
    </div>
  );
};

export default Weather;
