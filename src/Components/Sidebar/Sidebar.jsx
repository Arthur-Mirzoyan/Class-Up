import { useEffect, useState } from 'react';
import { getUserClasses } from '../../database/methods';
import { v4 as uuidv4 } from 'uuid';
import Loading from '../Loading/Loading';
import './Sidebar.scss';

const Sidebar = ({ onClassSelect }) => {
    let [userClasses, setUserClasses] = useState([]);
    let [isLoading, setIsLoading] = useState(false);

    const handleClassSelect = item => {
        onClassSelect(item.id);
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
            <aside className="sidebar">
                <legend className="sidebar-topic-legend">Class Up</legend>
                <div className="sidebar-container">
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