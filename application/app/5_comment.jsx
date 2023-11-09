import React, {useEffect, useState} from 'react';
import {useStoreState} from "easy-peasy";
import {updateData} from "./a_CRUD_service";
import LoadImage from "./a_loadimage";


function Comment({comment, author, photo, tripId}) {
    const [like, setLike] = useState(comment.commLike.length);
    const [voteState,setVoteState] = useState('notLoggedIn');
    const loggedUser = useStoreState(state => state.loggedUser);


    useEffect(()=>{
        if (loggedUser) {
            if (!comment.commLike.includes(loggedUser._id)) {
                setVoteState('loggedDidNotVote') }
            else {setVoteState('loggedInVoted')}

        }
    },[like])

    async function addLike() {
        if (loggedUser) {
            if (!comment.commLike.includes(loggedUser._id)) {
                let nowa_wartosc = [...comment.commLike, loggedUser._id];
                setLike(prevLike => prevLike + 1);
                setVoteState('loggedInVoted'); // Aktualizacja stanu voteState
                const target = `trip/${tripId}/commlike/${comment.id}`;

                console.log('nowa wartosc' + nowa_wartosc);
                console.log('target' + target);
                comment.commLike.push(loggedUser._id);

                await updateData(target, nowa_wartosc);

            }
        }
    }



    // async function addLike() {
    //     if (loggedUser) {
    //         if (!comment.commLike.includes(loggedUser._id)) {
    //             let nowa_wartosc = [...comment.commLike, loggedUser._id];
    //             setLike(prevLike => prevLike + 1);
    //             const target = `trip/${tripId}/commlike/${comment.id}`;
    //             console.log('nowa wartosc' + nowa_wartosc);
    //             console.log('target' + target);
    //             await updateData(target, nowa_wartosc);
    //         }
    //     }
    // }
    console.log(voteState + ' | ' + comment.id);
    return (
        <button className="comment_conteiner" onClick={()=>{addLike()}}>

            <LoadImage imageName={photo || 'user.png'}
                       imagePath='images/users'
                       photoClass={"comment_photo" }
            />

            <div className="comment_cloud">
                <div className={`comment_like ${voteState}`}>{like}</div>
                {/*<textarea className="comment_message" defaultValue={comment.commTxt}/>*/}
                <p className="comment_message" >{comment.commTxt}</p>
                <p className="comment_author">{author}</p>

            </div>
        </button>
    )

}

export default Comment;