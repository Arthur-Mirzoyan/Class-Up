import "./MessageCard.scss";
import write_svg from "../../Assets/svg/write.svg";
import delete_svg from "../../Assets/svg/delete.svg";
import showMore_svg from "../../Assets/svg/showMore.svg"
import { useEffect, useState } from "react";
import { getFilesBlock } from "./MessageCard";
import { deleteMessage } from "../../database/methods";
import { v4 as uuidv4 } from "uuid";

const MessageCard = (props) => {
    const [blocks, setBlocks] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const { message } = props;

    useEffect(() => {
        (async () => {
            let elems = await getFilesBlock(message);
            let htmls = [];
            for (let i in elems) htmls.push(elems?.[i].outerHTML);
            setBlocks(htmls);
        })();
    }, [message])

    const updateMsg = () => {

    }

    const deleteMsg = async () => {
        let isSure = window.confirm("Delete this message?");
        if (isSure) {
            let isDeleted = await deleteMessage(message);
            if (isDeleted) window.location.reload();
            else alert("Error occured. File could not be deleted.");
        }
    }

    const toggleShowMore = () => {
        showMore ? setShowMore(false) : setShowMore(true);
    }

    return (
        <div className="card">
            {
                message.senderID === localStorage.getItem('userID') &&
                <div className="card-options">
                    <img className="card-options-btn"
                        src={write_svg}
                        alt="Update"
                        onClick={updateMsg} />
                    <img className="card-options-btn"
                        src={delete_svg}
                        alt="Delete"
                        onClick={deleteMsg} />
                    {
                        blocks.length > 0 &&
                        <img className="card-options-btn"
                            src={showMore_svg}
                            alt="Show More"
                            onClick={toggleShowMore} />
                    }

                </div>
            }
            <div className="card-main">
                <h2 className="card-main-topic">{message.topic}</h2>
                <p className="card-main-sender">By {message.sender}</p>
                <p className="card-main-description">{message.description}</p>
            </div>
            {
                blocks.length > 0 && (
                    <div className="card-body">
                        {
                            showMore &&
                            blocks.map(block =>
                                <div className="card-body-elem" dangerouslySetInnerHTML={{ __html: block }} key={uuidv4()}></div>
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}

export default MessageCard;