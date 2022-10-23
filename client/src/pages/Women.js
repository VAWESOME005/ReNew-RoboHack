import React, { useEffect, useState } from "react";

const Women = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weather, setWeather] = useState([]);
  const [jsDataHot, setJSDataHot] = useState([
    {
      temp: "hot",
      image_url:
        "https://static.wearpact.com/img/product/women/wyv-acd-2-1660579028_thumb.jpg",
      product_details:
        "https://wearpact.com/women/apparel/tops%20&%20shirts/far-out%20tie-dye%20tee/wa1-wyv-acd",
    },
    {
      temp: "hot",
      image_url:
        "https://static.wearpact.com/img/product/women/wyn-lti-2-1654199584_thumb.jpg",
      product_details:
        "https://wearpact.com/women/apparel/tops%20&%20shirts/far-out%20tie-dye%20tank/wa1-wyn-lti",
    },
    {
      temp: "hot",
      image_url:
        "https://static.wearpact.com/img/product/women/wvn-blk-1-1626205736_thumb.jpg",
      product_details:
        "https://wearpact.com/women/apparel/tops%20&%20shirts/softspun%20v-neck%20tee/wa1-wvn-blk",
    },

    {
      temp: "hot",
      image_url:
        "https://static.wearpact.com/img/product/women/weo-blk-2-1662146023_thumb.jpg",
      product_details:
        "https://wearpact.com/women/apparel/tops%20&%20shirts/ribbed%20bra%20top/wa1-weo-blk",
    },
  ]);

  const [jsDataCold, setJSDataCold] = useState([
    {
      temp: "cold",
      image_url:
        "https://static.wearpact.com/img/product/women/wyh-bcy-2-1662485150_thumb.jpg",
      product_details:
        "https://wearpact.com/women/apparel/tops%20&%20shirts/denim%20chambray%20ranch%20shirt/wa1-wyh-bcy",
    },
    {
      temp: "cold",
      image_url:
        "https://static.wearpact.com/img/product/women/wff-blk-2-1662685172_thumb.jpg",
      product_details:
        "https://wearpact.com/women/apparel/sleepwear/thermal%20waffle%20henley/wa1-wff-blk",
    },
    {
      temp: "cold",
      image_url:
        "https://static.wearpact.com/img/product/women/wau-rbc-2-1659385698_thumb.jpg",
      product_details:
        "https://wearpact.com/women/apparel/tops%20&%20shirts/airplane%20turtleneck/wa1-wau-rbc",
    },
    {
      temp: "cold",
      image_url:
        "https://static.wearpact.com/img/product/women/wap-sht-2-1659387748_thumb.jpg",
      product_details:
        "https://wearpact.com/women/apparel/hoodies%20&%20sweatshirts/airplane%20poncho/wa1-wap-sht",
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
        <h1 className="text-danger">Women&nbsp;</h1>{" "}
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
                <h5 style={{ color: 'white' }}>
                  Temperature: {data.temperature}({data.temperatureUnit})
                </h5>
                <h5 style={{ color: 'white' }}>Wind Speed: {data.windSpeed}</h5>
                <h5 style={{ color: 'white' }}>Wind Direction: {data.windDirection}</h5>
                <h6 style={{ color: 'white' }}>{data.detailedForecast}</h6>
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

export default Women;
