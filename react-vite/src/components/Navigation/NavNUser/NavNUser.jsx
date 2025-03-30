import "./NavNUser.css"
import { NavLink} from "react-router-dom"
import ProfileButton from "../ProfileButton"

export default function NavNUser(){
    return (
        <nav className="nav-container">
            <ul>
                <li>
                    <NavLink to="/">Shutr</NavLink>
                </li>

                <li>
                    <NavLink to="/features">Features</NavLink>
                </li>

                <li>
                    <NavLink to="/shutr-pro">ShutrPro</NavLink>
                </li>

                <li>
                    <NavLink to="/the-apps">The Apps</NavLink>
                </li>

                <li>
                    <NavLink to="/community">Community</NavLink>
                </li>

                <li>
                    <NavLink to="/photos">Photos</NavLink>
                </li>

                <li>
                    <NavLink to="/company">Company</NavLink>
                </li>

                <li className="profile-button-container">
                    <ProfileButton />
                </li>
            </ul>
        </nav>
    )
}