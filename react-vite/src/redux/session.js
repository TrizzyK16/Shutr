// Action Types
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

// Action Creators
const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER
});

// Utility function to get CSRF token
const getCSRFToken = async () => {
  try {
    const response = await fetch('/api/csrf/restore');
    if (!response.ok) throw new Error('Failed to fetch CSRF token');
    const data = await response.json();
    return data.csrf_token;
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    throw error;
  }
};

// Thunks
export const thunkAuthenticate = () => async (dispatch) => {
  try {
    const response = await fetch("/api/auth/", {
      credentials: 'include'
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.errors) {
        return;
      }
      dispatch(setUser(data));
    }
  } catch (error) {
    console.error('Authentication error:', error);
  }
};

export const thunkLogin = (credentials) => async dispatch => {
  try {
    const csrfToken = await getCSRFToken();
    
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken
      },
      credentials: 'include',
      body: JSON.stringify(credentials)
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setUser(data));
      return null;
    } else if (response.status < 500) {
      const errorMessages = await response.json();
      return errorMessages;
    } else {
      return { server: "Something went wrong. Please try again" };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { server: "Network error. Please check your connection and try again." };
  }
};

export const loginDemoUser = () => async dispatch => {
  try {
    const csrfToken = await getCSRFToken();
    
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken
      },
      credentials: 'include',
      body: JSON.stringify({
        "email": "demo@aa.io",
        "password": "password"
      })
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setUser(data));
      return null;
    } else if (response.status < 500) {
      const errorMessages = await response.json();
      return errorMessages;
    } else {
      return { server: "Something went wrong. Please try again" };
    }
  } catch (error) {
    console.error('Demo login error:', error);
    return { server: "Network error. Please check your connection and try again." };
  }
};

export const thunkSignup = (user) => async (dispatch) => {
  try {
    const csrfToken = await getCSRFToken();
    
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken
      },
      credentials: 'include',
      body: JSON.stringify(user)
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setUser(data));
      return null;
    } else if (response.status < 500) {
      const errorMessages = await response.json();
      return errorMessages;
    } else {
      return { server: "Something went wrong. Please try again" };
    }
  } catch (error) {
    console.error('Signup error:', error);
    return { server: "Network error. Please check your connection and try again." };
  }
};

export const thunkLogout = () => async (dispatch) => {
  try {
    const csrfToken = await getCSRFToken();
    
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "X-CSRFToken": csrfToken
      },
      credentials: 'include'
    });
    
    if (response.ok) {
      dispatch(removeUser());
      return null;
    } else {
      const errorMessages = await response.json();
      return errorMessages;
    }
  } catch (error) {
    console.error('Logout error:', error);
    return { server: "Network error. Please check your connection and try again." };
  }
};

// Initial State
const initialState = { user: null };

// Reducer
function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
}

export default sessionReducer;