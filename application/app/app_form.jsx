import React, { useState, useEffect } from 'react';
import '../css/main.scss';
import {fetchData, transferData, updateData, deleteData, transferDataFile, deleteFile} from "./a_CRUD_service";
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
    const rules = useStoreState(state => state.rules);

    const temporaryPass1 = useStoreState(state => state.temporaryPass1);
    const setTemporaryPass1 = useStoreActions(actions => actions.setTemporaryPass1);
    const temporaryPass2 = useStoreState(state => state.temporaryPass2);
    const setTemporaryPass2 = useStoreActions(actions => actions.setTemporaryPass2);

    const [formError, setFormError] = useState(null);


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

        return loggedUser._id + type + idObject + hexTimestamp + fileExtension;
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
        let error = '';
        console.log('-------------------------------------------')
        if (temporaryPass1) {
            console.log(' handle change temp 1')
            if (temporaryPass1 === temporaryPass2) {
                console.log(' handle change temp 2 |||||||||||||||||||||||||||||||||||||||||||')
                console.log('pas 1 ' + temporaryPass1 + ' | pas 2 ' + temporaryPass2)
                console.log(formData)
                setFormData({...formData, password: temporaryPass1})
            } else {
                console.log(' handle change err')
                error += 'błąd hasła!';

                }}
        if (newUser) {
            if (type === 'user') {

                if (formData.regulations !== 'you accept the regulations') error += 'brak akceptacji regulaminu \n';
                if (!formData.nick) error += 'podaj swój nick \n';
                if (!formData.firstName) error += 'podaj swoje imię \n';
                if (!formData.password) error += 'podaj hasło \n';


            }
        } else {
            if (type === 'user') {


            }
        }

        setFormError(error)
        if (error) return;

        console.log('______ ' + formData.password)

        let dataToSave;
        let newFileName;

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
                setPage("userProfile");
            } else {
                // console.log('trip - if else');
                targetPath = dataId._id;
                await updateData(`${type}/${targetPath}`,formData);
                setPage('userProfile')
            };


            if (file) {
                let folderName = 'trips';
                await transferDataFile(`upload`, file, folderName, newFileName);
                console.log('wysyłka pliku')
                setPage('userProfile')
            }

            console.log('trip - koniec warunku.')
            setPage("mainPage");
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
                console.log('add formData puh cars Arr')
            }

            dataToSave = {
                cars: carsArr,
            };
            updateUser('cars',carsArr)
            console.log(' update - 124')
            if (file)  {
                newFileName = newFileNameGenerator(formData.carId);
                formData.carPhoto = newFileName; }
            await updateData(`user/${loggedUser._id}`, dataToSave);
            if (file) {
                let folderName = 'users'
                console.log('warunek wysyłki')
                /// błąd z czytaniem "data" w CRUD linia 76, 74
                await transferDataFile(`upload`, file, folderName, newFileName).then(()=>{
                    console.log('wysyłka pliku')
                    setPage('userProfile')});

            }
            setPage("mainPage");
        }
        if (type === 'user') {

            let targetPath;

            // if (file)  {
            //     newFileName = newFileNameGenerator('profile');
            //     formData.userPhoto = newFileName; }

            if (!loggedUser._id) {
                targetPath = 'add';
                let tempUser = formData.nick;
                let tempPass = formData.password;
                let userId;
                await transferData(`${type}/${targetPath}`, formData);

                const target = `?user=${encodeURIComponent(tempUser)}&password=${encodeURIComponent(tempPass)}`
                await fetchData('login' + target).then(downloadedData => {
                    if (!downloadedData) {
                        console.log('wrong password or login');
                    } else {
                        console.log('update na stronie')
                        setLoggedUser(downloadedData);
                    }
                });
                if (file)  {
                    newFileName = newFileNameGenerator('profile');
                    formData.userPhoto = newFileName; }
                await transferDataFile(`upload`, file, 'users', newFileName);
                console.log('150')
                console.log('zmiana strony: ');
                setPage("mainPage");
            }

            if (file)  {
                newFileName = newFileNameGenerator('profile');
                formData.userPhoto = newFileName;
                let folderName = 'users';

                await updateData(`${type}/${loggedUser._id}`, formData);
                await transferDataFile(`upload`, file, folderName, newFileName);
                await deleteFile(`images/users/${loggedUser.userPhoto}`);

                // console.log('wysyłka pliku');
                // console.log('zmiana strony: ');
                setPage('userProfile')
            }

            // console.log(formData)
            // console.log(`${type}/${targetPath}`)
            await updateData(`${type}/${loggedUser._id}`, formData);
            const tempVar = {...loggedUser,...formData}
            setLoggedUser(tempVar)

            setPage("mainPage");
        }
        // setFormData(getInitialFormData(type,loggedUser));
        setPage("userProfile");
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
                    <button type="submit" className="button-important">it's ok, I'm sending it.</button>
                    {(formError) ? <pre className="fnt_error">{formError}</pre> : <></>}
                    {(newUser) ?  <div className="imputForm_regulations ">
                        <p className="fnt_Title">regulations:</p>
                        <pre className="fnt_tertiary">{rules}</pre>
                    </div> : <></>}

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