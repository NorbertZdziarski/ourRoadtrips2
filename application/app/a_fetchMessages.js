import {transferData} from "./a_CRUD_service";
export async function fetchMessages(loggedUser, setIncommingMessages, setSendMessages) {

    let askFormInc = {receiverId: loggedUser._id};
    let responseInc = await transferData(`message/find`, askFormInc);
    let data = responseInc.id.reverse();
    setIncommingMessages(data)
    let askFormSend = {fromUserId: loggedUser._id};
    let responseSend = await transferData(`message/find`, askFormSend);
    let dataSend = responseSend.id.reverse();
    let tempArr = [];
    dataSend.forEach((inmess)=>{
        // if (inmess.readed === false) {
        if (inmess.type !== 'official') {
            tempArr.push(inmess)
            // }
        }
    })
    setSendMessages(tempArr)
}