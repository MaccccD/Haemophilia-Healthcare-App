import React from 'react'
import { Link } from 'react-router-dom';
import { FaHome,FaBell, FaCog,FaSignOutAlt } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import  appLogoImage from "../Images/Apps Logo.png"
import  profileImage from "../Images/Profile.png";
import Logout from '../Main Pages/Logout';



function NavBar() {
  //get the user's names that tehy used to create account and login to welcome them. (personal touch):
const username = JSON.parse(localStorage.getItem("userDetails"));
  return (
    <div className='sidebar'>
        <img src= {appLogoImage} alt='App-Logo' className='logo'/>
        <img src={profileImage} alt='user profile picture' className='user-profile'/>
         <p className='username'>{username?.fullNames || 'User'}</p>

         <nav className='nav-Links'>
           <Link to={"/"} className='nav-item'><FaHome className='nav-icon'/><span>Home</span></Link> 
           <Link to={"/HealthMetrics"} className='nav-item'><MdDashboard className= 'nav-icon'/><span>Health</span></Link>
           <Link to={"/Notifications"} className='nav-item'><FaBell className='nav-icon'/><span>Notifications</span></Link>
           <Link to={"/Settings"} className='nav-item'><FaCog className='nav-icon'/><span>Settings</span></Link>
         </nav>
          
         <Logout/>
         
    </div>
  )
}

export default NavBar;
