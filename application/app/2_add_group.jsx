import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useStoreActions, useStoreState} from "easy-peasy";
import addMultiFiles from "./a_addMultiFiles";
import addDataToMongo from "./a_addDataToMongo";
import {getInitialFormData} from "./getInitialFormData";
import PrintForm from "./3_printForm";
import {fetchData, updateData} from "./a_CRUD_service";
import AddTripPageMap from "./3_addTripPageMap";

function AddGroup() {
    const navigate = useNavigate();
    const loggedUser = useStoreState(state => state.loggedUser);
    const [pageInputTrip, setPageInputTrip] = useState(1)
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({});
    const type = 'group';
    const dataId = useStoreState(state => state.dataId);
    const setPage = useStoreActions(actions => actions.setPage);
    const page = useStoreState(state => state.page);
    const setShowLoading = useStoreActions(actions => actions.setShowLoading);
    const [okPrint, setOkPrint] = useState(false);
    const keysToCopy = [['owner', 'name', 'description', 'type', 'public' ],['photo'],['design'],['invitedUsers'],[ 'saveDate','ownerId', 'comments', 'users', 'trips','cars']];
    const [formDataPage1, setFormDataPage1] = useState({});
    const [formDataPage2, setFormDataPage2] = useState({});
    const [formDataPage3, setFormDataPage3] = useState({});
    const [formDataPage4, setFormDataPage4] = useState({});
    const [styleButt1, setStyleButt1] = useState('current');
    const [styleButt2, setStyleButt2] = useState('above');
    const [styleButt3, setStyleButt3] = useState('above');
    const [styleButt4, setStyleButt4] = useState('above');
    const [formDataPageOther, setFormDataPageOther] = useState({});

    useEffect(() => {
        setShowLoading([true,0]);
        const fetchData = async () => {
            const data = await getInitialFormData(type, loggedUser, dataId);
            setFormData(data);

            const objectToSave5 = keysToCopy[4].reduce((result, key) => {
                if (key in data) {
                    result[key] = data[key];
                }
                return result;
            }, {});
            setFormDataPageOther(objectToSave5);

            const objectToSave1 = keysToCopy[0].reduce((result, key) => {
                if (key in data) {
                    result[key] = data[key];
                }
                return result;
            }, {});
            setFormDataPage1(objectToSave1);

            const objectToSave2 = keysToCopy[1].reduce((result, key) => {
                    if (key in data) {
                    result[key] = data[key];
                }
                return result;
            }, {});
            setFormDataPage2(objectToSave2);

            const objectToSave3 = keysToCopy[2].reduce((result, key) => {
                    if (key in data) {
                    result[key] = data[key];
                }
                return result;
            }, {});
            setFormDataPage3(objectToSave3);

            const objectToSave4 = keysToCopy[3].reduce((result, key) => {
                if (key in data) {
                    result[key] = data[key];
                }
                return result;
            }, {});
            setFormDataPage4(objectToSave4);


        };

        fetchData().then(setOkPrint(true));
        setShowLoading([false,0]);
        setPageInputTrip(1);
    }, []);

    useEffect(()=>{
        if (page === "mainpage") {
            navigate('/');
        }
        if (page === "userprofile") {
            navigate('/userprofile');
        }
    },[page])

    const handleSubmit = async () => {

        // e.preventDefault();
        setShowLoading([true,0]);
        let formDataToSave = { ...formData, ...formDataPage1, ...formDataPage2, ...formDataPage3 , ...formDataPage4 , ...formDataPageOther }
        let idNewGroup;
        if (file) {
            console.log(file)
            if (!dataId) {
                await addDataToMongo(formDataToSave, null, type).then((res) => {
                    idNewGroup = res.id;
                    console.log('> RES > ' + res)
                    addMultiFiles(file, res.id, type, formDataToSave, loggedUser._id).then((responseData) => {
                        console.log(responseData)
                        updateData(`${type}/${res.id}`, responseData);
                        // addDataToMongo(responseData).then((r)=>{ console.log(r)})
                    })
                });
            }
        } else {
            await addDataToMongo(formDataToSave, dataId, type).then((r)=>{
                idNewGroup = r.id;
            })
        }
        console.log('formDataToSave ' + JSON.stringify(formDataToSave))
        let usersList = formDataToSave.invitedUsers;
        console.log('usersList ' + JSON.stringify(usersList))
        let count;
        usersList.map((userIp)=>{
            let clickLink = `href="https://ourroadtrips.pl/showgroup/${idNewGroup}`
            // target="_blank"
            count ++;
            let saveData = {
                receiverNick: null,
                receiverId: userIp,
                receiverPhoto: null,
                fromUserNick: loggedUser.nick,
                fromUserId: loggedUser._id,
                fromUserPhoto: loggedUser.userPhoto,
                idGroup: idNewGroup,
                type: 'official',
                title: 'invitation to the group!',
                txt: `Hi! <br> I want to invite you to the group <b> ${formDataToSave.name} ! </b> <br> <hr> <br> This is a group of cool people. We are best described as: ${formDataToSave.type} <br> Please visit our funpage!  :-) <br> If you want to join us, click below :-) <br> go ahead! we are waiting for you!   `,
                readed: false,
                sendData: new Date()
            };
            addDataToMongo(saveData, null, 'message').then((r)=>{ console.log('ok '+ r)}).catch((err)=>{ console.log('err '+ err)})
        })
        console.log('wysłano: ' + count)

        // setShowLoading([false,0]);
        setPage("userprofile");

        // setYesOrNot(prevState => {
        //     let newArray = [...prevState.yesOrNot];
        //     newArray[2] = false;
        //     return {array: newArray};
        // });
        setShowLoading([false,0]);

    };

    useEffect(() => {
        if (pageInputTrip === 666) handleSubmit();

        if (pageInputTrip === 1) {setStyleButt1('current'); setStyleButt2('above') }
        if (pageInputTrip === 2) {setStyleButt1('below'); setStyleButt2('current'); setStyleButt3('above') }
        if (pageInputTrip === 3) {setStyleButt2('below'); setStyleButt3('current'); setStyleButt4('above') }
        if (pageInputTrip === 4) {setStyleButt3('below'); setStyleButt4('current');  }

    }, [pageInputTrip]);

    const changePageFn = async (dir) => {
        if (pageInputTrip === 1) {
            const objectToSave = keysToCopy[0].reduce((result, key) => {
                    if (key in formData) {
                        result[key] = formData[key];
                    }
                    return result;
                }, {});
                    setFormData(objectToSave);
        }
        if (dir === 'next') {
            setPageInputTrip(pageInputTrip + 1)
        } else {
            setPageInputTrip(pageInputTrip - 1)
        }

    }
    let formArr = Object.keys(formData);
    let formArr1 = Object.keys(formDataPage1);
    let formArr2 = Object.keys(formDataPage2);
    let formArr3 = Object.keys(formDataPage3);
    let formArr4 = Object.keys(formDataPage4);
    return (<>
        <section className={`addTrip`}>
            {okPrint ? <>
                <div>
                    {(pageInputTrip === 1 || pageInputTrip === 2 || pageInputTrip === 4) &&
                        <div id={'addGroupPage1'}>
                            <h4>add your new group!</h4>
                            <h3>give us some informations:</h3>
                            <form>
                                {okPrint ?
                                    <PrintForm
                                        form={pageInputTrip === 1 ? formArr1 : pageInputTrip === 2 ? formArr2 :pageInputTrip === 3 ? formArr3 :  formArr4}
                                        formData={pageInputTrip === 1 ? formDataPage1 : pageInputTrip === 2 ? formDataPage2 : pageInputTrip === 3 ? formDataPage3 : formDataPage4}
                                        setFormData={pageInputTrip === 1 ? setFormDataPage1 : pageInputTrip === 2 ? setFormDataPage2 : pageInputTrip === 3 ? setFormDataPage3 :  setFormDataPage4}
                                        setFile={setFile}
                                        type='group'
                                    /> : <>wait....</> }
                            </form>
                            <div className={`addTrip_inputBox2`}>
                                {(pageInputTrip > 1) ? <button  onClick={()=> changePageFn('back') }>back</button> : <></>}
                                {(dataId || pageInputTrip >= 4) ? <button  onClick={()=> setPageInputTrip(666)}>save</button> : <></>}
                                {(pageInputTrip < 4) ? <button  onClick={()=> changePageFn('next')}>next</button> : <></>}
                            </div>
                        </div>
                    }
                    {/*{pageInputTrip === 3 && <AddTripPageMap setPageInputTrip={setPageInputTrip} pageInputTrip={pageInputTrip} formData={formDataPage3} setFormData={setFormDataPage3} country={formDataPage1.tripCountry}/> }*/}
                </div>

                <div className={`addTrip_inputBox`}>
                    <button className={styleButt1} onClick={()=> setPageInputTrip(1)}>1</button>
                    <button className={styleButt2} onClick={()=> setPageInputTrip(2)}>2</button>
                    <button className={styleButt3} onClick={()=> setPageInputTrip(3)}>3</button>
                    <button className={styleButt4} onClick={()=> setPageInputTrip(4)}>4</button>
                </div>
            </> : <>...loading...</>}
        </section>

    </>)
}

export default AddGroup;