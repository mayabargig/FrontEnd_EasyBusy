import {React, useEffect, createContext, useState} from 'react'
import { APIBaseUrl } from '../config';
import axios from 'axios';

export const UserContext = createContext({});

export default function UserProvider({children}) {
    const [user, setUser] = useState();
    const token = localStorage.getItem("user_token");
    const [cartCount, setCartCount] = useState(0);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);
    
    const getUser = async()=>{
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
      getCarts();
      getFavorites();
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

    const getCarts = async () => {
      try {
        const res = await axios.get(`${APIBaseUrl}/cart/${user.id}`);
        setCart(res.data);
        setCartCount(res.data.length)
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
      setLoading(false)
    }

    const getFavorites =async ()=>{
      try{
        const res = await axios.get(`${APIBaseUrl}/favorites/user/${user.id}`);
        setFavorites(res.data);
      }catch(error){
        console.log(error);
      }
    }

    const deleteFav = async(id)=>{
      try {
        const res = await axios(`${APIBaseUrl}/favorites/${id}`, {
          method:"DELETE"
        });
        if(res.status === 200){
          const filtered = favorites.filter((item)=>{
            return item.id !== id;
          });
          setFavorites([...filtered]);
          getFavorites();
        }
      } catch (error) {
        console.log(error);
      }
    }
  
    return (
      <UserContext.Provider value={{ token, user, setUser, SingOutClick, getCarts,
       cart, cartCount, setCart, loading, favorites, setFavorites, getFavorites, deleteFav}}>
        {children}
      </UserContext.Provider>
  );
}
