import { Link } from "react-router-dom";
import { FaCamera, FaImages, FaPrint, FaEnvelope } from "react-icons/fa";
import "./PrintsPage.css";

export default function PrintsPage() {
    return (
        <div className="prints-page">
            {/* Hero section */}
            <div className="prints-hero">
                <div className="prints-hero__content">
                    <h1 className="prints-hero__title">Shutr Prints</h1>
                    <p className="prints-hero__subtitle">High-quality prints of your favorite photos</p>
                    <div className="coming-soon-badge">Coming Soon</div>
                </div>
            </div>

            {/* Features section */}
            <div className="prints-content">
                <div className="prints-section">
                    <h2 className="section-title">Turn Your Memories Into Art</h2>
                    <p className="section-description">
                        We're working hard to bring you a premium printing service that will allow you to transform your digital photos into beautiful physical prints, canvas art, and more.
                    </p>
                </div>

                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">
                            <FaPrint />
                        </div>
                        <h3 className="feature-title">Premium Quality</h3>
                        <p className="feature-description">
                            Professional-grade photo prints on archival paper that will last for generations.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <FaImages />
                        </div>
                        <h3 className="feature-title">Multiple Formats</h3>
                        <p className="feature-description">
                            Choose from various sizes and finishes including matte, glossy, and metallic.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <FaCamera />
                        </div>
                        <h3 className="feature-title">Canvas & Frames</h3>
                        <p className="feature-description">
                            Gallery-quality canvas prints and custom framing options to showcase your best shots.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <FaEnvelope />
                        </div>
                        <h3 className="feature-title">Direct Shipping</h3>
                        <p className="feature-description">
                            Fast, secure shipping directly to your door or send as gifts to friends and family.
                        </p>
                    </div>
                </div>

                <div className="notify-section">
                    <h2 className="section-title">Be the First to Know</h2>
                    <p className="section-description">
                        Want to be notified when Shutr Prints launches? Check back soon or visit your account settings to enable notifications.
                    </p>
                    <div className="action-buttons">
                        <Link to="/photos" className="action-button explore">
                            <span>Back to Photos</span>
                        </Link>
                        <Link to="/settings" className="action-button settings">
                            <span>Notification Settings</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}