import { useEffect } from "react";
import Home from "../../Components/Home/Home.jsx";

const HomePage = () => {
    useEffect(() => {
        document.title = "Class Up";
    }, [])

    return (
        <Home />
    );
};

export default HomePage;