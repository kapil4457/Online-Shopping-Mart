import React from 'react';
import './App.css';
import {Route , Routes} from 'react-router-dom'
import Home from './components/Home/Home'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
<Header />

    <Routes>
    < Route path='/' element={<Home/>} />
    </Routes>
  
<Footer />
    </>
  );
}

export default App;
