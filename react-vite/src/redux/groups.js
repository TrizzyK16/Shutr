// Action Types
const LOAD_GROUPS = 'groups/LOAD_GROUPS';
const LOAD_GROUP_DETAILS = 'groups/LOAD_GROUP_DETAILS';
const JOIN_GROUP = 'groups/JOIN_GROUP';
const LEAVE_GROUP = 'groups/LEAVE_GROUP';

// Helper function to get CSRF token from cookies
const getCSRFToken = () => {
  const cookies = document.cookie.split('; ');
  const tokenCookie = cookies.find(cookie => cookie.startsWith('csrf_token='));
  return tokenCookie ? tokenCookie.split('=')[1] : null;
};

// Action Creators
const loadGroups = (groups) => ({
  type: LOAD_GROUPS,
  payload: groups
});

const loadGroupDetails = (group) => ({
  type: LOAD_GROUP_DETAILS,
  payload: group
});

const joinGroup = (membership) => ({
  type: JOIN_GROUP,
  payload: membership
});

const leaveGroup = (groupId) => ({
  type: LEAVE_GROUP,
  payload: groupId
});

// Thunks
export const fetchGroupsThunk = () => async (dispatch) => {
  try {
    // For development: simulate API response with mock data
    const mockGroups = [
      {
        id: 1,
        name: "Street Photography Club",
        description: "A group for street photography enthusiasts to share tips and organize photo walks.",
        image_url: null,
        member_count: 42,
        is_member: false
      },
      {
        id: 2,
        name: "Portrait Masters",
        description: "Learn and share portrait photography techniques from lighting to posing.",
        image_url: null,
        member_count: 28,
        is_member: true
      },
      {
        id: 3,
        name: "Landscape Lovers",
        description: "For those who love capturing the beauty of natural landscapes.",
        image_url: null,
        member_count: 56,
        is_member: false
      },
      {
        id: 4,
        name: "Macro Photography",
        description: "Exploring the tiny world through macro photography.",
        image_url: null,
        member_count: 19,
        is_member: true
      },
      {
        id: 5,
        name: "Urban Explorers",
        description: "Capturing urban environments, architecture, and city life.",
        image_url: null,
        member_count: 37,
        is_member: false
      },
      {
        id: 6,
        name: "Wildlife Photographers",
        description: "Sharing wildlife photography tips, locations, and experiences.",
        image_url: null,
        member_count: 31,
        is_member: true
      }
    ];
    
    dispatch(loadGroups(mockGroups));
    return mockGroups;
    
    // When API is ready, uncomment this code:
    /*
    const response = await fetch('/api/groups', {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCSRFToken()
      }
    });
    
    if (response.ok) {
      const groups = await response.json();
      dispatch(loadGroups(groups));
      return groups;
    }
    */
  } catch (error) {
    console.error("Error fetching groups:", error);
    return null;
  }
};

export const fetchGroupDetailsThunk = (groupId) => async (dispatch) => {
  const response = await fetch(`/api/groups/${groupId}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCSRFToken()
    }
  });
  
  if (response.ok) {
    const group = await response.json();
    dispatch(loadGroupDetails(group));
    return group;
  }
  
  return null;
};

export const joinGroupThunk = (groupId) => async (dispatch, getState) => {
  try {
    // For development: simulate API response
    const { allGroups } = getState().groups;
    const group = allGroups.find(g => g.id === groupId);
    
    if (group) {
      // Create a copy of the group with is_member set to true
      const updatedGroup = { ...group, is_member: true };
      dispatch(joinGroup(updatedGroup));
      return { success: true, membership: updatedGroup };
    }
    
    // When API is ready, uncomment this code:
    /*
    const response = await fetch(`/api/groups/${groupId}/join`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCSRFToken()
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      dispatch(joinGroup(data.membership));
      return data;
    }
    */
  } catch (error) {
    console.error("Error joining group:", error);
    return null;
  }
};

export const leaveGroupThunk = (groupId) => async (dispatch, getState) => {
  try {
    // For development: simulate API response
    const { allGroups } = getState().groups;
    const group = allGroups.find(g => g.id === groupId);
    
    if (group) {
      dispatch(leaveGroup(groupId));
      return { success: true };
    }
    
    // When API is ready, uncomment this code:
    /*
    const response = await fetch(`/api/groups/${groupId}/leave`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCSRFToken()
      }
    });
    
    if (response.ok) {
      dispatch(leaveGroup(groupId));
      return await response.json();
    }
    */
  } catch (error) {
    console.error("Error leaving group:", error);
    return null;
  }
};

// Initial State
const initialState = {
  allGroups: [],
  currentGroup: null,
  userGroups: []
};

// Reducer
export default function groupsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_GROUPS:
      return {
        ...state,
        allGroups: action.payload
      };
      
    case LOAD_GROUP_DETAILS:
      return {
        ...state,
        currentGroup: action.payload
      };
      
    case JOIN_GROUP:
      // Update the group in allGroups and add to userGroups
      return {
        ...state,
        allGroups: state.allGroups.map(group => 
          group.id === action.payload.id ? { ...group, is_member: true } : group
        ),
        userGroups: [...state.userGroups, action.payload]
      };
      
    case LEAVE_GROUP:
      // Update the group in allGroups and remove from userGroups
      return {
        ...state,
        allGroups: state.allGroups.map(group => 
          group.id === action.payload ? { ...group, is_member: false } : group
        ),
        userGroups: state.userGroups.filter(group => group.id !== action.payload)
      };
      
    default:
      return state;
  }
}
