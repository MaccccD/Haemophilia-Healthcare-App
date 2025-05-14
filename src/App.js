import "./Styles/App.css";
import { BrowserRouter, Routes, Route, replace } from "react-router-dom";
import Home from "./Main Pages/Home";
import HealthMetrics from "./Main Pages/HealthMetrics";
import Notifications from "./Main Pages/Notifications";
import Settings from "./Main Pages/Settings";
import AccountSetUpPage1 from "./Main Pages/AccountSetUpPage1";
import AccountSetUpPage2 from "./Main Pages/AccountSetUpPage2";
import HealthConditionSetUp from "./Main Pages/HealthConditionSetUp";
import AuthContextProvider from "./Context/AuthContext";
import { useContext } from 'react';
import { userAuthenticate } from './Context/AuthContext';
import { Navigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import NavBar from "./Main Components/NavBar";

function ProtectedRoute({children}){
  const {authenticate} = useContext(userAuthenticate);
  const location = useLocation();
 //here im ensuring that the patients get directed to where they create an account first before anywhere else
  if(!authenticate){
   return <Navigate to="/AccountSetUpPage1" state={{ from: location }} replace/>;
  }
  return children;
 }

function App() {
  return (
    <BrowserRouter>
    <AuthContextProvider>
       <Routes>
        <Route path="/" element = {<ProtectedRoute><Home/><NavBar/></ProtectedRoute>}/>
        <Route path="/HealthMetrics" element = {<ProtectedRoute><HealthMetrics/></ProtectedRoute>}/>
        <Route path="/Notifications" element = {<ProtectedRoute><Notifications/></ProtectedRoute>}/>
        <Route path="/Settings" element = {<ProtectedRoute><Settings/></ProtectedRoute>}/>
        <Route path="/AccountSetUpPage1" element = {<AccountSetUpPage1/>}/>
        <Route path="/AccountSetUpPage2" element = {<AccountSetUpPage2/>}/>
        <Route path="/HealthConditionSetUp" element = {<HealthConditionSetUp/>}/>
        <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
