import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    isAuthorized: false,
    user: {},
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsAuthorized: (state, action) => {
            state.isAuthorized = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
    }
});

export const { setIsAuthorized, setUser } = authSlice.actions;
export default authSlice.reducer;