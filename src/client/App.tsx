import Home from './Home';
import Navbar from './Navbar';
import About from './About';
import Tradepage from './Tradepage';
import Buysellpage from './Buysellpage';
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
        <Route path='/about' element={<About />}></Route>
        <Route path='/buysell' element={<Buysellpage />}></Route>
        <Route path='/trade' element={<Tradepage />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='*' element={<Errorpage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
