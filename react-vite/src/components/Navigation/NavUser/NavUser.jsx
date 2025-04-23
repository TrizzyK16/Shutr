import { NavLink } from "react-router-dom";
import ProfileButton from "../ProfileButton";
import "./NavUser.css";

// Uncomment these imports when implementing search
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

export default function NavUser() {
    // Search functionality is commented out for now
    // Will be implemented in a future update
    /*
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    
    const handleSearch = () => {
        if (searchQuery.trim() !== ""){
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
        }
    }
    */

    return (
        <nav className="user-nav-container">
            <div className="user-nav-left">
                <ul>
                    <li>
                        <NavLink to="/welcome" className="logo-container">
                            <img src="/shutr-logo-nbg.png" alt="Shutr Logo" className="nav-logo" />
                            <span>Shutr</span>
                        </NavLink>
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
                        <NavLink to="/albums">Albums</NavLink>
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
                    <li className="upload-button">
                        <NavLink to="/upload">
                            <i className="fa fa-cloud-upload"></i> Upload
                        </NavLink>
                    </li>
                    <li>
                        <ProfileButton />
                    </li>
                </ul>
            </div>


        </nav>
    );
}
