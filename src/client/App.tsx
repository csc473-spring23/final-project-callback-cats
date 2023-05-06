import Home from './Home';

import Adoptpage from './Adoptpage';
import Donatepage from './Donatepage';
import Catfactspage from './Catfactspage';
import Register from './Register';
import Login from './Login';
import Errorpage from './Errorpage';

import React, { useState } from 'react';

import { Routes, Route, RouteProps } from 'react-router-dom';

interface AppProps {
  path: string;
  element: React.ReactElement;
  exact?: boolean;
}

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/adopt' element={<Adoptpage />}></Route>
        <Route path='/donate' element={<Donatepage />}></Route>
        <Route path='/catfacts' element={<Catfactspage />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='*' element={<Errorpage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
