
import Search from '../components/Search'
import CityList from '../components/CityList'
const HomeView = () => {
  return <main className="container text-white">
    <div className="pt-4 mb-8 relative">
      <Search />
    </div>

    <div className="flex flex-col gap-4">
      <CityList />
    </div>
  </main>
}

export default HomeView;