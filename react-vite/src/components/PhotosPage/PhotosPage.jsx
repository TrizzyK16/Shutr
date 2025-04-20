import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { fetchFavorites } from '../../redux/favorites';
import { fetchPhotos } from '../../redux/photos';
import PhotoList from '../PhotoList/PhotoList';
import PhotoForm from '../PhotoForm/PhotoForm';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import AddToAlbumButton from '../PhotoList/AddToAlbumButton';
import DeletePhotoButton from '../PhotoList/DeletePhotoButton';
import { useModal } from '../../context/Modal';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
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
  const [serverStatus, setServerStatus] = useState('ok'); // 'ok', 'warning', 'error'
  
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
        .catch(err => {
          console.error('Error fetching favorites:', err);
          setError(err.message);
          if (err.message && err.message.includes('500')) {
            setServerStatus('error');
          }
        });
    }
  }, [dispatch, userId]);

  // Handle URL tab changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab') || 'explore';
    setActiveTab(tab);
  }, [location.search]);

  // Display error if there is one
  if (error && serverStatus === 'error') {
    return (
      <div className="photos-page">
        <div className="photos-hero">
          <div className="photos-hero__content">
            <h1 className="photos-hero__title">Shutr Photos</h1>
            <p className="photos-hero__subtitle">Discover and share incredible photography from around the world</p>
          </div>
        </div>
        
        <div className="photos-content">
          <div className="server-error-container">
            <h2>Server Temporarily Unavailable</h2>
            <p>We're experiencing some technical difficulties with our servers. This is likely a temporary issue.</p>
            <p>Please try again later or refresh the page to see if the issue has been resolved.</p>
            <button onClick={() => window.location.reload()} className="refresh-button">
              Refresh Page
            </button>
          </div>
        </div>
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
                <OpenModalButton
                  buttonText="Login Here"
                  modalComponent={<LoginFormModal />}
                  className="login-here-button"
                />
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
                          <p className="photo-caption">{photo.caption || 'No caption'}</p>
                          {photo.user_id === userId && (
                            <div className="photo-actions">
                              <Link to={`/photos/${photo.id}/edit`} className="edit-link">Update</Link>
                              <DeletePhotoButton photoId={photo.id} />
                              <OpenModalButton
                                buttonText="Add to Album"
                                modalComponent={<AddToAlbumButton photoId={photo.id} />}
                                className="add-to-album-btn"
                              />
                            </div>
                          )}
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
                <OpenModalButton
                  buttonText="Login Here"
                  modalComponent={<LoginFormModal />}
                  className="login-here-button"
                />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default PhotosPage;