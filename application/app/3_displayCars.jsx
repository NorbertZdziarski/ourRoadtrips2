import React from "react";
import LoadImage from "./a_loadimage";

function DisplayCars({usersCars, setPage, setDataId, setYesOrNot, setToDelete }) {
    // ------------------------------------------------------- - zastąpienie jednym kodem ?
    function PrintCars({car}) {
        let keyData = 'lineCar' + car.id;
        return (<div key={keyData}>
            <p>{car.carMaker} {car.carBrand}</p>

        </div>)
    }

    return (
    <section className="userPanel_trips">
        {usersCars ? (
            Object.values(usersCars).map((car) =>

                <div key={`keycar${car.carId}`} className="userPanelItem">
                    <button className="clickPage" >
                        <PrintCars  car={car}/>
                        {car.carPhoto ? <LoadImage imageName={car.carPhoto}
                                                   imagePath='images/users'
                                                   // imageWidth='120px'
                                                   photoClass='aboutme_PhotoTrip'/> : <p>no photo</p>}
                    </button>
                    <div className="userPanel-buttons">
                        <button onClick={()=>{
                            setPage("addCar")
                            setDataId(car)}
                        }>edit</button>
                        <button onClick={()=>{

                            setToDelete(['car',car.carId])
                            setYesOrNot([true,0])

                        }
                        }>delete</button>
                        {car.carPublic ?<p> public </p> : <p>hidden</p>}
                    </div>
                </div>

            )
        ) : (
            <div>loading data....</div>
        )}
    </section>
    )
}

export default DisplayCars;

//     <section>
//         User Cars
//
//         {objArray ? (
//             Object.values(objArray).map((car) =>
//
//                 <div key={`keycar${car.carId}`} className="dataImportLine">
//                     <button className="clickPage" >
//                         <PrintCars  car={car}/>
//                         {car.carPhoto ? <LoadImage imageName={car.carPhoto}
//                                                    imagePath='images/users'
//                                                    imageWidth='120px' /> : <p>no photo</p>}
//                     </button>
//                     <div>
//                         <button onClick={()=>{
//                             setPage("addCar")
//                             setDataId(car)}
//                         }>edit</button>
//                         <button onClick={()=>{
//
//                             setToDelete(['car',car.carId])
//                             setYesOrNot([true,0])
//
//                         }
//                         }>delete</button>
//                         <button>visibility</button>
//                     </div>
//                 </div>
//
//             )
//         ) : (
//             <div>loading data....</div>
//         )}
//     </section>