import React, {useEffect, useState} from 'react';
import {fetchData} from "./a_CRUD_service";
import SortingTrips from "./3_sortingTrips";
import {useStoreActions} from "easy-peasy";

function ShowTrips({dataFilter}) {
    const [data, setData] = useState(null);
    const setShowLoading = useStoreActions(actions => actions.setShowLoading);
console.log('show trips' + dataFilter)
    useEffect(() => {
        setShowLoading([true,0]);
        fetchData('all/trips').then(downloadedData => {
            // console.log('2_showTrips - pobrane dane: ' + downloadedData)
            setShowLoading([false,0]);
            console.log('downloadeddata: ')
            console.log(typeof downloadedData)
            // console.log(downloadedData)
            // const dataArray = Object.values(downloadedData)
            const dataArray = downloadedData.map(obj => Object.values(obj));
            console.log('Object.entries downloadeddata: ')
            console.log(typeof dataArray)
            console.log(dataArray)
            setData(downloadedData);
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