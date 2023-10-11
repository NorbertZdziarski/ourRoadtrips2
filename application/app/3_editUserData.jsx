import React from 'react';
import MyForm from "./app_form";

function EditUserProfile() {

    // --------------------------------------------------- plik do usunięcia

    return (
        <section className="underConstruction">
            <h3 > edit user profile </h3>
            <section className="underConstruction">
                <div className="ramka">
                    <MyForm
                        type={"user"}/>
                </div>
            </section>
        </section>
    );
}

export default EditUserProfile;