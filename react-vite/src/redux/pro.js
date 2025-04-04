// Action Types
const UPGRADE_TO_PRO = 'pro/UPGRADE_TO_PRO';
const DOWNGRADE_FROM_PRO = 'pro/DOWNGRADE_FROM_PRO';
const CHECK_PRO_STATUS = 'pro/CHECK_PRO_STATUS';

// Action Creators
const upgradeToPro = (user) => ({
  type: UPGRADE_TO_PRO,
  payload: user
});

const downgradeFromPro = (user) => ({
  type: DOWNGRADE_FROM_PRO,
  payload: user
});

const checkProStatus = (status) => ({
  type: CHECK_PRO_STATUS,
  payload: status
});

// Thunks
export const upgradeToProThunk = () => async (dispatch) => {
  const response = await fetch('/api/pro', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  if (response.ok) {
    const data = await response.json();
    dispatch(upgradeToPro(data.user));
    return data;
  }
  
  return null;
};

export const downgradeFromProThunk = () => async (dispatch) => {
  const response = await fetch('/api/pro', {
    method: 'DELETE'
  });
  
  if (response.ok) {
    const data = await response.json();
    dispatch(downgradeFromPro(data.user));
    return data;
  }
  
  return null;
};

export const checkProStatusThunk = () => async (dispatch) => {
  const response = await fetch('/api/pro');
  
  if (response.ok) {
    const status = await response.json();
    dispatch(checkProStatus(status));
    return status;
  }
  
  return null;
};

// Initial State
const initialState = {
  isPro: false,
  proSince: null
};

// Reducer
export default function proReducer(state = initialState, action) {
  switch (action.type) {
    case UPGRADE_TO_PRO:
      return {
        ...state,
        isPro: true,
        proSince: action.payload.pro_since
      };
      
    case DOWNGRADE_FROM_PRO:
      return {
        ...state,
        isPro: false
      };
      
    case CHECK_PRO_STATUS:
      return {
        ...state,
        isPro: action.payload.is_pro,
        proSince: action.payload.pro_since
      };
      
    default:
      return state;
  }
}
