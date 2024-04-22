

import React, { createContext, useContext, useEffect, useState } from 'react';

const FlightContext = createContext();

export const useFlight = () => {
    return useContext(FlightContext);
};

export const FlightProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [passengerDetails, setPassengerDetails] = useState([]);
    const [noOfPassengers, setnoOfPassengers] = useState(1);
    const [bookedFlights, setBookedFlights] = useState(9);
    const[flightList, setFlightList]=useState([]);

    const saveToSessionStorage = () => {
        sessionStorage.setItem('userId', JSON.stringify(userId));
        sessionStorage.setItem('selectedFlight', JSON.stringify(selectedFlight));
        sessionStorage.setItem('passengerDetails', JSON.stringify(passengerDetails));
        sessionStorage.setItem('noOfPassengers', JSON.stringify(noOfPassengers));
        sessionStorage.setItem('bookedFlights', JSON.stringify(bookedFlights));
        sessionStorage.setItem('flightList', JSON.stringify(flightList));
    };

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
            setnoOfPassengers(initialNoOfPassengers);
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










    const addPassenger = (passenger) => {
        setPassengerDetails(prev => [...prev, passenger]);
    };

    return (
        <FlightContext.Provider value={{ bookedFlights, setBookedFlights,flightList, setFlightList,userId, setUserId,noOfPassengers, setnoOfPassengers,selectedFlight, setSelectedFlight, passengerDetails, addPassenger }}>
            {children}
        </FlightContext.Provider>
    );
};
