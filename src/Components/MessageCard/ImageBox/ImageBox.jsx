import "./ImageBox.scss";
import Carousel from "../../Carousel/Carousel.jsx";

const ImageBox = (props) => {
    const { images } = props;

    return (
        <div className="card-body-elem">
            <div className="card-body-elem-imagebox">
                <Carousel items={images} />
            </div>
        </div>
    )
}

export default ImageBox;