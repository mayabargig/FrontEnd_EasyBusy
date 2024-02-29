import { useState, useEffect, useContext } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home.page'
import User from './pages/User.page'
import Auth from './pages/Auth.page'
import NavBar from './components/NavBar'
import Favorites from './pages/Favorites.page';
import HomeSingleEl from './components/HomeSingleEl';
import Appointments from './pages/Appointments';
import { UserContext } from './context/User';
import UserCardEdit from './components/UserCardEdit';
import Cart from './pages/Cart';
import { APIBaseUrl } from './config';

function App() {
  const { user, token } = useContext(UserContext);
  const [isUserLog, setUserLog] = useState([]);
  const [cartCount, setCartCount]= useState();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    getCarts();
  },[])

  const getCarts =async ()=>{
    fetch(`${APIBaseUrl}/cart`)
    .then(res=> res.json())
    .then(res=>{
      setCart(res);
      setCartCount(res.length)
      setLoading(false);
    })
    .catch(err=> console.log(err))
    setLoading(false)
  }

  return (
    <Router>
      <NavBar cartCount={cartCount} getCarts={getCarts}/>
      {
        user ?
          <Routes>
            <Route path='/home' element={<Home
            />} />

            <Route path='/products/:id' element={<HomeSingleEl
            />} />

            <Route path='/profile/edit' element={<UserCardEdit
                        />} />

            <Route path='/profile' element={<User
            />} />

            <Route path='/favorites' element={<Favorites
            />} />
            <Route path='/appointment' element={<Appointments
            />} />
            <Route path='/cart' element={<Cart loading={loading} cart={cart}
            setCart={setCart} getCarts={getCarts}
            />} />
            <Route path='*' element={<Home />} />
          </Routes>
          :
          <Routes>
            <Route path='*' element={<Auth
              isUserLog={isUserLog} setUserLog={setUserLog} />} />
            {/* <Route path='auth/login' element={<Login/>} />
            <Route path='auth/register' element={<Register />} /> */}
          </Routes>
      }
    </Router>
  )
}

export default App
