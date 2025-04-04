import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./GetProPage.css";

export default function GetProPage() {
    const sessionUser = useSelector(state => state.session.user);
    const navigate = useNavigate();
    const [selectedPlan, setSelectedPlan] = useState("annual");
    const [loading, setLoading] = useState(true);

    // Check if user is logged in, if not redirect to login
    useEffect(() => {
        if (!sessionUser) {
            navigate("/login");
            return;
        }
        
        // Simulate checking if user is already a Pro member
        const checkProStatus = () => {
            // This would be replaced with an actual API call
            setLoading(false);
            
            // If user is already a Pro member, redirect to ShutrPro page
            // For now, we'll assume they're not Pro members since this page is for non-Pro users
            // if (sessionUser.isPro) {
            //     navigate("/shutr-pro");
            // }
        };
        
        checkProStatus();
    }, [sessionUser, navigate]);

    const handlePlanSelection = (plan) => {
        setSelectedPlan(plan);
    };

    const handleSubscribe = () => {
        // This would be replaced with actual subscription logic
        alert(`Thank you for choosing the ${selectedPlan} plan! Processing your subscription...`);
        // After successful subscription, redirect to Shutr Pro page
        // navigate("/shutr-pro");
    };

    if (loading) {
        return (
            <div className="get-pro-loading">
                <div className="loading-spinner"></div>
                <p>Loading your personalized Pro offer...</p>
            </div>
        );
    }

    return (
        <div className="get-pro-page">
            {/* Hero Section */}
            <div className="get-pro-hero">
                <div className="get-pro-hero__content">
                    <h1 className="get-pro-hero__title">Upgrade to Shutr Pro</h1>
                    <p className="get-pro-hero__subtitle">Unlock premium features and take your photography to the next level</p>
                    <div className="get-pro-hero__user">
                        <p>Welcome, {sessionUser.username}! Choose your plan below to get started.</p>
                    </div>
                </div>
            </div>

            {/* Pricing Section */}
            <section className="get-pro-section pricing-section">
                <h2 className="get-pro-section__title">Choose Your Plan</h2>
                
                <div className="plan-toggle">
                    <button 
                        className={`plan-toggle__btn ${selectedPlan === "monthly" ? "active" : ""}`}
                        onClick={() => handlePlanSelection("monthly")}
                    >
                        Monthly
                    </button>
                    <button 
                        className={`plan-toggle__btn ${selectedPlan === "annual" ? "active" : ""}`}
                        onClick={() => handlePlanSelection("annual")}
                    >
                        Annual <span className="save-badge">Save 20%</span>
                    </button>
                </div>
                
                <div className="pricing-plans">
                    <div className="pricing-plan">
                        <div className="pricing-plan__header">
                            <h3 className="pricing-plan__title">Shutr Pro</h3>
                            <div className="pricing-plan__price">
                                {selectedPlan === "monthly" ? (
                                    <>
                                        <span className="price">$9.99</span>
                                        <span className="period">/ month</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="price">$95.88</span>
                                        <span className="period">/ year</span>
                                        <div className="price-savings">$7.99/month, save $24/year</div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="pricing-plan__features">
                            <ul>
                                <li><i className="fas fa-check"></i> Unlimited photo uploads</li>
                                <li><i className="fas fa-check"></i> Ad-free experience</li>
                                <li><i className="fas fa-check"></i> Advanced analytics</li>
                                <li><i className="fas fa-check"></i> Priority support</li>
                                <li><i className="fas fa-check"></i> Pro portfolio templates</li>
                                <li><i className="fas fa-check"></i> Advanced editing tools</li>
                                <li><i className="fas fa-check"></i> Exclusive community access</li>
                                <li><i className="fas fa-check"></i> Print shop discounts</li>
                            </ul>
                        </div>
                        <button className="pricing-plan__cta" onClick={handleSubscribe}>
                            Subscribe Now
                        </button>
                    </div>
                </div>
                
                <div className="guarantee-note">
                    <i className="fas fa-shield-alt"></i>
                    <p>30-day money-back guarantee. No questions asked.</p>
                </div>
            </section>

            {/* Benefits Comparison */}
            <section className="get-pro-section comparison-section">
                <h2 className="get-pro-section__title">Pro vs Free Comparison</h2>
                
                <div className="comparison-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Feature</th>
                                <th>Free</th>
                                <th>Pro</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Photo storage</td>
                                <td>1GB</td>
                                <td>Unlimited</td>
                            </tr>
                            <tr>
                                <td>Maximum photo resolution</td>
                                <td>12MP</td>
                                <td>Original quality</td>
                            </tr>
                            <tr>
                                <td>Advertisements</td>
                                <td>Yes</td>
                                <td>No ads</td>
                            </tr>
                            <tr>
                                <td>Analytics</td>
                                <td>Basic</td>
                                <td>Advanced</td>
                            </tr>
                            <tr>
                                <td>Customer support</td>
                                <td>Standard</td>
                                <td>Priority</td>
                            </tr>
                            <tr>
                                <td>Portfolio templates</td>
                                <td>3 basic</td>
                                <td>15+ premium</td>
                            </tr>
                            <tr>
                                <td>Editing tools</td>
                                <td>Basic</td>
                                <td>Advanced</td>
                            </tr>
                            <tr>
                                <td>Community features</td>
                                <td>Limited</td>
                                <td>Full access</td>
                            </tr>
                            <tr>
                                <td>Print shop discounts</td>
                                <td>None</td>
                                <td>Up to 25% off</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Testimonials */}
            <section className="get-pro-section testimonials-section">
                <h2 className="get-pro-section__title">What Pro Users Say</h2>
                
                <div className="testimonials">
                    <div className="testimonial">
                        <div className="testimonial__content">
                            <p>&quot;Upgrading to Shutr Pro was the best decision for my photography business. The advanced analytics help me understand what my audience loves.&quot;</p>
                        </div>
                        <div className="testimonial__author">
                            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Sarah Johnson" />
                            <div>
                                <h4>Sarah Johnson</h4>
                                <p>Professional Photographer</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="testimonial">
                        <div className="testimonial__content">
                            <p>&quot;The unlimited storage alone is worth the price. I no longer have to worry about compressing my images or running out of space.&quot;</p>
                        </div>
                        <div className="testimonial__author">
                            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Michael Chen" />
                            <div>
                                <h4>Michael Chen</h4>
                                <p>Landscape Photographer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="get-pro-section faq-section">
                <h2 className="get-pro-section__title">Frequently Asked Questions</h2>
                
                <div className="faq-items">
                    <div className="faq-item">
                        <h3>Can I cancel my subscription anytime?</h3>
                        <p>Yes, you can cancel your Shutr Pro subscription at any time. If you cancel, you&apos;ll continue to have access to Pro features until the end of your billing period.</p>
                    </div>
                    
                    <div className="faq-item">
                        <h3>What happens to my photos if I downgrade from Pro?</h3>
                        <p>Your photos will remain on Shutr, but you&apos;ll be limited to the free tier&apos;s storage limit. If you exceed this limit, you won&apos;t be able to upload new photos until you&apos;re under the limit again, but no photos will be deleted.</p>
                    </div>
                    
                    <div className="faq-item">
                        <h3>Is there a free trial for Shutr Pro?</h3>
                        <p>We offer a 7-day free trial for new Pro subscribers. You can explore all Pro features during this period with no commitment.</p>
                    </div>
                    
                    <div className="faq-item">
                        <h3>Can I switch between monthly and annual plans?</h3>
                        <p>Yes, you can switch between plans at any time. If you switch from monthly to annual, you&apos;ll immediately be billed for the annual plan and receive the discount. If you switch from annual to monthly, the change will take effect at your next renewal date.</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="get-pro-section cta-section">
                <div className="cta-content">
                    <h2>Ready to elevate your photography experience?</h2>
                    <p>Join thousands of photographers who have already upgraded to Shutr Pro.</p>
                    <button className="cta-button" onClick={handleSubscribe}>
                        Upgrade to Pro Now
                    </button>
                    <p className="cta-guarantee">30-day money-back guarantee</p>
                </div>
            </section>
        </div>
    );
}