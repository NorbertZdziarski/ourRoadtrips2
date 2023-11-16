import React, {useEffect, useState} from 'react';
import {fetchData} from "./a_CRUD_service";
import SortingTrips from "./3_sortingTrips";
// import Gmap from "./5_map";


function ShowTrips({dataFilter}) {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchData('trips').then(downloadedData => {
            setData(downloadedData)
        });

    }, []);

    return (
        <section className="underConstruction mainViewStyle ">

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