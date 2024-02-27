import {React, useEffect, createContext, useState} from 'react'
import { APIBaseUrl } from '../config';
import axios from 'axios';

export const UserContext = createContext({});

export default function UserProvider({children}) {
    const [user, setUser] = useState();
    console.log(user);
    const token = localStorage.getItem("user_token");

    
    const getUser = async()=>{
      console.log(token);
      try {
        const res = await axios.get(`${APIBaseUrl}/users/init-user`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // console.log(res.data);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(()=>{
      getUser();
    },[]);
    
    const SingOutClick = () => {
      if (confirm("Are you sure you want to Log Out?")) {
        alert("Goodbye! User Log Out");
        localStorage.removeItem("user_token");
        setUser(false);
      } else {
        alert("User Still Connected!");
      }
    };
  
    return (
      <UserContext.Provider value={{ token, user, setUser, SingOutClick }}>
        {children}
      </UserContext.Provider>
  );
}
