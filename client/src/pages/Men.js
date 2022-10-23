import React, { useEffect, useState } from "react";

const Men = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weather, setWeather] = useState([]);
  const [jsDataHot, setJSDataHot] = useState([
    {
      temp: "hot",
      image_url:
        "https://static.wearpact.com/img/product/men/mhw-lak-1-1649773111_thumb.jpg",
      product_details:
        "https://wearpact.com/men/apparel/pants%20&%20shorts/clearance%20the%20everyday%20short/wa1-mhw-lak",
    },
    {
      temp: "hot",
      image_url:
        "https://static.wearpact.com/img/product/men/mvt-glb-1-1644334700_thumb.jpg",
      product_details:
        "https://wearpact.com/men/apparel/tops%20&%20shirts/clearance%20textured%20v-neck%20tee/wa1-mvt-glb",
    },
    {
      temp: "hot",
      image_url:
        "https://static.wearpact.com/img/product/men/mle-orh-2-1662051690_thumb.jpg",
      product_details:
        "https://wearpact.com/men/apparel/pants%20&%20shorts/off%20duty%20short/wa1-mle-orh",
    },
    {
      temp: "hot",
      image_url:
        "https://static.wearpact.com/img/product/men/mfw-chh-2-1659717672_thumb.jpg",
      product_details:
        "https://wearpact.com/men/apparel/tops%20&%20shirts/softspun%20v-neck%20tee/wa1-mfw-chh",
    },
  ]);

  const [jsDataCold, setJSDataCold] = useState([
    {
      temp: "cold",
      image_url:
        "https://static.wearpact.com/img/product/men/mez-blk-laydown-1-1661621627_thumb.jpg",
      product_details:
        "https://wearpact.com/men/apparel/hoodies%20&%20sweatshirts/the%20downtime%20zip%20hoodie/wa1-mez-blk",
    },
    {
      temp: "cold",
      image_url:
        "https://static.wearpact.com/img/product/men/mwl-msl-1-1637353736_thumb.jpg",
      product_details:
        "https://wearpact.com/men/apparel/sleepwear/clearance%20thermal%20waffle%20crewneck/wa1-mwl-msl",
    },
    {
      temp: "cold",
      image_url:
        "https://static.wearpact.com/img/product/men/meh-cly-2-1644347366_thumb.jpg",
      product_details:
        "https://wearpact.com/men/apparel/hoodies%20&%20sweatshirts/essential%20pullover%20hoodie/wa1-meh-cly",
    },
    {
      temp: "cold",
      image_url:
        "https://static.wearpact.com/img/product/men/mbd-bbc-laydown-1-1663167727_thumb.jpg",
      product_details:
        "https://wearpact.com/men/apparel/tops%20&%20shirts/flannel%20fireside%20shirt/wa1-mbd-bbc",
    },
  ]);

  useEffect(() => {
    const position = async () => {
      await navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });

      if (latitude !== null && longitude !== null) {
        const og_url = `https://api.weather.gov/points/37.7605,-121.9379`;
        await fetch(og_url);

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
            console.log("Booo");
          });
        // const url = og_url.properties.forecast
        // const data = url.properties.periods
      }
    };
    position();
  }, [latitude, longitude]);

  return (
    <div className="people ">
      <div className="d-flex">
        <h1 className="text-danger">Men&nbsp;</h1>{" "}
        <h1> Clothing Recomendations</h1>{" "}
      </div>
      <h3>
        We Recommend The Best Organic and Ethical Clothing - Based Off Of Your
        Weather!
      </h3>
      <div className="d-flex">
        {weather.length !== 0 ? (
          weather.slice(0, 4).map((data, i) => (
            <>
              <div className="label">
                <h3 style={{ textDecoration: "underline", color: 'white' }}>{data.name}</h3>
                <h5 style={{ color: 'white' }}>
                  Temperature: {data.temperature}({data.temperatureUnit})
                </h5>
                <h5 style={{ color: 'white' }}>Wind Speed: {data.windSpeed}</h5>
                <h5 style={{ color: 'white' }}>Wind Direction: {data.windDirection}</h5>
                <h6 style={{ color: 'white' }}>{data.detailedForecast}</h6>
                {/* <img src={jsDataCold[i].image_url} /> */}
                {data.temperature > 70 ? (
                <>
                  <img src={jsDataHot[i].image_url} className="labelImg" />
                  <button
                    onClick={() =>
                      window.open(
                        jsDataHot[i].product_details,
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                    className="btn-light btn widthMax"
                  >
                    MORE INFO
                  </button>
                </>
              ) : (
                <>
                  <img src={jsDataCold[i].image_url} className="labelImg" />
                  <button
                    onClick={() =>
                      window.open(
                        jsDataCold[i].product_details,
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                    className="btn-light btn widthMax"
                  >
                    MORE INFO
                  </button>
                </>
              )}
              </div>
            </>
          ))
        ) : (
          <h1 className="mt-5">Loading...</h1>
        )}
      </div>
    </div>
  );
};

export default Men;
