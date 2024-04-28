import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import bookingReducer from "./bookingSlice";
import createBookingSubscriptionsMiddleware from "./middleware/bookingSubscriptions";
const bookingSubscriptionsMiddleware = createBookingSubscriptionsMiddleware();

const appStore = configureStore({
    reducer:{
        user:userReducer,
        booking:bookingReducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(bookingSubscriptionsMiddleware)
});

export default appStore;