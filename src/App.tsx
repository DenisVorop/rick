import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Episode from './pages/Episode/Episode';
import Seasons from './pages/Seasons/Seasons';

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path='/' element={<Seasons />} />
        <Route path='/episodes/:id' element={<Episode />}/>
      </Routes>
    </div>
  );
}

export default App;
