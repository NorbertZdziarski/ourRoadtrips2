import React, { useState, useEffect } from 'react';
import PrintForm from "./3_printForm";
import { useStoreActions, useStoreState } from "easy-peasy";

const AddTripPage1 = ({page, setPageInputTrip, pageInputTrip, formData, setFormData, setFile}) => {

    const [okPrint, setOkPrint] = useState(true);
    // const keysToCopy = [['tripName', 'tripDescription', 'tripDate','tripCountry','tripType'],['tripCar'],['tripMap'],['tripPhoto']];
    // const setShowLoading = useStoreActions(actions => actions.setShowLoading);

    // useEffect(() => {
    //     console.log('---------------add trip page _ useEffect -------------------------')
    //     console.log(formData)
    //     const fetchDataAndUpdate = async () => {
    //         console.log('txt test')
    //         // const response = await fetchData();
    //         // console.log(response);
    //         console.log('page input trip: ' + pageInputTrip);
    //
    //         const objectToSave = keysToCopy[pageInputTrip - 1].reduce((result, key) => {
    //             console.log(result)
    //             if (key in formData) {
    //                 result[key] = formData[key];
    //             }
    //             return result;
    //         }, {});
    //
    //         setFormData(objectToSave);
    //         setOkPrint(true)
    //     };
    //
    //     fetchDataAndUpdate();
    //
    // }, [pageInputTrip]);

    // useEffect(() => {
    //     if (formData) {
    //     console.log(formData);
    //     console.log(JSON.stringify(formData));
    //
    //     const objectToSave = keysToCopy[page].reduce((result, key) => {
    //         if (key in formData) {
    //             result[key] = formData[key];
    //         }
    //         return result;
    //     }, {});
    //         setFormData(objectToSave);
    //     setShowLoading([false, 0]);}
    // }, [formData]);

    // useEffect(async () =>{
        // if (file) {
        //     await addMultiFiles(file, dataId, type, formData).then((responseData)=> {
        //         addDataToMongo(responseData)
        //     });
        // } else {
        //     await addDataToMongo(tempInMemory, dataId, type)
        // }
    // },[pageInputTrip])

    const changePageFn = async (dir) => {
        console.log('add trip | change page fn | line 62')
        // if (pageInputTrip === 1) {

        //     setFormDataPage1(formData)
        // } else if (pageInputTrip === 2) {

        //     setFormDataPage2(formData)
        // } else if (pageInputTrip === 3) {
        //
        // } else {
        //     console.log('4 form data: ' + formData)
        //     setFormDataPage4(formData)
        // }

        if (dir === 'next') {
            setPageInputTrip(pageInputTrip + 1)
        } else {
            setPageInputTrip(pageInputTrip - 1)
        }

    }

    let formArr = Object.keys(formData);
console.log('page: ' + pageInputTrip)
    return (
        <>
            <div id={'addTripPage1'}>
                <h4>your new trip!</h4>
                <h3>give us some informations:</h3>
                <form>
                    {okPrint ?
                    <PrintForm
                        form={formArr}
                        formData={formData}
                        setFormData={setFormData}
                        setFile={setFile}
                        type='trip'
                    /> : <>wait....</> }
                </form>
                <div>
                    {(pageInputTrip > 1) ? <button onClick={()=> changePageFn('back') }>back</button> : <></>}
                    {(pageInputTrip < 4) ? <button onClick={()=> changePageFn('next')}>next</button> : <button onClick={()=> setPageInputTrip(666)}>save</button> }
                </div>
            </div>
        </>
    )
}

export default AddTripPage1;
