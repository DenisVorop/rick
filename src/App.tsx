import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import Character from './pages/Character/Character';
import Episode from './pages/Episode/Episode';
import Location from './pages/Location/Location';
import Locations from './pages/Locations/Locations';
import Seasons from './pages/Seasons/Seasons';

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path='/' element={<Seasons />} />
        <Route path='/locations' element={<Locations />} />
        <Route path='/episodes/:id' element={<Episode />}/>
        <Route path='/characters/:id' element={<Character />}/>
        <Route path='/locations/:name' element={<Location />}/>
      </Routes>
    </div>
  );
}

export default App;
