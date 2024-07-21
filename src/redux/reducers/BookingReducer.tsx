// src/redux/reducers/bookingReducer.js
import { SET_BOOKING_DATA, CLEAR_BOOKING_DATA } from '../actions/BookingAction';

const initialState = {
  bookingData: null,
};

const bookingReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_BOOKING_DATA:
      return {
        ...state,
        bookingData: action.payload,
      };
    case CLEAR_BOOKING_DATA:
      return {
        ...state,
        bookingData: null,
      };
    default:
      return state;
  }
};

export default bookingReducer;
