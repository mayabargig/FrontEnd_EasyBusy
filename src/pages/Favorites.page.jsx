import React, { useContext, useEffect, useState } from 'react'
import { APIBaseUrl } from '../config';
// import HomeCard from '../components/HomeCard';
import FavoritesCard from '../components/FavoritesCard';
import { UserContext } from '../context/User';
import axios from 'axios';


export default function Favorites() {
  const { user, favorites, setFavorites, getFavorites} = useContext(UserContext);
  // const [favorites, setFavorites] = useState([]);

  useEffect(()=>{
    getFavorites();
  },[]);

  // const deleteFav = async(id)=>{
  //   console.log(id);
  //   try {
  //     const res = await axios(`${APIBaseUrl}/favorites/${id}`, {
  //       method:"DELETE"
  //     });
  //     if(res.status === 200){
  //       const filtered = favorites.filter((item)=>{
  //         return item.id !== id;
  //       });
  //       setFavorites([...filtered]);
  //       getFavorites();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
    // console.log(favorites);
    
  return (
    <div>
    {
     favorites?.length > 0 ? (
      <div id="productsContainer">
        {favorites.map((item) => (
            <FavoritesCard
              item={item}
            />
        ))}
      </div>
    ) : (
      <h1>No Favorites Added Yet...</h1>
    )}
  </div>
  )
}
