import "./Home.scss";

const Home = () => {
    return (
        <div className="home">
            <div className="home-container">
                <table>
                    <tr>
                        <th>Task name</th>
                        <th>Status</th>
                        <th>People</th>
                        <th>Deadline</th>
                        <th>Completion</th>
                    </tr>
                </table>
            </div>
        </div>
    );

};

export default Home;