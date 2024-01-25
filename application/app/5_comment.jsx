import React, {useEffect, useState} from 'react';
import {useStoreState} from "easy-peasy";
import {fetchData, updateData} from "./a_CRUD_service";
import LoadImage from "./a_loadimage";
import Anim_loading from "./anim_loading";



function Comment({comment, author, userId, tripId}) {
    const [like, setLike] = useState(comment.commLike.length);
    const [voteState,setVoteState] = useState('notLoggedIn');
    const loggedUser = useStoreState(state => state.loggedUser);
    const [photo, setPhoto] = useState(null);
    const [photoPath, setPhotoPath] = useState('images/users')
    const displayStyles = useStoreState(state => state.displayStyles);

    useEffect(() => {
        const fetchPhoto = async () => {
            const data = await fetchData(`one/user/${userId}`);
            if (data && data.userPhoto) {
                setPhoto(data.userPhoto);
                if (data.userPhoto.slice(0,3) === 'http') {
                    setPhotoPath('')
                } else {
                    setPhotoPath('images/users')
                }
            }
        };
        fetchPhoto();
    }, []);

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
                let nowa_wartosc = [];

                if (Object.keys(comment.commLike).length > 0) {

                    nowa_wartosc = Object.values(comment.commLike);
                    nowa_wartosc.push(loggedUser._id);
                } else {
                    nowa_wartosc.push(loggedUser._id);
                }

                setLike(prevLike => prevLike + 1);
                setVoteState('loggedInVoted');
                const target = `trip/${tripId}/commlike/${comment.id}`;
                comment.commLike.push(loggedUser._id);

                await updateData(target, nowa_wartosc).then((r)=>{'response ' + r});
            }
        }
    }
    return (
        <button className={`comment_conteiner colorStyle_comment_${displayStyles}`} onClick={()=>{addLike()}}>
            <div className="comment_photo_container">
                {photo && photoPath ?    <LoadImage imageName={photo || 'user.png'}
                                                    imagePath={photoPath}
                                                    photoClass={"comment_photo" }
                /> : <p>no photo</p> }
            </div>
            <div className={`comment_cloud colorStyle_commentCloud_${displayStyles}`}>
                <div className={`comment_like ${voteState}_${displayStyles}`}>{like}</div>
                {/*<textarea className="comment_message" defaultValue={comment.commTxt}/>*/}
                <p className="comment_message" >{comment.commTxt}</p>
                <p className={`comment_author colorStyle_commentAuthor_${displayStyles}`}>{author}</p>
            </div>
        </button>
    )
}

export default Comment;