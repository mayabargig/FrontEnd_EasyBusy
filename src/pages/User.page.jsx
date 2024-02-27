import {React, useContext} from 'react'
import { UserContext } from '../context/User'
import UserCard from '../components/UserCard';


export default function User() {
  const { user }=useContext(UserContext);

  return (
    <div>
      <UserCard/>
    </div>
  );
}
