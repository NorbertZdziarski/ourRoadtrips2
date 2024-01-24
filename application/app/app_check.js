import {fetchData} from "./a_CRUD_service";

export const checkIfItExists = async (collectionName, value) => {
    let result;
    // console.log('-------- check If It Exists --------')
    // console.log(`-------- data to check: ${value} `)
    // console.log(`-------- collection: ${collectionName} `)
    const target = `/all/${collectionName}`
    // console.log(`-------- target: ${target} `)
    let r = await fetchData(target);

    // console.log(JSON.stringify(r[1]))
    if (collectionName === 'groups') {
        result = r.some(obj => obj.name === value)
    } else if (collectionName === 'users') {
        result = r.some(obj => obj.nick === value)
    }


    // console.log("wynik poszukiwań: " + value + " --> " + result)
    return result;
}
