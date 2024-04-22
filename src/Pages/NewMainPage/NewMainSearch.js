import React, { useState, useEffect } from 'react';
import { Select, Button, InputNumber, DatePicker, AutoComplete, Input } from 'antd';
import { FlightTakeoff, FlightLand, Person } from '@mui/icons-material';
import axios from 'axios';
import './SearchPanel.css';
import { useNavigate } from 'react-router-dom';
import {useFlight} from '../NewMainView/UserContext'
const { Option } = Select;

function SearchPanel() {

  const navigate = useNavigate();
  const flightContext = useFlight();
  const { noOfPassengers, setnoOfPassengers } = flightContext;

    const [departureAirport, setDepartureAirport] = useState(null);
    const [arrivalAirport, setArrivalAirport] = useState(null);
    const [departureDate, setDepartureDate] = useState(null);
    const [returnDate, setReturnDate] = useState(null);
    const [passengers, setPassengers] = useState(1);

    const [airports, setAirports] = useState([]); // State to store the list of airports

  // Fetch airports from the backend when the component mounts
  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const response = await axios.get('http://localhost:8080/airports/names');
        setAirports(response.data); // Update the airports state with the fetched data
      } catch (error) {
        console.error("An error occurred while fetching airports from the backend", error);
        // Handle error (show error message, etc.)
      }
    };

    fetchAirports(); // Call the fetchAirports function when the component mounts
  }, []);
    const handleSearch = async () => {
      try {
          // Ensure all fields are filled
          if (!departureAirport || !arrivalAirport || !departureDate || !returnDate || !passengers) {
              alert('Please fill all fields!');
              return;
          }

          // Construct data to send to the backend
          const data = {
              departureAirport:departureAirport,
              arrivalAirport:arrivalAirport,
              departureDate: departureDate.format('YYYY-MM-DD'), // Format date as string
              arrivalDate: returnDate.format('YYYY-MM-DD'), // Format date as string
             
          };

          // Send data to backend
          const response = await axios.post('http://localhost:8080/flights/search', data);
          
          // Handle response (you might navigate, or do something with the response)
          //console.log(response.data);
        //   setnoOfPassengers(passengers);
        console.log(response.data);
          navigate('/flightSelect', { state: { flightData: response.data } });
      } catch (error) {
          console.error("An error occurred while sending data to the backend", error);
          // Handle error (show error message, etc.)
      }
    
  };



    
    return (
        <div className="search-panel">
            <div className="section">
            
            <AutoComplete
  options={airports.map(airport => ({ value: airport }))}
  prefix={<FlightTakeoff />}
  placeholder="From Where?"
  onChange={setDepartureAirport}
  value={departureAirport}
  filterOption={(inputValue, option) =>
    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
  }
  onSelect={(value) => setDepartureAirport(value)}
>
  <Input />
</AutoComplete>
</div>
<div className="section">
<AutoComplete
  options={airports.map(airport => ({ value: airport }))}
  prefix={<FlightLand />}
  placeholder="Where To?"
  onChange={setArrivalAirport}
  value={arrivalAirport}
  filterOption={(inputValue, option) =>
    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
  }
  onSelect={(value) => setArrivalAirport(value)}
>
  <Input />
</AutoComplete>
</div>

           
            <div className="section">
                <DatePicker 
                    placeholder="Depart" 
                    onChange={setDepartureDate} 
                    value={departureDate}
                    popupPlacement="bottomLeft"
                />
            </div>
            <div className="section">
                <DatePicker 
                    placeholder="Return" 
                    onChange={setReturnDate} 
                    value={returnDate}
                    popupPlacement="bottomLeft"
                />
            </div>
            <div className="section">
                <InputNumber 
                    prefix={<Person />}
                    min={1} 
                    value={noOfPassengers} 
                    onChange={setnoOfPassengers}
                    formatter={value => `${value} `}
                    parser={value => value.replace(' Passengers', '')}
                />
            </div>
            <Button type="primary" onClick={handleSearch}>Search</Button>
        </div>
    );
}

export default SearchPanel;
