import React, {useEffect, useState} from 'react';
import {useStoreActions, useStoreState} from "easy-peasy";
import LoadImage from "./a_loadimage";
import ShowPhotoSlide from "./5_showPhoto-slide";
import {useParams} from "react-router-dom";
import path from "path";
import {fetchData} from "./a_CRUD_service";

function ShowCar() {
    // console.log(' show car ')
    let { id } = useParams();
    const [chosen, setChosen] = useState(id);
    const [error, setError] = useState(null);

    useEffect(() => {
        // dodac żę jak nie ma chosen to chosen jest loggedUser.
        // setShowLoading([true,0]);
        // if(chosen) {
            const urlPath = path.join('one/car',chosen)
            fetchData(urlPath)
                .then(data => {

                    // setShowLoading([false,0]);
                    setChosen(data);

                })
                .catch(err => {
                    setError(err.message);
                    // setShowLoading([false,0]);
                    console.error('|!| An error occurred:', err);
                    return <div> Error: {error}</div>;
                });
        // }
    }, []);


    // const setChosen = useStoreActions(actions => actions.setChosen);
    // const chosen = useStoreState(state => state.chosen);
    // const setPage = useStoreActions(actions => actions.setPage);
    // setChosen(id);

    // let chosen = id;

    return (
        <section className="userPanel_main">
            {chosen ? <>
                <div className="showtrip_header">
                    <p > {chosen.carMaker} {chosen.carBrand} </p>
                    <p className="fnt_subtitle"> {chosen.carStyleType} | {chosen.carPurposeType}</p>

                </div>
                {/*<LoadImage imageName={chosen.carPhoto} imageWidth='100%' imagePath='images/users' photoClass="showtrip_photoStyle" />*/}
                <div>
                    <ShowPhotoSlide photo={chosen.carPhoto} style={'showtrip_photoStyle'} photoPath='images/users'/>
                </div>

                {/*<div className="showtrip_description">*/}
                {/*    <p>about my car:</p>*/}
                {/*    <p className="fnt_subtitle">{chosen.carDescription}</p>*/}
                {/*</div>*/}

                <div className="showtrip_main">
                   {/*poprawić className ^^^*/}
                    <p>technical stuff</p>
                    <p className="fnt_subtitle">{chosen.carEngine} with {chosen.carEnginePower}</p>
                </div>
                <div className="showtrip_description">
                    <p>about my car:</p>
                    <p className="fnt_subtitle">{chosen.carDescription}</p>
                </div>
            </>:<p> loading data </p>}



        </section>




    );
}

export default ShowCar;

// photoClass={}