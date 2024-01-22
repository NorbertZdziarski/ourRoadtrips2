import React, {useEffect, useState, useMemo} from 'react';
import LoadImage from "./a_loadimage";
import {useStoreActions, useStoreState} from "easy-peasy";
import RateModule from "./4_rateModule";
import ShowRate from "./4_showRate";
import ShowPhoto from "./5_showPhoto";
import icoChat from "../images/ico/chat.png"
import {Link} from "react-router-dom";

function GroupBox({group}) {



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
    }, [group.name, group.tripUser]);

    // if (!shouldRender) return null;

    return (
        <div className={`clickPage colorStyle_clickPage_${displayStyles}`}>
            {/*<Link to="/" className="myLink" onClick={() => {setPage("mainPage")}}>  */}
            {/*<button className="btn_tripBox" onClick={()=> {*/}
            {/*    setPage("showTrip")*/}
            {/*    setTripId(trip._id)*/}
            {/*    } }>*/}
                <div className={`tripInfo_mainpage_box layout_flex-sb-directColumn colorstyle_tripInfoBox_${displayStyles}`}>
                    <div>
                        <div id="tripbox_title" className={`tripInfo_mainpage_title colorstyle_borderB_${displayStyles}`}>{group.name}</div>
                        <p className="tripInfo_mainpage_author"> by: {group.owner}</p>
                        {/*<p className="tripInfo_mainpage_Info-country"> {group.tripCountry}</p>*/}
                    </div>
                    <div>
                        <div className="tripInfo_mainpage_Info-tripRate">
                            {/*<ShowRate*/}
                            {/*    rateArr={trip.tripRate}/>*/}
                        </div>
                        {/*<p className="tripInfo_mainpage_Info-tripComm">comments</p>*/}
                        {/*{(group.tripComments && group.tripComments.length > 0) ? <img src={icoChat} className="icoStyleTripBox"/> : <></>}*/}
                        <p className="tripInfo_mainpage_Info-tripType"> {group.type}</p>

                    </div>
                </div>
                <ShowPhoto photo={group.photo} style={"photoStyle"} source='groups' />

            {/*</button>*/}
            {/*</Link>*/}
        </div>
    );
}
export default GroupBox;
