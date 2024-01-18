import React from 'react';

function UserAdminGroup_edit() {
    const index = 1;
    const inputData = {
    saveDate: new Date(),
    owner: 'Stefan',
    ownerId: '12345',
    name: 'Wyprawa na księżyc',
    comment: ' jest gites! ',
    description: 'lorem ipsum uno lorem ipsum lorem 2 ipsum lorem trie ipsum lorem blabus ipsum lorem ipsum lorem ipsum',
    type: 'friends',
    photo: 'foto.jpg',
    public: true,
    comments: [],
    design: [],
    invitedUsers: [1234,3333],
    users: [],
    trips: [],
    cars: []
}

    let rok = inputData.saveDate.getFullYear();
    let miesiac = inputData.saveDate.getMonth() + 1; // Dodajemy 1, aby otrzymać wartość od 1 do 12
    let dzien = inputData.saveDate.getDate();
    return (<>
        <section className={'userAdminGroup'}>
            <div>
                <h4>panel administracyjny do edycji grupy:</h4>
            </div>


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
                <tr>
                    <td>{index}</td>
                    <td>{dzien} {miesiac} {rok}</td>
                    <td>{inputData.name}</td>
                    <td>{inputData.comment}</td>
                    <td>{inputData.description.slice(0,20)}...</td>
                    <td>{inputData.type}</td>
                    <td>{inputData.photo?<p>yes</p> : <p>no</p>}</td>
                    <td>{inputData.comments?<p>yes</p> : <p>no</p>}</td>
                    <td>{inputData.design?<p>yes</p> : <p>no</p>}</td>
                    <td>{inputData.invitedUsers.length}</td>
                    <td>{inputData.users.length}</td>
                    <td>{inputData.trips.length}</td>
                    <td>{inputData.cars.length}</td>
                    <td>{inputData.public?<p>yes</p> : <p>no</p>}</td>
                </tr>
            </table>

        </section>

    </>)
}

export default UserAdminGroup_edit;