import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./YouPage.css";

export default function YouPage() {
    const user = useSelector(state => state.session.user);

    return (
        <div className="you-page">
            {/* Hero section with background image */}
            <div className="you-hero">
                <div className="you-hero__content">
                    <h1 className="you-hero__title">Welcome, {user?.username || 'Photographer'}!</h1>
                    <p className="you-hero__subtitle">Your personal Shutr dashboard</p>
                </div>
            </div>

            <div className="you-content">
                <div className="you-section">
                    <h2 className="section-title">Quick Actions</h2>
                    <div className="action-buttons">
                        <Link to="/upload" className="action-button upload">
                            <span>Upload Photos</span>
                        </Link>
                        <Link to="/photos" className="action-button explore">
                            <span>Explore Photos</span>
                        </Link>
                    </div>
                </div>

                <div className="you-section">
                    <h2 className="section-title">Your Photos</h2>
                    <div className="activity-placeholder">
                        <p>Your recent photos will appear here.</p>
                        <Link to="/photos?tab=yours" className="view-all-link">View all your photos</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}