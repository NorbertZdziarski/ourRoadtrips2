import React from 'react';
import LoadImage from "./a_loadimage";
import {useStoreActions} from "easy-peasy";

function TripBox({trip, dataFilter}) {
    const setPage = useStoreActions(actions => actions.setPage);
    const setTripId = useStoreActions(actions => actions.setTripId);

    // if (!trip.tripPublic) return;

    if (dataFilter[1] !== "all" && dataFilter[1] !== trip.tripCountry ) return null;
    if (dataFilter[2] !== "all" && dataFilter[2] !== trip.tripType) return null;
    // if (dataFilter[3] !== "all" && dataFilter[3] !== trip.tripCar.carType) return;
    // if (choiceVehicleType !== "all" && choiceVehicleType !== trip.tripCar.vehicle) return;

    return (
        <div className="clickPage">
            <button className="clickPage" onClick={()=> {
                setPage("showTrip")
                setTripId(trip._id)
                } }>
                <h4 className="ramka">{trip.tripName}</h4>
                <p className="ramka"> by: {trip.tripUser}</p>
                {trip.tripPhoto ? <LoadImage imageName={trip.tripPhoto}
                       imagePath='images/trips'
                       imageWidth='300px' /> : <p className="ramka">no photo.</p>}
            </button>
        </div>
    );
}

export default TripBox;