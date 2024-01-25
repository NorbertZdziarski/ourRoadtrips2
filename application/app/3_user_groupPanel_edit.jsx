import React, {useState} from 'react';
import {useStoreActions, useStoreState} from "easy-peasy";

function UserAdminGroup_edit() {
//     const index = 1;
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
//     invitedUsers: [1234,3333,7584,67483],
//     users: [5567,9090,478293],
//     trips: [12],
//     cars: [2222]
// }
    const [showActiveUsers, setShowActiveUsers] = useState(false)
    const [showInvUsers, setShowInvUsers] = useState(false)
    const [showCars, setShowCars] = useState(false)
    const [showTrips, setShowTrips] = useState(false)
    const setYesOrNot = useStoreActions(actions => actions.setYesOrNot);
    const loggedUser = useStoreState(state => state.loggedUser);
    const inputData = useStoreState(state => state.tempInMemory);

    let saveDate = new Date(inputData.saveDate);
    let rok = saveDate.getFullYear();
    let miesiac = saveDate.getMonth() + 1;
    let dzien = saveDate.getDate();

    return (<>
        <section className={'userAdminGroupEdit alert_underConstruction'}>
            <div className={'userAdminHeader'}>
                <h4>panel administracyjny do edycji grupy:</h4>

            </div>
            <div>
                <div>
                    <h6>name</h6>
                    <p>{inputData.name}</p>
                </div>
                <div>
                    <h6>date</h6>
                    <p>{dzien} {miesiac} {rok}</p>
                </div>
                <div>
                    <h6>public</h6>
                    <p>{inputData.public?<p>yes</p> : <p>no</p>}</p>
                </div>
            </div>
            <div>
                <div>
                    <h6>commen</h6>
                    <p>{inputData.comment}</p>
                </div>
                <div>
                    <h6>description</h6>
                    <p>{inputData.description}...</p>
                </div>




            </div>
            <div>
                <div>
                    <h6>type</h6>
                    <p>{inputData.type}</p>
                </div>
                <div>
                    <h6>design</h6>
                    <p>{inputData.design}</p>
                </div>
                <div>
                    <h6>photo</h6>
                    <p>{inputData.photo?<p>yes</p> : <p>no</p>}</p>
                </div>
            </div>
            <div>
                <div>
                    <h6>invited users</h6>
                             <div>
                        {showInvUsers? <div className={'dataBox'}>
                            {inputData.invitedUsers.map((invUser)=>{
                                return (
                                <section className={'dataLine'}>
                                    <p>user id number: {invUser}</p>
                                    <p>name: {invUser}</p>
                                    <button>send message</button>
                                    <button>remove invitation</button>
                                </section>
                                )
                            })}
                            <button onClick={()=>setShowInvUsers(!showInvUsers)}>hide</button>
                        </div>:<>
                            <p>{inputData.invitedUsers.length}</p>
                            <button onClick={()=>setShowInvUsers(!showInvUsers)}>show</button>
                        </>}

                    </div>
                </div>

            </div>

            <div>
                <div>
                    <h6>active users</h6>
                    <div>
                        {showActiveUsers? <div className={'dataBox'}>
                            {inputData.users.map((user)=>{
                                return (
                                    <section className={'dataLine'}>
                                        <p>user id number: {user.id}</p>
                                        <p>name: {user.nick}</p>
                                        <button>send message</button>
                                        <button>send reprimand</button>
                                        <button>remove user</button>
                                    </section>
                                )
                            })}
                            <button onClick={()=>setShowActiveUsers(!showActiveUsers)}>hide</button>
                        </div>:<>
                            <p>{inputData.users.length}</p>
                            <button onClick={()=>setShowActiveUsers(!showActiveUsers)}>show</button>
                        </>}
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <h6>our trips</h6>
                    <div>
                        {showTrips? <div className={'dataBox'}>
                            {inputData.trips.map((trip)=>{
                                return (
                                    <section className={'dataLine'}>
                                        <p>user id number: {trip}</p>
                                        <p>name: {trip}</p>
                                        <button>option</button>
                                        <button>option</button>
                                        <button>show / hide</button>
                                    </section>
                                )
                            })}
                            <button onClick={()=>setShowTrips(!showTrips)}>hide</button>
                        </div>:<>
                            <p>{inputData.trips.length}</p>
                            <button onClick={()=>setShowTrips(!showTrips)}>show</button>
                        </>}

                    </div>
                </div>

            </div>
            <div>
                <div>
                    <h6>our cars</h6>
                    <div>
                        {showCars? <div className={'dataBox'}>
                            {inputData.cars.map((car)=>{
                                return (
                                    <section className={'dataLine'}>
                                        <p>user id number: {car}</p>
                                        <p>name: {car}</p>
                                        <button>option</button>
                                        <button>option</button>
                                        <button>show / hide</button>
                                    </section>
                                )
                            })}
                            <button onClick={()=>setShowCars(!showCars)}>hide</button>
                        </div>:<>
                            <p>{inputData.cars.length}</p>
                            <button onClick={()=>setShowCars(!showCars)}>show</button>
                        </>}

                    </div>
                </div>

            </div>
            <nav>
                <button disabled>
                    cancel
                </button>
                <button disabled onClick={()=>setYesOrNot([true, 0])}>save changes</button>
                <button disabled>
                    delete the group
                </button>
            </nav>


            {/*        <th>comments</th>*/}

            {/*        <td>{inputData.comments?<p>yes</p> : <p>no</p>}</td>*/}

        </section>

    </>)
}

export default UserAdminGroup_edit;