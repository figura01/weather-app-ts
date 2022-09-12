import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/tailwind.css';
import App from './App';
import HomeView from './views/HomeView'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import CityView from './views/CityView';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomeView />} />
          <Route path="weather/:state/:city" element={<CityView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

