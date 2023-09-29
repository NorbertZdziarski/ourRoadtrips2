import {createStore, action} from "easy-peasy";

const store = createStore({
    page: "",
    setPage:  action((state, payload) => { state.page = (payload); }),

})

export default store;