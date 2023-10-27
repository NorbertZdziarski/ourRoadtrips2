import React, {useEffect, useState} from 'react';
import {useStoreActions, useStoreState} from "easy-peasy";
import {fetchData, updateData} from "./a_CRUD_service";
import LoadImage from "./a_loadimage";
import ShowRate from "./4_showRate";
import RateModule from "./4_rateModule";
import {calculateTheAverage} from "./calculateTheAverage";


function ShowTrip() {
    const page = useStoreState(state => state.page);
    const tripId = useStoreState(state => state.tripId);
    const loggedUser = useStoreState(state => state.loggedUser);
    const setPage = useStoreActions(actions => actions.setPage);
    const setTripId = useStoreActions(actions => actions.setTripId);

    const [data, setData] = useState(null);

    useEffect(() => {
        const target = `trip/${tripId}`
        fetchData(target).then(downloadedData => {
            setData(downloadedData[0])
        });
    }, []);
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


    return (
        <section className="mainViewStyle">
            {data ? (<section className="">
                <header className="showtrip_header">
                    <div>
                        <h3>   {data.tripName} </h3>
                        <p>{data.tripType}</p>
                    </div>

                    {loggedUser._id ? <RateModule
                        tripId = {data._id}
                        tripRate = {data.tripRate}
                        onRatingChange={(value) => saveDataFn({rate: value, user:loggedUser._id})}/> :  <ShowRate
                        rateArr={data.tripRate}/> }
                    {/*<p>like: {rateValue} of {quantity} </p>*/}
                        {/*onRatingChange={(value) => data.tripRate = {rate: value, user:'loggedUser'}}/>*/}

                </header>
                <div className="showtrip_main">
                    <button>   photo </button>
                    <button>   story </button>
                    <button>   map </button>
                    <button>   {data.tripUser} </button>
                    <button>   {data.tripCar} </button>
                </div>

                {data.tripPhoto ? <LoadImage imageName={data.tripPhoto}
                                             imagePath='images/trips'
                                             imageWidth='100%'
                                             photoClass="showtrip_photoStyle"
                /> : <p>no photo</p>}

                <div className="showtrip_description">
                    <p>   {data.tripDescription} </p>
                </div>
                <div className="showtrip_main">
                    <button disabled>Like It</button>
                    <button disabled>Comment</button>
                    <button disabled>Share</button>

                </div>
            </section>) : (<p>loading data</p>) }
        </section>
    );
}

export default ShowTrip;