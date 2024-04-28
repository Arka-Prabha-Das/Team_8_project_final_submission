/* eslint-disable no-case-declarations */
import { firestore } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { updateBookingStatus } from '../actions/bookings';

const createBookingSubscriptionsMiddleware = () => {
    let subscriptions = {};

    return store => next => action => {
        switch (action.type) {
            case 'SUBSCRIBE_TO_BOOKING':
                const { bookingId } = action.payload;
                if (!subscriptions[bookingId]) {
                    const bookingDocRef = doc(firestore, "bookings", bookingId);
                    subscriptions[bookingId] = onSnapshot(bookingDocRef, (doc) => {
                        if (doc.exists()) {
                            const updatedData = doc.data();
                            store.dispatch(updateBookingStatus(bookingId, updatedData.status));
                        }
                    });
                }
                break;
            case 'UNSUBSCRIBE_FROM_BOOKING':
                const subscription = subscriptions[action.payload.bookingId];
                if (subscription) {
                    subscription();
                    delete subscriptions[action.payload.bookingId];
                }
                break;
            default:
                break;
        }
        return next(action);
    };
};

export default createBookingSubscriptionsMiddleware;