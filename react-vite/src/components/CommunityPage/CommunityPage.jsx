import { useState } from "react";
import "./CommunityPage.css";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import SignupFormModal from "../SignupFormModal/SignupFormModal";

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("groups");

  // Sample data for community groups
  const groups = [
    {
      id: 1,
      name: "Landscape Photographers",
      members: 15432,
      photos: 45678,
      description: "A community for landscape photographers to share their work and techniques.",
      thumbnail: "https://picsum.photos/id/10/300/200"
    },
    {
      id: 2,
      name: "Street Photography",
      members: 8765,
      photos: 32456,
      description: "Capturing life on the streets around the world.",
      thumbnail: "https://picsum.photos/id/20/300/200"
    },
    {
      id: 3,
      name: "Portrait Masters",
      members: 12543,
      photos: 28976,
      description: "Dedicated to the art of portrait photography.",
      thumbnail: "https://picsum.photos/id/30/300/200"
    },
    {
      id: 4,
      name: "Wildlife Enthusiasts",
      members: 9876,
      photos: 34567,
      description: "Sharing the beauty of wildlife through photography.",
      thumbnail: "https://picsum.photos/id/40/300/200"
    }
  ];

  // Sample data for events
  const events = [
    {
      id: 1,
      title: "Annual Photography Contest",
      date: "April 15, 2025",
      location: "Online",
      description: "Submit your best shots for a chance to win prizes and recognition.",
      thumbnail: "https://picsum.photos/id/50/300/200"
    },
    {
      id: 2,
      title: "Photography Workshop",
      date: "May 10, 2025",
      location: "New York, NY",
      description: "Learn advanced techniques from professional photographers.",
      thumbnail: "https://picsum.photos/id/60/300/200"
    },
    {
      id: 3,
      title: "Photo Walk: Urban Exploration",
      date: "June 5, 2025",
      location: "Chicago, IL",
      description: "Join fellow photographers for a guided photo walk through the city.",
      thumbnail: "https://picsum.photos/id/70/300/200"
    }
  ];

  // Sample data for forums
  const forums = [
    {
      id: 1,
      title: "Camera Gear Discussion",
      posts: 1245,
      lastActive: "2 hours ago",
      description: "Discuss the latest camera gear and accessories."
    },
    {
      id: 2,
      title: "Post-Processing Techniques",
      posts: 987,
      lastActive: "5 hours ago",
      description: "Share your editing workflows and techniques."
    },
    {
      id: 3,
      title: "Photography Business Tips",
      posts: 654,
      lastActive: "1 day ago",
      description: "Advice for professional photographers and those starting a photography business."
    },
    {
      id: 4,
      title: "Travel Photography",
      posts: 1432,
      lastActive: "3 hours ago",
      description: "Tips and stories from photographers around the world."
    }
  ];

  return (
    <div className="community-page">
      <div className="community-hero">
        <div className="community-hero__content">
          <h1 className="community-hero__title">Join the Shutr Community</h1>
          <p className="community-hero__description">
            Connect with millions of photographers, join groups based on your interests, 
            participate in events, and engage in discussions about all things photography.
          </p>
          <button className="form-button">Explore Groups</button>
        </div>
      </div>

      <div className="community-tabs">
        <button 
          className={`community-tabs__tab ${activeTab === "groups" ? "active" : ""}`}
          onClick={() => setActiveTab("groups")}
        >
          Groups
        </button>
        <button 
          className={`community-tabs__tab ${activeTab === "events" ? "active" : ""}`}
          onClick={() => setActiveTab("events")}
        >
          Events
        </button>
        <button 
          className={`community-tabs__tab ${activeTab === "forums" ? "active" : ""}`}
          onClick={() => setActiveTab("forums")}
        >
          Forums
        </button>
      </div>

      <div className="community-content">
        {activeTab === "groups" && (
          <div className="community-groups">
            <div className="community-section-header">
              <h2>Popular Photography Groups</h2>
              <button className="form-button text">Create a Group</button>
            </div>
            <div className="community-groups__grid">
              {groups.map(group => (
                <div key={group.id} className="community-group-card">
                  <div className="community-group-card__image">
                    <img src={group.thumbnail} alt={group.name} />
                  </div>
                  <div className="community-group-card__content">
                    <h3>{group.name}</h3>
                    <div className="community-group-card__stats">
                      <span>{group.members} members</span>
                      <span>{group.photos} photos</span>
                    </div>
                    <p>{group.description}</p>
                    <button className="form-button secondary">Join Group</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="community-more">
              <button className="form-button text">View All Groups</button>
            </div>
          </div>
        )}

        {activeTab === "events" && (
          <div className="community-events">
            <div className="community-section-header">
              <h2>Upcoming Photography Events</h2>
              <button className="form-button text">Create an Event</button>
            </div>
            <div className="community-events__list">
              {events.map(event => (
                <div key={event.id} className="community-event-card">
                  <div className="community-event-card__image">
                    <img src={event.thumbnail} alt={event.title} />
                  </div>
                  <div className="community-event-card__content">
                    <h3>{event.title}</h3>
                    <div className="community-event-card__details">
                      <div className="community-event-card__date">
                        <i className="fa fa-calendar"></i>
                        <span>{event.date}</span>
                      </div>
                      <div className="community-event-card__location">
                        <i className="fa fa-map-marker"></i>
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <p>{event.description}</p>
                    <button className="form-button">RSVP</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="community-more">
              <button className="form-button text">View All Events</button>
            </div>
          </div>
        )}

        {activeTab === "forums" && (
          <div className="community-forums">
            <div className="community-section-header">
              <h2>Photography Discussion Forums</h2>
              <button className="form-button text">Start a Discussion</button>
            </div>
            <div className="community-forums__list">
              {forums.map(forum => (
                <div key={forum.id} className="community-forum-card">
                  <div className="community-forum-card__content">
                    <h3>{forum.title}</h3>
                    <p>{forum.description}</p>
                    <div className="community-forum-card__stats">
                      <span>{forum.posts} posts</span>
                      <span>Last active: {forum.lastActive}</span>
                    </div>
                  </div>
                  <div className="community-forum-card__action">
                    <button className="form-button">View Forum</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="community-more">
              <button className="form-button text">View All Forums</button>
            </div>
          </div>
        )}
      </div>

      <div className="community-cta">
        <div className="community-cta__content">
          <h2>Share Your Photography Journey</h2>
          <p>Join millions of photographers on Shutr to share your work, learn new techniques, and connect with like-minded creatives.</p>
          <OpenModalButton
            modalComponent={<SignupFormModal />}
            buttonText="Join Shutr Today"
            className="form-button"
          />
        </div>
      </div>
    </div>
  );
}