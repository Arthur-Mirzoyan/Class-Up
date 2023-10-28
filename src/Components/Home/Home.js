import { addUserClass, classExists, createClass, getMessages, getUserClasses, userInClass } from "../../database/methods";

export async function moveToClass(classID) {
    try {
        localStorage.setItem('classID', classID);
        return await getMessages();
    }
    catch(err) {
        return [];
    }
}