import { DB, STORAGE } from './connection.js';
import { ref, uploadBytesResumable, getDownloadURL, listAll, deleteObject } from 'firebase/storage';
import {
    collection, getDocs, addDoc, deleteDoc, doc,
    onSnapshot, query, where, getDoc, updateDoc,
    arrayUnion, arrayRemove, serverTimestamp
} from 'firebase/firestore';
import { getFilesNames } from '../helpers/script.js';

const COL_REF_USERS = collection(DB, 'users');
const COL_REF_CLASSES = collection(DB, 'classes');
const COL_REF_MESSAGES = collection(DB, 'messages');

async function getUsers(q) {
    let users = [];
    try {
        let snapshot = await getDocs(q);
        await snapshot.docs.forEach((doc) => {
            users.push({ ...doc.data(), id: doc.id });
        });
    }
    catch (err) {
        console.log(err.message);
    }
    finally {
        return users;
    }
}

async function getAllData(reference) {
    let data = [];
    try {
        let snapshot = await getDocs(reference);
        await snapshot.docs.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id });
        });
    }
    catch (err) {
        console.log(err.message);
    }
    finally {
        return data;
    }
}

async function getDataByID(coll, ID) {
    let docRef = doc(DB, coll, ID);
    let response = await getDoc(docRef);
    let result = { ...response.data(), id: ID };
    return result;
}

export async function addUserClass(userId, classId) {
    try {
        let docRef = doc(DB, "users", userId);
        await updateDoc(docRef, {
            "classes": arrayUnion(classId)
        });
        return true;
    }
    catch (err) {
        console.log(err.message)
        return false;
    }

}

export async function addMessage(form) {
    let files = form.file.files.length ? [...form.file.files] : [];
    let filesNames = getFilesNames(files);

    try {
        let docRef = await addDoc(COL_REF_MESSAGES, {
            "sender": localStorage.getItem('userID'),
            "topic": form.topic.value,
            "file": arrayUnion(...filesNames),
            "description": form.description.value,
            "createdAt": serverTimestamp()
        })

        await addClassMessage(docRef.id);

        if (files.length) {
            let folderName = `${localStorage.getItem('classID')}/${docRef.id}`;
            for (let file of files) {
                await uploadFile(file, folderName, file.name);
            }
        }

        return true;
    }
    catch (err) {
        alert("An error occured. Please try again later.")
        return false;
    }
}

export async function addClassMessage(messageID) {
    try {
        let classID = localStorage.getItem('classID');
        let docRef = doc(DB, "classes", classID);
        await updateDoc(docRef, {
            "messages": arrayUnion(messageID)
        });
        return true;
    }
    catch (err) {
        console.log(err.message)
        return false;
    }
}

export async function userExists(login) {
    let q = query(COL_REF_USERS, where('login', '==', login));
    let response = await getUsers(q);
    return response;
}

export async function classExists(classID) {
    let response = await getDataByID('classes', classID);
    return response;
}

export async function userInClass(userID, classID) {
    let userData = await getDataByID('users', userID);
    return userData.classes.includes(classID);
}

export async function logIn(login, password) {
    let q = query(COL_REF_USERS, where('login', '==', login), where('password', '==', password));
    let response = await getUsers(q);
    return response;
}

export async function signUp(form) {
    let response = await userExists(form.login.value);

    if (response.length) alert("User already exists");
    else {
        addDoc(COL_REF_USERS, {
            "name": form.firstname.value,
            "surname": form.surname.value,
            "role": form.role.value,
            "login": form.login.value,
            "password": form.password.value,
            "classes": []
        }).catch(err => {
            alert("An error occured. Please try again later.");
            return true;
        })
    }
}

export async function uploadFile(file, folderName, fileName = file.name) {
    let storageRef = ref(STORAGE, `${folderName}/${fileName}`);
    await uploadBytesResumable(storageRef, file);
}

