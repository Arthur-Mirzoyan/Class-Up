import plus_svg from "../../Assets/svg/plus.svg";
import settings_svg from "../../Assets/svg/settings.svg";
import exit_svg from "../../Assets/svg/exit.svg";
import hamburger_svg from "../../Assets/svg/hamburger.svg";
import Loading from "../Loading/Loading";
import "./Header.scss";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { addMessage, deleteClass, getClassInfo } from "../../database/methods";
import { v4 as uuidv4 } from "uuid";

const Header = () => {
    const navigate = useNavigate();
    const [addMsgShow, setAddMsgShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showSidebar, setShowSidebar] = useState(true);
    const [currentClass, setCurrentClass] = useState('');

    useEffect(() => {
        (async () => {
            let classData = await getClassInfo();
            setCurrentClass(classData);
        })()
    }, [localStorage.getItem('classID')])

    const removeClass = async e => {
        setIsLoading(true);
        await deleteClass();
        localStorage.removeItem('classID');
        setIsLoading(false);
        window.location.reload();
    }

    const log_out = () => {
        if (window.confirm("Log out?")) {
            localStorage.clear();
            navigate('/', { replace: true });
        }
    }

    const addMsg = e => {
        e.preventDefault();
        setIsLoading(true);
        (async () => {
            let response = await addMessage(e.target);
            setIsLoading(false);
            if (response) alert("Message was added.");
            else alert("Error occured. Please try again later.");
            window.location.reload();
        })();
    }

    const closeAddMsgDialog = e => {
        if (e.target.className == 'add-msg-dialog') {
            let reset = window.confirm("If You choose 'OK', the message will NOT be submited.");
            if (reset) {
                document.querySelector('.add-msg-dialog-form').reset();
                setAddMsgShow(false);
            }
        }
    }

    const closeSettings = e => {
        if (e.target.className == 'settings-dialog') setShowSettings(false);
    }

    const copyToClipboard = async e => {
        await navigator.clipboard.writeText(e.target.innerText)
    }

    const toggleSidebar = () => {
        showSidebar ? setShowSidebar(false) : setShowSidebar(true);
        let sidebar = document.querySelector('.sidebar');
        sidebar.style.position = showSidebar ? 'unset' : 'absolute';
    }

    return (
        <>
            {
                isLoading && <Loading />
            }
            {
                addMsgShow &&
                <div className="add-msg-dialog" onClick={closeAddMsgDialog}>
                    <form className="add-msg-dialog-form" method="post" onSubmit={addMsg}>
                        <input required className="add-msg-dialog-form-input" type="text" name="topic" placeholder="Topic" />
                        <input className="add-msg-dialog-form-input" type="file" name="file" placeholder="Add a file" multiple />
                        <textarea required className="add-msg-dialog-form-input add-msg-dialog-form-textarea" name="description" placeholder="Description" cols="30"></textarea>
                        <button className="add-msg-dialog-form-btn">Add message</button>
                    </form>
                </div>
            }
            {
                showSettings &&
                <div className="settings-dialog" onClick={closeSettings}>
                    <div className="settings-dialog-box">
                        <table className="settings-dialog-box-section">
                            <tbody>
                                <tr>
                                    <th className="settings-dialog-box-section-topic top-l">Class Name</th>
                                    <th onClick={copyToClipboard} className="settings-dialog-box-section-value top-r">{currentClass?.name}</th>
                                </tr>
                                <tr>
                                    <th className="settings-dialog-box-section-topic">Class ID</th>
                                    <th onClick={copyToClipboard} className="settings-dialog-box-section-value">{currentClass?.id}</th>
                                </tr>
                                <tr>
                                    <th className="settings-dialog-box-section-topic">Created by</th>
                                    <th onClick={copyToClipboard} className="settings-dialog-box-section-value">{currentClass?.creator}</th>
                                </tr>
                                <tr>
                                    <th className="settings-dialog-box-section-topic">Messages sent</th>
                                    <th onClick={copyToClipboard} className="settings-dialog-box-section-value">{currentClass?.messages.length}</th>
                                </tr>
                                <tr>
                                    <th className="settings-dialog-box-section-topic">Class size</th>
                                    <th onClick={copyToClipboard} className="settings-dialog-box-section-value">{currentClass?.classSize}</th>
                                </tr>
                                <tr>
                                    <th className="settings-dialog-box-section-topic bottom-l">Participants</th>
                                    <th onClick={copyToClipboard} className="settings-dialog-box-section-value bottom-r">
                                        <ul>
                                            {
                                                currentClass?.classParticipants.map(participant =>
                                                    <li className="settings-dialog-box-section-value-li" key={uuidv4()}>{participant}</li>)
                                            }
                                        </ul>
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                        {
                            localStorage.getItem('userID') == currentClass?.creatorID &&
                            <button onClick={removeClass} className="settings-dialog-box-btn">Delete Class</button>
                        }
                    </div>
                </div >
            }
            <header className="header">
                <nav className="header-navigation">
                    <ul className="header-navigation-ul ul-left">
                        <li className="header-navigation-ul-li">
                            <img src={hamburger_svg} alt="Add"
                                className="header-navigation-ul-li-btn"
                                onClick={toggleSidebar} />
                        </li>
                    </ul>
                    <ul className="header-navigation-ul ul-right">
                        {
                            localStorage.getItem('classID') && (
                                <>
                                    <li className="header-navigation-ul-li">
                                        <img src={plus_svg} alt="Add"
                                            className="header-navigation-ul-li-btn"
                                            onClick={() => setAddMsgShow(true)} />
                                    </li>
                                    <li className="header-navigation-ul-li">
                                        <img src={settings_svg} alt="Settings"
                                            className="header-navigation-ul-li-btn settings-btn"
                                            onClick={() => setShowSettings(true)} />
                                    </li>
                                </>
                            )
                        }
                        <li className="header-navigation-ul-li">
                            <img src={exit_svg} alt="Log Out"
                                className="header-navigation-ul-li-btn"
                                onClick={log_out} />
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
};

export default Header;