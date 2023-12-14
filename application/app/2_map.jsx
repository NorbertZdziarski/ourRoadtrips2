import React, {useEffect, useMemo, useState} from 'react';

import ShowMap from "./3_show_map";
import {fetchData} from "./a_CRUD_service";
import {useStoreState} from "easy-peasy";


const Gmap = () => {
    const tripId = useStoreState(state => state.tripId);
    const [data, setData] = useState(null);
    let tripPoint = null;

    useEffect(() => {
        const target = `one/trip/${tripId}`
        fetchData(target).then(downloadedData => {
            console.log(downloadedData)
            setData(downloadedData)
        });
    },[] );

    console.log('data: ' + data)
    console.log('JSON ' + JSON.stringify(data))


    return (<>
            {data ?
        <ShowMap
            country={data.tripCountry}
            tripMap={data.tripMap}
            tripPoint={tripPoint}
        /> : <>loading....</>}
        </>
    );
};

export default Gmap;
