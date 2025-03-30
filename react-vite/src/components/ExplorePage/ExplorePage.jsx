import { Link, useNavigate } from "react-router-dom";
import "./ExplorePage.css";

export default function ExplorePage() {
    const navigate = useNavigate();
    
    // Automatically redirect to the Photos page after a short delay
    setTimeout(() => {
        navigate('/photos');
    }, 1500);

    return (
        <div className="explore-container">
            <div className="explore-content">
                <h1>Redirecting to Photos...</h1>
                <p>You're being redirected to our new Photos feature.</p>
                <p>If you're not redirected automatically, <Link to="/photos">click here</Link>.</p>
                <div className="loading-spinner"></div>
            </div>
        </div>
    );
}