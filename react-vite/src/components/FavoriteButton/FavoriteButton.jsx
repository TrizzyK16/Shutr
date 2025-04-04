import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { favoritePhoto as addPhotoToFavorites, unfavoritePhoto as removePhotoFromFavorites, checkIfFavorite } from '../../redux/favorites';
import './FavoriteButton.css';

const FavoriteButton = ({ photoId }) => {
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const sessionUser = useSelector(state => state.session.user);
  
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (sessionUser) {
        setIsLoading(true);
        const favoriteStatus = await dispatch(checkIfFavorite(photoId));
        setIsFavorite(favoriteStatus);
        setIsLoading(false);
      }
    };
    
    checkFavoriteStatus();
  }, [dispatch, photoId, sessionUser]);
  
  const handleToggleFavorite = async (e) => {
    e.stopPropagation(); // Prevent triggering parent click events
    
    if (!sessionUser) {
      // If user is not logged in, redirect to login or show message
      alert('Please log in to add photos to favorites');
      return;
    }
    
    setIsLoading(true);
    
    try {
      if (isFavorite) {
        await dispatch(removePhotoFromFavorites(photoId));
        setIsFavorite(false);
      } else {
        await dispatch(addPhotoToFavorites(photoId));
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!sessionUser) return null;
  
  return (
    <button 
      className={`favorite-button ${isFavorite ? 'is-favorite' : ''} ${isLoading ? 'loading' : ''}`}
      onClick={handleToggleFavorite}
      disabled={isLoading}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <i className={`fa-${isFavorite ? 'solid' : 'regular'} fa-heart`}></i>
    </button>
  );
};

export default FavoriteButton;
