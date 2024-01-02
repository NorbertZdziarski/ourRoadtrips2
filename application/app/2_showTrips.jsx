import React, {useEffect, useState} from 'react';
import {fetchData} from "./a_CRUD_service";
import SortingTrips from "./3_sortingTrips";
import {useStoreActions} from "easy-peasy";

function ShowTrips({dataFilter, map}) {
    const [data, setData] = useState(null);
    const [filteredData, setFilteredData] = useState(null); // Dodaj to
    const [showOn, setShowOn] = useState(false)
    const setShowLoading = useStoreActions(actions => actions.setShowLoading);

    useEffect(() => {
        setShowLoading([true,0]);
        fetchData('all/trips').then(downloadedData => {
            const dataArray = downloadedData.map(obj => Object.values(obj));
            setData(downloadedData);
        });
    }, []);

    useEffect(() => {
        if (data) {
            const fData = data.filter(trip => {
                if (!trip.tripPublic) return false;
                if ((dataFilter[1] !== "all" && dataFilter[1] !== "choose a country") && dataFilter[1] !== trip.tripCountry) {
                    return false;
                }
                if ((dataFilter[2] !== "all" && dataFilter[2] !== "select the type of trip")&& dataFilter[2] !== trip.tripType) {
                    return false;
                }
                if (trip.tripCar && Array.isArray(trip.tripCar)) {
                    if (trip.tripCar[2] && (dataFilter[3] !== "all" && dataFilter[3] !=="select vehicle type" ) &&  dataFilter[3] !== trip.tripCar[2]) return false;
                }
                return true;
            });
            setFilteredData(fData);

        }
    }, [data, dataFilter]);

    useEffect(()=>{
        if (filteredData) setShowOn(true);
    },[filteredData])

    return (
        <section className="showTrips  ">
            {showOn ? (
                <SortingTrips tripData={filteredData}
                              map = {map}/>
            ) : (
                <p>data loading...</p>
            )}
        </section>
    );
}

export default ShowTrips;
