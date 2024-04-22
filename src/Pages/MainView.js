import React from 'react';
import './Mainview.css';
import Search from '../componenets/SearchFlights/Flights'
import Nav from '../componenets/NavigationHeaderFolder/NavigationHeader'
const Mainview = () => {
    return (
        <>
            <div className="mainView">
                <div className="mainViewNav"><Nav/></div>
                
                    
                    <div className="searchContainer">
                        <Search/>
                    </div>
               
            </div>
        </>
    );
}


export default Mainview;