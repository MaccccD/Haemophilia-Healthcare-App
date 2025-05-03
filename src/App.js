import "./Styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Main Pages/Home";
import HealthMetrics from "./Main Pages/HealthMetrics";
import Notifications from "./Main Pages/Notifications";
import Settings from "./Main Pages/Settings";
import NavBar from "./Main Components/NavBar";

function App() {
  return (
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path="/" element= {<Home/>}/>
      <Route path="/HealthMetrics" element= {<HealthMetrics/>}/>
      <Route path="/Notifications" element= {<Notifications/>}/>
      <Route path="/Settings" element= {<Settings/>}/>
      <Route path='*' element= {<Home/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
