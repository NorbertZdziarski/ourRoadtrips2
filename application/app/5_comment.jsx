import React, {useState} from 'react';
import {useStoreState} from "easy-peasy";
import {updateData} from "./a_CRUD_service";
import LoadImage from "./a_loadimage";

function Comment({comment, author, photo, tripId}) {
    const [like, setLike] = useState(comment.commLike.length);
    const loggedUser = useStoreState(state => state.loggedUser);

    // if (comment.some((comm)=>comm.commLike == loggedUser._id)) {console.log('fdfdfd')}
    // const comLike = comment.commLike;
    async function addLike(){
        if (loggedUser) {
            if (!comment.commLike.includes(loggedUser._id)) {
                let nowa_wartosc = [...comment.commLike, loggedUser._id];
                setLike(prevLike => prevLike + 1);
                const target = `trip/${tripId}/commlike/${comment.id}`;
                await updateData(target,nowa_wartosc);
            }
        }
    }


    return (
        <button className="comment_conteiner" onClick={()=>{addLike()}}>

            <LoadImage imageName={'user.png'}
                       imagePath='images/users'
                       imageWidth='100%'
                       photoClass="comment_photo"
            />

            <div className="comment_cloud">
                {/*<textarea className="comment_message" defaultValue={comment.commTxt}/>*/}
                <p className="comment_message" >{comment.commTxt}</p>
                <p className="comment_author">{author} {like}</p>
            </div>
        </button>
    )

}

export default Comment;