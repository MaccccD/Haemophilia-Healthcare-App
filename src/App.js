import "./Styles/App.css";
import "./Styles/NavBar.css";
import "./Styles/Home.css";
import "./Styles/Health.css";
import "./Styles/Notifications.css";
import "./Styles/Settings.css";
import "./Styles/Authenticate.css";
import { BrowserRouter, Routes, Route, replace } from "react-router-dom";
import Home from "./Main Pages/Home";
import HealthMetrics from "./Main Pages/HealthMetrics";
import Notifications from "./Main Pages/Notifications";
import Settings from "./Main Pages/Settings";
import AccountSetUpPage1 from "./Main Pages/AccountSetUpPage1";
import AccountSetUpPage2 from "./Main Pages/AccountSetUpPage2";
import HealthConditionSetUp from "./Main Pages/HealthConditionSetUp";
import BleedingData from "./Haemophilia Components/BleedingData";
import BloodTest from "./Haemophilia Components/BloodTest";
import ClottingLevels from "./Haemophilia Components/ClottingLevels";
import HaemophiliaLabResults from "./Haemophilia Components/HaemophiliaLabResults";
import JointPainTracker from "./Haemophilia Components/JointPainTracker";
import Medications from "./Haemophilia Components/Medications";
import Diabetes from "./Diabetes Components/Diabetes";
import DiabetesResults from "./Diabetes Components/DiabetesResults";
import BPResults from "./High Blood Pressure Components/BPResults";
import HighBloodPressure from "./High Blood Pressure Components/HighBloodPressure";
import Anxiety from "./Mental Health Components/Anxiety";
import Depression from "./Mental Health Components/Depression";
import MentalHealthResults from "./Mental Health Components/MentalHealthResults";
import PTSD from "./Mental Health Components/PTSD";
import Login from "./Main Pages/Login";
import AuthContextProvider from "./Context/AuthContext";
import Appointments from "./Main Components/Appointments";
import { useContext } from 'react';
import { userAuthenticate } from './Context/AuthContext';
import { Navigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import NavBar from "./Main Components/NavBar";
import Messages from "./Main Components/Messages";

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
        <Route path="/HealthMetrics" element = {<ProtectedRoute><HealthMetrics/><NavBar/></ProtectedRoute>}/>
        <Route path="/Notifications" element = {<ProtectedRoute><Notifications/><NavBar/></ProtectedRoute>}/>
        <Route path="/Settings" element = {<ProtectedRoute><Settings/><NavBar/></ProtectedRoute>}/>
        <Route path="/AccountSetUpPage1" element = {<AccountSetUpPage1/>}/>
        <Route path="/AccountSetUpPage2" element = {<AccountSetUpPage2/>}/>
        <Route path="/HealthConditionSetUp" element = {<HealthConditionSetUp/>}/>
        <Route path="/BleedingData" element = {<ProtectedRoute><BleedingData/><NavBar/></ProtectedRoute>}/>
        <Route path="/BloodTest" element = {<ProtectedRoute><BloodTest/><NavBar/></ProtectedRoute>}/>
        <Route path="/ClottingLevels" element = {<ProtectedRoute><ClottingLevels/><NavBar/></ProtectedRoute>}/>
        <Route path="/HaemophiliaLabResults" element = {<ProtectedRoute><HaemophiliaLabResults/><NavBar/></ProtectedRoute>}/>
        <Route path="/JointPainTracker" element = {<ProtectedRoute><JointPainTracker/><NavBar/></ProtectedRoute>}/>
        <Route path="/Medications" element = {<ProtectedRoute><Medications/><NavBar/></ProtectedRoute>}/>
        <Route path="/Diabetes" element = {<ProtectedRoute><Diabetes/><NavBar></NavBar></ProtectedRoute>}/>
        <Route path="/DiabetesResults" element = {<ProtectedRoute><DiabetesResults/><NavBar/></ProtectedRoute>}/>
        <Route path="/HighBloodPressure" element = {<ProtectedRoute><HighBloodPressure/><NavBar/></ProtectedRoute>}/>
        <Route path="/BPResults" element = {<ProtectedRoute><BPResults/><NavBar/></ProtectedRoute>}/>
        <Route path="/Anxiety" element = {<ProtectedRoute><Anxiety/><NavBar/></ProtectedRoute>}/>
        <Route path="/Depression" element = {<ProtectedRoute><Depression/><NavBar/></ProtectedRoute>}/>
        <Route path="/MentalHealth" element = {<ProtectedRoute><MentalHealthResults/><NavBar/></ProtectedRoute>}/>
        <Route path="/PTSD" element = {<ProtectedRoute><PTSD/><NavBar/></ProtectedRoute>}/>
        <Route path="/Login" element = {<Login/>}/>
        <Route path="/Messages" element = {<Messages/>}/>
        <Route path="/Appointments" element = {<Appointments/>}/>
        <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
