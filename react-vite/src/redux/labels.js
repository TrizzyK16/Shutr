// src/redux/labels.js
import { csrfFetch } from './csrf';

// --- ACTION TYPES ---
const LOAD_LABELS = 'labels/LOAD_LABELS';
const CREATE_LABEL = 'labels/CREATE_LABEL';
const UPDATE_LABEL = 'labels/UPDATE_LABEL';
const DELETE_LABEL = 'labels/DELETE_LABEL';

// --- ACTION CREATORS ---
const loadLabels = (photoId, labels) => ({
  type: LOAD_LABELS,
  photoId,
  labels
});

const createLabel = (photoId, label) => ({
  type: CREATE_LABEL,
  photoId,
  label
});

const updateLabel = (photoId, label) => ({
  type: UPDATE_LABEL,
  photoId,
  label
});

const removeLabel = (photoId, labelId) => ({
  type: DELETE_LABEL,
  photoId,
  labelId
});

// --- THUNK ACTIONS ---
// 1) Get all labels for a given photo
export const getLabelsForPhoto = (photoId) => async (dispatch) => {
  const response = await csrfFetch(`/api/photos/${photoId}/labels`);
  if (response.ok) {
    const data = await response.json();
    dispatch(loadLabels(photoId, data.labels));
    return data.labels;
  }
};

// 2) Create a new label for a photo
export const createLabelForPhoto = (photoId, text) => async (dispatch) => {
  const response = await csrfFetch(`/api/photos/${photoId}/labels`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  if (response.ok) {
    const newLabel = await response.json();
    dispatch(createLabel(photoId, newLabel));
    return newLabel;
  }
};

// 3) Update an existing label
export const updateLabelForPhoto = (photoId, labelId, text) => async (dispatch) => {
  const response = await csrfFetch(`/api/photos/${photoId}/labels/${labelId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  if (response.ok) {
    const updatedLabel = await response.json();
    dispatch(updateLabel(photoId, updatedLabel));
    return updatedLabel;
  }
};

// 4) Delete a label
export const deleteLabelForPhoto = (photoId, labelId) => async (dispatch) => {
  const response = await csrfFetch(`/api/photos/${photoId}/labels/${labelId}`, {
    method: 'DELETE'
  });
  if (response.ok) {
    dispatch(removeLabel(photoId, labelId));
    return true;
  }
};

// --- REDUCER ---
// State shape example: {
//   [photoId]: [ {id, photo_id, text}, ... ],
//   ...
// }
const initialState = {};

export default function labelsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_LABELS: {
      return {
        ...state,
        [action.photoId]: action.labels
      };
    }
    case CREATE_LABEL: {
      const newState = { ...state };
      // If no array yet, default to empty:
      const existingLabels = newState[action.photoId] || [];
      newState[action.photoId] = [...existingLabels, action.label];
      return newState;
    }
    case UPDATE_LABEL: {
      const newState = { ...state };
      if (!newState[action.photoId]) return newState;
      newState[action.photoId] = newState[action.photoId].map(label =>
        label.id === action.label.id ? action.label : label
      );
      return newState;
    }
    case DELETE_LABEL: {
      const newState = { ...state };
      if (!newState[action.photoId]) return newState;
      newState[action.photoId] = newState[action.photoId].filter(label => label.id !== action.labelId);
      return newState;
    }
    default:
      return state;
  }
}
