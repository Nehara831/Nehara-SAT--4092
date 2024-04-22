import React ,{useState}from 'react';
import { Table, Button } from 'antd';
import PropTypes from 'prop-types';
import { useFlight } from '../NewMainView/UserContext';
import { useNavigate } from 'react-router-dom';
import './FlightCard.css'; // Make sure to import your CSS file.

  const FlightDataTable = ({ flightData }) => {
    console.log(flightData);
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
    const { userId,selectedFlight,setSelectedFlight } = useFlight();
    const navigate = useNavigate();
    const { flight,setFlight } = useState(null);
  
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
        render: (text, record) => (
          <span style={{ fontSize: '25px', fontWeight: '500', color: record.price < 500 ? 'red' : 'inherit' }}>
            ${record.price}
          </span>
        ),
      },
      
      
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Button
          type="primary"
          style={{
            backgroundColor: '#605DEC',
            borderColor: '#605DEC',
            width: '45px',
            height: '25px', // Set the height to your desired value
            display: 'flex',
            flexDirection: 'row', // Change to 'row' to place the arrow after the text
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => handleSelectFlight(record.key)}
        >
         <span style={{ marginLeft: '5px' }}>{'->'}</span>
        </Button>
        
        ),
      },
      
    ];

        const handleAddFlight = async (flightatTable) => {
      try {
          const response = await fetch(`http://localhost:8080/users/${userId}/add-flight/${flightatTable}`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
          });

          if (response.ok) {
            setSelectedFlight(flightatTable);
              console.log('selected flight at flight table',flightatTable);
          } else {
              console.error("Error adding flight to user.");
          }
      } catch (error) {
          console.error("Error:", error);
      }
  };
  
    const handleSelectFlight = (flightId) => {
      
      handleAddFlight(flightId);
      navigate(`/passengerDetails`);
    };
  
    return <Table dataSource={dataSource} columns={columns} />;
  };
  
  FlightDataTable.propTypes = {
    flightData: PropTypes.array.isRequired,
  };
  
  export default FlightDataTable;
  