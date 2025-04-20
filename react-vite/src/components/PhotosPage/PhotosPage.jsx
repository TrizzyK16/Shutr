import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchFavorites } from '../../redux/favorites';
import { fetchPhotos } from '../../redux/photos';
import PhotoList from '../PhotoList/PhotoList';
import PhotoForm from '../PhotoForm/PhotoForm';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import { useModal } from '../../context/Modal';
// import DeletePhotoButton from '../PhotoList/DeletePhotoButton';
import './PhotosPage.css';

function PhotoModal() {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  
  const handleSuccess = () => {
    // Refresh photos after successful upload
    dispatch(fetchPhotos());
    closeModal();
  };
  
  return (
    <div className="photo-modal">
      <h2>Upload a New Photo</h2>
      <PhotoForm 
        formType="create" 
        onSuccess={handleSuccess} 
      />
    </div>
  );
}

function PhotosPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector(state => state.session.user);
  const userId = user?.id;
  const allFavorites = useSelector(state => state.favorites.allFavorites);
  const photos = useSelector(state => Object.values(state.photos));
  const [activeTab, setActiveTab] = useState('explore');
  const [error, setError] = useState(null);
  
  // Get all photo IDs that are favorited
  const favoritePhotoIds = Object.keys(allFavorites || {});
  
  // Filter photos to only show favorited ones
  const favoritePhotos = photos.filter(photo => 
    favoritePhotoIds.includes(String(photo.id))
  );
  
  // Handle tab parameter from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get('tab');
    if (tabParam && ['explore', 'yours', 'favorites'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [location.search]);
  
  // Fetch favorites when user logs in
  useEffect(() => {
    if (userId) {
      dispatch(fetchFavorites())
        .catch(err => setError(err.message));
    }
  }, [dispatch, userId]);

  // Handle URL tab changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab') || 'explore';
    setActiveTab(tab);
  }, [location.search]);

  // Display error if there is one
  if (error) {
    return (
      <div className="error-message">
        <p>Error: {error}</p>
      </div>
    );
  }

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
                modalComponent={<PhotoModal />}
                className="hero-upload-button"
                onModalClose={() => dispatch(fetchPhotos())}
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
                {favoritePhotos.length > 0 ? (
                  <div className="photo-grid">
                    {favoritePhotos.map(photo => (
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
                    ))}
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