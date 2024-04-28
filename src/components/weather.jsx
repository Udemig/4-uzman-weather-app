import { useState } from "react";
import { RiCelsiusFill } from "react-icons/ri";

function Weather() {
  const [city, setCity] = useState("");
  const [info, setInfo] = useState({});
  const [isActive, setIsActive] = useState(false);

  // inputun içerisindeki değer değiştiğinde çalışır
  const handleChange = (e) => {
    // inputun içerisindeki değere eriştik
    const value = e.target.value;
    // city stateine inputun değerini aktartık
    setCity(value);
  };

  const handleClick = async () => {
    // Inputa bir değer girilmemişse ekrana alert bas
    if (!city) {
      alert("Lütfen aratmak istediğiniz şehri giriniz!");
      return;
    }
    // API'nin ana urlini tanımladık
    const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2373995dbd82304ca8dc8117a9b7230b
    `;
    try {
      // fetch ile apiye istek attık
      const res = await fetch(baseURL);
      // veritabanından gelen veriyi json formatına çevirdik
      const data = await res.json();
      // data değişkenini info stateine aktardık
      setInfo(data);
      setIsActive(true);
    } catch (error) {
      console.log("Hatanız:", error);
    }
  };
  console.log(info);

  return (
    <div>
      <h1>Hava Durumu Uygulaması</h1>
      <form className="form">
        <input
          type="text"
          onChange={handleChange}
          placeholder="Şehri Giriniz"
          className="inputText"
        />
      </form>
      <div className="btnDiv">
        <button className="btn" onClick={handleClick}>
          Verileri Getir
        </button>
      </div>

      {isActive && (
        <div className="info">
          <p id="sehir">
            {info.name}, {info.sys.country}
          </p>
          <div className="genelDeger">
            <p id="sicaklik">{(info.main.temp - 273.15).toFixed(2)}</p>
            <RiCelsiusFill className="fa-c" />
          </div>
          <p id="havaDurumu">Hava Durumu</p>
          <div className="his">
            <p id="hissedilen">
              Hissedilen:{(info.main.feels_like - 273.15).toFixed(2)}
            </p>
            <RiCelsiusFill className="fa-circle" />
          </div>
        </div>
      )}
    </div>
  );
}
export default Weather;
