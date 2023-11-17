
import React from "react";
import ShowPhoto from "./5_showPhoto";

function PrintTrips({trip}) {

    let keyData = 'line' + trip._id;
    return (
    <div key={keyData}>
        <p className="aboutme_InfoTrip">{trip.tripName}</p>
        {trip.tripPhoto ? <ShowPhoto
                            photo={trip.tripPhoto}
                            style='aboutme_PhotoCar'
        />: <p>no photo</p>}

    </div>)
}

export default PrintTrips;