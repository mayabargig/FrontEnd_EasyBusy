import React, { useContext, useEffect, useState } from 'react'
import HomeCard from '../components/HomeCard';
import HomeSingleEl from '../components/HomeSingleEl';
import { APIBaseUrl } from '../config';
import HomeCardEdit from '../components/HomeCardEdit';
import {PlusCircleFill} from 'react-bootstrap-icons'
import { UserContext } from '../context/User';


export default function Home() {
  const { user } = useContext(UserContext);
  const [products, setProducts]= useState([]);
  const [isClick, setClick]= useState(false);
 
  useEffect(()=>{
    getProducts();
  },[])

  const getProducts = ()=>{
    fetch(`${APIBaseUrl}/products`)
    .then(res=> res.json())
    .then(res=>{
      setProducts(res);
    })
    .catch(err=> console.log(err))
  }

  const addLink = ()=>{
    setClick(!isClick);
  };

  return (
    <div className=' dark:text-white dark:bg-black'>
      {isClick?(
        <HomeCardEdit setProducts={setProducts} products={products} addLink={addLink}/>
        ):(
          <div>
            <h1>All My Products...
              {
              user.role === "admin"?(
                <button onClick={addLink}type="button" className="btn btn-gray dark:text-white dark:bg-black" title='Add Product'> <PlusCircleFill/></button>
              ):null 
              }
            </h1>
          <div id='productsContainer'>
      {
        products.map((item, i)=>{
          return <HomeCard item={item} key={`prod_${i}`}
          setProducts={setProducts} products={products}/>
        })
      }
      </div>
      </div>
      )}
    </div>
  )
}
