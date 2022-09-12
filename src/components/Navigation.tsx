import { useState, useEffect } from 'react'
import { Link, useParams, useSearchParams, useNavigate, useLocation } from "react-router-dom"
import {uid} from 'uid';
import BaseModal from "./BaseModal"
import { CSSTransition } from 'react-transition-group'

export interface ILocationObj {
  id: string;
  state: string;
  city: string;
  coords: {
    lat: string | null;
    lon: string | null;
  }
}

const Navigation: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeModal, setActiveModal] = useState<boolean>(false)
  const [isDisabled, setIsDisabled] = useState<boolean>(false)
  const {state, city} = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  const id = searchParams.get('id');
  const toggleModal = () => {
    setActiveModal(!activeModal)
  }

  const addCity = () => {
    let localStore: ILocationObj[] = [];
    if(localStorage.getItem('savedCities')) {
      let currentStorage = JSON.parse(localStorage.getItem("savedCities") || "");
      const locationObj: ILocationObj = {
        id: uid(),
        state: state || "",
        city: city || "",
        coords: {
          lat: lat || null,
          lon: lon || null,
        }
      }
      currentStorage.push(locationObj)
      localStorage.setItem('savedCities', JSON.stringify(currentStorage))
    } else {
      const locationObj: ILocationObj = {
        id: uid(),
        state: state || "",
        city: city || "",
        coords: {
          lat: lat || null,
          lon: lon || null,
        }
      }
      localStore.push(locationObj)
      localStorage.setItem('savedCities', JSON.stringify(localStore))
    }

    const param = searchParams.get('preview');
    if(param) {
      searchParams.delete('preview')
      setSearchParams(searchParams)
    }
    navigate('/')
  }

  useEffect(() => {
    
    if(localStorage.getItem("savedCities") && id) {
      const localData = JSON.parse(localStorage.getItem("savedCities") || "")
      const res = localData.find((c: any) => (c.id === id))
     
      if(res && res.length > 0 ){
        setIsDisabled(true)
      } else {
        setIsDisabled(false)
      }
      
    } else {
      // no localStorage
      setIsDisabled(true)
    }
    
  }, [location, id])

  useEffect(() => {
    if (location.pathname === '/') {
      setIsDisabled(false)
    }
  }, [location.pathname])

  return <header className="sticky top-0 bg-weather-primary shadow-lg">
    <nav
      className="container flex flex-col sm:flex-row items-center gap-4 text-white py-6"
    >
      <Link to="/" >
        <div className="flex items-center gap-3 ">
          <i className="fa-solid fa-sun text-2xl" />
          <p className="text-2xl">The lLocal Weather</p>
        </div>
      </Link>

      <div className="flex gap-3 flex-1 justify-end">
        <i 
          className="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-150 cursor-pointer" 
          onClick={toggleModal}
        />
        {isDisabled && (
          <i 
            className="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer"
            onClick={addCity}
          />
        )}
      </div>
  
      <CSSTransition
        in={activeModal}
        timeout={400}
        classNames="modal-outer"
        unmountOnExit
      >
          
            <BaseModal activeModal={activeModal} onToggleModal={toggleModal} classes="modal-outer">
              <div className="text-black">
                <h1 className="text-2xl mb-1">About:</h1>
                <p className="mb-4">
                  The Local Weather allows you to track the current and
                  future weather of cities of your choosing.
                </p>
                <h2 className="text-2xl">How it works:</h2>
                <ol className="list-decimal list-inside mb-4">
                  <li>
                    Search for your city by entering the name into the
                    search bar.
                  </li>
                  <li>
                    Select a city within the results, this will take
                    you to the current weather for your selection.
                  </li>
                  <li>
                    Track the city by clicking on the "+" icon in the
                    top right. This will save the city to view at a
                    later time on the home page.
                  </li>
                </ol>

                <h2 className="text-2xl">Removing a city</h2>
                <p>
                  If you no longer wish to track a city, simply select
                  the city within the home page. At the bottom of the
                  page, there will be am option to delete the city.
                </p>
              </div>
            </BaseModal>
         

       </CSSTransition>

    </nav>
  </header>
}

export default Navigation