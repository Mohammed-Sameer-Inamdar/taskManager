import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    visible: false,
    message: '',
    type: 'success'
}
const dialogSlice = createSlice({
    name: 'message',
    initialState: initialState,
    reducers: {
        showMessage: (state, action) => {
            const { message, type } = action.payload
            state.message = message;
            state.type = type;
            state.visible = true;
        },
        hideMessage: (state, action) => {
            state.visible = false;
            state.message = '';
            state.type = 'success';
        }
    }
})

export const { showMessage, hideMessage } = dialogSlice.actions
export const getMessageData = (state) => state.message;

export default dialogSlice.reducer;