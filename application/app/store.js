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
    reload: 0,
    setReload:  action((state, payload) => { state.reload = (payload); }),
})

export default store;