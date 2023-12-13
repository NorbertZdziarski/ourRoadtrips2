import React, {useEffect, useState} from 'react';
import {fetchData} from "./a_CRUD_service";
import SortingTrips from "./3_sortingTrips";
import {useStoreActions} from "easy-peasy";

// import Gmap from "./5_map";

function ShowTrips({dataFilter}) {
    const [data, setData] = useState(null);
    const setShowLoading = useStoreActions(actions => actions.setShowLoading);

    useEffect(() => {
        setShowLoading([true,0]);
        fetchData('all/trips').then(downloadedData => {
            // console.log('2_showTrips - pobrane dane: ' + downloadedData)
            setShowLoading([false,0]);
            setData(downloadedData)
        });

    }, []);
    // layout_main layout_flex-sb
    return (
        <section className="showTrips  ">

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