import React, { useState } from 'react';
import './App.css';
import {Route , Routes} from 'react-router-dom'
import Home from './components/Home/Home'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer';
import SearchResult from './components/SearchResult/SearchResult.jsx';
import Product from './components/ProductDescriptionPage/Product';
import Cart from './components/Cart/Cart';
function App() {
  return (
    <>
<Header />

    <Routes>
    < Route path='/' element={<Home/>} />
    < Route path='/products/:name' element={<SearchResult/>} />
    <Route path='/products/item/:id' element={<Product />} />
    <Route path='/cart' element={<Cart />} />
    </Routes>
  
<Footer />
    </>
  );
}

export default App;
