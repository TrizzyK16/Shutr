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
    if (!response.ok) {
      console.warn('CSRF token fetch not OK, attempting to proceed without token');
      return null; // Return null instead of throwing, allowing login to proceed
    }
    const data = await response.json();
    return data.csrf_token;
  } catch (error) {
    console.warn('Error fetching CSRF token, attempting to proceed without token:', error);
    return null; // Return null instead of throwing, allowing login to proceed
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
    } else {
      // Don't throw errors for authentication checks - just log them
      console.warn('Authentication check failed:', response.status);
      // For 500 errors, we'll assume the server is having issues
      if (response.status >= 500) {
        console.warn('Server error during authentication check');
      }
    }
  } catch (error) {
    console.warn('Authentication error (non-fatal):', error);
    // We don't want to break the app if auth check fails
  }
};

export const thunkLogin = (credentials) => async dispatch => {
  try {
    const csrfToken = await getCSRFToken();
    
    // Prepare headers
    const headers = {
      "Content-Type": "application/json"
    };
    
    // Only add CSRF token if we got one
    if (csrfToken) {
      headers["X-CSRFToken"] = csrfToken;
    }
    
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers,
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
      // Handle 500 errors specifically
      console.error('Server error during login:', response.status);
      return { 
        server: "The server is currently experiencing issues. This is likely a temporary problem. Please try again later or contact support if the issue persists."
      };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { 
      server: "Network error. Please check your connection and try again. If you're connected to the internet, the server may be temporarily unavailable."
    };
  }
};

export const loginDemoUser = () => async dispatch => {
  try {
    const csrfToken = await getCSRFToken();
    
    // Prepare headers
    const headers = {
      "Content-Type": "application/json"
    };
    
    // Only add CSRF token if we got one
    if (csrfToken) {
      headers["X-CSRFToken"] = csrfToken;
    }
    
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers,
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