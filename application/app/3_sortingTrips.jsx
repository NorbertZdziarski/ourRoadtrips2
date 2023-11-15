import TripBox from "./2_tripBox";
import React from "react";
import {useStoreState} from "easy-peasy";

const SortingTrips = ({ tripData, dataFilter }) => {
    const tripSort = useStoreState(state => state.tripSort);


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



// // Posortuj tablicę na podstawie średniej
//     trips.sort((a, b) => b.averageRate - a.averageRate);


    return (
        <div className="trips_container">
            {tripData.map((trip) => (
                < TripBox key={trip._id}
                          trip={trip}
                          dataFilter={dataFilter}/>
            ))}
        </div>
    );
};

export default SortingTrips;