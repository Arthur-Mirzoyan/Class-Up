import { useEffect, useState } from "react";
import { getMessages } from "../../database/methods";
import { v4 as uuidv4 } from 'uuid';
import Header from "../Header/Header.jsx";
import Loading from "../Loading/Loading.jsx"
import Sidebar from "../Sidebar/Sidebar.jsx";
import MessageCard from "../MessageCard/MessageCard.jsx";
import "./Home.scss";

const Home = () => {
    let [messages, setMessages] = useState(null);
    let [isLoading, setIsLoading] = useState(false);

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
                        messages?.map(msg => <MessageCard message={msg} key={uuidv4()} />)
                    }
                </section>
            </div>
        </>
    );

};

export default Home;