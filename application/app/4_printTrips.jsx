import LoadImage from "./a_loadimage";
import React from "react";

function PrintTrips({trip}) {

    let keyData = 'line' + trip._id;
    return (
    <div key={keyData}>
        <p className="aboutme_InfoTrip">{trip.tripName}</p>
        {trip.tripPhoto ?
        <LoadImage imageName={trip.tripPhoto}
                   imagePath='images/trips'

                   photoClass='aboutme_PhotoCar' />: <p>no photo</p>}
    </div>)
}

export default PrintTrips;