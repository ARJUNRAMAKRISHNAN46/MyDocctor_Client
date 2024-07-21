// src/redux/actions/bookingActions.js

export const SET_BOOKING_DATA = 'SET_BOOKING_DATA';
export const CLEAR_BOOKING_DATA = 'CLEAR_BOOKING_DATA';

export const setBookingData = (data: any) => ({
  type: SET_BOOKING_DATA,
  payload: data,
});

export const clearBookingData = () => ({
  type: CLEAR_BOOKING_DATA,
});
