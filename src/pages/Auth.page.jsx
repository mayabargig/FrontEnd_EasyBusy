import {React, useState, useEffect, useContext} from 'react'
import Login from '../auth/Login'
import Register from '../auth/Register'
import { APIBaseUrl } from '../config';
import { UserContext } from '../context/User';
// import {background} from '../images/background.jpg'
import backgroundLight  from '../images/backgroundLight.jpg'
import  macDark from '../images/macDark.jpg'

export default function Auth (props) {
  const { isUserLog, setUserLog, themeMode}= props;
  const { user, setUser}=useContext(UserContext);
  // console.log(props);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [address, setAddress] = useState({});
 
    const toggleMode = ()=>{
        setIsLoginMode(!isLoginMode);
    };

    // useEffect(()=>{
    //   setUserLog(isUserLog);
    // },[isUserLog])

    const changeHandler= (e)=>{
      const { name, value } = e.target;
        setUserLog({...isUserLog,"address":address, [name]:value});
        console.log(isUserLog);
    };

    const handelSubmit= async (e)=>{
        e.preventDefault();
        console.log(e);
  
        try{
            if(isLoginMode){
              //login
              loginUser(isUserLog);
            }else{
              //register
              registerUser(isUserLog);
            }
        }catch(error){
            console.log(error);
        } 
    };

    const loginUser =async (user)=>{
      console.log(user);
      try{
        const res = await fetch(`${APIBaseUrl}/users/login`, {
          method: "POST",
          headers:{
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(user)
        });
        const data= await res.json();
        // console.log(data);
        setUser(data.user);
        const token = data.token;
        localStorage.setItem("user_token", token);
      }
      catch(error){
        console.log(error);
      }};

      const registerUser =async (isUserLog)=>{
        // console.log(user);
        try{
          const res = await fetch(`${APIBaseUrl}/users/register`, {
            method: "POST",
            headers:{
              'Content-Type': 'application/json'
            },
            body:JSON.stringify(isUserLog)
          });
          const data= await res.json();
          console.log(data);
          setUser(data.user);
          const token = data.token;
          localStorage.setItem("user_token", JSON.stringify(token));
          
        }
        catch(error){
          console.log(error);
        }}


  return (
    <div id="logSignP"  className="background  dark:text-white dark:bg-black"
    style={{ backgroundImage: `url(${themeMode === "dark"? `${macDark}`:`${backgroundLight}`})` }}>
    {
        isLoginMode ? <Login handelSubmit={handelSubmit} changeHandler={changeHandler}/> 
        : <Register handelSubmit={handelSubmit} changeHandler={changeHandler} 
        address={address} setAddress={setAddress} />
    }
    <br></br>
    <p onClick={toggleMode} id="logPara" className=' dark:text-white dark:bg-black'>
    {isLoginMode ? "Go To Create Account" : "Already Have Account ?" }
    </p>
    </div>
  )
}
