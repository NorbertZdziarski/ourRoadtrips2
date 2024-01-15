import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import {useStoreActions, useStoreState} from "easy-peasy";
import {fetchData, updateData} from "./a_CRUD_service";
// import LoadImage from "./a_loadimage";
import ShowRate from "./4_showRate";
import RateModule from "./4_rateModule";
import {calculateTheAverage} from "./calculateTheAverage";
import ShowComments from "./4_showComments";
import AddComment from "./5_addComment";
import ShowPhotoSlide from "./5_showPhoto-slide";
// import Gmap from "./2_map";
// import AddRoute from "./3_add_route";
import ShowMap from "./3_show_map";
import { useParams } from 'react-router-dom';
import Anim_loading from "./anim_loading";

function ShowTrip() {
    let { id } = useParams();
    // console.log(' | show trip |')
    // const page = useStoreState(state => state.page);
    // // const tripId_memory = useStoreState(state => state.tripId);
    const tripId = id;
    const setShowLoading = useStoreActions(actions => actions.setShowLoading);
    const loggedUser = useStoreState(state => state.loggedUser);
    // const setPage = useStoreActions(actions => actions.setPage);
    // console.log(typeof loggedUser)
    // console.log(typeof setPage)
    // const setTripId = useStoreActions(actions => actions.setTripId);
    const setChosen = useStoreActions(actions => actions.setChosen);

    const [data, setData] = useState(null);
    const [addComm, setAddComm] = useState(null);
    const [showMap, setShowMap] = useState(false);
    const displayStyles = useStoreState(state => state.displayStyles);
    // console.log(typeof data)
    // console.log(typeof setData())
    // console.log(typeof addComm)
    // console.log(typeof showMap)
    // console.log(typeof displayStyles)

    // console.log(' show trip id: ' + tripId + ' id: '+ id)

    useEffect(() => {
        // console.log('| use efect _ show trip')

        const target = `one/trip/${tripId}`
        const fetchDataAsync = async () => {
            setShowLoading([true,0]);
            try {
                const downloadedData = await fetchData(target);
                // console.log(downloadedData);
                // console.log(typeof downloadedData);
                setData(downloadedData);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
            setShowLoading([false,0]);
        };
        fetchDataAsync();
    }, []);

    //
    // const fnShowMap = () => {
    //     setShowMap(!showMap);
    // }

    async function saveDataFn(saveData) {
        // console.log(JSON.stringify(saveData))

        setShowLoading([true,0]);
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
        setShowLoading([false,0]);
        // console.log(typeof dataToSave);
        //     .then(downloadedData => {
        //     setData(downloadedData[0])
        // });
    }
    // console.log('68')
    function chosenFn(user) {
        setChosen(user);
    //     setPage("aboutMe");
    }
    if (data) console.log('data.tripRate ' + data.tripRate)
    return (
        // <section className={`userPanel_main divHeightTemp colorstyle_reflex_${displayStyles}`}>
        <section className={`userPanel_main colorstyle_reflex_${displayStyles}`}>
        <section className="mainViewStyle divHeightTemp">
            {data ? <>
                <header className="showtrip_header">
                    <div>
                        <h3>   {data.tripName} </h3>
                        <p className="fnt_subtitle">{data.tripType} in {data.tripCountry || 'unknown'}</p>
                    </div>

                    {loggedUser._id ? <RateModule
                        tripId = {data._id}
                        tripRate = {data.tripRate}
                        onRatingChange={(value) => saveDataFn({rate: value, user:loggedUser._id})}/> :
                        <ShowRate rateArr={data.tripRate}/> }
                    {/*UWAGA !!!!!!!!!!!!!!!!!!!! - poniżej coś jest nie teges!*/}
                    {/*<p>like: {rateValue} of {quantity} </p>*/}
                    {/*   <onRatingChange={(value) => data.tripRate = {rate: value, user:'loggedUser'}}/>*/}

                </header>
                <div className={`showtrip_main colorstyle_button_${displayStyles} buttons_inline`}>
                    <button onClick={()=>setShowMap(false)}>   photo </button>
                    <button onClick={()=>setShowMap(true)}>   map </button>
                    <button onClick={()=> {
                        setShowMap(false);
                        // window.location.href = '#tripDescription'
                    }}>   story </button>

                    {data.userId ?
                        <Link to={`/aboutme/${data.userId}`} onClick={()=>{
                            setShowMap(false);
                            // setPage("showTrip");
                            }}>
                                {data.tripUser}
                        </Link> : <></>}
                    {data.tripCar ?
                        <Link to={`/showcar/${data.tripCar[1]}`} onClick={()=>{
                                setShowMap(false);
                                // setPage("showcar");
                            }}>
                                {data.tripCar[0]}
                        </Link> : <></>}

                    {/*<button onClick={()=> { /aboutme*/}
                    {/*    */}
                    {/*    chosenFn(data.userId)*/}
                    {/*}}>    </button>*/}
                      {/*  <button disabled={!data.tripCar} onClick={()=>{*/}
                      {/*      setShowMap(false);*/}
                      {/*      setChosen();*/}
                      {/*setPage("");*/}
                      {/*  }}>    </button>*/}
                </div>
                {showMap ? <><ShowMap country={data.tripCountry} tripMap={data.tripMap}/></> : <>
                    {data.tripPhoto ? <ShowPhotoSlide
                        photo={data.tripPhoto}
                        style={'aboutme_PhotoCar'}/> : <p>no photo</p>}
                </> }


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
            </> : <Anim_loading />}
            </section>
        </section>
    );
}

export default ShowTrip;