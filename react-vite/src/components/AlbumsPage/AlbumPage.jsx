import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserAlbums, createAlbum, editAlbum, deleteAlbum, addPhotosToAlbum, removePhotoFromAlbumThunk } from '../../redux/albums';
import { fetchPhotos } from '../../redux/photos';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import { useModal } from '../../context/Modal';
import './AlbumPage.css';

// Modal component for creating a new album
function CreateAlbumModal({ onClose, onSuccess }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    const albumData = {
      title,
      description
    };
    
    try {
      const result = await dispatch(createAlbum(albumData));
      if (result.errors) {
        setErrors(result.errors);
      } else {
        if (onSuccess) onSuccess();
        closeModal();
      }
    } catch (error) {
      console.error('Error creating album:', error);
      setErrors({ general: 'Failed to create album. Please try again.' });
    }
  };

  return (
    <div className="album-modal">
      <h2>Create New Album</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Album Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter album title"
          />
          {errors.title && <p className="error">{errors.title}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description (Optional)</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter album description"
            rows="4"
          />
        </div>
        
        <div className="form-actions">
          <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
          <button type="submit" className="submit-button">Create Album</button>
        </div>
      </form>
    </div>
  );
}

// Modal component for editing an album
function EditAlbumModal({ album, onClose, onSuccess }) {
  const [title, setTitle] = useState(album.title);
  const [description, setDescription] = useState(album.description || '');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    const albumData = {
      title,
      description
    };
    
    try {
      const result = await dispatch(editAlbum(album.id, albumData));
      if (result.errors) {
        setErrors(result.errors);
      } else {
        if (onSuccess) onSuccess();
        closeModal();
      }
    } catch (error) {
      console.error('Error updating album:', error);
      setErrors({ general: 'Failed to update album. Please try again.' });
    }
  };

  return (
    <div className="album-modal">
      <h2>Edit Album</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Album Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter album title"
          />
          {errors.title && <p className="error">{errors.title}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description (Optional)</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter album description"
            rows="4"
          />
        </div>
        
        <div className="form-actions">
          <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
          <button type="submit" className="submit-button">Save Changes</button>
        </div>
      </form>
    </div>
  );
}

