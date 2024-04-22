

import React, { useState,useEffect,createContext, useContext } from 'react';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import { Button, Typography } from '@mui/material';
import './FlightSeatPickerStyles.css';
import axios from 'axios';
import { useFlight } from '../Pages/NewMainView/UserContext';
import { message } from 'antd';
import 'react-toastify/dist/ReactToastify.css';

export const SeatAssignmentsContext = createContext();


const FlightSeatPicker = () => {
  let availableSeats = [];
  const [no, setNo] = useState(1);

  const [seatBookedMessageDisplayed, setSeatBookedMessageDisplayed] = useState(false);
  const { userId, selectedFlight } = useFlight();
  const [passengers, setPassengers] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [lastSeatAssignment,setLastSeatAssignments]=useState(null);
  const generateAvailableSeats = () => {
    const rows = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const columns = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    
     
  
  
    for (let i = 0; i < rows.length; i++) {
      for (let j = 0; j < columns.length; j++) {
        const seatNumber = rows[i] + columns[j];
        availableSeats.push(seatNumber);
      }
    }
  
    return availableSeats;
  };


 availableSeats = generateAvailableSeats();
 const initialSeatAssignments = passengers.map((passengerId, index) => ({
  passengerId: passengerId,
  //seatNumber: availableSeats[index], // Assign seat number based on index
  seatNumber: null
}));
  
  const [seatAssignments, setSeatAssignments] = useState(initialSeatAssignments);

  
  
  


  useEffect(() => {


    // Define a function to fetch passengers for the user
    const fetchPassengers = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/${userId}/${selectedFlight}/passengerIds`);
        if (response.status === 200) {
          setPassengers(response.data);
          console.log('selected flight at flight picker',selectedFlight);

      //     console.log('response from the users passengers',response.data);
           

        }
      } catch (error) {
        console.error('Error fetching passengers:', error);
      }
    };

    // Call the fetchPassengers function to fetch data
    fetchPassengers();
  }, []);

  useEffect(() => {


    // Define a function to fetch passengers for the user
    const fetchSeats = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/flights/${selectedFlight}/getSeatIds`);
        console.log('seat getting for ',selectedFlight);
        if (response.status === 200) {
          setSelectedSeats(response.data);
           console.log('response for the seats',response.data);
           

        }
      } catch (error) {
        console.error('Error fetching passengers:', error);
      }
    };

    // Call the fetchPassengers function to fetch data
    fetchSeats();
  }, []);


  useEffect(() => {
    // This effect runs when passengers state changes
    // Create updated seatAssignments based on the new passengers
    const updatedSeatAssignments = passengers.map((passengerId, index) => ({
      passengerId: passengerId,
      //seatNumber: availableSeats[index], // Assign seat number based on index
      seatNumber: null,
    }));
    
    // Update the seatAssignments state with the new values
    setSeatAssignments(updatedSeatAssignments);
    console.log('seat assignments',seatAssignments);
          
  }, [passengers]); // Run this effect when passengers state changes
  

  const handleSeatToggle = (seatNumber) => {
   
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats((prevSelectedSeats) =>
        prevSelectedSeats.filter((seat) => seat !== seatNumber)
        
      );
     
    } else if (selectedSeats.length < passengers.length) {
      
      setSelectedSeats([...selectedSeats, seatNumber]);
      const updatedSeatAssignments = passengers.map((passengerId, index) => ({
        passengerId: passengerId,
        seatNumber: null, // Assign seat number based on index
       
      }));
      setSeatAssignments(updatedSeatAssignments);
      assignSeatToPassenger(seatNumber);
     

     
      
      
    }
  };
  

  const assignSeatToPassenger = (seatNumber) => {
    // Find the next available passenger to assign the seat
    const nextPassengerIndex = seatAssignments.findIndex(
      (assignment) => !assignment.seatNumber);
     
console.log('next passenger index:',nextPassengerIndex);

    if (nextPassengerIndex !== -1 && nextPassengerIndex < passengers.length) {
      const nextPassenger = passengers[nextPassengerIndex];
      console.log('next passenger :',nextPassenger);
      if (nextPassenger && nextPassenger.passengerId !== null) {
      const updated = [...seatAssignments];
      updated[nextPassengerIndex] = {
        passengerId: passengers,
        seatNumber: seatNumber,
      };
      console.log(updated);
      setLastSeatAssignments( {
        passengerId: passengers[nextPassengerIndex],
        seatNumber: seatNumber,
      });
      setSeatAssignments(updated);
      console.log('seat assignment',seatAssignments);
     
      
    }
  }
  };

  useEffect(() => {
    // Define a function to send seatAssignments to the backend
    const sendSeatAssignmentsToBackend = async () => {
      try {
        // Make an HTTP POST request to your backend API with updated seatAssignments
        const response = await axios.post('http://localhost:8080/passengers/seatAssignment', {
         // seatAssignments: seatAssignments,
          passengerId:lastSeatAssignment.passengerId,
          seatId:lastSeatAssignment.seatNumber,
          userId:userId,
          flightId:selectedFlight,
           // Pass the updated seatAssignments
        });

        const request={
          passengerId:lastSeatAssignment.passengerId,
          seatId:lastSeatAssignment.seatNumber,
          userId:userId,
          flightId:selectedFlight,
        }
        console.log(request);
        message.success(`Seat  ${lastSeatAssignment.seatNumber} is booked for passenger ${no}`);

        // Handle the response if needed
        console.log('Seat assignments sent to the backend:', response.data);
      } catch (error) {
        console.error('Error sending seat assignments:', error);
      }
    };

    // Call the function whenever seatAssignments changes
    sendSeatAssignmentsToBackend();
  }, [seatAssignments]); // Add seatAssignments as a dependency


  const renderSeatGrid = () => {
    const rows = [];
    const numRows = 14;
    const numSeatsPerRow = 6;

    for (let row = 1; row <= numRows; row++) {
      const seatRow = [];
      for (let seatNum = 1; seatNum <= numSeatsPerRow; seatNum++) {
        const seatNumber = `${row}${String.fromCharCode(64 + seatNum)}`;
        seatRow.push(
          <Grid item key={seatNumber}>
            <Checkbox
              checked={selectedSeats.includes(seatNumber)}
              onChange={() => handleSeatToggle(seatNumber)}
              color="primary"
              checkedIcon={
                <Button 
                className="square-button" 
                variant="contained" 
                style={{ 
                  fontSize: '0.7em', 
                  backgroundColor: '#605DEC',
                }}
              >                  {seatNumber}
                </Button>
              }
              icon={
                <Button 
                className="square-button" 
                variant="outlined" 
                style={{ 
                  fontSize: '0.7em', 
                  backgroundColor: '#7C8DB0', 
                  color: '#E9E8FC'  // Set text color to white
                }}
              >                  {seatNumber}
                </Button>
              }
            />
          </Grid>
        );

        if (seatNum % 3 === 0 && seatNum < numSeatsPerRow) {
          seatRow.push(
            <Grid
              item
              key={`spacer-${seatNumber}`}
             
              width={50}
              height={65}
              justifyContent="center"
              textAlign="center"
            >
              <Typography variant="h4" sx={{ opacity:0.8, fontWeight:500 }} mt={1.5} style={{ fontSize: '1em'}}>
                {row}
              </Typography>{' '}
            </Grid>
          );
        }
      }

      rows.push(
        <Grid container item key={row} justifyContent="center" spacing={1} style={{ fontSize: '0.7em'}}>
          {seatRow}
        </Grid>
      );
    }

    return rows;
  };
 
  useEffect(() => {
    seatAssignments.forEach((assignment,index) => {
      if (assignment.seatNumber !== null && !seatBookedMessageDisplayed) {
        setNo(index+2);
        

       
      }
    });
  }, [seatAssignments, seatBookedMessageDisplayed]);


  // const {  userID, selectedFlight } = useFlight();
  return (
    <SeatAssignmentsContext.Provider value={seatAssignments}>
       <div style={{ height: '150vh', overflowY: 'auto' }}>
    {/* {renderSeatAssignments()} */}
      <Grid container spacing={1} justifyContent="center">
        {renderSeatGrid()}
      </Grid>
      
    </div>
    </SeatAssignmentsContext.Provider>
   
  );
};

export default FlightSeatPicker;