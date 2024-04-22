// Import necessary libraries and components
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import PassengerInformationForm from './RegChat';
import { useNavigate } from 'react-router-dom'; 


import { useFlight } from '../NewMainView/UserContext';


    

const MultiPassengerEntry = () => {
  const navigate = useNavigate(); 


  const flightContext = useFlight();
  const { selectedFlight,userId,noOfPassengers, setnoOfPassengers } = flightContext;

    const [submissionCount, setSubmissionCount] = useState(0);
   
  // Convert string to number
    const handleFormSubmit = (values) => {
      console.log('selected flight at multiple passengers:', selectedFlight);

      setSubmissionCount(prevCount => prevCount + 1);
      if (submissionCount >= noOfPassengers) {
        // Navigate to the next page when all passengers are entered
         // Replace '/nextPage' with the actual URL of the next page
      }
    
    };
  
    return (
<div style={{ width: '1200px', height: '100%',  paddingLeft: '150px' }}>
  {submissionCount < noOfPassengers ? (
    <PassengerInformationForm
      
      clearForm={submissionCount}
      onSubmit={handleFormSubmit}
      
    />
  ) : 
  <div>
          { navigate('/seatSelector')}
          Navigating to the next page...
        </div>
  }
</div>

    );
  };
  
  export default MultiPassengerEntry;
