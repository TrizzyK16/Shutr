// src/redux/photos.js

// Action Types
const GET_PHOTOS = 'photos/GET_PHOTOS';
const ADD_PHOTO = 'photos/ADD_PHOTO';
const UPDATE_PHOTO = 'photos/UPDATE_PHOTO';
const DELETE_PHOTO = 'photos/DELETE_PHOTO';

// Action Creators
const getPhotos = (photos) => ({ type: GET_PHOTOS, photos });
const addPhoto = (photo) => ({ type: ADD_PHOTO, photo });
const updatePhoto = (photo) => ({ type: UPDATE_PHOTO, photo });
const deletePhoto = (photoId) => ({ type: DELETE_PHOTO, photoId });

function getCSRFToken() {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'csrf_token') return value;
  }
  return null;
}

// Thunk: fetch all photos
export const fetchPhotos = () => async (dispatch) => {
  try {
    const res = await fetch('/api/photos');
    if (res.ok) {
      const data = await res.json();
      dispatch(getPhotos(data.photos));
      return data.photos;
    } else {
      console.error('Error fetching photos:', res.status, res.statusText);
      return [];
    }
  } catch (error) {
    console.error('Exception in fetchPhotos thunk:', error);
    return [];
  }
};

// Thunk: create a photo
export const createPhoto = (payload) => async (dispatch) => {
  try {
    const res = await fetch('/api/photos', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'X-CSRFToken': getCSRFToken()
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    });
    
    if (res.ok) {
      const photo = await res.json();
      dispatch(addPhoto(photo));
      return photo;
    } else {
      const errorData = await res.json().catch(() => ({
        errors: ['An error occurred while creating the photo']
      }));
      console.error('Error creating photo:', errorData);
      return errorData;
    }
  } catch (error) {
    console.error('Exception in createPhoto thunk:', error);
    return { errors: ['An unexpected error occurred. Please try again.'] };
  }
};

// Thunk: update a photo
export const updatePhotoThunk = (photoId, payload) => async (dispatch) => {
  const res = await fetch(`/api/photos/${photoId}`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      'X-CSRFToken': getCSRFToken()
    },
    credentials: 'include',
    body: JSON.stringify(payload),
  });
  if (res.ok) {
    const photo = await res.json();
    dispatch(updatePhoto(photo));
    return photo;
  } else {
    throw new Error('Failed to update photo');
  }
};

// Thunk: delete a photo
export const deletePhotoThunk = (photoId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/photos/${photoId}`, { 
      method: 'DELETE', 
      headers: {
        'X-CSRFToken': getCSRFToken(),
      },
      credentials: 'include',
    });
    
    if (res.ok) {
      dispatch(deletePhoto(photoId));
      return { success: true };
    } else {
      const errorData = await res.json().catch(() => ({
        errors: ['An error occurred while deleting the photo']
      }));
      console.error('Error deleting photo:', errorData);
      return errorData;
    }
  } catch (error) {
    console.error('Exception in deletePhotoThunk:', error);
    return { errors: ['An unexpected error occurred. Please try again.'], success: false };
  }
};

// Initial state
const initialState = {};

// Reducer
const photosReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PHOTOS: {
      const newState = {};
      action.photos.forEach((photo) => {
        newState[photo.id] = photo;
      });
      return newState;
    }
    case ADD_PHOTO: {
      return {
        ...state,
        [action.photo.id]: action.photo,
      };
    }
    case UPDATE_PHOTO: {
      return {
        ...state,
        [action.photo.id]: action.photo,
      };
    }
    case DELETE_PHOTO: {
      const newState = { ...state };
      delete newState[action.photoId];
      return newState;
    }
    default:
      return state;
  }
};

export default photosReducer;
