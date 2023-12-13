import React from "react";
import LoadImage from "./a_loadimage";
import {useStoreState} from "easy-peasy";
import ShowPhoto from "./5_showPhoto";


function DisplayCars({usersCars, setDataId,  setPage, loggedUser, setYesOrNot, yesOrNot, setToDelete }) {
    const displayStyles = useStoreState(state => state.displayStyles);
    // ------------------------------------------------------- - zastąpienie jednym kodem ?
    function PrintCars({car}) {
        // console.log('car photo: ' + car.carPhoto[0])
        // console.log(car)
        let keyData = 'lineCar' + car._id;
        return (<div key={keyData}>
            <p>{car.carMaker} {car.carBrand}</p>

        </div>)
    }

    return (
    // <section className={`userPanel_trips colorstyle_button_${displayStyles}`}>
        <>
        {usersCars ? (
            Object.values(usersCars).map((car) =>

                <div key={`keycar${car._id}`} className={`userPanelItem colorstyle_reverse_${displayStyles}`}>
                    <button className={`clickPage colorStyle_clickPage_${displayStyles}`} >
                        <PrintCars  car={car}/>
                        {car.carPhoto ?
                            <LoadImage imageName={car.carPhoto[0]}
                                                   imagePath='images/cars'
                                                   // imageWidth='120px'
                                                   photoClass="photoStyle"/>

                            // <ShowPhoto
                            //     photo={car.carPhoto[0]}
                            //     style={"photoStyle"}
                            //     source='cars'
                            // />


                            : <p>no photo</p>}
                    </button>
                    <div className="userPanel-buttons">
                        <button onClick={()=>{
                            setPage("addCar")
                            setDataId(car)}
                        }>edit</button>
                        <button onClick={()=>{

                            setToDelete(['car',car])
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
        </>
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