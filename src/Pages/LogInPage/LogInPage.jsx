import { useEffect } from "react";
import LogIn from "../../Components/LogIn/LogIn.jsx";

const LogInPage = () => {
    useEffect(() => {
        document.title = "Class Up";
    }, [])

    return (
        <LogIn />
    );
};

export default LogInPage;