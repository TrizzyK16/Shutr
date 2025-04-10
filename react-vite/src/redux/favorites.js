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
    dispatch(loadFavorites(favorites));
    return favorites;
  } catch (error) {
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
    dispatch(addFavorite(favorite));
    return favorite;
  } catch (error) {
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
    dispatch(setFavoriteStatus(photoId, data.is_favorite, data.favorite_id ? { id: data.favorite_id, photo_id: photoId } : null));
    return data.is_favorite;
  } catch (error) {
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

// Initial State
const initialState = { allFavorites: {}, isLoading: false, error: null };

// Reducer
export default function favoritesReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_FAVORITES: {
      const newState = { ...state, isLoading: false };
      
      if (!action.favorites) {
        return { ...newState, error: 'No favorites data provided' };
      }
      
      if (!Array.isArray(action.favorites)) {
        return { ...newState, error: 'Favorites data is not an array' };
      }
      
      newState.allFavorites = {};
      
      try {
        action.favorites.forEach((fav) => {
          if (!fav || !fav.photo_id) {
            return;
          }
          newState.allFavorites[fav.photo_id] = fav;
        });
      }
      
      return { ...newState, error: null };
    }
    case ADD_FAVORITE: {
      return {
        ...state,
        allFavorites: { ...state.allFavorites, [action.favorite.photo_id]: action.favorite }
      };
    }
    case REMOVE_FAVORITE: {
      const newState = { ...state, allFavorites: { ...state.allFavorites }, isLoading: false, error: null };
      delete newState.allFavorites[action.photoId];
      return newState;
    }
    default:
      return state;
  }
}