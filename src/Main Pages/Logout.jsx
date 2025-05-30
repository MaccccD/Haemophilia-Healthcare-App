import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAuthenticate } from '../Context/AuthContext';
import { FaSignOutAlt } from 'react-icons/fa';


function Logout() {

    const {LogOut} = useContext(userAuthenticate);
    const navigate = useNavigate();

    function HandleLogOut(event){
     event.preventDefault();
     if(LogOut){
        navigate("/AccountSetUpPage1");
        return;
     }
    }
  return (
    <div className='logOut-Container'>
     <button onClick={HandleLogOut} className='logOut'><FaSignOutAlt className='logOut-icon'/>Log Out</button>
    </div>
  )
}

export default Logout;
