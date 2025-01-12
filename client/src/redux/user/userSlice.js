import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    errorMsg: null,
    isLoading: null
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        signInStart: (state) => {
            state.isLoading = true
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.isLoading = false;
            state.errorMsg = null;
        },
        signInFailed: (state, action) => {
            state.errorMsg = action.payload;
            state.isLoading = false;
        }
    }
});

export const {
    signInStart,
    signInSuccess,
    signInFailed,
} = userSlice.actions;

export default userSlice.reducer;