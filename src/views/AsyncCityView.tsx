import axios from 'axios'
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom'

const AsyncCityView: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { city } = useParams()
  const [weatherDatas, setWeatherDatas] = useState<any>()
  const preview = searchParams.get('preview')
  const navigate = useNavigate()
  const getWeatherData = useCallback( async () => {
    try {
      const lat = searchParams.get('lat')
      const lon = searchParams.get('lon')

      const weatherData = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`)
      
      // cal current date & time
      const localOffset = new Date().getTimezoneOffset() * 60000;
      if(!weatherData.data.current) {
        return
      }
      const utc = weatherData.data.current.dt * 1000 + localOffset;
      weatherData.data.currentTime = utc + 1000 * weatherData.data.timezonr_offset

      // cal hourly weather offset
      weatherData.data.hourly.forEach((hour: any) => {
        const utc = hour.dt * 1000 + localOffset;
        hour.currentTime = utc + 1000 * weatherData.data.timezone_offset
      })
      setWeatherDatas(weatherData.data)
      

    } catch(err) {
      // console.log(err)
    }
  }, [searchParams])
    
  useEffect(() => {
    getWeatherData()
   
    
  }, [getWeatherData])

  const removeCity = () => {
    const cities = JSON.parse(localStorage.getItem("savedCities") || "")
    const cityId = searchParams.get('id')
    const res = cities.filter((city: any) => city.id !== cityId)
    if(res) {
      localStorage.setItem("savedCities", JSON.stringify(res))
    }
    navigate("/")
  }

  return <div className="flex flex-col flex-1 items-center">
   
    {preview && weatherDatas && (
      <> 
        {/** Banner */}
        <div className="text-white p-4 bg-weather-secondary w-full text-center">
          <p>
            You are currently previewing this city, click the "+" icon to start tracking this city
          </p>
        </div>

         {/** Weather Overview */}
        <div className="flex flex-col items-center text-white py-12 w-full">
          <h1 className="text-4xl mb-2">{city}</h1>
          <p className="text-sm mb-12">
            <span>{new Date().toLocaleDateString(
              "en-us",
              {
                weekday: "short",
                day: "2-digit",
                month: "long"
              }
            )}
            </span>
            <span>
            {new Date().toLocaleTimeString(
              "en-us",
              {
                timeStyle: "short",
              }
            )}</span>
          </p>
          <p className="text-8xl mb-8">
            {Math.round(weatherDatas.current.temp)}&deg;
          </p>
        
          <p>
            Feels like 
            {Math.round(weatherDatas.current.feels_like)}
          </p>
          <p className="capitalize">
            {weatherDatas.current.weather[0].description}
          </p>
          <img 
            className="w-[150px] h-auto"
            src={`http://openweathermap.org/img/wn/${weatherDatas.current.weather[0].icon}@2x.png`}
            alt=""
          />
        </div>
          
        <hr className='border-white border-opacity-10 border w-full'/>
        
        {/** Hourly Weather */}
        <div className="max-w-screen-md w-full py-12">
          <div className="mx-8 text-white">
            <h2 className="mb-4">Hourly Weather</h2>
            <div className="flex gap-10 overflow-hidden hover:overflow-x-scroll">
              {weatherDatas.hourly.map((h: any) => <div key={h.dt} className="flex flex-col gap-4 items-center">
                <p className='whitespace-nowrap text-md'>
                  {new Date(h.currentTime).toLocaleTimeString("en-us", {hour: "numeric",})}
                </p>
                <img 
                    className="w-auto h-[50px] object-cover"
                    src={`http://openweathermap.org/img/wn/${h.weather[0].icon}@2x.png`}
                    alt=""
                  />
                <p className="text-xl">
                  {Math.round(h.temp)}&deg;
                </p>
              </div>)}
            </div>
          </div>
        </div>

        <hr className='border-white border-opacity-10 border w-full'/>
        
        {/** Weekly Weather */}
        <div className="max-w-screen-md w-full  py-12">
          <div className="mx-8 text-white">
            <h2 className="mb-4">7 Day Forecast</h2>
            {weatherDatas.daily.map((d: any) => <div key={d.dt} className="flex items-center w-full">
              <p className="flex-1">
                {new Date(d.dt * 1000).toLocaleString("en-us", { weekday: "long"})}
              </p>
              <img 
                className="w-[50px] h-[50px] object-cover"
                src={`http://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`}
                alt=""
              />
              <div className="flex gap-2 flex-1 justify-end">
                <p>H: {Math.round(d.temp.max)}</p>
                <p>L: {Math.round(d.temp.min)}</p>
              </div>
            </div>)}
          </div>
        </div>

        <div 
          className="flex items-center gap-2 py-12 text-white cursor-pointer duration-150 hover:text-red-500"
          onClick={removeCity}
        >
          <i className="fa-solid fa-trash" />
          <p>Remove City</p>
        </div>
       

      </>
    )}
  </div>
}

export default AsyncCityView