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
import Login from './auth/Login';
import Register from './auth/Register';

function App() {
  const { user, token } = useContext(UserContext);
  const [isUserLog, setUserLog] = useState([]);

  return (
    <Router>
      <NavBar />
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
