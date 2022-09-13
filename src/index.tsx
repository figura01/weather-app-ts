import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/tailwind.css';
import App from './App';
import HomeView from './views/HomeView'
import {
  HashRouter,
  Routes,
  Route
} from "react-router-dom";
import CityView from './views/CityView';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomeView />} />
          <Route path="weather/:state/:city" element={<CityView />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);

