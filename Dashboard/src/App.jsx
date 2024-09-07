import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ManageSkills from "./pages/ManageSkills";
import ManageTimeline from "./pages/ManageTimeline";
import ManageBlogs from "./pages/ManageBlogs";
import ViewBlog from "./pages/ViewBlog";
import UpdateBlog from "./pages/UpdateBlog";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/manage/skills" element={<ManageSkills />} />
        <Route path="/manage/timeline" element={<ManageTimeline />} />
        <Route path="/manage/blogs" element={<ManageBlogs />} />
        <Route path="/view/blog/:id" element={<ViewBlog />} />
        <Route path="/update/blog/:id" element={<UpdateBlog />} />
      </Routes>
      <ToastContainer position="top-right" theme="dark" />
    </Router>
  );
}
