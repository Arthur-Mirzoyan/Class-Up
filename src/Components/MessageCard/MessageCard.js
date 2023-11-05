import { getFileType, generateFileBox } from '../../helpers/script';
import { getFileUrl, getMessageFiles } from '../../database/methods';

export async function getFilesBlock(message) {
    if (message.file.length) {
        let elems = [];
        let fileRefs = await getMessageFiles(message.id);

        for (let i in fileRefs) {
            let fileRef = fileRefs[i];
            let path = fileRef._location.path_;
            let file = path.substring(path.lastIndexOf("/") + 1);
            let fileType = getFileType(file);
            let elem;

            if (fileType != 'image' && fileType != 'video') {
                let url = await getFileUrl(fileRef);
                elem = await generateFileBox(file, fileType, url);
            }
            else {
                let type = fileType == 'image' ? 'img' : 'iframe';
                elem = document.createElement(type);
                elem.loading = 'lazy';
                elem.setAttribute('allowFullScreen', '');
                await getFileUrl(fileRef).then(url => elem.setAttribute('src', url));
            }
            elems.push(elem);
        }
        return elems;
    }
    return null;
}