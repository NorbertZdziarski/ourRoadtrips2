import React, {useEffect, useState} from 'react';
import {fetchData,transferData,updateData,deleteData} from "./a_CRUD_service";
import TripBox from "./2_tripBox";
import {action, useStoreActions, useStoreState} from "easy-peasy";


const TripsList = ({ tripData }) => {

    const setPage = useStoreActions(actions => actions.setPage);
    const setTripId = useStoreActions(actions => actions.setTripId);


    return (
        <div className="testDataImport">
            <p className="testForm">trasy pobrane z bazy danych:</p>
            {tripData.map((trip, i) => (
                <div key={trip._id} className="dataImportLine">
                    <button key={`trip${i}`} className="clickPage" onClick={()=> {
                        setPage("showTrip")
                        setTripId(trip._id)
                    } }>
                       < TripBox trip={trip} />
                    </button>
                    {/*<h2>{user.tripName}</h2>*/}
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
                    <TripsList tripData={data} />
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