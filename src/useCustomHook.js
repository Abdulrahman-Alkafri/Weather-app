import { useState, useEffect } from "react";
import axios from "axios";
export function useCustomHook(url) {
  const [cityInfo, setCityInfo] = useState({});
  const [weather, setWeather] = useState({});
  const [Status, setStatus] = useState({});
  const [submit, setSubmit] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(url);
        const data = await res.data;
        setCityInfo(data.location);
        setWeather(data.current);
        setStatus(data.current.condition);
      } catch (error) {
        console.log(error.message);
      }
    }
    if (submit) {
      fetchData();
      setSubmit(!submit);
    }
  }, [submit]);
  return [cityInfo, weather, Status, submit, setSubmit];
}
