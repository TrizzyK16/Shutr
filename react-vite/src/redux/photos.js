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

// Thunk: fetch all photos
export const fetchPhotos = () => async (dispatch) => {
  const res = await fetch('/api/photos');
  if (res.ok) {
    const data = await res.json();
    dispatch(getPhotos(data.photos));
  }
};

// Thunk: create a photo
export const createPhoto = (payload) => async (dispatch) => {
  const res = await fetch('/api/photos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (res.ok) {
    const photo = await res.json();
    dispatch(addPhoto(photo));
    return photo;
  } else {
    // handle errors
  }
};

// Thunk: update a photo
export const updatePhotoThunk = (photoId, payload) => async (dispatch) => {
  const res = await fetch(`/api/photos/${photoId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (res.ok) {
    const photo = await res.json();
    dispatch(updatePhoto(photo));
    return photo;
  } else {
    // handle errors
  }
};

// Thunk: delete a photo
export const deletePhotoThunk = (photoId) => async (dispatch) => {
  const res = await fetch(`/api/photos/${photoId}`, { method: 'DELETE' });
  if (res.ok) {
    dispatch(deletePhoto(photoId));
  } else {
    // handle errors
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
