import React, { useState, useContext, useEffect } from 'react'
import { Link } from "react-router-dom";
import { HouseGear,Calendar ,BookmarkHeartFill, Cart, PersonCircle } from "react-bootstrap-icons"
import "./NavBar.css"
import { UserContext } from '../context/User';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import EasyBusyicon from '../images/EasyBusyicon.png'
import ThemeBtn from '../context/ThemeBtn';

export default function NavBar(props) {
  const { user, SingOutClick, cartCount }=useContext(UserContext);
  const [menu, setMenu]= useState("shop");
  const [lengthCart, setLengthCart] = useState()
  const { themeMode} = props;

  useEffect(()=>{
    setLengthCart(cartCount);
  },[cartCount]);

  return (
    <div className=' dark:text-white dark:bg-black'>
        {
            user? <div id="navbar">
          <Navbar expand="lg"
            className={themeMode === "dark" ? "navbar navbar-dark bg-dark" 
            : "navbar navbar-light"} >
          <Container>
          <button
                        type="button"
                        className="relative rounded-full p-1 m-3 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800  dark:text-white dark:bg-black"
                        >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <ThemeBtn aria-hidden="true" />
                      </button>
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
                <Link className=' dark:text-white' to="/cart">Cart 
                <Cart/>
                <div className='nav-card-count'>{lengthCart}</div>
                </Link> 
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
          <Nav className="me-auto">
                    <li onClick={()=>{setMenu("auth")}}>
                    <Link className=' dark:text-white' to="/auth">Auth <HouseGear/> </Link>
                    {menu==="auth"?<hr></hr>:<></>}
                    </li>
                    </Nav>
        </Navbar.Collapse>
          <ThemeBtn aria-hidden="true"/>
          </Container>
          </Navbar>
}
    </div>
  )
}
