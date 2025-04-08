// Action Types
const LOAD_FAVORITES = 'favorites/LOAD_FAVORITES';
const ADD_FAVORITE = 'favorites/ADD_FAVORITE';
const REMOVE_FAVORITE = 'favorites/REMOVE_FAVORITE';

// Action Creators
const loadFavorites = (favorites) => ({ type: LOAD_FAVORITES, favorites });
const addFavorite = (favorite) => ({ type: ADD_FAVORITE, favorite });
const removeFavorite = (photoId) => ({ type: REMOVE_FAVORITE, photoId });

// Thunks
export const fetchFavorites = () => async (dispatch) => {
  const res = await fetch('/api/favorites');
  if (res.ok) {
    const data = await res.json();
    dispatch(loadFavorites(data.favorites));
    return data.favorites;
  }
};

export const favoritePhoto = (photoId) => async (dispatch) => {
  const res = await fetch(`/api/favorites/${photoId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(addFavorite(data.favorite));
    return data.favorite;
  }
};

export const unfavoritePhoto = (photoId) => async (dispatch) => {
  const res = await fetch(`/api/favorites/${photoId}`, { method: 'DELETE' });
  if (res.ok) {
    dispatch(removeFavorite(photoId));
    return { success: true };
  }
};

export const checkIfFavorite = (photoId) => async () => {
  const res = await fetch(`/api/favorites/check/${photoId}`);
  if (res.ok) {
    const data = await res.json();
    return data.is_favorite;
  }
  return false;
};

// Initial State
const initialState = { allFavorites: {}, isLoading: false, error: null };

// Reducer
export default function favoritesReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_FAVORITES: {
      const newState = { allFavorites: {}, isLoading: false, error: null };
      action.favorites.forEach((fav) => {
        newState.allFavorites[fav.photo_id] = fav;
      });
      return newState;
    }
    case ADD_FAVORITE: {
      return {
        ...state,
        allFavorites: { ...state.allFavorites, [action.favorite.photo_id]: action.favorite }
      };
    }
    case REMOVE_FAVORITE: {
      const newState = { ...state, allFavorites: { ...state.allFavorites } };
      delete newState.allFavorites[action.photoId];
      return newState;
    }
    default:
      return state;
  }
}
