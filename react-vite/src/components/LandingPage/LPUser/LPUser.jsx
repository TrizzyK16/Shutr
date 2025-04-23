import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./LPUser.css";

export default function LPUser() {
    const user = useSelector(state => state.session.user);
    const [featuredPhotos, setFeaturedPhotos] = useState([]);
    const [popularGroups, setPopularGroups] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);

    // Simulate loading data
    useEffect(() => {
        // Sample data - in a real app, this would come from API calls
        setFeaturedPhotos([
            { id: 1, title: "Mountain Sunset", photographer: "Alex Rivera", likes: 342, url: "https://picsum.photos/id/29/800/600" },
            { id: 2, title: "Urban Exploration", photographer: "Jamie Chen", likes: 289, url: "https://picsum.photos/id/42/800/600" },
            { id: 3, title: "Ocean Waves", photographer: "Sam Taylor", likes: 412, url: "https://picsum.photos/id/65/800/600" },
            { id: 4, title: "Desert Journey", photographer: "Riley Johnson", likes: 198, url: "https://picsum.photos/id/87/800/600" },
            { id: 5, title: "Forest Path", photographer: "Jordan Smith", likes: 276, url: "https://picsum.photos/id/15/800/600" },
            { id: 6, title: "City Lights", photographer: "Casey Wong", likes: 321, url: "https://picsum.photos/id/28/800/600" },
        ]);

        setPopularGroups([
            { id: 1, name: "Street Photography", members: 12453, photos: 45678, thumbnail: "https://picsum.photos/id/160/300/200" },
            { id: 2, name: "Portrait Masters", members: 8765, photos: 34567, thumbnail: "https://picsum.photos/id/177/300/200" },
            { id: 3, name: "Landscape Lovers", members: 23456, photos: 98765, thumbnail: "https://picsum.photos/id/167/300/200" },
        ]);
        
        setUpcomingEvents([
            { id: 1, title: "Spring Photography Contest", date: "May 15, 2025", participants: 342, thumbnail: "https://picsum.photos/id/110/300/200" },
            { id: 2, title: "Wildlife Photography Workshop", date: "June 5, 2025", participants: 156, thumbnail: "https://picsum.photos/id/146/300/200" },
            { id: 3, title: "Urban Exploration Meetup", date: "May 28, 2025", participants: 89, thumbnail: "https://picsum.photos/id/180/300/200" },
        ]);
    }, []);

    return (
        <div className="user-dashboard">
            {/* Hero section with personalized welcome and clear CTAs */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Welcome back, {user?.username || "Photographer"}!</h1>
                    <p>What would you like to do today?</p>
                    
                    <div className="action-cards">
                        <Link to="/upload" className="action-card">
                            <div className="action-icon"><i className="fa fa-cloud-upload"></i></div>
                            <h3>Upload Photos</h3>
                            <p>Share your latest shots with the community</p>
                        </Link>
                        
                        <Link to="/albums/create" className="action-card">
                            <div className="action-icon"><i className="fa fa-book"></i></div>
                            <h3>Create Album</h3>
                            <p>Organize your photos into collections</p>
                        </Link>
                        
                        <Link to="/groups" className="action-card">
                            <div className="action-icon"><i className="fa fa-users"></i></div>
                            <h3>Join Groups</h3>
                            <p>Connect with photographers who share your interests</p>
                        </Link>
                        
                        <Link to="/explore" className="action-card">
                            <div className="action-icon"><i className="fa fa-compass"></i></div>
                            <h3>Explore</h3>
                            <p>Discover inspiring photography from around the world</p>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Discover section - Photos you might like */}
            <section className="discover-section">
                <div className="section-header">
                    <h2>Discover Photography</h2>
                    <Link to="/explore" className="view-all">View all <i className="fa fa-arrow-right"></i></Link>
                </div>
                
                <div className="photos-grid">
                    {featuredPhotos.map(photo => (
                        <div key={photo.id} className="photo-card">
                            <div className="photo-image">
                                <img src={photo.url} alt={photo.title} />
                                <div className="photo-overlay">
                                    <h3>{photo.title}</h3>
                                    <p>by {photo.photographer}</p>
                                    <div className="photo-actions">
                                        <div className="photo-action">
                                            <i className="fa fa-heart"></i>
                                            <span>{photo.likes}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Two-column layout for Groups and Events */}
            <div className="two-column-grid">
                {/* Popular Groups */}
                <section className="section-card">
                    <h2>
                        Popular Groups
                        <Link to="/groups">View all</Link>
                    </h2>
                    
                    <div className="item-list">
                        {popularGroups.map(group => (
                            <div key={group.id} className="item-card">
                                <div className="item-thumbnail">
                                    <img src={group.thumbnail} alt={group.name} />
                                </div>
                                <div className="item-content">
                                    <h3>{group.name}</h3>
                                    <p>{group.members.toLocaleString()} members • {group.photos.toLocaleString()} photos</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Upcoming Events */}
                <section className="section-card">
                    <h2>
                        Upcoming Events
                        <Link to="/events">View all</Link>
                    </h2>
                    
                    <div className="item-list">
                        {upcomingEvents.map(event => (
                            <div key={event.id} className="item-card">
                                <div className="item-thumbnail">
                                    <img src={event.thumbnail} alt={event.title} />
                                </div>
                                <div className="item-content">
                                    <h3>{event.title}</h3>
                                    <p>{event.participants} participants</p>
                                    <div className="event-date">
                                        <i className="fa fa-calendar"></i> {event.date}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Get Started Guide for newer users */}
            <section className="get-started-guide">
                <div className="section-header">
                    <h2>Get the most out of Shutr</h2>
                    <p>Complete these steps to enhance your photography experience</p>
                </div>
                
                <div className="guide-steps">
                    <div className="guide-step">
                        <div className="step-number">1</div>
                        <h3>Complete Your Profile</h3>
                        <p>Add a profile photo and bio to help others connect with you</p>
                        <div className="view-all coming-soon" onClick={() => alert('Profile editing coming soon!')}>
                            <span>Coming Soon</span> <i className="fa fa-clock-o"></i>
                        </div>
                    </div>
                    
                    <div className="guide-step">
                        <div className="step-number">2</div>
                        <h3>Upload Your First Photos</h3>
                        <p>Share your work with the Shutr community</p>
                        <Link to="/upload" className="view-all">Upload Photos</Link>
                    </div>
                    
                    <div className="guide-step">
                        <div className="step-number">3</div>
                        <h3>Join Photography Groups</h3>
                        <p>Connect with photographers who share your interests</p>
                        <Link to="/groups" className="view-all">Find Groups</Link>
                    </div>
                    
                    <div className="guide-step">
                        <div className="step-number">4</div>
                        <h3>Explore Trending Photos</h3>
                        <p>Discover and engage with popular content</p>
                        <Link to="/explore" className="view-all">Explore Trending</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}