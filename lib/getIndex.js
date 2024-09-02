import { accountList } from "../data/accountData.js";


export function getIndex(name, surname) {
    let index = accountList.findIndex(acc => acc.name.toLowerCase() === name && acc.surname.toLowerCase() === surname);
    return index;
}