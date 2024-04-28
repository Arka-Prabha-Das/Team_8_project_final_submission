// Action Types
export const SUBSCRIBE_TO_BOOKING = 'SUBSCRIBE_TO_BOOKING';
export const UNSUBSCRIBE_FROM_BOOKING = 'UNSUBSCRIBE_FROM_BOOKING';
export const UPDATE_BOOKING_STATUS = 'UPDATE_BOOKING_STATUS';

// Action Creators
export const subscribeToBooking = bookingId => ({
    type: SUBSCRIBE_TO_BOOKING,
    payload: { bookingId },
});

export const unsubscribeFromBooking = bookingId => ({
    type: UNSUBSCRIBE_FROM_BOOKING,
    payload: { bookingId },
});

export const updateBookingStatus = (bookingId, status) => ({
    type: UPDATE_BOOKING_STATUS,
    payload: { bookingId, status },
});
