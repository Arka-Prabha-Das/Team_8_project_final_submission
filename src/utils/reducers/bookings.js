import { SUBSCRIBE_TO_BOOKING, UNSUBSCRIBE_FROM_BOOKING, UPDATE_BOOKING_STATUS } from '../actions/bookings';

const initialState = {
    activeSubscriptions: [],
    bookings: {},
};

const bookingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUBSCRIBE_TO_BOOKING:
            return {
                ...state,
                activeSubscriptions: [...state.activeSubscriptions, action.payload.bookingId],
            };
        case UNSUBSCRIBE_FROM_BOOKING:
            return {
                ...state,
                activeSubscriptions: state.activeSubscriptions.filter(id => id !== action.payload.bookingId),
            };
        case UPDATE_BOOKING_STATUS:
            return {
                ...state,
                bookings: {
                    ...state.bookings,
                    [action.payload.bookingId]: {
                        ...state.bookings[action.payload.bookingId],
                        status: action.payload.status,
                    },
                },
            };
        default:
            return state;
    }
};

export default bookingsReducer;
