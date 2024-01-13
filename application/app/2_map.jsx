import React, {useEffect, useState} from 'react';
import ShowMap from "./3_show_map";
import {fetchData} from "./a_CRUD_service";
import {useStoreState} from "easy-peasy";
import Anim_loading from "./anim_loading";

function Gmap({tripData}) {
    const tripId = useStoreState(state => state.tripId);
    const [data, setData] = useState(null);
    const [locations, setLocations] = useState([])
    let tripPoint = null;

    useEffect(() => {
        const newLocations = tripData.reduce((acc, trip) => {
            if (trip.tripPublic) {
                let target = `/showtrip/${trip._id}`;
                let point;
                if (trip.tripMap) {
                    point = trip.tripMap.geocode.legs[0].start_location;
                } else {
                    point = null;
                }

                let tempData = {
                    name: trip.tripName,
                    location: point,
                    country: trip.tripCountry,
                    url: target,
                    user: trip.tripUser
                };

                return [...acc, tempData];
            }
            return acc;
        }, []);

        setLocations(newLocations);
        setData(true);
    }, [tripData]);

    return (<>
            {data ?
                <ShowMap
                    country={'Poland'}
                    tripMap={null}
                    tripPoint={tripPoint}
                    locations={locations}
                /> : <Anim_loading /> }
        </>
    );
};

export default Gmap;
