import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFavorites } from "../../redux/favorites";
import { fetchPhotos } from "../../redux/photos";
import { fetchGroupsThunk } from "../../redux/groups";
import { fetchEventsThunk } from "../../redux/events";
import { getUserAlbums } from "../../redux/albums";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import "./YouPage.css";

// Array of different group images
const GROUP_IMAGES = [
    'https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1527525443983-6e60c75fff46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
];

// Array of different event images
const EVENT_IMAGES = [
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
];

// Array of different album cover images
const ALBUM_IMAGES = [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1520962922320-2038eebab146?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
];

export default function YouPage() {
    // Function to get a consistent image for a group based on its ID
    const getGroupImage = (id) => {
        // Convert id to number and use modulo to get an index
        const index = (typeof id === 'number' ? id : parseInt(id, 10)) % GROUP_IMAGES.length;
        // Use a default index if parsing fails
        return GROUP_IMAGES[index >= 0 ? index : 0];
    };
    
    // Function to get a consistent image for an event based on its ID
    const getEventImage = (id) => {
        // Convert id to number and use modulo to get an index
        const index = (typeof id === 'number' ? id : parseInt(id, 10)) % EVENT_IMAGES.length;
        // Use a default index if parsing fails
        return EVENT_IMAGES[index >= 0 ? index : 0];
    };
    
    // Function to get a consistent image for an album based on its ID
    const getAlbumImage = (id) => {
        // Convert id to number and use modulo to get an index
        const index = (typeof id === 'number' ? id : parseInt(id, 10)) % ALBUM_IMAGES.length;
        // Use a default index if parsing fails
        return ALBUM_IMAGES[index >= 0 ? index : 0];
    };
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const allFavorites = useSelector(state => state.favorites.allFavorites || {});
    const allPhotos = useSelector(state => Object.values(state.photos));
    const allGroups = useSelector(state => state.groups.allGroups || []);
    const allEvents = useSelector(state => state.events.allEvents || []);
    const userAlbums = useSelector(state => state.albums.userAlbums || []);
    
    // Filter for user's photos
    const userPhotos = allPhotos.filter((photo) => user && photo.user_id === user.id);

    // Filter for user's groups
    const userJoinedGroups = allGroups.filter((group) => {
        return group.members?.some((member) => member.id === user?.id);
    });

    // Filter for user's events
    const userRsvpedEvents = allEvents.filter((event) => {
        return event.attendees?.some((attendee) => attendee.id === user?.id);
    });

    useEffect(() => {
        if (user) {
            dispatch(fetchFavorites());
            dispatch(fetchPhotos());
            dispatch(fetchGroupsThunk());
            dispatch(fetchEventsThunk());
            dispatch(getUserAlbums(user.id));
        }
    }, [dispatch, user]);

    return (
        <div className="you-page">
            {/* Hero section with background image */}
            <div className="you-hero">
                <div className="you-hero__content">
                    <h1 className="you-hero__title">Welcome, {user?.username || 'Photographer'}!</h1>
                    <p className="you-hero__subtitle">Your personal Shutr dashboard</p>
                </div>
            </div>

            <div className="you-content">
                <div className="you-section">
                    <h2 className="section-title">Quick Actions</h2>
                    <div className="action-buttons-container">
                        <div className="action-buttons-row">
                            <Link to="/upload" className="action-button upload">
                                <span>Upload Photos</span>
                            </Link>
                            <Link to="/photos" className="action-button explore">
                                <span>Explore Photos</span>
                            </Link>
                            <Link to="/albums" className="action-button albums">
                                <span>View Albums</span>
                            </Link>
                        </div>
                        <div className="action-buttons-row">
                            <Link to="/groups" className="action-button groups">
                                <span>Join Groups</span>
                            </Link>
                            <Link to="/events" className="action-button events">
                                <span>Attend Events</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Tabs for different content sections */}
                <div className="dashboard-tabs">
                    <button 
                        className={`tab-button ${activeTab === 'photos' ? 'active' : ''}`}
                        onClick={() => setActiveTab('photos')}
                    >
                        Your Photos
                    </button>
                    <button 
                        className={`tab-button ${activeTab === 'favorites' ? 'active' : ''}`}
                        onClick={() => setActiveTab('favorites')}
                    >
                        Your Favorites
                    </button>
                    <button 
                        className={`tab-button ${activeTab === 'albums' ? 'active' : ''}`}
                        onClick={() => setActiveTab('albums')}
                    >
                        Your Albums
                    </button>
                    <button 
                        className={`tab-button ${activeTab === 'groups' ? 'active' : ''}`}
                        onClick={() => setActiveTab('groups')}
                    >
                        Your Groups
                    </button>
                    <button 
                        className={`tab-button ${activeTab === 'events' ? 'active' : ''}`}
                        onClick={() => setActiveTab('events')}
                    >Your Events
                    </button>
                    <button 
                        className={`tab-button ${activeTab === 'albums' ? 'active' : ''}`}
                        onClick={() => setActiveTab('albums')}
                    >
                        Your Albums
                    </button>
                </div>

                {/* Photos Tab Content */}
                {activeTab === 'photos' && (
                    <div className="you-section">
                        {userPhotos.length > 0 ? (
                            <div className="photos-grid">
                                {userPhotos.map(photo => (
                                    <div key={photo.id} className="photo-card">
                                        <div className="photo-image">
                                            <img src={photo.image_url} alt="user upload" />
                                            <FavoriteButton photoId={photo.id} />
                                        </div>
                                        <div className="photo-info">
                                            <p className="photo-caption">{photo.caption}</p>
                                            <div className="photo-meta">
                                                <span className="photo-date">{new Date(photo.created_at).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-photos-container">
                                <div className="empty-photos-icon">📷</div>
                                <h3>No Photos Yet</h3>
                                <p>You haven&apos;t uploaded any photos yet.</p>
                                <div className="quick-actions">
                                    <Link to="/photos" className="quick-action-card">
                                        <div className="quick-action-icon">📸</div>
                                        <h3>View Your Photos</h3>
                                        <p>Browse and manage your collection</p>
                                    </Link>
                                    <Link to="/favorites" className="quick-action-card">
                                        <div className="quick-action-icon">❤️</div>
                                        <h3>View Your Favorites</h3>
                                        <p>See all your favorite photos</p>
                                    </Link>
                                    <Link to="/groups" className="quick-action-card">
                                        <div className="quick-action-icon">👥</div>
                                        <h3>Join a Group</h3>
                                        <p>Connect with other photographers</p>
                                    </Link>
                                    <Link to="/events" className="quick-action-card">
                                        <div className="quick-action-icon">📅</div>
                                        <h3>Attend an Event</h3>
                                        <p>Discover photography events</p>
                                    </Link>
                                </div>
                                <p className="empty-state-description">Share your best shots with the Shutr community and get feedback from other photographers.</p>
                                <Link to="/photos/new" className="empty-state-button">Upload a Photo</Link>
                            </div>
                        )}
                        {userPhotos.length > 0 && (
                            <Link to="/photos?tab=yours" className="view-all-link">View all your photos</Link>
                        )}
                    </div>
                )}
                
                {/* Favorites Tab Content */}
                {activeTab === 'favorites' && (
                    <div className="you-section favorites-section">
                        {userFavorites.length > 0 ? (
                            <div className="favorites-grid">
                                {userFavorites.map(favorite => (
                                    <div key={favorite.id || favorite.photo_id} className="favorite-card">
                                        <div className="favorite-image">
                                            <img src={favorite.image_url} alt="favorite" />
                                            <FavoriteButton photoId={favorite.photo_id} />
                                        </div>
                                        <div className="favorite-info">
                                            <p className="favorite-caption">{favorite.caption}</p>
                                            <div className="photo-meta">
                                                <span className="photo-date">{new Date(favorite.created_at).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-favorites-container">
                                <div className="empty-favorites-icon">❤️</div>
                                <h3>No Favorites Yet</h3>
                                <p>You haven&apos;t favorited any photos yet.</p>
                                <p className="empty-state-description">Save photos you love to your favorites for easy access and inspiration.</p>
                                <Link to="/photos" className="empty-state-button">Explore Photos</Link>
                            </div>
                        )}
                        {userFavorites.length > 0 && (
                            <Link to="/photos?tab=favorites" className="view-all-link">View all your favorites</Link>
                        )}
                    </div>
                )}

                {/* Groups Tab Content */}
                {activeTab === 'groups' && (
                    <div className="you-section groups-section">
                        {userJoinedGroups.length > 0 ? (
                            <div className="groups-grid">
                                {userJoinedGroups.slice(0, 4).map(group => (
                                    <div key={group.id} className="group-card">
                                        <div className="group-image">
                                            <img src={group.image_url || GROUP_IMAGES[group.id % GROUP_IMAGES.length]} alt="group" />
                                        </div>
                                        <div className="group-info">
                                            <h3 className="group-name">{group.name}</h3>
                                            <p className="group-description">{group.description}</p>
                                            <p className="group-members">{group.member_count || 0} members</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-groups-container">
                                <div className="empty-groups-icon">👥</div>
                                <h3>No Groups Yet</h3>
                                <p>You haven&apos;t joined any photography groups yet.</p>
                                <p className="empty-state-description">Join groups to collaborate with other photographers, share tips, and participate in photo walks.</p>
                                <Link to="/groups" className="empty-state-button">Discover Groups</Link>
                            </div>
                        )}
                        {userJoinedGroups.length > 0 && (
                            <Link to="/groups?tab=my-groups" className="view-all-link">View all your groups</Link>
                        )}
                    </div>
                )}

                {/* Albums Tab Content */}
                {activeTab === 'albums' && (
                    <div className="you-section albums-section">
                        {userAlbums && userAlbums.length > 0 ? (
                            <div className="albums-grid">
                                {userAlbums.slice(0, 4).map(album => (
                                    <div key={album.id} className="album-card">
                                        <div className="album-image">
                                            <img 
                                                src={album.photos && album.photos.length > 0 ? 
                                                    allPhotos.find(p => p.id === album.photos[0])?.image_url : 
                                                    getAlbumImage(album.id)} 
                                                alt={album.title} 
                                            />
                                        </div>
                                        <div className="album-info">
                                            <h3 className="album-name">{album.title}</h3>
                                            <p className="album-description">{album.description || 'No description'}</p>
                                            <p className="album-photo-count">{album.photos ? album.photos.length : 0} photos</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-albums-container">
                                <div className="empty-albums-icon">📷</div>
                                <h3>No Albums Yet</h3>
                                <p>You haven&apos;t created any photo albums yet.</p>
                                <p className="empty-state-description">Create albums to organize your photos by theme, event, or any way you like.</p>
                                <Link to="/albums" className="empty-state-button">Create an Album</Link>
                            </div>
                        )}
                        {userAlbums && userAlbums.length > 0 && (
                            <Link to="/albums" className="view-all-link">View all your albums</Link>
                        )}
                    </div>
                )}

                {/* Events Tab Content */}
                {activeTab === 'events' && (
                    <div className="you-section events-section">
                        {userRsvpedEvents.length > 0 ? (
                            <div className="events-grid">
                                {userRsvpedEvents.slice(0, 4).map(event => (
                                    <div key={event.id} className="event-card">
                                        <div className="event-image">
                                            <img src={event.image_url || EVENT_IMAGES[event.id % EVENT_IMAGES.length]} alt="event" />
                                        </div>
                                        <div className="event-info">
                                            <h3 className="event-name">{event.name}</h3>
                                            <p className="event-date">{new Date(event.date).toLocaleDateString()}</p>
                                            <p className="event-location">{event.location}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-events-container">
                                <div className="empty-events-icon">📅</div>
                                <h3>No Events Yet</h3>
                                <p>You haven&apos;t RSVPed to any photography events yet.</p>
                                <p className="empty-state-description">RSVP to events to learn new techniques, meet other photographers, and expand your skills.</p>
                                <Link to="/events" className="empty-state-button">Find Events</Link>
                            </div>
                        )}
                        {userRsvpedEvents.length > 0 && (
                            <Link to="/events?tab=my-events" className="view-all-link">View all your events</Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}