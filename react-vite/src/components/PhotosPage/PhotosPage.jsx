// src/components/PhotosPage/PhotosPage.jsx
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchFavorites } from '../../redux/favorites';
import PhotoList from '../PhotoList/PhotoList';
import PhotoForm from '../PhotoForm/PhotoForm';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import './PhotosPage.css';

function PhotoModal({ onClose }) {
  return (
    <div className="photo-modal">
      <h2>Upload a New Photo</h2>
      <PhotoForm 
        formType="create" 
        onSuccess={() => {
          onClose();
        }} 
      />
    </div>
  );
}

function PhotosPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector(state => state.session.user);
  const favorites = useSelector(state => state.favorites.userFavorites);
  const photos = useSelector(state => Object.values(state.photos));
  const [activeTab, setActiveTab] = useState('explore');
  
  // Handle tab parameter from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get('tab');
    if (tabParam && ['explore', 'yours', 'favorites'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [location.search]);
  
  useEffect(() => {
    if (user) {
      dispatch(fetchFavorites());
    }
  }, [dispatch, user]);

  return (
    <div className="photos-page">
      {/* Hero section with background image */}
      <div className="photos-hero">
        <div className="photos-hero__content">
          <h1 className="photos-hero__title">Shutr Photos</h1>
          <p className="photos-hero__subtitle">Discover and share incredible photography from around the world</p>
          {user && (
            <div className="photos-hero__cta">
              <OpenModalButton
                buttonText="Upload New Photo"
                modalComponent={<PhotoModal onClose={() => {}} />}
                className="hero-upload-button"
              />
            </div>
          )}
        </div>
      </div>

      <div className="photos-content">
        <div className="photos-tabs">
          <button 
            className={`tab-button ${activeTab === 'explore' ? 'active' : ''}`}
            onClick={() => setActiveTab('explore')}
          >
            Explore All Photos
          </button>
          {user && (
            <>
              <button 
                className={`tab-button ${activeTab === 'yours' ? 'active' : ''}`}
                onClick={() => setActiveTab('yours')}
              >
                Your Photos
              </button>
              <button 
                className={`tab-button ${activeTab === 'favorites' ? 'active' : ''}`}
                onClick={() => setActiveTab('favorites')}
              >
                Favorites
              </button>
            </>
          )}
        </div>

        <div className="tab-description">
          {activeTab === 'explore' ? (
            <p>Browse the latest photos shared by the Shutr community</p>
          ) : activeTab === 'yours' ? (
            <p>View and manage your personal photo collection</p>
          ) : (
            <p>Browse your favorite photos from the Shutr community</p>
          )}
        </div>

        <div className="photos-container">
          {activeTab === 'explore' ? (
            <PhotoList />
          ) : activeTab === 'yours' ? (
            user ? (
              <div className="your-photos">
                <PhotoList userOnly={true} />
              </div>
            ) : (
              <div className="login-prompt">
                <p>Please log in to view your photos</p>
              </div>
            )
          ) : (
            user ? (
              <div className="favorite-photos">
                {favorites && favorites.length > 0 ? (
                  <div className="photo-grid">
                    {favorites.map(favorite => {
                      const photo = photos.find(p => p.id === favorite.photo_id);
                      if (!photo) return null;
                      
                      return (
                        <div key={photo.id} className="photo-card">
                          <div className="photo-image">
                            <img src={photo.image_url} alt="user-upload" />
                            <FavoriteButton photoId={photo.id} />
                          </div>
                          <div className="photo-info">
                            <p className="photo-caption">{photo.caption}</p>
                            <div className="photo-meta">
                              <span className="photo-date">{new Date(photo.created_at).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="no-photos">
                    <p>You haven&apos;t added any photos to your favorites yet.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="login-prompt">
                <p>Please log in to view your favorite photos</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default PhotosPage;
