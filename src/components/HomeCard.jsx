import {React, useContext, useEffect, useState} from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { PhoneVibrate, Heart, SendCheck, Trash3Fill, HeartFill, Cart} from "react-bootstrap-icons"
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { APIBaseUrl } from '../config';
import { UserContext } from '../context/User';
import axios from 'axios';

export default function HomeCard(props) {
  const { user , getCarts, favorites, getFavorites } = useContext(UserContext);
  const [isLiked, setLiked] = useState(true);
  const [cart, setCart] = useState([]);
  const {item, setProducts, products}= props;

  useEffect(()=>{
    getCarts();
    getFavorites();
    if(favorites){
      isProductLiked();
    }
  },[]);

  const isProductLiked = ()=>{
    favorites.map((fav)=>{
      if(fav.product === item._id){
        setLiked(false);
      }
    })
  }

    const clickFav = (id)=>{
      
      if(isLiked){
          setLiked(false);
          addFavProduct(id, user);
      }else{
          setLiked(true);
          //TODO: //need to make function that delete the product from favorites by id
          deleteFavByProId(id, user); 
      }
      toggleMode();
  };

  const toggleMode = (id)=>{
        setLiked(!isLiked);
    };

    const addFavProduct =async (productId, user)=>{
      try{
        const {data} = await axios.post(`${APIBaseUrl}/favorites/`, {product:productId, userId:user.id
        });
        isProductLiked();
      }
      catch(error){
        console.log(error);
      }
  }

  const addProductToCart =async (productId)=>{
    try{
      const {data} = await axios.post(`${APIBaseUrl}/cart`, {product:productId, userId:user.id})
      setCart([...cart,data.data]);
      getCarts();
    }
    catch(error){
      console.log(error);
    }
}

  const deleteProduct = async(id)=>{
    try {
      const res = await fetch(`${APIBaseUrl}/products/${id}`, {
        method:"DELETE"
      });
      if(res.status === 200){
        const filtered = products.filter((item)=>{
          return item.id !== id;
        });
        setProducts([...filtered]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const deleteFavByProId = async (productId, user) => {
    try {
        const res = await axios.delete(`${APIBaseUrl}/favorites/delete/${user.id}/${productId}`);
        getFavorites();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

  return (
    item?(

    <div className='productCard'>
      <Card style={{ width: '18rem', border:"1.5px solid white", boxShadow:"1px 2px 3px 2px black" }} 
      className=' dark:text-white dark:bg-black'>
      <div className='divHearts'>
          <div>
          {
               isLiked ? <Heart className='likedBtn' color='red' onClick={()=>clickFav(item.id)}/>
               : <HeartFill className='likedBtn' color='red' onClick={()=>clickFav(item.id)}/>
            }
          </div>
          <div>
            <Trash3Fill className='removeBtn' title="Delete" onClick={()=>deleteProduct(item.id)}/>
          </div>
      </div>
        {
            item.imgSrc?
            (
                <Card.Img variant="top" src={item.imgSrc}/>
            ):
            (
                <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi7Z6nS0paslUx7X-rSOyNqmhge_ugyoMcFA&usqp=CAU"/>
            )
        }
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text>
          For Details Call
           052-8612326 <PhoneVibrate/>
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item className=' dark:text-white dark:bg-black'> {item.price} $</ListGroup.Item>
        <ListGroup.Item className=' dark:text-white dark:bg-black'>Category: {item.category}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
      <Button variant="primary" className='btn-primary'>
            <Link to={`/products/${item.id}`} className="GoToLink" >
            See More <SendCheck/>
            </Link>
          </Button>
          <button onClick={()=>addProductToCart(item.id)} type="button" className="btn btn-danger">
             Add To Card <Cart/></button>
      </Card.Body>
    </Card>
    </div>
    ):null
  )
}
