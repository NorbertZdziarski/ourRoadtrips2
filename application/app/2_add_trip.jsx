import React, {useEffect, useState} from 'react';

import AddTripPageMap from "./3_addTripPageMap";

import {useStoreActions, useStoreState} from "easy-peasy";
import addMultiFiles from "./a_addMultiFiles";
import addDataToMongo from "./a_addDataToMongo";
import {getInitialFormData} from "./getInitialFormData";
import PrintForm from "./3_printForm";
import {fetchData, updateData} from "./a_CRUD_service";

const AddTrip = () => {
    const loggedUser = useStoreState(state => state.loggedUser);
    const [pageInputTrip, setPageInputTrip] = useState(1)
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({});
    const type = 'trip';
    const dataId = useStoreState(state => state.dataId);
    const setPage = useStoreActions(actions => actions.setPage);

    const setShowLoading = useStoreActions(actions => actions.setShowLoading);
    const [okPrint, setOkPrint] = useState(false);
    const keysToCopy = [['tripName', 'tripDescription', 'tripDate','tripCountry','tripType', 'tripPublic' ],['tripCar'],['tripMap'],['tripPhoto'],[ 'userId','tripUser', 'tripSaveDate', 'tripRate', 'tripComments']];
    const [formDataPage1, setFormDataPage1] = useState({});
    const [formDataPage2, setFormDataPage2] = useState({});
    const [formDataPage3, setFormDataPage3] = useState({});
    const [formDataPage4, setFormDataPage4] = useState({});
    const [formDataPageOther, setFormDataPageOther] = useState({});

    useEffect(() => {

        const fetchData = async () => {
            const data = await getInitialFormData(type, loggedUser, dataId);
            console.log('ADD TRIP | data: ' + data)
            setFormData(data);


            const objectToSave5 = keysToCopy[4].reduce((result, key) => {
                if (key in data) {
                    result[key] = data[key];
                }
                return result;
            }, {});
            setFormDataPageOther(objectToSave5);

            const objectToSave1 = keysToCopy[0].reduce((result, key) => {
                if (key in data) {
                    result[key] = data[key];
                }
                return result;
            }, {});
            setFormDataPage1(objectToSave1);

            const objectToSave2 = keysToCopy[1].reduce((result, key) => {
                    if (key in data) {
                    result[key] = data[key];
                }
                return result;
            }, {});
            setFormDataPage2(objectToSave2);

            const objectToSave3 = keysToCopy[2].reduce((result, key) => {
                    if (key in data) {
                    result[key] = data[key];
                }
                return result;
            }, {});
            setFormDataPage3(objectToSave3);

            const objectToSave4 = keysToCopy[3].reduce((result, key) => {
                if (key in data) {
                    result[key] = data[key];
                }
                return result;
            }, {});
            setFormDataPage4(objectToSave4);


        };


        // const fetchData = async () => {
        //     const data = await getInitialFormData(type, loggedUser, formData);
        //     console.log('ADD TRIP | data: ' + data)
        //     setFormData(data);
        //     console.log(' finish update use efect | fetch')
        //
        //     const setFormDataPages = [setFormDataPage1, setFormDataPage2, setFormDataPage3, setFormDataPage4, setFormDataPageOther];
        //
        //     keysToCopy.forEach((keys, index) => {
        //         const objectToSave = keys.reduce((result, key) => {
        //             if (key in data) {
        //                 result[key] = data[key];
        //             }
        //             return result;
        //         }, {});
        //
        //         setFormDataPages[index];
        //     });
        // };




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
        console.log(' ---- trip public: handleSubmit <><><><><><> ')
        console.log(' ---- trip public: ' + formData.tripPublic)
        console.log(' ---- handle submit: ' + formData)
        console.log(' ---- JSON: ' + JSON.stringify(formData))

        console.log('file:' + file)

        // e.preventDefault();
        setShowLoading([true,0]);
        // let error = '';
        // let formDataToSave = await formData.concat(formDataPage1, formDataPage2, formDataPage4);
        let formDataToSave = { ...formData, ...formDataPage1, ...formDataPage2, ...formDataPage3 , ...formDataPage4 , ...formDataPageOther }
        console.log(' ---- handle submit formDataToSave: ' + formDataToSave)
        console.log(' ---- JSON formDataToSave: ' + JSON.stringify(formDataToSave));
        console.log(' ---- handle submit formDataPag1: ' + formDataPage1)
        console.log(' ---- JSON formDataPag1: ' + JSON.stringify(formDataPage1));
        console.log(' ---- data ID: ' + dataId);
        console.log(' ---- type: ' + type);
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
            console.log('2_add+trip: file | type: ' + type + ' | dataID: ' + dataId)
            if (!dataId) {
                await addDataToMongo(formDataToSave, null, type).then((res) => {
                    console.log('198: dont dataID | res ' + res + ' | JSON: ' + JSON.stringify(res));
                    addMultiFiles(file, res.id, type, formDataToSave, loggedUser._id).then((responseData) => {
                        updateData(`${type}/${res.id}`, responseData);
                        // addDataToMongo(responseData).then((r)=>{ console.log(r)})
                    })
                });
            }
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
    console.log('|| 253 || add trip: form data - JSON: ' + JSON.stringify(formData))
    const changePageFn = async (dir) => {
        if (pageInputTrip === 1) {
            const objectToSave = keysToCopy[0].reduce((result, key) => {
                    if (key in formData) {
                        result[key] = formData[key];
                    }
                    return result;
                }, {});
                    setFormData(objectToSave);
        }
        if (dir === 'next') {
            setPageInputTrip(pageInputTrip + 1)
        } else {
            setPageInputTrip(pageInputTrip - 1)
        }

    }
    let formArr = Object.keys(formData);
    let formArr1 = Object.keys(formDataPage1);
    let formArr2 = Object.keys(formDataPage2);
    let formArr3 = Object.keys(formDataPage3);
    let formArr4 = Object.keys(formDataPage4);
    return (<>
        <section className={`addTrip`}>
            {okPrint ? <>
                <div>
                    {(pageInputTrip === 1 || pageInputTrip === 2 || pageInputTrip === 4) &&
                        <div id={'addTripPage1'}>
                            <h4>your new trip!</h4>
                            <h3>give us some informations:</h3>
                            <form>
                                {okPrint ?
                                    <PrintForm
                                        form={pageInputTrip === 1 ? formArr1 : pageInputTrip === 2 ? formArr2 : formArr4}
                                        formData={pageInputTrip === 1 ? formDataPage1 : pageInputTrip === 2 ? formDataPage2 : formDataPage4}
                                        setFormData={pageInputTrip === 1 ? setFormDataPage1 : pageInputTrip === 2 ? setFormDataPage2 : setFormDataPage4}
                                        setFile={setFile}
                                        type='trip'
                                    /> : <>wait....</> }
                            </form>
                            <div>
                                {(pageInputTrip > 1) ? <button onClick={()=> changePageFn('back') }>back</button> : <></>}
                                {(pageInputTrip < 4) ? <button onClick={()=> changePageFn('next')}>next</button> : <button onClick={()=> setPageInputTrip(666)}>save</button> }
                            </div>
                        </div>
                    }
                    {pageInputTrip === 3 && <AddTripPageMap setPageInputTrip={setPageInputTrip} pageInputTrip={pageInputTrip} formData={formDataPage3} setFormData={setFormDataPage3} country={formDataPage1.tripCountry}/> }
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