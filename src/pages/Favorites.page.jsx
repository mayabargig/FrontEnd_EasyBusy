import React, { useContext, useEffect } from 'react'
import FavoritesCard from '../components/FavoritesCard';
import { UserContext } from '../context/User';


export default function Favorites() {
  const { favorites, getFavorites} = useContext(UserContext);

  useEffect(()=>{
    getFavorites();
  },[]);
    
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
