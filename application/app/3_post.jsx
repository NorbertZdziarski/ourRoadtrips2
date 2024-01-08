import React, {useEffect, useState} from 'react';
import {deleteData, transferData, updateData} from "./a_CRUD_service";
import {useStoreActions, useStoreState} from "easy-peasy";
import LoadImage from "./a_loadimage";
import NewMessage from "./5_newMessage";
// import {deleteItem} from "./5_delete";

function Post() {
    const loggedUser = useStoreState(state => state.loggedUser);
    const [incommingMessages, setIncommingMessages] = useState(false);
    const [sendMessages, setSendMessages] = useState(false);
    const [sendMessTxt, setSendMessTxt] = useState(null);
    const [sendMessReciver, setSendMessReciver] = useState(null);
    const [readMessage, setReadMessage] = useState(null);
    const [whichScreen, setWhichScreen] = useState('inbox');
    const setShowLoading = useStoreActions(actions => actions.setShowLoading);
    const setYesOrNot = useStoreActions(actions => actions.setYesOrNot);
    const setToDelete = useStoreActions(actions => actions.setToDelete );
    const toDelete = useStoreState(state => state.toDelete);
    const yesOrNot = useStoreState(state => state.yesOrNot);

    async function fetchMessages() {
        let askFormInc = {receiverId: loggedUser._id};
        let responseInc = await transferData(`message/find`, askFormInc);
        let data = responseInc.id;
        setIncommingMessages(data)
        let askFormSend = {fromUserId: loggedUser._id};
        let responseSend = await transferData(`message/find`, askFormSend);
        let dataSend = responseSend.id;
        setSendMessages(dataSend)
    }

    // async function updateMessage(message) {

    // }
    // useEffect(async ()=>{
    //
    // },[readMessage])

    useEffect(() => {
        if (loggedUser) {
            setShowLoading([true,0]);
            fetchMessages();
        }
        setShowLoading([false,0]);
    }, []);

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

            // message = { ...message, title: 'kapusta i true' };

            setReadMessage(newMessage);
            // if (readMessage) {
            //     console.log(' update ' + readMessage._id)
            //     console.log(' update JSON ' + JSON.stringify(readMessage))
            //     // setReadMessage(readMessage.readed = true)
                let target = `message/${id}`
                await updateData(target,newMessage).then((r)=>{console.log('ok ' + r)}).catch((e)=>{console.log('error ' + e)})
            // }



        } else {console.log(' błąd - brak wiadomosci')}

    }

    return (
        <section className={'divHeightTemp divWidthTemp'} >
            <header>
                <nav className={'layout_grid3 divWidthTemp'}>
                    <button onClick={()=>{
                        setReadMessage(false);
                        setWhichScreen('new')}
                    }>write new message</button>
                    <button onClick={()=>setWhichScreen('inbox')}>inbox</button>
                    <button onClick={()=>setWhichScreen('sended')}>sended</button>
                    <button onClick={()=>setWhichScreen('official')}>official</button>
                </nav>
                { ((whichScreen === 'inbox') && incommingMessages) ?  <h3>  ilość wiadomości: {incommingMessages.length}</h3> :null }
                { ((whichScreen === 'sended') && sendMessages) ?  <h3>  ilość wiadomości: {sendMessages.length}</h3> : null }
                { (whichScreen === 'new') ?  <h3>  write new message: </h3> : null }
            </header>
            <div className={'layout_flex-sb divWidthTemp'} >
                <nav className={'layout_grid postListNav'}>
                    {(whichScreen === 'inbox') ? <>
                        {incommingMessages ? <>
                            {incommingMessages.map((message, index)=>{
                                return <div key={index} className={`layout_flex-sb  ${message.readed ? '' : 'objReaded'}`} >
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
                                        }}

                                        > delete </button>
                                    </div>
                                </div>
                            })}
                        </> : <p>no data</p>}
                    </>:<></>}
                    {(whichScreen === 'sended') ? <>
                        {sendMessages ? <>
                            {sendMessages.map((message, index)=>{
                                return <div key={index} className={'layout_flex-sb'}>
                                    <div className={'layout_flex-sb-directColumn'}>
                                        <p className={'fnt_subtitle'}>to: {message.receiverNick} </p>
                                        <p className={'fnt_Title'}>title:  {message.title} </p>
                                    </div>
                                    <div className={`layout_flex-sb-directColumn`}>
                                        <button onClick={()=>setReadMessage(message)}> show </button>
                                        <button disabled onClick={()=>{}}> delete </button>
                                    </div>
                                </div>
                            })}
                        </> : <p>no data</p>}</>:<></>}

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
                            <p className={'fnt_tertiary'}>send:  {readMessage.sendData}</p>
                            <p className={'fnt_Title'}>title:  {readMessage.title}</p>
                            <div>
                                <p className={'fnt_subtitle'}>message:  {readMessage.txt} </p>
                                <button onClick={()=>{
                                    let user = {
                                        nick: readMessage.fromUserNick,
                                        userPhoto: readMessage.fromUserPhoto,
                                        _id: readMessage.fromUserId
                                    }
                                    setSendMessReciver(user);
                                    setSendMessTxt(`\n ---oryginal--- \n from: ${readMessage.fromUserNick} \n date: ${readMessage.sendData} \n oryginal text: \n ${readMessage.txt} `)
                                    setWhichScreen('new')}}>Reply</button>
                            </div>
                            <div className={'layout_flex-sb'}>
                                <p className={'fnt_subtitle'}>from:  {readMessage.fromUserNick} </p>
                                <LoadImage imageName={readMessage.fromUserPhoto || 'user.png'}
                                           imagePath='images/users'
                                           photoClass="photo_xs"
                                />
                            </div>
                        </div> : <div> // no message // </div>}
                    </>}

                </article>
            </div>

        </section>
    )
}

export default Post;