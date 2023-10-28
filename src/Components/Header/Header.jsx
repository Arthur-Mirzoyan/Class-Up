import plus_svg from "../../Assets/svg/plus.svg";
import settings_svg from "../../Assets/svg/settings.svg";
import exit_svg from "../../Assets/svg/exit.svg";
import Loading from "../Loading/Loading";
import "./Header.scss";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { addMessage } from "../../database/methods";

const Header = () => {
    const navigate = useNavigate();
    const [addMsgShow, setAddMsgShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const log_out = () => {
        localStorage.clear();
        navigate('/', { replace: true });
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

    return (
        <>
            {
                isLoading && <Loading />
            }
            {
                addMsgShow &&
                <div className="add-msg-dialog"
                    onClick={closeAddMsgDialog}>
                    <form className="add-msg-dialog-form" method="post" onSubmit={addMsg}>
                        <input required className="add-msg-dialog-form-input" type="text" name="topic" placeholder="Topic" />
                        <input className="add-msg-dialog-form-input" type="file" name="file" placeholder="Add a file" multiple />
                        <textarea required className="add-msg-dialog-form-input add-msg-dialog-form-textarea" name="description" placeholder="Description" cols="30"></textarea>
                        <button className="add-msg-dialog-form-btn">Add message</button>
                    </form>
                </div>
            }
            <header className="header">
                <nav className="header-navigation">
                    <ul className="header-navigation-ul">
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
                                            className="header-navigation-ul-li-btn settings-btn" />
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