import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {useStoreActions, useStoreState} from "easy-peasy";
import { Link } from "react-router-dom";
import ShowTrip from "./3_showTrip";
import TripBox from "./2_tripBox";
import Gmap from "./2_map";

function SortingTrips({tripData, map }) {

    const tripSort = useStoreState(state => state.tripSort);
    const setPage = useStoreActions(actions => actions.setPage);
    const setTripId = useStoreActions(actions => actions.setTripId);

    const sortAvg = () => {
        tripData.forEach(trip => {
            let sum = 0;
            if (Array.isArray(trip.tripRate)) {
                trip.tripRate.forEach(rateObj => {
                    sum += rateObj.rate;
                });
                trip.averageRate = sum / trip.tripRate.length;
            } else {trip.averageRate = 0}
        });
    }
    if (tripData) {
        if (tripSort === "Z - A") tripData.sort((a, b) => b.tripName.localeCompare(a.tripName));
        if (tripSort === "A - Z") tripData.sort((a, b) => a.tripName.localeCompare(b.tripName));
        if (tripSort === "BEST first") {
            sortAvg();
            tripData.sort((a, b) => b.averageRate - a.averageRate);
        }
        if (tripSort === "best last") {
            sortAvg();
            tripData.sort((a, b) => a.averageRate - b.averageRate);
        }
        if (tripSort === "new last") tripData.sort((a, b) => new Date(a.tripSaveDate) - new Date(b.tripSaveDate));
        if (tripSort === "new first") tripData.sort((a, b) => new Date(b.tripSaveDate) - new Date(a.tripSaveDate));
    }
// // Posortuj tablicę na podstawie średniej
//     trips.sort((a, b) => b.averageRate - a.averageRate);
//     console.log('JSON.stringify(tripData)')
//     console.log(JSON.stringify(tripData))
    return (
        <div className="trips_container divHeightTemp">
            {map  ? <>
                {tripData ? <> <Gmap tripData={tripData}/> </> : <> no data. </> }
                </>
            :
            <>
                {tripData ? <>
                       {tripData.map((trip) => {
                            return (
                                <div key={trip._id} >
                                    <Link to={`/showtrip/${trip._id}`} onClick={()=>{
                                        setTripId(trip._id)
                                        setPage("showTrip");
                                    }}>
                                        <TripBox trip={trip}/>
                                    </Link>
                                </div>
                            );
                        })}
                  </> : <>
                no data.
                </> }
            </>}
        </div>
    );
};
export default SortingTrips;