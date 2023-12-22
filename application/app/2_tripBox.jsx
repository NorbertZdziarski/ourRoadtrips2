import React, {useEffect, useState} from 'react';
import LoadImage from "./a_loadimage";
import {useStoreActions, useStoreState} from "easy-peasy";
import RateModule from "./4_rateModule";
import ShowRate from "./4_showRate";
import ShowPhoto from "./5_showPhoto";
import icoChat from "../images/ico/chat.png"
import {Link} from "react-router-dom";

function TripBox({trip, dataFilter}) {
    // console.log('trip: ' + trip)
    // console.log('trip json: ' + JSON.stringify(trip))
    // console.log('data filter: ' + dataFilter)
    const setPage = useStoreActions(actions => actions.setPage);
    const setTripId = useStoreActions(actions => actions.setTripId);
    const displayStyles = useStoreState(state => state.displayStyles);
    const setShowLoading = useStoreActions(actions => actions.setShowLoading);

    // if (!trip.tripPublic) console.log('trip: ' + trip.tripPublic + ' - name: ' + trip.tripName);
    if (!trip.tripPublic) return null;

    if ((dataFilter[1] !== "all" && dataFilter[1] !== "choose a country") && dataFilter[1] !== trip.tripCountry) {
        return null;
    }
    if ((dataFilter[2] !== "all" && dataFilter[2] !== "select the type of trip")&& dataFilter[2] !== trip.tripType) {return null;}

    // ---- poniżej weryfikuje czy tripcar jest tablicą. Teraz car będzie miało swoją bazę danych. W tripcar będzie jego ID. ====

    // if (!Array.isArray(trip.tripCar)) {return <p> brak tablicy </p>} else {console.log('trip box | tripCar: ' + trip.tripCar)}
    // if (trip.tripCar && Array.isArray(trip.tripCar)) {
    //     console.log('warunek 1')
    //     console.log('tripcar 2: ' + trip.tripCar[2])
    //     console.log('data filter 3: ' + dataFilter[3])
    //     if (trip.tripCar[2] && (dataFilter[3] !== "all" && dataFilter[3] !=="select vehicle type" ) &&  dataFilter[3] !== trip.tripCar[2]) return null;
    // }


    // if (choiceVehicleType !== "all" && choiceVehicleType !== trip.tripCar.vehicle) return null;

    // window.onload = function() {
    //     var divHeight = document.getElementById('tripbox_title').offsetHeight;
    //     console.log('div height: ' + divHeight)
    //     document.documentElement.style.setProperty('--tripbox_title-height', divHeight + 'px');
    // };

    console.log('trip box')
    useEffect(() => {
        setShowLoading([true,1]);
        var divHeight = document.getElementById('tripbox_title').offsetHeight;
        // console.log('div height: ' + divHeight)
        document.documentElement.style.setProperty('--tripbox_title-height', divHeight + 'px');
        setShowLoading([false,0]);
    }, [trip.tripName, trip.tripUser]);

    return (
        <div className={`clickPage colorStyle_clickPage_${displayStyles}`}>
            {/*<Link to="/" className="myLink" onClick={() => {setPage("mainPage")}}>  */}
            {/*<button className="btn_tripBox" onClick={()=> {*/}
            {/*    setPage("showTrip")*/}
            {/*    setTripId(trip._id)*/}
            {/*    } }>*/}
                <div className={`tripInfo_mainpage_box layout_flex-sb-directColumn colorstyle_tripInfoBox_${displayStyles}`}>
                    <div>
                        <div id="tripbox_title" className={`tripInfo_mainpage_title colorstyle_borderB_${displayStyles}`}>{trip.tripName}</div>
                        <p className="tripInfo_mainpage_author"> by: {trip.tripUser}</p>
                        <p className="tripInfo_mainpage_Info-country"> {trip.tripCountry}</p>
                    </div>
                    <div>
                        <div className="tripInfo_mainpage_Info-tripRate">
                            <ShowRate
                                rateArr={trip.tripRate}/>
                        </div>
                        {/*<p className="tripInfo_mainpage_Info-tripComm">comments</p>*/}
                        {(trip.tripComments && trip.tripComments.length > 0) ? <img src={icoChat} className="icoStyleTripBox"/> : <></>}
                        <p className="tripInfo_mainpage_Info-tripType"> {trip.tripType}</p>

                    </div>
                </div>




                {trip.tripPhoto ? <>
                {/*    <LoadImage imageName={trip.tripPhoto}*/}
                {/*       imagePath='images/trips'*/}
                {/*       imageWidth='400px'*/}
                {/*       photoClass="photoStyle"*/}
                {/*/>*/}
                    <ShowPhoto photo={trip.tripPhoto} style={"photoStyle"} source='trips' />
                </> : <p className="ramka">no photo.</p>}
            {/*</button>*/}
            {/*</Link>*/}
        </div>
    );
}

export default TripBox;