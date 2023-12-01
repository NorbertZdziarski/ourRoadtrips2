import React, {useState} from "react";
import {fetchData, transferData, updateData} from "./a_CRUD_service";

function Tymczasowe() {
    console.log('|}---------> tymczasowe')
    const [database, setDatabase] = useState('no data')
    const savedata = {
        tripUserId: 2234,
        tripName: 'testing',
        tripDescription:'',
        tripCar: '',
        tripCarId: '',
        tripCarStyleType: '',
        tripDate: '',
        tripCountry: 'Slovakia',
        tripType: '',
        tripPhoto:[],
        tripMap: '',
        tripUser: 'Markus',
        tripSaveDate: new Date(),
        tripRate: [],
        tripComments: [],
        tripPublic: true
    }
    // transferData('trip/add', savedata)
    fetchData('pobierzwszystko').then((r)=> {
        console.log('wynik: ' + r)
        setDatabase(r)

    })

    return (
        <div>
            <p>{database}</p>
        </div>
    )
}
export default Tymczasowe;