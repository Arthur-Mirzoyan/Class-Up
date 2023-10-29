import "./MessageCard.scss";
import delete_svg from "../../Assets/svg/delete.svg";
import showMore_svg from "../../Assets/svg/showMore.svg"
import { useEffect, useState } from "react";
import { getFilesBlock } from "./MessageCard";
import { deleteMessage } from "../../database/methods";
import { v4 as uuidv4 } from "uuid";

const MessageCard = (props) => {
    const [lastTouchTIme, setLastTouchTime] = useState(0);
    const [blocks, setBlocks] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [showMorePText, setShowMorePText] = useState('Show More');
    const { message } = props;

    useEffect(() => {
        (async () => {
            let elems = await getFilesBlock(message);
            let htmls = [];
            for (let i in elems) htmls.push(elems?.[i].outerHTML);
            setBlocks(htmls);
        })();
    }, [message])

    const handleTouch = () => {
        let now = Date.now();
        if (now - lastTouchTIme < 300) toggleShowMore();
        else setLastTouchTime(now);
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
        setShowMore(showMore ? false : true);
        if (showMore) setShowMorePText('Show More');
        else setShowMorePText('Show Less');
        console.log(showMore)
    }

    return (
        <div className="card" onDoubleClick={toggleShowMore} onTouchStart={handleTouch} onTouchEnd={() => { }}>
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
                    (blocks.length > 0 || message?.description.length > 400) &&
                    <p onClick={toggleShowMore} className="card-main-showMore">{showMorePText}</p>
                }
            </div>
            {
                blocks.length > 0 && showMore && (
                    <div className="card-body">
                        {
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