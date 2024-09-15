import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const forgotResetPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    loading: false,
    error: null,
    message: null,
  },

  reducers: {
    forgotpasswordRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    forgotpasswordSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },

    forgotpasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    resetPasswordRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    resetPasswordSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },

    resetPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    clearAllErrors(state, action) {
      state.error = null;
    },
  },
});

export const forgotPassword = (email) => async (dispatch) => {
  dispatch(forgotResetPasswordSlice.actions.forgotpasswordRequest());

  try {
    const { data } = await axios.post(
      "http://localhost:4000/api/v1/user/password/forgot",
      { email },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );

    dispatch(forgotResetPasswordSlice.actions.forgotpasswordSuccess(data.message));
    dispatch(forgotResetPasswordSlice.actions.clearAllErrors());

  } catch (error) {
    dispatch(forgotResetPasswordSlice.actions.forgotpasswordFailed(error.response.data.message));
  }
};
export const resetPassword = (token, password, confirmNewPassword) => async (dispatch) => {
  dispatch(forgotResetPasswordSlice.actions.resetPasswordRequest());

  try {
    const { data } = await axios.put(
      `http://localhost:4000/api/v1/user/password/reset/${token}`,
      { password, confirmNewPassword },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );

    dispatch(forgotResetPasswordSlice.actions.resetPasswordSuccess(data.message));
    dispatch(forgotResetPasswordSlice.actions.clearAllErrors());

  } catch (error) {
    dispatch(forgotResetPasswordSlice.actions.resetPasswordFailed(error.response.data.message));
  }
};

export const clearAllForgotPasswordErrors = () => (dispatch) => {
  dispatch(forgotResetPasswordSlice.actions.clearAllErrors());
};

export default forgotResetPasswordSlice.reducer;
