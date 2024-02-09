import React, {useState} from 'react';
import {updateData} from "./a_CRUD_service";
import {useStoreState} from "easy-peasy";
import LoadImage from "./a_loadimage";

function AddComment({author, trip, setAddComm}) {
    const loggedUser = useStoreState(state => state.loggedUser);

    const [enterComment, setEnterComment] = useState();
    const displayStyles = useStoreState(state => state.displayStyles);

    async function sendComm() {
        if (loggedUser) {
                // console.log(trip.tripComments)
               const dataToSave = {
                    id: trip.tripComments.length,
                    commTxt:enterComment,
                    commUser:loggedUser.nick,
                    commUserId:loggedUser._id,
                    commDate:new Date(),
                    commLike:[]
                }
                let newData = [...trip.tripComments, dataToSave];

                const target = `trip/comment/${trip._id}`;
                await updateData(target, newData).then((r)=>{console.log('r: ' + r)});
        }

        setEnterComment('');

        setAddComm(false);

    }

    return (
        <div className={`showtrip_addComment fnt_Title colorstyle_reflex_${displayStyles}`}>
            <div className={`comment_conteiner`} >
                <div className={`comment_photo_container`}>
                    <LoadImage imageName={loggedUser.userPhoto || 'user.png'}
                               imagePath='images/users'
                               photoClass={`comment_photo colorStyle_comment_${displayStyles}`}
                    />
                </div>

                <div className={`addComment_cloud colorStyle_commentCloud_${displayStyles}`}>
                    <textarea className="comment_message" Value={enterComment} onChange={(e)=>{setEnterComment(e.target.value)}}/>

                    <p className="comment_author"> {author.nick}</p>
                </div>
            </div>
            <button onClick={()=>{sendComm()}}>send</button>
            <button >cancel</button>
        </div>

    )

}

export default AddComment;