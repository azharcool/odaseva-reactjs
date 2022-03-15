import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    rootObjectList: [],
    newObjectsJsonArr: []
}

export const dataSlice = createSlice({
    name: 'root-data',
    initialState,
    reducers: {
        saveAllObjectList: (state, action) => {
            const { payload } = action;
            state.rootObjectList = payload;
        },
        saveObjectDetails: (state, action) => {
            const { payload } = action;
            state.newObjectsJsonArr.push(payload);
        },
    },

});

export const { saveAllObjectList, saveObjectDetails } = dataSlice.actions;

export default dataSlice.reducer;