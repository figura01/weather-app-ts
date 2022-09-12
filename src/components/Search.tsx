import { useRef, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import axios from 'axios'

interface IFeature {
  id: string,
  place_name: string,
  geometry:  {
    coordinates: string[]
  }
}

const Search: React.FC = () => {
  const navigate = useNavigate()
  const searchInputRef = useRef<HTMLInputElement>(null)

  const [data, setData] = useState<IFeature[]>([])
  const [searchError, setSearchError] = useState<Boolean>(false)

  const previewCity = (searchResult: IFeature) => {
    const [city, state] = searchResult.place_name.split(", ");
    
    const lat = searchResult.geometry.coordinates[1];
    const lng = searchResult.geometry.coordinates[0];
    navigate({
      pathname: `/weather/${state}/${city}`,
      search: createSearchParams({
        lat,
        lon: lng,
        preview: "true"
      }).toString()
    });
  }

  const getSearchResults = () => {
    
    const queryTimeout = setTimeout( async () => {
      if(!searchInputRef.current) {
        return;
      }
      else if(searchInputRef.current.value !== "") {
        setData([])
        try {
          const res = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchInputRef.current.value}.json?access_token=${process.env.REACT_APP_MAPBOX_API_KEY}&types=place`)
          const mapboxSearchResult = [...res.data.features];
          setData(mapboxSearchResult)

        } catch(err) {
          setSearchError(true)
        }
        setSearchError(false)
        return
      }
      
      clearTimeout(queryTimeout)
      
    }, 300)
  }
 
  return <>
      <input
        ref={searchInputRef}
        type="text"
        placeholder="Search for a city or state"
        className="py-2 px-1 w-full bg-transparent broder-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
        onChange={getSearchResults}
      />

      {data && searchInputRef.current && searchInputRef.current.value.length > 0 && (
        <ul className="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]">
          {searchError && (<p>Sorry, something went wrong, please try again.</p>)}
          {!searchError && data.length === 0 && searchInputRef.current.value.length >=2 && <p>No results match your query. try a different term.</p>}
         
          {data && data.map((feature) => {

            return <li 
              key={feature.id}
              className="py-2 cursor-pointer"
              onClick={()  => previewCity(feature)}
            >{feature.place_name}</li>
          })}
        </ul>
      )}
       
  </>
}

export default Search;