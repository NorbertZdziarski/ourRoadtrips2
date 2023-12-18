import React, { useState, useEffect } from 'react';
import PrintForm from "./3_printForm";
import { deleteFile, fetchData, transferData, transferDataFile, updateData } from "./a_CRUD_service";
import { getInitialFormData } from "./getInitialFormData";
import { useStoreActions, useStoreState } from "easy-peasy";
import addDataToMongo from "./a_addDataToMongo";
import addMultiFiles from "./a_addMultiFiles";

const AddTripPage1 = ({page, setPageInputTrip, pageInputTrip}) => {
    const [formData, setFormData] = useState({});
    const [formDataPage1, setFormDataPage1] = useState({});
    const [file, setFile] = useState(null);
    const dataId = useStoreState(state => state.dataId);
    const loggedUser = useStoreState(state => state.loggedUser);
    const setShowLoading = useStoreActions(actions => actions.setShowLoading);
    const type = 'trip';
    const keysToCopy = [['tripName', 'tripDescription', 'tripDate','tripCountry','tripType'],['tripCar'],['tripMap'],['tripPhoto']];

    useEffect(() => {
        setShowLoading([true, 0]);
        const fetchData = async () => {
            // setShowLoading([true, 0]);
            let data = await getInitialFormData(type, loggedUser, dataId);
            console.log(data);
            setFormData(data);
            // setShowLoading([false, 0]);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (formData) {
        console.log(formData);
        console.log(JSON.stringify(formData));

        const objectToSave = keysToCopy[page].reduce((result, key) => {
            if (key in formData) {
                result[key] = formData[key];
            }
            return result;
        }, {});
        setFormDataPage1(objectToSave);
        setShowLoading([false, 0]);}
    }, [formData]);

    useEffect(async () =>{
        if (file) {
            await addMultiFiles(file, dataId, type, formData).then((responseData)=> {
                addDataToMongo(responseData)
            });
        } else {
            await addDataToMongo(formDataPage1, dataId, type)
        }
    },[pageInputTrip])

    let formArr = Object.keys(formDataPage1);

    return (
        <>
            <div id={'addTripPage1'}>
                <h4>your new trip!</h4>
                <h3>give us some informations:</h3>
                <form>
                    <PrintForm
                        form={formArr}
                        formData={formDataPage1}
                        setFormData={setFormDataPage1}
                        setFile={setFile}
                        type='trip'
                    />
                </form>
                <div>
                    <button onClick={()=> setPageInputTrip(pageInputTrip - 1)}>back</button>
                    <button onClick={()=> setPageInputTrip(pageInputTrip + 1)}>next</button>
                </div>
            </div>
        </>
    )
}

export default AddTripPage1;
