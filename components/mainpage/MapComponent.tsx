'use client'; // nextjs에서 useState사용시 작성필
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/mainpage/mainpage.module.scss';
import { useDispatch } from 'react-redux';
import { setTemp, setWeather } from '../../Store/aiSlice/aiSlice';
import Loading from '../../components/Loading';
interface WeatherData {
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
    humidity: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
  sys: {
    country: string;
  };
  clouds: {
    all: number;
  };
  name: string;
}

const LocationWeather: React.FC = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isTemp, setIsTemp] = useState<number>(0);
  const [isWeather, setIsWeather] = useState('');

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 사용자의 위치 정보를 가져오기
        const position = await getLocation();
        setLocation(position);

        // 날씨 데이터 가져오기
        const apiKey = '15c5ec95f74fa746cc03e71ed9b610f5';
        const apiURI = `https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&appid=${apiKey}`;
        const response = await axios.get<WeatherData>(apiURI);
        setWeatherData(response.data);
        setIsTemp(Math.round((response.data.main.temp - 273) * 10) / 10);
        setIsWeather(response.data.weather[0].main);
        setLoading(true);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const tempData = async () => {
      try {
        await dispatch(
          setTemp({
            value: isTemp,
          })
        );
        await dispatch(
          setWeather({
            value: isWeather,
          })
        );
      } catch (error) {
        console.log('온도 저장 에러', error);
      }
    };
    tempData();
  }, [isTemp, isWeather]);

  // 사용자의 위치 정보를 가져오는 함수
  const getLocation = async (): Promise<{
    latitude: number;
    longitude: number;
  }> => {
    const options: PositionOptions = {
      maximumAge: 60 * 1000,
      timeout: 10 * 1000,
    };

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        },
        options
      );
    });
  };

  const iconUrl = `http://openweathermap.org/img/w/${weatherData?.weather[0].icon}.png`;
  const temperatureText = weatherData?.main.temp
    ? Math.round((weatherData.main.temp - 273) * 10) / 10
    : null;

  const getTemperatureDescription = (temperature: number) => {
    if (temperature <= 0) {
      return '날이 매우 추우니 옷을 따듯하게 입으세요';
    } else if (temperature <= 10) {
      return '날이 쌀쌀하니 가벼운 겉옷을 챙기세요';
    } else if (temperature <= 20) {
      return '날이 따듯한 편이니 겉옷은 안챙겨도 괜찮아요';
    } else {
      return '날이 매우 더우니 반팔을 추천해요';
    }
  };
  const getLocationName = (name: string): string => {
    // 날씨 데이터의 이름이 "yongsan"인 경우 "용산"으로 변환
    if (name.toLowerCase() === 'yongsan') {
      return '서울시 용산구';
    } else if (name.toLowerCase() === 'incheon') {
      return '인천';
    }
    // 기본적으로는 날씨 데이터의 이름 그대로 사용
    return name;
  };

  // 위치 이름 가져오기
  const locationName = getLocationName(weatherData?.name || '');

  // console.log('온도 정보', Math.round((weatherData.main.temp - 273) * 10) / 10);

  // console.log('날씨 정보', weatherData.weather[0].main);

  return (
    <div className={styles.weatherContainer}>
      {loading && <Loading />}
      {!loading && (
        <>
          <div className={styles.weatherIcon}>
            <img src={iconUrl} alt="Weather Icon" />
          </div>
          <p className={styles.locationText}>{locationName}</p>

          <p className={styles.temperatureTextmain}>
            {Math.round((weatherData?.main.temp - 273) * 10) / 10}
            °C
          </p>
          <p className={styles.temperatureTextcolor}>
            <span style={{ color: 'red' }}>
              ▲{Math.round((weatherData?.main.temp_max - 273) * 10) / 10}°C
            </span>{' '}
            &nbsp; {} &nbsp; {} &nbsp; {} &nbsp; {} &nbsp; {}
            <span style={{ color: 'blue' }}>
              ▼{Math.round((weatherData?.main.temp_min - 273) * 10) / 10}°C
            </span>{' '}
          </p>

          <div className={styles.temperatureText}>
            <div className={styles.today}>오늘의 날씨</div>

            {temperatureText ? (
              <>{getTemperatureDescription(temperatureText)}</>
            ) : null}
          </div>
          <hr />
        </>
      )}
    </div>
  );
};

export default LocationWeather;
