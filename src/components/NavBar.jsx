import React, { useState, useContext, useEffect } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { HouseGear,Calendar, BookmarkHeart, BoxArrowRight,BookmarkHeartFill, Clock, Cart, PersonCircle } from "react-bootstrap-icons"
import "./NavBar.css"
import { UserContext } from '../context/User';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import EasyBusyicon from '../images/EasyBusyicon.png'
// import { Toggle } from '../toggle/Toggle';
import '../toggle/Toggle.css'

export default function NavBar(props) {
  const { user, SingOutClick, token, cartCount, getCarts }=useContext(UserContext);
  const [menu, setMenu]= useState("shop");
  const { themeMode} = props;

  useEffect(()=>{
    getCarts();
  },[]);

  return (
    <div className=' dark:text-white dark:bg-black'>
        {
            user? <div id="navbar">
          <Navbar expand="lg"
            className={themeMode === "dark" ? "navbar navbar-dark bg-dark" 
            : "navbar navbar-light"} >
          <Container>
          <Navbar.Brand href="#home">
            <img src={EasyBusyicon} style={{ width: '3rem', height: '3rem' }}/>
            <p>EasyBusy</p>
          </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <ul className='nav-menu'>
                <li onClick={()=>{setMenu("home")}}>
                <Link className=' dark:text-white' to="/home">Home <HouseGear/> </Link> 
                {menu==="home"?<hr></hr>:<></>}
                </li>
                <li onClick={()=>{setMenu("user")}}>
                <Link className=' dark:text-white' to="/profile">User <PersonCircle/></Link> 
                {menu==="user"?<hr></hr>:<></>}
                </li>
                <li onClick={()=>{setMenu("appointment")}}>
                <Link className=' dark:text-white' to="/appointment">Appointment <Calendar/></Link> 
                {menu==="appointment"?<hr></hr>:<></>}
                </li>
                <li onClick={()=>{setMenu("favorites")}}>
                <Link className=' dark:text-white' to="/favorites">Favorites <BookmarkHeartFill/></Link> 
                {menu==="favorites"?<hr></hr>:<></>}
                </li>
                <li onClick={()=>{setMenu("cart")}}>
            {/* <div className='nav-login-cart'> */}
                <Link className=' dark:text-white' to="/cart">Cart 
                <Cart/>
                <div className='nav-card-count'>{cartCount}</div>
                </Link> 
                {/* </div> */}
                {menu==="cart"?<hr></hr>:<></>}
                </li>
                <li>
            <button id='outBtn' onClick={SingOutClick}>SingOut</button>
                </li>
            </ul>
          </Nav>
          </Navbar.Collapse>
          </Container>
          </Navbar>
        </div>
        :
        <Navbar expand="lg"  className={themeMode === "dark" ? "navbar navbar-dark bg-dark" 
        : "navbar navbar-light"} >
          <Container>
          <Navbar.Brand href="#home">
          <img src={EasyBusyicon} style={{ width: '3rem', height: '3rem' }}/>
            <p>EasyBusy</p>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
              {/* <div className='nav-logo'>
                <Clock/>
                <p>EasyBusy</p>
                </div> */}
          <Nav className="me-auto">
                    <li onClick={()=>{setMenu("auth")}}>
                    <Link className=' dark:text-white' to="/auth">Auth <HouseGear/> </Link>
                    {menu==="auth"?<hr></hr>:<></>}
                    </li>
                    </Nav>
        </Navbar.Collapse>
          </Container>
          </Navbar>
}
    </div>
  )
}
