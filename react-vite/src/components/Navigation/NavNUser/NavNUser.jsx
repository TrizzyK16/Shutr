import "./NavNUser.css"
import { NavLink} from "react-router-dom"

export default function NavNUser(){
    return (
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
    )
}