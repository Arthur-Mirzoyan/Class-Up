import "./Carousel.scss";
import arrow_right_svg from "../../Assets/svg/arrow-right.svg";
import arrow_left_svg from "../../Assets/svg/arrow-left.svg";
import { useRef, useState } from "react";

const Carousel = (props) => {
    const { items } = props;
    const [currentItemNumber, setCurrentItemNumber] = useState(0);
    const input = useRef();

    const toggleItemSwitch = e => {
        let n = e.target.value - 1;
        if (currentItemNumber !== n && n < items.length && n >= 0)
            setCurrentItemNumber(n);
    }

    const changeItem = direction => {
        let n = currentItemNumber + direction;

        if (0 <= n && n < items.length)
            setCurrentItemNumber(n);
    }

    const handleInput = () => {
        if (input.current.value < 1 || input.current.value >= items.length)
            input.current.value = currentItemNumber + 1;

    }

    return (
        <div className="carousel">
            <div className="carousel-box">
                {
                    items?.[currentItemNumber].fileType === 'image' &&
                    <img src={items?.[currentItemNumber].fileUrl} alt={items?.[currentItemNumber].fileName} loading="lazy" />
                }
                {
                    items?.[currentItemNumber].fileType === 'video' &&
                    <iframe src={items?.[currentItemNumber].fileUrl} loading="lazy" allowFullScreen frameBorder={0} />
                }
            </div>
            {
                items.length > 1 &&
                <div className="carousel-controls">
                    <img onClick={() => changeItem(-1)} src={arrow_left_svg} alt="<" />
                    <input ref={input} onBlur={handleInput} onChange={toggleItemSwitch} type="number"
                        value={currentItemNumber + 1} className="carousel-controls-input" min={1} max={items.length} />
                    <img onClick={() => changeItem(1)} src={arrow_right_svg} alt=">" />
                </div>
            }
        </div>
    )
}

export default Carousel;