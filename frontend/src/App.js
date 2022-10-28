import './App.css';
import {Route , Routes} from 'react-router-dom'
import Home from './components/Home/Home'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer';
import SearchResult from './components/SearchResult/SearchResult.jsx';
import Product from './components/ProductDescriptionPage/Product';
import Cart from './components/Cart/Cart';
import Login from './components/Login/Login';
import Account from './components/Account/Account';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './redux/actions/userAction';


// kapilsoni54768161@gmail.com

  function App() {
    const dispatch  = useDispatch();
    useEffect(() => {
      dispatch(loadUser());
    }, []);
    return (
      
      <>

   

<Header />

    <Routes>
    < Route path='/' element={<Home/>} />
    < Route path='/products/:name' element={<SearchResult/>} />
    <Route path='/products/item/:id' element={<Product />} />
    <Route path='/cart' element={<Cart />} />
    <Route path='/login' element={<Login />}  />
    <Route path='/account' element={<Account />}  />
    
    </Routes>
<Footer />
    </>
  );
}

export default App;
