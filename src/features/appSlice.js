import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    projectId: null,
    projectName: null,
  },
  reducers: {
    setProjectInfo: (state, action) => {      
      state.projectId = action.payload.projectId;
      state.projectName = action.payload.projectName;
    },  
    },
});

export const { setProjectInfo } = appSlice.actions;

export const selectProjectId = state => state.app.projectId;
export const selectProjectName = state => state.app.projectName;

export default appSlice.reducer;
