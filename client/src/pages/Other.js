import React, { useEffect, useState } from "react";

const Other = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weather, setWeather] = useState([]);
  const [jsDataHot, setJSDataHot] = useState([
    {
      temp: "hot",
      image_url:
        "https://cdn.shopify.com/s/files/1/0932/1356/products/CopyofCOVER_WomensAntiFitFauxDenim-DarkWash-1_1080x.progressive.jpg?v=1665604009",
      product_details:
        "https://kotn.com/products/unisex-antifit-denim?colour=dark-wash&size=24-28",
    },
    {
      temp: "hot",
      image_url:
        "https://cdn.shopify.com/s/files/1/0932/1356/products/UnisexWovenShorts-Autumn-1_1080x.progressive.jpg?v=1659042065",
      product_details:
        "https://kotn.com/products/unisex-relaxed-woven-shorts?colour=autumn-stripe&size=xxs",
    },
    {
      temp: "hot",
      image_url:
        "https://cdn.shopify.com/s/files/1/0932/1356/products/UnisexRelaxedWovenShort-AutumnStripe-1_1080x.progressive.jpg?v=1659042065",
      product_details:
        "https://kotn.com/products/unisex-relaxed-woven-shorts?colour=autumn-stripe&size=xxs",
    },
    {
      temp: "hot",
      image_url:
        "https://cdn.shopify.com/s/files/1/0932/1356/products/COVER_UnisexBoxCrew-Black-1_68f4a855-3922-4526-aeea-50f1f2f24fe0_1080x.progressive.jpg?v=1658520750",
      product_details:
        "https://kotn.com/products/box-crew?colour=black&size=xxs",
    },
  ]);

  const [jsDataCold, setJSDataCold] = useState([
    {
      temp: "cold",
      image_url:
        "https://cdn.shopify.com/s/files/1/0932/1356/products/AntifitDenim-Black31-1_1080x.progressive.jpg?v=1665602974",
      product_details:
        "https://kotn.com/products/unisex-antifit-denim?colour=black&size=26-28",
    },
    {
      temp: "cold",
      image_url:
        "https://cdn.shopify.com/s/files/1/0932/1356/products/WomensCollarlessShirt-MarshmallowMidnightNavySand-1_1080x.progressive.jpg?v=1659450544",
      product_details:
        "https://kotn.com/products/collarless-shirt?colour=marshmallow-midnight-navy-sand&size=xs",
    },
    {
      temp: "cold",
      image_url:
        "https://static.wearpact.com/img/product/women/uoh-blk-1-1664490243_thumb.jpg",
      product_details:
        "https://wearpact.com/women/apparel/hoodies%20&%20sweatshirts/gender%20neutral%20pullover%20hoodie/wa1-uoh-blk#search",
    },
    {
      temp: "cold",
      image_url:
        "https://cdn.shopify.com/s/files/1/0932/1356/products/UnisexFleeceShirt-DarkOlive-2_1080x.progressive.jpg?v=1663606689",
      product_details:
        "https://kotn.com/products/unisex-reverse-fleece-shirt?colour=dark-olive&size=xxs",
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
        <h1 className="text-danger">Other&nbsp;</h1>{" "}
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
                <br />
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

export default Other;
