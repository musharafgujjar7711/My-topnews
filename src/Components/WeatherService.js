import { DateTime } from "luxon";

const API_KEY = "87153f526c3ec30ac3ad63f6b6005fa8";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

const getWeatherdata = (infotype, searchparams) => {
    const url = new URL(BASE_URL + infotype);
    url.search = new URLSearchParams({ ...searchparams, appid: API_KEY });
    
    return fetch(url)
        .then(res => res.json())
        .then(getdata => getdata);
};

const convertSecondsToDate = (seconds) => {
    return DateTime.fromSeconds(seconds).toFormat('yyyy-MM-dd');
};

const convertSecondsToTime = (seconds) => {
    return DateTime.fromSeconds(seconds).toFormat('hh:mm a');
};

const getTimezone = (seconds) => {
    return DateTime.fromSeconds(seconds).zoneName;
};

const getWeekday = (seconds) => {
    return DateTime.fromSeconds(seconds).toFormat('cccc');
};

const getAllInfo = (seconds) => {
    const date = DateTime.fromSeconds(seconds);
    const weekday = date.toFormat('cccc');
    const formattedDate = date.toFormat('d MMMM yyyy'); // e.g., 17 September 2024
    const time = date.toFormat('hh:mm a'); // e.g., 11:30 AM
    const timezone = getTimezone(seconds);
    
    return `${weekday}, ${formattedDate} | Local time ${time}`;
};

const getIconUrl = (icon) =>` https://openweathermap.org/img/wn/${icon}@2x.png`;

const convertKelvinToCelsius = (kelvin) => kelvin - 273.15;

const formatTemperature = (kelvin) => {
    const tempCelsius = convertKelvinToCelsius(kelvin);
    return `${Math.round(tempCelsius)}°C`;
};

const formattedCurrent = (data) => {
    const {
        coord: { lat, lon },
        main: { feels_like, grnd_level, humidity, pressure, sea_level, temp, temp_max, temp_min },
        timezone,
        dt,
        sys: { country, sunrise, sunset },
        name,
        visibility,
        weather,
    } = data;

    const { main: details, icon } = weather[0];
    const formattedLocaltime = getAllInfo(dt);

    return {
        humidity,
        pressure,
        sea_level,
        feels_like,
        grnd_level,
        temp,
        temp_max,
        temp_min,
        country,
        sunrise: convertSecondsToTime(sunrise),
        sunset: convertSecondsToTime(sunset),
        formattedLocaltime,
        icon: getIconUrl(icon),
        details,
        timezone,
        dt,
        lat,
        lon,
        name,
        visibility,
    };
};

const getFormattedData = async (searchparams) => {
    const formattedWeather = await getWeatherdata("weather", searchparams).then(formattedCurrent);
    const { dt, timezone, lat, lon } = formattedWeather;

    // Get the forecast data
    const forecastData = await getWeatherdata("forecast", {
        lat,
        lon,
        units: searchparams.units,
    });

    // Format hourly forecast (next 12 hours)
    const formattedHourlyForecast = forecastData.list
        .slice(0, 5) // Get first 12 entries for hourly
        .map(item => ({
            dt:convertSecondsToTime (item.dt),
            temp: (item.main.temp),
            weather: item.weather[0].description,
            icon: getIconUrl(item.weather[0].icon),
        }));

    // Format daily forecast (next 7 days)
    const formattedDailyForecast = forecastData.list
        .filter((item, index) => index % 8 === 0) // Select one entry per day (assuming 3-hour interval)
        .map(item => ({
            dt: getWeekday (item.dt),
            temp
            : (item.main.temp),
            
            weather: item.weather[0].description,
            icon: getIconUrl(item.weather[0].icon),
        }));

    return {
        ...formattedWeather,
        hourlyForecast: formattedHourlyForecast,
        dailyForecast: formattedDailyForecast,
    };
};

export default getFormattedData;
