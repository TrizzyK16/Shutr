import "./LPNUser.css"
import FooterNUser from "../../FooterNUser/FooterNUser"
import { Link } from "react-router-dom"

export default function LPNUser() {
    return (
        <div className="landing-page">
            {/* Hero section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Find your inspiration.</h1>
                    <p>Join the Shutr community, home to tens of billions of photos and 2 million groups.</p>
                    <div className="hero-buttons">
                        <Link to="/signup" className="form-button large">Start for free</Link>
                        <Link to="/login" className="form-button outline large">Sign in</Link>
                    </div>
                </div>
                <div className="hero-gallery">
                    <div className="gallery-row">
                        <img src="https://picsum.photos/id/15/600/400" alt="Nature landscape" className="gallery-img" />
                        <img src="https://picsum.photos/id/22/600/400" alt="Urban photography" className="gallery-img" />
                        <img src="https://picsum.photos/id/28/600/400" alt="Portrait photography" className="gallery-img" />
                    </div>
                    <div className="gallery-row">
                        <img src="https://picsum.photos/id/29/600/400" alt="Wildlife photography" className="gallery-img" />
                        <img src="https://picsum.photos/id/42/600/400" alt="Architectural photography" className="gallery-img" />
                        <img src="https://picsum.photos/id/65/600/400" alt="Travel photography" className="gallery-img" />
                    </div>
                </div>
            </section>

            {/* Features section */}
            <section className="features-section">
                <div className="section-header">
                    <h2>Why photographers choose Shutr</h2>
                    <p>The ideal platform for photographers to share, grow, and get inspired</p>
                </div>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">
                            📸
                        </div>
                        <h3>Showcase your work</h3>
                        <p>Display your photography portfolio in a stunning, ad-free environment designed to highlight your images.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            👥
                        </div>
                        <h3>Connect with community</h3>
                        <p>Join groups, participate in discussions, and connect with other photographers who share your interests.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            🔒
                        </div>
                        <h3>Protect your photos</h3>
                        <p>Control exactly how your photos can be used with flexible privacy settings and licensing options.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            📈
                        </div>
                        <h3>Grow your audience</h3>
                        <p>Get discovered by millions of people looking for compelling photography content every day.</p>
                    </div>
                </div>
            </section>

            {/* Showcase section */}
            <section className="showcase-section">
                <div className="showcase-content">
                    <h2>Discover extraordinary photography</h2>
                    <p>Explore millions of photos from photographers around the world</p>
                    <Link to="/explore" className="form-button">Explore now</Link>
                </div>
                <div className="showcase-gallery">
                    <div className="showcase-column">
                        <img src="https://picsum.photos/id/160/800/1200" alt="Landscape photography" />
                        <img src="https://picsum.photos/id/152/800/600" alt="Street photography" />
                    </div>
                    <div className="showcase-column">
                        <img src="https://picsum.photos/id/133/800/600" alt="Portrait photography" />
                        <img src="https://picsum.photos/id/142/800/1200" alt="Wildlife photography" />
                    </div>
                </div>
            </section>

            {/* Pro section */}
            <section className="pro-section">
                <div className="pro-content">
                    <h2>Take your photography to the next level with Shutr Pro</h2>
                    <p>Advanced stats, unlimited storage, premium features, and more</p>
                    <Link to="/shutr-pro" className="form-button">Learn about Shutr Pro</Link>
                </div>
            </section>

            {/* Community section */}
            <section className="community-section">
                <div className="section-header">
                    <h2>Join a global community</h2>
                    <p>Connect with photographers from around the world</p>
                </div>
                <div className="community-stats">
                    <div className="stat-item">
                        <span className="stat-number">2M+</span>
                        <span className="stat-label">Groups</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">100M+</span>
                        <span className="stat-label">Members</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">10B+</span>
                        <span className="stat-label">Photos</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">180+</span>
                        <span className="stat-label">Countries</span>
                    </div>
                </div>
                <div className="community-cta">
                    <Link to="/community" className="form-button">Explore communities</Link>
                </div>
            </section>

            {/* CTA section */}
            <section className="cta-section">
                <div className="cta-content">
                    <h2>Ready to share your photography with the world?</h2>
                    <p>Join Shutr today and become part of the world&apos;s largest photography community</p>
                    <Link to="/signup" className="form-button large">Get started for free</Link>
                </div>
            </section>

            {/* Footer */}
            <div className="footer">
                <FooterNUser />
            </div>
        </div>
    )
}