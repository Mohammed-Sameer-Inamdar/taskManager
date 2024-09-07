import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { thunk } from 'redux-thunk';
import authSlice from "./slices/authSlice";
import taskSlice from "./slices/taskSlice";
import axiosInstance from './apis/AxiosInstance';
import dialogSlice from "./slices/dialogSlice";
const persistConfig = {
    key: 'root',
    whitelist: ['auth', 'tasks'],
    storage,
    version: 1
}

const rootReducer = combineReducers({
    auth: authSlice,
    tasks: taskSlice,
    message: dialogSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const axiosMiddleware = store => next => action => {
    const token = store.getState().auth.token;
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return next(action);
}


export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false, }).concat(thunk, axiosMiddleware),
    devTools: true
})

export const persistor = persistStore(store);