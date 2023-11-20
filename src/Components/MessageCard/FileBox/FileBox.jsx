import "./FileBox.scss";
import { useEffect, useState } from "react";

const FileBox = (props) => {
    const { fileName, fileType, fileIcon, fileUrl } = props;

    const [isDocument, setIsDocument] = useState(true);
    const [imgClass, setImgClass] = useState("card-body-elem-filebox-icon");

    useEffect(() => {
        if (fileType == "image" || fileType == "video") {
            setIsDocument(false);
            setImgClass("");
        }
    }, [fileName, fileType, fileIcon, fileUrl])

    return (
        <div className="card-body-elem">
            <div className="card-body-elem-filebox">
                {
                    fileType == 'image' &&
                    <img loading="lazy" src={fileUrl} alt={fileName} />
                }
                {
                    fileType == 'video' &&
                    <iframe src={fileUrl} loading="lazy" allowFullScreen frameborder="0"></iframe>
                }
                {
                    isDocument && (
                        <>
                            <img loading="lazy" src={isDocument ? fileIcon : fileUrl} className="card-body-elem-filebox-icon" />
                            <div className="card-body-elem-filebox-info">
                                <a href={fileUrl} target="_blank" className="card-body-elem-filebox-info-name">{fileName}</a>
                                <a href={fileUrl} download={fileName} className="card-body-elem-filebox-info-download"></a>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default FileBox;