import React, {useEffect, useState} from 'react';
import {useStoreActions, useStoreState} from "easy-peasy";
import {fetchData, updateData} from "./a_CRUD_service";
import LoadImage from "./a_loadimage";
import ShowRate from "./4_showRate";
import RateModule from "./4_rateModule";
import {calculateTheAverage} from "./calculateTheAverage";
import ShowComments from "./4_showComments";
import AddComment from "./5_addComment";
import ShowPhotoSlide from "./5_showPhoto-slide";



function ShowTrip() {
    const page = useStoreState(state => state.page);
    const tripId = useStoreState(state => state.tripId);
    const loggedUser = useStoreState(state => state.loggedUser);
    const setPage = useStoreActions(actions => actions.setPage);
    const setTripId = useStoreActions(actions => actions.setTripId);
    const setChosen = useStoreActions(actions => actions.setChosen);

    const [data, setData] = useState(null);
    const [addComm, setAddComm] = useState(null);
    const displayStyles = useStoreState(state => state.displayStyles);

    useEffect(() => {
        const target = `one/trip/${tripId}`
        fetchData(target).then(downloadedData => {
            console.log(downloadedData)
            setData(downloadedData)
        });
    }, [addComm]);
    async function saveDataFn(saveData) {
        let rateArr = [];
        if (!data.tripRate) {data.tripRate = {}};

        if (Object.keys(data.tripRate).length !== 0) {
            rateArr = [...data.tripRate] };
        const index = rateArr.findIndex((rateObj) => rateObj.user === loggedUser._id);
        if (index !== -1) {
            rateArr[index] = saveData
        } else {
            rateArr.push(saveData);
        }
        const dataToSave = {
            tripRate: rateArr,
            };
        const target = `trip/${tripId}`
        await updateData(target,dataToSave);
        //     .then(downloadedData => {
        //     setData(downloadedData[0])
        // });
    }

    function chosenFn(user) {
        setChosen(user);
        setPage("aboutMe");
    }
    return (
        <section className={`userPanel_main colorstyle_reflex_${displayStyles}`}>
        {/*<section className="mainViewStyle">*/}
            {data ? (<section className="">
                <header className="showtrip_header">
                    <div>
                        <h3>   {data.tripName} </h3>
                        <p className="fnt_subtitle">{data.tripType} in {data.tripCountry || 'unknown'}</p>
                    </div>

                    {loggedUser._id ? <RateModule
                        tripId = {data._id}
                        tripRate = {data.tripRate}
                        onRatingChange={(value) => saveDataFn({rate: value, user:loggedUser._id})}/> :  <ShowRate
                        rateArr={data.tripRate}/> }
                    {/*<p>like: {rateValue} of {quantity} </p>*/}
                        {/*onRatingChange={(value) => data.tripRate = {rate: value, user:'loggedUser'}}/>*/}

                </header>
                <div className={`showtrip_main colorstyle_button_${displayStyles}`}>
                    <button>   photo </button>
                    <button disabled>   map </button>
                    <button onClick={()=> window.location.href = '#tripDescription'}>   story </button>
                    <button onClick={()=> chosenFn(data.tripUserId)}>   {data.tripUser} </button>
                    <button onClick={()=>{setChosen(data.tripCar);
                        setPage("showcar");}}>   {data.tripCar} </button>
                </div>

                {data.tripPhoto ? <ShowPhotoSlide
                                photo={data.tripPhoto}
                                style={'aboutme_PhotoCar'}/> : <p>no photo</p>}

                <div id="tripDescription" className="showtrip_description">
                    <p>   {data.tripDescription} </p>
                </div>
                <div className={`showtrip_main colorstyle_button_${displayStyles}`}>
                    {loggedUser ? <button disabled>Like It</button> : <p>register to like it</p>}
                    {loggedUser ? <button onClick={()=>setAddComm(true)}>Comment</button> : <p>register to comment</p>}

                    <button disabled>Share</button>

                </div>
                {addComm ? <>
                    <AddComment
                        author={loggedUser}
                        trip={data}
                        setAddComm={setAddComm}/>
                    </>: <></>}
                <div id="tripComm" className="showtrip_description">
                    {data.tripComments ? <><ShowComments tripComments={data.tripComments} tripId={data._id}/></> : <p>no comments</p>}
                </div>
            </section>) : (<p>loading data</p>) }
        </section>
    );
}

export default ShowTrip;