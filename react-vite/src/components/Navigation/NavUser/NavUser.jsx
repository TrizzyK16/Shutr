import { NavLink } from "react-router-dom";
import ProfileButton from "../ProfileButton";
import "./NavUser.css";

export default function NavUser() {

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
                        <NavLink to="/albums">Albums</NavLink>
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
                        <NavLink to="/upload">Upload</NavLink>
                    </li>
                    <li>
                        <ProfileButton />
                    </li>
                </ul>
            </div>
        </nav>
    );
}
