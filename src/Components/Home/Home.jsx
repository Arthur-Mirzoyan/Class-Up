import { useEffect, useState } from "react";
import { getMessages } from "../../database/methods";
import { v4 as uuidv4 } from 'uuid';
import logo_png from "../../Assets/png/logo.png";
import Header from "../Header/Header.jsx";
import Loading from "../Loading/Loading.jsx"
import Sidebar from "../Sidebar/Sidebar.jsx";
import MessageCard from "../MessageCard/MessageCard.jsx";
import "./Home.scss";

const Home = () => {
    const [messages, setMessages] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const moveToClass = async (item) => {
        setIsLoading(true);
        try {
            localStorage.setItem('classID', item);
            let msg = await getMessages();
            setMessages(msg);
        }
        catch (err) {
            alert("Error occured. Please try again.");
        }
        setIsLoading(false);
    }

    useEffect(() => {
        let classID = localStorage.getItem('classID');
        if (classID) moveToClass(classID);
    }, [])

    return (
        <>
            {
                isLoading && <Loading />
            }
            <Sidebar onClassSelect={moveToClass} />
            <div className="home">
                <Header />
                <section className="home-container">
                    {
                        !localStorage.getItem('classID') &&
                        <div className="home-container-msg">
                            <h1 className="home-container-msg-topic">Welcome</h1>
                            <h1 className="home-container-msg-topic">To</h1>
                            <h1 className="home-container-msg-topic">Class Up <img src={logo_png} width={50} /></h1>
                        </div>
                    }
                    {
                        messages?.length == 0 &&
                        <div className="home-container-msg">
                            <h1 className="home-container-msg-topic">No</h1>
                            <h1 className="home-container-msg-topic">Messages</h1>
                            <h1 className="home-container-msg-topic">Found</h1>
                        </div>
                    }
                    {
                        messages?.map(msg => <MessageCard message={msg} key={uuidv4()} />)
                    }
                </section>
            </div>
        </>
    );

};

export default Home;