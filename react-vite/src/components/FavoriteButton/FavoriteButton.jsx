import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { favoritePhoto, unfavoritePhoto, checkIfFavorite } from '../../redux/favorites';
import './FavoriteButton.css';

const FavoriteButton = ({ photoId }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const sessionUser = useSelector(state => state.session.user);
  const isFavorite = useSelector(state => !!state.favorites.allFavorites[photoId]);

  useEffect(() => {
    // Only check if user is logged in
    if (sessionUser) {
      setIsLoading(true);
      dispatch(checkIfFavorite(photoId))
        .catch(error => console.error('Error checking favorite status:', error))
        .finally(() => setIsLoading(false));
    }
  }, [dispatch, photoId, sessionUser]);

  const handleToggleFavorite = (e) => {
    e.stopPropagation();

    if (!sessionUser) {
      alert('Please log in to add photos to favorites');
      return;
    }

    setIsLoading(true);
    console.log(`Toggling favorite for photo ${photoId}, current status: ${isFavorite ? 'favorited' : 'not favorited'}`);
    
    // Use a simpler approach without nested awaits
    if (isFavorite) {
      console.log(`Attempting to unfavorite photo ${photoId}`);
      dispatch(unfavoritePhoto(photoId))
        .then(() => console.log(`Successfully unfavorited photo ${photoId}`))
        .catch(error => {
          console.error('Error unfavoriting:', error);
          // Refresh status on error
          dispatch(checkIfFavorite(photoId));
        })
        .finally(() => setIsLoading(false));
    } else {
      console.log(`Attempting to favorite photo ${photoId}`);
      dispatch(favoritePhoto(photoId))
        .then(() => console.log(`Successfully favorited photo ${photoId}`))
        .catch(error => {
          console.error('Error favoriting:', error);
          // Refresh status on error
          dispatch(checkIfFavorite(photoId));
        })
        .finally(() => setIsLoading(false));
    }
  };

  // If we want to show the button but disable it for non-logged in users
  // instead of returning null
  return (
    <button 
      className={`favorite-button ${isFavorite ? 'is-favorite' : ''} ${isLoading ? 'loading' : ''}`}
      onClick={handleToggleFavorite}
      disabled={isLoading || !sessionUser}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <i className={`fa-${isFavorite ? 'solid' : 'regular'} fa-heart`}
        aria-hidden="true"
      >
        {isLoading && <span className="loading-dot">•</span>}
      </i>
    </button>
  );
};

export default FavoriteButton;