// src/components/PhotoList/PhotoList.jsx
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
  const currentUser = useSelector((state) => state.session.user);
  
  // Filter photos if userOnly is true
  const displayPhotos = userOnly && currentUser
    ? photos.filter(photo => photo.user_id === currentUser.id)
    : photos;

  useEffect(() => {
    dispatch(fetchPhotos());
    if (currentUser) {
      dispatch(fetchFavorites());
    }
  }, [dispatch, currentUser]);

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
            <img src={photo.image_url} alt="user-upload" />
            {currentUser && <FavoriteButton photoId={photo.id} />}
          </div>
          <div className="photo-info">
            <p className="photo-caption">{photo.caption}</p>
            <div className="photo-meta">
              <span className="photo-date">{new Date(photo.created_at).toLocaleDateString()}</span>
              {currentUser && currentUser.id === photo.user_id && (
                <div className="photo-actions">
                  <Link to={`/photos/${photo.id}/edit`} className="edit-link">Update</Link>
                  <DeletePhotoButton photoId={photo.id} />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PhotoList;
