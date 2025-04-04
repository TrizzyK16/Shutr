import { Link } from "react-router-dom";
import "./TheAppsPage.css";

export default function TheAppsPage() {
  return (
    <div className="apps-page">
      {/* Hero Section */}
      <section className="apps-hero">
        <div className="apps-hero__content">
          <h1 className="apps-hero__title">Shutr Everywhere You Go</h1>
          <p className="apps-hero__subtitle">
            Capture, edit, and share your moments across all your devices with our
            seamless cross-platform experience.
          </p>
          <div className="apps-hero__cta">
            <a href="#mobile" className="btn btn-primary btn-large">
              Get Mobile App
            </a>
            <a href="#desktop" className="btn btn-outline btn-large">
              Download Desktop
            </a>
          </div>
        </div>
        <div className="apps-hero__image">
          <img
            src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            alt="Shutr across devices"
          />
        </div>
      </section>

      {/* Mobile Apps Section */}
      <section id="mobile" className="apps-section apps-mobile-section">
        <div className="apps-container">
          <h2 className="apps-section__title">Shutr Mobile</h2>
          <p className="apps-section__subtitle">
            Take Shutr with you wherever you go. Our mobile apps are designed for
            speed, simplicity, and stunning photography.
          </p>

          <div className="apps-platforms">
            <div className="apps-platform-card">
              <div className="apps-platform-card__icon">
                <i className="fab fa-apple"></i>
              </div>
              <h3 className="apps-platform-card__title">iOS App</h3>
              <p className="apps-platform-card__description">
                Optimized for iPhone and iPad with native iOS features including
                widgets, shortcuts, and iCloud sync.
              </p>
              <ul className="apps-feature-list">
                <li>Live Photos support</li>
                <li>ProRAW editing</li>
                <li>iCloud Photo Library integration</li>
                <li>Siri shortcuts</li>
                <li>Home screen widgets</li>
              </ul>
              <div className="apps-platform-card__cta">
                <a
                  href="https://apps.apple.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Download on App Store
                </a>
              </div>
              <div className="apps-platform-card__requirements">
                Requires iOS 14.0 or later
              </div>
            </div>

            <div className="apps-platform-card">
              <div className="apps-platform-card__icon">
                <i className="fab fa-android"></i>
              </div>
              <h3 className="apps-platform-card__title">Android App</h3>
              <p className="apps-platform-card__description">
                Built for Android with Material Design and support for the latest
                Android features and camera capabilities.
              </p>
              <ul className="apps-feature-list">
                <li>RAW capture and editing</li>
                <li>Google Photos integration</li>
                <li>Material You theming</li>
                <li>Quick settings tile</li>
                <li>Home screen widgets</li>
              </ul>
              <div className="apps-platform-card__cta">
                <a
                  href="https://play.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Get on Google Play
                </a>
              </div>
              <div className="apps-platform-card__requirements">
                Requires Android 8.0 or higher
              </div>
            </div>
          </div>

          <div className="apps-mobile-showcase">
            <div className="apps-mobile-showcase__content">
              <h3>Powerful Mobile Editing</h3>
              <p>
                Edit your photos on the go with our professional-grade tools.
                From basic adjustments to advanced filters and effects, Shutr
                mobile puts the power of a photo studio in your pocket.
              </p>
              <ul className="apps-feature-list">
                <li>Advanced color grading</li>
                <li>AI-powered enhancements</li>
                <li>Selective editing</li>
                <li>Custom presets and filters</li>
              </ul>
            </div>
            <div className="apps-mobile-showcase__image">
              <img
                src="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
                alt="Shutr mobile editing"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Desktop Apps Section */}
      <section id="desktop" className="apps-section apps-desktop-section">
        <div className="apps-container">
          <h2 className="apps-section__title">Shutr Desktop</h2>
          <p className="apps-section__subtitle">
            Professional-grade photo management and editing for your computer.
            Perfect for photographers who demand the best tools for their workflow.
          </p>

          <div className="apps-platforms">
            <div className="apps-platform-card">
              <div className="apps-platform-card__icon">
                <i className="fab fa-windows"></i>
              </div>
              <h3 className="apps-platform-card__title">Windows</h3>
              <p className="apps-platform-card__description">
                Optimized for Windows 10/11 with native integration and high
                performance on modern hardware.
              </p>
              <ul className="apps-feature-list">
                <li>GPU-accelerated editing</li>
                <li>Windows Hello authentication</li>
                <li>Touch and pen support</li>
                <li>Multiple monitor support</li>
                <li>Dark mode</li>
              </ul>
              <div className="apps-platform-card__cta">
                <a href="#" className="btn btn-primary">
                  Download for Windows
                </a>
              </div>
              <div className="apps-platform-card__requirements">
                Windows 10 or later (64-bit)
              </div>
            </div>

            <div className="apps-platform-card">
              <div className="apps-platform-card__icon">
                <i className="fab fa-apple"></i>
              </div>
              <h3 className="apps-platform-card__title">macOS</h3>
              <p className="apps-platform-card__description">
                Built for macOS with native Apple Silicon support and seamless
                integration with the Apple ecosystem.
              </p>
              <ul className="apps-feature-list">
                <li>Apple Silicon optimized</li>
                <li>Continuity Camera support</li>
                <li>TouchBar controls</li>
                <li>iCloud sync</li>
                <li>Universal app</li>
              </ul>
              <div className="apps-platform-card__cta">
                <a href="#" className="btn btn-primary">
                  Download for Mac
                </a>
              </div>
              <div className="apps-platform-card__requirements">
                macOS 11.0 Big Sur or later
              </div>
            </div>

            <div className="apps-platform-card">
              <div className="apps-platform-card__icon">
                <i className="fab fa-linux"></i>
              </div>
              <h3 className="apps-platform-card__title">Linux</h3>
              <p className="apps-platform-card__description">
                Available for major Linux distributions with support for various
                desktop environments.
              </p>
              <ul className="apps-feature-list">
                <li>AppImage, DEB, and RPM packages</li>
                <li>Wayland and X11 support</li>
                <li>Hardware acceleration</li>
                <li>GNOME and KDE integration</li>
                <li>Flatpak available</li>
              </ul>
              <div className="apps-platform-card__cta">
                <a href="#" className="btn btn-primary">
                  Download for Linux
                </a>
              </div>
              <div className="apps-platform-card__requirements">
                Ubuntu 20.04, Fedora 34, or equivalent
              </div>
            </div>
          </div>

          <div className="apps-desktop-showcase">
            <div className="apps-desktop-showcase__image">
              <img
                src="https://images.unsplash.com/photo-1561883088-039e53143d73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Shutr desktop interface"
              />
            </div>
            <div className="apps-desktop-showcase__content">
              <h3>Professional Workflow</h3>
              <p>
                Shutr Desktop is built for professional photographers and serious
                enthusiasts. Our desktop apps provide powerful organization tools,
                advanced editing capabilities, and seamless integration with your
                existing workflow.
              </p>
              <ul className="apps-feature-list">
                <li>Catalog and asset management</li>
                <li>Non-destructive editing</li>
                <li>Batch processing</li>
                <li>Plugin support</li>
                <li>Tethered shooting</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sync Section */}
      <section className="apps-section apps-sync-section">
        <div className="apps-container">
          <div className="apps-sync-content">
            <h2 className="apps-section__title">Seamless Sync</h2>
            <p className="apps-section__subtitle">
              Your photos, edits, and collections stay in sync across all your
              devices. Start editing on your phone and finish on your desktop
              without missing a beat.
            </p>

            <div className="apps-sync-features">
              <div className="apps-sync-feature">
                <div className="apps-sync-feature__icon">
                  <i className="fas fa-cloud"></i>
                </div>
                <h3>Cloud Storage</h3>
                <p>
                  All your photos are securely stored in the cloud and available on
                  any device. Never worry about losing your precious memories.
                </p>
              </div>

              <div className="apps-sync-feature">
                <div className="apps-sync-feature__icon">
                  <i className="fas fa-edit"></i>
                </div>
                <h3>Edit Anywhere</h3>
                <p>
                  Your edits sync automatically. Start on mobile and continue on
                  desktop with all your adjustments intact.
                </p>
              </div>

              <div className="apps-sync-feature">
                <div className="apps-sync-feature__icon">
                  <i className="fas fa-share-alt"></i>
                </div>
                <h3>Share Instantly</h3>
                <p>
                  Share your photos to social media, create galleries, or send
                  direct links from any device with just a few taps.
                </p>
              </div>

              <div className="apps-sync-feature">
                <div className="apps-sync-feature__icon">
                  <i className="fas fa-users"></i>
                </div>
                <h3>Collaborate</h3>
                <p>
                  Work on shared albums and projects with friends, family, or
                  clients across any platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="apps-cta-section">
        <div className="apps-container">
          <div className="apps-cta-content">
            <h2>Ready to Experience Shutr?</h2>
            <p>
              Download our apps today and start your photography journey with
              Shutr. Available on all major platforms.
            </p>
            <div className="apps-cta-buttons">
              <a href="#mobile" className="btn btn-primary btn-large">
                Get Mobile Apps
              </a>
              <a href="#desktop" className="btn btn-outline btn-large">
                Download Desktop
              </a>
              <Link to="/features" className="btn btn-text btn-large">
                Explore Features
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}