import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFavorites } from "../../redux/favorites";
import { fetchPhotos } from "../../redux/photos";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import "./YouPage.css";

export default function YouPage() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const favorites = useSelector(state => state.favorites.userFavorites);
    const photos = useSelector(state => Object.values(state.photos));
    
    useEffect(() => {
        if (user) {
            dispatch(fetchFavorites());
            dispatch(fetchPhotos());
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
                    <div className="action-buttons">
                        <Link to="/upload" className="action-button upload">
                            <span>Upload Photos</span>
                        </Link>
                        <Link to="/photos" className="action-button explore">
                            <span>Explore Photos</span>
                        </Link>
                    </div>
                </div>

                <div className="you-section">
                    <h2 className="section-title">Your Photos</h2>
                    <div className="activity-placeholder">
                        <p>Your recent photos will appear here.</p>
                        <Link to="/photos?tab=yours" className="view-all-link">View all your photos</Link>
                    </div>
                </div>
                
                <div className="you-section favorites-section">
                    <h2 className="section-title">Your Favorites</h2>
                    {favorites && favorites.length > 0 ? (
                        <div className="favorites-grid">
                            {favorites.slice(0, 4).map(favorite => {
                                const photo = photos.find(p => p.id === favorite.photo_id);
                                if (!photo) return null;
                                
                                return (
                                    <div key={photo.id} className="favorite-card">
                                        <div className="favorite-image">
                                            <img src={photo.image_url} alt="favorite" />
                                            <FavoriteButton photoId={photo.id} />
                                        </div>
                                        <div className="favorite-info">
                                            <p className="favorite-caption">{photo.caption}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="activity-placeholder">
                            <p>You haven&apos;t added any photos to your favorites yet.</p>
                            <Link to="/photos" className="view-all-link">Explore photos to add favorites</Link>
                        </div>
                    )}
                    {favorites && favorites.length > 0 && (
                        <Link to="/photos?tab=favorites" className="view-all-link">View all your favorites</Link>
                    )}
                </div>
            </div>
        </div>
    );
}