// Action Types
const LOAD_FAVORITES = 'favorites/LOAD_FAVORITES';
const ADD_FAVORITE = 'favorites/ADD_FAVORITE';
const REMOVE_FAVORITE = 'favorites/REMOVE_FAVORITE';

// Action Creators
export const loadFavorites = (favorites) => ({
  type: LOAD_FAVORITES,
  favorites
});

export const addFavorite = (favorite) => ({
  type: ADD_FAVORITE,
  favorite
});

export const removeFavorite = (photoId) => ({
  type: REMOVE_FAVORITE,
  photoId
});

// Thunks
export const fetchFavorites = () => async (dispatch) => {
  const response = await fetch('/api/favorites');
  
  if (response.ok) {
    const favorites = await response.json();
    dispatch(loadFavorites(favorites));
    return favorites;
  }
};

export const addPhotoToFavorites = (photoId) => async (dispatch) => {
  const response = await fetch(`/api/favorites/${photoId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  if (response.ok) {
    const favorite = await response.json();
    dispatch(addFavorite(favorite));
    return favorite;
  }
};

export const removePhotoFromFavorites = (photoId) => async (dispatch) => {
  const response = await fetch(`/api/favorites/${photoId}`, {
    method: 'DELETE'
  });
  
  if (response.ok) {
    dispatch(removeFavorite(photoId));
    return { success: true };
  }
};

export const checkIfFavorite = (photoId) => async () => {
  const response = await fetch(`/api/favorites/check/${photoId}`);
  
  if (response.ok) {
    const data = await response.json();
    return data.is_favorite;
  }
  return false;
};

// Initial State
const initialState = {
  userFavorites: [],
  isLoading: false
};

// Reducer
const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_FAVORITES:
      return {
        ...state,
        userFavorites: action.favorites,
        isLoading: false
      };
    case ADD_FAVORITE:
      return {
        ...state,
        userFavorites: [...state.userFavorites, action.favorite]
      };
    case REMOVE_FAVORITE:
      return {
        ...state,
        userFavorites: state.userFavorites.filter(fav => fav.photo_id !== action.photoId)
      };
    default:
      return state;
  }
};

export default favoritesReducer;
