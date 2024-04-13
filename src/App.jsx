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
import ThemeBtn from './context/ThemeBtn';
import { ThemeProvider } from './context/Theme';
import useLocalStorage from 'react-use-localstorage';

function App() {
  const { user, getCarts } = useContext(UserContext);
  const [isUserLog, setUserLog] = useState([]);
  const [themeMode, setThemeMode] = useState('light');

  useEffect(()=>{
    getCarts();
  },[]);

  const darkTheme = () => {
    setThemeMode('dark')
  }

  const lightTheme = () => {
    setThemeMode('light')
  }

  useEffect(() => {
    document.querySelector('html').classList.remove('dark', 'light')
    document.querySelector('html').classList.add(themeMode)
  }, [themeMode]);

  return (
    <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
      <Router>
        {/* <Toggle/> */}
        {/* <div  className=' dark:text-white dark:bg-black'   > dark</div> */}
        {/* <div  className=' dark:bg-black dark:text-white'></div>  */}
          <ThemeBtn />
        <NavBar themeMode={themeMode}/>
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
              <Route path='/cart' element={<Cart
                />} />
              <Route path='*' element={<Home />} />
            </Routes>
            :
            <Routes>
              <Route path='*' element={<Auth themeMode={themeMode}
                isUserLog={isUserLog} setUserLog={setUserLog} />} />
              {/* <Route path='auth/login' element={<Login/>} />
            <Route path='auth/register' element={<Register />} /> */}
            </Routes>
        }
      </Router>
    </ThemeProvider>
  )
}

export default App
