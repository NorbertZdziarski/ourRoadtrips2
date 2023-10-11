import React, { useState, useEffect } from 'react';
import '../css/main.scss';
import {fetchData,transferData,updateData,deleteData, transferDataFile} from "./a_CRUD_service";
import {useStoreState} from "easy-peasy";

const MyForm = ({type}) => {
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
const [file, setFile] = useState(null);
const [fileName, setFileName] = useState('');

const PrintForm = ({form,formData,setFormData}) => {
    const countriesInEurope = ["all", "Albania", "Andorra", "Austria", "Belarus", "Belgium", "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Kosovo", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Moldova", "Monaco", "Montenegro", "Netherlands", "North Macedonia", "Norway", "Poland", "Portugal", "Romania", "Russia", "San Marino", "Serbia", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Ukraine", "United Kingdom", "Vatican City"];
    const tripTypes = ["all", "recreation", "sightseeing", "extreme"];
    const carsStyleTypes=["all", "car", "bike", "4x4", "camper", "other"];
    const carsPurposeTypes=["all", "daily","classic","forFun"];

    const excludedValues = ['tripType', 'tripCountry', 'carStyleType', 'carPurposeType', 'carPhoto'];

    function handleFileChange(event) {
        setFile(event.target.files[0]);
        let fileName = loggedUser._id + "car" + formData.carId;
        setFileName(fileName);

    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    return(
        <div>
            {form.map((value) => <div key={value}>

                    <label>
                        {value}:
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
                        {(value === 'carPurposeType')?(<select value={formData[value]} name={value} onChange={handleChange} className="">
                            {carsPurposeTypes.map((carsPurpose) => (
                                <option key={carsPurpose} value={carsPurpose} className="testDataImport">
                                    {carsPurpose}
                                </option>
                            ))}
                        </select>):(<></>)}
                        {(value === 'carPhoto')?(<input type="file" onChange={handleFileChange} />):(<></>)}

                        {(excludedValues.includes(value) ? <></> : <input type="text" name={value} value={formData[value]} onChange={handleChange} />)}

                    </label>
                </div>)}
        </div>
    )
}


    const [formData, setFormData] = useState({});
    const loggedUser = useStoreState(state => state.loggedUser);
    const dataId = useStoreState(state => state.dataId);

    useEffect(() => {
        setFormData(getInitialFormData(type,loggedUser,dataId));
    }, [type]);

    let formArr = Object.keys(formData)
    console.log(file)

    const handleSubmit = async (e) => {
        e.preventDefault();

        let dataToSave;
        if (type === 'trip') {
            let targetPath;

            if (!dataId) {targetPath = 'add'} else {targetPath = dataId._id};

            await updateData(`${type}/${targetPath}`,formData);
        }

        if (type === 'car') {

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
            await updateData(`user/${loggedUser._id}`, dataToSave);
            if (file) {
                // await updateData(`user/${loggedUser._id}`, dataToSave);
                let folderName = 'users'
                console.log('warunek wysyłki')
                await transferDataFile(`upload`, file, folderName, fileName);
                console.log('wysyłka pliku')
            }

        }
        setFormData(getInitialFormData(type,loggedUser));
    };

    return (
        <div className="underConstruction ramka underConstruction-height">
        <form onSubmit={handleSubmit} className="testForm">

            <PrintForm
                form={formArr}
                formData={formData}
                setFormData={setFormData}
            />
            <button type="submit">Wyślij</button>
        </form>
        </div>
    );
};
export default MyForm;