import './App.css';
import {Route , Routes} from 'react-router-dom'
import Home from './components/Home/Home'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer';
import UpdateProfile from './components/updateProfile/UpdateProfile.jsx';
import SearchResult from './components/SearchResult/SearchResult.jsx';
import Product from './components/ProductDescriptionPage/Product';
import Cart from './components/Cart/Cart';
import Login from './components/Login/Login';
import Account from './components/Account/Account';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './redux/actions/userAction';
import UpdatePassword from './components/updatePassword/UpdatePassword';
import MyOrders from './components/myOrders/MyOrders';
import ShippingInfo from './components/ShippingInfo/ShippingInfo';
import ConfirmOrder from './components/ConfirmOrder/ConfirmOrder';
import OrderSuccess from './components/OrderSuccess/OrderSuccess';
import UserOptions from './components/UserOptions/UserOptions';
import Dashboard from './components/DashBoard/Dashboard';
import ProductPage from './components/ProductPage/ProductPage';

// kapilsoni54768161@gmail.com

  function App() {
   const {user} = useSelector(state => state.user)
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
    <Route path='/update/profile' element={<UpdateProfile />}  />
    <Route path='/update/password' element={<UpdatePassword />}  />
    <Route path='/my-orders' element={<MyOrders />}  />
    <Route path='/shipping/info' element={<ShippingInfo />}  />
    <Route path='/order/confirm' element={<ConfirmOrder />}  />
    <Route path='/order/placed' element={<OrderSuccess />}  />
    <Route path='/admin/dashboard' element={<Dashboard />}  />
    <Route path='/admin/products' element={<ProductPage />}  />
    
    </Routes>
   
      {user ? <UserOptions user={user}/> : <></>}
    
<Footer />

    </>
  );
}

export default App;
