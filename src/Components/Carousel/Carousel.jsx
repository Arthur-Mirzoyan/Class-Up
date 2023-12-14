import "./Carousel.scss";
import arrow_right_svg from "../../Assets/svg/arrow-right.svg";
import arrow_left_svg from "../../Assets/svg/arrow-left.svg";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Carousel = (props) => {
    const { items } = props;
    const [currentItemNumber, setCurrentItemNumber] = useState(0);
    const input = useRef();
    const carousel_box = useRef();

    const checkInput = val => {
        if (val && val >= items.length) val = 0;
        else if (val && val < 0) val = items.length - 1;

        return val;
    }

    const toggleItemSwitch = () => {
        let n = checkInput(input.current.value);
        carousel_box.current.style.transform = `translateX(${n * -250}px)`;
        setCurrentItemNumber(n);
    }

    const changeItem = (e, direction) => {
        e.stopPropagation();

        let n = checkInput(currentItemNumber + direction);

        carousel_box.current.style.transform = `translateX(${n * -250}px)`;
        input.current.value = n + 1;
        setCurrentItemNumber(n);
    }

    const inputOnBlur = () => {
        let val = checkInput(input.current.value);
        setCurrentItemNumber(val);
        input.current.value = val;
    }

    return (
        <div className="carousel">
            <div ref={carousel_box} className="carousel-box">
                {
                    items?.map(item =>
                        <div className="carousel-box-item-box" key={uuidv4()}>
                            {
                                item.fileType === 'image' &&
                                <img src={item?.fileUrl} alt={item?.fileName} loading="lazy" />
                            }
                            {
                                item.fileType === 'video' &&
                                <iframe src={item?.fileUrl} loading="lazy" frameBorder={0} allowFullScreen />
                            }
                        </div>
                    )
                }
            </div>
            {
                items.length > 1 &&
                <div className="carousel-controls">
                    <img onClick={e => changeItem(e, -1)} src={arrow_left_svg} alt="<" />
                    <input ref={input} type="number" className="carousel-controls-input"
                        defaultValue={1} min={1} max={items.length}
                        onChange={toggleItemSwitch}
                        onBlur={inputOnBlur} />
                    <img onClick={e => changeItem(e, 1)} src={arrow_right_svg} alt=">" />
                </div>
            }
        </div >
    )
}

export default Carousel;