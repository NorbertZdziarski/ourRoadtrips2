import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {useStoreActions, useStoreState} from "easy-peasy";
import { Link } from "react-router-dom";
import ShowTrip from "./3_showTrip";
import TripBox from "./2_tripBox";

function SortingTrips({ tripData, dataFilter }) {
    const tripSort = useStoreState(state => state.tripSort);
    const setPage = useStoreActions(actions => actions.setPage);
    const setTripId = useStoreActions(actions => actions.setTripId);
console.log('sorting trips')
    // const sortAvg = () => {
    //     tripData.forEach(trip => {
    //         console.log('trip: ' + trip.name)
    //         let sum = 0;
    //         if (Array.isArray(trip.tripRate)) {
    //
    //             trip.tripRate.forEach(rateObj => {
    //                 sum += rateObj.rate;
    //             });
    //             trip.averageRate = sum / trip.tripRate.length;
    //         } else {trip.averageRate = 0}
    //     });
    // }
    //
    // if (tripSort === "Z - A") tripData.sort((a, b) => b.tripName.localeCompare(a.tripName));
    // if (tripSort === "A - Z") tripData.sort((a, b) => a.tripName.localeCompare(b.tripName));
    // if (tripSort === "BEST first") {
    //     sortAvg();
    //     tripData.sort((a, b) => b.averageRate - a.averageRate);
    // }
    // if (tripSort === "best last") {
    //     sortAvg();
    //     tripData.sort((a, b) => a.averageRate - b.averageRate);
    // }
    // if (tripSort === "new last") tripData.sort((a, b) => new Date(a.tripSaveDate) - new Date(b.tripSaveDate));
    // if (tripSort === "new first") tripData.sort((a, b) => new Date(b.tripSaveDate) - new Date(a.tripSaveDate));

// // Posortuj tablicę na podstawie średniej
//     trips.sort((a, b) => b.averageRate - a.averageRate);
//     console.log('JSON.stringify(tripData)')
//     console.log(JSON.stringify(tripData))
    console.log(typeof tripData)
    return (
        <div className="trips_container">
            <p>jfhdsjkfhdsjfhdkjfhdsjkf</p>
            {tripData ? <>
                   {tripData.map((trip) => {
                        console.log(`Rendering trip with id: ${trip._id}`); // Dodane
                        return (
                            <div key={trip._id}>
                                <Link to={`/showtrip/${trip._id}`} onClick={()=>{
                                    console.log(`Setting page to "showTrip" and tripId to ${trip._id}`); // Dodane
                                    setPage("showTrip");
                                    setTripId(trip._id)
                                }}>
                                    <TripBox trip={trip} dataFilter={dataFilter}/>
                                </Link>
                            </div>
                        );
                    })}
              </> : <>
                {console.log('Test routing...')} // Dodane
                test routing....
            </> }
        </div>
    );

};

export default SortingTrips;