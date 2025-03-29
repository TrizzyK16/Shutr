import "./NavNUser.css"
import { NavLink} from "react-router-dom"
import ProfileButton from "../ProfileButton"

export default function NavNUser(){
    return (
<<<<<<< HEAD
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
                    <NavLink to="/company">Company</NavLink>
                </li>

                <li className="profile-button-container">
                    <ProfileButton />
                </li>
            </ul>
        </nav>
=======
        <div className="nuser-navbar">
            <div className="logo-link-navbar">
                <NavLink to="/">
                    <img src="/shutr-logo-nbg.png" alt="logo" className="icon-logo-navbar" />
                </NavLink>
                <NavLink to="/">shutr</NavLink>
            </div>

            <div className="link-navbar">
                <NavLink to="/features">Features</NavLink>
            </div>

            <div className="link-navbar">
                <NavLink to="/shutr-pro">ShutrPro</NavLink>
            </div>

            <div className="link-navbar">
                <NavLink to="/the-apps">The Apps</NavLink>
            </div>

            <div className="link-navbar">
                <NavLink to="/community">Community</NavLink>
            </div>

            <div className="link-navbar">
                <NavLink to="/company">Company</NavLink>
            </div>

            <div className="login-signup-navbar">
                <div className="login-navbar">
                    <NavLink to="/login">Login</NavLink>
                </div>

                <div className="signup-navbar">
                    <NavLink to="/signup">Signup</NavLink>
                </div>
            </div>
            
        </div>
>>>>>>> main
    )
}