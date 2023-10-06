import React, {useEffect, useState} from 'react';
import {fetchData,transferData,updateData,deleteData} from "./a_CRUD_service";


const UsersList = ({ usersData }) => {
    console.log(usersData)
    console.log('usersData')
    return (
        <div className="testDataImport">
            <p>kapusta i schabowy</p>
            {/*<p>{usersData.tripName}</p>*/}
            {usersData.map((user) => (
                <div key={user._id} className="dataImportLine">
                    <h2>{user.tripName}</h2>
                    {/*<p>{user.firstName} {user.lastName}</p>*/}
                    {/*<p>Email: {user.email}</p>*/}
                </div>
            ))}
        </div>
    );
};
const DownloadData = () => {
    const [data, setData] = useState(null);

    useEffect(() => {

        fetchData('trips').then(downloadedData => {
            setData(downloadedData)
        });

    }, []);

    return (
        <div className="ramka">
            {data ? (
                <div>
                    <UsersList usersData={data} />
                </div>
            ) : (
                <p>Ładowanie danych...</p>
            )}
        </div>
    );
};
function ShowTrips() {


    return (
        <section className="underConstruction">
            <h2 > Show trips  </h2>
            <DownloadData/>
        </section>
    );
}

export default ShowTrips;