import React, { useState, useEffect} from 'react';

import AddTripPage1 from "./3_addTripPage1";
import AddTripPage3 from "./3_addTripPage3";

import {getInitialFormData} from "./getInitialFormData";
import {useStoreActions, useStoreState} from "easy-peasy";

const AddTrip = () => {
    const [pageInputTrip, setPageInputTrip] = useState(1)

    const [formData, setFormData] = useState({});



    const handleSubmit = async (e) => {

        console.log(' ------ TYPE: ' + type)
        console.log(' ---- trip public: ' + formData.tripPublic)

        e.preventDefault();
        // setShowLoading([true,0]);
        let error = '';

        // if (temporaryPass1) {
        //     console.log(' handle change temp 1')
        //     if (temporaryPass1 === temporaryPass2) {
        //
        //         setFormData({...formData, password: temporaryPass1})
        //
        //     } else {
        //
        //         // error += 'błąd hasła!';
        //
        //     }}
        //
        // setFormError(error)
        // if (error) return;

        let newFileName;

        // if (type === 'trip') {
        //     if (file) {
        //         await addMultiFiles().then((responseData)=> {
        //             addDataToMongo(responseData)
        //         });
        //     } else {
        //         await addDataToMongo(formData)
        //     }
            // setShowLoading([false,0]);
            setPage("mainPage");
        // }


        setYesOrNot(prevState => {
            let newArray = [...prevState.yesOrNot];
            newArray[2] = false;
            return {array: newArray};
        });
        // setShowLoading([false,0]);
        // setPage("userProfile");
    };


    const buttons = document.querySelectorAll('.addTrip_inputBox button');
    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            buttons.forEach((btn, i) => {
                if (i < index) {
                    btn.className = 'below';
                } else if (i === index) {
                    btn.className = 'current';
                } else {
                    btn.className = 'above';
                }
            });
        });
    });


    // const divs = document.querySelectorAll('.addTrip_inputBox div');
    // divs.forEach((div, index) => {
    //     div.addEventListener('click', () => {
    //         divs.forEach((dv, i) => {
    //             if (i < index) {
    //                 dv.className = 'below';
    //             } else {
    //                 dv.className = 'above';
    //             }
    //         });
    //     });
    // });


    return (<>
        <section className={`addTrip`}>
            <div >
                {(pageInputTrip === 1) ? <AddTripPage1 page={0} setPageInputTrip={setPageInputTrip} pageInputTrip={pageInputTrip}/> : <></>}
                {(pageInputTrip === 2) ? <AddTripPage1 page={1} setPageInputTrip={setPageInputTrip} pageInputTrip={pageInputTrip}/> : <></>}
                {(pageInputTrip === 3) ? <AddTripPage3 setPageInputTrip={setPageInputTrip} pageInputTrip={pageInputTrip}/> : <></>}
                {(pageInputTrip === 4) ? <AddTripPage1 page={3} setPageInputTrip={setPageInputTrip} pageInputTrip={pageInputTrip}/> : <></>}
            </div>

            <div className={`addTrip_inputBox`}>
                <button disabled onClick={()=> setPageInputTrip(1)}>1</button>
                <div />
                <button disabled onClick={()=> setPageInputTrip(2)}>2</button>
                <div />
                <button disabled onClick={()=> setPageInputTrip(3)}>3</button>
                <div />
                <button disabled onClick={()=> setPageInputTrip(4)}>4</button>
            </div>
        </section>
    </>)
}

export default AddTrip;