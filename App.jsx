import { useState, useEffect, useContext } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './src/pages/Home.page'
import User from './src/pages/User.page'
import Auth from './src/pages/Auth.page'
import NavBar from './src/components/NavBar'
import Favorites from './src/pages/Favorites.page';
import HomeSingleEl from './src/components/HomeSingleEl';
import Appointments from './src/pages/Appointments';
import { UserContext } from './src/context/User';
import UserCardEdit from './src/components/UserCardEdit';
import Cart from './src/pages/Cart';
import ThemeBtn from './src/context/ThemeBtn';
import { ThemeProvider } from './src/context/Theme';
// import { Toggle } from './toggle/Toggle';
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
