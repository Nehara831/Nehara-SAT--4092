import React from 'react';

import './FlightCard.css'
import PropTypes from 'prop-types';
import{useFlight} from '../NewMainView/UserContext'
import { useNavigate } from 'react-router-dom';
import { Table, Button } from 'antd';



const FlightDataTable = ({ flightData }) => {
  const { userId,selectedFlight, setSelectedFlight,setBookedFlights } = useFlight();
  
      const handleAddFlight = async () => {
        try {
            const response = await fetch(`http://localhost:8080/users/${userId}/add-flight/${selectedFlight}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
  
            if (response.ok) {
                console.log({userId});
                console.log({selectedFlight});
                setBookedFlights(3);
            } else {
                console.error("Error adding flight to user.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
  
      const handleButtonClick = () => {
          console.log(flightData);
          setSelectedFlight(flightData.flightId);
          handleAddFlight();
          navigate(`/passengerDetails`);
        
        };
  const formatFlightDataForTable = (flightData) => {
      return flightData.map((flight) => ({
        key: flight.flightId,
        airlineName: flight.airlineName,
        departureTime: flight.departureTime,
        arrivalTime: flight.arrivalTime,
        duration: flight.duration,
        price: flight.price,
        flightType: flight.flightType,
      }));
    };
  
  const navigate = useNavigate();
 

  const dataSource = formatFlightDataForTable(flightData);


  const columns = [
    {
      title: 'Airline Name',
      dataIndex: 'airlineName',
      key: 'airlineName',
    },
    {
      title: 'Departure Time',
      dataIndex: 'departureTime',
      key: 'departureTime',
    },
    {
      title: 'Arrival Time',
      dataIndex: 'arrivalTime',
      key: 'arrivalTime',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Flight Type',
      dataIndex: 'flightType',
      key: 'flightType',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button
          type="primary"
          style={{ backgroundColor: '#605DEC', borderColor: '#605DEC' }}
          onClick={() => handleSelectFlight()}
        >
          Select Flight
        </Button>
      ),
    },
  ];

  const handleSelectFlight = () => {
    setSelectedFlight(flightData.flightId);
    console.log('selected flight at the flight card',selectedFlight);
    navigate(`/passengerDetails`);
  };

  return <Table dataSource={dataSource} columns={columns} />;
};

FlightDataTable.propTypes = {
  flightData: PropTypes.array.isRequired,
};

export default FlightDataTable;