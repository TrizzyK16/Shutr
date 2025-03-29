import "./NavNUser.css"
import { NavLink} from "react-router-dom"

export default function NavNUser(){
    return (
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

            <li>
                <NavLink to="/login">Login</NavLink>
            </li>

            <li>
                <NavLink to="/signup">Signup</NavLink>
            </li>
            
        </ul>
    )
}