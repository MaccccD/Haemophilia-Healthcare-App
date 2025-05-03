import React from 'react'
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div>
      <Link to={"/"} style={{display: "block", color: "green", gap: 30, cursor:"pointer"}}>Home</Link> 
        <Link to={"/HealthMetrics"} style={{display: "block",color: "blue", gap: 30}}>Health</Link>
        <Link to={"/Notifications"}>Notifications</Link>
        <Link to={"/Settings"} style={{display: "block", color: "orange", gap:30}}>Settings</Link>
    </div>
  )
}

export default NavBar;
