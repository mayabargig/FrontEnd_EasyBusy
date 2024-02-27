import React, { useEffect, useState } from 'react'
import { APIBaseUrl } from '../config';
// import HomeCard from '../components/HomeCard';
import FavoritesCard from '../components/FavoritesCard';


export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [products, setProduct]= useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    getFavorites();
  },[]);

  const getFavorites =async ()=>{
    fetch(`${APIBaseUrl}/favorites`)
    .then(res=> res.json())
    .then(res=>{
      setFavorites(res)
      setLoading(false);
    })
    .catch(err=> console.log(err))
    setLoading(false)
  }

  const deleteFav = async(id)=>{
    console.log(id);
    try {
      const res = await fetch(`${APIBaseUrl}/favorites/${id}`, {
        method:"DELETE"
      });
      if(res.status === 200){
        const filtered = favorites.filter((item)=>{
          // console.log(item);
          return item.id !== id;
        });
        setFavorites([...filtered]);
      }
    } catch (error) {
      console.log(error);
    }
  }

    // console.log(favorites);
    
  return (
    <div>
    {loading ? (
      <h1>Loading...</h1>
    ) : favorites.length > 0 ? (
      <div id="productsContainer">
        {favorites.map((item) => (
          <FavoritesCard
            // key={item.id} // Assuming 'id' is unique for each favorite
            item={item}
            deleteFav={deleteFav}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        ))}
      </div>
    ) : (
      <h1>No Favorites Added Yet...</h1>
    )}
  </div>
  )
}
