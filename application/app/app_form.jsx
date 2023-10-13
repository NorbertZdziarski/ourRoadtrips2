import React, { useState, useEffect } from 'react';
import '../css/main.scss';
import {fetchData,transferData,updateData,deleteData, transferDataFile} from "./a_CRUD_service";
import {useStoreActions, useStoreState} from "easy-peasy";
import LoadImage from "./a_loadimage";

const PrintForm = ({form,formData,usersCars,setFormData, setFile}) => {
    const countriesInEurope = ["all", "Albania", "Andorra", "Austria", "Belarus", "Belgium", "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Kosovo", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Moldova", "Monaco", "Montenegro", "Netherlands", "North Macedonia", "Norway", "Poland", "Portugal", "Romania", "Russia", "San Marino", "Serbia", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Ukraine", "United Kingdom", "Vatican City"];
    const tripTypes = ["all", "recreation", "sightseeing", "extreme"];
    const carsStyleTypes=["all", "car", "bike", "4x4", "camper", "other"];
    const carsPurposeTypes=["all", "daily", "classic", "forFun"];
    const carsEngineFuelType=["petrol", "electric","hybrid","diesel", "other"];

    const excludedValues = ['tripType', 'tripCountry', 'carStyleType', 'carPurposeType', 'carPhoto','tripPhoto','tripCar'];


    function handleFileChange(event) {
        let fileUpload = (event.target.files[0]);
        setFile(fileUpload)
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return(
        <div>
            {form.map((value) => <div key={`line${value}`}>
                    {/*// ----------------------------------- rodzaj paliwa, areatext do opisu*/}
                <label>
                    <p>{value}:</p>
                    {(value === 'tripCountry') ? <select value={formData[value]} name={value} onChange={handleChange} className="">
                        {countriesInEurope.map((country) => (
                            <option key={country} value={country} className="testDataImport">
                                {country}
                            </option>
                        ))}
                    </select> : <></>}
                    {(value === 'tripType')?(<select value={formData[value]} name={value} onChange={handleChange} className="">
                        {tripTypes.map((triptype) => (
                            <option key={triptype} value={triptype} className="testDataImport">
                                {triptype}
                            </option>
                        ))}
                    </select>):(<></>)}
                    {(value === 'carStyleType')?(<select value={formData[value]} name={value} onChange={handleChange} className="">
                        {carsStyleTypes.map((carStyle) => (
                            <option key={carStyle} value={carStyle} className="testDataImport">
                                {carStyle}
                            </option>
                        ))}
                    </select>):(<></>)}
                    {(value === 'tripCar')?(<select value={formData[value]} name={value} onChange={handleChange} className="">
                        {usersCars.map((tripCar) => (
                            <option key={tripCar} value={tripCar} className="testDataImport">
                                {tripCar}
                            </option>
                        ))}
                    </select>):(<></>)}
                    {(value === 'carPurposeType')?(<select value={formData[value]} name={value} onChange={handleChange} className="">
                        {carsPurposeTypes.map((carsPurpose) => (
                            <option key={carsPurpose} value={carsPurpose} className="testDataImport">
                                {carsPurpose}
                            </option>
                        ))}
                    </select>):(<></>)}
                    {(value === 'carPhoto')?(
                        <input type="file" onChange={handleFileChange} />
                    ):(<></>)}
                    {(value === 'tripPhoto')?(
                        <input type="file" onChange={handleFileChange} />
                    ):(<></>)}
                    {(excludedValues.includes(value) ? <></> : <input type="text" name={value} value={formData[value] || ''} onChange={handleChange} />)}

                </label>

            </div>)}
        </div>
    )
}
const MyForm = ({type}) => {
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({});
    const setPage = useStoreActions(actions => actions.setPage);
    const loggedUser = useStoreState(state => state.loggedUser);
    const setLoggedUser = useStoreActions(actions => actions.setLoggedUser);
    const dataId = useStoreState(state => state.dataId);

    const loggedUsersCars = loggedUser.cars;
    const usersCarsDisp = Object.values(loggedUsersCars).map(car => `${car.carMaker} ${car.carBrand}`)

    const getInitialFormData = (type,loggedUser, dataId) => {
        if (type === 'trip') {
            return {
                tripName: dataId.tripName || '',
                tripDescription:dataId.tripDescription ||  '',
                tripCar: dataId.tripCar ||  '',
                tripDate: dataId.tripDate || '',
                tripCountry: dataId.tripCountry || '',
                tripType: dataId.tripType || '',
                tripPhoto: dataId.tripPhoto || '',
                tripMap: dataId.tripMap || '',
                tripUser: loggedUser.nick,
                tripUserId: loggedUser._id,
                tripSaveDate: new Date()
            };
        } else if (type === 'car') {
            return {
                carId: dataId.carId || '',
                carMaker: dataId.carMaker || '',
                carBrand: dataId.carBrand || '',
                carDescription: dataId.carDescription || '',
                carEngine: dataId.carEngine || '',
                carEnginePower: dataId.carEnginePower || '',
                carStyleType: dataId.carStyleType || '',
                carPurposeType: dataId.carPurposeType || '',
                carPhoto: dataId.carPhoto || ''
            };

        } else {
            return {
                nick: loggedUser.nick || '',
                firstName: loggedUser.firstName || '',
                lastName: loggedUser.lastName || '',
                userDescription: loggedUser.userDescription ||'',
                userPersonalComment: loggedUser.userPersonalComment ||'',
                cars: [],
                email: loggedUser.email || ''
            };
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
                console.log(formData.carId)
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
        setFormData(getInitialFormData(type,loggedUser));

    };

    return (
        <div className="underConstruction ramka underConstruction-height">
        <form onSubmit={handleSubmit} className="testForm">

            <PrintForm
                form={formArr}
                formData={formData}
                usersCars={usersCarsDisp}
                setFormData={setFormData}
                setFile={setFile}
            />
            <button type="submit">Wyślij</button>
        </form>
            <LoadImage imageName={formData.carPhoto}
                       imagePath='images/users'
                       imageWidth='300px' />
        </div>
    );
};
export default MyForm;