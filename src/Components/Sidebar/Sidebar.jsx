import { useEffect, useState } from 'react';
import { addUserClass, createClass, getUserClasses } from '../../database/methods';
import { v4 as uuidv4 } from 'uuid';
import Loading from '../Loading/Loading';
import './Sidebar.scss';

const Sidebar = ({ onClassSelect }) => {
    const [userClasses, setUserClasses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [addVariant, setAddVariant] = useState('create');

    const handleClassSelect = item => {
        onClassSelect(item.id);
    }

    const closeAddClsDialog = e => {
        if (e.target.className == 'add-cls-dialog') {
            document.querySelector('.add-cls-dialog-form').reset();
            setShowAddDialog(false);
        }
    }

    const toggleClassVariant = e => {
        let [cBtn, jBtn] = document.querySelectorAll('.add-cls-dialog-form-top-btn');
        e.target.classList.add('selected');
        if (e.target == cBtn) {
            jBtn.classList.remove('selected');
            setAddVariant('create');
            document.querySelector('.add-cls-dialog-form-input').placeholder = "Enter Class Name";
        }
        else {
            cBtn.classList.remove('selected');
            setAddVariant('join');
            document.querySelector('.add-cls-dialog-form-input').placeholder = "Enter Class ID";
        }
    }

    const handleAddClass = e => {
        e.preventDefault();
        setIsLoading(true);
        (async () => {
            let response;
            if (addVariant == 'create') response = await createClass(document.querySelector('.add-cls-dialog-form-input').value);
            else response = await addUserClass(document.querySelector('.add-cls-dialog-form-input').value);
            setIsLoading(false);
            window.location.reload();
        })();
    }

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            let classes = await getUserClasses();
            setUserClasses(classes);
            setIsLoading(false);
        })();
    }, [])

    return (
        <>
            {
                isLoading && <Loading />
            }
            {
                showAddDialog &&
                <div className="add-cls-dialog"
                    onClick={closeAddClsDialog}>
                    <form className="add-cls-dialog-form" method="post" onSubmit={handleAddClass}>
                        <div className="add-cls-dialog-form-top">
                            <button onClick={toggleClassVariant} className="add-cls-dialog-form-top-btn selected" type="button">Create</button>
                            <button onClick={toggleClassVariant} className="add-cls-dialog-form-top-btn" type="button">Join</button>
                        </div>
                        <input required className="add-cls-dialog-form-input" type="text" name="topic" placeholder="Enter Class Name" />
                        <button className="add-cls-dialog-form-btn">Go!</button>
                    </form>
                </div>
            }
            <aside className="sidebar">
                <legend className="sidebar-topic-legend">Class Up</legend>
                <div className="sidebar-container">
                    <p className="sidebar-container-classes addBtn" onClick={() => setShowAddDialog(true)}>Add class</p>
                    {
                        userClasses.map(item => {
                            let cname = item.id == localStorage.getItem('classID')
                                ? "sidebar-container-classes active"
                                : "sidebar-container-classes";
                            return (
                                <p className={cname}
                                    onClick={() => handleClassSelect(item)}
                                    key={uuidv4()}>
                                    {item.name}
                                </p>
                            );
                        })
                    }
                </div>
            </aside>
        </>
    );
}

export default Sidebar;