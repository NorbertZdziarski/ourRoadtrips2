import React from 'react';
import LoadImage from "./a_loadimage";
import {useStoreActions} from "easy-peasy";

function TripBox({trip, dataFilter}) {
    const setPage = useStoreActions(actions => actions.setPage);
    const setTripId = useStoreActions(actions => actions.setTripId);


    // if (!trip.tripPublic) console.log('trip: ' + trip.tripPublic + ' - name: ' + trip.tripName);
    if (!trip.tripPublic) return null;

    if (dataFilter[1] !== "all" && dataFilter[1] !== trip.tripCountry ) return null;
    if (dataFilter[2] !== "all" && dataFilter[2] !== trip.tripType) return null;
    // if (dataFilter[3] !== "all" && dataFilter[3] !== trip.tripCar.carType) return;
    // if (choiceVehicleType !== "all" && choiceVehicleType !== trip.tripCar.vehicle) return;

    return (
        <div className="clickPage">
            <button className="" onClick={()=> {
                setPage("showTrip")
                setTripId(trip._id)
                } }>
                <div className="tripInfo_mainpage_box">
                    <h4 className="tripInfo_mainpage_title">{trip.tripName}</h4>
                    <p className="tripInfo_mainpage_author"> by: {trip.tripUser}</p>
                    <p className="tripInfo_mainpage_Info-country"> {trip.tripCountry}</p>
                    <p className="tripInfo_mainpage_Info-tripType"> {trip.tripType}</p>
                </div>

                {trip.tripPhoto ? <LoadImage imageName={trip.tripPhoto}
                       imagePath='images/trips'
                       imageWidth='400px'
                       photoClass="photoStyle"
                /> : <p className="ramka">no photo.</p>}
            </button>
        </div>
    );
}

export default TripBox;