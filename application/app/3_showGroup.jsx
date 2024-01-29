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

import ShowMap from "./3_show_map";
import { useParams } from 'react-router-dom';
import LoadImage from "./a_loadimage";
import Anim_loading from "./anim_loading";

function ShowGroup() {
    let { id } = useParams();
    // console.log(' | show trip |')
    // const page = useStoreState(state => state.page);
    // // const tripId_memory = useStoreState(state => state.tripId);
    const tripId = id;

    const loggedUser = useStoreState(state => state.loggedUser);
    // const setPage = useStoreActions(actions => actions.setPage);
    // console.log(typeof loggedUser)
    // console.log(typeof setPage)
    // const setTripId = useStoreActions(actions => actions.setTripId);
    const setChosen = useStoreActions(actions => actions.setChosen);

    const [data, setData] = useState(null);
    const [addComm, setAddComm] = useState(null);
    const [showMap, setShowMap] = useState(false);
    const [showCars, setShowCars] = useState(false);
    const [showUsers, setShowUsers] = useState(false);
    const [showTrips, setShowTrips] = useState(false);
    const displayStyles = useStoreState(state => state.displayStyles);
    // console.log(typeof data)
    // console.log(typeof setData())
    // console.log(typeof addComm)
    // console.log(typeof showMap)
    // console.log(typeof displayStyles)

    // console.log(' show trip id: ' + tripId + ' id: '+ id)

    useEffect(() => {

        const target = `one/group/${tripId}`
        const fetchDataAsync = async () => {

            try {
                const downloadedData = await fetchData(target);
                // console.log(downloadedData);
                // console.log(typeof downloadedData);
                setData(downloadedData);
                setShowUsers(downloadedData.users)
                setShowCars(downloadedData.cars)
                setShowTrips(downloadedData.trips)
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchDataAsync();
    }, []);

    //
    // const fnShowMap = () => {
    //     setShowMap(!showMap);
    // }

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

    return (
        // <section className={`userPanel_main colorstyle_reflex_${displayStyles}`}>
        // <section className="mainViewStyle divHeightTemp">
        <section className={'divWidthTemp divHeightTemp showGroup'}>
            {data ? <>
                {/*className="showtrip_header"*/}
                <section >
                    <div>
                        <LoadImage imageName={data.photo[0]}
                                   imagePath={'images/groups'}
                                   photoClass={'showGroup_mainPhoto'}
                        />
                        <h3> {data.name} </h3>
                        <div className='showgroup_cover'>
                            <div>
                                <p>type of the group:  </p>
                                <p>about us: </p>
                                <p>founder of the group: </p>
                                <p>the group has existed since: </p>
                            </div>
                            <div>
                                <p>{data.type} </p>
                                <p>{data.description}</p>
                                <p>{data.owner}</p>
                                <p>date </p>
                            </div>


                        </div>
                        <nav className={'showgroup_cover'} >
                            <button disabled> JOIN US! </button> <button disabled> follow us </button>
                        </nav>
                        {/*className={`colorstyle_button_${displayStyles} fnt_subtitle`}*/}
                    </div>


                </section>

                <nav className={'layout_gridAuto'}>
                    <button disabled onClick={()=>setShowMap(false)}> TRIPS </button>
                    <button disabled onClick={()=>setShowMap(true)}> USERS </button>
                    <button disabled onClick={()=>setShowMap(true)}> CARS </button>
                    <button disabled onClick={()=>setShowMap(true)}> DISCUSSION </button>
                </nav>
                <div className={'fnt_subtitle '}>

                    <p> members of our group: </p>



                    <div className={'layout_flex_toColumn'}>
                    {data.users ? data.users.map((user) => (
                            <Link to={`/aboutme/${user.id}`} key={`keytrip${user.id}`} onClick={()=>{
                                setShowMap(false);
                                // setPage("showTrip");
                            }}>
                                <LoadImage imageName={user.photo || 'user.png'}
                                           imagePath='images/users'
                                           photoClass="userPanel_userPhoto"
                                />
                            </Link>
                    )) : null}
                    </div>
                    <p> our expeditions: </p>
                    <div className={'layout_flex_toColumn'}>
                    </div>
                    <p> our vehicles: </p>
                        <div className={'layout_flex_toColumn'}>
                        </div>
                    <p> discussion: </p>

                </div>

            {/*    <div className={`showtrip_main colorstyle_button_${displayStyles}`}>*/}
            {/*        {loggedUser ? <button disabled>Like It</button> : <p>register to like it</p>}*/}
            {/*        {loggedUser ? <button onClick={()=>setAddComm(true)}>Comment</button> : <p>register to comment</p>}*/}

            {/*        <button disabled>Share</button>*/}

            {/*    </div>*/}
            {/*    {addComm ? <>*/}
            {/*        <AddComment*/}
            {/*            author={loggedUser}*/}
            {/*            trip={data}*/}
            {/*            setAddComm={setAddComm}/>*/}
            {/*        </>: <></>}*/}
            {/*    <div id="tripComm" className="showtrip_description">*/}
            {/*        {data.tripComments ? <><ShowComments tripComments={data.tripComments} tripId={data._id}/></> : <p>no comments</p>}*/}
            {/*    </div>*/}
            </> : <Anim_loading /> }
            </section>
        // </section>
    );
}

export default ShowGroup;