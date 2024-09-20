import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const skillsSlice = createSlice({
  name: "skills",
  initialState: {
    loading: false,
    skills: [],
    error: null,
    message: null,
  },

  reducers: {
    getAllSkillsRequest(state, action) {
      state.loading = true;
      state.skills = [];
      state.error = null;
    },
    getAllSkillsSuccess(state, action) {
      state.loading = false;
      state.skills = action.payload;
      state.error = null;
    },
    getAllSkillsFiald(state, action) {
      state.loading = false;
      state.skills = state.skills;
      state.error = action.payload;
    },

    addSkillsRequest(state, action) {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    addSkillsSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    addSkillsFiald(state, action) {
      state.loading = false;
      state.message = null;
      state.error = action.payload;
    },

    deleteSkillsRequest(state, action) {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    deleteSkillsSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    deleteSkillsFiald(state, action) {
      state.loading = false;
      state.message = null;
      state.error = action.payload;
    },

    resetSkillSlice(state, action) {
      state.loading = false;
      state.skills = state.skills;
      state.message = null;
      state.error = null;
    },

    clearAllErrors(state, action) {
      state.error = null;
      state.skills = state.skills;
    },
  },
});

export const getAllSkills = () => async (dispatch) => {
  dispatch(skillsSlice.actions.getAllSkillsRequest());

  try {
    const { data } = await axios.get(
      "http://localhost:4000/api/v1/skills/getAll",
      { withCredentials: true }
    );
    dispatch(skillsSlice.actions.getAllSkillsSuccess(data.skills));
    dispatch(skillsSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      skillsSlice.actions.getAllSkillsFiald(error.response.data.message)
    );
  }
};

export const addSkill = (data) => async (dispatch) => {
  dispatch(skillsSlice.actions.addSkillsRequest());
  try {
    const response = await axios.post(
      " http://localhost:4000/api/v1/skills/add",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log(response);
    console.log(response.data.message);
    dispatch(skillsSlice.actions.addSkillsSuccess(response.data.message));
    dispatch(skillsSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(skillsSlice.actions.addSkillsFiald(error.response.data.message));
  }
};

export const deleteSkills = (id) => async (dispatch) => {
  dispatch(skillsSlice.actions.deleteSkillsRequest());

  try {
    const { data } = await axios.delete(
      `http://localhost:4000/api/v1/skills/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(skillsSlice.actions.deleteSkillsSuccess(data.timelines));
    dispatch(skillsSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      skillsSlice.actions.deleteSkillsFiald(error.response.data.message)
    );
  }
};

export const clearAllSkillErrors = () => (dispatch) => {
  dispatch(skillsSlice.actions.clearAllErrors());
};

export const resetSkillSlice = () => (dispatch) => {
  dispatch(skillsSlice.actions.resetSkillSlice());
};

export default skillsSlice.reducer;
