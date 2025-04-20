import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import SignupFormModal from "../SignupFormModal/SignupFormModal";
import "./ShutrProPage.css";

export default function ShutrProPage() {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className="shutr-pro-page">
      {/* Hero Section */}
      <div className="pro-hero">
        <div className="pro-hero__content">
          <h1 className="pro-hero__title">Shutr Pro</h1>
          <p className="pro-hero__subtitle">Elevate your photography with our premium features</p>
          {sessionUser ? (
            <Link to="/get-pro" className="form-button">Upgrade Now</Link>
          ) : (
            <OpenModalButton
              buttonText="Sign Up to Get Pro"
              modalComponent={<SignupFormModal />}
              className="form-button"
            />
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="pro-container">
        {/* Benefits Section */}
        <section className="pro-section">
          <h2 className="pro-section__title">Why Go Pro?</h2>
          <div className="pro-benefits">
            <div className="pro-benefit">
              <div className="pro-benefit__icon">
                <i className="fas fa-cloud"></i>
              </div>
              <h3 className="pro-benefit__title">Unlimited Storage</h3>
              <p className="pro-benefit__description">Upload as many photos as you want in full resolution. Never worry about storage limits again.</p>
            </div>

            <div className="pro-benefit">
              <div className="pro-benefit__icon">
                <i className="fas fa-star"></i>
              </div>
              <h3 className="pro-benefit__title">Ad-Free Experience</h3>
              <p className="pro-benefit__description">Enjoy Shutr without any advertisements or distractions. Focus on what matters most—your photography.</p>
            </div>

            <div className="pro-benefit">
              <div className="pro-benefit__icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3 className="pro-benefit__title">Advanced Analytics</h3>
              <p className="pro-benefit__description">Get detailed insights about your audience, engagement metrics, and photo performance.</p>
            </div>

            <div className="pro-benefit">
              <div className="pro-benefit__icon">
                <i className="fas fa-headset"></i>
              </div>
              <h3 className="pro-benefit__title">Priority Support</h3>
              <p className="pro-benefit__description">Get help from our dedicated support team whenever you need it with faster response times.</p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="pro-section pro-features-section">
          <h2 className="pro-section__title">Pro Features</h2>
          <div className="pro-features">
            <div className="pro-feature-item">
              <div className="pro-feature-item__image">
                <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80" alt="Pro Portfolio" />
              </div>
              <div className="pro-feature-item__content">
                <h3>Pro Portfolio</h3>
                <p>Create stunning customizable portfolios to showcase your best work. Choose from premium templates designed specifically for photographers.</p>
                <ul className="pro-feature-list">
                  <li>Custom domain support</li>
                  <li>Multiple portfolio layouts</li>
                  <li>Password protection options</li>
                  <li>SEO optimization tools</li>
                </ul>
              </div>
            </div>

            <div className="pro-feature-item pro-feature-item--reverse">
              <div className="pro-feature-item__content">
                <h3>Advanced Editing Tools</h3>
                <p>Access our suite of professional editing tools right in your browser. Make precise adjustments to your photos without switching between applications.</p>
                <ul className="pro-feature-list">
                  <li>Advanced color correction</li>
                  <li>Selective adjustments</li>
                  <li>Batch editing capabilities</li>
                  <li>Custom presets and filters</li>
                </ul>
              </div>
              <div className="pro-feature-item__image">
                <img src="https://images.unsplash.com/photo-1542744094-24638eff58bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Advanced Editing Tools" />
              </div>
            </div>

            <div className="pro-feature-item">
              <div className="pro-feature-item__image">
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1115&q=80" alt="Business Tools" />
              </div>
              <div className="pro-feature-item__content">
                <h3>Business Tools</h3>
                <p>Turn your passion into a business with our suite of professional tools designed for photographers who want to monetize their work.</p>
                <ul className="pro-feature-list">
                  <li>Client galleries with download options</li>
                  <li>Print selling capabilities</li>
                  <li>Licensing management</li>
                  <li>Invoicing and contracts</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="pro-section pro-pricing-section">
          <h2 className="pro-section__title">Pricing Plans</h2>
          <div className="pro-pricing">
            <div className="pro-pricing-card">
              <div className="pro-pricing-card__header">
                <h3>Monthly</h3>
                <div className="pro-pricing-card__price">
                  <span className="price">$9.99</span>
                  <span className="period">per month</span>
                </div>
              </div>
              <div className="pro-pricing-card__features">
                <ul>
                  <li><i className="fas fa-check"></i> All Pro features</li>
                  <li><i className="fas fa-check"></i> Unlimited uploads</li>
                  <li><i className="fas fa-check"></i> Ad-free experience</li>
                  <li><i className="fas fa-check"></i> Priority support</li>
                </ul>
              </div>
              <div className="pro-pricing-card__cta">
                {sessionUser ? (
                  <Link to="/get-pro?plan=monthly" className="btn btn-primary">Choose Monthly</Link>
                ) : (
                  <OpenModalButton
                    buttonText="Sign Up Now"
                    modalComponent={<SignupFormModal />}
                    className="btn btn-primary"
                  />
                )}
              </div>
            </div>

            <div className="pro-pricing-card pro-pricing-card--featured">
              <div className="pro-pricing-card__badge">Best Value</div>
              <div className="pro-pricing-card__header">
                <h3>Annual</h3>
                <div className="pro-pricing-card__price">
                  <span className="price">$7.99</span>
                  <span className="period">per month</span>
                </div>
                <div className="pro-pricing-card__savings">Save 20%</div>
              </div>
              <div className="pro-pricing-card__features">
                <ul>
                  <li><i className="fas fa-check"></i> All Pro features</li>
                  <li><i className="fas fa-check"></i> Unlimited uploads</li>
                  <li><i className="fas fa-check"></i> Ad-free experience</li>
                  <li><i className="fas fa-check"></i> Priority support</li>
                  <li><i className="fas fa-check"></i> 2 months free</li>
                </ul>
              </div>
              <div className="pro-pricing-card__cta">
                {sessionUser ? (
                  <Link to="/get-pro?plan=annual" className="btn btn-primary">Choose Annual</Link>
                ) : (
                  <OpenModalButton
                    buttonText="Sign Up Now"
                    modalComponent={<SignupFormModal />}
                    className="btn btn-primary"
                  />
                )}
              </div>
            </div>
          </div>
          <p className="pro-pricing-guarantee">30-day money-back guarantee. No questions asked.</p>
        </section>

        {/* Testimonials Section */}
        <section className="pro-section pro-testimonials-section">
          <h2 className="pro-section__title">What Pro Users Say</h2>
          <div className="pro-testimonials">
            <div className="pro-testimonial">
              <div className="pro-testimonial__content">
                <p>&quot;Upgrading to Shutr Pro was the best decision for my photography business. The advanced analytics help me understand what my audience loves, and the business tools have streamlined my client workflow.&quot;</p>
              </div>
              <div className="pro-testimonial__author">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Sarah Johnson" />
                <div>
                  <h4>Sarah Johnson</h4>
                  <p>Professional Photographer</p>
                </div>
              </div>
            </div>

            <div className="pro-testimonial">
              <div className="pro-testimonial__content">
                <p>&quot;The unlimited storage alone is worth the price. I no longer have to worry about compressing my images or running out of space. Plus, the editing tools are fantastic for quick adjustments on the go.&quot;</p>
              </div>
              <div className="pro-testimonial__author">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Michael Chen" />
                <div>
                  <h4>Michael Chen</h4>
                  <p>Landscape Photographer</p>
                </div>
              </div>
            </div>

            <div className="pro-testimonial">
              <div className="pro-testimonial__content">
                <p>&quot;As someone who&apos;s been using Shutr for years, the Pro upgrade was a game-changer. The ad-free experience and priority support make everything so much smoother. Definitely worth every penny!&quot;</p>
              </div>
              <div className="pro-testimonial__author">
                <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Emma Rodriguez" />
                <div>
                  <h4>Emma Rodriguez</h4>
                  <p>Portrait Photographer</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="pro-section pro-faq-section">
          <h2 className="pro-section__title">Frequently Asked Questions</h2>
          <div className="pro-faq">
            <div className="pro-faq-item">
              <h3>Can I cancel my subscription anytime?</h3>
              <p>Yes, you can cancel your Shutr Pro subscription at any time. If you cancel, you&apos;ll continue to have access to Pro features until the end of your billing period.</p>
            </div>

            <div className="pro-faq-item">
              <h3>What happens to my photos if I downgrade from Pro?</h3>
              <p>Your photos will remain on Shutr, but you&apos;ll be limited to the free tier&apos;s storage limit. If you exceed this limit, you won&apos;t be able to upload new photos until you&apos;re under the limit again, but no photos will be deleted.</p>
            </div>

            <div className="pro-faq-item">
              <h3>Is there a free trial for Shutr Pro?</h3>
              <p>We offer a 7-day free trial for new Pro subscribers. You can explore all Pro features during this period with no commitment.</p>
            </div>

            <div className="pro-faq-item">
              <h3>Can I switch between monthly and annual plans?</h3>
              <p>Yes, you can switch between plans at any time. If you switch from monthly to annual, you&apos;ll immediately be billed for the annual plan and receive the discount. If you switch from annual to monthly, the change will take effect at your next renewal date.</p>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="pro-cta-section">
          <h2>Ready to take your photography to the next level?</h2>
          <p>Join thousands of photographers who have upgraded to Shutr Pro and transformed their photography experience.</p>
          {sessionUser ? (
            <Link to="/get-pro" className="btn btn-primary btn-large">Upgrade to Pro Now</Link>
          ) : (
            <OpenModalButton
              buttonText="Sign Up for Shutr Pro"
              modalComponent={<SignupFormModal />}
              className="btn btn-primary btn-large"
            />
          )}
        </section>
      </div>
    </div>
  );
}