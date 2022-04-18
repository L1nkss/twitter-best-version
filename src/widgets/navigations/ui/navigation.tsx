import { Link } from "react-router-dom";

const Navigation = () => {
    return (
        <div className="navigation">
            <div className="navigation__wrapper">
                <ul>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>Explore</li>
                    <li>Notifications</li>
                    <li>Messages</li>
                    <li>
                        <Link to="/bookmarks">Bookmarks</Link>
                    </li>
                    <li>Profile</li>
                    <li>Profile</li>
                </ul>
            </div>
        </div>
    )
}

export default Navigation