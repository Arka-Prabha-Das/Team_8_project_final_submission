import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
    name:"booking",
    initialState: null,
    reducers:{
        //action : reducer function
        addBooking: (state, action) =>{
            return action.payload;
        },
        removeBooking:(state) =>{
            return null;
        }

    }

});

export const {addBooking, removeBooking} = bookingSlice.actions;
export default bookingSlice.reducer;
