import React from 'react';
import Navigation from './components/Navigation';

import {
  Outlet
} from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-weather-primary">
      <Navigation />

      <Outlet></Outlet>
      
    </div>
  );
}

export default App;
