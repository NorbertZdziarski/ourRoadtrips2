import React, {useState} from 'react';
import {useStoreState} from "easy-peasy";
import {updateData} from "./a_CRUD_service";

function Comment({comment, author, photo}) {
    const [like, setLike] = useState(comment.commLike.length);
    const loggedUser = useStoreState(state => state.loggedUser);
    console.log(comment)
    console.log(loggedUser)
    // if (comment.some((comm)=>comm.commLike == loggedUser._id)) {console.log('fdfdfd')}
    const comLike = comment.commLike;
    function addLike(){
        // ------------------------- AKTUALIZACJA LIKÓW
        // if (loggedUser) {
        //     if (!comment.commLike.includes(loggedUser._id)) {
        //         let stara_wartosc = comment.commLike
        //         let nowa_wartosc = [...comment.commLike, loggedUser._id];
        //         setLike(prevLike => prevLike + 1);
        //         const dataToSave =   { "TripComments.commLike": { $exists: true } },
        //             { $set: { "TripComments.$[element].commLike": nowa_wartosc } },
        //             {
        //                 arrayFilters: [ { "element.commLike": stara_wartosc } ],
        //                 multi: true
        //             };
        //         const target = `trip/${tripId}`
        //         await updateData(target,dataToSave);
        //     }
        // }
    }

    return (
        <button className="comment_conteiner" onClick={()=>{addLike()}}>
            <div className="comment_photo">
                photo
            </div>
            <div className="comment_cloud">
                <textarea className="comment_message" defaultValue={comment.commTxt}/>
                <p className="comment_author">{author} {like}</p>
            </div>
        </button>
    )

}

export default Comment;