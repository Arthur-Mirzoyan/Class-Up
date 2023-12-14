import file_svg from "../Assets/svg/file-icons/file.svg";
import excel_svg from "../Assets/svg/file-icons/microsoft-excel.svg";
import powerpoint_svg from "../Assets/svg/file-icons/microsoft-powerpoint.svg";
import word_svg from "../Assets/svg/file-icons/microsoft-word.svg";
import access_svg from "../Assets/svg/file-icons/microsoft-access.svg";
import zip_rar_svg from "../Assets/svg/file-icons/zip-rar.svg";
import pdf_svg from "../Assets/svg/file-icons/pdf.svg";

const fileTypes = {
    image: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'],
    video: ['mp4', 'webm', 'ogv', 'avi', 'mov', 'mkv', 'flv'],
    excel: ['xls', 'xlsx', 'xlsm', 'xlsb', 'csv'],
    powerpoint: ['ppt', 'pptx', 'pptm'],
    word: ['doc', 'docx', 'docm'],
    access: ['mdb', 'accdb'],
    zip_rar: ['zip', 'rar'],
    pdf: ['pdf']
};

const fileIcons = {
    excel: excel_svg,
    powerpoint: powerpoint_svg,
    word: word_svg,
    access: access_svg,
    zip_rar: zip_rar_svg,
    pdf: pdf_svg
}

export function getFileIcon(fileType) {
    let icon = fileIcons[fileType] || file_svg;
    return icon;
}

export function getFileType(fileName) {
    let fileExtension = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();

    for (const type in fileTypes) {
        if (fileTypes[type].includes(fileExtension)) return type;
    }

    return "other";
}

export function getObjNames(arrOfObjs, isUser = false) {
    let result = [];
    for (let obj of arrOfObjs) result.push(isUser ? `${obj?.name} ${obj?.surname}` : obj?.name);
    return result;
}