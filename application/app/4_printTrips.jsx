
import React from "react";
import ShowPhoto from "./5_showPhoto";

function PrintTrips({trip}) {
    console.log(' print trips: image nr 0: ' + trip.tripPhoto[0])
    let keyData = 'line' + trip._id;
    return (
    <div key={keyData}>
        <p className="aboutme_InfoTrip">{trip.tripName}</p>
        {trip.tripPhoto ? <ShowPhoto
                            photo={trip.tripPhoto[0]}
                            style='aboutme_PhotoCar'
                            source='trips'
        />: <p>no photo</p>}

    </div>)
}

export default PrintTrips;