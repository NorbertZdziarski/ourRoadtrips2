import React, {useEffect, useMemo, useState} from 'react';
import ShowMap from "./3_show_map";
import {fetchData} from "./a_CRUD_service";
import {useStoreState} from "easy-peasy";


function Gmap({tripData}) {
    const tripId = useStoreState(state => state.tripId);
    const [data, setData] = useState(null);
    const [locations, setLocations] = useState([])
    let tripPoint = null;


    // useEffect(() => {
    //     // const target = `one/trip/${tripId}`
    //     // fetchData(target).then(downloadedData => {
    //     //     console.log(downloadedData)
    //     //     setData(downloadedData)
    //     // });
// },[] );
        useEffect(() => {
            const promises = tripData.map(async (trip) => {
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

                    return new Promise((resolve) => {
                        setLocations((prev) => {
                            resolve();
                            return [...prev, tempData];
                        });
                    });
                }
            });

            Promise.all(promises)
                .then(() => {
                        console.log('All data has been set');
                        setData(true);
                    }
                )
                .catch((error) => console.error(`Error in promises ${error}`));
        }, []);
    //
    // console.log('data: ' + data)
    // console.log('JSON ' + JSON.stringify(data))
    return (<>
        {/*{data ?*/}
        {/*    <ShowMap*/}
        {/*        country={data.tripCountry}*/}
        {/*        tripMap={data.tripMap}*/}
        {/*        tripPoint={tripPoint}*/}
        {/*    /> : <>loading....</>}*/}

        {data ?
            <ShowMap
                country={'Poland'}
                tripMap={null}
                tripPoint={tripPoint}
                locations={locations}
            /> : <>loading....</>}
        </>
    );
};

export default Gmap;
