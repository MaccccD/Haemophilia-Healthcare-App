import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { FaHome,FaBell, FaCog,FaSignOutAlt } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import  appLogoImage from "../Images/Apps Logo.png"
import  profileImage from "../Images/Profile.png";
import Logout from '../Main Pages/Logout';
import { path } from 'd3';



function NavBar() {
  //get the user's names that tehy used to create account and login to welcome them. (personal touch):
const username = JSON.parse(localStorage.getItem("userDetails"));

//use Location path retrieval:
const location = useLocation();

//checking if path is active :
const isActive = (path) => location.pathname === path;

  return (
     <div className='sidebar'>
        <img src= {appLogoImage} alt='App-Logo' className='logo' title='Logo'/>
        <img src={profileImage} alt='user profile picture' className='user-profile' title='User profile picture'/>
         <p className='username'>{username?.fullNames || 'User'}</p>

         <nav className='nav-Links'>
           <Link to={"/"} className= {`nav-item ${isActive('/') ? 'active' : ''}`}><FaHome className='nav-icon'/><span>Home</span></Link> 
           <Link to={"/HealthMetrics"} className= {`nav-item ${isActive('/HealthMetrics') ? 'active' : ''}`}><MdDashboard className= 'nav-icon'/><span>Health</span></Link>
           <Link to={"/Notifications"} className= {`nav-item ${isActive('/Notifications') ? 'active' : ''}`}><FaBell className='nav-icon'/><span>Notifications</span></Link>
           <Link to={"/Settings"} className= {`nav-item ${isActive('/Settings')? 'active': ''}`}><FaCog className='nav-icon'/><span>Settings</span></Link>
         </nav>
         <Logout/>  
     </div>
  );
}

export default NavBar;
