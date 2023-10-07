import React from 'react';

function TripBox({trip}) {

    return (
        <div className="underConstruction">
            <h4 className="ramka">{trip.tripName}</h4>
            <p > by: {trip.tripUser}</p>
        </div>
    );
}

export default TripBox;