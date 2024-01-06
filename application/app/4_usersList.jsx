import React, {useState} from 'react';
import LoadImage from "./a_loadimage";

function UsersList({usersList, invitedUsers, setInvitedUsers}) {
    // const [invitedUsers, setInvitedUsers] = useState([]);

    function addUserToGroup(userId) {
        setInvitedUsers(prevInvitedUsers => {
            if (prevInvitedUsers.includes(userId)) {
                return prevInvitedUsers.filter(id => id !== userId);
            } else {
                return [...prevInvitedUsers, userId];
            }
        });
    }

    return (
        <div className={`layout_grid`}>
            {usersList ? <>
                {usersList.map((user)=>{
                    return (
                        <div className={`layout_flex datalist`} key={user._id}>

                            <LoadImage imageName={user.userPhoto || 'user.png'}
                                       imagePath='images/users'
                                       photoClass="photo_xs"
                            />
                            <p>
                                {user.nick}
                            </p>
                            <a onClick={()=>addUserToGroup(user._id)}>
                                {invitedUsers.includes(user._id) ? <div className={'check'}>invited</div> : <div >invite to the group</div>}
                            </a>
                        </div>
                    )
                })} </> : <></>}
        </div>
    )
}
export default UsersList
