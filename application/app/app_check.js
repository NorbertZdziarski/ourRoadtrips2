import {fetchData} from "./a_CRUD_service";

export const checkIfItExists = async (value) => {
    console.log('-------- check If It Exists --------')
    let r = await fetchData('user/allNicks');
    console.log('get data: ' + r)

    console.log('JSON data: ' + JSON.stringify(r))
    console.log('-------- jeden rekord --------')
    // console.log(JSON.stringify(r[1]))

    const result = r.some(obj => obj.nick === value)
    console.log("wynik poszukiwań: " + value + " --> " + result)
    return result;
}
