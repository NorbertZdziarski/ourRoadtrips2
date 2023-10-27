import {createStore, action} from "easy-peasy";

const store = createStore({
    page: "mainPage",
    setPage:  action((state, payload) => { state.page = (payload); }),
    tripId: "",
    setTripId:  action((state, payload) => { state.tripId = (payload); }),
    dataId: "",
    setDataId:  action((state, payload) => { state.dataId = (payload); }),
    loggedUser: "",
    setLoggedUser:  action((state, payload) => { state.loggedUser = (payload); }),
    yesOrNot: [false,0],
    setYesOrNot:  action((state, payload) => { state.yesOrNot = (payload); }),
    toDelete: ['',''],
    setToDelete:  action((state, payload) => { state.toDelete = (payload); }),
    dataFilter: [false,'all','all','all'],
    setDataFilter:  action((state, payload) => { state.dataFilter = (payload); }),
    chosen: "",
    setChosen:  action((state, payload) => { state.chosen = (payload); }),
})

export default store;