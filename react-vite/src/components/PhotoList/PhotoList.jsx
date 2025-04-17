import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotos } from '../../redux/photos';
import { fetchFavorites } from '../../redux/favorites';
import { Link } from 'react-router-dom';
import DeletePhotoButton from './DeletePhotoButton';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import './PhotoList.css';

function PhotoList({ userOnly = false }) {
  const dispatch = useDispatch();
  const photos = useSelector((state) => Object.values(state.photos));
  const User = useSelector((state) => state.session.user);
  const userId = User?.id;
  
  // Filter photos if userOnly is true
  const displayPhotos = userOnly && User
    ? photos.filter(photo => photo.user_id === userId)
    : photos;

  // Always fetch photos
  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  // Only fetch favorites when User exists
  useEffect(() => {
    if (userId) {
      dispatch(fetchFavorites());
    }
  }, [dispatch, userId]);

  if (!displayPhotos.length) {
    return (
      <div className="no-photos">
        <p>{userOnly ? "You haven't uploaded any photos yet." : "No photos available yet."}</p>
      </div>
    );
  }

  return (
    <div className="photo-grid">
      {displayPhotos.map((photo) => (
        <div key={photo.id} className="photo-card">
          <div className="photo-image">
            <FavoriteButton photoId={photo.id} />
            <img src={photo.image_url} alt="user-upload" />
            
          </div>
          <div className="photo-info">
            <p className="photo-caption">{photo.caption}</p>
            {User && (
              <div className="photo-actions">
                {userId === photo.user_id && (
                  <>
                    <Link to={`/photos/${photo.id}/edit`} className="edit-link">Update</Link>
                    <DeletePhotoButton photoId={photo.id} />
                  </>
                )}
              </div>
            )}
            <div className="photo-meta">
              <span className="photo-date">{new Date(photo.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PhotoList;
