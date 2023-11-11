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
        console.log('dataId: ' + dataId)

        if (type === 'trip') {

            let targetPath;
            if (file)  {
                // console.log('trip - if file ')
                // ----------------- tu jest błąd logiczny z data_id . Jeżeli go nie ma to nie można go przypożądkować.
                newFileName = newFileNameGenerator(dataId._id);
                formData.tripPhoto = newFileName; }
            if (!dataId) {
                // console.log('trip - if !dataId');
                targetPath = 'add';
                await transferData(`${type}/${targetPath}`,formData);
            } else {
                // console.log('trip - if else');
                targetPath = dataId._id;
                await updateData(`${type}/${targetPath}`,formData);
            };


            if (file) {
                let folderName = 'trips';
                await transferDataFile(`upload`, file, folderName, newFileName);
                console.log('wysyłka pliku')
            }

            console.log('trip - koniec warunku.')
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

        }
        if (type === 'user') {
            let targetPath;
            console.log('data id: ' + dataId)
            console.log('user id: ' + loggedUser._id)

            // if (file)  {
            //     newFileName = newFileNameGenerator('profile');
            //     formData.userPhoto = newFileName; }

            if (!loggedUser._id) {
                targetPath = 'add';
                let tempUser = formData.nick;
                let tempPass = formData.password;
                let userId;
                console.log('appForm. 1 - update data');
                await transferData(`${type}/${targetPath}`, formData);
                console.log('appForm. 2 - take ID');

                const target = `?user=${encodeURIComponent(tempUser)}&password=${encodeURIComponent(tempPass)}`
                await fetchData('login' + target).then(downloadedData => {
                    if (!downloadedData) {
                        console.log('wrong password or login');
                    } else {
                        console.log(downloadedData)
                        setLoggedUser(downloadedData);
                    }
                });
                if (file)  {
                    newFileName = newFileNameGenerator('profile');
                    formData.userPhoto = newFileName; }
                await transferDataFile(`upload`, file, 'users', newFileName);
                console.log('150')
                setPage("mainPage");
            }

            if (file)  {
                newFileName = newFileNameGenerator('profile');
                formData.userPhoto = newFileName;
                let folderName = 'users';
                console.log('159')
                console.log(newFileName);
                console.log(folderName);
                await updateData(`${type}/${loggedUser._id}`, formData);
                await transferDataFile(`upload`, file, folderName, newFileName);
                console.log('wysyłka pliku');
                setPage('userProfile')
            }
            console.log('linia 164 :)')
            console.log(formData)
            console.log(`${type}/${targetPath}`)
            await updateData(`${type}/${loggedUser._id}`, formData);

            setPage("mainPage");
        }
        console.log(' test linia 122')
        // setFormData(getInitialFormData(type,loggedUser));
        console.log(' test linia 124')
        setPage("userProfile");
        console.log(' test linia 126')
    };

    return (
        <div className="mainWindowStyle">
            <form onSubmit={handleSubmit} className="imputForm" >

                <PrintForm
                    form={formArr}
                    formData={formData}
                    usersCars={usersCarsDisp}
                    setFormData={setFormData}
                    setFile={setFile}
                    type={type}
                />
                <section className="imputForm_sendButtonPlace">
                {newUser ? <p> akceptacja regulaminu </p> :  <></>}
                <button type="submit" className="button-important">Wyślij</button>
                </section>
            </form>
                {/*{newUser ? <></> :  <LoadImage imageName={formData.carPhoto}*/}
                {/*                      imagePath='images/users'*/}
                {/*                      imageWidth='300px'*/}
                {/*                    />  }*/}

        </div>
    );
};
export default MyForm;