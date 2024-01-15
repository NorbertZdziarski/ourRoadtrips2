import React, {useEffect, useState} from 'react';
import {fetchData, transferData, updateData} from "./a_CRUD_service";
import {useStoreActions, useStoreState} from "easy-peasy";
import LoadImage from "./a_loadimage";
import addDataToMongo from "./a_addDataToMongo";
import {useNavigate} from "react-router-dom";

function NewMessage({setWhichScreen, setSendMessages, sendMessages, replyMessage, sendMessReciver}) {
    // console.log('sendMessages: ' + sendMessReciver)
    // console.log('JSON sendMessages: ' + JSON.stringify(sendMessReciver));

    const loggedUser = useStoreState(state => state.loggedUser);
    // const loggedUser = {
    //     nick: 'Kowalski',
    //     _id: 783274832
    // };
    const setShowLoading = useStoreActions(actions => actions.setShowLoading);
    const [enterTitle, setEnterTitle] = useState();
    const [enterMessage, setEnterMessage] = useState(replyMessage || '');
    const [sendControl, setSendControl] = useState(false);
    const [usersList,setUsersList] = useState([]);
    const [formMessage,setFormMessage] = useState([]);
    const [selectedNick, setSelectedNick] = useState('');
    const displayStyles = useStoreState(state => state.displayStyles);
    const navigate = useNavigate();



    useEffect(()=>{
        setShowLoading([true,0]);
        // setEnterMessage()
        if (sendMessReciver) {
            let saveData = {
                receiverNick: sendMessReciver.nick,
                receiverId: sendMessReciver._id,
                receiverPhoto: sendMessReciver.userPhoto,
            };
            setFormMessage({ ...formMessage, ...saveData });
        }
        const target = `select/users/downloaduserlist`
        fetchData(target).then(downloadedData => {
            setUsersList(downloadedData)
        });
        setShowLoading([false,0]);

    },[])

    useEffect(()=>{
        if (formMessage && formMessage.receiverId && enterMessage) setSendControl(true)
    },[enterMessage, formMessage])

    async function sendMessage() {
        // console.log(' --- > ')
        setShowLoading([true,0]);
        let saveData = {
            receiverNick: formMessage.receiverNick,
            receiverId: formMessage.receiverId,
            receiverPhoto: formMessage.receiverPhoto,
            fromUserNick: loggedUser.nick,
            fromUserId: loggedUser._id,
            fromUserPhoto: loggedUser.userPhoto,
            type: 'private',
            title: enterTitle,
            txt: enterMessage,
            readed: false,
            sendData: new Date()
        };

        await addDataToMongo(saveData, null, 'message').then((r)=>{ console.log(r)})

            let askFormSend = {fromUserId: loggedUser._id};
            let responseSend = await transferData(`message/find`, askFormSend);
            let dataSend = responseSend.id;
            setSendMessages(dataSend)

        setWhichScreen('sended')
    }
    function handleChange(user) {
        // console.log(user)
        let saveData = {
            receiverNick: user.nick,
            receiverId: user._id,
            receiverPhoto: user.userPhoto,
        };
        setFormMessage({ ...formMessage, ...saveData });
        setSelectedNick(user.nick);
    }
    // colorstyle_reflex_${displayStyles}
    return (
        <div className={`fnt_subtitle newMessage colorStyle_commentCloud_${displayStyles} divHeightTemp newMessageCont`}>
            <div className={` layout_flex-sb-directColumn divWidthTemp divHeightTemp`} >
                <p>receiver: </p>
                {sendMessReciver ? <>
                    <p>reply to: {sendMessReciver.nick}</p>
                </> : <>
                    {usersList ?
                            <select value={selectedNick ? selectedNick : ' no data '} name={selectedNick} className="" onChange={(event) => handleChange(usersList.find(user => user.nick === event.target.value))}>
                                <option value="" disabled={selectedNick !== ''}>choose who you are sending to</option>
                                {usersList.map((user) => (
                                    <option key={user.id} value={user.nick}>
                                        {user.nick}
                                    </option>
                                ))}
                            </select>
                            : <></>}
                </>}
                <div className={`addComment_cloud divHeightTemp `}>
                    <p>title: </p>
                    <input maxlength="20" className="title" value={enterTitle} onChange={(e)=>{setEnterTitle(e.target.value)}}/>
                    <p>message: </p>
                    <textarea maxlength="1000" className="message" value={enterMessage} onChange={(e)=>{setEnterMessage(e.target.value)}}/>
                    {/*<p className="comment_author"> {author.nick}</p>*/}
                    <div className={'layout_flex-sc divWidthTemp'}>
                        <button disabled={!sendControl} onClick={()=>{sendMessage()}}>send</button>
                        <button >cancel</button>
                    </div>
                </div>
            </div>
        </div>

    )
    // colorStyle_commentCloud_${displayStyles}
}

export default NewMessage;