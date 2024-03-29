import './App.scss';
import Header from './components/Header/Header';
import StoreScreen from './components/StoreScreen/StoreScreen';
import Contacts from './components/Contacts/Contacts';
import Reviews from './components/Reviews/Reviews';
import Partners from './components/Partners/Partners';
import Assortment from './components/Assortment/Assortment';
import AboutUs from './components/AboutUs/AboutUs';
import MainPage from './components/MainPage/MainPage';
import { Route, Router, Routes } from 'react-router-dom';
import ItemDialog from './components/StoreScreen/ItemDialog/ItemDialog';
import Cart from './components/Cart/Cart';
import Admin from './components/Admin/Admin';
import Login from './components/Login/Login';


function App() {
  return (
    <div className='wrapper'>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/store" element={<StoreScreen />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/assortment" element={<Assortment />} />
          <Route path="/store/:goodCategory" element={<StoreScreen />} />
          <Route path="/cart" element={<Cart />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/login' element={<Login />} />
        </Routes>
    </div>
  );
}

export default App;
