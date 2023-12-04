import React, {useEffect, useState} from 'react';
import {fetchData} from "./a_CRUD_service";
import SortingTrips from "./3_sortingTrips";
// import Gmap from "./5_map";


function ShowTrips({dataFilter}) {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchData('all/trips').then(downloadedData => {
            // console.log('2_showTrips - pobrane dane: ' + downloadedData)
            setData(downloadedData)
        });

    }, []);

    return (
        <section className="showTrips layout_main layout_flex-sb ">

            {data ? (
                    <SortingTrips tripData={data}
                               dataFilter={dataFilter} />
            ) : (
                <p>data loading...</p>
            )}
        </section>
    );
}

export default ShowTrips;