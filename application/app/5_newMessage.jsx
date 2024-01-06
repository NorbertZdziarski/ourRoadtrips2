import React, {useEffect, useState} from 'react';
import {fetchData, transferData, updateData} from "./a_CRUD_service";
import {useStoreState} from "easy-peasy";
import LoadImage from "./a_loadimage";
import addDataToMongo from "./a_addDataToMongo";

function NewMessage({author, trip, setAddComm}) {
    const loggedUser = useStoreState(state => state.loggedUser);
    // const loggedUser = {
    //     nick: 'Kowalski',
    //     _id: 783274832
    // };

    const [enterTitle, setEnterTitle] = useState();
    const [enterMessage, setEnterMessage] = useState();
    const [sendControl, setSendControl] = useState(false);
    const [usersList,setUsersList] = useState([]);
    const [formMessage,setFormMessage] = useState([]);
    const [selectedNick, setSelectedNick] = useState('');
    const displayStyles = useStoreState(state => state.displayStyles);

    useEffect(()=>{
        const target = `select/users/downloaduserlist`
        fetchData(target).then(downloadedData => {
            setUsersList(downloadedData)
        });
    },[])

    useEffect(()=>{
        console.log(enterMessage)
        console.log(formMessage)
        if (formMessage && formMessage.receiverId && enterMessage) setSendControl(true)
    },[enterMessage, formMessage])

    async function sendMessage() {
        let saveData = {
            receiverNick: formMessage.receiverNick,
            receiverId: formMessage.receiverId,
            receiverPhoto: formMessage.receiverPhoto,
            fromUserNick: loggedUser.nick,
            fromUserId: loggedUser._id,
            fromUserPhoto: loggedUser.userPhoto,
            type: 'none',
            title: enterTitle,
            txt: enterMessage,
            readed: false,
            sendData: new Date()
        };
        await addDataToMongo(saveData, null, 'message').then((r)=>{ console.log(r)})
    }
    function handleChange(user) {
        console.log(user)
        let saveData = {
            receiverNick: user.nick,
            receiverId: user._id,
            receiverPhoto: user.userPhoto,
        };
        setFormMessage({ ...formMessage, ...saveData });
        setSelectedNick(user.nick);
    }

    return (
        <div className={`showtrip_addComment colorstyle_reflex_${displayStyles}`}>
            <div className={`comment_conteiner`} >
                <p>receiver: </p>
                    {usersList ?
                            <select value={selectedNick} name={'receiver'} className="" onChange={(event) => handleChange(usersList.find(user => user.nick === event.target.value))}>
                                {usersList.map((user) => (
                                    <option key={user.id} value={user.nick}>
                                        {user.nick}
                                    </option>
                                ))}
                            </select>
                            : <></>}

                <div className={`addComment_cloud colorStyle_commentCloud_${displayStyles}`}>
                    <p>title: </p>
                    <textarea maxlength="20" className="title" Value={enterTitle} onChange={(e)=>{setEnterTitle(e.target.value)}}/>
                    <p>message: </p>
                    <textarea maxlength="200" className="message" Value={enterMessage} onChange={(e)=>{setEnterMessage(e.target.value)}}/>
                    {/*<p className="comment_author"> {author.nick}</p>*/}
                </div>
            </div>
            <button disabled={!sendControl} onClick={()=>{sendMessage()}}>send</button>
            <button >cancel</button>
        </div>

    )

}

export default NewMessage;