import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import  forgotResetPasswordReducer from "./slices/forgotResetPasswordSlice"
import messageReducer from "./slices/messageSlice";
import timelineReducer from "./slices/timelineslice";
import skillsReducer from "./slices/skillsSlice";


export const store = configureStore({
    reducer:{
        user: userReducer,
        forgotPassword: forgotResetPasswordReducer,
        messages:messageReducer,
        timeline:timelineReducer,
        skills : skillsReducer,
        
    }
})