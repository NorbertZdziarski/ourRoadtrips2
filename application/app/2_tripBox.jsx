import React from 'react';
import LoadImage from "./a_loadimage";

function TripBox({trip}) {

    return (
        <div className="underConstruction">
            <h4 className="ramka">{trip.tripName}</h4>
            <p > by: {trip.tripUser}</p>
            <LoadImage imageName={trip.tripPhoto}
                       imagePath='images/trips'
                       imageWidth='300px' />
        </div>
    );
}

export default TripBox;