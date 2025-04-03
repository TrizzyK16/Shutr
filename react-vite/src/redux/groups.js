// Action Types
const LOAD_GROUPS = 'groups/LOAD_GROUPS';
const LOAD_GROUP_DETAILS = 'groups/LOAD_GROUP_DETAILS';
const JOIN_GROUP = 'groups/JOIN_GROUP';
const LEAVE_GROUP = 'groups/LEAVE_GROUP';

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
  const response = await fetch('/api/groups');
  
  if (response.ok) {
    const groups = await response.json();
    dispatch(loadGroups(groups));
    return groups;
  }
  
  return null;
};

export const fetchGroupDetailsThunk = (groupId) => async (dispatch) => {
  const response = await fetch(`/api/groups/${groupId}`);
  
  if (response.ok) {
    const group = await response.json();
    dispatch(loadGroupDetails(group));
    return group;
  }
  
  return null;
};

export const joinGroupThunk = (groupId) => async (dispatch) => {
  const response = await fetch(`/api/groups/${groupId}/join`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  if (response.ok) {
    const data = await response.json();
    dispatch(joinGroup(data.membership));
    return data;
  }
  
  return null;
};

export const leaveGroupThunk = (groupId) => async (dispatch) => {
  const response = await fetch(`/api/groups/${groupId}/leave`, {
    method: 'DELETE'
  });
  
  if (response.ok) {
    dispatch(leaveGroup(groupId));
    return await response.json();
  }
  
  return null;
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
      // Add the group to userGroups
      return {
        ...state,
        userGroups: [...state.userGroups, action.payload]
      };
      
    case LEAVE_GROUP:
      // Remove the group from userGroups
      return {
        ...state,
        userGroups: state.userGroups.filter(group => group.group_id !== action.payload)
      };
      
    default:
      return state;
  }
}
