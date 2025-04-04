import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./LPUser.css";

export default function LPUser() {
    const user = useSelector(state => state.session.user);
    const [featuredPhotos, setFeaturedPhotos] = useState([]);
    const [recentActivity, setRecentActivity] = useState([]);
    const [suggestedGroups, setSuggestedGroups] = useState([]);

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

        setRecentActivity([
            { id: 1, type: "comment", user: "Maria Lopez", content: "Beautiful composition!", time: "2 hours ago", photoUrl: "https://picsum.photos/id/22/100/100" },
            { id: 2, type: "like", user: "Chris Johnson", content: "liked your photo", time: "3 hours ago", photoUrl: "https://picsum.photos/id/64/100/100" },
            { id: 3, type: "group", user: "Wildlife Photography", content: "New discussion: Best telephoto lenses", time: "5 hours ago" },
            { id: 4, type: "comment", user: "Tasha Williams", content: "Great lighting in this shot!", time: "Yesterday", photoUrl: "https://picsum.photos/id/91/100/100" },
        ]);

        setSuggestedGroups([
            { id: 1, name: "Street Photography", members: 12453, photos: 45678, thumbnail: "https://picsum.photos/id/160/300/200" },
            { id: 2, name: "Portrait Masters", members: 8765, photos: 34567, thumbnail: "https://picsum.photos/id/177/300/200" },
            { id: 3, name: "Landscape Lovers", members: 23456, photos: 98765, thumbnail: "https://picsum.photos/id/167/300/200" },
        ]);
    }, []);

    return (
        <div className="user-dashboard">
            {/* Welcome section */}
            <section className="welcome-section">
                <div className="welcome-content">
                    <h1>Welcome back, {user?.username || "Photographer"}!</h1>
                    <p>Continue exploring amazing photography or share your latest work</p>
                    <div className="welcome-actions">
                        <Link to="/upload" className="form-button">Upload Photos</Link>
                        <Link to="/explore" className="form-button outline">Explore</Link>
                    </div>
                </div>
            </section>

            {/* Main dashboard grid */}
            <div className="dashboard-grid">
                {/* Left column - Activity feed */}
                <section className="activity-feed">
                    <div className="section-header">
                        <h2>Recent Activity</h2>
                        <Link to="/notifications" className="view-all">View all</Link>
                    </div>
                    <div className="activity-list">
                        {recentActivity.map(activity => (
                            <div key={activity.id} className="activity-item">
                                {activity.photoUrl && (
                                    <div className="activity-thumbnail">
                                        <img src={activity.photoUrl} alt="" />
                                    </div>
                                )}
                                <div className="activity-content">
                                    <p>
                                        <strong>{activity.user}</strong> {activity.content}
                                    </p>
                                    <span className="activity-time">{activity.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Right column - Stats and suggestions */}
                <section className="user-stats">
                    <div className="stats-card">
                        <h3>Your Stats</h3>
                        <div className="stats-grid">
                            <div className="stat-box">
                                <span className="stat-number">127</span>
                                <span className="stat-label">Photos</span>
                            </div>
                            <div className="stat-box">
                                <span className="stat-number">4.2K</span>
                                <span className="stat-label">Followers</span>
                            </div>
                            <div className="stat-box">
                                <span className="stat-number">15</span>
                                <span className="stat-label">Groups</span>
                            </div>
                            <div className="stat-box">
                                <span className="stat-number">8.7K</span>
                                <span className="stat-label">Views</span>
                            </div>
                        </div>
                    </div>

                    <div className="suggested-groups">
                        <div className="section-header">
                            <h3>Suggested Groups</h3>
                            <Link to="/groups/discover" className="view-all">View all</Link>
                        </div>
                        <div className="groups-list">
                            {suggestedGroups.map(group => (
                                <div key={group.id} className="group-card">
                                    <div className="group-thumbnail">
                                        <img src={group.thumbnail} alt={group.name} />
                                    </div>
                                    <div className="group-info">
                                        <h4>{group.name}</h4>
                                        <p>{group.members.toLocaleString()} members</p>
                                    </div>
                                    <button className="form-button small">Join</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            {/* Featured photos section */}
            <section className="featured-photos">
                <div className="section-header">
                    <h2>Photos You Might Like</h2>
                    <Link to="/explore" className="view-all">View all</Link>
                </div>
                <div className="photos-grid">
                    {featuredPhotos.map(photo => (
                        <div key={photo.id} className="photo-card">
                            <div className="photo-image">
                                <img src={photo.url} alt={photo.title} />
                            </div>
                            <div className="photo-info">
                                <h3>{photo.title}</h3>
                                <p>by {photo.photographer}</p>
                                <div className="photo-stats">
                                    <span><i className="fa fa-heart"></i> {photo.likes}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}