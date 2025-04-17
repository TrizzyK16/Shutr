// Action Types
const LOAD_EVENTS = 'events/LOAD_EVENTS';
const LOAD_EVENT_DETAILS = 'events/LOAD_EVENT_DETAILS';
const RSVP_EVENT = 'events/RSVP_EVENT';
const CANCEL_RSVP = 'events/CANCEL_RSVP';

// Helper function to get CSRF token from cookies
const getCSRFToken = () => {
  const cookies = document.cookie.split('; ');
  const tokenCookie = cookies.find(cookie => cookie.startsWith('csrf_token='));
  return tokenCookie ? tokenCookie.split('=')[1] : null;
};

// Action Creators
const loadEvents = (events) => ({
  type: LOAD_EVENTS,
  payload: events
});

const loadEventDetails = (event) => ({
  type: LOAD_EVENT_DETAILS,
  payload: event
});

const rsvpEvent = (rsvp) => ({
  type: RSVP_EVENT,
  payload: rsvp
});

const cancelRsvp = (eventId) => ({
  type: CANCEL_RSVP,
  payload: eventId
});

// Thunks
export const fetchEventsThunk = () => async (dispatch) => {
  const response = await fetch('/api/events', {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCSRFToken()
    }
  });
  
  if (response.ok) {
    const events = await response.json();
    dispatch(loadEvents(events));
    return events;
  }
  
  return null;
};

export const fetchEventDetailsThunk = (eventId) => async (dispatch) => {
  const response = await fetch(`/api/events/${eventId}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCSRFToken()
    }
  });
  
  if (response.ok) {
    const event = await response.json();
    dispatch(loadEventDetails(event));
    return event;
  }
  
  return null;
};

export const rsvpEventThunk = (eventId) => async (dispatch) => {
  const response = await fetch(`/api/events/${eventId}/rsvp`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCSRFToken()
    }
  });
  
  if (response.ok) {
    const data = await response.json();
    dispatch(rsvpEvent(data.rsvp));
    return data;
  }
  
  return null;
};

export const cancelRsvpThunk = (eventId) => async (dispatch) => {
  const response = await fetch(`/api/events/${eventId}/rsvp`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCSRFToken()
    }
  });
  
  if (response.ok) {
    dispatch(cancelRsvp(eventId));
    return await response.json();
  }
  
  return null;
};

// Initial State
const initialState = {
  allEvents: [],
  currentEvent: null,
  userRsvps: []
};

// Reducer
export default function eventsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_EVENTS:
      return {
        ...state,
        allEvents: action.payload
      };
      
    case LOAD_EVENT_DETAILS:
      return {
        ...state,
        currentEvent: action.payload
      };
      
    case RSVP_EVENT:
      // Add the event to userRsvps
      return {
        ...state,
        userRsvps: [...state.userRsvps, action.payload]
      };
      
    case CANCEL_RSVP:
      // Remove the event from userRsvps
      return {
        ...state,
        userRsvps: state.userRsvps.filter(rsvp => rsvp.event_id !== action.payload)
      };
      
    default:
      return state;
  }
}
