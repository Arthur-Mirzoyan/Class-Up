import { useEffect } from "react";
import SignUp from "../../Components/SignUp/SignUp.jsx";

const SignUpPage = () => {
    useEffect(() => {
        document.title = "Class Up";
    }, [])

    return (
        <SignUp />
    );
};

export default SignUpPage;