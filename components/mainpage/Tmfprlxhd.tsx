import React, { useState, useEffect } from 'react';

const WeatherFromLocalStorage: React.FC = () => {
  const [currentTemperature, setCurrentTemperature] = useState<number | null>(
    null
  );
  const [currentWeather, setCurrentWeather] = useState<string>('');
  const [tomorrowTemperature, setTomorrowTemperature] = useState<number | null>(
    null
  );
  const [tomorrowWeather, setTomorrowWeather] = useState<string>('');

  useEffect(() => {
    // 현재 날씨 데이터 가져오기
    const currentWeatherDataString = localStorage.getItem('weatherData');
    if (currentWeatherDataString) {
      const currentWeatherData = JSON.parse(currentWeatherDataString);
      setCurrentTemperature(
        Math.round((currentWeatherData.main.temp - 273) * 10) / 10
      );
      setCurrentWeather(currentWeatherData.weather[0].main);
    }

    // 내일의 날씨 데이터 가져오기
    const tomorrowWeatherDataString = localStorage.getItem(
      'tomorrowWeatherData'
    );
    if (tomorrowWeatherDataString) {
      const tomorrowWeatherData = JSON.parse(tomorrowWeatherDataString);
      setTomorrowTemperature(
        Math.round((tomorrowWeatherData.main.temp - 273) * 10) / 10
      );
      setTomorrowWeather(tomorrowWeatherData.weather[0].main);
    }
  }, []);

  return (
    <div>
      {currentTemperature !== null &&
      currentWeather !== '' &&
      tomorrowTemperature !== null &&
      tomorrowWeather !== '' ? (
        <div>
          <p>
            현재 온도: {currentTemperature}°C, 날씨: {currentWeather}
          </p>
          <p>
            내일 온도: {tomorrowTemperature}°C, 날씨: {tomorrowWeather}
          </p>
        </div>
      ) : (
        <p>날씨 데이터가 없습니다.</p>
      )}
    </div>
  );
};

export default WeatherFromLocalStorage;
