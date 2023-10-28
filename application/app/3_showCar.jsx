import React from 'react';
import {useStoreActions, useStoreState} from "easy-peasy";
import LoadImage from "./a_loadimage";

function ShowCar() {
    const setChosen = useStoreActions(actions => actions.setChosen);
    const chosen = useStoreState(state => state.chosen);
    const setPage = useStoreActions(actions => actions.setPage);
    console.log(chosen)
    return (
        <section className="showCar_conteiner">
            <div className="showtrip_header">
                <p > {chosen.carMaker} {chosen.carBrand} </p>
                <p className="fnt_subtitle"> {chosen.carStyleType} | {chosen.carPurposeType}</p>

            </div>
            <LoadImage imageName={chosen.carPhoto} imageWidth='100%' imagePath='images/users' photoClass="showtrip_photoStyle" />
            <div className="showtrip_main">
                <p>technical stuff</p>
                <p className="fnt_subtitle">{chosen.carEngine} with {chosen.carEnginePower}</p>
            </div>
            <div className="showtrip_description">
                <p>about my car:</p>
                <p className="fnt_subtitle">{chosen.carDescription}</p>
            </div>




        </section>




    );
}

export default ShowCar;

// photoClass={}