import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPhotosToAlbum } from '../../redux/albums';
import { useModal } from '../../context/Modal';
import './PhotoList.css';
import './AddToAlbum.css';

function AddToAlbumButton({ photoId }) {
  const [selectedAlbum, setSelectedAlbum] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  
  // Get user's albums from Redux store
  const albums = useSelector(state => state.albums.userAlbums || []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedAlbum) {
      setError('Please select an album');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await dispatch(addPhotosToAlbum(selectedAlbum, [photoId]));
      
      if (result && result.errors) {
        setError(result.errors);
      } else {
        closeModal();
      }
    } catch (err) {
      setError('Failed to add photo to album');
      console.error('Error adding photo to album:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="add-to-album-modal">
      <h2>Add to Album</h2>
      
      {error && <p className="error">{error}</p>}
      
      {albums && albums.length === 0 ? (
        <div className="no-albums-message">
          <p>You don&apos;t have any albums yet.</p>
          <p>Create an album first in the Albums page.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="album-select">Select Album</label>
            <select 
              id="album-select"
              value={selectedAlbum}
              onChange={(e) => setSelectedAlbum(e.target.value)}
              disabled={isLoading}
            >
              <option value="">-- Select an Album --</option>
              {albums && albums.map(album => (
                <option key={album.id} value={album.id}>
                  {album.title}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              onClick={closeModal} 
              className="cancel-button"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-button"
              disabled={isLoading || !selectedAlbum}
            >
              {isLoading ? 'Adding...' : 'Add to Album'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default AddToAlbumButton;
