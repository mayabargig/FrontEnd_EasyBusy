import {React, useContext, useEffect, useState} from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { PhoneVibrate, Heart, SendCheck,Cart, Trash3Fill, HeartFill} from "react-bootstrap-icons"
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { APIBaseUrl } from '../config';
import { UserContext } from '../context/User';
import axios from 'axios';

export default function FavoritesCard(props) {
  const { favorites, getFavorites, deleteFav} = useContext(UserContext);
    const [isLiked, setLiked] = useState(true);
    const [fav, setFav] = useState([null]);
    const {item}= props;

    useEffect(()=>{
            getFavPro();
      },[favorites]);

      useEffect(()=>{
        getFavorites();
  },[]);

    const getFavPro = async () => {
        try {
            const isFav = !favorites?.forEach((pro) => pro._id === item.product);
            if (isFav) {
            const {data} = await axios.get(`${APIBaseUrl}/products/${item.product}/`);
                setFav({data:data, id:item._id});
        }
        } catch (error) {
            setFav([null])
            console.log(error);
        }
    };

      const clickFav = (id)=>{
        if(isLiked){
            setLiked(false);
            deleteFav(id);
        }else{
            setLiked(true);
        }
        toggleMode();
    };
  
    const toggleMode = (id)=>{
          setLiked(!isLiked);
      };

  return (
          fav.data?(
      <div className='productCard'>
        {
                <Card style={{ width: '18rem', border:"1.5px solid white", boxShadow:"1px 2px 3px 2px black" }} 
                className=' dark:text-white dark:bg-black'>
                <div className='divHearts'>
                    <div>
                    {
                         isLiked ? <HeartFill className='likedBtn' color='red' onClick={()=>clickFav(fav.id)}/>
                         : <Heart className='likedBtn' color='red' onClick={()=>clickFav(fav.id)}/>
                      }
                    </div>
                    {/* <div>
                      <Trash3Fill className='removeBtn'/>
                    </div> */}
                </div>
                  {
                      fav.data.imgSrc?
                      (
                          <Card.Img variant="top" src={fav.data.imgSrc}/>
                      ):
                      (
                          <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi7Z6nS0paslUx7X-rSOyNqmhge_ugyoMcFA&usqp=CAU"/>
                      )
                  }
                <Card.Body>
                  <Card.Title>{fav.data.title}</Card.Title>
                  <Card.Text>
                    For Details Call
                     052-8612326 <PhoneVibrate/>
                  </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item className=' dark:text-white dark:bg-black'> {fav.data.price} $</ListGroup.Item>
                  <ListGroup.Item className=' dark:text-white dark:bg-black'>category</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                <Button variant="primary" className='btn-primary'>
                      <Link to={`/products/${fav.data.id}`} className="GoToLink" >
                      See More <SendCheck/>
                      </Link>
                    </Button>
                    <button type="button" className="btn btn-outline-danger">
             Add To Card <Cart/></button>
                </Card.Body>
              </Card>
                
            }
            </div>
            ):null
  )
}
