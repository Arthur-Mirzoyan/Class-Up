export function getFileType(fileName) {
    const imageExtensions = /\.(jpg|jpeg|png|gif|bmp|webp)$/i;
    const videoExtensions = /\.(mp4|webm|ogv|avi|mov|mkv|flv)$/i;

    if (imageExtensions.test(fileName)) return "img";
    else if (videoExtensions.test(fileName)) return "vid";
    return "other";
}

export function generateDownloadLink(fileName) {
    let a = document.createElement('a');
    a.className = "download-link";
    a.setAttribute('download', '');
    a.innerText = fileName;
    return a;
}

export function getObjNames(arrOfObjs, isUser = false) {
    let result = [];
    for (let obj of arrOfObjs) result.push(isUser ? `${obj?.name} ${obj?.surname}` : obj?.name);
    return result;
}



// export function generateMessageCard(message, file = null) {
//     let card = document.createElement('div');
//     let section1 = document.createElement('section');
//     let topic = document.createElement('h1');
//     let description = document.createElement('p');
//     let sender = document.createElement('p');
//     let section2 = document.createElement('section');

//     card.className = 'card';
//     section1.className = 'section1';
//     topic.className = 'topic';
//     description.className = 'description';
//     sender.className = 'sender';
//     section2.className = 'section2';

//     topic.innerText = message.topic;
//     description.innerText = message.description;
//     sender.innerText = 'By ' + message.sender;

//     let elem, type, attr;

//     if (file) {
//         let idx = file._location.path_?.lastIndexOf("/");
//         let fileName = file._location.path_.substring(idx + 1);
//         if (getFileType(fileName) == 'img') { type = 'img'; attr = 'src'; }
//         else if (getFileType(fileName) == 'vid') { type = 'iframe'; attr = 'src'; }
//         else { type = 'a'; attr = 'href' }

//         if (type == 'a') elem = generateDownloadLink(fileName);
//         else {
//             elem = document.createElement(type);
//             elem.loading = 'lazy';
//             elem.setAttribute('allowFullScreen', '');
//         }
//         getFileUrl(file).then(url => elem.setAttribute(attr, url));
//         section2.append(elem);
//     }

//     if (message.senderID === localStorage.getItem('userID')) {
//         let dots = document.createElement('button');
//         dots.innerText = '=';
//         dots.className = 'dots';
//         section1.appendChild(dots);
//     }

//     section1.append(topic, sender, description)
//     card.append(section1, section2);

//     return card;
// }