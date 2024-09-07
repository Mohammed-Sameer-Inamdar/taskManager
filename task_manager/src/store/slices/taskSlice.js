import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { createTaskApi, deleteTaskApi, fetchTasksApi, updateTaskApi, updateTaskPosition } from "../apis/taskApi";

export const taskAdapter = createEntityAdapter({
    sortComparer: (task, taskNext) => taskNext.position - task.position
});

const initialState = taskAdapter.getInitialState({
    status: 'idle', //idle, succeeded, failed
});

const taskSlice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        clearTasks: (state, action) => {
            taskAdapter.removeAll(state);
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchTasksApi.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchTasksApi.fulfilled, (state, action) => {
                state.status = 'succeeded';
                taskAdapter.upsertMany(state, action.payload);
            })
            .addCase(fetchTasksApi.rejected, (state, action) => {
                state.status = 'failed';
            })
            .addCase(createTaskApi.fulfilled, (state, action) => {
                taskAdapter.addOne(state, action.payload);
            })
            .addCase(updateTaskApi.fulfilled, (state, action) => {
                const updatedData = action.payload;
                if (!updatedData?.id) {
                    return;
                }
                taskAdapter.upsertOne(state, action.payload);
            })
            .addCase(deleteTaskApi.fulfilled, (state, action) => {
                const { deletedId, tasks } = action.payload;
                if (!deletedId) {
                    console.log('failed to delete');
                    return;

                }
                taskAdapter.upsertMany(state, tasks);
                taskAdapter.removeOne(state, deletedId);
            }).addCase(updateTaskPosition.fulfilled, (state, action) => {
                const taskList = action.payload;
                taskAdapter.upsertMany(state, taskList);
            })
    }
});

export const {
    selectAll: tasksList,
    selectById: taskById,
    selectIds: taskIds
} = taskAdapter.getSelectors(state => state.tasks);

export const getTaskStatus = (state) => state.tasks.status;

export const { clearTasks } = taskSlice.actions;

export default taskSlice.reducer;

