import React, {useEffect, useState, useMemo} from 'react';
import LoadImage from "./a_loadimage";
import {useStoreActions, useStoreState} from "easy-peasy";
import RateModule from "./4_rateModule";
import ShowRate from "./4_showRate";
import ShowPhoto from "./5_showPhoto";
import icoChat from "../images/ico/chat.png"
import icotriprecreation from "../images/mug-saucer-solid.svg"
import icotripextreem from "../images/flag-checkered-solid.svg"
import icotripsightseeing from "../images/mountain-sun-solid.svg"
import {Link} from "react-router-dom";

function TripBox({trip}) {
    const setPage = useStoreActions(actions => actions.setPage);
    const setTripId = useStoreActions(actions => actions.setTripId);
    const displayStyles = useStoreState(state => state.displayStyles);
    const setShowLoading = useStoreActions(actions => actions.setShowLoading);

    window.onload = function() {
        var divHeight = document.getElementById('tripbox_title').offsetHeight;
        // console.log('div height: ' + divHeight)
        document.documentElement.style.setProperty('--tripbox_title-height', divHeight + 'px');
    };

    useEffect(() => {
        setShowLoading([true,1]);
        var divHeight = document.getElementById('tripbox_title').offsetHeight;
        // console.log('div height: ' + divHeight)
        document.documentElement.style.setProperty('--tripbox_title-height', divHeight + 'px');
        setShowLoading([false,0]);
    }, [trip.tripName, trip.tripUser]);

    // if (!shouldRender) return null;

    return (
        <div className={`clickPage colorStyle_clickPage_${displayStyles}`}>
            {/*<Link to="/" className="myLink" onClick={() => {setPage("mainPage")}}>  */}
            {/*<button className="btn_tripBox" onClick={()=> {*/}
            {/*    setPage("showTrip")*/}
            {/*    setTripId(trip._id)*/}
            {/*    } }>*/}
            <section className="tripInfo_mainpage_Info-tripRate">
                <ShowRate
                    rateArr={trip.tripRate}/>
            </section>
                <div className={`tripInfo_mainpage_box layout_flex-sb-directColumnToLine colorstyle_tripInfoBox_${displayStyles}`}>
                  <div>
                        <div id="tripbox_title" className={`tripInfo_mainpage_title colorstyle_borderB_${displayStyles}`}>{trip.tripName}</div>
                        <p className="trsipInfo_mainpage_author"> by: {trip.tripUser}</p>
                        <p className="tripInfo_mainpage_Info-country"> {trip.tripCountry}</p>
                    </div>
                    <div>
                        <section className={window.innerWidth < 950 ? 'layout_flex-sc-directColumn' : ''}>
                        {window.innerWidth < 950 ? <>
                            {trip.tripType === "recreation" ? <img src={icotriprecreation} className="icoStyleTripBox"/> : <></> }
                            {trip.tripType === "sightseeing" ? <img src={icotripsightseeing} className="icoStyleTripBox"/> : <></> }
                            {trip.tripType === "extreme" ? <img src={icotripextreem} className="icoStyleTripBox"/> : <></> }
                        </> : <section className="tripInfo_mainpage_Info-tripRate">
                            <ShowRate
                                rateArr={trip.tripRate}/>
                        </section> }

                        {/*<p className="tripInfo_mainpage_Info-tripComm">comments</p>*/}
                        {(trip.tripComments && trip.tripComments.length > 0) ? <img src={icoChat} className="icoStyleTripBox"/> : <></>}

                        {window.innerWidth < 950 ? null : <p className="tripInfo_mainpage_Info-tripType"> {trip.tripType}</p>}
                        </section>
                    </div>
                </div>
                {trip.tripPhoto ? <>
                    <ShowPhoto photo={trip.tripPhoto} style={"photoStyle"} source='trips' />
                </> : <p className="ramka">no photo.</p>}
            {/*</button>*/}
            {/*</Link>*/}
        </div>
    );
}
export default TripBox;