import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate, useMatch} from 'react-router-dom';
import {fetchData} from "./a_CRUD_service";
import SortingSelected from "./3_sortingSelected";
import {useStoreActions} from "easy-peasy";
import Anim_loading from "./anim_loading";

function ShowSelected({dataFilter, map, selected}) {
    const [data, setData] = useState(null);
    const [filteredData, setFilteredData] = useState(null); // Dodaj to
    const [showOn, setShowOn] = useState(false)
    const setShowLoading = useStoreActions(actions => actions.setShowLoading);


    useEffect(() => {
        if (!!selected) {
            setShowLoading([true,0]);
              let target;
            if (selected === 'trips') {
                target = 'all/trips';
            } else if (selected === 'groups') {
                target = 'all/groups';
            } else {
                // do zmiany !!! na samochody !!!
                target = 'all/cars';
            }
            // console.log("target " + target)
            fetchData(target).then(downloadedData => {
                // console.log("downloadedData " + downloadedData)
                // console.log("downloadedData JSON " + JSON.stringify(downloadedData))
                const dataArray = downloadedData.map(obj => Object.values(obj));

                setData(downloadedData);
                if (selected === 'groups') {setFilteredData(downloadedData)};
                if (selected === 'cars') {setFilteredData(downloadedData)};
            });
        }
    }, [selected]);

    useEffect(() => {

        if (selected === 'trips') {
            if (data) {
                setShowLoading([true,0]);
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
        }

    }, [data, dataFilter]);

    useEffect(()=>{
        if (filteredData) {
            setShowLoading([false,0]);
            setShowOn(true);}
    },[filteredData])

    return (
        <section className="showTrips  ">
            {showOn ? (<>
                {/*{(selected === 'trips' ? <p></p> : null )}*/}
                {(selected === 'groups' ? <><h4 className={'showSelected_header'}>ourGroups</h4></> : null )}
                {(selected === 'cars' ? <><h4 className={'showSelected_header'}>ourCars</h4></> : null )}
                <SortingSelected inputData={filteredData}
                                 map = {map}
                                 selected={selected}/>
            </>) : ( <Anim_loading />)}
        </section>
    );
}

export default ShowSelected;
