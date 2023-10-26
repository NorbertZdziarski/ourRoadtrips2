import React, { useState, useEffect } from 'react';
import '../css/main.scss';
import {fetchData,transferData,updateData,deleteData, transferDataFile} from "./a_CRUD_service";
import {useStoreActions, useStoreState} from "easy-peasy";
import LoadImage from "./a_loadimage";
import PrintForm from "./3_printForm";
import {getInitialFormData} from "./getInitialFormData";



const MyForm = ({type}) => {
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({});
    const setPage = useStoreActions(actions => actions.setPage);
    const loggedUser = useStoreState(state => state.loggedUser);
    const setLoggedUser = useStoreActions(actions => actions.setLoggedUser);
    const dataId = useStoreState(state => state.dataId);
    let newUser = true;
    let usersCarsDisp = [];
    if (loggedUser) {
        newUser = false;
        if (loggedUser.cars) {
            const loggedUsersCars = loggedUser.cars;
            usersCarsDisp = Object.values(loggedUsersCars).map(car => `${car.carMaker} ${car.carBrand}`);
        }
    }



    const newFileNameGenerator = (idObject) => {
        let oldFileName = file.name.toLowerCase();
        let idx = oldFileName.lastIndexOf('.');
        let fileExtension = oldFileName.slice(idx,oldFileName.length)
        let currentDate = new Date();
        let timestamp = currentDate.getTime();
        let hexTimestamp = timestamp.toString(16);
        let fileName = loggedUser._id + type + idObject + hexTimestamp + fileExtension;

        return fileName;
    }

    function updateUser(key, newData) {
        const newState = { ...loggedUser };
        newState[key] = newData;
        setLoggedUser(newState);
    }
    useEffect(() => {
        setFormData(getInitialFormData(type,loggedUser,dataId));
    }, [type]);

    let formArr = Object.keys(formData)

    const handleSubmit = async (e) => {
        e.preventDefault();

        let dataToSave;
        let newFileName;
        console.log('type: ' + type)
        if (type === 'trip') {

            let targetPath;
            if (file)  {
                newFileName = newFileNameGenerator(dataId._id);
                formData.tripPhoto = newFileName; }
            if (!dataId) {
                targetPath = 'add';
                await transferData(`${type}/${targetPath}`,formData);
            } else {
                targetPath = dataId._id;
                await updateData(`${type}/${targetPath}`,formData);
            };


            if (file) {
                let folderName = 'trips';
                await transferDataFile(`upload`, file, folderName, newFileName);
                console.log('wysyłka pliku')
            }
        }

        if (type === 'car') {

            if (!dataId) {
                let currentDate = new Date();
                let timestamp = currentDate.getTime();
                let hexTimestamp = timestamp.toString(16);
                formData.carId = loggedUser._id + type + hexTimestamp}

            let carsArr = [...loggedUser.cars];
            const index = carsArr.findIndex((car) => car.carId === formData.carId);
            if (index !== -1) {
                carsArr[index] = formData
            } else {
                carsArr.push(formData);
            }
            dataToSave = {
                cars: carsArr,
            };
            updateUser('cars',carsArr)

            if (file)  {
                newFileName = newFileNameGenerator(formData.carId);
                formData.carPhoto = newFileName; }
            await updateData(`user/${loggedUser._id}`, dataToSave);
            if (file) {
                let folderName = 'users'
                console.log('warunek wysyłki')
                await transferDataFile(`upload`, file, folderName, newFileName);
                console.log('wysyłka pliku')
            }
            setPage("userProfile");

        }
        if (type === 'user') {
            let targetPath;

            if (!dataId) {

                targetPath = 'add';
                await transferData(`${type}/${targetPath}`, formData);
                setPage("mainPage");
            }
        }
        setFormData(getInitialFormData(type,loggedUser));

    };

    return (
        <div className="underConstruction ramka">
        <form onSubmit={handleSubmit} className="testForm">

            <PrintForm
                form={formArr}
                formData={formData}
                usersCars={usersCarsDisp}
                setFormData={setFormData}
                setFile={setFile}
            />
            {newUser ? <p> akceptacja regulaminu </p> :  <></>}
            <button type="submit" onClick={()=>setPage("userProfile")}>Wyślij</button>
        </form>
            {newUser ? <></> :  <LoadImage imageName={formData.carPhoto}
                                  imagePath='images/users'
                                  imageWidth='300px'
                                />  }

        </div>
    );
};
export default MyForm;