import {createStore, action} from "easy-peasy";
// import {useState} from "react";

const store = createStore({
    // page: "map",
    page: "mainPage",
    setPage:  action((state, payload) => { state.page = (payload); }),
    dataSortOn: false,
    setDataSortOn:  action((state, payload) => { state.dataSortOn = (payload); }),
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
    tripSort: "new first",
    setTripSort:  action((state, payload) => { state.tripSort = (payload); }),
    temporaryPass1: "",
    setTemporaryPass1:  action((state, payload) => { state.temporaryPass1 = (payload); }),
    temporaryPass2: "new first",
    setTemporaryPass2:  action((state, payload) => { state.temporaryPass2 = (payload); }),
    rules: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tellus nulla, ornare vitae tellus vel, interdum interdum nunc. Aenean vitae vehicula leo, vitae convallis eros. Vestibulum ac lectus eu tellus consectetur dapibus. In eros enim, luctus sit amet gravida vitae, semper eget risus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam vitae vulputate ante. Morbi sit amet risus ligula. Ut diam est, efficitur sed justo at, finibus dapibus est. Integer ac sodales ipsum. Nam non quam elit. Mauris tellus lacus, auctor sit amet est et, sagittis faucibus ex. Suspendisse potenti. Phasellus vestibulum, mi a placerat fringilla, dui urna vestibulum nisl, id egestas ipsum felis id lectus. Donec a nisi vel leo cursus ornare.\n" +
        "\n" +
        "Donec efficitur ante quis fermentum dignissim. Mauris eu nisi elit. Cras blandit placerat nibh, non vulputate quam pulvinar ornare. Nulla eu euismod nunc. Cras pulvinar euismod vulputate. Integer vestibulum malesuada purus, dapibus interdum diam molestie at. Donec et volutpat erat. In bibendum porttitor leo at gravida. Donec tempor, magna et aliquet vestibulum, lacus sem malesuada leo, quis vulputate tellus quam nec elit.\n" +
        "\n" +
        "In id nunc sapien. Morbi faucibus scelerisque ex ut consectetur. Pellentesque fermentum ipsum non congue tempor. Curabitur ornare dui orci, ut euismod est pulvinar ac. Duis lacinia id justo et facilisis. Etiam vitae vehicula diam. Maecenas nec orci et tellus dignissim placerat nec vitae erat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus convallis mi ut sem faucibus accumsan. Suspendisse potenti. Sed quis ligula ultricies ex porta sollicitudin vitae ut leo. Donec aliquam elit lorem, ut congue lectus euismod ac. Proin varius est diam, in suscipit nisl aliquam vitae. Maecenas diam libero, vehicula vitae venenatis sit amet, commodo et erat.\n" +
        "\n" +
        "Phasellus volutpat viverra dictum. Nunc porta convallis felis, et imperdiet odio maximus consectetur. Phasellus efficitur, lacus ac placerat molestie, sem massa bibendum orci, id maximus eros sem non magna. Curabitur pulvinar elementum lectus at aliquet. Vestibulum vulputate molestie nisl, eu porta mauris fringilla at. Ut condimentum pharetra condimentum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed mattis egestas consequat. Ut ut dignissim ante, a tempus augue. Donec tincidunt posuere orci. Vivamus euismod sapien in lectus ultrices, eget varius nisi ultrices. Vestibulum eget felis non neque venenatis cursus.\n" +
        "\n" +
        "Vestibulum elementum, tellus lacinia varius vehicula, nunc justo ullamcorper elit, nec eleifend urna nisl nec urna. Aliquam volutpat nunc ex, eu facilisis quam condimentum in. Proin pellentesque feugiat sapien a pretium. Suspendisse a neque gravida, convallis sapien ac, tincidunt est. Maecenas tempus, odio id placerat feugiat, dui mi tempus justo, in convallis mauris ex ac ipsum. Ut facilisis maximus quam luctus ullamcorper. Suspendisse placerat vehicula accumsan.",
})

export default store;