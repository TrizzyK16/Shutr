import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import NotificationModal from "../../NotificationModal/NotificationModal";
import ProfileButton from "../ProfileButton"
import "./NavUser.css";

export default function NavUser() {
    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const handleSearch = () => {
        if (searchQuery.trim() !== ""){
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
        }
    }

    return (
        <nav className="user-nav-container">
            <div className="user-nav-left">
                <ul>
                    <li>
                        <NavLink to="/">Shutr</NavLink>
                    </li>
                    <li>
                        <NavLink to="/you">You</NavLink>
                    </li>
                    <li>
                        <NavLink to="/explore">Explore</NavLink>
                    </li>
                    <li>
                        <NavLink to="/photos">Photos</NavLink>
                    </li>
                    <li>
                        <NavLink to="/groups">Groups</NavLink>
                    </li>
                    <li>
                        <NavLink to="/events">Events</NavLink>
                    </li>
                    <li>
                        <NavLink to="/prints">Prints</NavLink>
                    </li>
                    <li>
                        <NavLink to="/get-pro">Get Pro</NavLink>
                    </li>
                </ul>
            </div>

            <div className="user-nav-right">
                <ul>
                    <li>
                        <input
                            type="text"
                            placeholder="Photos, people, or groups..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSearch();
                                }
                            }}
                        />
                    </li>
                    <li>
                        <NavLink to="/upload">Upload</NavLink>
                    </li>
                    <li>
                        <button onClick={() => setShowModal(!showModal)}>Notifications</button>
                    </li>
                    <li>
                        <ProfileButton />
                    </li>
                </ul>
            </div>

            {showModal && <NotificationModal />}
        </nav>
    );
}
