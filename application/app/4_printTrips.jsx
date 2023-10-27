import LoadImage from "./a_loadimage";
import React from "react";

function PrintTrips({trip}) {

    let keyData = 'line' + trip._id;
    return (<div key={keyData}>
        <p>{trip.tripName}</p>
        {trip.tripPhoto ?
        <LoadImage imageName={trip.tripPhoto}
                   imagePath='images/trips'
                   imageWidth='120px' />: <p>no photo</p>}
    </div>)
}

export default PrintTrips;