export async function getFolderRefs(folderName) {
    let storageRef = ref(STORAGE, folderName);
    let folders = [];

    try {
        let list = await listAll(storageRef);
        await list.prefixes.forEach(folderRef => folders.push(folderRef));
    }
    catch (err) {
        console.log(err.message);
    }
    finally {
        return folders;
    }
}

export async function getFiles() {
    let files = [];
    let folders = await getFolderRefs(localStorage.getItem('classID'));
    try {
        for (let folderRef of folders) {
            let list = await listAll(folderRef);
            list.items.forEach(fileRef => files.push(fileRef));
        }
    }
    catch (err) {
        console.log(err.message);
    }
    finally {
        return files;
    }
}

export async function getFileUrl(fileRef) {
    try {
        let url = await getDownloadURL(fileRef);
        return url;
    }
    catch (err) {
        return '';
    }
}

export async function createClass(form) {
    let added;
    try {
        let docRef = await addDoc(COL_REF_CLASSES, {
            "name": form.classname.value,
            "creator": localStorage.getItem('userID'),
            "messages": []
        });
        added = await addUserClass(localStorage.getItem('userID'), docRef.id);
    }
    catch (err) {
        console.log(err.message);
        alert("An error occured. Please try again later.");
    }
    finally {
        return added;
    }
}

export async function getUserClasses(userID = localStorage.getItem('userID')) {
    let userData = await getDataByID('users', userID);
    let classes = userData.classes;
    let classesData = [];
    for (let classID of classes) {
        let data = await getDataByID('classes', classID);
        classesData.push(data);
    }
    return classesData;
}

export async function getMessages(classID = localStorage.getItem('classID')) {
    let classData = await getDataByID('classes', classID);
    let messages = classData.messages;
    let messagesData = [];
    for (let messageID of messages) {
        let data = await getDataByID('messages', messageID);
        let sender = await getDataByID('users', data.sender);
        data.sender = `${sender.name} ${sender.surname}`;
        data.senderID = sender.id;
        messagesData.push(data);
    }
    return messagesData;
}

export async function getMessageFiles(messageID, classID = localStorage.getItem('classID')) {
    let folderRef = ref(STORAGE, `${classID}/${messageID}`);
    let files = [];
    try {
        let list = await listAll(folderRef);
        list.items.forEach(fileRef => files.push(fileRef));
    }
    catch (err) {
        console.log(err.message);
    }
    finally {
        return files;
    }
}

export async function deleteMessage(message, classID = localStorage.getItem('classID')) {
    try {
        const msgRef = doc(DB, "messages", message.id);
        await deleteDoc(msgRef);

        const classRef = doc(DB, "classes", classID);
        await updateDoc(classRef, {
            "messages": arrayRemove(message.id)
        });

        await deleteFiles(message, classID);

        return true;
    }
    catch (err) {
        console.log(err.message)
        alert("Error occured. Please try again later.");
    }
}

export async function deleteFiles(message, classID = localStorage.getItem('classID')) {
    try {
        let fileToDelete = ref(STORAGE, `${classID}/${message.id}/${message.file}`);
        await deleteObject(fileToDelete);
    }
    catch (err) {
        console.log(err.message) //remove
    }
}


// const FORM = document.querySelector(".add");

// FORM.addEventListener("submit", (e) => {
//     e.preventDefault();
//     addDoc(COL_REF_USERS, {
//         "login": FORM.login.value,
//         "password": FORM.password.value
//     });
//     FORM.reset();
// })


// var DATA = null;

// // queries

// const q = query(COL_REF_USERS, where('login', '==', 'Arthur__'))

// // READ



// (async () => {
//     await getAllData();
//     console.log(DATA, "es mekna");
// })()

// // Real time data get

// onSnapshot(q, (snapshot) => {
//     let users = [];
//     snapshot.docs.forEach((doc) => {
//         users.push({ ...doc.data(), id: doc.id });
//     })
//     console.log(users)
// })

// CREATE


// // DELETE

// deleteForm.addEventListener('submit', e => {
//     e.preventDefault();

//     const docRef = doc(DB, "users", /* doc id */);

//     deleteDoc(docRef);

//     deleteForm.reset();
// })


