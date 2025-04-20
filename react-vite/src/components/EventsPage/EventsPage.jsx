import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchEventsThunk, rsvpEventThunk, cancelRsvpThunk } from "../../redux/events";
import { FaCalendarCheck, FaCalendarTimes, FaCalendarAlt } from "react-icons/fa";

// Array of different event images
const EVENT_IMAGES = [
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1496024840928-4c417adf211d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
];
import "./EventsPage.css";

export default function EventsPage() {
    // Function to get a consistent image for an event based on its ID
    const getEventImage = (id) => {
        // Convert id to number and use modulo to get an index
        const index = (typeof id === 'number' ? id : parseInt(id, 10)) % EVENT_IMAGES.length;
        // Use a default index if parsing fails
        return EVENT_IMAGES[index >= 0 ? index : 0];
    };
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const events = useSelector(state => state.events.allEvents || []);
    const userEvents = useSelector(state => state.events.userEvents || []);
    const [activeTab, setActiveTab] = useState('upcoming');
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState("");
    const [rsvpedEvents, setRsvpedEvents] = useState([]);
    
    // Get user's event IDs for easy checking
    const userEventIds = [...userEvents.map(event => event.id), ...rsvpedEvents];
    
    // Filter for upcoming and past events
    const currentDate = new Date();
    const upcomingEvents = events.filter(event => new Date(event.date) >= currentDate);
    const pastEvents = events.filter(event => new Date(event.date) < currentDate);
    
    useEffect(() => {
        const loadEvents = async () => {
            setLoading(true);
            await dispatch(fetchEventsThunk());
            setLoading(false);
        };
        
        if (user) {
            loadEvents();
        }
    }, [dispatch, user]);
    
    const handleRsvp = async (eventId, eventName) => {
        if (!user) {
            alert("Please log in to RSVP for events");
            return;
        }
        
        try {
            // Add to local state for immediate UI feedback
            setRsvpedEvents(prev => [...prev, eventId]);
            setSuccessMessage(`You're going to ${eventName}!`);
            
            // Clear success message after 3 seconds
            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);
            
            // Dispatch the action to Redux
            await dispatch(rsvpEventThunk(eventId));
        } catch (error) {
            console.error("Error RSVPing for event:", error);
        }
    };
    
    const handleCancelRsvp = async (eventId, eventName) => {
        try {
            // Remove from local state for immediate UI feedback
            setRsvpedEvents(prev => prev.filter(id => id !== eventId));
            setSuccessMessage(`You've canceled your RSVP to ${eventName}`);
            
            // Clear success message after 3 seconds
            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);
            
            // Dispatch the action to Redux
            await dispatch(cancelRsvpThunk(eventId));
        } catch (error) {
            console.error("Error canceling RSVP:", error);
        }
    };
    
    const formatDate = (dateString) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    
    if (!user) {
        return (
            <div className="events-page">
                <div className="events-hero">
                    <div className="events-hero__content">
                        <h1 className="events-hero__title">Shutr Events</h1>
                        <p className="events-hero__subtitle">Join photography events and meetups in your area</p>
                        <div className="login-prompt">
                            <p>Please log in to view and RSVP for events</p>
                            <Link to="/login" className="form-button">Log In</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <div className="events-page">
            {/* Hero section */}
            <div className="events-hero">
                <div className="events-hero__content">
                    <h1 className="events-hero__title">Shutr Events</h1>
                    <p className="events-hero__subtitle">Join photography events and meetups in your area</p>
                </div>
            </div>
            
            {/* Content section */}
            <div className="events-content">
                {successMessage && (
                    <div className="success-message">
                        <FaCalendarAlt className="message-icon" /> {successMessage}
                    </div>
                )}
                {/* Tabs */}
                <div className="events-tabs">
                    <button 
                        className={`form-button ${activeTab === 'upcoming' ? 'active' : 'outline'}`}
                        onClick={() => setActiveTab('upcoming')}
                    >
                        Upcoming Events
                    </button>
                    <button 
                        className={`form-button ${activeTab === 'my-events' ? 'active' : 'outline'}`}
                        onClick={() => setActiveTab('my-events')}
                    >
                        My Events
                    </button>
                    <button 
                        className={`form-button ${activeTab === 'past' ? 'active' : 'outline'}`}
                        onClick={() => setActiveTab('past')}
                    >
                        Past Events
                    </button>
                </div>
                
                {/* Loading state */}
                {loading ? (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p>Loading events...</p>
                    </div>
                ) : (
                    <>
                        {/* Upcoming events tab content */}
                        {activeTab === 'upcoming' && (
                            <div className="events-grid">
                                {upcomingEvents.length > 0 ? (
                                    upcomingEvents.map(event => (
                                        <div key={event.id} className="event-card">
                                            <div className="event-image">
                                                <img src={event.image_url || getEventImage(event.id)} alt={event.name} />
                                                {userEventIds.includes(event.id) && (
                                                    <div className="event-badge">Going</div>
                                                )}
                                            </div>
                                            <div className="event-info">
                                                <h3 className="event-name">{event.name}</h3>
                                                <p className="event-date">{formatDate(event.date)}</p>
                                                <p className="event-location">{event.location}</p>
                                                <p className="event-description">{event.description}</p>
                                                <div className="event-meta">
                                                    <span className="event-attendees">{event.attendee_count || 0} attending</span>
                                                    <span className="event-organizer">By {event.organizer_name || 'Shutr'}</span>
                                                </div>
                                                {userEventIds.includes(event.id) ? (
                                                    <button 
                                                        className="form-button outline"
                                                        onClick={() => handleCancelRsvp(event.id, event.name)}
                                                    >
                                                        <FaCalendarTimes className="button-icon" />
                                                        <span className="button-text">Cancel RSVP</span>
                                                    </button>
                                                ) : (
                                                    <button 
                                                        className="form-button"
                                                        onClick={() => handleRsvp(event.id, event.name)}
                                                    >
                                                        <FaCalendarCheck className="button-icon" />
                                                        <span className="button-text">RSVP</span>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="empty-state">
                                        <p>No upcoming events at the moment.</p>
                                        <p>Check back later for new events!</p>
                                    </div>
                                )}
                            </div>
                        )}
                        
                        {/* My Events tab content */}
                        {activeTab === 'my-events' && (
                            <div className="events-grid">
                                {userEvents.length > 0 ? (
                                    userEvents.map(event => (
                                        <div key={event.id} className="event-card">
                                            <div className="event-image">
                                                <img src={event.image_url || getEventImage(event.id)} alt={event.name} />
                                                <div className="event-badge">Going</div>
                                            </div>
                                            <div className="event-info">
                                                <h3 className="event-name">{event.name}</h3>
                                                <p className="event-date">{formatDate(event.date)}</p>
                                                <p className="event-location">{event.location}</p>
                                                <p className="event-description">{event.description}</p>
                                                <div className="event-meta">
                                                    <span className="event-attendees">{event.attendee_count || 0} attending</span>
                                                    <span className="event-organizer">By {event.organizer_name || 'Shutr'}</span>
                                                </div>
                                                {new Date(event.date) >= currentDate && (
                                                    <button 
                                                        className="form-button outline"
                                                        onClick={() => handleCancelRsvp(event.id, event.name)}
                                                    >
                                                        <FaCalendarTimes className="button-icon" />
                                                        <span className="button-text">Cancel RSVP</span>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="empty-state">
                                        <p>You haven`&apos;`t RSVP`&apos;`d to any events yet.</p>
                                        <button 
                                            className="tab-button"
                                            onClick={() => setActiveTab('upcoming')}
                                        >
                                            Explore Events
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                        
                        {/* Past events tab content */}
                        {activeTab === 'past' && (
                            <div className="events-grid">
                                {pastEvents.length > 0 ? (
                                    pastEvents.map(event => (
                                        <div key={event.id} className="event-card past-event">
                                            <div className="event-image">
                                                <img src={event.image_url || getEventImage(event.id)} alt={event.name} />
                                                <div className="event-badge past">Past</div>
                                                {userEventIds.includes(event.id) && (
                                                    <div className="event-badge attended">Attended</div>
                                                )}
                                            </div>
                                            <div className="event-info">
                                                <h3 className="event-name">{event.name}</h3>
                                                <p className="event-date">{formatDate(event.date)}</p>
                                                <p className="event-location">{event.location}</p>
                                                <p className="event-description">{event.description}</p>
                                                <div className="event-meta">
                                                    <span className="event-attendees">{event.attendee_count || 0} attended</span>
                                                    <span className="event-organizer">By {event.organizer_name || 'Shutr'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="empty-state">
                                        <p>No past events to display.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
