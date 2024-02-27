import React, { useState, useContext } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { HouseGear,Calendar, BookmarkHeart, BoxArrowRight,BookmarkHeartFill, Clock, Cart, PersonCircle } from "react-bootstrap-icons"
import "./NavBar.css"
import { UserContext } from '../context/User';
// import Navbar from 'react-bootstrap/Navbar';
// import Container from 'react-bootstrap/Container';

export default function NavBar() {
  const { user, SingOutClick, token }=useContext(UserContext);
    const [menu, setMenu]= useState("shop");
    const [favorites, setFavorites]= useState(2);


  return (
    <div>
        {
            user? (<div className="navbar">
          <div className='nav-logo'>
            <Clock/>
            <p>EasyBusy</p>
            </div>
            <ul className='nav-menu'>
                <li onClick={()=>{setMenu("home")}}>
                <Link to="/home">Home <HouseGear/> </Link> 
                {menu==="home"?<hr></hr>:<></>}
                </li>
                <li onClick={()=>{setMenu("user")}}>
                <Link to="/profile">User <PersonCircle/></Link> 
                {menu==="user"?<hr></hr>:<></>}
                </li>
                <li onClick={()=>{setMenu("appointment")}}>
                <Link to="/appointment">Appointment <Calendar/></Link> 
                {menu==="appointment"?<hr></hr>:<></>}
                </li>
                <li onClick={()=>{setMenu("favorites")}}>
                <Link to="/favorites">Favorites <BookmarkHeartFill/></Link> 
                {menu==="favorites"?<hr></hr>:<></>}
                </li>
            </ul>
            <div className='nav-login-cart'>
            <button id='outBtn' onClick={SingOutClick}>SingOut</button>
                <Cart/>
                <div className='nav-card-count'>{favorites}</div>
                </div>
        </div>):(
              <div className="navbar">
              <div className='nav-logo'>
                <Clock/>
                <p>EasyBusy</p>
                </div>
                <ul className='nav-menu'>
                    <li onClick={()=>{setMenu("auth")}}>
                    <Link to="/auth">Auth <HouseGear/> </Link>
                    {menu==="auth"?<hr></hr>:<></>}
                    </li>
                    {/* <li onClick={()=>{setMenu("login")}}>
                    <Link to="auth/login">Login </Link> 
                    {menu==="login"?<hr></hr>:<></>}
                    </li>
                    <li onClick={()=>{setMenu("register")}}>
                    <Link to="auth/register">Register </Link> 
                    {menu==="register"?<hr></hr>:<></>}
                    </li> */}
                </ul>
            </div>)
}
    </div>
  )
}
