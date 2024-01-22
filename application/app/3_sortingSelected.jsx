import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {useStoreActions, useStoreState} from "easy-peasy";
import { Link } from "react-router-dom";
import ShowTrip from "./3_showTrip";
import TripBox from "./2_tripBox";
import GroupBox from "./3_groupBox";
import Gmap from "./2_map";
import CarBox from "./3_carBox";

function SortingSelected({inputData, map, selected }) {

    const tripSort = useStoreState(state => state.tripSort);
    const setPage = useStoreActions(actions => actions.setPage);
    const setTripId = useStoreActions(actions => actions.setTripId);
    const setShowLoading = useStoreActions(actions => actions.setShowLoading);

    // console.log('sorting vvvvvvvv')
    // console.log('input data JSON ' + JSON.stringify(inputData))
    // console.log('input data ' + inputData)
    // console.log('selected: ' + selected)

    const sortAvg = () => {
        setShowLoading([true,0]);
        inputData.forEach(trip => {
            let sum = 0;
            if (Array.isArray(trip.tripRate)) {
                trip.tripRate.forEach(rateObj => {
                    sum += rateObj.rate;
                });
                trip.averageRate = sum / trip.tripRate.length;
            } else {trip.averageRate = 0}
            setShowLoading([false,0]);
        });
    }
    if (inputData) {
        if (selected === 'trips') {
            // console.log(' sorting - trips')
            if (tripSort === "Z - A") inputData.sort((a, b) => b.tripName.localeCompare(a.tripName));
            if (tripSort === "A - Z") inputData.sort((a, b) => a.tripName.localeCompare(b.tripName));
            if (tripSort === "BEST first") {
                sortAvg();
                inputData.sort((a, b) => b.averageRate - a.averageRate);
            }
            if (tripSort === "best last") {
                sortAvg();
                inputData.sort((a, b) => a.averageRate - b.averageRate);
            }
            if (tripSort === "new last") inputData.sort((a, b) => new Date(a.tripSaveDate) - new Date(b.tripSaveDate));
            if (tripSort === "new first") inputData.sort((a, b) => new Date(b.tripSaveDate) - new Date(a.tripSaveDate));
            if (tripSort === "new trip date last") inputData.sort((a, b) => new Date(a.tripDate) - new Date(b.tripDate));
            if (tripSort === "new trip date first") inputData.sort((a, b) => new Date(b.tripDate) - new Date(a.tripDate));
        }
        if (selected === 'groups') {
            // console.log(' sorting - groups')
            if (tripSort === "Z - A") inputData.sort((a, b) => b.name.localeCompare(a.name));
            if (tripSort === "A - Z") inputData.sort((a, b) => a.name.localeCompare(b.name));
            if (tripSort === "new last") inputData.sort((a, b) => new Date(a.saveDate) - new Date(b.saveDate));
            if (tripSort === "new first") inputData.sort((a, b) => new Date(b.saveDate) - new Date(a.saveDate));
        }
        if (selected === 'cars') {
            // console.log(' sorting - cars')
            if (tripSort === "Z - A") inputData.sort((a, b) => b.carMaker.localeCompare(a.carMaker));
            if (tripSort === "A - Z") inputData.sort((a, b) => a.carMaker.localeCompare(b.carMaker));
            if (tripSort === "new last") inputData.sort((a, b) => new Date(a.carSaveDate) - new Date(b.carSaveDate));
            if (tripSort === "new first") inputData.sort((a, b) => new Date(b.carSaveDate) - new Date(a.carSaveDate));
        }
    }
// // Posortuj tablicę na podstawie średniej
//     trips.sort((a, b) => b.averageRate - a.averageRate);
//     console.log('JSON.stringify(tripData)')
//     console.log(JSON.stringify(tripData))
    return (
        <div className="trips_container divHeightTemp">
            {map  ? <>
                {inputData ? <> <Gmap tripData={inputData}/> </> : <> no data. </> }
                </>
            :
            <>
                {inputData ? <>
                       {inputData.map((obj) => {
                            return (
                                <div key={obj._id} >
                                    {(selected === 'trips' ?
                                    <Link to={`/showtrip/${obj._id}`} onClick={()=>{
                                        setTripId(obj._id)
                                        setPage("showTrip");
                                    }}>
                                        <TripBox trip={obj}/>
                                    </Link> : <></> )}
                                    {(selected === 'groups' ? <Link to={`/showgroup/${obj._id}`} onClick={()=>{
                                        setPage("showTrip");
                                    }}>
                                        <GroupBox group={obj}/>
                                    </Link> : <></> )}
                                    {(selected === 'cars' ? <Link to={`/showcar/${obj._id}`} onClick={()=>{
                                        setPage("showCar");
                                    }}>
                                        <CarBox car={obj}/>
                                    </Link> : <></> )}
                                </div>
                            );
                        })}
                  </> : <>
                no data.
                </> }
            </>}
        </div>
    );
};
export default SortingSelected;