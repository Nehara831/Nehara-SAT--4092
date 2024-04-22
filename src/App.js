import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FlightProvider } from './Pages/NewMainView/UserContext';
import NewMainPage from './Pages/NewMainView/NewMainView';
import DepRet from './Pages/DepReturnPage';
import SeatBookingPage from './Pages/SeatSelectorPage/SeatBookingPage';
import MultiplePassengers from './Pages/LoginPage/MultiplePassengers';
import UserRegister from './Pages/LoginPage/UserRegistration';
import NewMultiplePassengers from './Pages/NewMainView/FlightPopUpWindow/NewMultiplePassengers';

function App() {
    // State variables
    const [userId, setUserId] = useState(null);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [passengerDetails, setPassengerDetails] = useState([]);
    const [noOfPassengers, setNoOfPassengers] = useState(1);
    const [bookedFlights, setBookedFlights] = useState(9);
    const [flightList, setFlightList] = useState([]);

    // Function to save state values to session storage
    const saveToSessionStorage = () => {
        sessionStorage.setItem('userId', JSON.stringify(userId));
        sessionStorage.setItem('selectedFlight', JSON.stringify(selectedFlight));
        sessionStorage.setItem('passengerDetails', JSON.stringify(passengerDetails));
        sessionStorage.setItem('noOfPassengers', JSON.stringify(noOfPassengers));
        sessionStorage.setItem('bookedFlights', JSON.stringify(bookedFlights));
        sessionStorage.setItem('flightList', JSON.stringify(flightList));
    };

    // Load initial values from session storage on component mount
    useEffect(() => {
        const initialUserId = JSON.parse(sessionStorage.getItem('userId')) || null;
        const initialSelectedFlight = JSON.parse(sessionStorage.getItem('selectedFlight')) || null;
        const initialPassengerDetails = JSON.parse(sessionStorage.getItem('passengerDetails')) || [];
        const initialNoOfPassengers = JSON.parse(sessionStorage.getItem('noOfPassengers')) || 1;
        const initialBookedFlights = JSON.parse(sessionStorage.getItem('bookedFlights')) || 9;
        const initialFlightList = JSON.parse(sessionStorage.getItem('flightList')) || [];

        if (initialUserId) {
            setUserId(initialUserId);
        }

        if (initialSelectedFlight) {
            setSelectedFlight(initialSelectedFlight);
        }

        if (initialPassengerDetails) {
            setPassengerDetails(initialPassengerDetails);
        }

        if (initialNoOfPassengers) {
            setNoOfPassengers(initialNoOfPassengers);
        }

        if (initialBookedFlights) {
            setBookedFlights(initialBookedFlights);
        }

        if (initialFlightList) {
            setFlightList(initialFlightList);
        }

    }, []); // Empty dependency array to run this effect only once on mount

    // useEffect to save state to session storage whenever state changes
    useEffect(() => {
        saveToSessionStorage();
    }, [userId, selectedFlight, passengerDetails, noOfPassengers, bookedFlights, flightList]);

    return (
        <FlightProvider>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<NewMainPage />} exact />
                        <Route path="/flightSelect" element={<DepRet />} />
                        <Route path="/seatSelector" element={<SeatBookingPage />} />
                        <Route path="/passengerDetails" element={<MultiplePassengers />} />
                        <Route path="/userSignUp" element={<UserRegister />} />
                        <Route path="/updatePassengerDetails" element={<NewMultiplePassengers />} />
                    </Routes>
                </div>
            </Router>
        </FlightProvider>
    );
}

export default App;
