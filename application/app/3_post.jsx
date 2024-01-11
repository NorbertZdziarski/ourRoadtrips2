import React, {useEffect, useState} from 'react';
import {deleteData, fetchData, transferData, updateData} from "./a_CRUD_service";
import {useStoreActions, useStoreState} from "easy-peasy";
import LoadImage from "./a_loadimage";
import NewMessage from "./5_newMessage";
import logoRoadtrips from "../images/logo.png"
import { Link } from "react-router-dom";

function Post() {
    const loggedUser = useStoreState(state => state.loggedUser);
    const [incommingMessages, setIncommingMessages] = useState(false);
    const [sendMessages, setSendMessages] = useState(false);
    const [sendMessTxt, setSendMessTxt] = useState(null);
    const [sendMessReciver, setSendMessReciver] = useState(null);
    const [readMessage, setReadMessage] = useState(null);
    const [whichScreen, setWhichScreen] = useState('inbox');

    const [newGroupUser, setNewGroupUser] = useState('')

    const [newMessages, setNewMessages] = useState(0);
    const [newMessagesOff, setNewMessagesOff] = useState(0);
    const [updateGroup, setUpdateGroup] = useState(null);
    const [inboxClass, setInboxClass] = useState('');
    const [officialClass, setOfficialClass] = useState('');
    const [newMessageClass, setNewMessageClass] = useState('');
    const [sendedClass, setSendedClass] = useState('');

    const setShowLoading = useStoreActions(actions => actions.setShowLoading);
    const setYesOrNot = useStoreActions(actions => actions.setYesOrNot);
    const setToDelete = useStoreActions(actions => actions.setToDelete );
    const toDelete = useStoreState(state => state.toDelete);
    const yesOrNot = useStoreState(state => state.yesOrNot);

    async function fetchMessages() {
        let askFormInc = {receiverId: loggedUser._id};
        let responseInc = await transferData(`message/find`, askFormInc);
        let data = responseInc.id.reverse();
        setIncommingMessages(data)
        let askFormSend = {fromUserId: loggedUser._id};
        let responseSend = await transferData(`message/find`, askFormSend);
        let dataSend = responseSend.id.reverse();
        setSendMessages(dataSend)
    }

    // async function updateMessage(message) {

    // }
    useEffect(async ()=>{
        if (updateGroup) {
            console.log(loggedUser)
            console.log(JSON.stringify(loggedUser));
            let addUser = {
                nick: loggedUser.nick,
                id: loggedUser._id,
                photo: loggedUser.userPhoto
            }
            // console.log('update Group ' + JSON.stringify(updateGroup));
            // console.log(`newGroupUser: ` + newGroupUser)
            updateGroup.users.push(addUser)
            const idGroup = updateGroup._id;
            delete updateGroup._id;
            console.log(JSON.stringify(updateGroup));
            // console.log(JSON.stringify(updateGroup.users))

            // const updateMessage = { ...message, readed: true };
            let target = `group/${idGroup}`
            console.log('target: ' + target)
            await updateData(target,updateGroup).then((r)=>{console.log('ok. ' + r)}).catch((e)=>{console.log('error! ' + e)})
            setReadMessage('')
        }
    },[updateGroup])


    useEffect(async ()=>{
        if (newGroupUser) {
                const checkData = (downloadedData) => {
                    if (downloadedData.users) {
                        if (downloadedData.users.includes(newGroupUser)) {
                            // console.log(' juz jest ')
                            setReadMessage('')
                            // alert ?
                        } else {
                            console.log('brak')
                            setUpdateGroup(downloadedData);
                        }
                    } else {console.log('brak użytkowników.')}
                }

                const target = `one/group/${newGroupUser}`
                const fetchDataAsync = async () => {
                    try {
                        const downloadedData = await fetchData(target);
                        console.log(downloadedData);
                        // console.log(downloadedData.users.includes(newGroupUser))
                        checkData(downloadedData)
                        //
                    } catch (error) {
                        console.error("Error fetching data: ", error);
                    }
                };
                fetchDataAsync();



            // const updateMessage = { ...message, readed: true };
            // const { _id, ...newMessage } = updateMessage;
            // const id = _id;
            //
            // let inMess = incommingMessages.map((mess) => {
            //     if (mess._id === id) {
            //         return updateMessage}
            //     ;
            //     return mess;
            // });
            //
            // setIncommingMessages(inMess)
            //
            // setReadMessage(newMessage);
            //
            // let target = `message/${id}`
            // await updateData(target,newMessage).then((r)=>{console.log('ok ' + r)}).catch((e)=>{console.log('error ' + e)})
            // // }

        } else {console.log(' błąd - brak wiadomosci')}

    },[newGroupUser])

    useEffect(() => {
        if (loggedUser) {
            setShowLoading([true,0]);
            fetchMessages();
        }
        setShowLoading([false,0]);
    }, []);

    useEffect(()=>{
        if (incommingMessages) {
                let count = 0;
                let countOff = 0;
                incommingMessages.forEach((inmess)=>{
                    if (inmess.readed === false) {
                        if (inmess.type === 'official') {
                            countOff++;
                        } else {
                            count++;
                        }
                    }
                })
            setNewMessages(count);
            setNewMessagesOff(countOff)
        }
    },[incommingMessages])

    useEffect(()=>{
        setReadMessage(null)
        if (whichScreen === 'inbox') {setInboxClass(`selected`)} else {setInboxClass('')}
        if (whichScreen === 'official') {setOfficialClass(`selected`)} else {setOfficialClass('')}
        if (whichScreen === 'sended') {setSendedClass(`selected`)} else {setSendedClass('')}
        if (whichScreen === 'new') {setNewMessageClass(`selected`)} else {setNewMessageClass('')}
    },[whichScreen])

    useEffect(async () => {
        console.log(' delete item ')
        if (yesOrNot[1] === 2) {
            if (toDelete[0] === 'message') {
                console.log('message ' + toDelete[1]._id)
                await deleteData(`message/${toDelete[1]._id}`);
                fetchMessages();
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



    async function showMessage(message) {
        if (message) {
            const updateMessage = { ...message, readed: true };
            const { _id, ...newMessage } = updateMessage;
            const id = _id;
            let inMess = incommingMessages.map((mess) => {
                if (mess._id === id) {
                    return updateMessage}
                ;
                return mess;
            });

            setIncommingMessages(inMess)

            setReadMessage(newMessage);

                let target = `message/${id}`
                await updateData(target,newMessage).then((r)=>{console.log('ok ' + r)}).catch((e)=>{console.log('error ' + e)})
            // }

        } else {console.log(' błąd - brak wiadomosci')}

    }

    return (
        <section className={'divHeightTemp divWidthTemp post '} >
            <header>
                <nav className={'layout_grid3 divWidthTemp'}>
                    <button className={newMessageClass} onClick={()=>{
                        setReadMessage(false);
                        setWhichScreen('new')}
                    }>write new message</button>
                    <button className={inboxClass} onClick={()=>setWhichScreen('inbox')}>inbox {newMessages ? `[ ${newMessages} ]` : ''}</button>
                    <button className={sendedClass} onClick={()=>setWhichScreen('sended')}>sended</button>
                    <button className={officialClass} onClick={()=>setWhichScreen('official')}>official {newMessagesOff ? `[ ${newMessagesOff} ]` : ''}</button>
                </nav>
                { ((whichScreen === 'inbox') && incommingMessages) ?  <h3>  ilość wiadomości: {incommingMessages.length}, w tym nie przeczytane: {newMessages}</h3> :null }
                { ((whichScreen === 'sended') && sendMessages) ?  <h3>  ilość wiadomości: {sendMessages.length}</h3> : null }
                { (whichScreen === 'new') ?  <h3>  write new message: </h3> : null }
            </header>
            <div className={'layout_flex-sb divWidthTemp'} >
                <nav className={'postListNav'}>
                    {(whichScreen === 'inbox') ? <>
                        {incommingMessages ? <>
                            {incommingMessages.map((message, index) => {
                                return (message.type !== 'official' ?
                                    <div key={index} className={`layout_flex-sb  ${message.readed ? '' : 'objReaded'}`} >
                                        <div className={`layout_flex-sb-directColumn`}>
                                            <p className={'fnt_subtitle'}>from: {message.fromUserNick} </p>
                                            <p className={'fnt_Title'}>title:  {message.title} </p>
                                        </div>
                                        <div className={`layout_flex-sb-directColumn`}>
                                            <button onClick={()=>showMessage(message)}> show </button>
                                            <button onClick={()=>{
                                                setToDelete(['message',message])
                                                setYesOrNot([true,0])
                                                // deleteItem();
                                            }}> delete </button>
                                        </div>
                                    </div> : null )
                            })}
                        </> : <p>no data</p>}
                    </>:<></>}
                    {(whichScreen === 'sended') ? <>
                        {sendMessages ? <>
                            {sendMessages.map((message, index)=>{
                                return (message.type !== 'official' ?
                                     <div key={index} className={'layout_flex-sb'}>
                                        <div className={'layout_flex-sb-directColumn'}>
                                            <p className={'fnt_subtitle'}>to: {message.receiverNick} </p>
                                            <p className={'fnt_Title'}>title:  {message.title} </p>
                                        </div>
                                        <div className={`layout_flex-sb-directColumn`}>
                                            <button onClick={()=>setReadMessage(message)}> show </button>
                                            <button onClick={()=>{
                                                setToDelete(['message',message])
                                                setYesOrNot([true,0])
                                            }}> delete </button>
                                        </div>
                                </div> : null )
                            })}
                        </> : <p>no data</p>}</>:<></>}
                    {(whichScreen === 'official') ? <>
                        {incommingMessages ? <>
                            {incommingMessages.map((message, index) => {
                                return (message.type === 'official' ?
                                    <div key={index} className={`layout_flex-sb  ${message.readed ? '' : 'objReaded'}`} >
                                        <div className={`layout_flex-sb-directColumn`}>
                                            <p className={'fnt_subtitle'}>from: {message.fromUserNick} </p>
                                            <p className={'fnt_Title'}>title:  {message.title} </p>
                                        </div>
                                        <div className={`layout_flex-sb-directColumn`}>
                                            <button onClick={()=>showMessage(message)}> show </button>
                                            <button onClick={()=>{
                                                setToDelete(['message',message])
                                                setYesOrNot([true,0])
                                                // deleteItem();
                                            }}> delete </button>
                                        </div>
                                    </div> : null )
                            })}
                        </> : <p>no data</p>}
                    </>:<></>}
                </nav>
                <article className={'layout_grid postMessage divHeightTemp divWidthTemp'}>
                    {(whichScreen === 'new') ? <>
                        <NewMessage setWhichScreen={setWhichScreen} sendMessages={sendMessages} setSendMessages={setSendMessages} replyMessage={sendMessTxt} sendMessReciver={sendMessReciver}/>
                    </>:<>
                        {readMessage ? <div>
                            {sendMessages ? <>
                                <div className={'layout_flex-sb'}>
                                    <p className={'fnt_subtitle'}>to:  {readMessage.receiverNick} </p>
                                    <LoadImage imageName={readMessage.receiverPhoto || 'user.png'}
                                               imagePath='images/users'
                                               photoClass="photo_xs"
                                    />
                                </div>
                            </> : <></>}
                            <div className={'layout_flex-sb'}>
                                <p className={'fnt_subtitle'}>from:  {readMessage.fromUserNick} </p>
                                <LoadImage imageName={readMessage.fromUserPhoto || 'user.png'}
                                           imagePath='images/users'
                                           photoClass="photo_xs"
                                />
                            </div>
                            <p className={'fnt_tertiary'}>send:  {readMessage.sendData}</p>
                            <p className={'fnt_Title'}>title:  {readMessage.title}</p>
                            <div>
                                <p className={'fnt_subtitle'}> message: </p>
                                {readMessage.type !== 'official' ? <>
                                <textarea className={'fnt_subtitle'} value={readMessage.txt} />
                                    <button onClick={()=>{
                                    let user = {
                                        nick: readMessage.fromUserNick,
                                        userPhoto: readMessage.fromUserPhoto,
                                        _id: readMessage.fromUserId
                                    }
                                    setSendMessReciver(user);
                                    setSendMessTxt(`\n ---oryginal--- \n from: ${readMessage.fromUserNick} \n date: ${readMessage.sendData} \n oryginal text: \n ${readMessage.txt} `)
                                    setWhichScreen('new')}}>Reply</button>
                                </> : <>
                                    <div className='fnt_subtitle postAddGroup' id='elementId' dangerouslySetInnerHTML={{ __html: readMessage.txt }}></div>
                                        <div className={'layout_flex-sc postAddGroupButt'}>
                                        <button onClick={()=>{setNewGroupUser(readMessage.idGroup)}}> JOIN THE GROUP!</button>
                                        <Link to={`../showgroup/${readMessage.idGroup}`} target="_blank"> SHOW FUNPAGE!</Link>
                                    </div>
                                </> }
                            </div>

                        </div> : <div className={'postImg'}><p>ourRoadtrips</p><img src={logoRoadtrips}/></div>}
                    </>}

                </article>
            </div>

        </section>
    )
}

export default Post;