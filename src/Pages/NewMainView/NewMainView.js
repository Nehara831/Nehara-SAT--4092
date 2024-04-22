// src/components/LoginPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../LoginPage'
import SearchPanel from '../NewMainPage/NewMainSearch';
import './NewMainView.css';
import { useState } from 'react';
import { useContext } from 'react';
import {useFlight} from './UserContext';
import Signup from '../../Pages/LoginPage/UserRegistration'
import FlightPopup from './FlightPopUpWindow/FlightPopUp';
import NavigationPanel from '../../componenets/NavigationHeaderFolder/NavigationHeader';
// Create Context object
 
function LoginPage() {

  const {  userId } = useFlight();
  
    const [isLoginVisible, setLoginVisible] = useState(false);
    const [isSignUpVisible, setSignUpVisible] = useState(false);
    const [isFlightVisible, setFlightVisible] = useState(false);

   
  
    const handleLoginClick = () => {
      setLoginVisible(true);
    };
    const handleSignUpClick = () => {
      setSignUpVisible(true);
    };
    const handleCloseSignUP = () => {
      setSignUpVisible(false);
    };
    const handleCloseLogin = () => {
      setLoginVisible(false);
    };

    const handleCloseFlight = () => {
      setFlightVisible(false);
    };
    const handleFlightClick = () => {
      console.log('flightbutton clicked');
      setFlightVisible(true);
    };

  
  const navigate = useNavigate();

  // const handleSearch = () => {

  //   navigate('/available-flights');
  // };
  
  return (
   

    <div className="login-page">
    
      <nav className="navigation-panel">
        
       <NavigationPanel clicKSignInButton={handleLoginClick} clicKSignUpButton={handleSignUpClick} clickFlightsButton={handleFlightClick}/>
      </nav>
      {/* <h1>User ID: {userId}</h1> */}
      
 {isLoginVisible && (
        <>
          <div className="overlay"></div> 
          <Login onClose={handleCloseLogin}
         />
        </>
      )}
      {isSignUpVisible && (
        <>
          <div className="overlay"></div> 
          <Signup onClose={handleCloseSignUP} />
        </>
      )}

    {isFlightVisible && (
        <>
          <div className="overlay"></div> 
          <FlightPopup onClose={handleCloseFlight} />
        </>
      )}
        
      <div className="background-image">
      <SearchPanel  />      
      </div>
    </div>
  );
}

export default LoginPage;
