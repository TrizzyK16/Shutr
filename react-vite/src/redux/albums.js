import { getCSRFToken } from '../utils/csrf';

// Action Types
const LOAD_USER_ALBUMS = 'albums/LOAD_USER_ALBUMS';
const ADD_ALBUM = 'albums/ADD_ALBUM';
const UPDATE_ALBUM = 'albums/UPDATE_ALBUM';
const REMOVE_ALBUM = 'albums/REMOVE_ALBUM';
const ADD_PHOTO_TO_ALBUM = 'albums/ADD_PHOTO_TO_ALBUM';
const REMOVE_PHOTO_FROM_ALBUM = 'albums/REMOVE_PHOTO_FROM_ALBUM';

// Action Creators
const loadUserAlbums = (albums) => ({
  type: LOAD_USER_ALBUMS,
  payload: albums
});

const addAlbum = (album) => ({
  type: ADD_ALBUM,
  payload: album
});

const updateAlbum = (album) => ({
  type: UPDATE_ALBUM,
  payload: album
});

const removeAlbum = (albumId) => ({
  type: REMOVE_ALBUM,
  payload: albumId
});

const addPhotoToAlbum = (album) => ({
  type: ADD_PHOTO_TO_ALBUM,
  payload: album
});

const removePhotoFromAlbum = (album) => ({
  type: REMOVE_PHOTO_FROM_ALBUM,
  payload: album
});

// Thunks
export const getUserAlbums = (userId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/albums/users/${userId}`);
    
    if (response.ok) {
      const data = await response.json();
      dispatch(loadUserAlbums(data.albums));
      return data.albums;
    } else {
      const errors = await response.json();
      console.error('Error fetching user albums:', errors);
      return [];
    }
  } catch (error) {
    console.error('Error in getUserAlbums thunk:', error);
    return [];
  }
};

// Get CSRF token from cookies
function getCSRFToken() {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'csrf_token') return value;
  }
  return null;
}

export const createAlbum = (albumData) => async (dispatch) => {
  try {
    const csrfToken = await getCSRFToken();
    const response = await fetch('/api/albums', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCSRFToken()
      },
      credentials: 'include',
      body: JSON.stringify(albumData)
    });

    if (response.ok) {
      const newAlbum = await response.json();
      dispatch(addAlbum(newAlbum));
      return newAlbum;
    } else {
      const errors = await response.json();
      return errors;
    }
  } catch (error) {
    console.error('Error in createAlbum thunk:', error);
    return { errors: ['An unexpected error occurred'] };
  }
};

export const editAlbum = (albumId, albumData) => async (dispatch) => {
  try {
    const csrfToken = await getCSRFToken();
    const response = await fetch(`/api/albums/${albumId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCSRFToken()
      },
      credentials: 'include',
      body: JSON.stringify(albumData)
    });

    if (response.ok) {
      const updatedAlbum = await response.json();
      dispatch(updateAlbum(updatedAlbum));
      return updatedAlbum;
    } else {
      const errors = await response.json();
      return errors;
    }
  } catch (error) {
    console.error('Error in editAlbum thunk:', error);
    return { errors: ['An unexpected error occurred'] };
  }
};

export const deleteAlbum = (albumId) => async (dispatch) => {
  try {
    const csrfToken = await getCSRFToken();
    const response = await fetch(`/api/albums/${albumId}`, {
      method: 'DELETE',
      headers: {
        'X-CSRFToken': getCSRFToken()
      },
      credentials: 'include'
    });

    if (response.ok) {
      dispatch(removeAlbum(albumId));
      return { success: true };
    } else {
      const errors = await response.json();
      return errors;
    }
  } catch (error) {
    console.error('Error in deleteAlbum thunk:', error);
    return { errors: ['An unexpected error occurred'], success: false };
  }
};

export const addPhotosToAlbum = (albumId, photoIds) => async (dispatch) => {
  try {
    const csrfToken = await getCSRFToken();
    const response = await fetch(`/api/albums/${albumId}/photos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCSRFToken()
      },
      credentials: 'include',
      body: JSON.stringify({ photo_ids: photoIds })
    });

    if (response.ok) {
      const updatedAlbum = await response.json();
      dispatch(addPhotoToAlbum(updatedAlbum));
      return updatedAlbum;
    } else {
      const errors = await response.json();
      return errors;
    }
  } catch (error) {
    console.error('Error in addPhotosToAlbum thunk:', error);
    return { errors: ['An unexpected error occurred'] };
  }
};

export const removePhotoFromAlbumThunk = (albumId, photoId) => async (dispatch) => {
  try {
    const csrfToken = await getCSRFToken();
    const response = await fetch(`/api/albums/${albumId}/photos/${photoId}`, {
      method: 'DELETE',
      headers: {
        'X-CSRFToken': getCSRFToken()
      },
      credentials: 'include'
    });

    if (response.ok) {
      const updatedAlbum = await response.json();
      dispatch(removePhotoFromAlbum(updatedAlbum));
      return updatedAlbum;
    } else {
      const errors = await response.json();
      return errors;
    }
  } catch (error) {
    console.error('Error in removePhotoFromAlbumThunk:', error);
    return { errors: ['An unexpected error occurred'] };
  }
};

// Initial State
const initialState = {
  userAlbums: []
};

// Reducer
export default function albumsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_ALBUMS:
      return {
        ...state,
        userAlbums: action.payload
      };
    case ADD_ALBUM:
      return {
        ...state,
        userAlbums: [...state.userAlbums, action.payload]
      };
    case UPDATE_ALBUM:
      return {
        ...state,
        userAlbums: state.userAlbums.map(album => 
          album.id === action.payload.id ? action.payload : album
        )
      };
    case REMOVE_ALBUM:
      return {
        ...state,
        userAlbums: state.userAlbums.filter(album => album.id !== action.payload)
      };
    case ADD_PHOTO_TO_ALBUM:
    case REMOVE_PHOTO_FROM_ALBUM:
      return {
        ...state,
        userAlbums: state.userAlbums.map(album => 
          album.id === action.payload.id ? action.payload : album
        )
      };
    default:
      return state;
  }
}
