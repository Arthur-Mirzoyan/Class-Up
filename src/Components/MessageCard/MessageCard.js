import { getFileType, generateDownloadLink } from '../../helpers/script';
import { getFileUrl, getMessageFiles } from '../../database/methods';

export async function getFilesBlock(message) {
    if (message.file.length) {
        let elems = [];
        let fileRefs = await getMessageFiles(message.id);

        for (let i in fileRefs) {
            let file = message.file[i];
            let fileRef = fileRefs[i];
            let elem, type, attr;

            if (getFileType(file) == 'img') { type = 'img'; attr = 'src'; }
            else if (getFileType(file) == 'vid') { type = 'iframe'; attr = 'src'; }
            else { type = 'a'; attr = 'href' }

            if (type == 'a') elem = generateDownloadLink(file);
            else {
                elem = document.createElement(type);
                elem.loading = 'lazy';
                elem.setAttribute('allowFullScreen', '');
            }

            await getFileUrl(fileRef).then(url => elem.setAttribute(attr, url));
            elems.push(elem);
        }
        return elems;
    }
    return null;
}