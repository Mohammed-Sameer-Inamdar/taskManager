import { createSlice } from "@reduxjs/toolkit";
import { loginApi, signupApi } from "../apis/authApi";

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null },
    reducers: {
        setCredentials: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
        },
        logout: (state, action) => {
            state.user = null;
            state.token = null;
        }
    },

    extraReducers(builder) {
        builder
            .addCase(loginApi.fulfilled, (state, action) => {
                const { user, token } = action.payload;
                if (!token) {
                    console.log('No token');
                    return;
                }
                state.user = user;
                state.token = token;

            })
            .addCase(signupApi.fulfilled, (state, action) => {
                const { user, token } = action.payload;
                if (!token) {
                    console.log('No token');
                    return;
                }
                state.user = user;
                state.token = token;
            })
    }
});

export const { setCredentials, logout } = authSlice.actions;

export const loggedInUser = (state) => state.auth.user;
export const accessToken = (state) => state.auth.token;

export default authSlice.reducer;