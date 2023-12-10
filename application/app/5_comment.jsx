import React, {useEffect, useState} from 'react';
import {useStoreState} from "easy-peasy";
import {fetchData, updateData} from "./a_CRUD_service";
import LoadImage from "./a_loadimage";



function Comment({comment, author, userId, tripId}) {
    const [like, setLike] = useState(comment.commLike.length);
    const [voteState,setVoteState] = useState('notLoggedIn');
    const loggedUser = useStoreState(state => state.loggedUser);
    const [photo, setPhoto] = useState(null);
    const [photoPath, setPhotoPath] = useState('images/users')
    const displayStyles = useStoreState(state => state.displayStyles);

    useEffect(() => {
        const fetchPhoto = async () => {
            console.log(userId)
            const data = await fetchData(`one/user/${userId}`);
            console.log('---comment pobieranie data')
            console.log(data)
            console.log(data[0].userPhoto)
            setPhoto(data[0].userPhoto);
            if (data[0].userPhoto.slice(0,3) === 'http') {setPhotoPath('')} else {setPhotoPath('images/users')}

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

    return (
        <button className={`comment_conteiner colorStyle_comment_${displayStyles}`} onClick={()=>{addLike()}}>
            <div className="comment_photo_container">
                <LoadImage imageName={photo || 'user.png'}
                           imagePath={photoPath}
                           photoClass={"comment_photo" }
                />
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