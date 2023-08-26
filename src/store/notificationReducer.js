// action - state management

import * as actionTypes from './actions';

export const initialState = {
  notificationData: []
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const notificationReducer = (state = initialState, action) => {
  let tempData;
  switch (action.type) {
    case actionTypes.NOTIFCATION_ADD:
      tempData = [...state.notificationData];
      tempData.push(action.notificationData);

      return { ...state, notificationData: tempData };
    default:
      return state;
  }
};

export default notificationReducer;
