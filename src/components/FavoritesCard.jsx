import {React, useContext, useEffect, useState} from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { PhoneVibrate, Heart, SendCheck,Cart, Trash3Fill, HeartFill} from "react-bootstrap-icons"
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { APIBaseUrl } from '../config';
import { UserContext } from '../context/User';

export default function FavoritesCard(props) {
    const [isLiked, setLiked] = useState(true);
    const [fav, setFav] = useState([null]);
    const [favs, setFavs] = useState([]);
    const { user } = useContext(UserContext);
    const {item, favorites, setFavorites, deleteFav}= props;

  console.log(item);
    // console.log(item.userId, user.id);
    useEffect(()=>{
        if(item.userId===user.id){
            getFavPro();
        }
      },[favorites]);

    const getFavPro = async () => {
        try {
            const isFav = !favorites?.forEach((pro) => pro._id === item.product);
            console.log(isFav);
            if (isFav) {
            const res = await fetch(`${APIBaseUrl}/products/${item.product}/`);
            const data = await res.json();
                setFav({data:data, id:item._id});
                setFavs((prevFavorites) => [...prevFavorites, data, {id:item._id}]);
        }
        } catch (error) {
            setFav([null])
            console.log(error);
        }
    };
// console.log(favs);
    //   console.log(fav);

      const clickFav = (id)=>{
        // console.log(id);
        // const isLike = !favorites?.includes(id);
        // console.log(isLiked);
        
        if(isLiked){
            setLiked(false);
            // console.log(isLike);
            // addFavProduct(id, user);
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
          (fav.data)&&(item.userId===user.id)?(
      <div className='productCard'>
        {
                <Card style={{ width: '18rem' }}>
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
                  <ListGroup.Item> {fav.data.price} $</ListGroup.Item>
                  <ListGroup.Item>category</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                <Button variant="primary">
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
