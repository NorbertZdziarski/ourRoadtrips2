import TripBox from "./2_tripBox";
import React from "react";

const SortingTrips = ({ tripData, dataFilter }) => {
    console.log('sortownia')
    console.log(tripData)
    // miejsce na sortowanie. trips.sort((a, b) => a.tripName.localeCompare(b.tripName));
    // od z do wg tripName trips.sort((a, b) => b.tripName.localeCompare(a.tripName));

// sortowanie po sredniej
//     trips.forEach(trip => {
//         let sum = 0;
//         trip.tripRate.forEach(rateObj => {
//             sum += rateObj.rate;
//         });
//         trip.averageRate = sum / trip.tripRate.length;
//     });
//
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