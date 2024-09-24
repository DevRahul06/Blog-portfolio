import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const timelineslice = createSlice({
  name: "timeline",
  initialState: {
    loading: false,
    timeline: [],
    error: null,
    message: null,
  },

  reducers: {
    getTimelineRequest(state, action) {
      state.loading = true;
      state.timeline = [];
      state.error = null;
    },
    getTimelineSuccess(state, action) {
      state.loading = false;
      state.timeline = action.payload;
      state.error = null;
    },
    getTimelineFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.timeline = [];
    },

    deleteTimelineRequest(state, action) {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    deleteTimelineSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    deleteTimelineFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    addTimelineRequest(state, action) {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    addTimelineSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    addTimelineFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    resetTimelineslice(state, action) {
      state.error = null;
      state.timeline = state.timeline;
      state.message = null;
      state.loading = false;
    },

    clearAllErrors(state, action) {
      state.error = null;
      state.timeline = state.timeline;
    },
  },
});

export const getAllTimeline = () => async (dispatch) => {
  dispatch(timelineslice.actions.getTimelineRequest());

  try {
    const { data } = await axios.get(
      "http://localhost:4000/api/v1/timeline/getAll",
      { withCredentials: true }
    );
    dispatch(timelineslice.actions.getTimelineSuccess(data.timelines));
    dispatch(timelineslice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      timelineslice.actions.getTimelineFailed(error.response.data.message)
    );
  }
};

export const deleteTimeline = (id) => async (dispatch) => {
  dispatch(timelineslice.actions.deleteTimelineRequest());

  try {
    const response = await axios.delete(
      `http://localhost:4000/api/v1/timeline/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(timelineslice.actions.deleteTimelineSuccess(response.data.message));
    dispatch(timelineslice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      timelineslice.actions.deleteTimelineFailed(error.response.data.message)
    );
  }
};

export const addTimeline = (timelineData) => async (dispatch) => {
  dispatch(timelineslice.actions.addTimelineRequest());

  try {
    const { data } = await axios.post(
      "http://localhost:4000/api/v1/timeline/add",
      timelineData,
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    dispatch(timelineslice.actions.addTimelineSuccess(data.message));
    dispatch(timelineslice.actions.clearAllErrors());
  } catch (error) {
    dispatch(timelineslice.actions.addTimelineFailed(error.response.data.message));
  }
};

export const clearAllTimelineErrors = () => (dispatch) => {
  dispatch(timelineslice.actions.clearAllErrors());
};

export const resettimelineslice = () => (dispatch) => {
  dispatch(timelineslice.actions.resetTimelineslice());
};

export default timelineslice.reducer;
