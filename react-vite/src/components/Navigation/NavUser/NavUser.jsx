import { useState } from "react";
import { NavLink } from "react-router-dom";
import NotificationModal from "../../NotificationModal/NotificationModal";
import ProfileButton from "../ProfileButton"
import "./NavUser.css";

export default function NavUser() {
    const [showModal, setShowModal] = useState(false);
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
