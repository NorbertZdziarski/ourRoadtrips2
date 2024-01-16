import React, {useEffect, useState, useMemo} from 'react';
import LoadImage from "./a_loadimage";
import {useStoreActions, useStoreState} from "easy-peasy";
import RateModule from "./4_rateModule";
import ShowRate from "./4_showRate";
import ShowPhoto from "./5_showPhoto";
import icoChat from "../images/ico/chat.png"
import {Link} from "react-router-dom";
import icopetrolpb from "../images/dispenser.png";
import icopetroldiesel from "../images/dispenser.png";
import icopetrolbev from "../images/energy.png";
import icocarcar from "../images/car.png";
import icocar4x4 from "../images/4x4.png";
import icocarbike from "../images/bike.png";
import icocarcamper from "../images/van.png";


function CarBox({car}) {
    const setPage = useStoreActions(actions => actions.setPage);
    const setTripId = useStoreActions(actions => actions.setTripId);
    const displayStyles = useStoreState(state => state.displayStyles);
    const setShowLoading = useStoreActions(actions => actions.setShowLoading);
    console.log(' group box ')
    // window.onload = function() {
    //     var divHeight = document.getElementById('tripbox_title').offsetHeight;
    //     // console.log('div height: ' + divHeight)
    //     document.documentElement.style.setProperty('--tripbox_title-height', divHeight + 'px');
    // };

    // useEffect(() => {
    //     if (car) {
    //         setShowLoading([true, 1]);
    //         var divHeight = document.getElementById('tripbox_title').offsetHeight;
    //         // console.log('div height: ' + divHeight)
    //         document.documentElement.style.setProperty('--tripbox_title-height', divHeight + 'px');
    //         setShowLoading([false, 0]);
    //     }
    // }, [car.carMaker]);

    // if (!shouldRender) return null;
    // if (car) console.log(JSON.stringify(car))
    return (
        <div className={`clickPage colorStyle_clickPage_${displayStyles}`}>
            {/*<Link to="/" className="myLink" onClick={() => {setPage("mainPage")}}>  */}
            {/*<button className="btn_tripBox" onClick={()=> {*/}
            {/*    setPage("showTrip")*/}
            {/*    setTripId(trip._id)*/}
            {/*    } }>*/}
            {car ? <>
                <div className={`tripInfo_mainpage_box layout_flex-sb-directColumn colorstyle_tripInfoBox_${displayStyles}`}>
                    <div>
                        {/*<div id="tripbox_title" className={`tripInfo_mainpage_title colorstyle_borderB_${displayStyles}`}>{car.name}</div>*/}
                        <p className="tripInfo_mainpage_author"> {car.carMaker} {car.carBrand}</p>
                        {/*<p className="tripInfo_mainpage_Info-country"> {group.tripCountry}</p>*/}
                    </div>
                    <div>
                        <div className="tripInfo_mainpage_Info-tripRate">
                            {/*<ShowRate*/}
                            {/*    rateArr={trip.tripRate}/>*/}
                        </div>
                        {/*<p className="tripInfo_mainpage_Info-tripComm">comments</p>*/}
                        {/*{(group.tripComments && group.tripComments.length > 0) ? <img src={icoChat} className="icoStyleTripBox"/> : <></>}*/}
                        <p className="tripInfo_mainpage_Info-tripType"> {car.carStyleType}</p>
                        {car.carStyleType?<>
                            {(car.carStyleType==="car")?<img src={icocarcar} className={`header_ico ico_${displayStyles}`} />:null}
                            {(car.carStyleType==="bike")?<img src={icocarbike} className={`header_ico ico_${displayStyles}`} />:null}
                            {(car.carStyleType==="4x4")?<img src={icocar4x4} className={`header_ico ico_${displayStyles}`} />:null}
                            {(car.carStyleType==="camper")?<img src={icocarcamper} className={`header_ico ico_${displayStyles}`} />:null}
                            {(car.carStyleType==="other")?<img src={icocarcar} className={`header_ico ico_${displayStyles}`} />:null}

                        </>:null}
                        <p className="tripInfo_mainpage_Info-tripType">
                            {car.carFuelType?<>
                                {(car.carFuelType==='petrol')?<img src={icopetrolpb} className={`header_ico ico_${displayStyles}`} />:null}
                                {(car.carFuelType==='diesel')?<img src={icopetroldiesel} className={`header_ico ico_${displayStyles}`} />:null}
                                {(car.carFuelType==='electric')?<img src={icopetrolbev} className={`header_ico ico_${displayStyles}`} />:null}

                            </>:null}


                        </p>

                    </div>
                </div>
                <ShowPhoto photo={car.carPhoto} style={"photoStyle"} source='cars' />
                </> : <></> }
            {/*</button>*/}
            {/*</Link>*/}
        </div>
    );
}
export default CarBox;
