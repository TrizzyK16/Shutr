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

// Helper to format dates for mock data
const getRandomFutureDate = (daysAhead = 30) => {
  const date = new Date();
  date.setDate(date.getDate() + Math.floor(Math.random() * daysAhead) + 1);
  return date.toISOString();
};

const getRandomPastDate = (daysAgo = 30) => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo) - 1);
  return date.toISOString();
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
  try {
    // For development: simulate API response with mock data
    const mockEvents = [
      {
        id: 1,
        name: "Photo Walk: Downtown Architecture",
        description: "Join us for a photo walk exploring downtown architecture and urban landscapes.",
        date: getRandomFutureDate(15),
        location: "City Center Park",
        image_url: null,
        attendee_count: 18,
        organizer_name: "Shutr Community",
        is_attending: true
      },
      {
        id: 2,
        name: "Portrait Photography Workshop",
        description: "Learn essential portrait photography techniques from professional photographers.",
        date: getRandomFutureDate(7),
        location: "Creative Studio Space",
        image_url: null,
        attendee_count: 25,
        organizer_name: "Portrait Masters Group",
        is_attending: false
      },
      {
        id: 3,
        name: "Sunset Photography Meetup",
        description: "Capture the perfect sunset at the beach with fellow photographers.",
        date: getRandomFutureDate(10),
        location: "Ocean View Beach",
        image_url: null,
        attendee_count: 12,
        organizer_name: "Landscape Lovers",
        is_attending: true
      },
      {
        id: 4,
        name: "Street Photography Challenge",
        description: "A day-long street photography challenge with prizes for the best shots.",
        date: getRandomFutureDate(20),
        location: "Historic District",
        image_url: null,
        attendee_count: 30,
        organizer_name: "Street Photography Club",
        is_attending: false
      },
      {
        id: 5,
        name: "Wildlife Photography Excursion",
        description: "A guided trip to capture local wildlife in their natural habitat.",
        date: getRandomPastDate(15),
        location: "National Wildlife Refuge",
        image_url: null,
        attendee_count: 15,
        organizer_name: "Wildlife Photographers",
        is_attending: true
      },
      {
        id: 6,
        name: "Night Sky Photography Workshop",
        description: "Learn how to capture stunning night sky and astrophotography images.",
        date: getRandomPastDate(5),
        location: "Mountain Observatory",
        image_url: null,
        attendee_count: 22,
        organizer_name: "Shutr Pro",
        is_attending: false
      }
    ];
    
    dispatch(loadEvents(mockEvents));
    return mockEvents;
    
    // When API is ready, uncomment this code:
    /*
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
    */
  } catch (error) {
    console.error("Error fetching events:", error);
    return null;
  }
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

export const rsvpEventThunk = (eventId) => async (dispatch, getState) => {
  try {
    // For development: simulate API response
    const { allEvents } = getState().events;
    const event = allEvents.find(e => e.id === eventId);
    
    if (event) {
      // Create a copy of the event with is_attending set to true
      const updatedEvent = { ...event, is_attending: true };
      dispatch(rsvpEvent(updatedEvent));
      return { success: true, rsvp: updatedEvent };
    }
    
    // When API is ready, uncomment this code:
    /*
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
    */
  } catch (error) {
    console.error("Error RSVPing to event:", error);
    return null;
  }
};

export const cancelRsvpThunk = (eventId) => async (dispatch, getState) => {
  try {
    // For development: simulate API response
    const { allEvents } = getState().events;
    const event = allEvents.find(e => e.id === eventId);
    
    if (event) {
      dispatch(cancelRsvp(eventId));
      return { success: true };
    }
    
    // When API is ready, uncomment this code:
    /*
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
    */
  } catch (error) {
    console.error("Error canceling RSVP:", error);
    return null;
  }
};

// Initial State
const initialState = {
  allEvents: [],
  currentEvent: null,
  userEvents: []
};

// Reducer
export default function eventsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_EVENTS:
      return {
        ...state,
        allEvents: action.payload,
        // Initialize userEvents with events that have is_attending=true
        userEvents: action.payload.filter(event => event.is_attending)
      };
      
    case LOAD_EVENT_DETAILS:
      return {
        ...state,
        currentEvent: action.payload
      };
      
    case RSVP_EVENT:
      // Update the event in allEvents and add to userEvents
      return {
        ...state,
        allEvents: state.allEvents.map(event => 
          event.id === action.payload.id ? { ...event, is_attending: true } : event
        ),
        userEvents: [...state.userEvents, action.payload]
      };
      
    case CANCEL_RSVP:
      // Update the event in allEvents and remove from userEvents
      return {
        ...state,
        allEvents: state.allEvents.map(event => 
          event.id === action.payload ? { ...event, is_attending: false } : event
        ),
        userEvents: state.userEvents.filter(event => event.id !== action.payload)
      };
      
    default:
      return state;
  }
}
