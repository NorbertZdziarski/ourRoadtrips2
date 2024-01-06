import React, {useEffect, useState} from 'react';
import {transferData} from "./a_CRUD_service";
import {useStoreState} from "easy-peasy";
import LoadImage from "./a_loadimage";

function Post() {
    const loggedUser = useStoreState(state => state.loggedUser);
    const [incommingMessages, setIncommingMessages] = useState(false);
    const [sendMessages, setSendMessages] = useState(false);
    const [readMessage, setReadMessage] = useState(false);
    const [whichScreen, setWhichScreen] = useState(false);
    useEffect(() => {

        if (loggedUser) {
            async function fetchMessages() {
                let askForm = {receiverId: loggedUser._id};
                let response = await transferData(`message/find`, askForm);
                let data = response.id;
                setIncommingMessages(data)
                askForm = {fromUserId: loggedUser._id};
                response = await transferData(`message/find`, askForm);
                data = response.id;
                setSendMessages(data)
            }
            fetchMessages();
        }
    }, []);
    return (
        <section >
            <header>
                <nav className={'layout_grid3'}>
                    <button onClick={()=>setWhichScreen('inbox')}>inbox</button>
                    <button onClick={()=>setWhichScreen('sended')}>sended</button>
                    <button onClick={()=>setWhichScreen('new')}>new</button>
                </nav>
                { (whichScreen === 'inbox' && incommingMessages) ?  <h3>  ilość wiadomości: {incommingMessages.length}</h3> : <h3> no messages </h3> }
                { (whichScreen === 'sended' && sendMessages) ?  <h3>  ilość wiadomości: {sendMessages.length}</h3> : <h3> no messages </h3> }
            </header>
            <div className={'layout_flex-sb'} >
                <nav className={'layout_grid postListNav'}>
                    {incommingMessages ? <>
                        {incommingMessages.map((message)=>{
                            return <div className={'layout_flex-sb'} >
                                <div className={'layout_flex-sb-directColumn'}>
                                    <p className={'fnt_Title'}>  {message.title} </p>
                                    <p className={'fnt_subtitle'}> {message.fromUserNick} </p>
                                </div>
                                <button onClick={()=>setReadMessage(message)}> show </button>
                            </div>
                        })}
                    </> : <p>no data</p>}
                    {sendMessages ? <>
                        {sendMessages.map((message)=>{
                            return <div className={'layout_flex-sb'}>
                                <div className={'layout_flex-sb-directColumn'}>
                                    <p className={'fnt_Title'}>  {message.title} </p>
                                    <p className={'fnt_subtitle'}> {message.fromUserNick} </p>
                                </div>
                                <button onClick={()=>setReadMessage(message)}> show </button>
                            </div>
                    })}
                </> : <p>no data</p>}
                </nav>
                <article className={'layout_grid postMessage'}>
                    {readMessage ? <div>
                        <p className={'fnt_tertiary'}>send:  {readMessage.sendData}</p>
                        <p className={'fnt_Title'}>title:  {readMessage.title}</p>
                        <p className={'fnt_subtitle'}>message:  {readMessage.txt} </p>
                        <div className={'layout_flex-sb'}>
                        <p className={'fnt_subtitle'}>from:  {readMessage.fromUserNick} </p>
                        <LoadImage imageName={readMessage.fromUserPhoto || 'user.png'}
                                   imagePath='images/users'
                                   photoClass="photo_xs"
                        />
                        </div>
                    </div> : <div> no message </div>}
                </article>
            </div>

        </section>
    )
}

export default Post;