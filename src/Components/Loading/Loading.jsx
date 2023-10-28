import loading_svg from "../../Assets/svg/loading.svg";
import "./Loading.scss";

const Loading = () => {
    return (
        <div className="loading">
            <img src={loading_svg} alt="Loading..." className="loading-svg" />
        </div>
    );
}

export default Loading;