import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { favoritePhoto, unfavoritePhoto, checkIfFavorite } from '../../redux/favorites';
import './FavoriteButton.css';

const FavoriteButton = ({ photoId }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const sessionUser = useSelector(state => state.session.user);
  const isFavorite = useSelector(state => state.favorites.allFavorites[photoId]);

  useEffect(() => {
    // Only check if user is logged in and we don't know the favorite status yet
    if (sessionUser && isFavorite === undefined) {
      setIsLoading(true);
      dispatch(checkIfFavorite(photoId))
        .finally(() => setIsLoading(false));
    }
  }, [dispatch, photoId, sessionUser, isFavorite]);

  const handleToggleFavorite = async (e) => {
    e.stopPropagation();

    if (!sessionUser) {
      alert('Please log in to add photos to favorites');
      return;
    }

    setIsLoading(true);

    try {
      if (isFavorite) {
        await dispatch(unfavoritePhoto(photoId));
      } else {
        await dispatch(favoritePhoto(photoId));
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsLoading(false);
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