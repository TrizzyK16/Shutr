import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import SignupFormModal from "../SignupFormModal/SignupFormModal";
import "./FeaturesPage.css";

export default function FeaturesPage() {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className="features-page">
      {/* Hero Section */}
      <div className="features-hero">
        <div className="features-hero__content">
          <h1 className="features-hero__title">Shutr Features</h1>
          <p className="features-hero__subtitle">Discover all the powerful tools and features that make Shutr the perfect platform for photographers of all levels</p>
        </div>
      </div>

      {/* Features Overview Section */}
      <div className="features-container">
        <div className="features-section">
          <h2 className="features-section__title">Core Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-card__icon">
                <i className="fas fa-camera"></i>
              </div>
              <h3 className="feature-card__title">Photo Sharing</h3>
              <p className="feature-card__description">Upload, organize, and share your photos with the world or keep them private.</p>
              <Link to="/photos" className="feature-card__link">Explore Photos</Link>
            </div>

            <div className="feature-card">
              <div className="feature-card__icon">
                <i className="fas fa-users"></i>
              </div>
              <h3 className="feature-card__title">Community</h3>
              <p className="feature-card__description">Join groups, participate in events, and connect with photographers worldwide.</p>
              <Link to="/community" className="feature-card__link">Join Community</Link>
            </div>

            <div className="feature-card">
              <div className="feature-card__icon">
                <i className="fas fa-search"></i>
              </div>
              <h3 className="feature-card__title">Discovery</h3>
              <p className="feature-card__description">Find inspiration through curated galleries and trending photos.</p>
              <Link to="/photos" className="feature-card__link">Discover Photos</Link>
            </div>
          </div>
        </div>

        {/* Shutr Pro Section */}
        <div className="features-pro-section">
          <div className="features-pro-content">
            <h2 className="features-pro-title">Shutr Pro</h2>
            <p className="features-pro-description">Take your photography to the next level with our premium features</p>
            
            <div className="features-pro-grid">
              <div className="pro-feature">
                <h3>Unlimited Storage</h3>
                <p>Store all your high-resolution photos without worrying about space limitations.</p>
              </div>
              
              <div className="pro-feature">
                <h3>Advanced Analytics</h3>
                <p>Get detailed insights about your audience and photo performance.</p>
              </div>
              
              <div className="pro-feature">
                <h3>Priority Support</h3>
                <p>Get help from our dedicated support team whenever you need it.</p>
              </div>
              
              <div className="pro-feature">
                <h3>Ad-Free Experience</h3>
                <p>Enjoy Shutr without any advertisements or distractions.</p>
              </div>
            </div>
            
            <div className="features-pro-cta">
              {sessionUser ? (
                <Link to="/shutr-pro" className="btn btn-primary">Upgrade to Pro</Link>
              ) : (
                <div className="signup-prompt">
                  <p>Create an account to access Shutr Pro</p>
                  <OpenModalButton
                    buttonText="Sign Up"
                    modalComponent={<SignupFormModal />}
                    className="btn btn-primary"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Additional Features Section */}
        <div className="features-section">
          <h2 className="features-section__title">More Features</h2>
          <div className="features-list">
            <div className="feature-item">
              <div className="feature-item__icon">
                <i className="fas fa-lock"></i>
              </div>
              <div className="feature-item__content">
                <h3 className="feature-item__title">Privacy Controls</h3>
                <p className="feature-item__description">Control who sees your photos with flexible privacy settings.</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-item__icon">
                <i className="fas fa-tags"></i>
              </div>
              <div className="feature-item__content">
                <h3 className="feature-item__title">Smart Organization</h3>
                <p className="feature-item__description">Organize photos with tags, albums, and collections for easy access.</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-item__icon">
                <i className="fas fa-mobile-alt"></i>
              </div>
              <div className="feature-item__content">
                <h3 className="feature-item__title">Mobile Friendly</h3>
                <p className="feature-item__description">Access Shutr on any device with our responsive design.</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-item__icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <div className="feature-item__content">
                <h3 className="feature-item__title">Stats & Insights</h3>
                <p className="feature-item__description">Track views, likes, and comments on your photos.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="features-cta-section">
          <h2>Ready to get started?</h2>
          <p>Join millions of photographers who trust Shutr for sharing their work</p>
          {sessionUser ? (
            <Link to="/upload" className="btn btn-primary">Upload Your First Photo</Link>
          ) : (
            <OpenModalButton
              buttonText="Join Shutr Today"
              modalComponent={<SignupFormModal />}
              className="btn btn-primary"
            />
          )}
        </div>
      </div>
    </div>
  );
}