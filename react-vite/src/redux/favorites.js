// Action Types
const LOAD_FAVORITES = 'favorites/LOAD_FAVORITES';
const ADD_FAVORITE = 'favorites/ADD_FAVORITE';
const REMOVE_FAVORITE = 'favorites/REMOVE_FAVORITE';
const SET_LOADING = 'favorites/SET_LOADING';
const SET_ERROR = 'favorites/SET_ERROR';
const SET_FAVORITE_STATUS = 'favorites/SET_FAVORITE_STATUS';

// Action Creators
const loadFavorites = (favorites) => ({ type: LOAD_FAVORITES, favorites });
const addFavorite = (favorite) => ({ type: ADD_FAVORITE, favorite });
const removeFavorite = (photoId) => ({ type: REMOVE_FAVORITE, photoId });
const setLoading = (isLoading) => ({ type: SET_LOADING, isLoading });
const setError = (error) => ({ type: SET_ERROR, error });
const setFavoriteStatus = (photoId, isFavorite, favoriteData = null) => ({ 
  type: SET_FAVORITE_STATUS, 
  photoId, 
  isFavorite, 
  favoriteData 
});

// Thunks
export const fetchFavorites = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await fetch('/api/favorites');
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to fetch favorites');
    }
    
    const data = await res.json();
    // Handle both possible API response formats
    const favorites = data.favorites || data;
    
    // Make sure favorites is an array before dispatching
    if (!Array.isArray(favorites)) {
      console.error('Expected favorites to be an array, got:', favorites);
      dispatch(loadFavorites([]));
      return [];
    }
    
    dispatch(loadFavorites(favorites));
    return favorites;
  } catch (error) {
    console.error('Error fetching favorites:', error);
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const favoritePhoto = (photoId) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  const state = getState();
  const existingFavorite = state.favorites.allFavorites[photoId];
  
  if (existingFavorite) {
    dispatch(setLoading(false));
    return existingFavorite; // Already favorited, no need for API call
  }

  try {
    const res = await fetch(`/api/favorites/${photoId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to add favorite');
    }

    const data = await res.json();
    // Handle both possible API response formats
    const favorite = data.favorite || data;
    
    if (!favorite || !favorite.photo_id) {
      console.error('Invalid favorite data received:', favorite);
      throw new Error('Invalid favorite data received from server');
    }
    
    dispatch(addFavorite(favorite));
    return favorite;
  } catch (error) {
    console.error('Error favoriting photo:', error);
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const unfavoritePhoto = (photoId) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  const state = getState();
  const existingFavorite = state.favorites.allFavorites[photoId];
  
  if (!existingFavorite) {
    dispatch(setLoading(false));
    return null; // Not favorited, no need for API call
  }

  try {
    const res = await fetch(`/api/favorites/${photoId}`, { method: 'DELETE' });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to unfavorite');
    }

    dispatch(removeFavorite(photoId));
    return await res.json();
  } catch (error) {
    console.error('Error unfavoriting photo:', error);
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const checkIfFavorite = (photoId) => async (dispatch, getState) => {
  const state = getState();
  const existingFavorite = state.favorites.allFavorites[photoId];
  
  if (existingFavorite !== undefined) {
    return !!existingFavorite;
  }

  dispatch(setLoading(true));
  try {
    const res = await fetch(`/api/favorites/check/${photoId}`);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to check favorite status');
    }
    
    const data = await res.json();
    
    // Update the Redux store with the result
    if (data.is_favorite && data.details && data.details.favorite_id) {
      // Format for the original API response
      dispatch(setFavoriteStatus(photoId, true, { 
        id: data.details.favorite_id, 
        photo_id: photoId 
      }));
    } else if (data.is_favorite && data.favorite_id) {
      // Format for the updated API response
      dispatch(setFavoriteStatus(photoId, true, { 
        id: data.favorite_id, 
        photo_id: photoId 
      }));
    } else {
      dispatch(setFavoriteStatus(photoId, false));
    }
    
    return data.is_favorite;
  } catch (error) {
    console.error('Error checking favorite status:', error);
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

// Initial State
const initialState = { 
  allFavorites: {},
  isLoading: false,
  error: null
};

// Reducer
export default function favoritesReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_FAVORITES: {
      const newState = { ...state, error: null };
      newState.allFavorites = {};
      
      try {
        if (!Array.isArray(action.favorites)) {
          return { 
            ...state, 
            error: 'Invalid favorites data: expected an array' 
          };
        }
        
        action.favorites.forEach((fav) => {
          if (!fav || !fav.photo_id) return;
          newState.allFavorites[fav.photo_id] = fav;
        });
      } catch (error) {
        console.error('Error in LOAD_FAVORITES reducer:', error);
        return { 
          ...state, 
          error: 'Error processing favorites data' 
        };
      }
      
      return newState;
    }
    case ADD_FAVORITE: {
      if (!action.favorite || !action.favorite.photo_id) {
        console.error('Invalid favorite in ADD_FAVORITE:', action.favorite);
        return {
          ...state,
          error: 'Invalid favorite data received'
        };
      }
      
      return {
        ...state,
        error: null,
        allFavorites: {
          ...state.allFavorites,
          [action.favorite.photo_id]: action.favorite
        }
      };
    }
    case REMOVE_FAVORITE: {
      const newFavorites = { ...state.allFavorites };
      delete newFavorites[action.photoId]; // Remove completely instead of setting to false
      return { 
        ...state, 
        error: null,
        allFavorites: newFavorites 
      };
    }
    case SET_FAVORITE_STATUS: {
      const photoId = action.photoId;
      
      if (action.isFavorite && action.favoriteData) {
        return {
          ...state,
          error: null,
          allFavorites: {
            ...state.allFavorites,
            [photoId]: action.favoriteData
          }
        };
      } else {
        // If not a favorite, remove it from allFavorites instead of setting to false
        const newFavorites = { ...state.allFavorites };
        delete newFavorites[photoId];
        return {
          ...state,
          error: null,
          allFavorites: newFavorites
        };
      }
    }
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
}