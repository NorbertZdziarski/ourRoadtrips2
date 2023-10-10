import React from 'react';
import MyForm from "./app_form";
import {useStoreState} from "easy-peasy";

function EditCar() {
    const dataId = useStoreState(state => state.dataId);
    console.log('edit: ' + dataId)
    return (
        <section className="underConstruction">
            <div className="ramka">
                <h3 > add car czy tam edit... się zobaczy </h3>
                <h2 > poki co wersja robocza do decyzji pozniej. </h2>
            </div>
            <div className="ramka">
                <MyForm
                    type={"car"}
                  />
            </div>
        </section>
    );
}

export default EditCar;