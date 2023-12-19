import React, {useEffect, useState} from 'react';

import AddTripPage1 from "./3_addTripPage1";
import AddTripPage3 from "./3_addTripPage3";

import {useStoreActions, useStoreState} from "easy-peasy";
import addMultiFiles from "./a_addMultiFiles";
import addDataToMongo from "./a_addDataToMongo";
import {getInitialFormData} from "./getInitialFormData";

const AddTrip = () => {
    const loggedUser = useStoreState(state => state.loggedUser);
    const [pageInputTrip, setPageInputTrip] = useState(1)
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({});
    const [formDataToSave, setFormDataToSave] = useState({});
    const type = 'trip';
    const dataId = useStoreState(state => state.dataId);
    const setPage = useStoreActions(actions => actions.setPage);
    // const [formDataPage, setFormDataPage] = useState({});
    const setShowLoading = useStoreActions(actions => actions.setShowLoading);
    const [okPrint, setOkPrint] = useState(false);
    const keysToCopy = [['tripName', 'tripDescription', 'tripDate','tripCountry','tripType'],['tripCar'],['tripMap'],['tripPhoto']];
    const [formDataPage1, setFormDataPage1] = useState({});
    const [formDataPage2, setFormDataPage2] = useState({});
    const [formDataPage4, setFormDataPage4] = useState({});

    //
    useEffect(() => {
        console.log('--------------------------- ADD TRIP -------------------------------------')
        console.log('--use effect | fetchData | line 27 ---')

        const fetchData = async () => {
            const data = await getInitialFormData(type, loggedUser, formData);
            console.log('ADD TRIP | data: ' + data)
            setFormData(data);
            console.log(' finish update use efect | fetch')

            const objectToSave1 = keysToCopy[0].reduce((result, key) => {
                console.log(result)
                if (key in data) {
                    result[key] = data[key];
                }
                return result;
            }, {});

            setFormDataPage1(objectToSave1);
            const objectToSave2 = keysToCopy[1].reduce((result, key) => {
                console.log(result)
                if (key in data) {
                    result[key] = data[key];
                }
                return result;
            }, {});

            setFormDataPage2(objectToSave2);
            const objectToSave3 = keysToCopy[3].reduce((result, key) => {
                console.log(result)
                if (key in data) {
                    result[key] = data[key];
                }
                return result;
            }, {});

            setFormDataPage4(objectToSave3);

        };

        // const fetchDataAndUpdate = async () => {
        //     console.log('---------------add trip page _ useEffect -------------------------')
        //     console.log(formData)
        //     console.log(JSON.stringify(formData));
        //     console.log('txt test')
        //     console.log('page input trip: ' + pageInputTrip);


        fetchData().then(setOkPrint(true));
    }, []);


    const handleSubmit = async () => {

        // console.log(' ------ TYPE: ' + type)
        console.log(' ---- trip public: handleSubmit ')
        console.log(' ---- trip public: ' + formData.tripPublic)
        console.log(' ---- handle submit: ' + formData)
        console.log(' ---- JSON: ' + JSON.stringify(formData))
        console.log(' ---- handle submit: ' + formDataToSave)
        console.log(' ---- JSON: ' + JSON.stringify(formDataToSave))

        // e.preventDefault();
        setShowLoading([true,0]);
        // let error = '';

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

        // let newFileName;

        // if (type === 'trip') {
        //     if (file) {
        //         await addMultiFiles().then((responseData)=> {
        //             addDataToMongo(responseData)
        //         });
        //     } else {
        //         await addDataToMongo(formData)
        //     }
            // setShowLoading([false,0]);
            // setPage("mainPage");
        // }

        if (file) {
            console.log('2_add+trip: file')
            await addMultiFiles(file, dataId, type, formDataToSave).then((responseData)=> {
                addDataToMongo(responseData).then((r)=>{ console.log(r)})
            });
        } else {
            console.log('2_add+trip: else')
            await addDataToMongo(formDataToSave, dataId, type).then((r)=>{ console.log(r)})
        }
        // setShowLoading([false,0]);
        setPage("userProfile");

        // setYesOrNot(prevState => {
        //     let newArray = [...prevState.yesOrNot];
        //     newArray[2] = false;
        //     return {array: newArray};
        // });
        setShowLoading([false,0]);
        // setPage("userProfile");
    };

    useEffect(async ()=>{
        console.log('_____________ useEffect 91 _ set to save | page input trip' + pageInputTrip)
        await setFormDataToSave(prevState => {
            const updatedState = { ...prevState };
            for (const key in formData) {
                updatedState[key] = formData[key];
            }
            return updatedState;
        });





        if (pageInputTrip === 666) handleSubmit()

    },[pageInputTrip])

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
    console.log(' add trip: form data - JSON: ' + JSON.stringify(formData))

    return (<>
        <section className={`addTrip`}>
            { okPrint ? <>
            <div >
                {(pageInputTrip === 1) ? <AddTripPage1 setPageInputTrip={setPageInputTrip} pageInputTrip={pageInputTrip} formData={formDataPage1} setFormData={setFormData}/> : <></>}
                {(pageInputTrip === 2) ? <AddTripPage1 setPageInputTrip={setPageInputTrip} pageInputTrip={pageInputTrip} formData={formDataPage2} setFormData={setFormData}/> : <></>}
                {(pageInputTrip === 3) ? <AddTripPage3 setPageInputTrip={setPageInputTrip} pageInputTrip={pageInputTrip} formData={formData} setFormData={setFormData}/> : <></>}
                {(pageInputTrip === 4) ? <AddTripPage1 setPageInputTrip={setPageInputTrip} pageInputTrip={pageInputTrip} formData={formDataPage4} setFormData={setFormData} setFile={setFile}/> : <></>}
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
            </> : <>...loading...</>}
        </section>
    </>)
}

export default AddTrip;