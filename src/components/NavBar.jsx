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
import { Toggle } from '../toggle/Toggle';
import '../toggle/Toggle.css'

export default function NavBar(props) {
  const { user, SingOutClick, token }=useContext(UserContext);
  const [menu, setMenu]= useState("shop");
  const { cartCount, getCarts} = props;

  useEffect(()=>{
    getCarts();
  },[])

  return (
    <div>
        {
            user? <div className="navbar">
          <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
          <Navbar.Brand href="#home">
            <img src={EasyBusyicon} style={{ width: '3rem', height: '3rem' }}/>
            <p>EasyBusy</p>
          </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <ul className='nav-menu'>
            <Toggle/>
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
                <li onClick={()=>{setMenu("cart")}}>
            {/* <div className='nav-login-cart'> */}
                <Link to="/cart">Cart 
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
        </div>:
        <Navbar expand="lg" className="bg-body-tertiary">
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
                    <Link to="/auth">Auth <HouseGear/> </Link>
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
