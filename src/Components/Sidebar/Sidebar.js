// const LOADING_BOX = document.querySelector('#loading-box');
// const ADD_CLASS_DIALOG = document.getElementById('add-class-dialog');
// const ADD_CLASS_FORM = document.getElementById('add-class-form');
// const ADD_BTN = document.getElementById('add-btn');
// const PAGE = document.querySelector('.page');
// const CREATE_BTN = document.getElementById('create-btn');
// const JOIN_BTN = document.getElementById('join-btn');

// var mode = 'create';

// ADD_BTN.addEventListener('click', () => {
//     ADD_CLASS_DIALOG.showModal();
// });

// ADD_CLASS_FORM.addEventListener('submit', e => {
//     e.preventDefault();
//     (async () => {
//         if (mode == 'create') {
//             let added = await createClass(ADD_CLASS_FORM);
//             if (added) location.reload();
//         }
//         else {
//             let userID = localStorage.getItem('userID');
//             let classID = ADD_CLASS_FORM.classname.value;
//             let response = await classExists(classID);

//             if (Object.keys(response).length > 1) {
//                 let isAvailable = await userInClass(userID, classID);
//                 if (isAvailable) alert("You are already in that class.");
//                 else {
//                     await addUserClass(userID, classID);
//                     location.reload();
//                 }
//             }
//             else alert("Class ID is incorrect.");
//         }
//     })();
// })

// CREATE_BTN.addEventListener('click', () => {
//     CREATE_BTN.classList.add('active');
//     JOIN_BTN.classList.remove('active');
//     mode = 'create';

//     ADD_CLASS_FORM.classname.placeholder = 'Class name';
//     ADD_CLASS_FORM.actionBtn.innerText = 'Create';
// })

// JOIN_BTN.addEventListener('click', () => {
//     JOIN_BTN.classList.add('active');
//     CREATE_BTN.classList.remove('active');
//     mode = 'join';

//     ADD_CLASS_FORM.classname.placeholder = 'Class ID';
//     ADD_CLASS_FORM.actionBtn.innerText = 'Join';
// })

// window.addEventListener('load', displayClasses)