import React from 'react';
import LoadImage from "./a_loadimage";

function TripBox({trip}) {

    return (
        <div className="underConstruction">
            <h4 className="ramka">{trip.tripName}</h4>
            <p className="ramka"> by: {trip.tripUser}</p>
            {trip.tripPhoto ? <LoadImage imageName={trip.tripPhoto}
                       imagePath='images/trips'
                       imageWidth='300px' /> : <p className="ramka">no photo.</p>}
        </div>
    );
}

export default TripBox;