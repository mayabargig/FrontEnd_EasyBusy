import {React, useContext, useState} from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { PhoneVibrate, Heart, SendCheck, Trash3Fill, HeartFill, Cart} from "react-bootstrap-icons"
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { APIBaseUrl } from '../config';
import { UserContext } from '../context/User';

export default function HomeCard(props) {
  const { user } = useContext(UserContext);
  const [isLiked, setLiked] = useState();
  const [favorites, setFavorites] = useState([]);
  const {item, setProducts, products}= props;

    const clickFav = (id)=>{
      // console.log(id);
      const isLike = !favorites?.includes(id);
      // console.log(isLike);
      
      if(isLike){
          setLiked(false);
          console.log(isLike);
          addFavProduct(id, user);
      }else{
          setLiked(true);
      }
      toggleMode();
  };

  const toggleMode = (id)=>{
        setLiked(!isLiked);
    };

    const addFavProduct =async (productId, user)=>{
      console.log(user.id);
      console.log(productId);
      try{
        const res = await fetch(`${APIBaseUrl}/favorites/`, {
          method: "POST",
          headers:{
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({product:productId, userId:user.id})
        });
        const data= await res.json();
        setFavorites([...favorites,data.data]);
        // console.log(data);
      }
      catch(error){
        console.log(error);
      }
  }

  const deleteProduct = async(id)=>{
    console.log(id);
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

  return (
    item?(

    <div className='productCard'>
      <Card style={{ width: '18rem' }}>
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
        <ListGroup.Item> {item.price} $</ListGroup.Item>
        <ListGroup.Item>category</ListGroup.Item>
      </ListGroup>
      <Card.Body>
      <Button variant="primary">
            <Link to={`/products/${item.id}`} className="GoToLink" >
            See More <SendCheck/>
            </Link>
          </Button>
          <button type="button" className="btn btn-outline-danger">
             Add To Card <Cart/></button>
      </Card.Body>
    </Card>
    </div>
    ):null
  )
}
