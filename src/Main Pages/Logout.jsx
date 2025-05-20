import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAuthenticate } from '../Context/AuthContext';


function Logout() {

    const {LogOut} = useContext(userAuthenticate);
    const navigate = useNavigate();

    function HandleLogOut(event){
     event.preventDefault();
     if(LogOut){
        navigate("/Login");
        return;
     }
    }
  return (
    <div>
      <button className='nextBtn' onClick={HandleLogOut}>LogOut</button>
    </div>
  )
}

export default Logout;
