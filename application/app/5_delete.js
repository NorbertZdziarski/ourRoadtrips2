import {useEffect} from "react";
import {deleteData, deleteFile, fetchData} from "./a_CRUD_service";
import {useStoreActions, useStoreState} from "easy-peasy";

export function deleteItem() {
    const loggedUser = useStoreState(state => state.loggedUser);

    const toDelete = useStoreState(state => state.toDelete);
    const setToDelete = useStoreActions(actions => actions.setToDelete );
    const yesOrNot = useStoreState(state => state.yesOrNot);
    const setYesOrNot = useStoreActions(actions => actions.setYesOrNot);

console.log(toDelete)
console.log(yesOrNot)

    useEffect(async () => {
        console.log(' delete item ')
        if (yesOrNot[1] === 2) {
            // if (toDelete[0] === 'car') {
            //
            //     await deleteData(`car/${toDelete[1]._id}`);
            //     const target = `select/cars/${loggedUser._id}`
            //     fetchData(target).then(downloadedData => {
            //         console.log('2 user profile | toDelete |  downloadedData: ' + downloadedData + ' JSON: ' + JSON.stringify(downloadedData))
            //         setLoggedUserCars(downloadedData)
            //     });
            //     if (toDelete[1].carPhoto) await deleteFile('images/cars/', toDelete[1].carPhoto);
            //     setToDelete([``, ``])
            //
            //     // let carsArr = [...loggedUser.cars];
            //     // const userCopy = {...loggedUser}
            //     // console.log('///// cars ARR: ' + carsArr)
            //     // carsArr = carsArr.filter(ob=>ob._id !== toDelete[1]._id
            //     // );
            //     // const dataToSave = {
            //     //     cars: carsArr,
            //     // };
            //     //
            //     // await deleteData(`car/${toDelete[1]._id}`);
            //     // const target = `select/car/${loggedUser._id}`
            //     //
            //     // fetchData(target).then(downloadedData => {
            //     //     console.log('2 user profile | toDelete |  downloadedData: ' + downloadedData + ' JSON: ' + JSON.stringify(downloadedData))
            //     //     setLoggedUserCars(downloadedData)
            //     // });
            //     //
            //     // userCopy.cars = carsArr;
            //     // setLoggedUser(userCopy);
            //     //
            //     // await updateData(`user/${loggedUser._id}`, dataToSave).then(()=>{
            //     //     setLoggedUserCars(carsArr)});
            //     //
            //     // let photos = Object.values(toDelete[1].carPhoto);
            //     //     console.log('_______________________________')
            //     //     console.log(photos)
            //     //     console.log(photos.length)
            //     //      console.log(typeof photos)
            //     //
            //     //
            //     // if (toDelete[1].carPhoto) await deleteFile('images/cars/',photos);
            //     // setToDelete([``,``])
            // }
            // if (toDelete[0] === 'trip') {
            //     await deleteData(`trip/${toDelete[1]._id}`);
            //     const target = `select/trips/${loggedUser._id}`
            //
            //     await fetchData(target).then(downloadedData => {
            //
            //         setLoggedUserTrips(downloadedData)
            //     });
            //     if (toDelete[1].tripPhoto) await deleteFile('images/trips/', toDelete[1].tripPhoto);
            //     setToDelete([``, ``])
            // }
            if (toDelete[0] === 'message') {
                console.log('message ' + toDelete[1]._id)
                await deleteData(`message/${toDelete[1]._id}`);
                // const target = `select/trips/${loggedUser._id}`

                // await fetchData(target).then(downloadedData => {
                //
                //     setLoggedUserTrips(downloadedData)
                // });
                // if (toDelete[1].tripPhoto) await deleteFile('images/trips/', toDelete[1].tripPhoto);
                setToDelete([``, ``])
            }
        }
        setYesOrNot([false, 0])
    }, [yesOrNot[1]])
}
