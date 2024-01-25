import React, {useEffect, useState} from 'react';
import {fetchData} from "./a_CRUD_service";
import {useStoreActions, useStoreState} from "easy-peasy";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import icobook from "../images/book.svg";
import icophoto from "../images/image-solid.svg";
import icogroup from "../images/people.png";
import icocars from "../images/cars.png";
import icotrip from "../images/route-solid.svg";
import icochat from "../images/chat.png";
import icocomment from "../images/comment.png";
import icotheme from "../images/color-palette_6591234.png";
import icolock from "../images/lock_icon_148524.png";
import iconame from "../images/signature.png";
import icocalendar from "../images/calendar_day_month_date_year_schedule_icon_175594.png";
import icoedit from "../images/gear-solid.svg";
import Anim_loading from "./anim_loading";

function UserAdminGroup() {

    const loggedUser = useStoreState(state => state.loggedUser);
    const setShowLoading = useStoreActions(actions => actions.setShowLoading);
    const setTempInMemory = useStoreActions(actions => actions.setTempInMemory);
    const [loggedUsersGroups, setLoggedUsersGroups ] = useState();
    const displayStyles = useStoreState(state => state.displayStyles);

    useEffect(async ()=>{
        if (loggedUser) {
        setShowLoading([true,0]);
        let targetGroups = `select/groups/${loggedUser._id}`
        await fetchData(targetGroups).then(downloadedGroups => {

            setLoggedUsersGroups(downloadedGroups);
            setShowLoading([false, 0]);
        })
        };
    },[])


    return (<>
        <section className={'userAdminGroup'}>
            <div>
                <h4>panel administracyjny dla Twoich grup:</h4>
            </div>
            {loggedUsersGroups ? null : <Anim_loading/>}
            {loggedUsersGroups && window.innerWidth > 951 ?

            <table>
                <tr>
                    <th></th>
                    <th><img src={icocalendar} alt={'date'} className={`header_ico ico_${displayStyles}`}/></th>
                    <th><img src={iconame} alt={'name'} className={`header_ico ico_${displayStyles}`}/></th>
                    <th><img src={icocomment} className={`header_ico ico_${displayStyles}`}/></th>
                    <th> <img src={icobook} className={`header_ico ico_${displayStyles}`}/></th>
                    <th>type</th>
                    <th><img src={icophoto} className={`header_ico ico_${displayStyles}`}/></th>
                    <th><img src={icochat} className={`header_ico ico_${displayStyles}`}/></th>
                    <th><img src={icotheme} className={`header_ico ico_${displayStyles}`}/></th>
                    <th>invited users</th>
                    <th><img src={icogroup} className={`header_ico ico_${displayStyles}`}/></th>
                    <th><img src={icotrip} className={`header_ico ico_${displayStyles}`}/></th>
                    <th><img src={icocars} className={`header_ico ico_${displayStyles}`}/></th>
                    <th><img src={icolock} className={`header_ico ico_${displayStyles}`}/></th>
                    <th><img src={icoedit} className={`header_ico ico_${displayStyles}`}/></th>
                </tr>
                {loggedUsersGroups.map((loggedUserGroup, index) => {
                    let saveDate = new Date(loggedUserGroup.saveDate);
                    let rok = saveDate.getFullYear();
                    let miesiac = saveDate.getMonth() + 1;
                    let dzien = saveDate.getDate();

                    return (
                        <tr>

                                <td>{index + 1}</td>
                                <td>{dzien}.{miesiac} {rok}</td>
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
                                <td className={'full-cell-button-container'}>
                                    <Link to={`/useradmingroup-edit`} onClick={()=>{setTempInMemory(loggedUserGroup)}} className={'full-cell-button'} >

                                            EDIT

                                    </Link>
                                </td>

                        </tr>
                    );
                })}
            </table> : null }
            {loggedUsersGroups && window.innerWidth < 950 ?
                <>

                    {loggedUsersGroups.map((loggedUserGroup, index) => {
                        let saveDate = new Date(loggedUserGroup.saveDate);
                        let rok = saveDate.getFullYear();
                        let miesiac = saveDate.getMonth() + 1;
                        let dzien = saveDate.getDate();

                        return (
                            <section className={'userGroupPanelAdminMobile'}>
                                <header>
                                <div>

                                    <h4>{index + 1}</h4>
                                </div>
                                <div>
                                    <h6>title</h6>
                                    <p>{loggedUserGroup.name}</p>
                                </div>
                                </header>
                                <section>
                                    <div>
                                        <p>{loggedUserGroup.description.slice(0,20)}</p>

                                    </div>
                                </section>
                                <main>
                                    <div>
                                        <h6>type</h6>
                                        <p>{loggedUserGroup.type}</p>
                                    </div>
                                    <div>
                                        <img src={icogroup} className={`header_ico ico_${displayStyles}`}/>
                                        <p>{loggedUserGroup.invitedUsers.length}</p>
                                    </div>
                                    <div>
                                        <img src={icogroup} className={`header_ico ico_${displayStyles}`}/>
                                        <p>{loggedUserGroup.users.length}</p>
                                    </div>
                                    <div>
                                        <img src={icotrip} className={`header_ico ico_${displayStyles}`}/>
                                        <p>{loggedUserGroup.trips.length}</p>
                                    </div>
                                    <div>
                                        <img src={icocars} className={`header_ico ico_${displayStyles}`}/>
                                        <p>{loggedUserGroup.cars.length}</p>
                                    </div>

                                </main>
                                <footer>
                                    <div>
                                        <h6>open</h6>
                                        {loggedUserGroup.public?<p>yes</p> : <p>no</p>}
                                    </div>                                    <div>
                                    <Link to={`/useradmingroup-edit`} onClick={()=>{setTempInMemory(loggedUserGroup)}} className={'full-cell-button'} >

                                        EDIT

                                    </Link>
                                    </div>
                                </footer>
                            </section>
                        );
                    })}
                </> :  null }
        </section>

    </>)
}

export default UserAdminGroup;