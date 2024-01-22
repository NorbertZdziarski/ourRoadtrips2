import React, {useEffect, useState} from 'react';
import {fetchData} from "./a_CRUD_service";
import {useStoreActions, useStoreState} from "easy-peasy";

function UserAdminGroup() {

    const loggedUser = useStoreState(state => state.loggedUser);
    const setShowLoading = useStoreActions(actions => actions.setShowLoading);
    const [loggedUsersGroups, setLoggedUsersGroups ] = useState();

//     const inputData = {
//     saveDate: new Date(),
//     owner: 'Stefan',
//     ownerId: '12345',
//     name: 'Wyprawa na księżyc',
//     comment: ' jest gites! ',
//     description: 'lorem ipsum uno lorem ipsum lorem 2 ipsum lorem trie ipsum lorem blabus ipsum lorem ipsum lorem ipsum',
//     type: 'friends',
//     photo: 'foto.jpg',
//     public: true,
//     comments: [],
//     design: [],
//     invitedUsers: [1234,3333],
//     users: [],
//     trips: [],
//     cars: []
// }

    useEffect(async ()=>{
        if (loggedUser) {
        setShowLoading([true,0]);
        let targetGroups = `select/groups/${loggedUser._id}`
        await fetchData(targetGroups).then(downloadedGroups => {
            console.log('2 user profile | trips |  downloadedData: ' + downloadedGroups + ' JSON: ' + JSON.stringify(downloadedGroups))
            setLoggedUsersGroups(downloadedGroups);
            setShowLoading([false, 0]);
        })
        };
    },[])


    // const index = 1;


    return (<>
        <section className={'userAdminGroup'}>
            <div>
                <h4>panel administracyjny dla Twoich grup:</h4>
            </div>

            {loggedUsersGroups ?
            <table>
                <tr>
                    <th>l.p.</th>
                    <th>date</th>
                    <th>name</th>
                    <th>comment</th>
                    <th>description</th>
                    <th>type</th>
                    <th>photo</th>
                    <th>comments</th>
                    <th>design</th>
                    <th>invited users</th>
                    <th>users</th>
                    <th>trips</th>
                    <th>cars</th>
                    <th>public</th>
                </tr>
                {loggedUsersGroups.map((loggedUserGroup, index) => {
                    // console.log(loggedUserGroup.saveDate)
                    // console.log(typeof loggedUserGroup.saveDate)
                    let saveDate = new Date(loggedUserGroup.saveDate);
                    let rok = saveDate.getFullYear();
                    let miesiac = saveDate.getMonth() + 1;
                    let dzien = saveDate.getDate();

                    return (
                <tr>
                    <td>{index + 1}</td>
                    <td>{dzien} {miesiac} {rok}</td>
                    {/*<td> no data </td>*/}
                    <td>{loggedUserGroup.name}</td>
                    <td>{loggedUserGroup.comment}</td>
                    <td>{loggedUserGroup.description.slice(0,20)}...</td>
                    <td>{loggedUserGroup.type}</td>
                    <td>{loggedUserGroup.photo?<p>yes</p> : <p>no</p>}</td>
                    <td>{loggedUserGroup.comments?<p>yes</p> : <p>no</p>}</td>
                    <td>{loggedUserGroup.design?<p>yes</p> : <p>no</p>}</td>
                    <td>{loggedUserGroup.invitedUsers.length}</td>
                    <td>{loggedUserGroup.users.length}</td>
                    <td>{loggedUserGroup.trips.length}</td>
                    <td>{loggedUserGroup.cars.length}</td>
                    <td>{loggedUserGroup.public?<p>yes</p> : <p>no</p>}</td>
                </tr>)}
                )}
            </table> : <p>loading</p> }

        </section>

    </>)
}

export default UserAdminGroup;