import React, { useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'antd';
import './NewFlightCard.css'
import PropTypes from 'prop-types';
import { useFlight } from '../UserContext';
import { useNavigate } from 'react-router-dom';



const ReusableCard = ({ flightData}) => {

    const { userId,selectedFlight, setSelectedFlight,setBookedFlights,setFlightList } = useFlight();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');


    

    const handleAddFlight = async () => {
           const apiUrl = `http://localhost:8080/users/${userId}/passengers`;
           axios.get(apiUrl)
                   .then((response) => {
                    navigate(`/updatePassengerDetails`,{ state: { passengerDetails: response.data } });
                       // If the response data is an array, set it to passengerDetails
                      console.log('real response',response);
                    
                     
                   })
                   .catch((error) => {
                     // Handle any errors
                     console.error('Error fetching passenger list:', error);
                   });

  };
  const handleUpdateFlight = async () => {
    const apiUrl = `http://localhost:8080/users/${userId}/${flightData.flightId}/passengerList`;
    axios.get(apiUrl)
            .then((response) => {
             navigate(`/updatePassengerDetails`,{ state: { passengerDetails1: response.data } });
                // If the response data is an array, set it to passengerDetails
               console.log('real response',response);
               
               
              
            })
            .catch((error) => {
              // Handle any errors
              console.error('Error fetching passenger list:', error);
            });

};
const handleDelete = () => {
  // Make a DELETE request to the server with the flight ID
  console.log("Selected Flight",selectedFlight);
  axios
  .delete(`http://localhost:8080/users/${userId}/flightsDelete/${flightData.flightId}`) 
     .then((response) => {
      setBookedFlights(100);
      setMessage(`Flight with ID ${selectedFlight} deleted successfully.`);
      console.log('response for deleting a flight',response);
     
      
    })
    .catch((error) => {
      setMessage(`Error deleting flight with ID ${selectedFlight}: ${error.message}`);
    });
};



const updateAfterDelete = () => {
  // Make a DELETE request to the server with the flight ID
  const apiUrl = `http://localhost:8080/users/${userId}/flights`;
      
        // Make the GET request
        axios.get(apiUrl)
          .then((response) => {
            if (typeof response.data === 'object') {
              const dataArray = Object.values(response.data);
              console.log('update after delete GET',dataArray);
              setFlightList(dataArray);
              console.log("response",response.data);
            } else {
                setFlightList(response.data);

              console.error('Invalid response data:', response.data);
            }
          })
          .catch((error) => {
            // Handle any errors
            console.error('Error fetching flight list:', error);
          });
};
    const handleUpdateButtonClick = () => {
        console.log(flightData);
        setSelectedFlight(flightData.flightId);
        handleUpdateFlight();
        // navigate(`/updatePassengerDetails`,{ state: { passengerDetails: response.data } });
      
      };

      const handleDeleteButtonClick = () => {
      
       // setSelectedFlight(flightData.flightId);
        handleDelete();
        updateAfterDelete();
         
        // updateAfterDelete();
        // navigate(`/updatePassengerDetails`,{ state: { passengerDetails: response.data } });
      
      };
  return (
    <Card
    className="ReusableCard"
    title={
      <div className="CardTitle">
        {flightData.airlineName}
        <hr className="CardTitleDivider" /> {/* Add a horizontal line */}
       
      </div>
    }
  >      <div className="CardContent">
        <div className="CardRow">
          <div className="CardLabel">Duration:</div>
          <div className="CardValue">{flightData.duration}</div>
        </div>
        <div className="CardRow">
          <div className="CardLabel">Departure Time:</div>
          <div className="CardValue">{flightData.departureTime}</div>
        </div>
        <div className="CardRow">
          <div className="CardLabel">No of Stops:</div>
          <div className="CardValue">{flightData.stops}</div>
        </div>
      </div>
      <div className="CardContent">
        <div className="ParallelRow">
          <div className="CardLabel">Price:</div>
          <div className="CardValue">{flightData.price}</div>
        </div>
        <div className="ParallelRow">
          <div className="CardLabel">Arrival Time:</div>
          <div className="CardValue">{flightData.arrivalTime}</div>
        </div>
        <div className="ParallelRow">
          <div className="CardLabel">Flight Type:</div>
          <div className="CardValue">{flightData.flightType}</div>
        </div>
        </div>
        <div className="TitleButtons">
          <Button
            type="primary"
            style={{ backgroundColor: '#605DEC', borderColor: '#605DEC' }}
            onClick={handleUpdateButtonClick}
          >
            Update Flight
          </Button>
          <Button
            type="default"
            style={{ marginLeft: '8px' }} // Add some margin for spacing
            onClick={handleDeleteButtonClick} // Add a click handler for the second button
          >
            Delete Booking
          </Button>
       
      </div>
    </Card>
  );
};

ReusableCard.propTypes = {
  flightData: PropTypes.object.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  className: PropTypes.string, 

};

export default ReusableCard;
