import axios from 'axios'
import {useState, useEffect} from 'react'
import CityCard from './CityCard';

export interface IWeather {
  id: number; 
  main: string, 
  description: string, 
  icon: string
}

export interface ISaveCity {
  id: number;
  main: {
    temp: number;
    temp_max:  number
    temp_min:  number
  },
  name:  string,
  weather: IWeather[],
  coords: {
    lon:  number;
    lat:  number;
  },
  key: string;
}

const CityList: React.FC = () => {
  const [savedCities, setSavedCities] = useState<{}[]>([])
  const getCities = async () => {
    if(localStorage.getItem('savedCities')) {
      const cities = JSON.parse(localStorage.getItem("savedCities") || "")
      
      const requests: any[] = [];
      cities.forEach((city: ISaveCity) => {
        requests.push(
          axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`)
        )
      });

      const weatherData = await Promise.all(requests)

      let localWeatherData: any[] = []

      weatherData.forEach((value, index) => {
        const newCity = {
          state: cities[index].state,
          city: cities[index].city,
          data: value.data,
          id: cities[index].id,
        }
        localWeatherData.push(newCity)
      })

      setSavedCities(localWeatherData)
    } 
  }
   

  useEffect(() => {
    getCities()
  }, [])

  return <div>
    {savedCities && savedCities.length > 0 && savedCities.map((c: any, i) => {
      return (
        <div key={`city_${c.id}_${i}`} className="mb-2">
          <CityCard city={c.city} state={c.state} temp={c.data.main.temp} temp_max={c.data.main.temp_max} temp_min={c.data.main.temp_min} id={c.id} lon={c.data.coord.lon} lat={c.data.coord.lat} />
        </div>
      )
    })}
  </div>
}

export default CityList