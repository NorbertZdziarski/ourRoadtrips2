import React, {useEffect, useState} from 'react';
import {fetchData} from "./a_CRUD_service";
import {useStoreActions, useStoreState} from "easy-peasy";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import icobook from "../images/menu_book_FILL0_wght400_GRAD0_opsz24.svg";
import icophoto from "../images/image_FILL0_wght400_GRAD0_opsz24.svg";
import icogroup from "../images/groups_FILL0_wght400_GRAD0_opsz24.svg";
import icocars from "../images/cars.png";
import icotrip from "../images/route_FILL0_wght400_GRAD0_opsz24.svg";
import icochat from "../images/forum_FILL0_wght400_GRAD0_opsz24.svg";
import icocomment from "../images/chat_FILL0_wght400_GRAD0_opsz24.svg";
import icotheme from "../images/palette_FILL0_wght400_GRAD0_opsz24.svg";
import icolock from "../images/lock_FILL0_wght400_GRAD0_opsz24.svg";
import iconame from "../images/splitscreen_FILL0_wght400_GRAD0_opsz24.svg";
import icocalendar from "../images/calendar_month_FILL0_wght400_GRAD0_opsz24.svg";
import icoedit from "../images/edit_note_FILL0_wght400_GRAD0_opsz24.svg";
import icopersonadd from "../images/person_add_FILL0_wght400_GRAD0_opsz24.svg"
import icoabc from "../images/abc_FILL0_wght400_GRAD0_opsz24.svg"
import Anim_loading from "./anim_loading";

function UserAdminGroup() {

    const loggedUser = useStoreState(state => state.loggedUser);
    const setShowLoading = useStoreActions(actions => actions.setShowLoading);
    const setTempInMemory = useStoreActions(actions => actions.setTempInMemory);
    const [loggedUsersGroups, setLoggedUsersGroups ] = useState();
    const displayStyles = useStoreState(state => state.displayStyles);
    const [hover, setHover] = useState(-1);
    const [coords, setCoords] = useState({ x: 0, y: 0 });

    const icoComment = ['l.p.','calendar', 'name','comment', 'description', 'type', 'profile picture', 'comments','design','invited users','active users','trips','cars','open','settings']

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

    const handleMouseMove = (event) => {
        setCoords({ x: event.clientX, y: event.clientY + 20 });
        console.log('handle: hover: ', JSON.stringify(hover))
        // console.log('handle: koordynaty: ', JSON.stringify(coords))
    };
    const onHover = (index) => {
        // console.log('on Hover koordynaty: ', JSON.stringify(coords))
        console.log('onHover')
        setHover(index);
    };

    const onHoverOver = (ind) => {
        console.log('onHoverOver ', ind)
        if (ind === hover) setHover(-1);
    };

    return (<>
        <section className={'userAdminGroup'}>
            {hover !== -1 && <div className={'cloudIcoComment'}
                style={{
                    position: 'absolute',
                    left: `${coords.x}px`,
                    top: `${coords.y}px`,
                    pointerEvents: 'none'
                }}
                onMouseMove={handleMouseMove}
            >{icoComment[hover]}</div>}
            {/*{icoComment[hover]}*/}
            <div>
                <h4>panel administracyjny dla Twoich grup:</h4>
            </div>
            {loggedUsersGroups ? null : <Anim_loading/>}
            {loggedUsersGroups && window.innerWidth > 951 ?
            <table>
                <tr className={'inverseIco'} >
                    <th onMouseEnter={()=>onHover(0)}
                        onMouseLeave={()=>onHoverOver(0)}
                        onMouseMove={handleMouseMove}></th>
                    <th onMouseEnter={()=>onHover(1)}
                        onMouseLeave={()=>onHoverOver(1)}
                        onMouseMove={handleMouseMove}><img src={icocalendar} alt={'date'}
                             className={`header_ico ico_${displayStyles} 
                             `}/></th>
                    <th onMouseEnter={()=>onHover(2)}
                                    onMouseLeave={()=>onHoverOver(2)}
                                    onMouseMove={handleMouseMove}><img src={iconame} alt={'name'} className={`header_ico ico_${displayStyles}`}/></th>
                    <th onMouseEnter={()=>onHover(3)}
                        onMouseLeave={()=>onHoverOver(3)}
                        onMouseMove={handleMouseMove}><img src={icocomment} className={`header_ico ico_${displayStyles}`}/></th>
                    <th onMouseEnter={()=>onHover(4)}
                        onMouseLeave={()=>onHoverOver(4)}
                        onMouseMove={handleMouseMove}><img src={icobook} className={`header_ico ico_${displayStyles}`}/></th>
                    <th onMouseEnter={()=>onHover(5)}
                        onMouseLeave={()=>onHoverOver(5)}
                        onMouseMove={handleMouseMove}><img src={icoabc} className={`header_ico ico_${displayStyles}`}/></th>
                    <th onMouseEnter={()=>onHover(6)}
                        onMouseLeave={()=>onHoverOver(6)}
                        onMouseMove={handleMouseMove}><img src={icophoto} className={`header_ico ico_${displayStyles}`}/></th>
                    <th onMouseEnter={()=>onHover(7)}
                        onMouseLeave={()=>onHoverOver(7)}
                        onMouseMove={handleMouseMove}><img src={icochat} className={`header_ico ico_${displayStyles}`}/></th>
                    <th onMouseEnter={()=>onHover(8)}
                        onMouseLeave={()=>onHoverOver(8)}
                        onMouseMove={handleMouseMove}><img src={icotheme} className={`header_ico ico_${displayStyles}`}/></th>
                    <th onMouseEnter={()=>onHover(9)}
                        onMouseLeave={()=>onHoverOver(9)}
                        onMouseMove={handleMouseMove}><img src={icopersonadd} className={`header_ico ico_${displayStyles}`}/></th>
                    <th onMouseEnter={()=>onHover(10)}
                        onMouseLeave={()=>onHoverOver(10)}
                        onMouseMove={handleMouseMove}><img src={icogroup} className={`header_ico ico_${displayStyles}`}/></th>
                    <th onMouseEnter={()=>onHover(11)}
                        onMouseLeave={()=>onHoverOver(11)}
                        onMouseMove={handleMouseMove}><img src={icotrip} className={`header_ico ico_${displayStyles}`}/></th>
                    <th onMouseEnter={()=>onHover(12)}
                        onMouseLeave={()=>onHoverOver(12)}
                        onMouseMove={handleMouseMove}><img src={icocars} className={`header_ico ico_${displayStyles}`}/></th>
                    <th onMouseEnter={()=>onHover(13)}
                        onMouseLeave={()=>onHoverOver(13)}
                        onMouseMove={handleMouseMove}><img src={icolock} className={`header_ico ico_${displayStyles}`}/></th>
                    <th onMouseEnter={()=>onHover(14)}
                        onMouseLeave={()=>onHoverOver(14)}
                        onMouseMove={handleMouseMove}><img src={icoedit} className={`header_ico ico_${displayStyles}`}/></th>
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
            {loggedUsersGroups && window.innerWidth < 950 ? <>
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
                                        <img src={icoabc} className={`header_ico ico_${displayStyles}`}/>
                                        <p>{loggedUserGroup.type}</p>
                                    </div>
                                    <div>
                                        <img src={icopersonadd} className={`header_ico ico_${displayStyles}`}/>
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