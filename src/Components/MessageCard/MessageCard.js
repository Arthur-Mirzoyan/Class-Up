import { getFileType, getFileIcon } from '../../helpers/script';
import { getFileUrl, getMessageFiles } from '../../database/methods';

export async function getFiles(message) {
    if (message.file.length) {
        let files = {
            images: [],
            videos: [],
            documents: []
        };
        let fileRefs = await getMessageFiles(message.id);

        for (let i in fileRefs) {
            let fileRef = fileRefs[i];
            let path = fileRef._location.path_;

            let fileName = path.substring(path.lastIndexOf("/") + 1);
            let fileType = getFileType(fileName);
            let fileIcon = getFileIcon(fileType);
            let fileUrl = await getFileUrl(fileRef);

            let file = {
                'fileName': fileName,
                'fileType': fileType,
                'fileIcon': fileIcon,
                'fileUrl': fileUrl,
            }

            if (fileType == 'image') files.images.push(file);
            else if (fileType == 'video') files.videos.push(file);
            else files.documents.push(file);
        }
        return files;
    }
    return null;
}