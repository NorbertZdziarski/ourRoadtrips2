import React from 'react';
import MyForm from "./app_form.jsx";

function EditTrip() {

    // --------------------------------------------------- plik do usunięcia

    return (
        <section className="underConstruction">
            <h3 > edit trip </h3>
            <div className="ramka">
                <MyForm
                    type={"trip"}/>
            </div>
        </section>
    );
}

export default EditTrip;