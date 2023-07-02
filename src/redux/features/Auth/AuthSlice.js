import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: ''
}

export const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        createToken: (state, action) => {
            state.token = action.payload
        },
        removeToken: (state) => {
            state.token = ''
        }
    }
})

export default tokenSlice.reducer;
export const { createToken, removeToken } = tokenSlice.actions;