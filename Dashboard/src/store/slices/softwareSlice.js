import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const softwareSlice = createSlice({
    name:"software",
    initialState:{
        loading:false,
        software:[],
        error:null,
        message:null,
    },
    reducers:{
        getAllSoftwareRequest(state, action) {
            state.loading = true;
            state.software = [];
            state.error = null;
          },
          getAllSoftwareSuccess(state, action) {
            state.loading = false;
            state.software = action.payload;
            state.error = null;
          },
          getAllSoftwareFiald(state, action) {
            state.loading = false;
            state.software = state.software;
            state.error = action.payload;
          },
      
          addSoftwareRequest(state, action) {
            state.loading = true;
            state.message = null;
            state.error = null;
          },
          addSoftwareSuccess(state, action) {
            state.loading = false;
            state.message = action.payload;
            state.error = null;
          },
          addSoftwareFiald(state, action) {
            state.loading = false;
            state.message = null;
            state.error = action.payload;
          },

          deleteSoftwareRequest(state, action) {
            state.loading = true;
            state.message = null;
            state.error = null;
          },
          deleteSoftwareSuccess(state, action) {
            state.loading = false;
            state.message = action.payload;
            state.error = null;
          },
          deleteSoftwareFiald(state, action) {
            state.loading = false;
            state.message = null;
            state.error = action.payload;
          },
      
          resetSoftwareSlice(state, action) {
            state.loading = false;
            state.software = state.software;
            state.message = null;
            state.error = null;
          },
      
          clearAllErrors(state, action) {
            state.error = null;
            state.software = state.software;
          },
    }
})


export const getAllSoftware = () => async (dispatch) => {
  dispatch(softwareSlice.actions.getAllSoftwareRequest());

  try {
    const { data } = await axios.get(
      "http://localhost:4000/api/v1/toolapplication/getAll",
      { withCredentials: true }
    );
    dispatch(softwareSlice.actions.getAllSoftwareSuccess(data.toolapplication))
    dispatch(softwareSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      softwareSlice.actions.getAllSoftwareFiald(error.response.data.message)
    );
  }
};

export const addSoftware = (data) => async (dispatch) => {
  dispatch(softwareSlice.actions.addSoftwareRequest());
  try {
    const response = await axios.post(
      " http://localhost:4000/api/v1/toolapplication/add",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log(response);
    console.log(response.data.message);
    dispatch(softwareSlice.actions.addSoftwareSuccess(response.data.message));
    dispatch(softwareSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(softwareSlice.actions.addSoftwareFiald(error.response.data.message));
  }
};

export const deleteSoftware = (id) => async (dispatch) => {
  dispatch(softwareSlice.actions.deleteSoftwareRequest());

  try {
    const response  = await axios.delete(
      `http://localhost:4000/api/v1/toolapplication/delete/${id}`,
      { withCredentials: true }
    )
    dispatch(softwareSlice.actions.deleteSoftwareSuccess(response.data.message));
    dispatch(softwareSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      softwareSlice.actions.deleteSoftwareFiald(error.response.data.message)
    );
  }
};

export const clearAllSoftwareErrors = () => (dispatch) => {
  dispatch(softwareSlice.actions.clearAllErrors());
};

export const resetSoftwareSlice = () => (dispatch) => {
  dispatch(softwareSlice.actions.resetSoftwareSlice());
};


export default softwareSlice.reducer;