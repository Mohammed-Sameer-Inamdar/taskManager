import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./AxiosInstance";
import { showMessage } from "../slices/dialogSlice";

export const fetchTasksApi = createAsyncThunk('tasks/list', async (_, { dispatch }) => {
    try {
        const response = await axiosInstance.get('tasks');
        return response.data;
    } catch (err) {
        const message = err?.response?.statusText || err.message;
        dispatch(showMessage({ message: err?.response?.statusText || err.message, type: 'error' }));
        throw Error(message);
    }
});

export const createTaskApi = createAsyncThunk('tasks/createTask', async (taskData, { dispatch }) => {
    try {
        const response = await axiosInstance.post('task', taskData);
        return response.data;
    } catch (err) {
        const message = err?.response?.statusText || err.message;
        dispatch(showMessage({ message: err?.response?.statusText || err.message, type: 'error' }));
        throw Error(message);
    }
})

export const updateTaskApi = createAsyncThunk('tasks/updateTask', async (taskData, { dispatch }) => {
    try {

        const { id } = taskData;
        const response = await axiosInstance.post(`task/${id}`, taskData);
        return response.data;
    } catch (err) {
        const message = err?.response?.statusText || err.message;
        dispatch(showMessage({ message: err?.response?.statusText || err.message, type: 'error' }));
        throw Error(message);
    }
})

export const deleteTaskApi = createAsyncThunk('tasks/deleteTask', async (taskId, { dispatch }) => {
    try {
        const response = await axiosInstance.delete(`task/${taskId}`);
        return response.data;
    } catch (err) {
        const message = err?.response?.statusText || err.message;
        dispatch(showMessage({ message: err?.response?.statusText || err.message, type: 'error' }));
        throw Error(message);
    }
})

export const updateTaskPosition = createAsyncThunk('tasks/updateTaskPosition', async (taskData, { dispatch }) => {
    try {
        const { id, toPosition } = taskData;
        const response = await axiosInstance.post(`task/${id}/move`, { toPosition });
        return response.data;
    } catch (err) {
        const message = err?.response?.statusText || err.message;
        dispatch(showMessage({ message: err?.response?.statusText || err.message, type: 'error' }));
        throw Error(message);
    }
})