import "./Styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Main Pages/Home";
import HealthMetrics from "./Main Pages/HealthMetrics";
import Notifications from "./Main Pages/Notifications";
import Settings from "./Main Pages/Settings";
import AccountSetUpPage1 from "./Main Pages/AccountSetUpPage1";
import AccountSetUpPage2 from "./Main Pages/AccountSetUpPage2";
import HealthConditionSetUp from "./Main Pages/HealthConditionSetUp";

function App() {
  return (
    <BrowserRouter>
    <Routes>
       <Route path="/AccountSetUpPage1" element = {<AccountSetUpPage1/>}/>
       <Route path="/AccountSetUpPage2" element = {<AccountSetUpPage2/>}/>
       <Route path="/HealthConditionSetUp" element = {<HealthConditionSetUp/>}/>
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