// Modal component for adding photos to an album
function AddPhotosModal({ album, onClose, onSuccess }) {
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [errors, setErrors] = useState(null);
  const dispatch = useDispatch();
  const allPhotos = useSelector(state => state.photos);
  const user = useSelector(state => state.session.user);
  const { closeModal } = useModal();
  
  // Filter out photos that are already in the album
  const availablePhotos = Object.values(allPhotos).filter(photo => 
    photo.userId === user.id && !album.photos.includes(photo.id)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (selectedPhotos.length === 0) {
      setErrors('Please select at least one photo');
      return;
    }
    
    try {
      const result = await dispatch(addPhotosToAlbum(album.id, selectedPhotos));
      if (result.errors) {
        setErrors(result.errors);
      } else {
        if (onSuccess) onSuccess();
        closeModal();
      }
    } catch (error) {
      console.error('Error adding photos to album:', error);
      setErrors('Failed to add photos. Please try again.');
    }
  };

  const togglePhotoSelection = (photoId) => {
    if (selectedPhotos.includes(photoId)) {
      setSelectedPhotos(selectedPhotos.filter(id => id !== photoId));
    } else {
      setSelectedPhotos([...selectedPhotos, photoId]);
    }
  };

  return (
    <div className="album-modal photo-selection-modal">
      <h2>Add Photos to Album</h2>
      {errors && <p className="error">{errors}</p>}
      
      {availablePhotos.length === 0 ? (
        <p className="no-photos-message">You don&apost have any additional photos to add to this album.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="photo-selection-grid">
            {availablePhotos.map(photo => (
              <div 
                key={photo.id} 
                className={`selectable-photo ${selectedPhotos.includes(photo.id) ? 'selected' : ''}`}
                onClick={() => togglePhotoSelection(photo.id)}
              >
                <img src={photo.image_url} alt={photo.caption || 'Photo'} />
                {selectedPhotos.includes(photo.id) && (
                  <div className="selected-indicator">
                    <i className="fas fa-check"></i>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
            <button 
              type="submit" 
              className="submit-button" 
              disabled={selectedPhotos.length === 0}
            >
              Add Selected Photos
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

// Main AlbumPage component
function AlbumPage() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const albums = useSelector(state => state.albums.userAlbums);
  const photos = useSelector(state => state.photos);
  const [activeAlbum, setActiveAlbum] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch user's albums and photos when component mounts
  useEffect(() => {
    if (user) {
      setIsLoading(true);
      Promise.all([
        dispatch(getUserAlbums(user.id)),
        dispatch(fetchPhotos())
      ])
        .then(() => setIsLoading(false))
        .catch((err) => {
          console.error('Error loading data:', err);
          setError('Failed to load albums or photos');
          setIsLoading(false);
        });
    }
  }, [dispatch, user]);
  
  // Handle album deletion
  const handleDeleteAlbum = async (albumId) => {
    if (window.confirm('Are you sure you want to delete this album? This action cannot be undone.')) {
      try {
        const result = await dispatch(deleteAlbum(albumId));
        if (result.success) {
          if (activeAlbum && activeAlbum.id === albumId) {
            setActiveAlbum(null);
          }
        } else {
          setError('Failed to delete album: ' + (result.errors ? result.errors.join(', ') : 'Unknown error'));
        }
      } catch (err) {
        console.error('Error deleting album:', err);
        setError('Failed to delete album. Please try again.');
      }
    }
  };
  
  // Handle removing a photo from an album
  const handleRemovePhoto = async (albumId, photoId) => {
    if (window.confirm('Remove this photo from the album?')) {
      try {
        const updatedAlbum = await dispatch(removePhotoFromAlbumThunk(albumId, photoId));
        if (!updatedAlbum.errors) {
          if (activeAlbum && activeAlbum.id === albumId) {
            setActiveAlbum(updatedAlbum);
          }
        } else {
          setError('Failed to remove photo: ' + (updatedAlbum.errors ? updatedAlbum.errors.join(', ') : 'Unknown error'));
        }
      } catch (err) {
        console.error('Error removing photo from album:', err);
        setError('Failed to remove photo from album. Please try again.');
      }
    }
  };
  
  // Refresh active album data
  const refreshActiveAlbum = () => {
    if (activeAlbum) {
      const updatedAlbum = albums.find(album => album.id === activeAlbum.id);
      if (updatedAlbum) {
        setActiveAlbum(updatedAlbum);
      }
    }
  };

  if (!user) {
    return (
      <div className="albums-page">
        <div className="albums-hero">
          <div className="albums-hero__content">
            <h1 className="albums-hero__title">Your Photo Albums</h1>
            <p className="albums-hero__subtitle">Organize and showcase your photos in beautiful collections</p>
          </div>
        </div>
        <div className="albums-content">
          <div className="login-prompt">
            <p>Please log in to view and manage your albums</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="albums-page">
      {/* Hero section with background image */}
      <div className="albums-hero">
        <div className="albums-hero__content">
          <h1 className="albums-hero__title">Your Photo Albums</h1>
          <p className="albums-hero__subtitle">Organize and showcase your photos in beautiful collections</p>
          <div className="albums-hero__cta">
            <OpenModalButton
              buttonText="Create New Album"
              modalComponent={<CreateAlbumModal onClose={() => {}} onSuccess={refreshActiveAlbum} />}
              className="hero-create-button"
              onModalClose={refreshActiveAlbum}
            />
          </div>
        </div>
      </div>

      <div className="albums-content">
        {error && <div className="error-message">{error}</div>}
        
        {isLoading ? (
          <div className="loading">Loading your albums...</div>
        ) : (
          <div className="albums-container">
            <div className="albums-sidebar">
              <h2>Your Albums</h2>
              {albums.length === 0 ? (
                <p className="no-albums">You haven&apos;t created any albums yet.</p>
              ) : (
                <ul className="album-list">
                  {albums.map(album => (
                    <li 
                      key={album.id} 
                      className={`album-item ${activeAlbum && activeAlbum.id === album.id ? 'active' : ''}`}
                      onClick={() => setActiveAlbum(album)}
                    >
                      <span className="album-title">{album.title}</span>
                      <span className="photo-count">{album.photos.length} photos</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            <div className="album-detail">
              {activeAlbum ? (
                <>
                  <div className="album-header">
                    <div className="album-info">
                      <h2>{activeAlbum.title}</h2>
                      {activeAlbum.description && <p className="album-description">{activeAlbum.description}</p>}
                      <p className="album-meta">
                        Created: {new Date(activeAlbum.createdAt).toLocaleDateString()}
                        {activeAlbum.updatedAt !== activeAlbum.createdAt && 
                          ` · Updated: ${new Date(activeAlbum.updatedAt).toLocaleDateString()}`}
                      </p>
                    </div>
                    <div className="album-actions">
                      <OpenModalButton
                        buttonText="Edit Album"
                        modalComponent={<EditAlbumModal album={activeAlbum} onClose={() => {}} onSuccess={refreshActiveAlbum} />}
                        className="edit-album-button"
                        onModalClose={refreshActiveAlbum}
                      />
                      <button 
                        className="delete-album-button" 
                        onClick={() => handleDeleteAlbum(activeAlbum.id)}
                      >
                        Delete Album
                      </button>
                    </div>
                  </div>
                  
                  <div className="album-photos-header">
                    <h3>Photos in this Album</h3>
                    <OpenModalButton
                      buttonText="Add Photos"
                      modalComponent={<AddPhotosModal album={activeAlbum} onClose={() => {}} onSuccess={refreshActiveAlbum} />}
                      className="add-photos-button"
                      onModalClose={refreshActiveAlbum}
                    />
                  </div>
                  
                  {activeAlbum.photos.length === 0 ? (
                    <div className="no-photos">
                      <p>This album doesn&apos;t have any photos yet.</p>
                    </div>
                  ) : (
                    <div className="album-photos-grid">
                      {activeAlbum.photos.map(photoId => {
                        const photo = Object.values(photos).find(p => p.id === photoId);
                        return photo ? (
                          <div key={photoId} className="album-photo-card">
                            <div className="photo-image">
                              <img src={photo.imageUrl || photo.image_url} alt={photo.caption || 'Photo'} />
                              <button 
                                className="remove-photo-button" 
                                onClick={() => handleRemovePhoto(activeAlbum.id, photoId)}
                                title="Remove from album"
                              >
                                <i className="fas fa-times"></i>
                              </button>
                            </div>
                            {photo.caption && <p className="photo-caption">{photo.caption}</p>}
                          </div>
                        ) : (
                          <div key={photoId} className="album-photo-card photo-not-found">
                            <div className="photo-image">
                              <div className="missing-photo">Photo not found</div>
                              <button 
                                className="remove-photo-button" 
                                onClick={() => handleRemovePhoto(activeAlbum.id, photoId)}
                                title="Remove from album"
                              >
                                <i className="fas fa-times"></i>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              ) : (
                <div className="select-album-prompt">
                  <p>Select an album from the sidebar or create a new one to get started.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AlbumPage;