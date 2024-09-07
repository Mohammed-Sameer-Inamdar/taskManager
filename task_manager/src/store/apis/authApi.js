import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LOGIN_API, SIGN_UP_API } from "./apiConfig";
import { showMessage } from "../slices/dialogSlice";

export const loginApi = createAsyncThunk('auth/login', async (credentials, { dispatch }) => {
    try {
        const response = await axios.post(LOGIN_API, credentials);
        return response.data;
    } catch (err) {
        const message = err?.response?.statusText || err.message;
        dispatch(showMessage({ message, type: 'error' }));
        throw err;
    }
})

export const signupApi = createAsyncThunk('auth/signup', async (userData,{dispatch}) => {
    try {
        const response = await axios.post(SIGN_UP_API, userData);
        return response.data;
    } catch (err) {
        const message = err?.response?.statusText || err.message;
        dispatch(showMessage({ message, type: 'error' }));
        throw err;
    }
})