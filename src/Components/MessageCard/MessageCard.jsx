import "./MessageCard.scss";
import delete_svg from "../../Assets/svg/delete.svg";
import ImageBox from "./ImageBox/ImageBox.jsx";
import VideoBox from "./VideoBox/VideoBox.jsx";
import FileBox from "./FileBox/FileBox.jsx";
import { useDoubleTap } from 'use-double-tap';
import { useEffect, useState } from "react";
import { getFiles } from "./MessageCard";
import { deleteMessage } from "../../database/methods";
import { v4 as uuidv4 } from "uuid";

const MessageCard = (props) => {
    const [files, setFiles] = useState(null);
    const [showMore, setShowMore] = useState(false);
    const [showMorePText, setShowMorePText] = useState('Show More');
    const { message } = props;

    useEffect(() => {
        (async () => {
            let messageFiles = await getFiles(message);
            setFiles(messageFiles);
        })();
    }, [message])

    const deleteMsg = async () => {
        let isSure = window.confirm("Delete this message?");
        if (isSure) {
            let isDeleted = await deleteMessage(message);
            if (isDeleted) window.location.reload();
            else alert("Error occured. File could not be deleted.");
        }
    }

    const toggleShowMore = () => {
        setShowMore(showMore ? false : true);
        if (showMore) setShowMorePText('Show More');
        else setShowMorePText('Show Less');
    }

    const bind = useDoubleTap(e => {
        toggleShowMore();
    });

    return (
        <div {...bind} className="card" >
            <div className="card-options">
                {
                    message.senderID === localStorage.getItem('userID') &&
                    <img className="card-options-btn"
                        src={delete_svg}
                        alt="Delete"
                        onClick={deleteMsg} />
                }
            </div>
            <div className="card-main">
                <p className="card-main-topic">{message?.topic}</p>
                <p className="card-main-sender">By {message?.sender}</p>
                <p className="card-main-description">
                    {message.description.length < 400 || showMore ? message?.description : message?.description.substring(0, 397) + "..."}
                </p>
                {
                    (files || message?.description.length > 400) &&
                    <p onClick={toggleShowMore} className="card-main-showMore">{showMorePText}</p>
                }
            </div>
            {
                files && showMore && (
                    <div className="card-body">
                        {
                            files.images.length > 0 &&
                            <ImageBox images={files.images} />
                        }
                        {
                            files.videos.length > 0 &&
                            <VideoBox videos={files.videos} />
                        }
                        {
                            files.documents.map(file =>
                                <FileBox fileName={file.fileName} fileType={file.fileType}
                                    fileIcon={file.fileIcon} fileUrl={file.fileUrl} key={uuidv4()} />
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}

export default MessageCard;