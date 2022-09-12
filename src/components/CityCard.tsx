import { createSearchParams, useNavigate } from "react-router-dom";

const CityCard: React.FC<{
  city: string,
  state: string,
  temp: number,
  temp_max: number,
  temp_min: number,
  id: string,
  lon: number,
  lat: number,

}> = ({city, state, temp, temp_max, temp_min, lon, lat, id}) => {
  const navigate = useNavigate()
  const goToPreview = () => {
    navigate({
      pathname: `/weather/${state}/${city}`,
      search: createSearchParams({
        lat: lat.toString(),
        lon: lon.toString(),
        preview: "true",
        id: id,
      }).toString()
    });
  }
  
  return (
    <div className="flex py-6 px-3 bg-weather-secondary rounded shadow-md cursor-pointer" onClick={goToPreview}>
      <div className="flex flex-col flex-1">
        <h2 className="text-3xl">{city}</h2>
        <h3>{state}</h3>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-3xl self-end">
          {Math.round(temp)}&deg;
        </p>
        <div className="flex gap-2">
          <span className="text-xs">
            H: {Math.round(temp_max)}&deg;
          </span>
          <span className="text-xs">
            L: {Math.round(temp_min)}&deg;
          </span>
        </div>
      </div>
    </div>
  )
}

export default CityCard;
