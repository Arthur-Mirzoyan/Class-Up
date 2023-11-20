import "./VideoBox.scss";
import Carousel from "../../Carousel/Carousel.jsx";

const VideoBox = (props) => {
    const { videos } = props;

    return (
        <div className="card-body-elem">
            <div className="card-body-elem-videobox">
                <Carousel items={videos} />
            </div>
        </div>
    )
}

export default VideoBox;