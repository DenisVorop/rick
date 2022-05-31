import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Character from './pages/Character/Character';
import Episode from './pages/Episode/Episode';
import Seasons from './pages/Seasons/Seasons';

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path='/' element={<Seasons />} />
        <Route path='/episodes/:id' element={<Episode />}/>
        <Route path='/characters/:id' element={<Character />}/>
      </Routes>
    </div>
  );
}

export default App;
