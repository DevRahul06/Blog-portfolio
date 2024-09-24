import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import  forgotResetPasswordReducer from "./slices/forgotResetPasswordSlice"
import messageReducer from "./slices/messageSlice";
import timelineReducer from "./slices/timelineslice";
import skillsReducer from "./slices/skillsSlice";
import softwareReducer from "./slices/softwareSlice";
import blogReducer from "./slices/blogSlice";


export const store = configureStore({
    reducer:{
        user: userReducer,
        forgotPassword: forgotResetPasswordReducer,
        messages:messageReducer,
        timeline:timelineReducer,
        skills : skillsReducer,
        software: softwareReducer,
        blogs:blogReducer,
        
    }
})