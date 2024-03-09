import { useState } from "react";
import background from "./images/New Bitmap Image.bmp";
import darkBack from "./images/moon-dark-sky-clouds-wallpaper-preview.jpg";
import PopUp from "./PopUp";
import { useCustomHook } from "./useCustomHook";
export default function App() {
  const [popUpStatus, setPopUpStatus] = useState(true);
  const [city, setCity] = useState("London");
  const [cityInfo, weather, Status, submit, setSubmit] = useCustomHook(
    `http://api.weatherapi.com/v1/current.json?key=07228fa3abba4a90a4644358240803&q=${city}&aqi=no`
  );
  function handlePopUpStatus() {
    setPopUpStatus(!popUpStatus);
  }

  return (
    <>
      <div
        className={`w-full min-h-screen relative overlay z-10 bg-opacity-50 `}
      >
        <img
          className={"w-full h-screen absolute "}
          src={weather.is_day === 1 ? background : darkBack}
          alt=""
        />
        <WeatherComponent
          handlePopUpStatus={handlePopUpStatus}
          cityInfo={cityInfo}
          weather={weather}
          Status={Status}
        />
      </div>
      <PopUp
        popUpStatus={popUpStatus}
        handlePopUpStatus={handlePopUpStatus}
        setCity={setCity}
        setSubmit={setSubmit}
        submit={submit}
      />
    </>
  );
}
function WeatherComponent({ handlePopUpStatus, cityInfo, weather, Status }) {
  return (
    <div
      className={
        "absolute w-full sm:w-96 h-5/6 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-slate-700 bg-slate-300 rounded-md z-20 flex flex-col justify-center items-center"
      }
    >
      <img className="w-3/5 h-60 mx-auto pb-2" src={Status.icon} alt="" />
      <CardData cityInfo={cityInfo} weather={weather} Status={Status} />
      <button
        className="w-fit p-1 bg-white border-2 border-slate-500 rounded-md mx-auto z-30 hover:bg-slate-500 hover:text-white"
        onClick={handlePopUpStatus}
      >
        Change City
      </button>
    </div>
  );
}
function CardData({ cityInfo, weather, Status }) {
  return (
    <div className="flex flex-col justify-between items-center">
      <p className="p-2">Country : {cityInfo.country}</p>
      <p className="p-1">City : {cityInfo.name}</p>
      <p className="p-2">Date :{cityInfo.localtime}</p>
      <p className="p-1">Status : {Status.text}</p>
      <p className="p-2">
        Tempreture : {weather.temp_c}
        <sup className="text-xs">o</sup>C
      </p>
    </div>
  );
}
